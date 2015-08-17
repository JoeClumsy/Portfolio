'use strict';

$(document).ready(function() {
  var sets = Sets;

  if (isNotChrome()) return;

  var currencies = new Currencies();
  currencies.getRates();

  // Refactoring it!
  var currString = currencies.Curr[0].symbol + ': ' + currencies.Curr[0].price +
      '\u00a0\u00a0' + currencies.Curr[1].symbol + ': ' +
      currencies.Curr[1].price;

  var header = $('<div></div>')
      .append('<a href =' + sets.MICEX_INDEX_URL +
      '>MICEX Index</a>\u00a0\u00a0' + '<text>' + currString + '</text><p/>');
  $('body').append(header);

  var stocks = new Stocks();
  stocks.getQuotes();

  var tableStocks = new Table(
      'Stocks',
      sets.STOCK_INIT_SORTING,
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
      stocks.UPDATE_INTERVAL * 1000
  )
})

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