/**
    * const fs = require("fs")
    * console.log("start main.js")
    * const thecore = require("./bfcore.js")
    * var codpat = "./mybf.txt"
    * var code = fs.readFileSync(codpat,"utf8",(err) => { console.log(err)  })
    * console.log("start bfcore.js")
    * let [rst,mem] = thecore.run(code,[2,8,9])
    * console.log(rst,mem)
*/
// const thecore = require('./bfcore')
// TODO
import * as core from "./bfcore.js"
