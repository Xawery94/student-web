'use strict';

var self = this;

var IsNewRecord = false;
self.Studnets = ko.observableArray([]);
loadEmployees();

function loadEmployees() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/students"
    }).done(function (data) {
        console.log(data);
        self.Studnets(data);
        console.log(data);

    }).fail(function (err) {
        alert(err.status + " <--------------->");
    });
};

function Student(index, name, lastName, birthday) {
    return {
        StuIndex: ko.observable(index),
        StuName: ko.observable(name),
        StuLastName: ko.observable(lastName),
        StuBirthday: ko.observable(birthday),
    }
};

//S4:The ViewModel where the Templates are initialized
var EmpViewModel = {
    readonlyTemplate: ko.observable("readonlyTemplate"),
    editTemplate: ko.observable()
};

//S5:Method to decide the Current Template (readonlyTemplate or editTemplate)
EmpViewModel.currentTemplate = function (tmpl) {
    return tmpl === this.editTemplate() ? 'editTemplate' :
        this.readonlyTemplate();
}.bind(EmpViewModel);

//S6:Method to create a new Blank entry When the Add New Record button is clicked
EmpViewModel.addnewRecord = function () {
    alert("Add Called");
    self.Studnets.push(new Studnet(0, "", "", ""));
    IsNewRecord = true; //Set the Check for the New Record
};

//S7:Method to Save the Record (This is used for Edit and Add New Record)
EmpViewModel.saveEmployee = function (d) {
    var Stu = {};
    Stu.StuIndex = d.StuIndex;
    Stu.StuName = d.StuName;
    Stu.StuLastName = d.StuLastName;
    Stu.StuBirthday = d.StuBirthday;

    //Edit the Record
    if (IsNewRecord === false) {
        $.ajax({
            type: "PUT",
            url: "api/EmployeeInfoAPI/" + Stu.StuIndex,
            data: Stu
        }).done(function (data) {
            alert("Record Updated Successfully " + data.status);
            EmpViewModel.reset();
        }).fail(function (err) {
            alert("Error Occured, Please Reload the Page and Try Again " + err.status);
            EmpViewModel.reset();
        });
    }

//The New Record
    if (IsNewRecord === true) {
        IsNewRecord = false;
        $.ajax({
            type: "POST",
            url: "api/EmployeeInfoAPI",
            data: Stu
        }).done(function (data) {
            alert("Record Added Successfully " + data.status);
            EmpViewModel.reset();
            loadEmployees();
        }).fail(function (err) {
            alert("Error Occures, Please Reload the Page and Try Again " + err.status);
            EmpViewModel.reset();
        });
    }
}

//S8:Method to Delete the Record
EmpViewModel.deleteEmployee = function (d) {
    $.ajax({
        type: "DELETE",
        url: "api/EmployeeInfoAPI/" + d.StuIndex
    }).done(function (data) {
        alert("Record Deleted Successfully " + data.status);
        EmpViewModel.reset();
        loadEmployees();
    }).fail(function (err) {
        alert("Error Occures, Please Reload the Page and Try Again " + err.status);
        EmpViewModel.reset();
    });
};

//S9:Method to Reset the template
EmpViewModel.reset = function (t) {
    this.editTemplate("readonlyTemplate");
};


$(document).ready(function () {
    ko.applyBindings(EmpViewModel);
});
// var koNode = document.getElementById('studentTable');
// ko.applyBindings(EmpViewModel, koNode);