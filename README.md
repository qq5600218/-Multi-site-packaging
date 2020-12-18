## 多站点打包项目构建



#### 目录结构

build

    build.js                  // weback构建打包配置
    check-versions.js         // webpack版本检查工具
    utils.js                  // 多站点打包主要配置工具
    vue-loader.conf.js        // vue加载插件
    webpack.base.conf.js      // webpack出入口、插件管理工具
    webpack.dev.conf.js       // webpack开发环境构建
    webpack.prod.conf.js      // webpack生产环境构建
    webpack.test.conf.js      // webpack测试环境构建
config
    dev.env.js                // 开发环境全局变量
    index.js                  // 开发和生产环境合并变量
    prod.env.js               // 生产环境全局变量
dist                                                 //各个站点打包文件 

```
site1                      //站点1打包文件
site2                      //站点2打包文件
```

src							

    common
        commonMain.js         //各个站点公共main.js关键
    components
        commonApp.vue         //公共app.vue
        Home.vue              //首页
        Discount.vue          //优惠
        Service.vue           //服务
        Person.vue            //个人中心
    router
        router.js                         // 全局路由管理
    store
        index.js                          // 全局状态管理
    utils
        api.js                            // api接口管理
        utils.js                          // 公共的工具方法文件
static                                    //公共静态资源文件
    css
        reset.css                    // 全局样式初始化
    font                             //字体图标
    images                           //公共图片

.babelrc
.editorconfig
.gitignore                                // 忽略git本地存储文件
build.js                                  // 执行快速打包多站cmd指令
package.json                              // 包管理器，不用解释了
postcssrc.js                              // 自动添加浏览器样式前缀
remind.md                                 // 本文件，项目文件说明



#### 进入目录安装依赖

```javascript
npm i
```

#### 项目启动

```
npm run dev   //默认启动站点1-测试环境
```

站点1-本地开发环境启动

```javascript
npm run dev:site1-plus
```

站点1-本地测试环境启动

```
npm run dev:site1-test
```

站点1-线上环境启动

```
npm run dev:site1-online
```

站点2-本地开发环境启动

```javascript
npm run dev:site2-plus
```

站点2-本地测试环境启动

```
npm run dev:site2-test
```

站点2-线上环境启动

```
npm run dev:site2-online
```

#### 

#### 项目打包

```
npm run build   //打包所有站点项目
```

站点1打包

```
npm run build:site1
```

站点2打包

```
npm run build:site2
```