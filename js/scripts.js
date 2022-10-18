/*
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
console.log("loading scripts.js");
const form = document.querySelector("form");
const endPoint = 'https://17fkopracb.execute-api.eu-central-1.amazonaws.com/default/SendContactForm'
//const endPoint = 'https://6v9qsgq7g0.execute-api.eu-central-1.amazonaws.com/default/myTest';

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
    //xhr.setRequestHeader('Accept', 'application/json; charset=UTF-8');
    //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON in html  
    xhr.send(JSON.stringify(data));
    console.log('Form sending: ', JSON.stringify(data)); 

    // Update the component in the HTML form
    const formResponse = document.getElementById("lambda_text");
    xhr.onloadend = response => {
        if (response.target.status === 200) {
            form.reset();
            formResponse.innerHTML = `Thank you ${data.name}, your ${xhr.responseText}`;
        } else {
            formResponse.innerHTML = "Error! Please try again.";
            //var error = JSON.parse(response.target)
            //console.error(JSON.parse( response.target.response) );
            //console.error(JSON.parse(response.target.response).message);
        }

        console.log('AWS lambda response:', xhr.responseText);
    };
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
