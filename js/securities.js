'use strict';

// --- Securities Abstract -----------------------------------------------------

// Constructor
function Securities() {

};

// Get data from any site
Securities.prototype.getExternalData_ = function(requestURL) {
  var request = new XMLHttpRequest();

  request.open('GET', requestURL, false);

  try {
    request.send();
  }
  catch(e) {
    console.log(e.message);
  }

  if (!request.responseText) return null;

  return JSON.parse(request.responseText);
};

// Inheritance function
//function inherits(child, parent) {
//  var F = function() {};
//  F.prototype = parent.prototype;
//  child.prototype = new F();
//  child.prototype.constructor = child;
//};
//
//// Inheritance
//inherits(Stocks, Securities);


// --- Stocks ------------------------------------------------------------------

// Constructor
function Stocks() {   //Securities.call(this);

  this.shares = {};

};

// Inheritance
Stocks.prototype = Object.create(Securities.prototype);
Stocks.prototype.constructor = Stocks;

// Properties
Stocks.prototype.MICEX_STOCK_PRICES =
  'http://www.micex.ru/iss/engines/stock/markets/shares/boards/tqbr/' +
  'securities.json';
Stocks.prototype.MOEX_STOCK_URL = 'http://moex.com/ru/issue.aspx?code=';
Stocks.prototype.DISCOUNT_MARKER = 110;
Stocks.prototype.UPDATE_INTERVAL = 15;

// Private get quotes from Micex
Stocks.prototype.getQuotes_ = function() {

  var quotes = {};

  var responseData = Securities.prototype.getExternalData_(
   this.MICEX_STOCK_PRICES
  );

  if (!responseData) return null;

  var secData = responseData.securities.data;
  var marketData = responseData.marketdata.data;

  for (var i = 0; i < secData.length; i++) {

    quotes[secData[i][0]] = {
      lot: secData[i][4] || null,
      price: marketData[i][12] || null,
      volume: secData[i][18] || null,
      moex: this.MOEX_STOCK_URL + secData[i][0],
      type: secData[i][25] == 1 ? 'обыч' : 'прив'
    };

  }

  return quotes;

};

// Public get Quotes
Stocks.prototype.getQuotes = function() {

  var sets = Sets;
  var self = this;
  var quotes = this.getQuotes_();

  sets.objStocks.forEach( function(item) {

    item.state_part = item.state ? 'Да' : 'Нет';
    item.lot = quotes[item.symbol].lot || item.lot || null;
    item.price = quotes[item.symbol].price || item.price || null;
    item.volume = quotes[item.symbol].volume || item.volume || null;
    item.moex = quotes[item.symbol].moex;
    item.type = quotes[item.symbol].type;
    item.price_class = item.discount < self.DISCOUNT_MARKER ? ' class=buy' : '';
    item.discount = item.price ?
     (Math.round(item.price * 100 / item.target * 100) / 100).toFixed(2) +
     '%' : null;
    item.pe = item.net_profit ?
     (Math.round(item.volume * item.price / item.net_profit * 100)).
     toFixed(2) / 100 : null;
    item.pb = item.book_value ?
     (Math.round(item.volume * item.price / item.book_value * 100)).
     toFixed(2) / 100 : null;

  });

   this.shares = sets.objStocks;

 };


// --- Currencies --------------------------------------------------------------

// Constructor
function Currencies() {

  this.Curr = {};

}

// Inheritance
Currencies.prototype = Object.create(Securities.prototype);
Currencies.prototype.constructor = Currencies;

// Properties
Currencies.prototype.MICEX_EXCHANGE_RATES =
  'http://www.micex.ru/iss/statistics/engines/currency/markets/selt/rates.json';

// Exchange rates from Micex
Currencies.prototype.getRates = function() {

  var sets = Sets;

  var responseData = Securities.prototype.getExternalData_(
    this.MICEX_EXCHANGE_RATES);

  if (!responseData) return;

  var metaData = responseData.cbrf.data;

  sets.currencyTemplate[0].price = metaData[0][3];
  sets.currencyTemplate[1].price = metaData[0][6];

  this.Curr = sets.currencyTemplate;

}