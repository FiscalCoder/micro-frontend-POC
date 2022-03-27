const fs = require('fs')
const Path = require('path')
const shell = require('shelljs');

const { rootPath } = process.env
const getFullPath = (path) => Path.resolve(rootPath, path)

const moduleName = process.env.moduleName

console.log(rootPath)

const PATHS = {
  DIR: {
    SRC: getFullPath(`src/${moduleName}`),
    DIST: getFullPath('dist'),
    PUBLIC: getFullPath('public'),
    WEBPACK_AGENT_ADMIN_CONFIG: getFullPath('build-utils/modules/agent-admin-webpack-configs'),
    WEBPACK_CONSUMER_CONFIG: getFullPath('build-utils/modules/consumer-webpack-configs'),
  },
  get FILES() {
    return {
      APP_ENTRY_POINT: this.DIR.SRC + '/index.js',
      GLOBAL_CSS: this.DIR.PUBLIC + "/css/index.scss",
      BOOTSTRAP_JS: this.DIR.PUBLIC + "/js/bootstrap.bundle.min.js",
      BOOTSTRAP_CSS: this.DIR.PUBLIC + "/css/custom-bootstrap.scss",
      BASE_HTML: this.DIR.PUBLIC + "/index.html",
      // FAVICON: this.DIR.PUBLIC + "/favicons/pg.ico",
    }
  }
  // APP_ENTRY_POINT: getFullPath("src/index.js"),
  // GLOBAL_CSS: getFullPath("public/css/index.scss"),
  // BOOTSTRAP_JS: getFullPath("public/js/bootstrap.bundle.min.js"),
  // BOOTSTRAP_CSS: getFullPath("public/css/custom-bootstrap.scss"),
  // BASE_HTML: getFullPath('public/index.html'),
  // FAVICON: getFullPath('public/favicons/pg.ico')
}

try {
  fileExists = fs.existsSync(PATHS.DIR.SRC);

  if (!fileExists)
    throw Error("File Does not exist")

} catch (error) {
  shell.echo(`ERROR: Received module name '${moduleName}'. \nPath: '${PATHS.DIR.SRC}' does not exists\n`)
  process.exit(1);
}



module.exports = { ...PATHS }

  // "config": {
  //   "setDevEnv": "cross-env NODE_ENV=development",
  //   "setProdEnv": "cross-env NODE_ENV=production",
  //   "serve": "$npm_package_config_setDevEnv webpack serve --hot",
  //   "build": "$npm_package_config_setProdEnv webpack --color --progress profile"
  // },
  // "scripts": {
  //   "setDevEnv": "microFE=$npm_config_FE",
  //   "setProdEnv": "cross-env NODE_ENV=production",
  //   "build": "npm run setProdEnv -- webpack --color --progress profile",
  //   "serve": "microFE=$npm_config_FE $npm_package_config_serve",
  //   "build-dev": "npm run setProdEnv -- webpack serve --hot",
  //   "report": "npm run build && webpack-bundle-analyzer dist/stats.json",
  //   "start": "chmod +x ./build-utils/run.sh && sudo ./build-utils/run.sh $npm_config_FE",
  //   "startjs": "node ./build-utils/start.js $npm_config_module development"
  // },