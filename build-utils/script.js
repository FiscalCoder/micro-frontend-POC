#! /usr/bin/env node
const shell = require('shelljs');
const { 
    optionList: 
        {
            moduleList, 
            consumerComponentList, 
            actionList, 
            environmentList: envList
        },
    commandList: commands, 
    options: { modules }
    } = require('./configs/options');


const [
    env,
    action
] = process.argv.slice(2);

const {
    npm_config_module: moduleName,
    npm_config_component: componentName, 
} = process.env


const Echo = (msg) => shell.echo(`\nERROR: ${msg}\n`);

const isModuleName = moduleList.some(moduleEle => moduleEle === moduleName);
const isEnv = envList.some(envEle => envEle === env);
const isAction = actionList.some(actEle => actEle === action)
const isConsumerComponent = consumerComponentList.some(componentEle => componentEle === componentName)

if (!isEnv) {
    Echo(`Received ${env}. Invalid Environment \nCurrent available environments are '${envList.join(", ")}'`)
    process.exit(1);
}

if (!isAction) {
    Echo(`Received ${action}. Invalid Action \nCurrent available actions are '${actionList.join(", ")}'`)
    process.exit(1);
}

if (!isModuleName) {
    Echo(`Received ${moduleName}. Module has not been added \nCurrent available modules are '${moduleList.join(", ")}'`)
    process.exit(1);
}

process.env.moduleName = moduleName;
process.env.NODE_ENV = env;

shell.exec(commands[action])


