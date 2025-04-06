
const row_1_checkbox = document.querySelector(".row_1_checkbox");
const row_2_checkbox = document.querySelector(".row_2_checkbox");
const row_3_checkbox = document.querySelector(".row_3_checkbox");
const row_4_checkbox = document.querySelector(".row_4_checkbox");

const submit_btn = document.querySelector(".submit_btn");

let taking_board_exam = document.querySelector(".taking_board_exam");
let job_application = document.querySelector(".job_application");
let school_admission_and_transferes = document.querySelector(".school_admission_and_transferes");
let others = document.querySelector(".others");

const form = document.querySelector("form");

let checkBoxes = [row_1_checkbox, row_2_checkbox, row_3_checkbox, row_4_checkbox];
let inputs = [taking_board_exam, job_application, school_admission_and_transferes, others];
let valuesForInputs = [];


document.addEventListener("DOMContentLoaded", function(e){
    check();
});


function check() {

    for(let i = 0; i < inputs.length - 1; i++) {
        checkBoxes[i].addEventListener("change", function(e){
            if(checkBoxes[i].checked) {
                valuesForInputs.push(inputs[i].value);
            } else {
                valuesForInputs.splice(i, 1);
            }
        });
    }

    checkBoxes[3].addEventListener("change", function(e){
        if(checkBoxes[3].checked) {
            inputs[3].disabled = false;
            inputs[3].required = true;
        } else {
            inputs[3].disabled = true;
            inputs[3].required = false;
        }
    });


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
            if(i == 0) {
                if(valuesForInputs[i] !== undefined && valuesForInputs[i].trim() !== "") {
                    purpose += `${valuesForInputs[i]}`;
                }
            } else {
                if(valuesForInputs[i] !== undefined && valuesForInputs[i].trim() !== "") {
                    purpose += `, ${valuesForInputs[i]}`;
                }
            }
        }

        if(others.value) {
            if(purpose.trim() !== "") {
                purpose += ", " + others.value;
            } else {
                purpose += others.value;
            }
        }


        const text =    `
                        Dear Sir/Mam,<br>
                        I hope this email finds you well. My name is ${fullname}, a ${course} student at Panpacific University. I am writing to kindly request a Good Moral Certificate for ${purpose}.

                        Below are my personal details:<br>

                        Full Name: ${fullname}<br>

                        Student ID: ${studentId}<br>

                        Course and Year Level: ${course}<br>

                        Contact Number: ${contactNumber}<br>

                        Email Address: ${email}<br>

                        I would greatly appreciate it if you could issue the certificate at your earliest convenience.<br>

                        Thank you very much for your time and consideration. Should you need any further information, please feel free to contact me.<br><br>

                        Best regards,<br>
                        ${fullname}<br>
                        ${contactNumber}<br>
                        ${email}

                        `;
        const payload = {
            sender_name: fullname,
            body: text
        };

        submit_btn.disabled = true;
        submit_btn.textContent = "Sending...";
        submit_btn.style.pointerEvents = 'none';
        
        fetch("http://localhost/CSS/send_email_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((val) =>  {

            window.alert(val);
            submit_btn.disabled = false;
            submit_btn.textContent = "Submit";
            submit_btn.style.pointerEvents = 'auto';

            for(let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }

            checkBoxes[3].value = "";

        })
        .catch((err) =>  {

            console.error(err);
            submit_btn.disabled = false;
            submit_btn.textContent = "Submit";
            submit_btn.pointerEvents = 'auto';
            
        });

    } 
    
});