'use strict'
module.exports = {
  NODE_ENV: '"production"',
  siteId: JSON.stringify(process.env.siteId), //是为了在sites/site1/index.js和router/index.js以及各个组件内引用process.env.siteId
}
