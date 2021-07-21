exports.finder = function(arr)
{
	//那个arr实际上是string
	let scannedfro = []//所有的前括号位置位置
	let result = []//指示括号位置的数组
	for (let index in arr) {
		let item = arr[index]
		if (item == "[")
      		{
			scannedfro.push(index)
	      		result.push(-1)
		} else if (item == "]") {
			result.push(scannedfro.pop(-1))
		} else {
			result.push(-2)
		}
	};
	result.forEach((item,index,arr)=>{
			if (item >= 0) arr[item] = index
			//补全剩下一半括号的索引
			if (typeof item == "string") item = parseInt(item,10)
	})
	return result.map( (item)=>{
		if (typeof item == "string") return parseInt(item,10)
		else return item
	} );
}
