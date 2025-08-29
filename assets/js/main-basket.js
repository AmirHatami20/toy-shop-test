import { markActiveNav, updateBasketCount } from "./helper.js";
import { renderBasket } from "./ui.js";

let basket = JSON.parse(localStorage.getItem("basket")) || [];

function updateSummary() {
    let totalQty = 0;
    let totalPrice = 0;

    basket.forEach(item => {
        totalQty += item.qty;
        totalPrice += item.qty * item.price;
    });

    document.getElementById("total-qty").textContent = totalQty;
    document.getElementById("total-price").textContent = totalPrice.toLocaleString("fa-IR");
}

function saveBasket() {
    localStorage.setItem("basket", JSON.stringify(basket));
    renderBasket(basket, document.getElementById("basket-products"), saveBasket, updateSummary);
    updateBasketCount();
}

document.addEventListener("DOMContentLoaded", () => {
    const basketProductsEl = document.getElementById("basket-products");
    const checkoutBtn = document.getElementById("checkout-btn");

    renderBasket(basket, basketProductsEl, saveBasket, updateSummary);
    markActiveNav();
    updateBasketCount();

    checkoutBtn.addEventListener("click", () => {
        if (basket.length === 0) {
            alert("سبد خرید خالیه! ❗");
            return;
        }

        alert("خرید ثبت شد! ✅");
        basket = [];
        saveBasket();
        window.location.href = "basket.html";
    });
});
