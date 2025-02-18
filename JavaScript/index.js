// way to print in java script
// console.log("Hello World");
//alert("Hello ")
//document.write("This is document write");
// java script console Api(Application Program inter face)\
//console.log("Heelo worls", 4+6 , "Its me");
//console.warn("This is warning");
//console.error("This is an error");
// java script variables:-
var number1 = 34;
var number2 = 32;
// console.log(number2+number2);

// 4. Data types in java script:-
//String
var str1 = "This is a string";
// number
var num1 = 345;

// objects
var marks = {
    ravi: 34,
    shubham: 78,
    Deepak: 23.4
}
// console.log(marks);

//Boolean
var a = true;
var b = false;
// console.log(a,b); 
// undifine
var und = undefined;
// console.log(undefined);

//Null:-
var n = null;
// console.log(n);

// At very high level, there are two types in javaScript
// 1. Primitive data types: undefined, null, number, string, boolean , Symbol
// 2. Reference data types:- Arrays and objects;

// Array
var arr = [1, 2, 3, 4, 5];
// console.log(arr);


// FUNCTION  : --
function avg(a, b) {
    return (a + b) / 2;
}

C = avg(4, 6);
// console.log(C);

// conditionas in java scripts ..:---
// var age =34;
// if (age >18){
//     console.log("You are younge youth .")
// }
// else{
//     comsole.log ("You are not young youth")
// }

// Loop in java script:---
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (var i = 0; i < arr.length; i++) {
    if(i==4){
        // break;
        continue;
    }
    // console.log(arr[i]);
}

// arr.forEach(function(element){
//     console.log(element)
// })

//  let j =0;
// while(j<arr.length){
//     console.log(arr[i]);
//     j ++;
// }
// do{
//     console.log(arr[i]);
//     j++;
// }while(j < arr.length);

// let myArr = ["Fan","Bus","car","Truck", 34, null];
// //Array method
// console.log(myArr.length);
// // myArr.pop();
// // myArr.push("Deepak");
// // myArr.shift();
// console.log(myArr.unshift("prajwal"));//It print the array lengthes 

// console.log(myArr);

// String method in java script
let myLovelyString = "Deepak is a good good boys";
//console.log(myLovelyString.length);
// console.log(myLovelyString.indexOf("good"));
// console.log(myLovelyString.lastIndexOf("good"));

// console.log(myLovelyString.slice(0,6));
// console.log(myLovelyString.replace("Deepak", "Shubham"));

let myDate = new Date();
// console.log(myDate);
// console.log(myDate.getHours());
// console.log(myDate.getFullYear());

//Document object Model? DOM manuplaction :-----
let elem = document.getElementById('click');
// console.log(elem);
let elemClass = document.getElementsByClassName("container");
console.log(elemClass);
// elemClass[0].style.background="yellow";
elemClass[0].classList.add("bg-primary");
elemClass[0].classList.add("text-success")
// console.log(elemClass[0].innerText);

tn = document.getElementsByTagNameNS('button');
console.log(tn)
createdElement=document.createdElement('p');
createdElement.innerText = "This is a created paragraph";
tn[0].appendChild(createdElement);
 