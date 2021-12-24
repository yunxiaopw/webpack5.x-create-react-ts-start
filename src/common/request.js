/*
 * @Author: 云霄
 * @Date: 2021-12-24 17:54:52
 * @LastEditors: 云霄
 * @LastEditTime: 2021-12-24 17:59:57
 * @description: 
 */
import axios from "axios";

const env = process.env.NODE_ENV;

const requestUrl = {
  development: "",
  production: "",
  test: "123",
};

axios({
  url: requestUrl[env],
});
