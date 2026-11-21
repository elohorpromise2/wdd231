"use strict";

/* =========================================
   CHAMBER JOIN PAGE
========================================= */

// Record the date and time when the form loads
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


/* =========================================
   MEMBERSHIP MODALS
========================================= */

// Select all membership buttons
const membershipButtons = document.querySelectorAll(".membership-link");

// Select all membership modals
const membershipModals = document.querySelectorAll(".membership-modal");

// Open the selected modal
membershipButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});


// Close modals using their Close buttons
membershipModals.forEach((modal) => {

    const closeButton = modal.querySelector(".close-modal");

    if (closeButton) {

        closeButton.addEventListener("click", () => {
            modal.close();
        });

    }

});