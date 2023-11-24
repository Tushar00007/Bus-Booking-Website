const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const cityNameReducer1 = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_City1_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_City1_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    case "FETCH_City1_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cityNameReducer1;
