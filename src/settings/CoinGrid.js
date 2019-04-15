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

const getLowerSectionCoins = (coinList, filteredCoins) => {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
};

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  return topSection ? favorites : getLowerSectionCoins(filteredCoins);
};

export default ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => {
        return (
          <CoinGridStyled>
            {getCoinsToDisplay(
              coinList,
              topSection,
              favorites,
              filteredCoins
            ).map(coinKey => {
              return <CoinTile topSection={topSection} coinKey={coinKey} />;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};
