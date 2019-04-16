import React, { Component, createContext } from "react";
import _ from "lodash";
import moment from "moment";

const crypto = require("cryptocompare");

export const AppContext = createContext();

const DEFAULT_FAVORITES = {
  MAX: 10,
  MIN: 1
};

const TIME_UNITS = 10;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = (await crypto.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    this.setState({ prices });
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ months: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await crypto.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (error) {
        console.warn("Fetch price error: ", error);
      }
    }
    return returnData;
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        crypto.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ months: units })
            .toDate()
        )
      );
    }

    return Promise.all(promises);
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < DEFAULT_FAVORITES.MAX) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length > DEFAULT_FAVORITES.MIN) {
      const keyIndex = favorites.indexOf(key);
      favorites.splice(keyIndex, 1);
      this.setState({ favorites });
    }
    // this.setState({ favorites: _.pull(favorites, key) })
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }

    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  };

  setPage = page => this.setState({ page });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
