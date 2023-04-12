// Coloque aqui suas actions
import { fetchCurrenciesList, fetchCurrencies } from '../../services/API';

export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const getCurrenciesList = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const getCurrenciesListThunk = () => async (dispatch) => {
  const currenciesList = await fetchCurrenciesList();
  dispatch(getCurrenciesList(currenciesList));
};

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const getExchageList = (expense) => async (dispatch) => {
  const exchangeRates = await fetchCurrencies();
  const expenseWithCurrencies = { ...expense, exchangeRates };
  dispatch(saveExpense(expenseWithCurrencies));
};
