

const fname = document.getElementById("fname");
const mname = document.getElementById("mname");
const lname = document.getElementById("lname");
const course = document.getElementById("course");
const id = document.getElementById("id");
const contact_number = document.getElementById("contact_number");
const email = document.getElementById("email");

const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", function(e) {
    validateInputs();
});



form.addEventListener("submit", function(e) {

    e.preventDefault();

    const checkInputs = `
                         ~Check the information~\n

                         First Name: ${fname.value}\n
                         Middle Name: ${mname.value}\n
                         Last Name: ${lname.value}\n
                         Course & Year Level: ${course.value}\n
                         Student ID Number: ${id.value}\n
                         Contact Number: ${contact_number.value}\n
                         Email: ${email.value}

                         `;
    
    window.alert(checkInputs);

    const confirmation = window.confirm("Do you want to confirm?");
    

    if(confirmation) {

        sessionStorage.setItem("fname", fname.value);
        sessionStorage.setItem("mname", mname.value);
        sessionStorage.setItem("lname", lname.value);
        sessionStorage.setItem("course", course.value);
        sessionStorage.setItem("id", id.value);
        sessionStorage.setItem("contact_number", contact_number.value);
        sessionStorage.setItem("email", email.value);

        window.location.href = "purpose_request.html";

    } 


});


function validateInputs() {
    id.addEventListener("input", function(e) {
        if(!isFinite(this.value)) {
            this.value = "";
        }
    });
    contact_number.addEventListener("input", function(e) {
        if(!isFinite(this.value)) {
            this.value = "";
        }
    });
}
