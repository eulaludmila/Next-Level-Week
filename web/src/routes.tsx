import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import Points from './pages/Points'
import CreatePost from './pages/CreatePost'
 
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/"/>
                <Route component={CreatePoint} path="/create-point"/>
                <Route component={Points} path="/points"/>
                <Route component={CreatePost} path="/create-post/:id"/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;