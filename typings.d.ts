/*
 * @Author: 云霄
 * @Date: 2021-12-24 17:54:52
 * @LastEditors: 云霄
 * @LastEditTime: 2021-12-24 17:57:58
 * @description:
 */
declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.svg" {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
