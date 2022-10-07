/*
* mytest.j
* Author: Jose Guzman
* 
* Handles data submission from a POST to replace it with a JavaScript handler
* that will submit the post data and update the user interface. We post the form
* data to APT Gateway and use asynchronous JavaScript (AJAX) to provide feedback
* dinamically on the front end.

* see detailed explanation here:
* https://medium.com/@jbesw/forms-without-servers-handling-form-submissions-with-lambda-4df9ec5fc473
* 
*/
const form = document.querySelector('form');

const submitResponse = document.querySelector('#response');
const formURL = 'https://ahvjq7cf07.execute-api.eu-central-1.amazonaws.com/default/sendContactEmail';
// const formURL = 'https:// << ENTER YOUR API ENDPOINT HERE >> /Prod/submitForm'; 

form.onsubmit = event => {
    event.preventDefault(); // prevent POST action cause there's no webserver
    const {email, name, message} = event.target;
    // console.log('Name', name.value )

    // Capture form data and create JSON object
    let data = {};
    Array.from(form).map(input => (data[input.id] = input.value));
    console.log('Form sending: ', JSON.stringify(data)); 
    submitResponse.innerHTML = 'Form sending...' // display user feedback before start 

    // Create the AJAX request (permit interact directly with user)
    var xhr = new XMLHttpRequest(); // handle to send to API endpoint
    xhr.open(form.method, formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON string
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            submitResponse.innerHTML = 'Form submitted successfully!' + name.value;
        } else {
            submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
            }
    };
};