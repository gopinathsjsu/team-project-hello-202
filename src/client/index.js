import React from "react";
import ReactDOM from "react-dom";
import LandingPage from "./components/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";

// const rootReducer = combineReducers({});
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<LandingPage />, document.getElementById("root"));
