import React from "react";
import { Switch, Route } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard/Index";
import { Repository } from "../pages/Repository";
import { Filmes } from "../pages/Filmes";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Dashboard} path="/" exact />
            <Route component={Repository} path="/repository" />
            <Route component={Filmes} path="/filmes" />
        </Switch>
    )
}