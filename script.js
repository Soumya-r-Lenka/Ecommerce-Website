

const products = [

    {
        id: 1,
        name: "Premium Casual T-Shirt",
        category: "Fashion",
        price: 799,
        oldPrice: 1299,
        rating: 4.8,
        reviews: 124,
        image: "👕",
        sale: 38,
        description:
            "Premium cotton casual t-shirt with a comfortable fit. Perfect for everyday wear."
    },

    {
        id: 2,
        name: "Wireless Noise Cancelling Headphones",
        category: "Electronics",
        price: 2499,
        oldPrice: 4999,
        rating: 4.9,
        reviews: 318,
        image: "🎧",
        sale: 50,
        description:
            "Experience immersive sound with powerful bass and advanced noise cancellation."
    },

    {
        id: 3,
        name: "Urban Running Sneakers",
        category: "Shoes",
        price: 1899,
        oldPrice: 2999,
        rating: 4.7,
        reviews: 206,
        image: "👟",
        sale: 37,
        description:
            "Lightweight running sneakers designed for comfort, performance and everyday style."
    },

    {
        id: 4,
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 3299,
        oldPrice: 5999,
        rating: 4.8,
        reviews: 415,
        image: "⌚",
        sale: 45,
        description:
            "Track your fitness, heart rate, sleep and daily activities with this smart watch."
    },

    {
        id: 5,
        name: "Luxury Skin Care Set",
        category: "Beauty",
        price: 1499,
        oldPrice: 2399,
        rating: 4.6,
        reviews: 152,
        image: "🧴",
        sale: 38,
        description:
            "A complete skincare collection designed to keep your skin fresh and healthy."
    },

    {
        id: 6,
        name: "Classic Leather Backpack",
        category: "Accessories",
        price: 1799,
        oldPrice: 2999,
        rating: 4.8,
        reviews: 98,
        image: "🎒",
        sale: 40,
        description:
            "Elegant and durable backpack suitable for college, office and travel."
    },

    {
        id: 7,
        name: "Minimal Smart Desk Lamp",
        category: "Home",
        price: 999,
        oldPrice: 1699,
        rating: 4.5,
        reviews: 87,
        image: "💡",
        sale: 41,
        description:
            "Modern LED desk lamp with adjustable brightness for study and work."
    },

    {
        id: 8,
        name: "Premium Sunglasses",
        category: "Accessories",
        price: 1199,
        oldPrice: 1999,
        rating: 4.7,
        reviews: 133,
        image: "🕶️",
        sale: 40,
        description:
            "Stylish sunglasses with a premium frame and UV protection."
    },

    {
        id: 9,
        name: "Classic Denim Jacket",
        category: "Fashion",
        price: 2199,
        oldPrice: 3499,
        rating: 4.8,
        reviews: 174,
        image: "🧥",
        sale: 37,
        description:
            "A timeless denim jacket with premium fabric and a modern fit."
    },

    {
        id: 10,
        name: "Wireless Gaming Mouse",
        category: "Electronics",
        price: 1299,
        oldPrice: 2499,
        rating: 4.6,
        reviews: 231,
        image: "🖱️",
        sale: 48,
        description:
            "High precision wireless gaming mouse with ergonomic design."
    },

    {
        id: 11,
        name: "Premium Sports Shoes",
        category: "Shoes",
        price: 2299,
        oldPrice: 3999,
        rating: 4.9,
        reviews: 321,
        image: "🥾",
        sale: 43,
        description:
            "Performance sports shoes with responsive cushioning and breathable material."
    },

    {
        id: 12,
        name: "Modern Home Coffee Maker",
        category: "Home",
        price: 2899,
        oldPrice: 4999,
        rating: 4.7,
        reviews: 114,
        image: "☕",
        sale: 42,
        description:
            "Easy-to-use coffee maker designed for delicious coffee at home."
    }

];


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("shoporaCart")) || [];

let wishlist = JSON.parse(
    localStorage.getItem("shoporaWishlist")
) || [];

let couponApplied = false;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const productContainer =
    document.getElementById("productContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");

