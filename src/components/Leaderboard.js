import React from "react";
import { connect } from "react-redux";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell
} from "baseui/table";
import { Avatar } from "baseui/avatar/styled-components";
import { Redirect } from "react-router-dom";

function Leaderboard(props) {
  const { usersId, users, authedUser } = props;
  if (authedUser === "" || authedUser === null) {
    return <Redirect to="/" />;
  }
  return (
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Avatar</StyledHeadCell>
        <StyledHeadCell>User Name</StyledHeadCell>
        <StyledHeadCell>Questions asked</StyledHeadCell>
        <StyledHeadCell>Questions answered</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {usersId.map(u => (
          <StyledRow key={users[u].id}>
            <StyledCell>
              <Avatar
                src={users[u].avatarURL}
                size="scale1400"
                name={users[u].name}
              />
            </StyledCell>
            <StyledCell>{users[u].name}</StyledCell>
            <StyledCell>{users[u].questions.length}</StyledCell>
            <StyledCell>{Object.keys(users[u].answers).length}</StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
}
function mapStateToProps({ users, authedUser }) {
  const usersId = Object.keys(users).sort(function(a, b) {
    return (
      users[b].questions.length +
      Object.keys(users[b].answers).length -
      (users[a].questions.length + Object.keys(users[a].answers).length)
    );
  });

  return {
    usersId,
    authedUser,
    users
  };
}
export default connect(mapStateToProps)(Leaderboard);
/*
on veut filtrer les utilisateurs par la somme du nombre de leurs réponses et de leur questions
du plus grand au plus petit

*/
