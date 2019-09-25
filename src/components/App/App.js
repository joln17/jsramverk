import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Me from '../Me/Me';
import Reports from '../Reports/Reports';
import AdminReports from '../Reports/AdminReports';
import CreateReport from '../Reports/CreateReport';
import UpdateReport from '../Reports/UpdateReport';
import DeleteReport from '../Reports/DeleteReport';
import About from '../About/About';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import VerifyAdmin from '../Auth/VerifyAdmin';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Me} />
                    <Route path="/reports/week/:kmom" component={Reports} />
                    <Route exact path="/reports/admin" component={AdminReports} />
                    <Route exact path="/reports/create" component={CreateReport} />
                    <Route exact path="/reports/update/:id" component={UpdateReport} />
                    <Route exact path="/reports/delete/:id" component={DeleteReport} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/register" component={RegistrationForm} />
                    <Route exact path="/verify-admin" component={VerifyAdmin} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </Router>
        );
    }
}

export default App;
