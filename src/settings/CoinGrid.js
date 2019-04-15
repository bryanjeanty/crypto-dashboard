import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import { SelectableTile } from "../shared/Tile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        return (
          <CoinGridStyled>
            {Object.keys(coinList).map(coinKey => {
              return <SelectableTile>{coinKey}</SelectableTile>;
            })}
          </CoinGridStyled>
        );
      }}
    </AppContext.Consumer>
  );
};
