import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "./Question";
import { StatefulTabs, Tab, ORIENTATION } from "baseui/tabs";

class Dashboard extends Component {
  render() {
    const { unansweredsId, answeredsId, authedUser } = this.props;
    if (authedUser === null) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
          <StatefulTabs
            orientation={ORIENTATION.vertical}
            initialState={{ activeKey: "0" }}
            overrides={{
              TabBar: {
                style: {
                  height: "120px"
                }
              },
              TabContent: {
                style: {
                  width: "100%",
                  paddingTop: "0px",
                  paddingBottom: "0px"
                }
              }
            }}
          >
            <Tab title="Unanswered">
              {unansweredsId === null || unansweredsId.length === 0
                ? "Nothing to show"
                : unansweredsId.map(id => <Question id={id} key={id} />)}
            </Tab>
            <Tab title="Answered">
            {answeredsId === null || answeredsId.length === 0
                ? "Nothing to show"
                : answeredsId.map(id => <Question id={id} key={id} />)}
            </Tab>
          </StatefulTabs>
      </Fragment>
    );
  }
}
function mapStateToProps({ questions, authedUser, users }) {
  const answered = authedUser ? Object.keys(users[authedUser].answers) : null
  const unanswered = answered ? Object.keys(questions).filter(question => !answered.includes(question)) : null
  return {
    answeredsId: answered ? answered.sort(function(a, b) {
      return questions[b].timestamp - questions[a].timestamp;
    }) : null,
    unansweredsId: unanswered ?unanswered.sort(function(a, b) {
      return questions[b].timestamp - questions[a].timestamp;
    }) : null,
    authedUser,
  };
}
export default connect(mapStateToProps)(Dashboard);
