import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";

// 定义接口
interface PendingType {
  url: string | undefined;
  method: Method | undefined;
  params: object;
  data: object;
  cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// axios 实例
const instance: AxiosInstance = axios.create({
  timeout: 100000,
  responseType: "json"
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig<any>) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel("操作太频繁，请稍后再试");
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    console.log("loading");

    removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c });
    });
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("关闭loading");

    removePending(response.config);
    return response;
  },
  (error) => {
    console.log("关闭loading");
    const response = error.response;

    // 根据返回的code值来做不同的处理(和后端约定)
    switch (response?.status) {
      case 401:
        // token失效

        break;
      case 403:
        // 没有权限
        window.location.href = "/403";
        break;
      case 500:
        // 服务端错误
        window.location.href = "/503";
        break;
      case 503:
        // 服务端错误
        window.location.href = "/503";
        break;
      default:
        break;
    }

    return Promise.reject(response || { message: error.message });
  }
);

export default instance;
