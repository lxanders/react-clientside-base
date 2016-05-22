import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';
import Home from './Home';
import About from './About';
import EntityDetails from './EntityDetails';

const Routes = (props, { store }) => {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='about' component={About} />
                <Route path='entities/:entityId' component={EntityDetails} />
            </Route>
        </Router>
    );
};

Routes.contextTypes = {
    store: React.PropTypes.object.isRequired
};

export default Routes;