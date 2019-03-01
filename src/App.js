import React, { Component } from "react";
import { Route } from "react-router";
import Movies from "./components/movies";
import http from "./services/httpService";

class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}
export default App;
