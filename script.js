const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let cartCount = 0;
const toast = $('#toast');
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400);}
$('#year').textContent = new Date().getFullYear();
$('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
$$('.quick-add').forEach(button=>button.addEventListener('click',()=>{
  cartCount++;$('#bagCount').textContent=cartCount;
  notify(`${button.dataset.product} added to your bag`);
}));
$('#bagButton').addEventListener('click',()=>notify(cartCount ? `Your bag has ${cartCount} item${cartCount===1?'':'s'}.` : 'Your bag is waiting for something lovely.'));
$('#searchForm').addEventListener('submit',e=>{
  e.preventDefault();
  const query=$('#searchInput').value.trim().toLowerCase();
  if(!query){$('#searchInput').focus();return;}
  let count=0;
  $$('.product-card').forEach(card=>{const show=card.dataset.name.includes(query)||card.textContent.toLowerCase().includes(query);card.style.display=show?'':'none';if(show)count++;});
  $('#shop').scrollIntoView({behavior:'smooth'});
  notify(count?`${count} product${count===1?'':'s'} found`:'No matching products in this collection');
});
$('#newsletterForm').addEventListener('submit',e=>{
  e.preventDefault();
  const email=e.currentTarget.querySelector('input').value.trim();
  if(email){$('#newsletterMessage').textContent='Thanks for joining our beauty list!';e.currentTarget.reset();}
});
const announcementMessages=['✦ Free Shipping on Orders Over R750 | 30-Day Easy Returns ✦','♡ Your daily dose of beauty starts here ♡','✦ Discover your new beauty favourites ✦'];
let announcementIndex=0;
$$('.announce-arrow').forEach((button,i)=>button.addEventListener('click',()=>{
  announcementIndex=(announcementIndex+(i===0?-1:1)+announcementMessages.length)%announcementMessages.length;
  $('#announcementText').textContent=announcementMessages[announcementIndex];
}));
$$('.dot').forEach((dot,i)=>dot.addEventListener('click',()=>{
  $$('.dot').forEach(d=>d.classList.remove('selected'));dot.classList.add('selected');
  const heroCopy=$('.hero-copy');
  heroCopy.animate([{opacity:.65,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350});
  const lines=[
    ['Your Beauty','Our Priority','Discover feel-good makeup, skincare and beauty essentials to help you look and feel your best — every day.'],
    ['A Little Glow','Goes a Long Way','Find everyday essentials and thoughtful treats for your personal beauty ritual.'],
    ['Feel Beautiful','Every Day','Explore soft shades, nourishing skincare and little luxuries made for you.'],
    ['Your Self-Care','Moment','Make space for you with beauty favourites selected to inspire confidence.']
  ][i];
  $('.hero h1').innerHTML=lines[0]+'<br><span>'+lines[1]+'</span><i>♡</i>';
  $('.hero-description').textContent=lines[2];
}));
