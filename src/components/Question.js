import React from "react";
import { connect } from "react-redux";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { Button, KIND } from "baseui/button";
import { Link } from "react-router-dom";

function Question(props) {
  const { question, users } = props;
  return (
    <Card
      overrides={{
        Root: { style: { width: "100%", marginBottom: "15px" } }
      }}
      title={`${users[question.author].name} asks:`}
    >
      <Block display="flex" width="100%" marginBottom="15px">
        <Avatar
          name={users[question.author].name}
          size="scale1400"
          src={users[question.author].avatarURL}
        />
        <StyledBody style={{ marginLeft: "15px" }}>
          <b>Would you rather</b>
          <br />
          <span>{question.optionOne.text} or ...</span>
        </StyledBody>
      </Block>

      <StyledAction>
        <Button kind={KIND.tertiary}>
          <Link
            to={`/question/${question.id}`}
            style={{ textDecoration: "none", color: "#276EF1" }}
          >
            View detail
          </Link>
        </Button>
      </StyledAction>
    </Card>
  );
}
function mapStateToProps({ questions, authedUser, users }, { id }) {
  const question = questions[id];
  return {
    question,
    authedUser,
    users
  };
}
export default connect(mapStateToProps)(Question);
