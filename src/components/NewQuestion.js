import React, { Component } from "react";
import { FormControl } from "baseui/form-control";
import { StatefulInput, SIZE } from "baseui/input";
import { Button } from "baseui/button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import { withRouter } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    this.props.handleAddQuestion(optionOneText, optionTwoText);
    this.props.history.push("/dashboard");
  };
  render() {
    const { optionOneText, optionTwoText } = this.state;
    const { authedUser } = this.props;
    if (authedUser === null) {
      return <Redirect to="/" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Would you rather</h1>
        <FormControl label="Option 1">
          <StatefulInput
            name="optionOneText"
            value={optionOneText}
            onChange={this.onChange}
            size={SIZE.compact}
          />
        </FormControl>
        <FormControl label="Option 2">
          <StatefulInput
            name="optionTwoText"
            value={optionTwoText}
            onChange={this.onChange}
            size={SIZE.compact}
          />
        </FormControl>
        <Button
          disabled={optionOneText === "" || optionTwoText === "" ? true : false}
          type="submit"
        >
          Add
        </Button>
      </form>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    user: users[authedUser],
    authedUser,
    users
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { handleAddQuestion }
  )(NewQuestion)
);
