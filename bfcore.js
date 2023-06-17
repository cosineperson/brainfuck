import { findPairs as find } from "pairs_finder.js"

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
      this.end = false
      this.notAvailble = false;
    }
  }
  returnCodeChar() {
    return this.code[this.controller];
  }
  commandNext() {
    // @info return whether it succeeds
    if (this.controller >= this.code.length) this.end = true;
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

class memoryState {
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

class fifoStack {
  constructor() {
    this.memory = []
  }
  add(element) {
    this.memory.push(element)
  }
  del() {
    return this.memory.pop()
  }
  pipein(stack, times = Infinity) {
    //@param {fifoStack} stack
    //@param {Number} times
    for (i = 0; i < times; i++) {
      let res = stack.del()
      if (this.res != undefined) this.add(res)
      else break
    }
  }
}

class ioState {
  constructor() {
    this.stdinput = new fifoStack()
    this.stdoutput = new fifoStack()
  }
  feedin(x) {
    this.stdinput.add(x)
  }
  display() {
    print(this.stdoutput.memory)
  }
}

const id = (x) => x

class Syntax {
  constructor() {
    //pass
  }

  runOnce(code, memorystate, iostate) {
    // @param {Code} code
    // @param {ioState} iostate
    // @param {memState} memorystate
    let codechar = code.returnCodeChar();
    code.commandNext()
    if (code.notAvailble) {
      return undefined;
    } else {
      switch (codechar) {
        case "+":
          memorystate.memoryChange((x) => x + 1);
          break;
        case "-":
          memorystate.memoryChange((x) => x - 1);
          break;
        case ".":
          const r = memorystate.memoryFetch()
          iostate.stdoutput.add(r)
          break;
        case ",":
          const input = iostate.stdinput.del()
          if (input != undefined) memorystate.memoryWrite(input);
          break;
        case ">":
          memorystate.pointerNext();
          break;
        case "<":
          memorystate.pointerBack();
          break;
        case "[":
          // do nothing
          break;
        case "]":
          if (memorystate.memoryFetch() != 0) code.brShift()
          break;
      }
    }
  }
}

//TODO add a midlayer to handle input and output

class BrainfuckMachine {
  constructor(syntax = Syntax) {
    this.memory = new memoryState([0])
    this.syntax = new syntax()
    this.io = new ioState()

    this.pipein = this.io.stdinput.pipein
  }
  feed(codestr) {
    this.code = new Code(codestr)
  }
  rm_rf() {
    const old = this.memory
    this.memory = new memoryState([0])
    this.io = new ioState()
    return old
  }
  get_memory() {
    return this.memory.memoryplace
  }
  input(element) {
    this.io.feedin(element)
  }

  run(times = Infinity) {
    let i = 1
    while (i<=times) {
      this.syntax.runOnce(
        this.code, this.memory, this.io
      )
      if (this.code.end == true) {
        break;
      }
      i++
    }
  }
}


// for quickjs
//let bf1 = new BrainfuckMachine()
//bf1.feed(",[-.].")
//bf1.input(10)
//bf1.run()
//bf1.io.display()
//TODO
export {BrainfuckMachine,Syntax,ioState,memoryState}