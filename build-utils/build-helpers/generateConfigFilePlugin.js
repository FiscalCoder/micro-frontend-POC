const fs = require('fs');
const { DIR: { DIST: DIST_PATH } } = require('../configs/paths')
const webpack = require('webpack')
const config = {
    apply: compiler => {
        compiler.hooks.done.tap("generate-config-plugin", stats => {

            const cssRegex = new RegExp(/\.css$/);
            const jsRegex = new RegExp(/\.js$/);

            const fileNames = Object.keys(stats.compilation.assets);
            let cssFilteredFiles = [], jsFilteredFiles = [];

            fileNames.forEach(fileName => {
                if (fileName.match(cssRegex))
                    cssFilteredFiles.push(fileName);
                else if (fileName.match(jsRegex))
                    jsFilteredFiles.push(fileName);
            })

            const filteredFiles = {
                js: jsFilteredFiles,
                css: cssFilteredFiles
            }

            fs.writeFile(`${DIST_PATH}/config.json`, JSON.stringify(filteredFiles), err => {

                // Checking for errors
                if (err) console.log(err);

                console.log("Done writing"); // Success  
            });
        })
    }
}

module.exports = { ...config };