// class human {
//     name = "deepak Singh"
//     age = 16 
   
//     printname = (name) =>{
//         console.log(name)
//     }
//     printrandom = function random() {
//         console.log("hellow every one "); 
//     }

// }
//  let Data = new human()
//  console.log(human.name);
//  console.log(human.printrandom());
 

// class human {
//     name = "deepak Singh";
//     age = 16;
   
//     printname = (name) => {
//         console.log(name);
//     }

//     printrandom = function () {
//         console.log("hello everyone");
//     }
// }

// let Data = new human();
// console.log(Data.name); // Access the name property through the instance
// Data.printrandom();     // Call printrandom() through the instance

// Array.from({ length: 10 }).forEach((data, index) => console.log(data, index));

// ****************************loops in javaScripts ******************************

// ************for of loop are woking on itterable values like array and string for of loop are not user in jobject ************


// let arr = [1,3,4,5,6,7,8,8,9,34,5,5,7,45,34,5,6346,4,66,4565]
// for (const i of arr){
//     console.log(`current value of i ${i}`)
//     if (i == 66){
//         break;
//     }
    
// }


// let name = "deepak Kumar Singh"
// const nameToupperCase = name.toUpperCase()
// console.log(nameToupperCase);
// for (let i=0; i<name.length ; i++){
//     if(name[i]== " "){
//         continue;
//     }
//     console.log(`----------> foe loop ${i} string name ${name[i]}`);
// }

// for (const j of name){
//     if (j ==" ") {
//         continue
//     }
//     console.log(j);
    
// }

// let nameArr = ["deepak", "rishav", "mangal", "niraj","abhinav", "arunjay","anmol","vikash", "abhisek"]
// for  (const element in nameArr ) {
//     console.log(`index ${element} value ${nameArr[element]}` );
    
// }

// for-in loop are user both array and object and string all of these 

// const obj = {
//     name:"deeapk Kumar singh",
//     age: 25,
//     gender:"male",
//     address:{village:"neur",
//         ward_no:11,
//         district:"Madhubani",
//         state:"Bihar"
//     },
//     hobbies:["cricket","football","reading","swimming"],
//     frind_list: nameArr

// }

// for(let element in obj){
//     if (typeof obj[element] === "object") {
//         continue;
//     }
    
//     console.log(`key ${element} value ${obj[element]}`);
// }
// for(let value in obj.name){
//     console.log(`${value} : ${obj.name[value]}`);
// }
// for(let arr of obj.frind_list){
//     console.log(arr);
// }

// for each loop in javaScript ---
// for each loop speficaly used for array 

const listArr = [
"Deepak", "Abhisek","Abhinav", "Sultan", "Mirjaa",1 ,3,4 , 5,5,studentnamen={
name:"binod",
fatherof:"abhinav roy",
age:58,
brother:["vikek","Angade","bacchas"]
},
printdeepak = function name(){
    console.log('helloe may name is deepak');
    
}
]

console.log(listArr.length);
// for each loop is used for array only
listArr.forEach((val)=>(
    if (val==='Deepak') {
        break;
    }
    console.log(val)
    
))
console.log(listArr[11]());







