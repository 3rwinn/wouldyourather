import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, KIND } from "baseui/button";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu, OptionProfile } from "baseui/menu";
import Down from "baseui/icon/triangle-down.js";
import { Card, StyledBody } from "baseui/card";
import { styled } from "baseui";
import { loginUser } from "../actions/auth";
import { withRouter } from "react-router-dom";

const Title = styled("h2", ({ $theme }) => ({
  color: $theme.colors.primary400
}));

class Login extends Component {
  state = {
    userId: ""
  };
  logUser = () => {
    const { userId } = this.state;
    if (userId !== "") {
      this.props.loginUser(userId);
      this.props.history.push("/dashboard");
    }
  };
  render() {
    const { users } = this.props;
    return (
      <Fragment>
          {/* Login Box */}
          <Card
            overrides={{ Root: { style: { width: "378px", margin: "auto" } } }}
          >
            <StyledBody>
              {/* Text */}
              <Title>Identification</Title>
              <p>
                Avant de commencer merci de vous identifier en choisissant un
                utilisateur:
              </p>
              {/* Select User  */}
              {users !== 0 && (
                <StatefulPopover
                  isOpen={this.state.isOpen}
                  placement={PLACEMENT.bottomLeft}
                  content={({ close }) => (
                    <StatefulMenu
                      items={users}
                      rootRef={React.createRef()}
                      overrides={{
                        List: {
                          style: {
                            width: "330px"
                          }
                        },
                        Option: {
                          component: OptionProfile,
                          props: {
                            getProfileItemLabels: ({ name, id }) => ({
                              title: name,
                              subtitle: `@${id}`
                            }),
                            getProfileItemImg: item => item.avatarURL,
                            getProfileItemImgText: ({ id }) => id
                          }
                        }
                      }}
                      onItemSelect={e => {
                        close();
                        this.setState({ userId: e.item.id });
                      }}
                    />
                  )}
                >
                  <Button
                    kind={KIND.tertiary}
                    overrides={{ BaseButton: { style: { width: "100%" } } }}
                    endEnhancer={() => <Down size={24} />}
                  >
                    {this.state.userId === ""
                      ? "Choisir..."
                      : this.state.userId}
                  </Button>
                </StatefulPopover>
              )}

              {/* Submit selection */}
              <Button
                overrides={{
                  BaseButton: { style: { width: "100%", marginTop: "10px" } }
                }}
                onClick={this.logUser}
              >
                Commencer
              </Button>
            </StyledBody>
          </Card>
      </Fragment>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    // On converti l'object users en array
    users: Object.keys(users).map(item => users[item]),
    authedUser
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(Login)
);
