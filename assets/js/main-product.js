import {products} from "/data/products.js";
import {updateBasketCount, setYear} from "./helper.js";
import {renderProductGrid} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    updateBasketCount();
    setYear();

    const params = new URLSearchParams(window.location.search);
    const shortName = params.get("shortName");
    const product = products.find(p => p.shortName === shortName);

    const container = document.getElementById("product-details");

    if (!product) {
        container.innerHTML = `<p>❌ محصول یافت نشد</p>`;
        return;
    }

    // Main img
    const mainImage = product.images[0];

    container.innerHTML = `
    <div class="product-details-grid">
      <div class="product-info">
        <h1>${product.title}</h1>
        <p class="price">${product.price.toLocaleString("fa-IR")} تومان</p>
        <p class="desc">${product.description || "توضیحات موجود نیست."}</p>
        <button class="add-to-basket" data-id="${product.id}">افزودن به سبد خرید 🛒</button>
      </div>
      <div class="product-gallery">
        <div class="product-image">
          <img id="main-image" src="${mainImage}" alt="${product.title}">
        </div>
        <div class="product-thumbs">
          ${product.images.map(img => `
            <img src="${img}" class="thumb" alt="thumbnail">
          `).join("")}
        </div>
      </div>
    </div>
  `;

    // gallery
    const mainImgEl = document.getElementById("main-image");

    container.querySelectorAll(".thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
            mainImgEl.src = thumb.src;
        });
    });

    // Add to basket
    container.querySelector(".add-to-basket").addEventListener("click", () => {
        let basket = JSON.parse(localStorage.getItem("basket")) || [];
        const existing = basket.find(i => i.id === product.id);

        if (existing) {
            alert("این محصول قبلاً به سبد اضافه شده است ❗");
        } else {
            basket.push({...product, qty: 1});
            localStorage.setItem("basket", JSON.stringify(basket));
            updateBasketCount();
            alert("محصول به سبد اضافه شد ✔️");
        }
    });


    const grid = document.getElementById("product-grid");

    const relatedProduct = products.filter(i => i.id !== product.id);

    renderProductGrid(relatedProduct.splice(0, 4), grid);

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
