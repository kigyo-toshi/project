let submitted = false;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const hiddenIframe = document.getElementById("hidden_iframe");

    if (!form || !hiddenIframe) {
        return;
    }

    console.log("[contact-form] debug hooks initialized", {
        action: form.action,
        target: form.target,
        iframeName: hiddenIframe.name,
    });

    form.addEventListener("submit", () => {
        submitted = true;
        console.log("[contact-form] submit event fired", {
            submitted,
            action: form.action,
            method: form.method,
            target: form.target,
        });
    });

    hiddenIframe.addEventListener("load", () => {
        console.log("[contact-form] hidden iframe load event fired", {
            submitted,
            iframeSrc: hiddenIframe.src,
        });

        if (!submitted) {
            console.log("[contact-form] load ignored because submit flag is false");
            return;
        }

        submitted = false;
        console.log("[contact-form] redirecting to thank-you page");
        window.location.href = "contact-thankyou.html";
    });
});