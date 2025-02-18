// const Arry = ["12" , "123" ,"321", "24321","324324,"]
// console.log(Arry);
//  let newwData =[]
// Arry.forEach( (item)=> {
//     if(item >= 10){
//         console.log(item)
//         newwData.push(item)
//     console.log(newwData);
//     }
    
//  });
//  console.log(newwData);

// For each are not retuen any value and for each have can itrete array one by one on each item 

// ______________________________*******for in loop**********-------------------------------

// let x = []
// for (const key in Arry) {
//   x.push(Arry[key])
// //   console.log(x);
 
// }
// console.log(x);


// const StudentName = {
//     "rol1":"Deepak", "rol2":"Shubhama", "rol3":"Aman"}
//     let name 
// for (const key in StudentName) {
//    console.log(key, StudentName[key]);
// //    name = StudentName[key]
// }
// for in loop are basicicly used for object in 


 //-------------------------------------for of loop _______________________________________________________

//  for (const i of Arry) {
//     console.log(i);
    
//  }

 //for of loop used in arry it itret all element in arr one by one 


//  Arry.map((item)=>(console.log(item)
//  ));

//  Arry.reduce()

const Array = [1 , 4, 5,6,7,8,9,10]
// for ( const i of Array){
//     console.log(i)
// }

const Student_table = {
    "Name":"Deepak Singh",
    "Age":"25",
    "Address":"Delhi"
} 
// let text = []
// for (const key in Array){
    
//    console.log(key);
//    text +=Array[key]
//    console.log(text);

// }


// constructure function and reguler function:----------------------------------------------

// function NAME ( name , age ) {
//     this.name = name
//     this.age = age,
//     this.display = function(){
//         console.log(this.name,this.age)
//     }

// }
// let person = new  NAME("deepak" , "23")

// console.log(typeof person);
// person.display()

//Promices in java Script 

// const Response = new Promise (function (resolve , reject) {
//     const data = "Hello , I am Deepak"
//    setTimeout(function(){
//     console.log(`what are duing ${data}`);
//     resolve()
    
//    },1000)
// })
// Response.then(function(){
//     console.log("I am in then block")
// })

// new Promise (function(resolve , reject){
//     setTimeout( function(){
//         let ERROR = false
//         if(!ERROR){
//             resolve({"user":"deepak", "Age":"26"})
//         }
//         else{
//             reject("Error in resolve the promices")
//         }
//     },1000)
// })
// .then((data)=>{
// const DATA = data.user;
// console.log(DATA); 
// }).catch((err)=>console.log(err))
// .finally(()=>console.log(`The Promices are `)
// )

// async function allUsere() {
//    try {
//     const data = await fetch('https://jsonplaceholder.typicode.com/users')   
//     const users = await data.json()
//     console.log("Jason",users);
//    } catch (error) {
//     console.log(error);
    
//    }
    
// }
// allUsere()

//  const Data = fetch ('https://jsonplaceholder.typicode.com/users')
// .then((Data)=>Data.json())
// .then((users)=>console.log(users))
// .catch((err)=>console.log(err))

// Prototype inheretece

// const User = {
//     "name":"Deepak",
//     "Age":"24",
//     "city":"Delhi"
// }
// Object.prototype.Name = function(){
//    console.log(`user name ${this.name} and  Age is ${this.Age} `);
   
// }
// console.log(User.Name())

// let techers = {
//     name :"rampesh",
//     Age: 25,
// }
// let cours = {
//     "subject1":"Science",
//     "subject2":"Maths"
// }

// const DATA = Object.setPrototypeOf(cours,techers)
// console.log(DATA.name);
// console.log(DATA);
//set protopty set the one object value to another object in js

// call in javaScript

function Nameset (name){
    this.name = name;
    console.log("helll");
    
}
function DATA ( name ,age , vill , city){
    Nameset.call(this ,name);
    this.age = age;
    this.vill=vill;
    this.city = city;
}

const user = new DATA("deepak", "22", "neur" ,"madhubani")
console.log(user);

