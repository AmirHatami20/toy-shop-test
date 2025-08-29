export function renderProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const image = product.images[0];

    card.innerHTML = `
        <img class="product-img" src="${image}" alt="${product.title}">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${product.price.toLocaleString("fa-IR")}
            تومان
        </p>
        <button class="add-to-basket" data-id="${product.id}">
            افزودن به سبد
        </button>
        <p class="product-link">
            اطلاعات محصول
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
        </p>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("product-img") || e.target.classList.contains("product-link")) {
            window.location.href = `product.html?shortName=${product.shortName}`;
        }
    });

    return card;
}

export function renderProductGrid(products, container) {
    container.innerHTML = "";
    products.forEach(p => container.appendChild(renderProductCard(p)));
}

export function renderBasket(basket, basketProductsEl, saveBasket, updateSummary) {
    basketProductsEl.innerHTML = "";

    if (basket.length === 0) {
        basketProductsEl.innerHTML = `
            <div class="empty-basket">
                <span>سبد خرید شما خالی است.</span>
                <a href="index.html">
                    <button class="btn-primary">
                        صفحه اصلی
                    </button>
                </a>
            </div>
        `;
    }

    basket.forEach((item, index) => {
        const card = document.createElement("div");
        const image = item.images[0];
        card.className = "product-basket-card";
        card.innerHTML = `
            <img src="${image}" alt="${item.title}">
            <div class="product-info">
                <h3>${item.title}</h3>
                <p>${item.price.toLocaleString("fa-IR")} تومان</p>
            </div>
            <div class="product-actions">
                <button class="decrease">-</button>
                <span>${item.qty}</span>
                <button class="increase">+</button>
                <button class="remove">❌</button>
            </div>
        `;

        card.querySelector(".increase").addEventListener("click", () => {
            item.qty++;
            saveBasket();
        });

        card.querySelector(".decrease").addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty--;
            } else {
                basket.splice(index, 1);
            }
            saveBasket();
        });

        card.querySelector(".remove").addEventListener("click", () => {
            basket.splice(index, 1);
            saveBasket();
        });

        basketProductsEl.appendChild(card);
    });

    updateSummary();
}

