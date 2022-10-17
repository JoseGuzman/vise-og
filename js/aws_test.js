/*
aws_test.js
Author: Jose Guzman

Handles data submission from a button to replace it with a JavaScript handler
that will submit the post data and update the user interface. We post the form
data to APT Gateway and use asynchronous JavaScript (AJAX) to provide feedback
dinamically on the front end.

*/
console.log("loading aws_test.js");
const endPoint = 'https://fuuzzxm0gh.execute-api.eu-central-1.amazonaws.com/default/myAWSbutton'

const button = document.querySelector("button");

/* getData()
run lambda function 
    and prints its output in the field of the document
*/
async function getData(){
    const res = await fetch(endPoint);
    const data = await res.json();

    const message = document.getElementById("output_text");
    message.innerHTMLi = data;
    console.log(data);
}

button.addEventListener("click", getData);
