/*
mytest.j
Author: Jose Guzman

Handles data submission from contact form  

*/
const form = document.querySelector('form');

//const submitResponse = document.querySelector('#response');
const submitResponse = document.getElementById('response');
const formURL = 'https:// << ENTER YOUR API ENDPOINT HERE >> /Prod/submitForm';

form.onsubmit = event => {
    event.preventDefault(); // prevent POST action cause there's no webserver

    // Capture form data
    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log('Sending: ', JSON.stringify(data)); 
    submitResponse.innerHTML = 'Sending...' // CHECK!

    // Create the AJAX request
    var xhr = new XMLHttpRequest();
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