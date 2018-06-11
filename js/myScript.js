'use strict';

var viewModel = {
    students: ko.observableArray(),
    courses: ko.observableArray(),
    grades: ko.observableArray()
};

function getStudents() {
    $.ajax({
        url: "http://localhost:8080/students",
        method: "GET",
        accept: 'application/json'
    }).then(function (data) {
        console.log(data)

        viewModel.students = ko.mapping.fromJS(data);
        var koNode = document.getElementById('studentTable');
        // ko.cleanNode(koNode);
        ko.applyBindings(viewModel.students(), koNode);
    });
}


$( document ).ready(function() {
    // console.log( "ready!" );

    getStudents();
});