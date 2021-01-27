const userreducer = (state, action) => {
  switch (action.type) {
    case 'USER_DETAILS_SUCCESS ':
      return {
        ...state,
        ...action.payload,
      };
    case 'USER_DETAILS_ERROR':
      return {
        ...state,
        ...action.payload,
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'GET_USER_ERROR':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userreducer;
