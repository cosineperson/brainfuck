const find = require("./pairs_finder.js").finder;

class Code {
    constructor(code) {
        /** @param {String[String]} code */
        this.code = code;
        this.controller = 0;
        let findResult = find(this.code);
        if (typeof findResult == "number") {
            // find return NaN, not in pairs
            this.notAvailble = "not in pairs";
} else {
            // alright
            this.matchBrancketsList = find(this.code);
            this.notAvailble = false;
        }
    }
    returnCodeChar() {
        return this.code[this.controller];
    }
    commandNext() {
        // @info return whether it succeeds
        if (this.controller >= this.code.length) return false;
        else {
            this.controller++;
            return true;
        }
    }
    brShift() {
        let ctr = this.controller;
        this.controller = this.matchBrancketsList[ctr];
    }
}

class State {
    constructor(mem = [0]) {
        this.pointer = 0;
        this.memoryplace = mem;
        /** @param {Number[]} memoryplace */
    }
    setMemory(mem) {
        this.memoryplace = mem;
    }
    setPointer(to) {
        this.pointer = to;
    }
    pointerNext() {
        if (this.pointer == this.memoryplace.length - 1)
            this.memoryplace.push(0);
        this.pointer++;
    }
    pointerBack() {
        if (this.pointer == 0) {
            this.memoryplace.unshift();
            this.pointer++;
        }
        this.pointer--;
    }
    memoryFetch() {
        return this.memoryplace[this.pointer];
    }
    memoryWrite(num) {
        /** @param {Number} num*/
        this.memoryplace[this.pointer] = num;
    }
    memoryChange(method) {
        let pointer = this.pointer;
        this.memoryplace[pointer] = method(this.memoryplace[pointer]);
    }
    runOnce(code, input) {
        // @param {Code} code
        let output = 0;
        // @param Number output
        let codechar = code.returnCodeChar();
        if (code.notAvailble) {
            return NaN;
        } else {
            switch (codechar) {
                case "+":
                    this.memoryChange((x) => x + 1);
                    break;
                case "-":
                    this.memoryChange((x) => x - 1);
                    break;
                case ".":
                    output = this.memoryFetch();
                    break;
                case ",":
                    this.memoryWrite(input.shift());
                    break;
                case ">":
                    this.pointerNext();
                    break;
                case "<":
                    this.pointerBack();
                    break;
                case "[":
                    // do nothing
                    break;
                case "]":
                    if (this.memoryFetch() == 0) {
                    } else code.brShift();
                    break;
            }
            return code.commandNext() ? output : NaN;
        }
    }
}
exports.Code = Code;
exports.State = State;
exports.run = function (code, input = [0], times = Infinity) {
    let myState = new State(memory);
    let myCode = new Code(code);
    let inputs = input;
    let res = [];
    for (let i = 0; i < times; i++) {
        let returning = myState.runOnce(myCode, inputs);
        if (isNaN(returning)) break;
        else res.push(returning);
    }
    return res;
};

