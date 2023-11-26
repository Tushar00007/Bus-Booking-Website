// actions.js
export const fetchTripsRequest = () => {
  return {
    type: "FETCH_Trips_REQUEST",
  };
};

export const fetchTripsSuccess = (data) => {
  return {
    type: "FETCH_Trips_SUCCESS",
    payload: data,
  };
};

export const fetchTripsError = (error) => {
  return {
    type: "FETCH_Trips_ERROR",
    payload: error,
  };
};

export const fetchTrips = (inputValue1, inputValue2, selectedDate) => {
  return async (dispatch) => {
    try {
      dispatch(fetchTripsRequest());
      let response = await fetch(
        `http://localhost:8035/api/bk_tic?from=${inputValue1}&to=${inputValue2}&date=${selectedDate}`
      );

      const data = await response.json();

      dispatch(fetchTripsSuccess(data));
    } catch (error) {
      dispatch(fetchTripsError(error.message));
    }
  };
};
