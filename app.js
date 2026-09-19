const products = [
  { id:'beef-pickle', name:'Beef Pickle', image:'./1-product.png', price:349, category:'pickles', color:'#F4F4F2', sizes:['200g','400g','1kg'], tags:['Small Batches','Homemade','Bold Flavour'], description:'Rich, deeply spiced beef pickle made in small batches for a bold, savoury bite.' },
  { id:'lemon-pickle', name:'Lemon Pickle', image:'./2-product.png', price:299, category:'pickles', color:'#F7F2E6', sizes:['200g','400g','1kg'], tags:['No Preservatives','Small Batches','Homemade'], description:'Bright lemon pieces, traditional spices and a cheerful hit of tang in every spoonful.' },
  { id:'mango-pickle', name:'Mango Pickle', image:'./3-product.png', price:299, category:'pickles', color:'#F4F4F2', sizes:['200g','400g','1kg'], tags:['No Preservatives','Small Batches','Homemade'], description:'A classic made with handpicked mangoes, traditional spices and a whole lot of love.' },
  { id:'garlic-pickle', name:'Garlic Pickle', image:'./4-product.png', price:329, category:'pickles', color:'#F7F2E6', sizes:['200g','400g','1kg'], tags:['No Preservatives','Small Batches','Homemade'], description:'Punchy whole garlic cloves mellowed with oil, spice and patient small-batch making.' },
  { id:'mango-lemon-combo', name:'Mango + Lemon Combo', image:'./3-product.png', secondaryImage:'./2-product.png', price:579, category:'bundles', color:'linear-gradient(135deg,#F7F2E6 50%,#F4F4F2 50%)', sizes:['2 × 200g','2 × 400g'], tags:['Best Value','Small Batches','Homemade'], description:'Two bright classics: handpicked mango and lemon, traditional spices and a whole lot of love.' },
  { id:'starter-bundle', name:'Starter Bundle', image:'./2-product.png', secondaryImage:'./4-product.png', price:799, category:'bundles', color:'linear-gradient(135deg,#F4F4F2 50%,#F7F2E6 50%)', sizes:['3 × 200g','3 × 400g'], tags:['Most Loved','Small Batches','Homemade'], description:'A joyful little tour of our kitchen, packed with spice and a whole lot of love.' }
];

const state = {
  cart: JSON.parse(localStorage.getItem('mubis-cart') || '[]').filter(item=>products.some(product=>product.id===item.id)),
  homeCategory: 'pickles',
  popCategory: 'pickles',
  shopCategory: 'all',
  sort: 'featured',
  selectedSize: {},
  pdpQty: 1
};

const app = document.querySelector('#app');
const icons = {
  menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c.6-5 3.3-7 8-7s7.4 2 8 7"/></svg>',
  cart:'<svg viewBox="0 0 24 24"><path d="M3 4h2l2.3 11h10.9l2-7H6.1M9 20h.01M17 20h.01"/></svg>'
};

