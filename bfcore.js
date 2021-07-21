const find = require("./connct_finder.js").finder
exports.run = function(code,mem=[0],input=[],extra={max:64})
{
	//code is a string
	let place = 0 //control the place of the pointer~
	let ctrstr = 0 //control the stream
	let rst = []
	const ctrarr = find(code)
	while (1)
	{
		var codechar = code[ctrstr]
		switch (codechar.toString())
		{
			case "+":
				mem[place] += 1
				break
			case "-":
				if(mem[place] > 0)
				{
					mem[place] -= 1
				} else {
					mem[place] = extra.max
				}
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
		}
		ctrstr ++
		if (ctrstr >= code.length) break
	}
	return rst
}

