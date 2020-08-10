import {BOOKING_MODEL_KEYS} from "../model/booking_model.js";

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Fills the form using the values from the storage
         */
        function fillForm(tabs) {
            const gettingItem = browser.storage.local.get(BOOKING_MODEL_KEYS);
            gettingItem.then((res) => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "fillForm",
                    bookingDetails: res
                }).catch(err => reportError(err));
            });
        }

        /**
         * Open the options page for this add-on to configure the form values
         */
        function openOptionsPage() {
            browser.runtime.openOptionsPage().catch(err => reportError(err))
        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(error);
        }

        /**
         * Get the active tab,
         * then call "fillForm()" or "openOptionsPage()" as appropriate.
         */
        if (e.target["id"] === "fill-form-button") {
            browser.tabs.query({active: true, currentWindow: true})
                .then(fillForm)
                .catch(reportError);
        } else if (e.target["id"] === "options-link") {
            openOptionsPage();
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("d-none");
    document.querySelector("#error-content").classList.remove("d-none");
    console.error(`Failed to execute fill form content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/polyfill/browser-polyfill.js"}).catch(reportExecuteScriptError);
browser.tabs.executeScript({file: "/content_scripts/fill_form.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
