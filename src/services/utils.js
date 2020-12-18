/**
 * Created By nicholas on 2019/3/13
 *
 * 公共的工具方法
 *
 */
let utils = {
  /**
   * 保存数据在sessionStorage，以键值对存在
   * @param {String} name  键名
   * @param {String/Object/Array/...} value 键值
   *
   */
  setSessionStorage: function (name, value) {
    if (!this.isSupportStorage())
      return null;

    if (this.isObject(value))
      value = JSON.stringify(value);

    sessionStorage.setItem(name, value);
  },

  /**
   * 获取sessionStorage数据
   * @param {String} name 键名
   * @return {String/Object/...} 键值
   *
   */
  getSessionStorage: function (name) {
    if (!this.isSupportStorage())
      return null;
    let value = sessionStorage.getItem(name);
    if (this.isJSON(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },

  /**
   * 保存数据在localStorage，以键值对存在
   * @param {String} name  键名
   * @param {String/Object/Array/...} value 键值
   *
   */
  setLocalStorage: function (name, value) {
    if (!this.isSupportStorage())
      return null;

    if (this.isObject(value))
      value = JSON.stringify(value);

    localStorage.setItem(name, value);
  },

  /**
   * 获取localStorage数据
   * @param {String} name 键名
   * @return {String/Object/...} 键值
   *
   */
  getLocalStorage: function (name) {
    if (!this.isSupportStorage())
      return null;
    let value = localStorage.getItem(name);
    if (this.isJSON(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },

  /**
   * 判断字符串是否为JSON
   * @param  {String}  str json字符串
   * @return {Boolean}     true/false
   */
  isJSON: function (str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * 判断是否支持sessionStorage和localStorage
   * @return {Boolean} true/false
   *
   */
  isSupportStorage: function () {
    if (window.sessionStorage && window.localStorage)
      return true;
    else
      return false;
  },

  /**
   * 判断是否为object对象，排除null
   * @param  {obj}  value 判断的对像
   * @return {Boolean} true/false
   *
   */
  isObject: function (value) {
    return (value !== null && typeof value === 'object');
  },

  /**
   * 判断是否为整数
   * @param  {Number}  int 判断的数字
   * @return {Boolean}     true/false
   */
  isInteger: function (int) {
    var n = Number(int);
    return typeof n === 'number' && n % 1 === 0
  },

  /**
   * 获取app链接到前端页面url地址参数 http://10.9.113.99:8088/#/analyse?tk=123456&userId=9999
   * @param  {String} name 要获取的参数
   * @return {String}      参数值 tk、userId
   *
   */
  getQueryString: function (name) {
    let search = unescape(window.location.hash).split("?")[1];//对app通过url传递过来的token字符串进行解码。
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = search.match(reg);
    let context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },
  /**
   * 将阿拉伯数字0-9转换成一，二，三，四、、、
   *   @param  {Number}    参数名 要转的数字
   *  @return {String}   转换后的字符串
    */

  convertToChinese(num) {
    let N = [
      "零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
    ];
    let str = num.toString();
    let len = num.toString().length;
    let C_Num = [];
    for (let i = 0; i < len; i++) {
      C_Num.push(N[str.charAt(i)]);
    }
    console.log(C_Num)
    return C_Num.join('');
  },
}
export default utils;
