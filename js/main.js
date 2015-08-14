'use strict';

$(document).ready(function() {
  var sets = Sets;

  if (isNotChrome()) return;

  var currencies = new Currencies();
  currencies.getRates();

  var stocks = new Stocks();
  stocks.getQuotes();

  var tableStocks = new Table(
      'Stocks',
      'stocksBody',
      'stocksScript',
      sets.stockHeaderTemplate,
      sets.stockBodyTemplate
  );
  tableStocks.addTableTmp();
  tableStocks.addTable();
  tableStocks.updateData(stocks.shares);

  setInterval(
      function() {
        stocks.getQuotes();
        tableStocks.updateData(stocks.shares);
      },
      stocks.UPDATE_INTERVAL * 1000);
});

 // Check 4 Chrome
 function isNotChrome() {
   var sets = Sets;

   if (navigator.userAgent.search(/Chrome/) != -1) {
     return false;
   }

   $('<p/>', {
     text: sets.NOT_CHROME
   }).appendTo('body');

   return true;
 }