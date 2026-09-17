// ===========================
// MOBILE MENU
// ===========================

const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

// ===========================
// DARK MODE
// ===========================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }
    });
}

// ===========================
// SHOPPING CART
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");

function updateCartCount() {

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

updateCartCount();

const addButtons = document.querySelectorAll(".add-cart-btn");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        updateCartCount();

        alert(product.name + " added to cart");
    });
});

// ===========================
// SCROLL ANIMATION
// ===========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll(".card, .product-card, .stat-card")
.forEach(el => {
    observer.observe(el);
});

// ===========================
// SHOP FILTER
// ===========================

const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        products.forEach(product => {

            if (
                filter === "all" ||
                product.dataset.category === filter
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";
            }

        });

    });

});

// ===========================
// PRODUCT SEARCH
// ===========================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value =
        searchInput.value.toLowerCase();

        document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const productName =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

            if(productName.includes(value)){

                card.style.display = "block";

            }else{

                card.style.display = "none";
            }

        });

    });

}

// ===========================
// CART SIDEBAR
// ===========================

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Open Cart
if(cartBtn && cartSidebar){

    cartBtn.addEventListener("click", () => {

        cartSidebar.classList.add("active");

        renderCart();

    });

}

// Close Cart
if(closeCart){

    closeCart.addEventListener("click", () => {

        cartSidebar.classList.remove("active");

    });

}

// Render Cart
function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML =
        "<p>Your cart is empty.</p>";

        cartTotal.textContent = "TZS 0";

        return;
    }

    cart.forEach((item,index)=>{

        total += item.price;

        const div =
        document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name}</span>

            <div>
                TZS ${item.price.toLocaleString()}

                <button
                onclick="removeItem(${index})">
                ❌
                </button>
            </div>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.textContent =
    "TZS " + total.toLocaleString();

}

// Remove Item
function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();

}