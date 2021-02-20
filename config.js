// requires
const _ = require("lodash");

// module variables
const config = require("./config.json");
const e = require("express");
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "dev";
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

module.exports = global.gConfig


// var xxx = JSON.stringify(global.gConfig)
// var _obj = JSON.parse(xxx)
// console.log(_obj.kafkahost)

// log global.gConfig
// console.log(
//     `global.gConfig: ${JSON.stringify(
//     global.gConfig,
//     undefined,
//     global.gConfig.json_indentation
//   )}`
// );