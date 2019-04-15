import React, { Component, createContext } from "react";
import _ from "lodash";

const crypto = require("cryptocompare");

export const AppContext = createContext();

const DEFAULT_FAVORITES = {
  MAX: 10,
  MIN: 1
};

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
      confirmFavorites: this.confirmFavorites
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await crypto.coinList()).Data;
    this.setState({ coinList });
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
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  savedSettings = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }

    let { favorites } = cryptoDashData;
    return { favorites };
  };

  setPage = page => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
