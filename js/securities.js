'use strict';

// --- Securities Abstract -----------------------------------------------------

// Constructor
function Securities() {
}

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

  if (!request.responseText) {
    return null;
  }

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
  this.MICEX_STOCK_PRICES_URL =
      'http://www.micex.ru/iss/engines/stock/markets/shares/boards/tqbr/' +
      'securities.json';
  this.MOEX_STOCK_URL = 'http://moex.com/en/issue.aspx?code=';
  this.DISCOUNT_MARKER = 110;
  this.UPDATE_INTERVAL = 15;
  this.ORDINARY = 'ordinary';
  this.PREFERRED = 'preferred';
  this.STATE_PART_YES = 'yes';
  this.STATE_PART_NO = 'no';
  this.shares = {};
}

// Inheritance
Stocks.prototype = Object.create(Securities.prototype);
Stocks.prototype.constructor = Stocks;

// Private get quotes from Micex
Stocks.prototype.getQuotes_ = function() {
  var quotes = {};

  var responseData = Securities.prototype.getExternalData_(
      this.MICEX_STOCK_PRICES_URL
  );

  if (!responseData) {
    return null;
  }

  var secData = responseData.securities.data;
  var marketData = responseData.marketdata.data;

  for (var i = 0, len = secData.length; i < len; i++) {
    quotes[secData[i][0]] = {
      lot: secData[i][4] === null ? null : secData[i][4],
      price: marketData[i][12] === null ? null : marketData[i][12],
      volume: secData[i][18] === null ? null : secData[i][18],
      moex: this.MOEX_STOCK_URL + secData[i][0],
      type: secData[i][25] === '1' ? this.ORDINARY : this.PREFERRED
    };
  }

  return quotes;
};

// Public get Quotes
Stocks.prototype.getQuotes = function() {
  var self = this;
  var quotes = this.getQuotes_();

  portfolio.sets.objStocks.forEach( function(item) {
    item.state_part = item.state ? self.STATE_PART_YES : self.STATE_PART_NO;

    item.lot = quotes[item.symbol].lot === null ?
        null :
        quotes[item.symbol].lot;

    item.price = quotes[item.symbol].price === null ?
        null :
        quotes[item.symbol].price;

    item.volume = quotes[item.symbol].volume === null ?
        null :
        quotes[item.symbol].volume;

    item.moex = quotes[item.symbol].moex === null ?
        null :
        quotes[item.symbol].moex;

    item.type = quotes[item.symbol].type === null ?
        null :
        quotes[item.symbol].type;

    item.price_class = item.discount < self.DISCOUNT_MARKER ? ' class=buy' : '';

    item.discount = item.price === null ?
        null :
        (Math.round(item.price * 100 / item.target * 100) / 100).toFixed(2) +
        '%';

    item.pe = item.net_profit === null ?
        null :
        (Math.round(item.volume * item.price / item.net_profit * 100)).
            toFixed(2) / 100 ;

    item.pb = item.book_value === null ? null:
        (Math.round(item.volume * item.price / item.book_value * 100)).
            toFixed(2) / 100;
  });

   this.shares = portfolio.sets.objStocks;
 };


// --- Currencies --------------------------------------------------------------

// Constructor
function Currencies() {
  this.MICEX_EXCHANGE_RATES_URL =
      'http://www.micex.ru/iss/statistics/engines/currency/markets/selt/' +
      'rates.json';
  this.Curr = {};
}

// Inheritance
Currencies.prototype = Object.create(Securities.prototype);
Currencies.prototype.constructor = Currencies;

// Exchange rates from Micex
Currencies.prototype.getRates = function() {
  var responseData = Securities.prototype.getExternalData_(
      this.MICEX_EXCHANGE_RATES_URL
  );

  if (!responseData) {
    return;
  }

  var metaData = responseData.cbrf.data;

  portfolio.sets.currencyTemplate[0].price = metaData[0][3] === null ?
      null :
      metaData[0][3];

  portfolio.sets.currencyTemplate[1].price = metaData[0][6] === null ?
      null :
      metaData[0][6];

  this.Curr = portfolio.sets.currencyTemplate;
};