// Coloque aqui suas actions
import { fetchCurrenciesList, fetchCurrencies } from '../../services/API';

export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IN_EDIT_EXPENSE = 'IN_EDIT_EXPENSE';
export const EXPENSE_TO_EDIT = 'EXPENSE_TO_EDIT';

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

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  editor: true,
  id,
});

export const inEditExpense = (id) => ({
  type: IN_EDIT_EXPENSE,
  id,
});

export const expenseToEdit = (payload) => ({
  type: EXPENSE_TO_EDIT,
  payload,

});

export const getExchageRatesToEdit = (expense) => async (dispatch) => {
  const exchangeRates = await fetchCurrencies();
  const expenseWithCurrencies = { ...expense, exchangeRates };
  dispatch(expenseToEdit(expenseWithCurrencies));
};
