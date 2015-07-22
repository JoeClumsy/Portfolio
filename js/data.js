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
    site: 'http://www.gazprom.ru/investors/reports/2014'
  },
  { 
    tikr: 'ROSN',
    company: 'Роснефть',
    target: 180, 
    site: 'http://www.rosneft.ru/Investors/information/quarterlyreport'
  },  
  {
    tikr: 'RTKMP',
    company: 'Ростелеком', 
    target: 45,
    site: 'http://www.rostelecom.ru/ir/results_and_presentations/financials/RAS'
  },
  {
    tikr: 'SBERP',
    company: 'Сбербанк России',  
    target: 47,
    site: 'http://www.sbrf.ru/moscow/ru/investor_relations/disclosure/quarterly_reports'
  }, 
  {
    tikr: 'ALRS', 
    company: 'АЛРОСА',  
    target: 15,
    site: 'http://www.alrosa.ru/documents/ежеквартальные-отчеты'
  },
  {
    tikr: 'BANEP', 
    company: 'Башнефть',   
    target: 950,
    site: 'http://www.bashneft.ru/shareholders_and_investors/disclosure/quarterly'
  },
  {
    tikr: 'EONR', 
    company: 'Э.ОН Россия',  
    target: 1.6,
    site: 'http://www.eon-russia.ru/shareholders/reports/finance_reports'
  },
  {
    tikr: 'GMKN',
    company: 'Норильский никель',
    target: 4500,
    site: 'http://www.nornik.ru/investoram/raskryitie-informaczii/ezhekvartalnyie-otchetyi-emitenta'
  },
  {
    tikr: 'IRGZ',
    company: 'Иркутскэнерго',
    target: 4.1,
    site: 'http://www.irkutskenergo.ru/qa/42.2.html'
  },
  {
    tikr: 'IRKT',
    company: 'Иркут',    
    target: 4.4,
    site: 'http://www.irkut.com/investors-and-shareholders/statements'
  },
  {
    tikr: 'MTSS',
    company: 'Мобильные ТелеСистемы',    
    target: 180,
    site: 'http://www.company.mts.ru/ir/control/data/quarterly_reports'
  },
  {
    tikr: 'SNGSP', 
    company: 'Сургутнефтегаз',   
    target: 16,  
    site: 'http://www.surgutneftegas.ru/ru/investors/reports/quarterly'
  }
];

var tableTitle = [
  ['Тикер', 55],
  ['Компания', 190],
  ['Цена', 50],
  ['Цель', 50],
  ['Дисконт', 75],
  ['Лот', 45],
  ['Тип', 55]
];