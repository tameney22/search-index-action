module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 583:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(264);
const github = __webpack_require__(337);
const { DOMParser } = __webpack_require__(356);
const fs = __webpack_require__(747);
const path = __webpack_require__(622);

const fromPath = './xmls';

const xmls = (/* unused pure expression or super */ null && (["b.xml", "br.xml", "p.xml", "t.xml"]));

function main() {    
    const searchIndex = Array();
    xmls.forEach((fileName, index) => {
        const xmlFilePath = path.join(fromPath, fileName);
        const content = fs.readFileSync(xmlFilePath, 'utf-8');
        //console.log(content)
        const doc = new DOMParser().parseFromString(content);
        const manuscriptTitle = doc.getElementsByTagName('title')[1].textContent;
        const lines = doc.getElementsByTagName('l');

        const milestones = doc.getElementsByTagName('milestone');

        // console.log(milestones[0].parentNode.nodeName);
        // mileMap: <lineNum, Milestone name>
        // var mileMap = new Map();
        var mileMap = {}
        console.log(fileName, "STARTED")
        // All milestones for this file
        for (var i = 0; i < milestones.length; i++) {
            const mileName = milestones[i].getAttribute('n');
            var lineNum;
            
            if (milestones[i].parentNode.nodeName == "l") {
                // console.log("IF")
                const line = milestones[i].parentNode;
                lineNum = line.getAttribute('n');
                // console.log(`Line Num ${lineNum} for milestone: ${mileName}`)
                
            } else if (milestones[i].parentNode.nodeName == "lg") {
                // console.log("ELSE IF on", mileName, "Parent Node:", milestones[i].parentNode.nodeName)
                // console.log(milestones[i].parentNode)
                const lg = milestones[i].parentNode;
                const children = lg.childNodes;
                let nextLine;
                // Loop through lg's children to find the milestone
                // then find the first l after the milestone
                for (var x = 0; x < children.length; x++) {
                    if (children[x].nodeName == "milestone") {
                        console.log(mileName, "Milestone at:", x)
                        for(var y = x; y < children.length; y++) {
                            if (children[y].nodeName == "l") {
                                nextLine = children[y];
                                break;
                            }
                        }
                    }
                }
                lineNum = nextLine.getAttribute('n');
                
            } else if (milestones[i].parentNode.nodeName == "head") {
                // console.log("ELSE IF TWO on", mileName)
                const headNode = milestones[i].parentNode;
                const lg = headNode.parentNode;
                const children = lg.childNodes;
                let nextLine;
                // Loop through lg's children to find the first l
                for (var x = 0; x < children.length; x++) {
                    if (children[x].nodeName == "head") {
                        for(var y = x; y < children.length; y++) {
                            if (children[y].nodeName == "l") {
                                nextLine = children[y];
                                break;
                            }
                        }
                    }
                }
                lineNum = nextLine.getAttribute('n');
                
            }

            // mileMap.set(lineNum, mileName);
            mileMap[lineNum] = mileName
        }

        var page = "1r";

        for (var i = 0; i < lines.length; i++) {
            const lineText = lines[i].textContent;
            const lineNum = lines[i].getAttribute('n');
            
            if (mileMap[lineNum]){
                page = mileMap[lineNum].toLowerCase();
            }
            
            const dotIndex = fileName.indexOf(".");
            const shortFileName = fileName.substr(0, dotIndex)
            const id = lineNum + ": " + shortFileName;
            searchIndex.push({id, lineNum, lineText, manuscriptTitle, page});
        }        
    });
    return searchIndex;
}

try {
  // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
//   let index = main();
  core.setOutput("index", "it works!");
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

/***/ }),

/***/ 264:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 337:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 356:
/***/ ((module) => {

module.exports = eval("require")("xmldom");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(583);
/******/ })()
;