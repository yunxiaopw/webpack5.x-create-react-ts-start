/**
 * axios基础构建
 */
// import getUrl from "./config";
import instance from "./intercept";
import { CustomResponse } from "./types";
import { GET_BASE_URL_BY_ENV } from "../common/constants";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

class Abstract {
  protected env: string = process.env.NODE_ENV || "development";
  protected baseURL: string = GET_BASE_URL_BY_ENV[this.env];

  protected headers: AxiosRequestHeaders = {
    ContentType: "application/json;charset=UTF-8"
  };

  private apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType
  }: AxiosRequestConfig): Promise<CustomResponse> {
    // Object.assign(headers, {
    //   token: storage().get("token") || storage("localstorage").get("token"),
    //   "x-language": storage("localstorage").get("i18n")
    // });
    console.log("url", url);
    console.log("baseurl", this.baseURL);
    console.log("NODE_ENV", process.env.NODE_ENV);
    // url解析
    // const _url = (url as string).split(".");
    // url = getUrl(_url[0], _url[1]);

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType
      })
        .then((res) => {
          let data: any = {
            success: false,
            errorMessage: "",
            data: null
          };
          console.log("response", res);
          if (res.status === 200) {
            data = res.data;
            if (data.result === "ok") {
              resolve({ status: true, message: "success", data: data?.data, origin: data });
            } else {
              console.log("请求失败错误提示");
              // Vue.prototype.$message({ type: "error", message: res.data?.errorMessage || url + "请求失败" });
              resolve({
                status: false,
                message: data?.errorMessage || url + "请求失败",
                data: data?.data,
                origin: data
              });
            }
          } else {
            data = res.data;
            resolve({ status: false, message: data?.errorMessage || url + "请求失败", data: null });
          }
        })
        .catch((err) => {
          const message = err?.data?.errorMessage || err?.message || url + "请求失败";
          // Vue.prototype.$toast({ message });
          console.log("这里可以弹出错误提示");
          reject({ status: false, message, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig) {
    return this.apiAxios({ baseURL, headers, method: "GET", url, data, params, responseType });
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig) {
    return this.apiAxios({ baseURL, headers, method: "POST", url, data, params, responseType });
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig) {
    return this.apiAxios({ baseURL, headers, method: "PUT", url, data, params, responseType });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({ baseURL, headers, url, data, params, responseType }: AxiosRequestConfig) {
    return this.apiAxios({ baseURL, headers, method: "DELETE", url, data, params, responseType });
  }
}

export default Abstract;
