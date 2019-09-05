import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Me from '../Me/Me';
import Reports from '../Reports/Reports';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Me} />
                        <Route path="/reports/week/:kmom" component={Reports} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
