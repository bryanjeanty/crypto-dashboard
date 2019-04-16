import React from "react";
import styled, { css } from "styled-component";

const CoinImage = styled.img`
  height: 50px;
  ${props =>
    props.spotlight &&
    css`
      height: 200px;
      margin: auto;
      display: block;
    `}
`;

export default ({ coin, spotlight }) => {
  return (
    <CoinImage
      spotlight={spotlight}
      alt={coin.Symbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
};
