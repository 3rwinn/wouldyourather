import React, { Component, Fragment } from "react";
import { Block } from "baseui/block";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { Button, KIND } from "baseui/button";
import { Radio, StatefulRadioGroup } from "baseui/radio";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import QuestionResults from "./QuestionResults";
import { Spinner } from "baseui/spinner";

class QuestionDetails extends Component {
  state = {
    answer: ""
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    // Save the answer
    this.props.handleAddAnswer({
      authedUser: this.props.authedUser,
      qid: this.props.question.id,
      answer: this.state.answer
    });
  };
  render() {
    const { users, question, authedUser } = this.props;
    if (authedUser === "" || authedUser === null) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        {question === null || question === undefined ? (
          <Spinner />
        ) : (
          <Card
            overrides={{
              Root: { style: { width: "100%" } }
            }}
            title={`${users[question.author].name} asks:`}
          >
            <form onSubmit={this.handleSubmit}>
              <Block display="flex" width="100%" marginBottom="15px">
                <Avatar
                  name={users[question.author].name}
                  size="scale1400"
                  src={users[question.author].avatarURL}
                />
                {Object.keys(users[authedUser].answers).includes(
                  question.id
                ) ? (
                  <QuestionResults id={question.id} />
                ) : (
                  <StyledBody style={{ marginLeft: "15px" }}>
                    <b>Would you rather</b>
                    <br />
                    <StatefulRadioGroup
                      name="answer"
                      onChange={this.handleChange}
                    >
                      <Radio
                        value="optionOne"
                        overrides={{ Label: { style: { fontWeight: "100" } } }}
                      >
                        {question.optionOne.text}
                      </Radio>
                      <Radio
                        value="optionTwo"
                        overrides={{ Label: { style: { fontWeight: "100" } } }}
                      >
                        {question.optionTwo.text}
                      </Radio>
                    </StatefulRadioGroup>
                    <StyledAction>
                      <Button
                        style={{ marginTop: "15px" }}
                        kind={KIND.tertiary}
                        type="submit"
                        disabled={this.state.answer === "" ? true : false}
                      >
                        Submit
                      </Button>
                    </StyledAction>
                  </StyledBody>
                )}
              </Block>
            </form>
          </Card>
        )}
      </Fragment>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    question: questions[id],
    users,
    authedUser
  };
}
export default connect(
  mapStateToProps,
  { handleAddAnswer }
)(QuestionDetails);
