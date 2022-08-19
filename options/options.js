function saveOptions(e) {
    const data = buildModel();
    console.log('Saving data:', data);

    browser.storage.local.set({data}).then(() => showSaveSuccessfulAlert());
    e.preventDefault();
}

function restoreOptions() {
    const gettingItem = browser.storage.local.get('data');
    gettingItem.then((res) => {
        console.log('Retrieved data:', res);
        let model = res.data;

        setValuedById('firstname', model.firstname);
        setValuedById('lastname', model.lastname);
        setValuedById('dateOfBirth', model.dateOfBirth);
        setValuedById('street', model.street);
        setValuedById('postalCode', model.postalCode);
        setValuedById('city', model.city);
        setValuedById('mobile', model.mobile);
        setValuedById('email', model.email);
        setValuedById('cardNumber', model.cardNumber);

        let participant2 = model.participants[0] || {};
        setValuedById('firstnameParticipant2', participant2.firstname);
        setValuedById('lastnameParticipant2', participant2.lastname);
        setValuedById('dateOfBirthParticipant2', participant2.dateOfBirth);
        setValuedById('emailParticipant2', participant2.email);
        setValuedById('cardNumberParticipant2', participant2.cardNumber);

        let participant3 = model.participants[1] || {};
        setValuedById('firstnameParticipant3', participant3.firstname);
        setValuedById('lastnameParticipant3', participant3.lastname);
        setValuedById('dateOfBirthParticipant3', participant3.dateOfBirth);
        setValuedById('emailParticipant3', participant3.email);
        setValuedById('cardNumberParticipant3', participant3.cardNumber);
    });
}

function buildModel() {
    const firstname = getValueById('firstname');
    const lastname = getValueById('lastname');
    const dateOfBirth = getValueById('dateOfBirth');
    const street = getValueById('street');
    const postalCode = getValueById('postalCode');
    const city = getValueById('city');
    const mobile = getValueById('mobile');
    const email = getValueById('email');
    const cardNumber = getValueById('cardNumber');

    const firstnameParticipant2 = getValueById('firstnameParticipant2');
    const lastnameParticipant2 = getValueById('lastnameParticipant2');
    const dateOfBirthParticipant2 = getValueById('dateOfBirthParticipant2');
    const emailParticipant2 = getValueById('emailParticipant2');
    const cardNumberParticipant2 = getValueById('cardNumberParticipant2');

    const firstnameParticipant3 = getValueById('firstnameParticipant3');
    const lastnameParticipant3 = getValueById('lastnameParticipant3');
    const dateOfBirthParticipant3 = getValueById('dateOfBirthParticipant3');
    const emailParticipant3 = getValueById('emailParticipant3');
    const cardNumberParticipant3 = getValueById('cardNumberParticipant3');


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
        participants: [
            {
                firstname: firstnameParticipant2,
                lastname: lastnameParticipant2,
                dateOfBirth: dateOfBirthParticipant2,
                email: emailParticipant2,
                cardNumber: cardNumberParticipant2
            },
            {
                firstname: firstnameParticipant3,
                lastname: lastnameParticipant3,
                dateOfBirth: dateOfBirthParticipant3,
                email: emailParticipant3,
                cardNumber: cardNumberParticipant3
            },
        ],
    };
}

function getValueById(id) {
    return document.querySelector(`#${id}`).value || undefined;
}

function setValuedById(id, value) {
    document.querySelector(`#${id}`).value = value || '';
}

function showSaveSuccessfulAlert() {
    const alert = document.getElementById('saved-alert');
    alert.classList.remove('d-none')
    setTimeout(() => alert.classList.add('d-none'), 2000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
