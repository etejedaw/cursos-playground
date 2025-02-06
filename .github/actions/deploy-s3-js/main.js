const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function init() {
	core.notice("Hello world!");
}

init();