function saveCart(){ localStorage.setItem('mubis-cart', JSON.stringify(state.cart)); updateCartBadges(); }
function cartCount(){ return state.cart.reduce((n,i)=>n+i.qty,0); }
function subtotal(){ return state.cart.reduce((n,i)=>n+i.price*i.qty,0); }
function money(n){ return `₹${Number(n).toLocaleString('en-IN')}`; }
function route(){ return location.hash.slice(1) || '/'; }
function go(path){ location.hash = path; }
function updateCartBadges(){ document.querySelectorAll('.cart-count').forEach(el=>{ el.textContent=cartCount(); el.hidden=!cartCount(); }); }
function toast(message){ const el=document.querySelector('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2200); }

function header(){
  const current=route();
  const navLink=(path,label)=>`<a class="${current===path||(path==='/shop'&&current.startsWith('/shop'))?'active':''}" href="#${path}">${label}</a>`;
  return `<div class="announce">Free shipping over ₹799 · Small batches, shipped within 48h</div>
  <div class="header-wrap">
  <header class="site-header">
    <div class="header-side header-left">
      <button class="icon-button menu-btn" data-menu aria-label="Open menu">${icons.menu}</button>
      <button class="icon-button" aria-label="Search" onclick="window.showDemo('Search is coming soon')">${icons.search}</button>
    </div>
    <a href="#/" class="logo" aria-label="Mubi's home"><img src="./logo-mark.png" alt="Mubi's Kitchen"></a>
    <div class="header-side header-right">
      <button class="icon-button account-btn" aria-label="Account" onclick="window.showDemo('Account sign-in will be connected later')">${icons.user}</button>
      <a class="icon-button" href="#/cart" aria-label="Cart">${icons.cart}<span class="cart-count" ${cartCount()?'':'hidden'}>${cartCount()}</span></a>
    </div>
  </header>
  <nav class="main-nav" id="nav">${navLink('/shop','Shop')}${navLink('/shop?cat=pickles','Pickles')}${navLink('/shop?cat=bundles','Bundles')}${navLink('/about','About')}${navLink('/contact','Contact')}</nav>
  </div>`;
}

function footer(){ return `<footer class="site-footer"><div class="footer-shell">
  <div class="footer-main">
    <div class="footer-brand"><a href="#/" class="logo footer-logo"><img src="./logo-mark.png" alt="Mubi's Kitchen"></a><p>Homemade flavour.<br>Made to make meals happier.</p><span class="footer-origin">Made with love in India ♥</span></div>
    <div><h3 class="footer-title">Explore</h3><div class="footer-links"><a href="#/">Home</a><a href="#/shop">Shop all</a><a href="#/about">Our story</a><a href="#/contact">Contact</a></div></div>
    <div><h3 class="footer-title">Good to know</h3><div class="footer-links"><a href="#/contact">FAQ</a><a href="#/contact">Shipping</a><a href="#/contact">Refunds & returns</a><a href="#/contact">Privacy</a></div></div>
    <div class="footer-join"><h3 class="footer-title">Join the pickle club</h3><p>Fresh drops, recipes and happy little notes from our kitchen.</p><form class="footer-form" data-newsletter><input class="field" type="email" placeholder="Your email" required aria-label="Email"><button class="btn btn-footer" type="submit">Join</button></form></div>
  </div>
  <div class="footer-bottom"><span>© 2026 Mubi's Kitchen. Demo storefront.</span><span>UPI · VISA · MASTERCARD · RUPAY</span></div>
  </div></footer>`; }

function productImage(p, className='product-image'){
  return `<img class="${className}" src="${p.image}" alt="${p.name} jar">${p.secondaryImage?`<img class="${className} secondary" src="${p.secondaryImage}" alt="">`:''}`;
}

function productCard(p){ return `<article class="product-card">
  <a href="#/product/${p.id}" class="product-art" style="--card-color:${p.color}" aria-label="View ${p.name}">
    ${productImage(p)}
    <button class="add-fab" aria-label="Add ${p.name} to cart" onclick="event.preventDefault();event.stopPropagation();window.__addToCart('${p.id}')">+</button>
  </a>
  <div class="product-info"><span class="product-kicker">${p.category==='bundles'?'Bundle · Small batch':'Small batch pickle'}</span><h3><a href="#/product/${p.id}">${p.name}</a></h3><span class="price">${money(p.price)}</span></div>
  </article>`; }

function featureStrip(){ return `<section class="feature-strip"><div class="container feature-grid">
  <div class="feature-item"><span class="feature-icon">✦</span>Small batch production</div>
  <div class="feature-item"><span class="feature-icon">☀</span>No added preservatives</div>
  <div class="feature-item"><span class="feature-icon">❋</span>Premium ingredients</div>
  <div class="feature-item"><span class="feature-icon">→</span>Free shipping over ₹799</div>
  </div></section>`; }

function bestSellersCarousel(){
  const list=products.slice(0,6);
  return `<section class="carousel-band">
    <div class="container carousel-head">
      <h2 class="display">Our best sellers</h2>
      <div class="carousel-arrows">
        <button class="arrow-btn" data-carousel-prev="carousel-track" aria-label="Previous">←</button>
        <button class="arrow-btn" data-carousel-next="carousel-track" aria-label="Next">→</button>
      </div>
    </div>
    <div class="carousel-track" id="carousel-track">${list.map(p=>`<a href="#/product/${p.id}" class="carousel-item">
        <span class="carousel-badges">${p.tags.slice(0,2).map(t=>`<span class="carousel-badge">${t}</span>`).join('')}</span>
        <img src="${p.image}" alt="${p.name} jar">
        <span class="carousel-overlay"><span class="carousel-name">${p.name}</span><span class="carousel-price">${money(p.price)}</span></span>
      </a>`).join('')}</div>
    <p class="carousel-tagline">The legend. The original.<br>From our kitchen to yours.</p>
    <div class="carousel-cta"><a href="#/shop" class="btn btn-light">Shop now</a></div>
  </section>`;
}

function popCollection(){
  const swatches=['#C0392B','#FF8C1A','#FFC93C','#2E7D32'];
  const items=products.filter(p=>p.category===state.popCategory).slice(0,4);
  return `<section class="section pop-section"><div class="container">
    <div class="section-head centered"><span class="eyebrow">The collection</span><h2 class="display">Pop Collection</h2><div class="toggle-row"><button class="chip ${state.popCategory==='pickles'?'active':''}" data-pop-cat="pickles">Pickles</button><button class="chip ${state.popCategory==='bundles'?'active':''}" data-pop-cat="bundles">Bundles</button></div></div>
    <div class="pop-grid">${items.map((p,i)=>`<a href="#/product/${p.id}" class="pop-card" style="background:${swatches[i%swatches.length]}"><img src="${p.image}" alt="${p.name}"><span class="pop-label">${p.name}</span></a>`).join('')}</div>
  </div></section>`;
}

function infoBanner(){ return `<section class="info-banner"><div class="container info-banner-inner">
  <h2 class="display info-headline">Leave store-bought pickles behind.</h2>
  <div class="floating-tags">
    <span class="float-tag tag-a">Small Batch</span>
    <span class="float-tag tag-b">No Preservatives</span>
    <span class="float-tag tag-c">Made Fresh</span>
    <span class="float-tag tag-d">100% Natural</span>
  </div>
  <img class="info-jar" src="./1-product.png" alt="Mubi's Kitchen jar">
  </div></section>`; }

const reelCaptions=['Morning pickle mood 🌞','Small-batch magic ✨','Straight from the jar','Grandma-approved 👵','Weekend snack sorted'];
function ugcReels(){
  const list=products.slice(0,5);
  return `<section class="section reels-section"><div class="container">
    <div class="section-head centered"><span class="eyebrow">Community</span><h2 class="display">Watch the real-life reactions</h2><p>Tag @mubiskitchen — we love seeing our jars on your table.</p></div>
  </div>
  <div class="reels-wrap">
    <button class="arrow-btn reels-arrow left" data-carousel-prev="reels-track" aria-label="Previous">←</button>
    <div class="reel-track" id="reels-track">${list.map((p,i)=>`<div class="reel-item">
        <span class="reel-caption">${reelCaptions[i%reelCaptions.length]}</span>
        <button class="reel-play" aria-label="Play video">▶</button>
        <img src="${p.image}" alt="${p.name} in use">
        <a href="#/product/${p.id}" class="reel-tag"><img src="${p.image}" alt=""><span>${p.name}<br><b>${money(p.price)}</b></span></a>
      </div>`).join('')}</div>
    <button class="arrow-btn reels-arrow right" data-carousel-next="reels-track" aria-label="Next">→</button>
    <div class="testimonial-card">
      <button class="testimonial-close" aria-label="Dismiss" onclick="this.closest('.testimonial-card').style.display='none'">×</button>
      <img class="testimonial-thumb" src="./1-product.png" alt="Beef Pickle">
      <div class="testimonial-body">
        <span class="testimonial-name">Ritika S. <span class="testimonial-stars">★★★★★</span></span>
        <p>Tastes just like my grandmother's — the beef pickle disappeared from the fridge in two days. Ordering three more jars!</p>
        <span class="testimonial-product">Beef Pickle (400g)</span>
      </div>
    </div>
  </div></section>`;
}

function faqSection(){
  const faqs=[
    ['How fast will my order be delivered?','Orders usually leave our kitchen in 2–3 working days and arrive within 4–7 days across most of India.'],
    ['Do you use any preservatives?','No — every jar is made fresh in small batches with no added preservatives, ever.'],
    ['Can I put together a custom bundle?','Yes! Reach out on the contact page and we\'ll help you build a bundle for your favourites.'],
    ['What if my jar arrives damaged?','Write to us with a photo within 48 hours of delivery and we\'ll send a free replacement, no questions asked.']
  ];
  return `<section class="section faq-section"><div class="container faq-grid">
    <div>
      <span class="eyebrow">Good to know</span>
      <h2 class="display">Frequently asked questions</h2>
      <div class="accordion faq-accordion">${faqs.map(([q,a],i)=>`<div class="accordion-item ${i===0?'open':''}"><button class="accordion-button"><span>${q}</span><span class="plus">＋</span></button><div class="accordion-content">${a}</div></div>`).join('')}</div>
    </div>
    <div class="faq-visual"><img src="./1.png" alt="Mubi's Kitchen jar"></div>
  </div></section>`;
}

function home(){
  const list=products.filter(p=>p.category===state.homeCategory).slice(0,4);
  return `${header()}<main id="main">
  <section class="hero"><div class="container hero-inner"><div class="hero-copy">
    <div class="hero-rating"><span class="avatar-stack"><span class="avatar" style="background:#2E7D32">R</span><span class="avatar" style="background:#C0392B">A</span><span class="avatar" style="background:#FFC93C;color:#111">P</span></span><span class="hero-rating-text">★★★★★ 4.8/5 · Loved by 1,200+ home cooks</span></div>
    <span class="eyebrow">Made at home · Shared with joy</span><h1 class="display">Real ingredients.<br>Happier meals.</h1><p>Small-batch pickles with bold, honest flavour. Made slowly with traditional recipes and ingredients your grandmother would recognise.</p>
    <div class="hero-cta-row"><a href="#/shop" class="btn btn-primary">Shop now</a><a href="#/shop" class="btn btn-secondary">Explore the range</a></div>
  </div><div class="hero-visual"><span class="hero-ribbon">Bestseller</span><div class="hero-jars">${products.filter(p=>p.category==='pickles').map(p=>`<img src="${p.image}" alt="${p.name} jar">`).join('')}</div></div></div></section>
  ${featureStrip()}
  ${bestSellersCarousel()}
  <section class="section products-wrap"><div class="container"><div class="section-head centered"><span class="eyebrow">Choose your happy</span><h2 class="display">A little pop in every bite</h2><div class="toggle-row"><button class="pill ${state.homeCategory==='pickles'?'active':''}" data-home-cat="pickles">Pickles</button><button class="pill ${state.homeCategory==='bundles'?'active':''}" data-home-cat="bundles">Bundles</button></div></div><div class="products-scroll"><div class="product-grid home-products">${list.map(p=>productCard(p)).join('')}</div></div></div></section>
  ${popCollection()}
  ${infoBanner()}
  <section class="section story"><div class="container story-grid"><div class="story-visual"><div class="photo-slot"><span>Founder / kitchen photo placeholder<br>Drop your image here</span></div></div><div class="story-copy"><span class="eyebrow">The recipe behind the jar</span><h2 class="display">Made with memory.</h2><p>It started with recipes passed around the family table, handwritten in the margins and adjusted by instinct. We bottle that feeling: bright ingredients, patient hands, and food that makes an ordinary meal feel special.</p><a class="text-link" href="#/about">Read our story →</a></div></div></section>
  ${ugcReels()}
  ${faqSection()}
  ${newsletter()}</main>${footer()}`;
}

function newsletter(){ return `<section class="newsletter"><div class="container newsletter-inner"><span class="eyebrow">Good news</span><h2 class="display">Freshly bottled, straight to your inbox</h2><form class="newsletter-form" data-newsletter><input class="field" type="email" placeholder="you@email.com" required aria-label="Email address"><button class="btn btn-primary" type="submit">Subscribe</button></form></div></section>`; }

function shop(){
  let list=state.shopCategory==='all'?[...products]:products.filter(p=>p.category===state.shopCategory);
  if(state.sort==='low') list.sort((a,b)=>a.price-b.price); if(state.sort==='high') list.sort((a,b)=>b.price-a.price); if(state.sort==='new') list.reverse();
  return `${header()}<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">The pantry shelf</span><h1 class="display">Shop all.</h1><p>Pick one favourite or invite the whole gang. Every jar is made in a small batch and packed with big personality.</p></div></section><section class="section"><div class="container"><div class="shop-toolbar"><div class="toggle-row">${[['all','All'],['pickles','Pickles'],['bundles','Combos']].map(([v,l])=>`<button class="pill ${state.shopCategory===v?'active':''}" data-shop-cat="${v}">${l}</button>`).join('')}</div><select class="sort-select" data-sort aria-label="Sort products"><option value="featured" ${state.sort==='featured'?'selected':''}>Featured</option><option value="low" ${state.sort==='low'?'selected':''}>Price: Low to high</option><option value="high" ${state.sort==='high'?'selected':''}>Price: High to low</option><option value="new" ${state.sort==='new'?'selected':''}>Newest</option></select></div><div class="product-grid shop-products">${list.map(productCard).join('')}</div></div></section></main>${footer()}`;
}

function productPage(id){
  const p=products.find(x=>x.id===id)||products[0]; const selected=state.selectedSize[p.id]||p.sizes[0];
  return `${header()}<main id="main"><section class="pdp"><div class="container pdp-grid"><div class="pdp-art" style="--card-color:${p.color}">${productImage(p,'pdp-image')}</div><div class="pdp-copy"><span class="eyebrow">From the pickle shelf</span><h1 class="display">${p.name}</h1><div class="pdp-price">${money(p.price)}</div><p class="pdp-description">${p.description}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><span class="option-label">Choose a size</span><div class="size-options">${p.sizes.map(s=>`<button class="pill ${selected===s?'active':''}" data-size="${s}" data-product="${p.id}">${s}</button>`).join('')}</div><div class="purchase-row"><div class="stepper"><button data-pdp-minus aria-label="Decrease quantity">−</button><span>${state.pdpQty}</span><button data-pdp-plus aria-label="Increase quantity">+</button></div><button class="btn btn-primary" data-add="${p.id}" data-qty="${state.pdpQty}">Add to cart — ${money(p.price*state.pdpQty)}</button></div>${accordion()}</div></div></section><div class="mobile-buy"><button class="btn btn-primary btn-block" data-add="${p.id}" data-qty="${state.pdpQty}">Add to cart — ${money(p.price*state.pdpQty)}</button></div></main>${footer()}`;
}

function accordion(){ return `<div class="accordion">${[
 ['Ingredients','Seasonal produce, mustard oil, salt and our house blend of traditional whole spices. Exact ingredients will be updated with final product data.'],
 ['Shipping & delivery','Orders usually leave our kitchen in 2–3 working days. Delivery estimates and charges are shown at checkout.'],
 ['Our story','These recipes began at a family table and grew jar by jar. We still make them with the same patient, hands-on spirit.']
].map(([h,c],i)=>`<div class="accordion-item ${i===0?'open':''}"><button class="accordion-button"><span>${h}</span><span class="plus">＋</span></button><div class="accordion-content">${c}</div></div>`).join('')}</div>`; }

function cartPage(){
  return `${header()}<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">Your tasty stash</span><h1 class="display">Your cart.</h1></div></section><section class="section"><div class="container">${state.cart.length?`<div class="cart-layout"><div class="cart-list">${state.cart.map(cartItem).join('')}</div>${summary(true)}</div>`:`<div class="empty"><div><div class="empty-art">EMPTY<br>JAR</div><h2 class="display">Nothing here. Yet.</h2><p>Your future meals are waiting for a little pickle-powered joy.</p><a href="#/shop" class="btn btn-primary">Find your flavour →</a></div></div>`}</div></section></main>${footer()}`;
}
function cartItem(item){ const p=products.find(x=>x.id===item.id); return `<article class="cart-item"><div class="cart-thumb" style="--card-color:${p.color}"><img src="${p.image}" alt="${p.name} jar"></div><div><h3>${p.name}</h3><p>${item.size}</p><div class="stepper" style="max-width:120px"><button data-cart-minus="${item.key}">−</button><span>${item.qty}</span><button data-cart-plus="${item.key}">+</button></div><button class="remove" data-remove="${item.key}">Remove</button></div><div class="price">${money(item.price*item.qty)}</div></article>`; }
function summary(showButton=false){ return `<aside class="summary"><h2>Order summary</h2>${state.cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="order-mini"><span>${p.name} × ${i.qty}</span><b>${money(i.price*i.qty)}</b></div>`}).join('')}<div class="summary-line"><span>Subtotal</span><b>${money(subtotal())}</b></div><div class="summary-line"><span>Shipping</span><span>Calculated at checkout</span></div><div class="summary-line total"><span>Total</span><span>${money(subtotal())}</span></div>${showButton?'<a href="#/checkout" class="btn btn-primary btn-block">Proceed to checkout →</a>':''}</aside>`; }

function checkout(){ if(!state.cart.length){ go('/cart'); return ''; } return `${header()}<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">Almost yours</span><h1 class="display">Checkout.</h1><p>This is a demo checkout. No payment will be taken.</p></div></section><section class="section"><div class="container checkout-layout"><form id="checkout-form"><div class="form-card"><h2>Contact</h2><div class="form-group"><label for="email">Email</label><input class="field" id="email" type="email" required placeholder="you@email.com"></div></div><div class="form-card"><h2>Shipping address</h2><div class="form-grid"><div class="form-group"><label for="first">First name</label><input class="field" id="first" required></div><div class="form-group"><label for="last">Last name</label><input class="field" id="last" required></div><div class="form-group full"><label for="address">Address</label><input class="field" id="address" required></div><div class="form-group"><label for="city">City</label><input class="field" id="city" required></div><div class="form-group"><label for="pin">PIN code</label><input class="field" id="pin" inputmode="numeric" pattern="[0-9]{6}" required></div></div></div><div class="form-card"><h2>Payment</h2><label class="radio-card"><input type="radio" checked> Demo payment — no charge</label></div><button class="btn btn-primary btn-block" type="submit">Place order — ${money(subtotal())}</button></form>${summary(false)}</div></section></main>${footer()}`; }

