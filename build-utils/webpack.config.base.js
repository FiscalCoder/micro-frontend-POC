const path = require('path');
process.env.rootPath = path.resolve(__dirname, '../');
const { moduleName } = process.env;
const { DIR } = require('./configs/paths')

let config;
if (moduleName === "consumer-apm") {
    config = require(`${DIR.WEBPACK_CONSUMER_CONFIG}/webpack.config.js`)
}
else if (moduleName === "admin-apm" || moduleName === "agent-apm") {
    config = require(`${DIR.WEBPACK_CONSUMER_CONFIG}/webpack.config.js`)
}
else {
    console.log(`ERROR: 'webpack.config.base.js' has not been configured for module ${moduleName} yet`);
    process.exit(1);
}

module.exports = config;