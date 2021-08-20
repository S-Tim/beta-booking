import {BOOKING_MODEL_KEYS} from "../model/booking_model.js";

function saveOptions(e) {
    const model = buildModel();

    browser.storage.local.set(model).then(() => showSaveSuccessfulAlert());
    e.preventDefault();
}

function restoreOptions() {
    const gettingItem = browser.storage.local.get(BOOKING_MODEL_KEYS);
    gettingItem.then((res) => {
        document.querySelector("#firstname").value = res.firstname || '';
        document.querySelector("#lastname").value = res.lastname || '';
        document.querySelector("#dateOfBirth").value = res.dateOfBirth || '';
        document.querySelector("#street").value = res.street || '';
        document.querySelector("#postal-code").value = res.postalCode || '';
        document.querySelector("#city").value = res.city || '';
        document.querySelector("#mobile").value = res.mobile || '';
        document.querySelector("#email").value = res.email || '';
        document.querySelector("#card-number").value = res.cardNumber || '';

        document.querySelector("#firstnameParticipant2").value = res.firstnameParticipant2 || '';
        document.querySelector("#lastnameParticipant2").value = res.lastnameParticipant2 || '';
        document.querySelector("#dateOfBirthParticipant2").value = res.dateOfBirthParticipant2 || '';
        document.querySelector("#emailParticipant2").value = res.emailParticipant2 || '';
        document.querySelector("#card-numberParticipant2").value = res.cardNumberParticipant2 || '';

        document.querySelector("#firstnameParticipant3").value = res.firstnameParticipant3 || '';
        document.querySelector("#lastnameParticipant3").value = res.lastnameParticipant3 || '';
        document.querySelector("#dateOfBirthParticipant3").value = res.dateOfBirthParticipant3 || '';
        document.querySelector("#emailParticipant3").value = res.emailParticipant3 || '';
        document.querySelector("#card-numberParticipant3").value = res.cardNumberParticipant3 || '';
    });
}

function buildModel() {
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const dateOfBirth = document.querySelector("#dateOfBirth").value;
    const street = document.querySelector("#street").value;
    const postalCode = document.querySelector("#postal-code").value;
    const city = document.querySelector("#city").value;
    const mobile = document.querySelector("#mobile").value;
    const email = document.querySelector("#email").value;
    const cardNumber = document.querySelector("#card-number").value;

    const firstnameParticipant2 = document.querySelector("#firstnameParticipant2").value;
    const lastnameParticipant2 = document.querySelector("#lastnameParticipant2").value;
    const dateOfBirthParticipant2 = document.querySelector("#dateOfBirthParticipant2").value;
    const emailParticipant2 = document.querySelector("#emailParticipant2").value;
    const cardNumberParticipant2 = document.querySelector("#card-numberParticipant2").value;

    const firstnameParticipant3 = document.querySelector("#firstnameParticipant3").value;
    const lastnameParticipant3 = document.querySelector("#lastnameParticipant3").value;
    const dateOfBirthParticipant3 = document.querySelector("#dateOfBirthParticipant3").value;
    const emailParticipant3 = document.querySelector("#emailParticipant3").value;
    const cardNumberParticipant3 = document.querySelector("#card-numberParticipant3").value;

    return {
        firstname,
        lastname,
        dateOfBirth,
        street,
        postalCode,
        city,
        mobile,
        email,
        cardNumber,
        firstnameParticipant2,
        lastnameParticipant2,
        dateOfBirthParticipant2,
        emailParticipant2,
        cardNumberParticipant2,
        firstnameParticipant3,
        lastnameParticipant3,
        dateOfBirthParticipant3,
        emailParticipant3,
        cardNumberParticipant3
    };
}

function showSaveSuccessfulAlert() {
    const alert = document.getElementById('saved-alert');
    alert.classList.remove('d-none')
    setTimeout(() => alert.classList.add('d-none'), 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
