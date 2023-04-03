function findPairs(array) {
    /**
     * @param {Function} finder
     * @description 输入一个字符串数组，返回一个指示对应括号位置的数组。例如：输入“[a[]]”，返回[ 4, -2, 3, 2, 0 ]
     * @param {String[String]} array
     */
    let scannedfro = []; //所有的前括号位置位置
    let result = []; //指示括号位置的数组
    let counter = 0;
    for (let index = 0; index < array.length; index++) {
        let item = array[index];
        if (item == "[") {
            scannedfro.push(index);
            result.push(-1);
            counter++;
        } else if (item == "]") {
            result.push(scannedfro.pop(-1));
            counter--;
        } else {
            result.push(-2);
        }
    }
    result.forEach((item, index, arr) => {
        if (item >= 0) arr[item] = index;
        //补全剩下一半括号的索引
    });
    /**
  return result.map((item) => {
    if (typeof item == "string") return parseInt(item, 10);
    else return item;
  });
  */
    return counter ? NaN : result;
}
// test
// console.log(find('[a[]]'))
export {findPairs}
