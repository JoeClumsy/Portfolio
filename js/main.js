'use strict';

$(document).ready(function() {
  if (isNotChrome()) {
    return;
  }

  var currencies = new Currencies();
  currencies.getRates();

  // Refactoring it!
  var currString = currencies.Curr[0].symbol + ': ' + currencies.Curr[0].price +
      '\u00a0\u00a0' + currencies.Curr[1].symbol + ': ' +
      currencies.Curr[1].price;

  var header = $('<div></div>')
      .append('<a href =' + portfolio.sets.MICEX_INDEX_URL +
      '>MICEX Index</a>\u00a0\u00a0' + '<text>' + currString + '</text><p/>');
  $('body').append(header);

  var stocks = new Stocks();
  stocks.getQuotes();

  var tableStocks = new Table(
      'Stocks',
      portfolio.sets.STOCK_INIT_SORTING,
      'stocksBody',
      'stocksScript',
      portfolio.sets.stockHeaderTemplate,
      portfolio.sets.stockBodyTemplate
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
});

 // Check 4 Chrome
function isNotChrome() {
  if (navigator.userAgent.search(/Chrome/) != -1) {
    return false;
  }

  $('<p/>', {
    text: portfolio.sets.NOT_CHROME
  }).appendTo('body');

  return true;
}