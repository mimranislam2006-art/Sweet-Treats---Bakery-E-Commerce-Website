function loadHome(){
  if(!window.PRODUCTS || window.PRODUCTS.length === 0){
    console.log('PRODUCTS not yet loaded, retrying...');
    setTimeout(loadHome, 100);
    return;
  }
  var products = window.PRODUCTS;
  var container = document.getElementById('products');
  if(!container) return;
  container.innerHTML = '';
  var shown = 0;
  for(var i=0;i<products.length && shown<4;i++){
    var p = products[i];
    if(!p.featured) continue;
    var el = document.createElement('div');
    el.className = 'product';
    var img = '<a href="product.html?id='+p.id+'"><img src="'+p.image+'" alt="'+p.name+'" style="width:140px;height:100px"></a>';
    var name = '<div class="name"><a href="product.html?id='+p.id+'">'+p.name+'</a></div>';
    var desc = '<div class="desc">'+p.description+'</div>';
    var price = '<div class="price">$'+p.price+'</div>';
    el.innerHTML = img + name + desc + price;
    container.appendChild(el);
    shown++;
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', loadHome);
} else {
  loadHome();
}

