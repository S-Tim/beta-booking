function saveOptions(e) {
    const model = buildModel();

    browser.storage.local.set(model);
    e.preventDefault();
}

function restoreOptions() {
    const gettingItem = browser.storage.local.get(getModelKeys());
    gettingItem.then((res) => {
        document.querySelector("#firstname").value = res.firstname || 'Max';
        document.querySelector("#lastname").value = res.lastname || 'Mustermann';
        document.querySelector("#dateOfBirth").value = res.dateOfBirth || '01.01.1970';
        document.querySelector("#street").value = res.street || 'Musterstraße 11';
        document.querySelector("#postal-code").value = res.postalCode || '123456';
        document.querySelector("#city").value = res.city || 'Musterstadt';
        document.querySelector("#mobile").value = res.mobile || '01234567890';
        document.querySelector("#email").value = res.email || 'Max.Mustermann@test';
        document.querySelector("#card-number").value = res.cardNumber || '123456BTA';
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
