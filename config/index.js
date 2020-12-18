'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const siteId=process.env.siteId;
const personIp = require('ip').address(); //本机ip
const myParams = process.env.proxyService; //proxyService 是在package.json=>scripts=>dev=>cross-env proxyService=plus 自己定义的一个参数
let proxy_service; //代理接口ip
switch (myParams) {
  case 'plus':
    proxy_service = "http://100.100.0.29:5001";
    console.log(`/******************当前是${siteId}站点 连接本地开发环境 代理ip为${proxy_service} 参数${siteId}-plus*******************/`);
    break;
  case 'test':
    proxy_service = "http://10.200.201.29:5001";
    console.log(`/******************当前是${siteId}站点 连接内网测试环境 代理ip为${proxy_service} 参数${siteId}-test*******************/`);
    break;
  case 'online':
    proxy_service = "http://172.31.32.6:5001";
    console.log(`/******************当前是${siteId}站点 连接线上灰度环境 代理ip为${proxy_service} 参数${siteId}-online*******************/`);
    break;
}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    //设置代理
    proxyTable: {
      '**': {
        target: proxy_service,
        changeOrigin: true,
        filter: req => 'access_token' in req.query
      }
    },
    // Various Dev Server settings
    host: personIp, // can be overwritten by process.env.HOST
    port: 8686, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    //是否开启 cssSourceMap
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    // 构建输出的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    // 打包输出的文件一级目录
    assetsRoot: path.resolve(__dirname, '../dist/' + process.env.siteId),
    //打包输出的二级目录
    assetsSubDirectory: 'static',
    // 打包发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //(此处有坑) 如果打包报错，应该是版本问题 ，先卸载之前安装的此插件 ，然后安装低版本 
    //npm install --save-dev compression-webpack-plugin@1.1.11
    //后台nginx开启gzip后，前端打不打包成gzip都一样
    productionGzip: false,
    //需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
