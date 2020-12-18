let nodeCmd = require('node-cmd');

// 配置需要打包的站点，
let siteList = ['site1', 'site2'];

for (let item of siteList) {
  nodeCmd.get(
    'npm run build:' + item,
    function (err, data, stderr) {
      console.log('-----------------------------start------------------------------------------')
      console.log('the current dir contains these files : ' + item)
      console.log(data)
    }
  )
}

console.log("the current working dir is : build...");
