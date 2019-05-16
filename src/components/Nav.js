import React, { Component, Fragment } from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList
} from "baseui/header-navigation";

import { connect } from "react-redux";
import { Avatar } from "baseui/avatar";
import { StyledLink } from "baseui/link";
import { logoutUser } from "../actions/auth";
import { Link } from "react-router-dom";

const NavStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: "20px",
  color: "white",
  textDecoration: "none"
};
class Nav extends Component {
  logout = () => {
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props;

    return (
      <div>
        <HeaderNavigation
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.primary400,
                color: "white",
                paddingRight: "30px",
                marginLeft: "0px"
              })
            }
          }}
        >
          <NavigationList align={ALIGN.left}>
            <NavigationItem>WYR</NavigationItem>
          </NavigationList>
          {user === null || user === undefined ? null : (
            <Fragment>
              <NavigationList align={ALIGN.center} />
              <NavigationList align={ALIGN.right}>
                <NavigationItem>
                  <Link style={NavStyle} to="/dashboard">
                    Home
                  </Link>
                </NavigationItem>
                <NavigationItem>
                  <Link style={NavStyle} to="/new">
                    New question
                  </Link>
                </NavigationItem>
                <NavigationItem>
                  <Link style={NavStyle} to="/leaderbord">
                    Leaderbord
                  </Link>
                </NavigationItem>
              </NavigationList>
              <NavigationList align={ALIGN.right}>
                <NavigationItem>
                  {" "}
                  <Avatar
                    name={user.id}
                    size="scale1000"
                    src={user.avatarURL}
                  />
                </NavigationItem>
                <NavigationItem>
                  <StyledLink
                    href="#!"
                    style={{ color: "white" }}
                    onClick={this.logout}
                  >
                    Logout
                  </StyledLink>
                </NavigationItem>
              </NavigationList>
            </Fragment>
          )}
        </HeaderNavigation>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    user: users[authedUser],
    authedUser
  };
}
export default connect(
  mapStateToProps,
  { logoutUser }
)(Nav);
