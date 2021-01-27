const franchiesreducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FRANCHIES_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'ERROR_ADD_FRANCHIES':
      return {
        ...state,
        ...action.payload,
      };
    case 'EDIT_FRANCHIES':
      return {
        ...state,
        ...action.payload,
      };
    case 'DELETE_FRANCHICES':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default franchiesreducer;
