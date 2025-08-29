import {markActiveNav, updateBasketCount} from "./helper.js";
import {products} from "/data/products.js";
import {renderProductGrid} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    markActiveNav();
    updateBasketCount();

    const grid = document.getElementById("product-grid");

    renderProductGrid(products, grid);

    // Add to basket
    grid.addEventListener("click", e => {
        if (e.target.classList.contains("add-to-basket")) {
            const id = parseInt(e.target.dataset.id);

            const product = products.find(p => p.id === id);

            if (product) {
                let basket = JSON.parse(localStorage.getItem("basket")) || [];

                const existing = basket.find(i => i.id === id);

                if (existing) {
                    alert("این محصول قبلاً به سبد اضافه شده است ❗");
                } else {
                    basket.push({...product, qty: 1});
                    localStorage.setItem("basket", JSON.stringify(basket));
                    updateBasketCount();
                    alert("محصول به سبد اضافه شد ✔️");
                }
            }
        }
    });


});
