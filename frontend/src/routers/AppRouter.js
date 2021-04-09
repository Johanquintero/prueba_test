import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { routers } from './route-list';

export const AppRouter = () => {
    return (
        <Router>
            <div className="container">
                <Switch>
                    {routers.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                    <Redirect to="/clients" />
                </Switch>
            </div>
        </Router>
    )
}
