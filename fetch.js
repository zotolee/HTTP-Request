//Create Event Listeners
document.getElementById('name').addEventListener('blur', 
validateName);
document.getElementById('zip').addEventListener('blur', 
validateZip);
document.getElementById('email').addEventListener('blur', 
validateEmail);
document.getElementById('phone').addEventListener('blur', 
validatePhone);

function validateName(){
    const name = document.getElementById('name');
    const re = /^[a-zA-Z]{2,10}$/; // name must be within 15 charaters and not more. it can include lower or uppercase too.

    if(!re.test(name.value)){
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }
}
function validateZip() {
    const zip = document.getElementById('zip');
    const re = /^[0-9]{5}(-[0-9]{4})?$/; // zip number must be between 0-9 and not more than 5numbers, if it's going to be more than 5numbers, it must have a - and 4numbers added. not more than 4 numbers orelse it'll be invalid.

    if(!re.test(zip.value)){
        zip.classList.add('is-invalid');
    } else {
        zip.classList.remove('is-invalid');
    }
}
function validateEmail() {
    const email = document.getElementById('email');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]{2,5})$/; // email will work with @ and . 

    if(!re.test(email.value)) {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }
}
function validatePhone() {
    const phone = document.getElementById('phone');
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/; // number will be in either of this formats: 704 103 0858, 704-103-0858 or 704.103.0858 

    if(!re.test(phone.value)){
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }
}