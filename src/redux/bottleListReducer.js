const bottleListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOTTLE_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ERROR_ADD_BOTTLE':
      return {
        ...state,
        ...action.payload,
      };
    case 'EDIT_BOTTLE':
      return {
        ...state,
        ...action.payload,
      };
    case 'DELETE_BOTTLE_LIST':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default bottleListReducer;
