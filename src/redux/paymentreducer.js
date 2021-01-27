const paymentreducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PAYMENT_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ERROR_PAYMENT':
      return {
        ...state,
        ...action.payload,
      };
    case 'GET_USER_PAYMENT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default paymentreducer;
