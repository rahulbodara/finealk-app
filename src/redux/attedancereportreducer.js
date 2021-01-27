const attendancereportreducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_ATTENDENCE_REPORT':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default attendancereportreducer;
