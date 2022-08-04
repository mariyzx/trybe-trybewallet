// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      email: action.data,
    };
  default:
    return state;
  }
}

export default userReducer;
