import { Action } from 'redux';
import { User } from '../../utils/types';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: Action & { payload?: User }): UserState => {
  switch (action.type) {
    case 'SET_USER':
      // Save user with timestamp to handle expiration
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: action.payload,
          timestamp: Date.now(), // Store the current timestamp when user logs in
        })
      );
      return {
        ...state,
        user: action.payload || null,
      };
    case 'CLEAR_USER':
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
