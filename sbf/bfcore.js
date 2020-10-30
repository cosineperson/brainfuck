exports.run = function(code,mem,ch)
{
	var place = 0 //指针位置
	var ctrstr = 0 //控制流
	while (1)
	{
		var codechar = code[ctrstr]
		if (mem.length <= place+1) {
			mem.push(0)
		}
		switch (codechar.toString())
		{
		case "+":
			mem[place]++
			break
		case "-":
			if(place > 0)
			{
				mem[place]--
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
		default:
			console.log("o")
            //todo
		}
		ctrstr ++
		if (ctrstr >= code.length) break
	}
}
