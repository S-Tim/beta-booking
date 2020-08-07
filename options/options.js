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

    return {firstname, lastname, dateOfBirth, street, postalCode, city, mobile, email, cardNumber};
}

function showSaveSuccessfulAlert() {
    const alert = document.getElementById('saved-alert');
    alert.classList.remove('d-none')
    setTimeout(() => alert.classList.add('d-none'), 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
