let submitted = false;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form.c-form[target='hidden_iframe']");
    const hiddenIframe = document.getElementById("hidden_iframe");

    if (!form || !hiddenIframe) {
        return;
    }

    form.addEventListener("submit", () => {
        submitted = true;
    });

    hiddenIframe.addEventListener("load", () => {
        if (!submitted) {
            return;
        }

        submitted = false;
        window.location.href = "contact-thankyou.html";
    });
});