'use strict';

$(document).ready(function() {

  if (isNotChrome()) return;

  var currencies = new Currencies();
  currencies.getRates();

  var stocks = new Stocks();
  stocks.getQuotes();

  var tableStocks = new Table(
    'Stocks',
    'stocksBody',
    'stocksScript',
    stockHeaderTmp,
    stockBodyTmp
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
   if (navigator.userAgent.search(/Chrome/) != -1) return false;

   $('<p/>', {
     text: NOT_CHROME
   }).appendTo('body');

   return true;
 }