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
