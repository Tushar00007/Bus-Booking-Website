import { combineReducers } from "redux";
import cityNameReducer from "./reducers/cityNameReducer";
import cityNameReducer2 from "./reducers/cityNameReducer2";
import tripsReducer from "./reducers/tripsReducer";
import busAndSeatSelectionReducer from "./reducers/busAndSeatSelectionReducer";

// Combine individual reducers into a root reducer
const rootReducers = combineReducers({
  from: cityNameReducer, // To get city name as suggestion
  to: cityNameReducer2, // To get city name as suggestion
  trips: tripsReducer, // To get Trips data from backend
  busAndSeat: busAndSeatSelectionReducer, //To get bus and seat selected data by user
});

// Exporting 'rootReducers' to use in redux store
export default rootReducers;