const cartSidebar =
    document.getElementById("cartSidebar");

const overlay =
    document.getElementById("overlay");

const productModal =
    document.getElementById("productModal");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(productList = products) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>No products found 😔</h2>
                <p style="color:#777">
                    Try another search.
                </p>
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const isLiked =
            wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <span>${product.image}</span>

                <span class="sale-badge">
                    -${product.sale}%
                </span>

                <button
                    class="wishlist ${isLiked ? "liked" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >
                    <i class="${
                        isLiked
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart"></i>
                </button>

                <button
                    class="quick-view"
                    onclick="quickView(${product.id})"
                >
                    Quick View
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">

                    ${generateStars(product.rating)}

                    <span>
                        (${product.reviews})
                    </span>

                </div>

                <div class="price-row">

                    <div>

                        <span class="product-price">
                            ₹${product.price.toLocaleString()}
                        </span>

                        <span class="old-price">
                            ₹${product.oldPrice.toLocaleString()}
                        </span>

                    </div>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(card);

    });

}


/* =====================================================
   STAR RATING
===================================================== */

function generateStars(rating) {

    let stars = "";

    const rounded =
        Math.round(rating);

    for (let i = 1; i <= 5; i++) {

        if (i <= rounded) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;
}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;


    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} added to cart!`
    );

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "shoporaCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const totalQuantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    cartCount.textContent =
        totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products to see them here.
                </p>

            </div>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">
                    ${item.image}
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <strong>
                        ₹${item.price.toLocaleString()}
                    </strong>

                    <div class="quantity">

                        <button
                            onclick="
                            changeQuantity(
                                ${item.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="
                            changeQuantity(
                                ${item.id},
                                1
                            )"
                        >
                            +
                        </button>

                        <button
                            class="remove-item"
                            onclick="
                            removeFromCart(
                                ${item.id}
                            )"
                        >
                            <i class="
                                fa-solid
                                fa-trash
                            "></i>
                        </button>

                    </div>

                </div>
            `;

            cartItems.appendChild(cartItem);

        });

    }


    calculateTotal();

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            item =>
                item.id === productId
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== productId
            );

    }


    saveCart();

    updateCart();

}


/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    saveCart();

    updateCart();

    showToast(
        "Product removed from cart"
    );

}


/* =====================================================
   CALCULATE TOTAL
===================================================== */

function calculateTotal() {

    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    let shipping = 0;

    if (subtotal > 0 && subtotal < 999) {

        shipping = 79;

    }


    let discount = 0;

    if (couponApplied) {

        discount =
            Math.round(
                subtotal * 0.10
            );

    }


    const total =
        subtotal +
        shipping -
        discount;


    document.getElementById(
        "subtotal"
    ).textContent =
        `₹${subtotal.toLocaleString()}`;


    document.getElementById(
        "shipping"
    ).textContent =
        shipping === 0
        ? "FREE"
        : `₹${shipping}`;


    document.getElementById(
        "discount"
    ).textContent =
        `-₹${discount.toLocaleString()}`;


    document.getElementById(
        "total"
    ).textContent =
        `₹${total.toLocaleString()}`;

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartSidebar.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    cartSidebar.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(productId) {

    if (
        wishlist.includes(productId)
    ) {

        wishlist =
            wishlist.filter(
                id =>
                    id !== productId
            );

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(productId);

        showToast(
            "Added to wishlist ❤️"
        );

    }


    localStorage.setItem(
        "shoporaWishlist",
        JSON.stringify(wishlist)
    );


    wishlistCount.textContent =
        wishlist.length;


    displayProducts(
        getCurrentProducts()
    );

}


/* =====================================================
   CURRENT PRODUCT LIST
===================================================== */

let currentCategory = "All";

function getCurrentProducts() {

    if (currentCategory === "All") {

        return products;

    }

    return products.filter(
        product =>
            product.category ===
            currentCategory
    );

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category) {

    currentCategory =
        category;


    const buttons =
        document.querySelectorAll(
            ".filter"
        );


    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );

        if (
            button.textContent
                .trim()
                .toLowerCase() ===
            category.toLowerCase()
        ) {

            button.classList.add(
                "active"
            );

        }

    });


    displayProducts(
        getCurrentProducts()
    );


    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const query =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.category
                .toLowerCase()
                .includes(query)

        );


    currentCategory = "Search";

    displayProducts(filtered);

    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   SEARCH ENTER KEY
