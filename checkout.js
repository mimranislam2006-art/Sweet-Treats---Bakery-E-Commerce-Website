/*
  checkout.js
  - Purpose: Render checkout summary (items + thumbnails), collect delivery
    information and create a demo order saved to localStorage.
  - Behavior: Saves the order to `bakery_last_order`, clears `bakery_cart`, then
    redirects to `order-success.html`.
*/

async function showCheckout() {
  // Get cart from storage (object keyed by product id => quantity)
  var cart = JSON.parse(localStorage.getItem('bakery_cart') || '{}');
  
  // Get all products
  var response = await fetch('products.json');
  var products = await response.json();
  
  // Display items in order summary
  var orderDiv = document.getElementById('order-items');
  var orderTotal = 0;
  
  orderDiv.innerHTML = ''; // clear it first
  
  // Loop through each item in cart and render a small summary row
  for (var productId in cart) {
    var quantity = cart[productId];
    var product = null;
    
    // Find the product details
    for (var i = 0; i < products.length; i++) {
      if (String(products[i].id) === String(productId)) {
        product = products[i];
        break;
      }
    }
    
    if (!product) continue; // skip if not found
    
    // Calculate item total
    var itemTotal = product.price * quantity;
    orderTotal = orderTotal + itemTotal;
    
    // Create item display with image
    var itemDiv = document.createElement('div');
    itemDiv.style.display = 'flex';
    itemDiv.style.marginBottom = '8px';
    itemDiv.style.paddingBottom = '8px';
    itemDiv.style.borderBottom = '1px solid #eee';
    itemDiv.style.alignItems = 'center';
    itemDiv.style.gap = '8px';
    
    itemDiv.innerHTML = 
      '<img src="' + product.image + '" style="width:50px;height:50px;border-radius:4px;object-fit:cover">' +
      '<div>' +
        '<div><strong>' + product.name + '</strong></div>' +
        '<div style="font-size:0.9rem;color:#666;">x' + quantity + ' - $' + (product.price * quantity).toFixed(2) + '</div>' +
      '</div>';
    
    orderDiv.appendChild(itemDiv);
  }
  
  // Show total
  document.getElementById('order-total').textContent = orderTotal.toFixed(2);
  
  // Try to fill name field if user is logged in
  var user = localStorage.getItem('bakery_user');
  if (user && user.includes('@')) {
    var namePart = user.split('@')[0];
    document.getElementById('name').value = namePart;
  }
  
  // Handle form submission
  var form = document.getElementById('checkout-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value.trim();
    var street = document.getElementById('street').value.trim();
    var city = document.getElementById('city').value.trim();
    var postcode = document.getElementById('postcode').value.trim();
    var phone = document.getElementById('phone').value.trim();
    
    // Check all fields are filled
    if (!name || !street || !city || !postcode || !phone) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create order object
    var orderId = Date.now();
    var order = {
      id: orderId,
      name: name,
      street: street,
      city: city,
      postcode: postcode,
      phone: phone,
      items: cart,
      total: orderTotal
    };
    
    // Save order to storage
    localStorage.setItem('bakery_last_order', JSON.stringify(order));
    
    // Clear cart
    localStorage.removeItem('bakery_cart');
    
    // Go to success page
    window.location.href = 'order-success.html?id=' + orderId;
  });
}

showCheckout();
