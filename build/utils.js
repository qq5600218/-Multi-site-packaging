'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
//导入生成html文件的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  //使用px2rem-loader插件将px转rem ,  设置以下代码
  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75//设计稿尺寸/10
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    //使用px2rem-loader插件将px转rem ,  设置以下代码
    // const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


const PAGE_PATH = path.resolve(__dirname, '../src/sites/');
const glob = require('glob');
//webpack配置合并插件
const merge = require('webpack-merge');
/* 全局webpack入口文件，多页面关键 */
exports.entries = function () {
  const entryFiles = glob.sync(PAGE_PATH + '/*/*.js');
  let map = {};
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let docName = filePath.split('/')[filePath.split('/').length - 2];
    if (docName == process.env.siteId) {
      map[filename] = filePath;
    }
  })
  //console.log(map);
  return map;
};

/* 生成多页面html文件 */
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let docName = filePath.split('/')[filePath.split('/').length - 2];
    let conf = {
      template: filePath,
      filename: filename + '.html',
      // chunks: ['manifest', 'vendor', filename],
      inject: false,
    };
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          removeAttributeQuotes: false,
          collapseWhitespace: true,
          preserveLineBreaks: true
        },
        chunksSortMode: 'dependency'
      });
    }
    if (docName == process.env.siteId) {
      arr.push(new HtmlWebpackPlugin(conf));
    }
  })
  return arr;
};
