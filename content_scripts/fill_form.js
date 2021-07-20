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
