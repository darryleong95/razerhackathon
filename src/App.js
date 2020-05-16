import React, { Component } from "react";
import storageUtils from './utils/storage'
import { Switch, Route, Redirect } from "react-router";
import Login from "./views/Login";
import Home from "./views/Home";
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'
import './App.css';
import FinancingForm from "./views/FinancingForm";
import DigitalisationForm from "./views/DigitalisationForm";
import Results from "./views/Results";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade">
              <Switch location={location}>
                <Route
                  path="/signup"
                  component={Login}
                />
                <Route
                  path="/home"
                  component={Home}
                />
                <Route
                  path="/financing"
                  component={FinancingForm}
                />
                <Route
                  exact
                  path="/digitalisation-form"
                  component={DigitalisationForm}
                />
                <Route
                  exact
                  path="/digitalisation-form/submit"
                  component={Results}
                />
                <Redirect
                  from="/"
                  to={storageUtils.get("accessToken") ? "/home" : "/signup"}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    )
  }
}

export default App;
