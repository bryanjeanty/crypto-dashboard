import React from "react";
import HighChartsConfig from "./HighChartsConfig";
import { Tile } from "../shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";
import HighChartsTheme from "./HighChartsTheme";

ReactHighCharts.HighCharts.setOptions(HighChartsTheme);

export default () => {
  return (
    <AppContext.Consumer>
      {({ historical }) => {
        <Tile>
          {historical ? (
            <ReactHighCharts config={HighChartsConfig(historical)} />
          ) : (
            <div>Loading Historical Data</div>
          )}
        </Tile>;
      }}
    </AppContext.Consumer>
  );
};
