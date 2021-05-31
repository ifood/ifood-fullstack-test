import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRoutes from "./routes";
import store from "./store";
import "./index.scss";

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById("root")
);

