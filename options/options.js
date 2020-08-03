function saveOptions(e) {
    const model = buildModel();

    browser.storage.local.set(model);
    e.preventDefault();
}

function restoreOptions() {
    const gettingItem = browser.storage.local.get(getModelKeys());
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

function getModelKeys() {
    return Object.getOwnPropertyNames(buildModel());
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
