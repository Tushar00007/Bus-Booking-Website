// actions.js
export const fetchCity1Request = () => {
  return {
    type: "FETCH_City1_REQUEST",
  };
};

export const fetchCity1Success = (posts) => {
  return {
    type: "FETCH_City1_SUCCESS",
    payload: posts,
  };
};

export const fetchCity1Error = (error) => {
  return {
    type: "FETCH_City1_ERROR",
    payload: error,
  };
};

export const fetchCity1 = (userInput) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCity1Request());
      let response = await fetch(
        `http://localhost:8035/api/district_name/${userInput}`
      );
      const data = await response.json();

      dispatch(fetchCity1Success(data));
    } catch (error) {
      dispatch(fetchCity1Error(error.message));
    }
  };
};
