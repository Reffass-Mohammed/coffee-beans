// Preloader
window.addEventListener("load", function () {
  document.getElementById("preloader").style.display = "none";
});

// Back to top button
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  if (window.scrollY > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

// Quick view modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const quickViewButtons = document.querySelectorAll(".quick-view");
  const modal = new bootstrap.Modal(document.getElementById("quickViewModal"));

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productInfo = productCard.querySelector(".product-info");

      // Update modal content
      document.querySelector(".product-modal-image").src =
        productCard.querySelector(".product-image img").src;

      document.querySelector(".product-modal-info h3").textContent =
        productInfo.dataset.name;

      document.querySelector(".product-modal-info .price").textContent =
        productInfo.dataset.price;

      document.querySelector(
        ".product-modal-info .product-description p"
      ).textContent = productInfo.dataset.description;

      // Update product meta information
      const productMeta = document.querySelector(".product-meta");
      productMeta.innerHTML = `
          <p><strong>Origin:</strong> ${productInfo.dataset.origin}</p>
          <p><strong>Roast:</strong> ${productInfo.dataset.roast}</p>
          <p><strong>Weight:</strong> ${productInfo.dataset.weight}</p>
          <p><strong>SKU:</strong> ${productInfo.dataset.sku}</p>
          <p><strong>Categories:</strong> ${productInfo.dataset.categories}</p>
      `;

      // Update rating
      const rating = parseFloat(productInfo.dataset.rating);
      const ratingHTML = Array(5)
        .fill("")
        .map((_, index) => {
          if (index < Math.floor(rating)) {
            return '<i class="bi bi-star-fill"></i>';
          } else if (index === Math.floor(rating) && rating % 1 !== 0) {
            return '<i class="bi bi-star-half"></i>';
          } else {
            return '<i class="bi bi-star"></i>';
          }
        })
        .join("");

      document.querySelector(
        ".product-modal-info .product-rating"
      ).innerHTML = `${ratingHTML}<span>(${productInfo.dataset.reviews} reviews)</span>`;

      modal.show();
    });
  });

  // Quantity buttons in modal
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity-selector input");

  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    plusBtn.addEventListener("click", function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
  }
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
let itemsInCart = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    itemsInCart++;
    cartCount.textContent = itemsInCart;

    // Show added to cart notification
    const product = this.closest(".product-card");
    const productTitle = product.querySelector(".product-title").textContent;

    // Create and show notification
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
      <i class="bi bi-check-circle"></i>
      <p>${productTitle} added to cart!</p>
    `;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2500);
  });
});

// Category cards click handler
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach((card) => {
  card.addEventListener("click", function () {
    const category = this.dataset.category;
    document.getElementById("category").value = category;

    // Trigger the change event manually
    const event = new Event("change");
    document.getElementById("category").dispatchEvent(event);

    // Scroll to products section
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Success message (in a real app, this would send data to a server)
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
