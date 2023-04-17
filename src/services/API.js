const CURRENCIES_LIST_URL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrenciesList = async () => {
  const response = await fetch(CURRENCIES_LIST_URL);
  const data = await response.json();
  delete data.USDT;
  return Object.keys(data);
};

export const fetchCurrencies = async () => {
  const response = await fetch(CURRENCIES_LIST_URL);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export const fetchNews = async () => {
  const response = await fetch('https://newsapi.org/v2/top-headlines?category=business&country=br&pageSize=20&apiKey=ef3e427f77064b48abcfeefd28544987');
  const data = await response.json();
  return data.articles;
};
