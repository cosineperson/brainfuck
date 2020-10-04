exports.finder=function(str,findindex,fro="[",lst="]")
{
	var scannedindex = []//所有的括号位置
	var result
	str.forEach( (item,index)=>{
		if (item==lst) {
		if(findindex == index)
		{
			result = scannedindex[-1]
		} else if (findindex == scannedindex[-1])
		{
			result = index
		} else {str[index] = o
		str[scannedindex[-1]] = o
		scannedindex.pop()}
		if (item == fro || item == lst)
scannedindex.push(index)
		}
	} )
	return result
}
