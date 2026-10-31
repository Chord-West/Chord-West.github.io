const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');menu.textContent='MENU +';}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');menu.textContent=open?'CLOSE −':'MENU +';nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));}});},{rootMargin:'-12% 0px -65% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}
const gallery=[...document.querySelectorAll('.image-zoom')];
const dialog=document.querySelector('.lightbox');
const enlarged=dialog.querySelector('img');
const caption=document.querySelector('#lightbox-caption');
const counter=dialog.querySelector('.lightbox-count');
let current=0;
let trigger=null;
function showImage(index){current=(index+gallery.length)%gallery.length;const button=gallery[current];const original=button.querySelector('img');enlarged.src=original.src;enlarged.alt=original.alt;caption.textContent=button.dataset.caption;counter.textContent=`${current+1} / ${gallery.length}`;}
gallery.forEach((button,index)=>button.addEventListener('click',()=>{trigger=button;showImage(index);dialog.showModal();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(current-1));
dialog.querySelector('.lightbox-next').addEventListener('click',()=>showImage(current+1));
dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.classList.contains('lightbox-content'))dialog.close();});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showImage(current-1);}if(event.key==='ArrowRight'){event.preventDefault();showImage(current+1);}});
dialog.addEventListener('close',()=>{if(trigger)trigger.focus({preventScroll:true});});
document.querySelector('.print-button').addEventListener('click',()=>window.print());