function confirmation(){ return `${header()}<main id="main"><section class="confirmation"><div class="confirmation-card"><span class="eyebrow">The good stuff is on its way</span><h1 class="display">Order<br>placed!</h1><p>Thank you for giving our little jars a spot at your table. Your demo order number is <strong>#MUBI${Math.floor(1000+Math.random()*8999)}</strong>.</p><a href="#/" class="btn btn-light">Back to home →</a><div class="botanical"></div></div></section></main>`; }

function about(){ return `${header()}<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">Pull up a chair</span><h1 class="display">Our story.</h1><p>Family recipes, loud flavours and the happy belief that everyday food deserves a little celebration.</p></div></section><section class="section"><div class="container about-grid"><div><span class="eyebrow">From one kitchen to many</span><h2 class="display">It began with a handwritten recipe.</h2><p>Mubi's Kitchen grew from the kind of food memories that stay with you: mangoes drying in summer light, spices toasted by instinct, jars lined up on a kitchen shelf. We make each batch with that same closeness and care.</p><p>Our promise is simple—real produce, traditional methods and flavour that earns its place on your table.</p></div><div class="collage"><div class="photo-slot"><span>Founder portrait placeholder</span></div><div class="photo-slot"><span>Kitchen process placeholder</span></div></div></div></section><section class="section trust"><div class="container"><div class="trust-grid"><article class="trust-card"><div class="trust-icon">✦</div><h3>Made slowly</h3><p>Patient recipes, careful hands and no rushed batches.</p></article><article class="trust-card"><div class="trust-icon">☀</div><h3>Kept honest</h3><p>No added preservatives and no unnecessary extras.</p></article><article class="trust-card"><div class="trust-icon">❋</div><h3>Shared happily</h3><p>Food made to bring a little joy to everyday meals.</p></article></div></div></section></main>${footer()}`; }

