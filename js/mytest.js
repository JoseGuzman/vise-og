/*
* mytest.j
* Author: Jose Guzman
* 
* Handles data submission from a POST to replace it with a JavaScript handler
* that will submit the post data and update the user interface. We post the form
* data to APT Gateway and use asynchronous JavaScript (AJAX) to provide feedback
* dinamically on the front end.
* 
* see detailed explanation here:
* https://medium.com/@jbesw/forms-without-servers-handling-form-submissions-with-lambda-4df9ec5fc473
*/
console.log("loading script");
const form = document.querySelector("form");
const testform = document.querySelector("form[name=testForm");
const endPoint = "https://wv0upi7zj7.execute-api.eu-central-1.amazonaws.com/default/myTest";


/*
* logData(event) 
* print events logs in JavaScript console
*/
async function logData(event){
    event.preventDefault(); // prevent refreshing the page 
    const {name, email, message} = event.target;

    let data = {
        name: name.value,
        email: email.value,
        message: message.value
    };
    console.log('Form sending: ', JSON.stringify(data)); 
    

}

testform.addEventListener("submit", logData);

button.addEventListener("click", getData);



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
    //xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    // Send the collected data as JSON string
    xhr.send(JSON.stringify(data));

    const submitResponse = document.getElementById("output_text");
    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            submitResponse.innerHTML = 'Form submitted successfully!';
            console.log(response)
        } else {
            submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response.target.response).message);
            }
    };
    //fetch(endPoint, requestOptions)
    //.then((response) => {
    //    console.log('respose->', response)
    //    if (!response.ok) throw new Error("Error in fetch");
    //    return response.json();
    //})
    //.then((response) => {
    //    form.reset();
    //    document.getElementById("output_text").innerText = "Email sent successfully!";
    //})
    //.catch((error) => {
    //    document.getElementById("output_text").innerText ="An unkown error occured.";
    //};

});

/*form.onsubmit = event => {
    console.log('sencontact running');
    //var name = document.getElementById("name").value;
    //var email = document.getElementById("email").value;
    //var message = document.getElementById("message").value;


};
//const submitResponse = document.querySelector('#response');
// const formURL = 'https:// << ENTER YOUR API ENDPOINT HERE >> /Prod/submitForm'; 
//const formURL = "https://wv0upi7zj7.execute-api.eu-central-1.amazonaws.com/default/myTest";

//form.onsubmit = event => {
//   event.preventDefault(); // prevent POST action cause there's no webserver
//    const {email, name, message} = event.target;
//    console.log('Name', name.value )

    // Capture form data and create JSON object
    //let data = {};
    //Array.from(form).map(input => (data[input.id] = input.value));
    //console.log('Form sending: ', JSON.stringify(data)); 
    //submitResponse.innerHTML = 'Message sent!' // display user feedback before start 

    // Create the AJAX request (permit interact directly with user) //var xhr = new XMLHttpRequest(); // handle to send to API endpoint //xhr.open(form.method, formURL, true);
    //xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON string
    //xhr.send(JSON.stringify(data));

    /*xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            submitResponse.innerHTML = 'Form submitted successfully!';
        } else {
            submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
            }
    };*/

//};