/*
  cart.js
  - Purpose: Render the shopping cart from localStorage, allow item removal,
    and handle checkout navigation (redirects to login when needed).
  - Notes: Uses `products.json` to look up product metadata (name, price, image).
*/
async function showCart(){
  const cart = JSON.parse(localStorage.getItem('bakery_cart')||'{}');
  const res = await fetch('products.json');
  const products = await res.json();
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;
  // Loop through each product id stored in the cart
  for(const id in cart){
    const qty = cart[id];
    const p = products.find(x=>String(x.id)===String(id));
    if(!p) continue;
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '12px';
    li.style.padding = '10px 0';
    li.style.borderBottom = '1px solid #ddd';
    li.innerHTML = 
      '<img src="' + p.image + '" style="width:60px;height:60px;border-radius:6px;object-fit:cover">' +
      '<div style="flex:1">' +
        '<div><strong>' + p.name + '</strong></div>' +
        '<div style="font-size:0.9rem;color:#666;">x' + qty + ' - $' + (p.price*qty).toFixed(2) + '</div>' +
      '</div>' +
      '<button data-id="' + id + '" class="remove">Remove</button>';
    list.appendChild(li);
    total += p.price*qty;
  }
  document.getElementById('total').textContent = total.toFixed(2);
  // Attach remove handlers for each remove button
  list.querySelectorAll('.remove').forEach(btn=>btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-id');
    const cart = JSON.parse(localStorage.getItem('bakery_cart')||'{}');
    delete cart[id];
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    showCart();
  }));
  // When user clicks checkout, ensure they're logged in first
  document.getElementById('checkout').addEventListener('click', ()=>{
    const user = localStorage.getItem('bakery_user');
    if(!user){
      location.href = 'login.html?next=checkout';
      return;
    }
    location.href = 'checkout.html';
  });
}
showCart();
