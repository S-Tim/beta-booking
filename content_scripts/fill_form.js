(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;


    /**
     * Fills the booking form with the values from  the storage
     */
    function fillForm(bookingDetails) {
        let tariffDropdown = document.getElementsByClassName('drp-course-booking-tariff-select')[0].firstChild;
        tariffDropdown.selectedIndex = findOptionIndex(tariffDropdown, 'Jahres');
        tariffDropdown.dispatchEvent(new MouseEvent('change'));
        tariffDropdown.dispatchEvent(new InputEvent('input'));

        setTimeout(() => {
            fillCardNumber(bookingDetails.cardNumber);
            fillFirstName(bookingDetails.firstname);
            fillLastname(bookingDetails.lastname);
            fillDateOfBirth(bookingDetails.dateOfBirth);
            fillStreet(bookingDetails.street);
            fillPostalCode(bookingDetails.postalCode);
            fillCity(bookingDetails.city);
            fillMobile(bookingDetails.mobile);
            fillMail(bookingDetails.email);

            document.getElementById('drp-course-booking-client-terms-cb').checked = true;
            document.getElementById('drp-course-booking-data-processing-cb').checked = true;
        }, 250);

        if (bookingDetails.firstnameParticipant2) {
            setTimeout(() => {
                fillAdditionalParticipant(
                    bookingDetails.firstnameParticipant2,
                    bookingDetails.lastnameParticipant2,
                    bookingDetails.dateOfBirthParticipant2,
                    bookingDetails.emailParticipant2,
                    bookingDetails.cardNumberParticipant2);
            }, 500);
        }

        if (bookingDetails.firstnameParticipant3) {
            setTimeout(() => {
                fillAdditionalParticipant(
                    bookingDetails.firstnameParticipant3,
                    bookingDetails.lastnameParticipant3,
                    bookingDetails.dateOfBirthParticipant3,
                    bookingDetails.emailParticipant3,
                    bookingDetails.cardNumberParticipant3);
            }, 1000);
        }
    }

    const fillCardNumber = value => fillElement(() => document.querySelectorAll('[placeholder="Kartennummer*"]')[0], value);
    const fillFirstName = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking given-name"]')[0], value);
    const fillLastname = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking family-name"]')[0], value);
    const fillDateOfBirth = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking bday"]')[0], value);
    const fillStreet = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking street-address"]')[0], value);
    const fillPostalCode = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking postal-code"]')[0], value);
    const fillCity = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking address-level2"]')[0], value);
    const fillMobile = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking mobile tel"]')[0], value);
    const fillMail = value => fillElement(() => document.querySelectorAll('[autocomplete="section-booking email"]')[0], value);

    function fillAdditionalParticipant(firstname, lastname, dateOfBirth, email, cardNumber) {
        // If there is no free slot for an additional participant then don't fill
        let maximumNumberOfParticipantsReached = !!document.getElementsByClassName('drp-course-booking-reached-max-participant-count')[0];
        if (maximumNumberOfParticipantsReached) {
            return;
        }

        let addParticipantButton = document.getElementsByClassName('drp-course-booking-add-participant')[0];
        addParticipantButton.click();

        setTimeout(() => {
            let participantList = document.getElementsByClassName('drp-course-booking-participant-item');
            let lastParticipant = participantList[participantList.length - 1];

            let tariffDropdown = lastParticipant.getElementsByClassName('drp-course-booking-tariff-select')[0].firstChild;
            tariffDropdown.selectedIndex = findOptionIndex(tariffDropdown, 'Jahres');
            tariffDropdown.dispatchEvent(new MouseEvent('change'));
            tariffDropdown.dispatchEvent(new InputEvent('input'));

            setTimeout(() => {
                fillElement(() => lastParticipant.querySelectorAll('[placeholder="Kartennummer*"]')[0], cardNumber);
                fillElement(() => lastParticipant.querySelectorAll('[autocomplete*="given-name"]')[0], firstname);
                fillElement(() => lastParticipant.querySelectorAll('[autocomplete*="family-name"]')[0], lastname);
                fillElement(() => lastParticipant.querySelectorAll('[autocomplete*="bday"]')[0], dateOfBirth);
                fillElement(() => lastParticipant.querySelectorAll('[autocomplete*="email"]')[0], email);
            }, 250);
        }, 250);

    }

    function fillElement(supplier, value) {
        const element = supplier();
        element.value = value || '';
        element.dispatchEvent(new InputEvent('input'));
    }

    /**
     * Returns the index of the first option item that contains the given partial value or -1 if not found
     * @param dropdown the select element of which the options are considered
     * @param partialValue a string value that is part of (or exactly) the desired option
     */
    function findOptionIndex(dropdown, partialValue) {
        for (let i = 0; i < dropdown.options.length; i++) {
            let optionLabel = dropdown.options[i].label;
            if (optionLabel.includes(partialValue)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "fillForm") {
            fillForm(message.bookingDetails);
        }
    });

})();
