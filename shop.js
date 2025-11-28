function loadShop(){
  if(!window.PRODUCTS || window.PRODUCTS.length === 0){
    console.log('PRODUCTS not yet loaded, retrying...');
    setTimeout(loadShop, 100);
    return;
  }
  var products = window.PRODUCTS;
  var container = document.getElementById('products');
  if(!container) return;
  container.innerHTML = '';
  for(var i=0;i<products.length;i++){
    var p = products[i];
    var el = document.createElement('div');
    el.className = 'product';
    var img = '<a href="product.html?id='+p.id+'"><img src="'+p.image+'" alt="'+p.name+'" style="width:160px;height:120px"></a>';
    var name = '<div class="name"><a href="product.html?id='+p.id+'">'+p.name+'</a></div>';
    var price = '<div class="price">$'+p.price+'</div>';
    el.innerHTML = img + name + price;
    container.appendChild(el);
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', loadShop);
} else {
  loadShop();
}

