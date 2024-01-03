// userReducer.js

const initialState = {
    token: null,// Initial state is null or an empty object
  };
  
  const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload,
        };
      case 'CLEAR_TOKEN':
        return {
          ...state,
          token:action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tokenReducer;
  