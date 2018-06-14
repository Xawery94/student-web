'use strict';

var viewModel = function () {
    var self = this;

    self.EmpId = ko.observable("");
    self.EmpName = ko.observable("");
    self.Designation = ko.observable("");
    self.DeptId = ko.observable("1");

    self.Message = ko.observable("");
    self.DeptIds = ko.observableArray([]);

    self.getDeptIds = function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/students',
            dataType: "json",
            async: true,
            success: function (data) {
                console.log("Student successful: ", data)
                // debugger;
                self.DeptIds(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status != 403)
                    alert("Status: " + xhr.status + ", Error: " + thrownError, "Error");
            }
        });

    };
    self.getDeptIds();

    self.Update = function () {
        var Employee = {};
        Employee.EmpId = self.EmpId();
        Employee.EmpName = self.EmpName();
        Employee.Designation = self.Designation();
        Employee.DeptId = self.DeptId();

        console.log(Employee)

        // $.ajax({
        //     url: 'http://localhost:8080/students',
        //     type: 'POST',
        //     data: Employee,
        //     success: function (result) {
        //         self.Message("Recorded inserted Sucessfully");
        //
        //         self.EmpId("");
        //         self.EmpName("");
        //         self.Designation("");
        //         self.DeptId("")
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         debugger;
        //         alert("some error");
        //     }
        // });
    };
}

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