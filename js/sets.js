'use strict';

var portfolio = {};

portfolio.sets = (function namespace() {
  var NOT_CHROME = 'This browser unsupported. Use Google Chrome.';
  var MICEX_INDEX_URL = 'http://moex.com/en/index/MICEXINDEXCF/technical';
  var MICEX_STOCK_PRICES_URL =
      'http://www.micex.ru/iss/engines/stock/markets/shares/boards/tqbr/' +
      'securities.json';
  var MICEX_EXCHANGE_RATES_URL =
      'http://www.micex.ru/iss/statistics/engines/currency/markets/selt/' +
      'rates.json';
  var MOEX_STOCK_URL = 'http://moex.com/en/issue.aspx?code=';
  var DISCOUNT_MARKER = 110;
  var UPDATE_INTERVAL = 15;
  var ORDINARY = 'ordinary';
  var PREFERRED = 'preferred';
  var STATE_PART_YES = 'yes';
  var STATE_PART_NO = 'no';
  var STOCK_INIT_SORTING = [[3, 1], [6, 0]];

  // Currencies template
  var currTmp = [
    {
      symbol: 'USD',
      name: 'Доллар'
    },
    {
      symbol: 'EUR',
      name: 'Евро'
    }
  ];

  // Stocks object !!! rename
  var objStocks = [
    {
      symbol: 'GAZP',
      company: 'Gazprom',
      state: true,
      target: 100,
      queue: 1,
      book_value: 9816558000000,
      net_profit: 159004000000,
      div_14_12: [7.2, 7.2, 5.99],
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.gazprom.ru/investors/disclosure/reports/2015'
    },
    {
      symbol: 'SBERP',
      company: 'Sberbank of Russia',
      state: true,
      target: 30,
      queue: 1,
      book_value: 2020100000000,
      net_profit: 290300000000,
      div_14_12: [0.45, 3.2, 3.2],
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://data.sberbank.ru/moscow/ru/investor_relations/' +
      'accountability/fin_reports_ifrs/?base=beta'
    },
    {
      symbol: 'ROSN',
      company: 'Rosneft Oil Company',
      state: true,
      target: 120,
      queue: 1,
      book_value: 2872000000000,
      net_profit: 348000000000,
      div_14_12: [8.21, 12.85, 8.05],
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.rosneft.ru/Investors/statements_and_presentations'
    },
    {
      symbol: 'RTKMP',
      company: 'Rostelecom',
      state: true,
      target: 30,
      queue: 1,
      book_value: 255966000000,
      net_profit: 35240000000,
      div_14_12: [4.05, 4.848555415, 4.1022],
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.rostelecom.ru/ir/results_and_presentations/' +
      'financials/IFRS'
    },
    {
      symbol: 'VTBR',
      company: 'VTB Bank',
      state: true,
      target: 0.03,
      queue: 1,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.00117, 0.00116, 0.00143],
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.vtb.ru/ir/statements'
    },
    {
      symbol: 'GMKN',
      company: 'Norilsk Nickel',
      state: false,
      target: 4000,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [670.04, 469.17, 400.83],
      site: 'http://www.nornik.ru/investoram/raskryitie-informaczii/' +
      'ezhekvartalnyie-otchetyi-emitenta'
    },
    {
      symbol: 'MOEX',
      company: 'Moscow Exchange MICEX-RTS',
      state: false,
      target: 40,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [3.87, 2.38, 1.22],
      site: 'http://moex.com/s1347'
    },
    {
      symbol: 'BANEP',
      company: 'Oil Company Bashneft',
      state: true,
      target: 700,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [113, 211, 24],
      site: 'http://www.bashneft.ru/shareholders_and_investors/disclosure/' +
      'quarterly'
    },
    {
      symbol: 'SNGSP',
      company: 'Surgutneftegas',
      state: false,
      target: 20,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [8.21, 2.36, 1.48],
      site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
    },
    {
      symbol: 'EONR',
      company: 'E.ON Russia',
      state: false,
      target: 1.8,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.27, 0.379, 0.29],
      site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
    },
    {
      symbol: 'ENRU',
      company: 'Enel Russia',
      state: false,
      target: 0.6,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.080731, 0.0559, 0],
      site: 'http://enel.ru/press_center/investor_information/' +
      'financial_statements/ifsr_financial_statements/index.php'
    },
    {
      symbol: 'LSNGP',
      company: 'Lenenergo',
      state: true,
      target: 8,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0, 0.4556, 1.323473504],
      site: 'http://www.lenenergo.ru/shareholders/fin_reports/?part=1'
    },
    {
      symbol: 'HYDR',
      company: 'RusHydro',
      state: true,
      target: 0.36,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.01561855, 0.01358751, 0.00955606],
      site: 'http://www.rushydro.ru/investors/reports'
    },
    {
      symbol: 'VRAOP',
      company: 'RAO Energy System of the East',
      state: true,
      target: 0.07,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0, 0, 0],
      site: 'http://www.rao-esv.ru/shareholders-and-investors/' +
      'financial-statements/ifrs'
    },
    {
      symbol: 'RSTIP',
      company: 'Rosseti',
      state: true,
      target: 0.3,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0, 0, 0.08],
      site: 'http://www.rosseti.ru/investors/info/financeinfo/reports/msfo'
    },
    {
      symbol: 'FEES',
      company: 'Federal Grid Company of UES',
      state: true,
      target: 0.05,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.000664788, 0, 0],
      site: 'http://www.fsk-ees.ru/shareholders_and_investors/' +
      'financial_information/reporting_under_ifrs'
    },
    {
      symbol: 'TORSP',
      company: 'Tomsk Distribution Company',
      state: false,
      target: 0.1,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0, 0, 0],
      site: 'http://www.trk.tom.ru/investors/disclosure/finance.php?' +
      'bitrix_include_areas=Y&clear_cache=Y&year=По+МСФО'
    },
    {
      symbol: 'MTSS',
      company: 'Mobile TeleSystems',
      state: false,
      target: 150,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [19.56, 23.82, 14.6],
      site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
    },
    {
      symbol: 'MGTSP',
      company: 'Moscow City Telephone Network',
      state: false,
      target: 370,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [56.27, 0, 0],
      site: 'http://mgts.ru/company/investors/disclose/reports'
    },
    {
      symbol: 'MFON',
      company: 'MegaFon',
      state: false,
      target: 610,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [16.13, 64.51, 54.17],
      site: 'http://corp.megafon.ru/investors/shareholder/financial_report'
    },
    {
      symbol: 'ALRS',
      company: 'Alrosa',
      state: true,
      target: 20,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [1.47, 1.47, 1.11],
      site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
    },
    {
      symbol: 'IRKT',
      company: 'Irkut Corporation',
      state: true,
      target: 4.4,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.5, 0.45, 0.44],
      site: 'http://www.irkut.com/investors-and-shareholders/statements'
    },
    {
      symbol: 'IRGZ',
      company: 'Irkutsk',
      state: false,
      target: 4.1,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [0.53, 0.41, 0.53],
      site: 'http://www.irkutskenergo.ru/qa/42.2.html'
    },
    {
      symbol: 'GCHE',
      company: 'Cherkizovo Group',
      state: false,
      target: 400,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [54.6, 34.44, 0],
      site: 'http://cherkizovo.com/investors/reports/financial'
    },
    {
      symbol: 'PRTK',
      company: 'Protek',
      state: false,
      target: 18,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [1.9, 6.03, 1.63],
      site: 'http://www.protek-group.ru/ru/4investors/oao-protek/' +
      'financial-results1'
    },
    {
      symbol: 'PHOR',
      company: 'PhosAgro',
      state: false,
      target: 1000,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [35, 44.3, 35.35],
      site: 'https://www.phosagro.ru/investors/reports/msfo'
    },
    {
      symbol: 'AKRN',
      company: 'Acron',
      state: false,
      target: 900,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      div_14_12: [139, 152, 64],
      site: 'http://www.acron.ru/investors/financial_statement/?' +
      'set_filter=Y&arFilterDocument_46_4163016541=Y&' +
      'arFilterDocument_IBLOCK_SECTION_ID_326707096=Y&' +
      'arFilterDocument_YEAR_3487811895=Y'
    }
  ];

  // Stocks header template
  var stockHeaderTmp = [
    ['#', 7],
    ['Symbol', 55],
    ['Company Name', 200],
    ['State', 30],
    ['Price', 50],
    ['Target', 50],
    ['Discount', 70],
    ['Calc Price', 70],
    ['Avg Divs', 60],
    // ['P/E', 45],
    // ['P/B', 45],
    ['Lot', 45],
    ['Type', 65]
  ];

  // Stocks body template
  var stockBodyTmp =
      '<tr>' +
        '<td>${queue}</td>' +
        '<td><a href=${moex}>${symbol}</a></td>' +
        '<td><a href=${site} title=${rep_type}>${company}</a></td>' +
        '<td>${state_part}</td>' +
        '<td${price_class}>${price}</td>' +
        '<td>${target}</td>' +
        '<td>${discount}</td>' +
        '<td>${calc_price}</td>' +
        '<td>${avg_divs}</td>' +
        '<td>${lot}</td>' +
        '<td>${type}</td>' +
      '</tr>';

  return {
    NOT_CHROME: NOT_CHROME,
    MICEX_INDEX_URL: MICEX_INDEX_URL,
    MICEX_STOCK_PRICES_URL: MICEX_STOCK_PRICES_URL,
    MICEX_EXCHANGE_RATES_URL: MICEX_EXCHANGE_RATES_URL,
    MOEX_STOCK_URL: MOEX_STOCK_URL,
    DISCOUNT_MARKER: DISCOUNT_MARKER,
    UPDATE_INTERVAL: UPDATE_INTERVAL,
    ORDINARY: ORDINARY,
    PREFERRED: PREFERRED,
    STATE_PART_YES: STATE_PART_YES,
    STATE_PART_NO: STATE_PART_NO,
    STOCK_INIT_SORTING: STOCK_INIT_SORTING,
    currencyTemplate: currTmp,
    objStocks: objStocks,
    stockHeaderTemplate: stockHeaderTmp,
    stockBodyTemplate: stockBodyTmp
  };
}());