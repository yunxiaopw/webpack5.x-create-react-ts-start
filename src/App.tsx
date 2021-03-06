/*
 * @Author: 云霄
 * @Date: 2021-12-24 17:54:52
 * @LastEditors: 云霄
 * @LastEditTime: 2021-12-24 17:58:51
 * @description:
 */
import React from "react";
import * as api from "./api";
import logo from "./assets/logo.svg";
import "./app.scss";

export default function App() {
  const handleClick = async () => {
    const res = await api.commonApi.getDemo();
    console.log(process.env.NODE_ENV);
    console.log(res, "res");
    console.log(process.env.base_url);
  };

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
      </header>

      <button onClick={() => handleClick()}>请求</button>
    </div>
  );
}
