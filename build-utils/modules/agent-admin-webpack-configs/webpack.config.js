const { NODE_ENV: env } = process.env;

let config;
if(env === 'production'){
    config = require('./webpack.config.prod.js');

}
else if(env === 'development')
    config = require('./webpack.config.dev.js');
else{
    console.log(`NODE_ENV should either be 'production' or 'development' but was ${process.env.NODE_ENV}`);
    process.exit(1);
}

module.exports = config;