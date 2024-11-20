import CheckoutButton from 'CheckoutButton.js';

// Navbar Toggle for Mobile
const menuToggle = document.getElementById("menu-toggle");
const navbarLinks = document.getElementById("navbar-links");

menuToggle.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// Cart Slider Functionality
const cartButton = document.getElementById("cart-button");
const cartSlider = document.getElementById("cart-slider");
const closeCartButton = document.getElementById("close-cart");

cartButton.addEventListener("click", () => {
  cartSlider.classList.add("open");
});

closeCartButton.addEventListener("click", () => {
  cartSlider.classList.remove("open");
});

// Cart Data
let cart = [];

// DOM Elements
const cartCount = document.getElementById("cart-count");
const cartItemsList = cartSlider.querySelector(".cart-items");
const cartFooter = cartSlider.querySelector(".cart-footer");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");

// Save Cart to Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
    const productPrice = parseFloat(productCard.dataset.price);
    const productImage = productCard.querySelector("img").src;

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage,
      });
    }

    updateCartUI();
    saveCartToLocalStorage(); // Save the updated cart
  });
});

// Update Cart UI
function updateCartUI() {
  // Update Cart Count
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

  // Populate Cart Items
  cartItemsList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  // Update Total Price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartFooter.querySelector("span").textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Enable or Disable Checkout Button
  if (cart.length > 0) {
    checkoutButton.disabled = false;
    checkoutButton.classList.add("enabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.remove("enabled");
  }
}

// Clear Cart
clearCartButton.addEventListener("click", () => {
  cart = [];
  updateCartUI();
  saveCartToLocalStorage(); // Clear local storage as well
});

// Checkout Button Click Event
checkoutButton.addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Proceeding to checkout culer!!");
  }
});

// Load cart from Local Storage on page load
loadCartFromLocalStorage();


// Shop button on home 
document.getElementById("go-to-shop").addEventListener("click", () => {
  window.location.href = "shop.html";
});
