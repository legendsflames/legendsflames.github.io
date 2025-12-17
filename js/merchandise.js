// Merchandise page specific JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Email notification form handler
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
        notifyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                alert(`Thank you! We'll notify you at ${email} when merchandise becomes available!`);
                emailInput.value = '';
            }
        });
    }
});
