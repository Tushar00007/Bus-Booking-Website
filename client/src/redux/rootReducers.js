import { combineReducers } from "redux";
import cityNameReducer from "./reducers/cityNameReducer";
import cityNameReducer2 from "./reducers/cityNameReducer2";

// Combine individual reducers into a root reducer
const rootReducers = combineReducers({
  from: cityNameReducer,
  to: cityNameReducer2,
});

// Exporting 'rootReducers' to use in redux store
export default rootReducers;
