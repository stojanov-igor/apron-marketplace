import React from 'react';
import Home from '../home';
import Service from '../components/service/service';
import Account from '../components/account/Account';
import Myservice from '../components/account/myservice';
import Myprovider from '../components/account/myprovider';

import {HashRouter as Router, Route, Switch} from "react-router-dom";

function routerlink() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/service/:id" component={Service}/>
                <Route path="/myservicelist" component={Account}/>
                <Route path="/myservice/:id" component={Myservice}/>
                <Route path="/usage" component={Myprovider}/>
            </Switch>
        </Router>);
}
export default routerlink;
