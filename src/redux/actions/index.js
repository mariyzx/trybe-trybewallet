// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SUM_EXPENSE = 'SUM_EXPENSE';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';
export const SAVE_EDIT = 'SAVE_EDIT';

export const saveEmail = (data) => ({
  type: SAVE_EMAIL,
  data,
});

export const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  payload: {
    expenses,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE,
  payload: id,
});

export const editButton = (key) => ({
  type: EDIT,
  payload: key,
});

export const saveEdit = (obj) => ({
  type: SAVE_EDIT,
  payload: obj,
});

export const getCurrencyError = (error) => ({
  type: GET_CURRENCY_ERROR,
  error,
});

export const getCurrencyThunk = () => async (dispatch) => {
  // pegamos apenas as keys diferentes de 'USDT'
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const payload = await response.json();
    const data = Object.keys(payload !== undefined && payload);
    const coins = data.filter((coin) => coin !== 'USDT');
    dispatch(getCurrency(coins));
  } catch (err) {
    dispatch(getCurrencyError(err));
  }
};
