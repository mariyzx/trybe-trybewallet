// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SAVE_EXPENSE,
  DELETE, EDIT, SAVE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  editor: false,
  idToEdit: 0,
  valueEdit: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.payload.expenses),
    };
  case DELETE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.payload),
      ],
    };
  case EDIT:
    return {
      ...state,
      valueEdit: state.expenses[action.payload.id],
      editor: true,
      idToEdit: action.payload.id,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => (
        expense !== state.valueEdit
      )), action.payload].sort((a, b) => a.id - b.id),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
