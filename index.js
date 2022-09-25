#!/usr/bin/env node

var path = require("path");

var script = process.argv[2] || 'start';

// 移除参数，以免gulp把它当成任务id
process.argv.splice(2, 1);

process.argv.push(
  script
);

// 增加--cwd参数---这个很重要
process.argv.push(
  "--cwd",
  process.cwd()
);

// 增加--gulpfile参数
process.argv.push(
  "--gulpfile",
  path.resolve(__dirname, "./gulpfile.js")
);

require("gulp/bin/gulp");
