exports.finder = function(arr,fro="[",lst="]")
{
	//那个arr实际上是string
	let scannedfro = []//所有的前括号位置位置
	let result = []//指示括号位置的数组
	let lastfro = []//最后一次出现的前括号
	let index = -1
	for (let item of arr) {
		index += 1
		if (item==fro)
      {
		      lastfro.push(index)
	      		result.push(0)
		} else if (item == lst) {
			result.push(lastfro[-1])
			lastfro.pop(-1)
		} else {
			result.push(0)
		}
	});
	result.forEach((item,index,arr)=>{
			if (item != 0) arr[item] = index
			//补全剩下一半括号的索引
	})
	return result;
}