function contact(){ return `${header()}<main id="main"><section class="page-hero"><div class="container"><span class="eyebrow">Questions, compliments, pickle chat</span><h1 class="display">Say hello.</h1></div></section><section class="section"><div class="container contact-grid"><form class="form-card" data-contact><h2>Send us a note</h2><div class="form-grid"><div class="form-group"><label for="name">Name</label><input class="field" id="name" required></div><div class="form-group"><label for="contact-email">Email</label><input class="field" id="contact-email" type="email" required></div><div class="form-group full"><label for="message">Message</label><textarea class="field" id="message" rows="7" required placeholder="What's on your mind?"></textarea></div><div class="form-group full"><button class="btn btn-secondary" type="submit">Send message →</button></div></div></form><aside class="contact-card"><h2>Find us</h2><div class="contact-line"><span class="eyebrow">Email</span><p>hello@mubiskitchen.demo</p></div><div class="contact-line"><span class="eyebrow">Kitchen hours</span><p>Monday–Saturday<br>10:00–18:00 IST</p></div><div class="contact-line"><span class="eyebrow">Social</span><p>@mubiskitchen ↗</p></div><p><small>Placeholder contact details for this demo.</small></p></aside></div></section></main>${footer()}`; }

function render(){
  const path=route(); let html='';
  if(path.startsWith('/shop?cat=')) state.shopCategory=path.split('=')[1] || 'all';
  if(path==='/') html=home(); else if(path.startsWith('/shop')) html=shop(); else if(path.startsWith('/product/')) html=productPage(path.split('/')[2]); else if(path==='/cart') html=cartPage(); else if(path==='/checkout') html=checkout(); else if(path==='/confirmation') html=confirmation(); else if(path==='/about') html=about(); else if(path==='/contact') html=contact(); else html=home();
  app.innerHTML=`<div class="shell">${html}</div>`; bind(); updateCartBadges(); window.scrollTo(0,0);
}

