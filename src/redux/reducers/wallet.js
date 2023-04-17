// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  IN_EDIT_EXPENSE,
  EXPENSE_TO_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: null, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.editor,
      idToEdit: action.id,
    };
  case IN_EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: action.id,
    };
  case EXPENSE_TO_EDIT:
    return {
      ...state,
      editor: false,
      idToEdit: null,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default walletReducer;
