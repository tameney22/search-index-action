const core = require('@actions/core');
const github = require('@actions/github');
const { DOMParser } = require('xmldom');
const fs = require('fs');
const path = require('path');

const fromPath = './xmls';

const xmls = ["b.xml", "br.xml", "p.xml", "t.xml"];

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
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
  let index = main();
  core.setOutput("searchIndex", index);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}