===================================================== */

document
    .getElementById("searchInput")
    .addEventListener(
        "keyup",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                searchProducts();

            }

        }
    );


/* =====================================================
   QUICK VIEW
===================================================== */

function quickView(productId) {

    const product =
        products.find(
            p =>
                p.id === productId
        );

    if (!product) return;


    const modalContent =
        document.getElementById(
            "modalContent"
        );


    modalContent.innerHTML = `

        <div class="modal-product">

            <div class="modal-image">
                ${product.image}
            </div>

            <div class="modal-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <div class="rating">

                    ${generateStars(
                        product.rating
                    )}

                    <span>
                        ${product.rating}
                        (${product.reviews} reviews)
                    </span>

                </div>

                <div class="modal-price">
                    ₹${product.price.toLocaleString()}
                </div>

                <p>
                    ${product.description}
                </p>

                <button
                    class="modal-add"
                    onclick="
                    addToCart(${product.id});
                    closeModal();
                    "
                >
                    <i class="
                        fa-solid
                        fa-cart-plus
                    "></i>

                    Add To Cart
                </button>

            </div>

        </div>
    `;


    productModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    productModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   COUPON
===================================================== */

function applyCoupon() {

    const input =
        document.getElementById(
            "couponInput"
        );

    const code =
        input.value
            .trim()
            .toUpperCase();


    if (code === "SHOP10") {

        couponApplied = true;

        calculateTotal();

        showToast(
            "Coupon applied! 10% discount 🎉"
        );

    } else {

        showToast(
            "Invalid coupon code"
        );

    }

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty!"
        );

        return;

    }


    showToast(
        "Checkout feature is ready for backend integration 🚀"
    );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add(
        "active"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "active"
                );

            },
            3000
        );

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "shoporaDarkMode",
        dark
    );

}


/* =====================================================
   LOAD DARK MODE
===================================================== */

function loadDarkMode() {

    const dark =
        localStorage.getItem(
            "shoporaDarkMode"
        );


    if (dark === "true") {

        document.body.classList.add(
            "dark"
        );

    }

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    document
        .getElementById(
            "mobileMenu"
        )
        .classList.toggle(
            "active"
        );

}


/* =====================================================
   SCROLL TO PRODUCTS
===================================================== */

function scrollToProducts() {

    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   NEWSLETTER
===================================================== */

function subscribeNewsletter(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "emailInput"
        ).value;


    showToast(
        `Thanks! ${email} subscribed successfully 🎉`
    );


    document.getElementById(
        "emailInput"
    ).value = "";

}


/* =====================================================
   COUNTDOWN TIMER
===================================================== */

let saleEndDate =
    new Date().getTime()
    +
    (
        2 * 24 * 60 * 60 * 1000
        +
        12 * 60 * 60 * 1000
        +
        45 * 60 * 1000
    );


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        saleEndDate - now;


    if (distance <= 0) {

        saleEndDate =
            new Date().getTime()
            +
            24 * 60 * 60 * 1000;

    }


    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            )
            /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            )
            /
            (
                1000 * 60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 * 60
                )
            )
            /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days)
            .padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours)
            .padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes)
            .padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds)
            .padStart(2, "0");

}


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   MODAL CLICK OUTSIDE
===================================================== */

productModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            productModal
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeCart();

        }

    }
);


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

loadDarkMode();

displayProducts();

updateCart();

wishlistCount.textContent =
    wishlist.length;

updateCountdown();


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c Shopora E-Commerce Website ",
    "background:#6c5ce7;color:white;padding:10px;font-size:16px"
);

console.log(
    "Built using HTML + CSS + JavaScript 🚀"
);
