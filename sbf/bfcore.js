const find = require("./connct_finder.js").finder
exports.run = function(code,mem=[])
{
	//code is a string
	let place = 0 //指针位置
	let ctrstr = 0 //控制流
	const ctrarr = find(code)
	while (1)
	{
		var codechar = code[ctrstr]
		if (mem.length <= place+1) {
			mem.push(0)
		}
		switch (codechar.toString())
		{
		case "+":
			mem[place] += 1
			break
		case "-":
			if(mem[place] > 0)
			{
				mem[place] -= 1
			}
			break
		case ".":
			console.log(mem[place])
			break
		case ">":
			place++
			break
		case "<":
			place--
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
}
