var Sets = (function namespace() {

  'use strict';

  // Unsupported browser
  var NOT_CHROME =
    'Данный браузер не поддерживается. Используйте Google Chrome.'

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
      company: 'Газпром',
      state: true,
      target: 100,
      queue: 1,
      book_value: 9816558000000,
      net_profit: 159004000000,
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.gazprom.ru/investors/disclosure/reports/2015'
    },
    {
      symbol: 'SBERP',
      company: 'Сбербанк России',
      state: true,
      target: 30,
      queue: 1,
      book_value: 2020100000000,
      net_profit: 290300000000,
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://data.sberbank.ru/moscow/ru/investor_relations/' +
      'accountability/fin_reports_ifrs/?base=beta'
    },
    {
      symbol: 'ROSN',
      company: 'Роснефть',
      state: true,
      target: 120,
      queue: 1,
      book_value: 2872000000000,
      net_profit: 348000000000,
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.rosneft.ru/Investors/statements_and_presentations'
    },
    {
      symbol: 'RTKMP',
      company: 'Ростелеком',
      state: true,
      target: 30,
      queue: 1,
      book_value: 255966000000,
      net_profit: 35240000000,
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.rostelecom.ru/ir/results_and_presentations/financials/' +
      'IFRS'
    },
    {
      symbol: 'VTBR',
      company: 'Банк ВТБ',
      state: true,
      target: 0.03,
      queue: 1,
      book_value: 0,
      net_profit: 0,
      rep_type: 'МСФО&nbsp;2014',
      site: 'http://www.vtb.ru/ir/statements'
    },
    {
      symbol: 'GMKN',
      company: 'Норильский никель',
      state: false,
      target: 4000,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.nornik.ru/investoram/raskryitie-informaczii/' +
      'ezhekvartalnyie-otchetyi-emitenta'
    },
    {
      symbol: 'MOEX',
      company: 'Московская Биржа',
      state: false,
      target: 40,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://moex.com/s1347'
    },
    {
      symbol: 'BANEP',
      company: 'Башнефть',
      state: true,
      target: 700,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.bashneft.ru/shareholders_and_investors/disclosure/' +
      'quarterly'
    },
    {
      symbol: 'SNGSP',
      company: 'Сургутнефтегаз',
      state: false,
      target: 20,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
    },
    {
      symbol: 'EONR',
      company: 'Э.ОН Россия',
      state: false,
      target: 1.8,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
    },
    {
      symbol: 'ENRU',
      company: 'Энел Россия',
      state: false,
      target: 0.6,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://enel.ru/press_center/investor_information/' +
      'financial_statements/ifsr_financial_statements/index.php'
    },
    {
      symbol: 'LSNGP',
      company: 'Ленэнерго',
      state: true,
      target: 8,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.lenenergo.ru/shareholders/fin_reports/?part=1'
    },
    {
      symbol: 'HYDR',
      company: 'РусГидро',
      state: true,
      target: 0.36,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.rushydro.ru/investors/reports'
    },
    {
      symbol: 'VRAOP',
      company: 'РАО ЭС Востока',
      state: true,
      target: 0.07,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.rao-esv.ru/shareholders-and-investors/' +
      'financial-statements/ifrs'
    },
    {
      symbol: 'RSTIP',
      company: 'Российские сети',
      state: true,
      target: 0.3,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.rosseti.ru/investors/info/financeinfo/reports/msfo'
    },
    {
      symbol: 'FEES',
      company: 'ФСК ЕЭС',
      state: true,
      target: 0.05,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.fsk-ees.ru/shareholders_and_investors/' +
      'financial_information/reporting_under_ifrs'
    },
    {
      symbol: 'TORSP',
      company: 'Томская РП',
      state: false,
      target: 0.1,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.trk.tom.ru/investors/disclosure/finance.php?' +
      'bitrix_include_areas=Y&clear_cache=Y&year=По+МСФО'
    },
    {
      symbol: 'MTSS',
      company: 'Мобильные ТелеСистемы',
      state: false,
      target: 150,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
    },
    {
      symbol: 'MGTSP',
      company: 'МГТС',
      state: false,
      target: 370,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://mgts.ru/company/investors/disclose/reports'
    },
    {
      symbol: 'MFON',
      company: 'МегаФон',
      state: false,
      target: 610,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://corp.megafon.ru/investors/shareholder/financial_report'
    },
    {
      symbol: 'ALRS',
      company: 'АЛРОСА',
      state: true,
      target: 20,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
    },
    {
      symbol: 'IRKT',
      company: 'Иркут',
      state: true,
      target: 4.4,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.irkut.com/investors-and-shareholders/statements'
    },
    {
      symbol: 'IRGZ',
      company: 'Иркутскэнерго',
      state: false,
      target: 4.1,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.irkutskenergo.ru/qa/42.2.html'
    },
    {
      symbol: 'GCHE',
      company: 'Группа Черкизово',
      state: false,
      target: 400,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://cherkizovo.com/investors/reports/financial'
    },
    {
      symbol: 'PRTK',
      company: 'ПРОТЕК',
      state: false,
      target: 18,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'http://www.protek-group.ru/ru/4investors/oao-protek/' +
      'financial-results1'
    },
    {
      symbol: 'PHOR',
      company: 'ФосАгро',
      state: false,
      target: 1000,
      queue: 2,
      book_value: 0,
      net_profit: 0,
      site: 'https://www.phosagro.ru/investors/reports/msfo'
    },
    {
      symbol: 'AKRN',
      company: 'Акрон',
      state: false,
      target: 900,
      queue: 2,
      book_value: 0,
      net_profit: 0,
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
    ['Company Name', 190],
    ['State', 50],
    ['Price', 50],
    ['Target', 50],
    ['Discount', 75],
    // ['P/E', 45],
    // ['P/B', 45],
    ['Lot', 45],
    ['Type', 55]
  ];

  // Stocks body template
  var stockBodyTmp = ' \
  <tr> \
    <td>${queue}</td> \
    <td><a href=${moex}>${symbol}</a></td> \
    <td><a href=${site} title=${rep_type}>${company}</a></td> \
    <td>${state_part}</td> \
    <td${price_class}>${price}</td> \
    <td>${target}</td> \
    <td>${discount}</td> \
    <td>${lot}</td> \
    <td>${type}</td> \
  </tr>';

  return {

    NOT_CHROME: NOT_CHROME,
    currencyTemplate: currTmp,
    objStocks: objStocks,
    stockHeaderTemplate: stockHeaderTmp,
    stockBodyTemplate: stockBodyTmp

  };

}());