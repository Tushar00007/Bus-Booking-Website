// actions.js
export const fetchCity2Request = () => {
  return {
    type: "FETCH_City2_REQUEST",
  };
};

export const fetchCity2Success = (posts) => {
  return {
    type: "FETCH_City2_SUCCESS",
    payload: posts,
  };
};

export const fetchCity2Error = (error) => {
  return {
    type: "FETCH_City2_ERROR",
    payload: error,
  };
};

export const fetchCity2 = (userInput) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCity2Request());
      let response = await fetch(
        `https://busbooking-ryds.onrender.com/api/district_name/${userInput}`
      );
      const data = await response.json();

      dispatch(fetchCity2Success(data));
    } catch (error) {
      dispatch(fetchCity2Error(error.message));
    }
  };
};
