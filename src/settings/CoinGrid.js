import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

getCoinsToDisplay = (coinList, topSection, favorites) => {
  return topSection ? favorites : Object.keys(coinList).slice(0, 100);
};

export default ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites }) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => {
              return <CoinTile topSection={topSection} coinKey={coinKey} />;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};