function addToCart(id,qty=1){ const p=products.find(x=>x.id===id); const size=state.selectedSize[id]||p.sizes[0]; const key=`${id}::${size}`; const found=state.cart.find(i=>i.key===key); if(found) found.qty+=qty; else state.cart.push({key,id,size,qty,price:p.price}); saveCart(); toast(`${p.name} added to your cart`); }

function bind(){
  document.querySelector('[data-menu]')?.addEventListener('click',()=>document.querySelector('#nav').classList.toggle('open'));
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add,Number(b.dataset.qty||1))));
  document.querySelectorAll('[data-home-cat]').forEach(b=>b.addEventListener('click',()=>{state.homeCategory=b.dataset.homeCat;render()}));
  document.querySelectorAll('[data-pop-cat]').forEach(b=>b.addEventListener('click',()=>{state.popCategory=b.dataset.popCat;render()}));
  document.querySelectorAll('[data-carousel-prev]').forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById(b.dataset.carouselPrev); t?.scrollBy({left:-t.clientWidth*0.8,behavior:'smooth'})}));
  document.querySelectorAll('[data-carousel-next]').forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById(b.dataset.carouselNext); t?.scrollBy({left:t.clientWidth*0.8,behavior:'smooth'})}));
  document.querySelectorAll('[data-shop-cat]').forEach(b=>b.addEventListener('click',()=>{state.shopCategory=b.dataset.shopCat;render()}));
  document.querySelector('[data-sort]')?.addEventListener('change',e=>{state.sort=e.target.value;render()});
  document.querySelectorAll('[data-size]').forEach(b=>b.addEventListener('click',()=>{state.selectedSize[b.dataset.product]=b.dataset.size;render()}));
  document.querySelector('[data-pdp-minus]')?.addEventListener('click',()=>{state.pdpQty=Math.max(1,state.pdpQty-1);render()});
  document.querySelector('[data-pdp-plus]')?.addEventListener('click',()=>{state.pdpQty++;render()});
  document.querySelectorAll('.accordion-button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
  document.querySelectorAll('[data-cart-minus]').forEach(b=>b.addEventListener('click',()=>{const i=state.cart.find(x=>x.key===b.dataset.cartMinus); if(i.qty>1)i.qty--;else state.cart=state.cart.filter(x=>x.key!==i.key);saveCart();render()}));
  document.querySelectorAll('[data-cart-plus]').forEach(b=>b.addEventListener('click',()=>{state.cart.find(x=>x.key===b.dataset.cartPlus).qty++;saveCart();render()}));
  document.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{state.cart=state.cart.filter(x=>x.key!==b.dataset.remove);saveCart();render()}));
  document.querySelectorAll('[data-newsletter]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();e.target.reset();toast('Welcome to the pickle club!')}));
  document.querySelector('[data-contact]')?.addEventListener('submit',e=>{e.preventDefault();e.target.reset();toast('Message sent — we’ll be in touch!')});
  document.querySelector('#checkout-form')?.addEventListener('submit',e=>{e.preventDefault();state.cart=[];saveCart();go('/confirmation')});
}

window.showDemo=toast;
window.__addToCart=addToCart;
window.addEventListener('hashchange',render);
render();
