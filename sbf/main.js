const fs = require("fs")
console.log("start main.js")
const thecore = require("./bfcore.js")
var codpat = "./mybf.txt"
var ch = "utf8"
var code = fs.readFileSync(codpat,ch,(err) => { console.log(err) })
console.log("start bfcore.js")
thecore.run(code,[0,0],ch)
