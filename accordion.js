document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-btn").forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
});
