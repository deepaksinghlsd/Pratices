const url = 'https://jsonplaceholder.typicode.com/posts';

// const fun = async() => {
//  const datas =  await fetch(url).then((res)=>{
//      return  res.json();
//     })
//     console.log(datas);
// }
// fun()


let promise = new Promise(function (resolve, reject) {
	const x = "geeksforgeeks";
	const y = "geeksforgeeks"
	if (x === y) {
		resolve("Strings are equal");
	} else {
		reject();
	}
});

promise.
	then(function (res) {
		console.log(res);
	}).
	catch(function () {
		console.log('Some error has occurred');
	});
