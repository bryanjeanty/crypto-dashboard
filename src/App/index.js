import React, { Component } from "react";
import "./App.css";
import Settings from "../settings";
import Dashboard from "../dashboard";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import AppProvider from "./AppProvider";
import Content from "../shared/Content";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
