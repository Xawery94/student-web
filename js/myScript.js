'use strict';

var viewModel = function () {
    var self = this;

    //=====================================================

    self.index = ko.observable();
    self.name = ko.observable();
    self.lastName = ko.observable();
    self.birthday = ko.observable();

    self.id = ko.observable();
    self.courseName = ko.observable();
    self.teacher = ko.observable();

    self.gradeId = ko.observable();
    self.gradeIndex = ko.observable();
    self.gradeValue = ko.observable();
    self.gradeCourse = ko.observable();
    self.gradeDate = ko.observable();

    self.availableCourses = ko.observableArray([]);
    self.selectedCourse = ko.observable();

    self.Students = ko.observableArray([]).extend({notify: 'always'});
    self.Courses = ko.observableArray([]).extend({notify: 'always'});
    self.Grades = ko.observableArray([]).extend({notify: 'always'});

    //=====================================================

    self.getStudents = function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/students',
            dataType: "json",
            async: true,
            success: function (data) {
                // console.log(data);
                self.Students(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    alert("Status: " + xhr.status + ", Error: " + thrownError, "Error");
            }
        });
    };

    self.getGradeCourses = function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/courses',
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data);
                self.availableCourses(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    alert("Status: " + xhr.status + ", Error: " + thrownError, "Error");
            }
        });
    };

    self.getCourses = function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/courses',
            dataType: "json",
            async: true,
            success: function (data) {
                self.Courses(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    alert("Status: " + xhr.status + ", Error: " + thrownError, "Error");
            }
        });
    };

    self.getStudents();
    self.getCourses();
    self.getGradeCourses();

    self.addStudent = function (data) {
        let Student = {};

        Student.index = data.index.value;
        Student.name = data.name.value;
        Student.lastName = data.lastName.value;
        Student.birthday = data.birthday.value;

        let myJSON = JSON.stringify(Student);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/students",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            async: false,
            data: myJSON,
            complete: function (xhr) {
                if (xhr.status === 201) {
                    console.log('success');
                    self.getStudents();

                    self.index("");
                    self.name("");
                    self.lastName("");
                    self.birthday("");
                } else {
                    alert("NoGood");
                }
            },
            dataType: 'json'
        });
    };

    self.updateStudent = function (data) {
        console.log("data: ", data);
        console.log("student index: ", data.index);

        let myJSON = JSON.stringify(data);

        $.ajax({
            url: "http://localhost:8080/students/" + data.index,
            method: "PUT",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: myJSON
        }).then(function () {
            self.getStudents();
        });
    };

    self.deleteStudent = function (dataToDelete) {
        $.ajax({
            url: "http://localhost:8080/students/" + dataToDelete.index,
            type: 'DELETE',
            success: function () {
                self.getStudents();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    console.log("Error: " + thrownError);
            }
        });
    };

    self.getGrades = function (student) {
        let st;
        if (typeof student !== 'object') {
            st = student;
        } else {
            st = student.index;
        }

        self.gradeIndex(st);
        self.Grades([]);
        let Grade = {};

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/students/' + st + '/grades',
            dataType: "json",
            async: true,
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    Grade.id = data[i].id;
                    Grade.index = st;
                    Grade.value = data[i].value;
                    Grade.date = data[i].date;
                    Grade.courseName = data[i].courseName;
                    self.Grades.push(Grade);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    console.log("Error: " + thrownError);
            }
        });
    };

    //=====================================================

    self.addCourse = function (data) {
        let Course = {};
        Course.id = data.id.value;
        Course.name = data.courseName.value;
        Course.teacher = data.teacher.value;
        let myJSON = JSON.stringify(Course);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/courses",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            async: false,
            dataType: 'json',
            data: myJSON,
            complete: function (xhr) {
                if (xhr.status === 201) {
                    console.log('success');
                    self.getCourses();

                    self.id("");
                    self.courseName("");
                    self.teacher("");
                } else {
                    alert("NoGood");
                }
            }
        });
    };

    self.updateCourse = function (data) {
        console.log("data: ", data);
        console.log("student index: ", data.index);

        let myJSON = JSON.stringify(data);

        $.ajax({
            url: "http://localhost:8080/courses/" + data.name,
            method: "PUT",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: myJSON
        }).then(function () {
            self.getCourses();
        });
    };

    self.deleteCourse = function (dataToDelete) {
        $.ajax({
            url: "http://localhost:8080/courses/" + dataToDelete.name,
            type: 'DELETE',
            success: function () {
                self.getCourses();
            }
        });
    };

    //=====================================================

    self.addGrade = function (data) {
        let Grade = {};
        Grade.id = data.gradeId.value;
        Grade.value = data.gradeValue.value;
        Grade.courseName = self.selectedCourse().name;

        let myJSON = JSON.stringify(Grade);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/students/" + data.gradeIndex.value + "/courses/" + self.selectedCourse().name + "/grades",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            dataType: 'json',
            data: myJSON,
            complete: function (xhr) {
                if (xhr.status === 201) {
                    console.log('success');

                    self.getGrades(data.gradeIndex.value);
                    self.gradeIndex("");
                    self.gradeValue("");
                    self.gradeDate("");
                } else {
                    alert("NoGood");
                }
            }
        });
    };

    self.updateGrade = function (data) {
        let GradeToUpdate = {};

        GradeToUpdate.value = data.value;
        GradeToUpdate.courseName = data.courseName;

        let myJSON = JSON.stringify(GradeToUpdate);

        $.ajax({
            url: "http://localhost:8080/students/" + data.index + "/courses/" + data.courseName + "/grades/" + data.id,
            method: "PUT",
            accept: 'application/json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: myJSON
        }).then(function () {
            self.getGrades(data.index);
        });
    };

    self.deleteGrade = function (dataToDelete) {
        $.ajax({
            url: "http://localhost:8080/students/" + dataToDelete.index + "/courses/" + dataToDelete.courseName + "/grades/" + dataToDelete.value,
            type: 'DELETE',
            success: function () {
                self.getGrades(dataToDelete.index);
            }
        });
    };
};

$(document).ready(function () {
    ko.applyBindings(new viewModel());
});