/**
 * 集成Abstract
 */
import Abstract from "../abstract";
import { MicroApp } from "../types";

class Common extends Abstract {
  /**
   * 子应用1
   */
  getMicroApp(params: MicroApp) {
    return this.getReq({ url: "Common.MicroApp", params });
  }

  getDemo() {
    return this.getReq({ url: "/demo" });
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Common();
  return instance;
})();
