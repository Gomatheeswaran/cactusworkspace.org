// userReducer.js

const initialState = {
  user: null,// Initial state is null or an empty object
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user:action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
