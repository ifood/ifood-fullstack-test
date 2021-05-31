import { Route, Switch } from "react-router-dom"

import OrderDetails from "../components/OrderDetails"
import React from "react";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={OrderDetails} />
            </Switch>
        </main>
    )
};

export default Main;