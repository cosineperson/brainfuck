const find = require("./connct_finder.js").finder
exports.run = run
function run(code,mem=[0],input=[],extra={max:64})
{
	//code is a string
	//place control the place of the pointer~
	//ctrstr control the stream
	let rst = []
	const ctrarr = find(code)
	let ctrstr=0
	let place=0
	while (1)
	{
		var codechar = code[ctrstr]
		switch (codechar.toString())
		{
			case "+":
				mem[place] += 1
				break
			case "-":
				mem[place] -= 1
				break
			case ".":
				rst.push(mem[place])
				break
			case ",":
				mem[place]=input.shift()
			case ">":
				if(place < mem.length-1) place++
				else place=0
				break
			case "<":
				if(place>0) place--
				else place=mem.length-1
				break
			case "[":
				if (mem[place] == 0)
				{
					ctrstr = ctrarr[ctrstr]
				}
				break
			case "]":
				if (mem[place] != 0)
				{
					ctrstr = ctrarr[ctrstr]
				}
				break
			default:
				break
		}
		ctrstr ++
		if (ctrstr >= code.length) break
	}
	return [rst,mem]
}
