const cart=[];const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const drawer=$("#cartDrawer"),backdrop=$("#cartBackdrop"),toast=$("#toast");
function money(n){return `€${n.toFixed(2)}`}
function showToast(){toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1500)}
function renderCart(){const box=$("#cartItems");$("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);const total=cart.reduce((a,x)=>a+x.price*x.qty,0);$("#cartTotal").textContent=money(total);
 if(!cart.length){box.innerHTML='<p class="empty">Your order is looking lonely.<br>Add something delicious.</p>';return}
 box.innerHTML=cart.map((x,i)=>`<div class="cart-line"><div><b>${x.name}</b><small>${money(x.price)} × ${x.qty}</small></div><button class="add" data-remove="${i}" aria-label="Remove ${x.name}">−</button></div>`).join("");
 $$("[data-remove]").forEach(b=>b.onclick=()=>{cart[+b.dataset.remove].qty--;if(cart[+b.dataset.remove].qty<=0)cart.splice(+b.dataset.remove,1);renderCart()})
}
function addItem(name,price){const found=cart.find(x=>x.name===name);found?found.qty++:cart.push({name,price:+price,qty:1});renderCart();showToast()}
$$(".add,.add-deal").forEach(b=>b.addEventListener("click",()=>addItem(b.dataset.name,b.dataset.price)));
function openCart(){drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false")}
function closeCart(){drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true")}
$("#cartOpen").onclick=openCart;$("#cartClose").onclick=closeCart;backdrop.onclick=closeCart;
$("#checkout").onclick=()=>alert("Demo checkout: connect Stripe, Square, Toast, or your own ordering API here.");
$$(".filter").forEach(btn=>btn.onclick=()=>{$$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;$$(".menu-card").forEach(card=>card.style.display=f==="all"||card.dataset.category===f?"":"none")});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});$$(".reveal").forEach(x=>observer.observe(x));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});renderCart();