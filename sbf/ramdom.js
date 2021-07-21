function judge(f,a,r) {
	let rr = f(a)
	let dr = rr-r
	return dr
}
function ramdomMaker(size) {
	let str = []
	let code = ["[","]","+","-",">","<",",",".","[-]","[->+<]"]
	let ramdomseed = 6 
	for(let i = size;i>0;i--) {
		if (ramdomseed == 0) {
			ramdomseed=Math.random()*100000
			ramdomseed=Math.floor(ramdomseed)
		} 
		let r = ramdomseed%10
		let ramdomseed = (ramdomseed-r)/10
		str.push( code[r] )
	}
	return str
}
exports={
	judge,ramdomMaker
}
console.log(ramdomMaker(10))
