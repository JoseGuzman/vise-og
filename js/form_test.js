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
* 
* Key to understand CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
*/

console.log("loading form_test.js");
const form = document.querySelector("form");
const endPoint = 'https://6v9qsgq7g0.execute-api.eu-central-1.amazonaws.com/default/myTest';

form.addEventListener("submit", event => {
    event.preventDefault(); // prevent refreshing the page
    const {email, name, message} = event.target;
    
    let data = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    // Create the AJAX request 
    // Asynchronous JavaScript and XML, need open() and send() calls 
    var xhr = new XMLHttpRequest(); // handle to send to API endpoint 
    xhr.open("POST", endPoint, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON string
    xhr.send(JSON.stringify(data));
    console.log('Form sending: ', JSON.stringify(data)); 
    console.log('lambda response:', xhr.responseText);

    // Update the component in the HTML form
    const formResponse = document.getElementById("lambda_text");
    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            formResponse.innerHTML = "Thank you" + $name + ", your form was submitted successfully!";
        } else {
            formResponse.innerHTML = "Error! Please try again.";
            var error = JSON.parse(response.target)
            //console.error(JSON.parse(response.target.response).message);
        }

        console.log('lambda response', xhr.responseText);
    };
});
