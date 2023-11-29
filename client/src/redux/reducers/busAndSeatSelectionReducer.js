const initialState = {
  info: { busDetails: {}, SeatNo: "" },
  loading: false,
  error: null,
};
const busAndSeatSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SelectedData":
      return {
        ...state,
        loading: false,
        info: {
          busDetails: action.payload.busDetails,
          SeatNo: action.payload.SeatNo,
        },
      };

    default:
      return state;
  }
};

export default busAndSeatSelectionReducer;
