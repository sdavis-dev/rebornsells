function toggleCard(button) {
  const card = button.closest('.product-card');
  const details = card.querySelector('.expandable-details');
  details.classList.toggle('hidden');

  // Reset carousel to first image
  const images = card.querySelectorAll('.carousel-img');
  images.forEach((img, i) => {
    img.classList.remove('opacity-100');
    img.classList.add('opacity-0');
    if (i === 0) img.classList.add('opacity-100');
  });

  // Store active image index in dataset
  card.dataset.activeIndex = 0;
}

function nextImage(button) {
  const card = button.closest('.product-card');
  const images = card.querySelectorAll('.carousel-img');
  let index = parseInt(card.dataset.activeIndex || 0);

  images[index].classList.remove('opacity-100');
  images[index].classList.add('opacity-0');

  index = (index + 1) % images.length;

  images[index].classList.remove('opacity-0');
  images[index].classList.add('opacity-100');

  card.dataset.activeIndex = index;
}

function prevImage(button) {
  const card = button.closest('.product-card');
  const images = card.querySelectorAll('.carousel-img');
  let index = parseInt(card.dataset.activeIndex || 0);

  images[index].classList.remove('opacity-100');
  images[index].classList.add('opacity-0');

  index = (index - 1 + images.length) % images.length;

  images[index].classList.remove('opacity-0');
  images[index].classList.add('opacity-100');

  card.dataset.activeIndex = index;
}


const shopToggle = document.getElementById('shop-toggle');
  const shopMenu = document.getElementById('shop-menu');

  shopToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent clicks from bubbling up
    shopMenu.classList.toggle('hidden');
  });

  // Optional: Close dropdown if clicked outside
  document.addEventListener('click', () => {
    shopMenu.classList.add('hidden');
  });

const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountDisplay = document.getElementById('cart-count');

    let cart = [];

    function updateCartUI() {
      cartItemsContainer.innerHTML = '';
      let totalItems = 0;

      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = "flex justify-between items-center border-b pb-2";
        div.innerHTML = `
          <div>
            <h4 class="font-semibold">${item.name}</h4>
            <p class="text-sm text-gray-600">Qty: ${item.quantity} | $${item.price}</p>
          </div>
          <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
        totalItems += item.quantity;
      });

      cartCountDisplay.textContent = totalItems;
    }

    function addToCart(product, price) {
      const existing = cart.find(item => item.name === product);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name: product, price, quantity: 1 });
      }
      updateCartUI();
    }

    function removeFromCart(product) {
      cart = cart.filter(item => item.name !== product);
      updateCartUI();
    }

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = btn.dataset.product;
        const price = parseFloat(btn.dataset.price);
        addToCart(product, price);
      });
    });

    openCartBtn.addEventListener('click', () => {
      cartSidebar.classList.remove('translate-x-full');
      cartOverlay.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
      cartSidebar.classList.add('translate-x-full');
      cartOverlay.classList.add('hidden');
    });

    cartOverlay.addEventListener('click', () => {
      cartSidebar.classList.add('translate-x-full');
      cartOverlay.classList.add('hidden');
    });