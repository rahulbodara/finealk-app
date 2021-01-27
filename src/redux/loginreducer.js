const loginreducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN ':
      return {
        ...state,
        ...action.payload,
      };
    case 'ERROR_LOGIN':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loginreducer;
