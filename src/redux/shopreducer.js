const shopreducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SHOP_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ERROR_ADD_SHOP':
      return {
        ...state,
        ...action.payload,
      };
    case 'EDIT_SHOP':
      return {
        ...state,
        ...action.payload,
      };
    case 'DELETE_SHOP':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default shopreducer;
