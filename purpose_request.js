
const row_1_checkbox = document.querySelector(".row_1_checkbox");
const row_2_checkbox = document.querySelector(".row_2_checkbox");
const row_3_checkbox = document.querySelector(".row_3_checkbox");
const row_4_checkbox = document.querySelector(".row_4_checkbox");

let taking_board_exam = document.querySelector(".taking_board_exam");
let job_application = document.querySelector(".job_application");
let school_admission_and_transferes = document.querySelector(".school_admission_and_transferes");
let others = document.querySelector(".others");

const form = document.querySelector("form");

let checkBoxes = [row_1_checkbox, row_2_checkbox, row_3_checkbox, row_4_checkbox];
let inputs = [taking_board_exam, job_application, school_admission_and_transferes, others];

document.addEventListener("DOMContentLoaded", function(e){
    check();
});


function check() {
    for(let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener("change", function(e){
            if(checkBoxes[i].checked) {
                inputs[i].disabled = false;
                inputs[i].required = true;
            } else {
                inputs[i].disabled = true;
                inputs[i].required = false;
            }
        });
    }
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const response = window.confirm("Do you want to confirm?");

    if(response) {

        const fullname = `${sessionStorage.getItem("fname")} ${sessionStorage.getItem("mname")}. ${sessionStorage.getItem("lname")}`;
        const course = sessionStorage.getItem("course");
        const studentId = sessionStorage.getItem("id");
        const contactNumber = sessionStorage.getItem("contact_number");
        const email = sessionStorage.getItem("email");
        let purpose = "";

        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].value) {
                purpose += `, ${inputs[i].value}`;
            }
        }

        console.log(purpose);

        const text =    `
                        Dear ${fullname},

                        I hope this email finds you well. My name is ${fullname}, a ${course} student at Panpacific University. I am writing to kindly request a Good Moral Certificate for ${taking_board_exam.value}.

                        Below are my personal details:

                        Full Name: Steven John A. Agustin

                        Student ID: 1231377

                        Course and Year Level: BSIT-2

                        Contact Number: 09481239328

                        Email Address: stevenxd81@yahoo.com

                        I would greatly appreciate it if you could issue the certificate at your earliest convenience.

                        Thank you very much for your time and consideration. Should you need any further information, please feel free to contact me.

                        Best regards,
                        Steven John A. Agustin
                        [Your Contact Number]
                        [Your Email Address]

                        `;

    } 
    
});