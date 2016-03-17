var assert = require("assert");
var babel = require("babel-core");
var vm = require("vm");

var code = 'export * from "./src/dep.js"';

code = babel.transform(code, {
  ast: false,
  plugins: [
    ["transform-es2015-modules-commonjs", {loose: true}]
  ],
}).code;

var context = {
  module: {
    exports: {}
  },
  require: require,
};
context.exports = context.module.exports;

vm.runInNewContext(code, context);

// exports.__esModule shouldn't be overwritten
assert.equal(
  context.exports.__esModule,
  true,
  "Expected exports.__esModule === true"
);
