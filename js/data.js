// Интервал обновления Stock в сек.
var STOCK_UPDATE_INTERVAL = 15;
// Дисконт условие выделения цены в Stock 
var DISCOUNT_MARKER = 110;      
// Курсы валют с Micex 
var MICEX_EXCHANGE_RATES =      
  'http://www.micex.ru/iss/statistics/engines/currency/markets/selt/rates.json';
// Котировки акций с Micex
var MICEX_STOCK_PRICES =        
  'http://www.micex.ru/iss/engines/stock/markets/shares/boards/tqbr/' 
    + 'securities.json';
// Путь к акции на Moex
var MOEX_STOCK_URL = 'http://moex.com/ru/issue.aspx?code='; 
// Не поддерживаемый браузер
var NOT_CHROME = 'Данный браузер не поддерживается. Используйте Google Chrome.'

// Структура валюты
var currencies = [
  {
    tikr: 'USD',
    name: 'Доллар'    
  },
  {
    tikr: 'EUR',
    name: 'Евро'    
  }
];

// Структура акции
var shares = [
  { 
    tikr: 'GAZP',
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
    tikr: 'SBERP',
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
    tikr: 'ROSN',
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
    tikr: 'RTKMP',
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
    tikr: 'VTBR',
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
    tikr: 'GMKN',
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
    tikr: 'MOEX',
    company: 'Московская Биржа',
    state: false,  
    target: 40,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://moex.com/s1347'
  },
  {
    tikr: 'BANEP', 
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
    tikr: 'SNGSP', 
    company: 'Сургутнефтегаз',
    state: false,   
    target: 20,
    queue: 2,
    book_value: 0,
    net_profit: 0,  
    site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
  },
  {
    tikr: 'EONR', 
    company: 'Э.ОН Россия',
    state: false,  
    target: 1.8,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
  },
  {
    tikr: 'ENRU',
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
    tikr: 'LSNGP',
    company: 'Ленэнерго',
    state: true, 
    target: 8,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.lenenergo.ru/shareholders/fin_reports/?part=1'
  },
  {
    tikr: 'HYDR',
    company: 'РусГидро',
    state: true, 
    target: 0.36,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.rushydro.ru/investors/reports'
  },
  {
    tikr: 'VRAOP',
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
    tikr: 'RSTIP',
    company: 'Российские сети',
    state: true, 
    target: 0.3,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.rosseti.ru/investors/info/financeinfo/reports/msfo'
  },
  {
    tikr: 'FEES',
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
    tikr: 'TORSP',
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
    tikr: 'MTSS',
    company: 'Мобильные ТелеСистемы',
    state: false,    
    target: 150,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
  },
  {
    tikr: 'MGTSP',
    company: 'МГТС',
    state: false, 
    target: 370,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://mgts.ru/company/investors/disclose/reports'
  },
  {
    tikr: 'MFON',
    company: 'МегаФон',
    state: false, 
    target: 610,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://corp.megafon.ru/investors/shareholder/financial_report'
  },
  {
    tikr: 'ALRS', 
    company: 'АЛРОСА',
    state: true,  
    target: 20,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
  },
  {
    tikr: 'IRKT',
    company: 'Иркут',
    state: true,    
    target: 4.4,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.irkut.com/investors-and-shareholders/statements'
  },
  {
    tikr: 'IRGZ',
    company: 'Иркутскэнерго',
    state: false,
    target: 4.1,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.irkutskenergo.ru/qa/42.2.html'
  },  
  {
    tikr: 'GCHE',
    company: 'Группа Черкизово',
    state: false, 
    target: 400,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'http://cherkizovo.com/investors/reports/financial'
  },
  {
    tikr: 'PRTK',
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
    tikr: 'PHOR',
    company: 'ФосАгро',    
    state: false, 
    target: 1000,
    queue: 2,
    book_value: 0,
    net_profit: 0,
    site: 'https://www.phosagro.ru/investors/reports/msfo'
  }, 
  {
    tikr: 'AKRN',
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

var tableTitle = [
  ['#', 7],
  ['Тикер', 55],
  ['Компания', 190],
  ['Госуч', 50],
  ['Цена', 50],
  ['Цель', 50],
  ['Дисконт', 75],
  // ['P/E', 45],
  // ['P/B', 45],
  ['Лот', 45],
  ['Тип', 55]
];