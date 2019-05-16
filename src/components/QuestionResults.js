import React from "react";
import { StyledBody } from "baseui/card";
import { ProgressBar } from "baseui/progress-bar";
import { connect } from "react-redux";

function QuestionResults(props) {
  const { question, authedUser, users } = props;
  return (
    <StyledBody style={{ marginLeft: "25px" }}>
      <span style={{ marginLeft: "10px" }}>
        {question.optionOne.text}{" "}
        {users[authedUser].answers[question.id] === "optionOne" && (
          <b>(your choice)</b>
        )}
      </span>
      <ProgressBar
        value={
          (question.optionOne.votes.length * 100) / Object.keys(users).length
        }
        successValue="100"
        overrides={{
          BarProgress: {
            style: ({ $theme, $value }) => {
              return {
                ...$theme.typography.font450,
                backgroundColor: $theme.colors.positive,
                color: $theme.colors.mono200,

                position: "relative",
                ":after": {
                  position: "absolute",
                  content: $value > 5 ? `"${$value}%"` : "",
                  right: "5px"
                }
              };
            }
          },
          Bar: {
            style: ({ $theme }) => ({
              height: $theme.sizing.scale800,
              width: "200px"
            })
          }
        }}
      />

      <br />
      <span style={{ marginLeft: "10px" }}>
        {question.optionTwo.text}{" "}
        {users[authedUser].answers[question.id] === "optionTwo" && (
          <b>(your choice)</b>
        )}
      </span>

      <ProgressBar
        value={
          (question.optionTwo.votes.length * 100) / Object.keys(users).length
        }
        successValue="100"
        overrides={{
          BarProgress: {
            style: ({ $theme, $value }) => {
              return {
                ...$theme.typography.font450,
                backgroundColor: $theme.colors.positive,
                color: $theme.colors.mono200,
                position: "relative",
                ":after": {
                  position: "absolute",
                  content: $value > 5 ? `"${$value}%"` : "",
                  right: "5px"
                }
              };
            }
          },
          Bar: {
            style: ({ $theme }) => ({
              height: $theme.sizing.scale800,
              width: "200px"
            })
          }
        }}
      />
    </StyledBody>
  );
}
function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id];
  return {
    question,
    authedUser,
    users
  };
}
export default connect(mapStateToProps)(QuestionResults);
