import React from "react";
import logo from "./assets/logo.svg";
import test from "./assets/128.png";
import "./App.less";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <img src={test} alt="" />
      </header>
    </div>
  );
}

export default App;
