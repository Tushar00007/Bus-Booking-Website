const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_Trips_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_Trips_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    case "FETCH_Trips_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default tripsReducer;
