export function markActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    const route =
        path.includes("basket") ? "basket" :
            "home";

    document.querySelectorAll(".nav-link").forEach(a => {
        a.classList.toggle("active", a.dataset.route === route);
    });
}

export function updateBasketCount() {
    const el = document.getElementById("basket-count");
    if (!el) return;
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    el.textContent = basket.reduce((sum, it) => sum + (it.qty || 1), 0);
}

export function setYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
}
