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
        document.getElementsByClassName('drp-course-booking-tariff-select')[0].firstChild.selectedIndex = 5;
        document.getElementsByClassName('drp-course-booking-tariff-select')[0].firstChild.dispatchEvent(new MouseEvent('change'));
        document.getElementsByClassName('drp-course-booking-tariff-select')[0].firstChild.dispatchEvent(new InputEvent('input'));

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
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "fillForm") {
            fillForm(message.bookingDetails);
        }
    });

})();
