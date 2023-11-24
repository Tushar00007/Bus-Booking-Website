const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const cityNameReducer2 = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_City2_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_City2_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    case "FETCH_City2_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cityNameReducer2;
