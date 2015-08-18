'use strict';

// Constructor
function Table(
    table_caption,
    table_sorting,
    body_id,
    script_id,
    header_tmplate,
    script_tmplate
) {
  this.table_class = this.table_id = this.table_caption = table_caption;
  this.table_sorting = table_sorting;
  this.script_id = script_id;
  this.script_tmplate = script_tmplate;
  this.body_id = body_id;
  this.header_tmplate = header_tmplate;
}

// Add table template to page
Table.prototype.addTableTmp = function() {
  $('<script/>', {
    id: this.script_id,
    type: 'text/x-jquery-tmpl',
    text: this.script_tmplate
  }).appendTo('body');
};

// Add table to page
Table.prototype.addTable = function() {
  // Table frame
  var tbl = $('<table/>', {
    class: this.table_class,
    id: this.table_id
    }).append(
      $('<caption/>', {
        text: this.table_caption
      }),
      $('<thead/>'),
      $('<tbody/>', {
        id: this.body_id
    })
  );

  // Header
  var titleCell = $('<tr/>');

  $.each(this.header_tmplate, function(i, data) {
    titleCell.append(
      $('<th/>', {
        text: data[0],
        width: data[1]
      })
    );
  });

  $('thead', tbl).append(titleCell);
  $('body').append(tbl);

  // Sorting
  $('#' + this.table_id).tablesorter({
    cssAsc: 'headerSortUp',
    cssDesc: 'headerSortDown',
    cssHeader: 'header',
    cancelSelection: true, // TH
    sortReset: true, // third mouse click
    sortRestart : true, // init sort by click on unsorting column
    //sortInitialOrder: 'asc',
    widgets: ['saveSort'] // save sorting
  });

  $('#' + this.table_id).trigger('saveSortReset'); // clear save sort
  $('#' + this.table_id).trigger("sortReset"); // clear current sort

  // Initial sorting
  $('#' + this.table_id).trigger('sorton', [this.table_sorting]);
};

// Update data in table
Table.prototype.updateData = function(data) {
  $('#' + this.body_id).empty();
  $('#' + this.script_id).tmpl(data).appendTo('#' + this.body_id);
  $('#' + this.table_id).trigger('update');
};