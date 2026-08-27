document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const hiddenIframe = document.getElementById("hidden_iframe");
    const status = document.getElementById("form-status");
    const submitButton = form?.querySelector('button[type="submit"]');
    let submitted = false;

    if (!form || !hiddenIframe) {
        return;
    }

    form.addEventListener("submit", () => {
        submitted = true;
        if (submitButton) submitButton.disabled = true;
        if (status) status.textContent = "送信しています…";
    });

    hiddenIframe.addEventListener("load", () => {
        if (!submitted) {
            return;
        }

        window.location.href = "contact-thankyou.html";
    });
});
