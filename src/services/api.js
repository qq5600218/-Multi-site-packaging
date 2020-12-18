/**
 * Created By nicholas on 2019/03/13
 *
 * api统一管理地址
 */
const publicPath = "/hnaid";
let api = {};
for (let key in api) {
  api[key] = publicPath + api[key];
}
/* 导出api对象 */
export default api;
