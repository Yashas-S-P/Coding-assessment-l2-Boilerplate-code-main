document.addEventListener('DOMContentLoaded', () => {
    fetchCartData();
});

async function fetchCartData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889');
        const data = await response.json();
        renderCartItems(data.items);
        updateCartTotals(data);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}

function renderCartItems(items) {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${item.title}" class="product-image">
                <div class="product-details">
                    <h3>${item.title}</h3>
                </div>
            </div>
            <div class="price">₹${formatPrice(item.price)}</div> <!-- Convert paise to INR -->
            <div class="quantity">
                <input type="number" class="quantity-input" value="${item.quantity}" 
                    min="1" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <div class="subtotal">₹${formatPrice(item.line_price)}</div> <!-- Line price in paise -->
            <div class="remove">
                <i class="fas fa-trash" onclick="removeItem(${item.id})"></i>
            </div>
        `;
        container.appendChild(cartItem);
    });
}

function updateCartTotals(data) {
    const subtotalElement = document.getElementById('subtotal-amount');
    const totalElement = document.getElementById('total-amount');

    subtotalElement.textContent = `₹${formatPrice(data.items_subtotal_price)}`;
    totalElement.textContent = `₹${formatPrice(data.original_total_price)}`;
}

function formatPrice(price) {
    return (price / 100).toLocaleString('en-IN');
}

function updateQuantity(itemId, newQuantity) {
    console.log(`Updating quantity for item ${itemId} to ${newQuantity}`);
}

function removeItem(itemId) {
    console.log(`Removing item with ID ${itemId}`);
}