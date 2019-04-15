import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        return (
          <CoinGridStyled>
            {Object.keys(coinList).map(coinKey => {
              return <div>{coinKey}</div>;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};
