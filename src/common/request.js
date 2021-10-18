import axios from "axios";

const env = process.env.NODE_ENV;

const requestUrl = {
  development: "asdasdasd",
  production: "asdaswqeqwedasd",
  test: "123",
};

axios({
  url: requestUrl[env],
});
