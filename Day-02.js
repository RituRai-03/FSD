// //callback function 

// function hello(n1,n2,cb){
//     console.log("Hello World");
    
//     cb();
// }


// let a=10;
// let b=20;
// console.log(hello(a,b,sayHi));
// console.log(hello(a,b,sayHello));
// console.log(hello(a,b,function(){
//     console.log("callback is calling");
// }));
// function sayHi(){
//     console.log("callback function");


// }
// sayHi();
// function sayHello(){
//     console.log("this is 2nd callback function");
// }
// sayHello();

//Promise

const promiseOne = new Promise((resolve, reject) => {
   console.log("Successfull data passed.....");
});

promiseOne.then(result => {
    console.log(result);
});
