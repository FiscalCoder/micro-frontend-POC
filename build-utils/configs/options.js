const { containersAndIDs } = require("../build-helpers/getFrontends")

let modules = {};

for (const key in containersAndIDs) {
    if (Object.hasOwnProperty.call(containersAndIDs, key)) {
        const element = containersAndIDs[key];
        modules[element.host] = element.host
    }
}

// caution: altering the keys without knowing the complete implementation will result in serious side effects.
const options = {

    // values must be folder names of microFE components inside src
    modules,

    // values must be the same as the folder name of the consumer microFE component under src/consumer-apm/components
    consumerComponents: {
        review_button: "review-button",
        overview_section: "overview-section",
        ratings_section: "ratings-section",
        feedback_section: "feedback-section",
    },
    actions: {
        serve: "serve",
        build: "build",
        jsReport: "jsReport",
        bundleReport: "bundleReport",
    },
    environments: {
        dev: "development",
        prod: "production",
    }
}

const optionList = {
    moduleList: Object.values(options.modules),
    consumerComponentList: Object.values(options.consumerComponents),
    actionList: Object.values(options.actions),
    environmentList: Object.values(options.environments),
}

const configCmd = "--config ./build-utils/webpack/webpack.config.js"

// Key must be the same as action name to get executed
const commandList = {
    serve: `npx webpack serve --hot --stats-error-details ${configCmd}`,
    build: `npx webpack --color --progress profile ${configCmd}`,
    get jsReport() {
        return `${this.build} && npx webpack-bundle-analyzer dist/stats.json`
    },
    get bundleReport() {
        return `${this.build} && npx bundle-stats --html ./dist/stats.json && node ./build-utils/staticFiles.server.js`
    }
}

module.exports = { options, optionList, commandList }