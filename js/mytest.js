/*
mytest.j
Author: Jose Guzman

Handles data submission from contact form  
see detailed explanation here:
https://medium.com/@jbesw/forms-without-servers-handling-form-submissions-with-lambda-4df9ec5fc473

*/
const form = document.querySelector('form');

const submitResponse = document.querySelector('#response');
const formURL = 'https:// << ENTER YOUR API ENDPOINT HERE >> /Prod/submitForm';

form.onsubmit = event => {
    event.preventDefault(); // prevent POST action cause there's no webserver

    // Capture form data and create JSON object
    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log('Sending: ', JSON.stringify(data)); 
    submitResponse.innerHTML = 'Sending...' // display user feedback before start 

    // Create the AJAX request (permit interact directly with user)
    var xhr = new XMLHttpRequest(); // handle to send to API endpoint
    xhr.open(form.method, formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            submitResponse.innerHTML = 'Form submitted. Success!';
        } else {
            submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
            }
    };
};