/*
* aws_test.js
* Author: Jose Guzman
* 
* Handles data submission from a button to call a lambda function that returns
* a HTTP response with statusCode = 200 and body = 'hello from lambda'. We need and
* API Gateway to call lambda and to provide feedback
* dinamically on the front end.
* 
*/
console.log("loading aws_test.js");
const endPoint = 'https://fuuzzxm0gh.execute-api.eu-central-1.amazonaws.com/default/myAWSbutton'

const mybutton = document.querySelector("button");

/* 
* getData()
* run lambda function and prints its output in the field of the document
*/
async function getData(){
    const res = await fetch(endPoint);
    const data = await res.json();

    const msg_text = document.getElementById("output_text");
    msg_text.innerHTML = data;
    console.log(data);
}

mybutton.addEventListener("click", getData, false);
