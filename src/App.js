import React, { Component } from "react";
import { LightTheme, BaseProvider } from "baseui";
import { Block } from "baseui/block";
import { connect } from "react-redux";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import QuestionDetails from "./components/QuestionDetails";
import { handleInitialData } from "./actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
        <BaseProvider theme={LightTheme}>
          <Nav />
          <Block
            width="600px"
            marginTop="60px"
            marginLeft="auto"
            marginRight="auto"
          >
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/new" component={NewQuestion} />
            <Route exact path="/question/:id" component={QuestionDetails} />
            <Route exact path="/leaderbord" component={Leaderboard} />
          </Block>
        </BaseProvider>
      </Router>
    );
  }
}

export default connect(
  null,
  { handleInitialData }
)(App);
