import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" render = {() => <Redirect to = '/register'/>} />
                <Route path = "/register" component = {Register} />
                <Route path = "/login" component = {Login} />
                <ProtectedRoute path = "/dashboard" component = {Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;