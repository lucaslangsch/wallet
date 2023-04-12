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
