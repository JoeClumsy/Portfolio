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
    target: 100,
    book_value: 9816558000000,
    net_profit: 159004000000,
    site: 'http://www.gazprom.ru/investors/disclosure/reports/2015'
  },
  {
    tikr: 'SBERP',
    company: 'Сбербанк России',  
    target: 30,
    book_value: 2020100000000,
    net_profit: 290300000000,
    site: 'http://data.sberbank.ru/moscow/ru/investor_relations/' + 
      'accountability/fin_reports_ifrs/?base=beta'
  }, 
  { 
    tikr: 'ROSN',
    company: 'Роснефть',
    target: 120,
    book_value: 2872000000000,
    net_profit: 348000000000,
    site: 'http://www.rosneft.ru/Investors/statements_and_presentations'
  },  
  {
    tikr: 'RTKMP',
    company: 'Ростелеком', 
    target: 30,
    book_value: 24151000000,
    net_profit: 37520000000,
    site: 'http://www.rostelecom.ru/ir/results_and_presentations/financials/' + 
      'IFRS'
  },
  {
    tikr: 'VTBR',
    company: 'Банк ВТБ', 
    target: 0.03,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.vtb.ru/ir/statements'
  },
  {
    tikr: 'GMKN',
    company: 'Норильский никель',
    target: 4000,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.nornik.ru/investoram/raskryitie-informaczii/' + 
      'ezhekvartalnyie-otchetyi-emitenta'
  },
  {
    tikr: 'MOEX',
    company: 'Московская Биржа', 
    target: 40,
    book_value: 0,
    net_profit: 0,
    site: 'http://moex.com/s1347'
  },
  {
    tikr: 'BANEP', 
    company: 'Башнефть',   
    target: 700,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.bashneft.ru/shareholders_and_investors/disclosure/' + 
      'quarterly'
  },
  {
    tikr: 'SNGSP', 
    company: 'Сургутнефтегаз',   
    target: 20,
    book_value: 0,
    net_profit: 0,  
    site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
  },
  {
    tikr: 'EONR', 
    company: 'Э.ОН Россия',  
    target: 1.8,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
  },
  {
    tikr: 'ENRU',
    company: 'Энел Россия', 
    target: 0.6,
    book_value: 0,
    net_profit: 0,
    site: 'http://enel.ru/press_center/investor_information/' + 
      'financial_statements/ifsr_financial_statements/index.php'
  },
  {
    tikr: 'LSNGP',
    company: 'Ленэнерго', 
    target: 8,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.lenenergo.ru/shareholders/fin_reports/?part=1'
  },
  {
    tikr: 'HYDR',
    company: 'РусГидро', 
    target: 0.36,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.rushydro.ru/investors/reports'
  },
  {
    tikr: 'VRAOP',
    company: 'РАО ЭС Востока', 
    target: 0.07,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.rao-esv.ru/shareholders-and-investors/' + 
      'financial-statements/ifrs'
  },
  {
    tikr: 'RSTIP',
    company: 'Российские сети', 
    target: 0.3,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.rosseti.ru/investors/info/financeinfo/reports/msfo'
  },
  {
    tikr: 'FEES',
    company: 'ФСК ЕЭС', 
    target: 0.05,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.fsk-ees.ru/shareholders_and_investors/' + 
      'financial_information/reporting_under_ifrs'
  },
  {
    tikr: 'TORSP',
    company: 'Томская РП', 
    target: 0.1,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.trk.tom.ru/investors/disclosure/finance.php?' + 
      'bitrix_include_areas=Y&clear_cache=Y&year=По+МСФО'
  },
  {
    tikr: 'MTSS',
    company: 'Мобильные ТелеСистемы',    
    target: 150,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
  },
  {
    tikr: 'MGTSP',
    company: 'МГТС', 
    target: 370,
    book_value: 0,
    net_profit: 0,
    site: 'http://mgts.ru/company/investors/disclose/reports'
  },
  {
    tikr: 'MFON',
    company: 'МегаФон', 
    target: 610,
    book_value: 0,
    net_profit: 0,
    site: 'http://corp.megafon.ru/investors/shareholder/financial_report'
  },
  {
    tikr: 'ALRS', 
    company: 'АЛРОСА',  
    target: 20,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
  },
  {
    tikr: 'IRKT',
    company: 'Иркут',    
    target: 4.4,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.irkut.com/investors-and-shareholders/statements'
  },
  {
    tikr: 'IRGZ',
    company: 'Иркутскэнерго',
    target: 4.1,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.irkutskenergo.ru/qa/42.2.html'
  },  
  {
    tikr: 'GCHE',
    company: 'Группа Черкизово', 
    target: 400,
    book_value: 0,
    net_profit: 0,
    site: 'http://cherkizovo.com/investors/reports/financial'
  },
  {
    tikr: 'PRTK',
    company: 'ПРОТЕК', 
    target: 18,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.protek-group.ru/ru/4investors/oao-protek/' + 
      'financial-results1'
  },      
  {
    tikr: 'PHOR',
    company: 'ФосАгро', 
    target: 1000,
    book_value: 0,
    net_profit: 0,
    site: 'https://www.phosagro.ru/investors/reports/msfo'
  }, 
  {
    tikr: 'AKRN',
    company: 'Акрон', 
    target: 900,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.acron.ru/investors/financial_statement/?' + 
      'set_filter=Y&arFilterDocument_46_4163016541=Y&' + 
      'arFilterDocument_IBLOCK_SECTION_ID_326707096=Y&' + 
      'arFilterDocument_YEAR_3487811895=Y'
  }
];

var tableTitle = [
  ['Тикер', 55],
  ['Компания', 190],
  ['Цена', 50],
  ['Цель', 50],
  ['Дисконт', 75],
  ['P/E', 45],
  ['P/B', 45],
  ['Лот', 45],
  ['Тип', 55]
];