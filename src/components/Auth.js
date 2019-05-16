import React from "react";
import { Block } from "baseui/block";
import { Button, KIND } from "baseui/button";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu, OptionProfile } from "baseui/menu";
import Down from "baseui/icon/triangle-down.js";
import { Card, StyledBody } from "baseui/card";
import { styled } from "baseui";

const Title = styled("h2", ({ $theme }) => ({
  color: $theme.colors.primary400
}));
const ITEMS = [
  {
    title: "Tyler McGinnis",
    subtitle: "Senior Engineering Manager",
    imgUrl: "https://tylermcginnis.com/would-you-rather/tyler.jpg"
  },
  {
    title: "Dan Abramov",
    subtitle: "Senior Engineering Manager",
    imgUrl: "https://tylermcginnis.com/would-you-rather/dan.jpg"
  }
];
class Dropdown extends React.Component {
  state = { currentSelection: "" };
  render() {
    return (
      <StatefulPopover
        isOpen={this.state.isOpen}
        placement={PLACEMENT.bottomLeft}
        content={({ close }) => (
          <StatefulMenu
            items={ITEMS}
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
                  getProfileItemLabels: ({ title, subtitle }) => ({
                    title,
                    subtitle
                  }),
                  getProfileItemImg: item => item.imgUrl,
                  getProfileItemImgText: item => item.title
                }
              }
            }}
            onItemSelect={e => {
              close();
              this.setState({ currentSelection: e.item.title });
            }}
          />
        )}
      >
        <Button
          kind={KIND.tertiary}
          overrides={{ BaseButton: { style: { width: "100%" } } }}
          endEnhancer={() => <Down size={24} />}
        >
          {this.state.currentSelection === ""
            ? this.props.children
            : this.state.currentSelection}
        </Button>
      </StatefulPopover>
    );
  }
}

export default function Auth() {
  return (
    <Block width="800px" marginTop="40px" marginLeft="auto" marginRight="auto">
      <Card overrides={{ Root: { style: { width: "378px", margin: "auto" } } }}>
        <StyledBody>
          <Title>Would you rather ?</Title>
          <p>
            Avant de commencer merci de vous identifier en choisissant un
            utilisateur:
          </p>
          <Dropdown>Choisir...</Dropdown>
          <Button
            overrides={{
              BaseButton: { style: { width: "100%", marginTop: "10px" } }
            }}
          >
            Commencer
          </Button>
        </StyledBody>
      </Card>
    </Block>
  );
}
