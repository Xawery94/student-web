'use strict';

function tableRow(number, ownerViewModel) {
    this.number = ko.observable(number);
    this.remove = function() {
        ownerViewModel.tableRows.destroy(this);
    }
}

function tableRowsViewModel() {
    var that = this;
    this.tableRows = ko.observableArray([]);
    this.addNewRow = function() {
        this.tableRows.push(new tableRow('', that));
    }
    this.addNewRow();

    this.lastRowValue = ko.dependentObservable(function() {
        var rows = that.tableRows();
        return rows.length ? rows[rows.length - 1].number() : null;
    });

    this.lastRowValue.subscribe(function(newValue) {
        if (newValue) {
            that.tableRows.push(new tableRow('', that));
        }
    });
}

$(document).ready(function() {
    ko.applyBindings(new tableRowsViewModel());
});