import {findPairs as find} from "pairs_finder.js"

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
}

function runOnce(code,state,input) {
    // @param {Code} code
    let output = 0;
    // @param Number output
    let codechar = code.returnCodeChar();
    if (code.notAvailble) {
        return NaN;
    } else {
        switch (codechar) {
            case "+":
                state.memoryChange((x) => x + 1);
                break;
            case "-":
                state.memoryChange((x) => x - 1);
                break;
            case ".":
                output = state.memoryFetch();
                break;
            case ",":
                state.memoryWrite(input);
                break;
            case ">":
                state.pointerNext();
                break;
            case "<":
                state.pointerBack();
                break;
            case "[":
                // do nothing
                break;
            case "]":
                if (state.memoryFetch() != 0) code.brShift()
                break;
        }
        return code.commandNext() ? output : NaN;
    }
}
class BrainfuckMachine {
    constructor(evaler=runOnce) {
        this.state = new State([0])
        this.evaler = evaler
    }
    feed(code) {
        this.code = new Code(code)
    }
    rm_rf() {
        const old = this.state
        this.state = new State([0])
        return old
    }
    run(inputs=[0],times=Infinity) {
        let inputStream = inputs;
        let res = [];
        for (let i = 0; i < times; i++) {
            let returning = this.evaler(this.code,this.state, inputStream.shift());
            if (isNaN(returning)) break;
            else res.push(returning);
        }
        return res;
    }
    runOnce(input) {
        return this.evaler(this.code,this.state,input)
    }
}

export {State,Code,BrainfuckMachine,runOnce}

// for quickjs
// print(run("+++[-.]"))

let bf1 = new BrainfuckMachine()
bf1.feed(",[-.]+.")
print(bf1.runOnce(10))
print(bf1.run())

