import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

getCoinsToDisplay = coinList => {
  return Object.keys(coinList).slice(0, 100);
};

export default () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList).map(coinKey => {
              return <CoinTile coinKey={coinKey} />;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};
