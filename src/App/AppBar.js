import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5rem;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto repeat(2, 100px);
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: #03ff03;
    `};
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const toProperCase = lower => {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};

const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ firstVisit, page, setPage }) => {
        return (
          <ControlButtonElem
            active={page === name}
            onClick={() => setPage(name)}
            hidden={firstVisit && name === "dashboard"}
          >
            {toProperCase(name)}
          </ControlButtonElem>
        );
      }}
    </AppContext.Consumer>
  );
};

export default function() {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
}
