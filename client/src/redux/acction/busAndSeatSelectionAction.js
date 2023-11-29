// actions.js

export const SelectedData = (busData, seatNo) => {
  return {
    type: "SelectedData",
    payload: { busDetails: busData, SeatNo: seatNo },
  };
};

export const selectedBusAndSeat = (busData, seatNo) => {
  return async (dispatch) => {
    dispatch(SelectedData(busData, seatNo));
  };
};
