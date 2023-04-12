// Coloque aqui suas actions
import { fetchCurrenciesList } from '../../services/API';

export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

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
