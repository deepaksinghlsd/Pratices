// sets :--sect is collection of unique value paire and its similar of array 

// let Myset = new Set([9,8 , "Deepak" , "sjdfhdfj" ,"vikash"])
// console.log(Myset);

// console.log(Myset.size);
// let chekName = false
// Myset.forEach(element => {
//    if (chekName) return ;
//    if (element === "Deepak"){
//     chekName = true

//    }
//    console.log(element);
   
// });

const setA = new Set([1,2,3,4])
const setB = new Set([3,4,5,6])
const inersteSet = [...setA].filter(item => setB.has(item))
console.log(inersteSet);


// sets :--sect is collection of unique value paire and its similar of array



