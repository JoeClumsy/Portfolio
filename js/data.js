// Интервал обновления Stock в сек.
var STOCK_UPDATE_INTERVAL = 15;
// Процент дисконта выделения цены в Stock 
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
    target: 110,
    book_value: 9816558000000,
    net_profit: 159004000000,
    site: 'http://www.gazprom.ru/investors/disclosure/reports/2015'
  },
  { 
    tikr: 'ROSN',
    company: 'Роснефть',
    target: 180,
    book_value: 2872000000000,
    net_profit: 348000000000,
    site: 'http://www.rosneft.ru/Investors/statements_and_presentations'
  },  
  {
    tikr: 'RTKMP',
    company: 'Ростелеком', 
    target: 45,
    book_value: 24151000000,
    net_profit: 37520000000,
    site: 'http://www.rostelecom.ru/ir/results_and_presentations/financials/IFRS'
  },
  {
    tikr: 'SBERP',
    company: 'Сбербанк России',  
    target: 47,
    book_value: 2020100000000,
    net_profit: 290300000000,
    site: 'http://data.sberbank.ru/moscow/ru/investor_relations/accountability/fin_reports_ifrs/?base=beta'
  }, 
  {
    tikr: 'ALRS', 
    company: 'АЛРОСА',  
    target: 15,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
  },
  {
    tikr: 'BANEP', 
    company: 'Башнефть',   
    target: 950,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.bashneft.ru/shareholders_and_investors/disclosure/quarterly'
  },
  {
    tikr: 'EONR', 
    company: 'Э.ОН Россия',  
    target: 1.6,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
  },
  {
    tikr: 'GMKN',
    company: 'Норильский никель',
    target: 4500,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.nornik.ru/investoram/raskryitie-informaczii/ezhekvartalnyie-otchetyi-emitenta'
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
    tikr: 'IRKT',
    company: 'Иркут',    
    target: 4.4,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.irkut.com/investors-and-shareholders/statements'
  },
  {
    tikr: 'MTSS',
    company: 'Мобильные ТелеСистемы',    
    target: 180,
    book_value: 0,
    net_profit: 0,
    site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
  },
  {
    tikr: 'SNGSP', 
    company: 'Сургутнефтегаз',   
    target: 16,
    book_value: 0,
    net_profit: 0,  
    site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
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