'use strict';

var viewModel = function () {
    var self = this;

    self.index = ko.observable();
    self.name = ko.observable();
    self.lastName = ko.observable();
    self.birthday = ko.observable();

    self.DeptIds = ko.observableArray([]);
    self.Students = ko.observableArray([]).extend({notify: 'always'});

    self.getStudents = function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/students',
            dataType: "json",
            async: true,
            success: function (data) {
                console.log(data);
                self.Students(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status !== 403)
                    alert("Status: " + xhr.status + ", Error: " + thrownError, "Error");
            }
        });
    };

    self.getStudents();

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
            data: myJSON,
            complete: function (xhr) {
                if (xhr.status === 201) {
                    console.log('success');
                    self.getStudents();
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
            }
        });
    }
    
    self.showGrades = function (student) {
        console.log("show grades for student: ", student)
    }
};

$(document).ready(function () {
    ko.applyBindings(new viewModel());
});


//
// var viewModel = {
//     students: ko.observableArray(),
//     courses: ko.observableArray(),
//     grades: ko.observableArray()
// };
//
// function getStudents() {
//     $.ajax({
//         url: "http://localhost:8080/students",
//         method: "GET",
//         accept: 'application/json'
//     }).then(function (data) {
//         console.log(data);
//
//         viewModel.students = ko.mapping.fromJS(data);
//         var koNode = document.getElementById('studentTable');
//         // ko.cleanNode(koNode);
//         ko.applyBindings(viewModel.students(), koNode);
//     });
// }
//
// /*
// function addStudent(data) {
//
//     console.log(data)
//
//
//     // console.log(tableData);
//     // console.log(data)
//
//     // $.ajax({
//     //     type: 'POST',
//     //     dataType: 'json',
//     //     url: "http://localhost:8080/students/" + updatedItem.Index,
//     //     headers: {"X-HTTP-Method-Override": "PUT"}, // X-HTTP-Method-Override set to PUT.
//     //     data: student
//     // });
//
// }*/
//
//
// function updateStudent() {
//     // var updatedItem = this; // $data, passed when binding from view
//     //
//     // $.ajax({
//     //     type: 'POST',
//     //     dataType: 'json',
//     //     url: "http://localhost:8080/students/" + updatedItem.Index,
//     //     headers: {"X-HTTP-Method-Override": "PUT"}, // X-HTTP-Method-Override set to PUT.
//     //     data: '{"name": "Dave"}' // Some data e.g. Valid JSON as a string
//     // });
//     //
//     //
//     // $.ajax({
//     //     url: "http://localhost:8080/students/{index}",
//     //     method: "PUT",
//     //     accept: 'application/json'
//     // }).then(function (data) {
//     //     console.log(data);
//     //     viewModel.students = ko.mapping.fromJS(data);
//     //     var koNode = document.getElementById('studentTable');
//     //     // ko.cleanNode(koNode);
//     //     ko.applyBindings(viewModel.students(), koNode);
//     // });
// }
//
// self.deleteItem = function (parentViewModel) {
//     var deletingItem = this;
//
//     console.log('dsfgsfsf');
//     console.log(parentViewModel);
//     console.log(parentViewModel.index.toString());
//
//     // if (confirm("Are you sure you want to delete this item?")) {
//     //     parentViewModel.items.remove(deletingItem);
//     // }
// };
//
// var BetterListModel = function () {
//     this.student = ko.observable();
//
//     this.allItems = ko.observableArray([]);
//     this.selectedItems = ko.observableArray([]);
//     this.students = ko.observableArray();
//     this.courses = ko.observableArray();
//     this.grades = ko.observableArray();
//
//     this.addStudent = function (student) {
//         console.log(student)
//
//         // if ((this.index() != "") && (this.students.indexOf(this.index()) < 0))
//         //     this.students.push(this.index());
//         // this.index(""); // Clear the text box
//     };
//
//     this.removeSelected = function () {
//         this.students.removeAll(this.selectedItems());
//         this.selectedItems([]); // Clear selection
//     };
// };
//
//
// $(document).ready(function () {
//     getStudents();
//
//     ko.applyBindings(new BetterListModel());
//     //ko.applyBindings(new addStudent());
// });
// $.ajax({
//     url: "http://localhost:8080/students",
//     method: "POST",
//     accept: 'application/json',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     dataType: 'json',
//     data: myJSON
// }).then(function (data) {
//     console.log(data);
//     let koNode = document.getElementById('studentTable');
//     ko.cleanNode(koNode);
//     // self.Students(data);
//     self.getStudents();
//
// });
// $.ajax({
//     url: 'http://localhost:8080/students',
//     type: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     dataType: 'json',
//     data: myJSON,
// success: function (result) {
//     console.log(result);
//
// }
// });