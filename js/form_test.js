/*
* form_test.js
* Author: Jose Guzman
* 
* Handles data submission from a POST to replace it with a JavaScript handler
* that will submit the post data and update the user interface. We post the form
* data to the API Gateway and use asynchronous JavaScript (AJAX) to provide feedback
* dinamically on the front end.
* 
* see detailed explanation here:
* Resources:
* 1. Cloudlogs https://www.youtube.com/watch?v=vgl9q5Ox5LE
* https://medium.com/@jbesw/forms-without-servers-handling-form-submissions-with-lambda-4df9ec5fc473
*/

console.log("loading form_test.js");
const form = document.querySelector("form");
const endPoint = 'https://6v9qsgq7g0.execute-api.eu-central-1.amazonaws.com/default/myTest';
//const endPoint = "https://wv0upi7zj7.execute-api.eu-central-1.amazonaws.com/default/myTest";

form.addEventListener("submit", event => {
    event.preventDefault(); // prevent refreshing the page
    const {email, name, message} = event.target;
    
    let data = {
        name: name.value,
        email: email.value,
        message: message.value
    };
    console.log('Form sending: ', JSON.stringify(data)); 

    // Create the AJAX request (permit interact directly with user) 
    var xhr = new XMLHttpRequest(); // handle to send to API endpoint 
    xhr.open("POST", endPoint, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS,POST");
    //xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');

    //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    //xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON string
    xhr.send(JSON.stringify(data));
    //xhr.send("<person><name>Jose</name></person>")

    const formResponse = document.getElementById("lambda_text");
    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            formResponse.innerHTML = 'Form submitted successfully!';
            console.log(response)
        } else {
            formResponse.innerHTML = 'Error! Please try again.';
            console.log(response);
            //console.error(JSON.parse(response.target.response).message);
            }
    };
});
