const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');menu.textContent='메뉴';}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');menu.textContent=open?'닫기':'메뉴';nav.classList.toggle('open',open);});
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

const viewButtons=[...document.querySelectorAll('[data-view]')];
viewButtons.forEach(button=>button.addEventListener('click',()=>{
 const operator=button.dataset.view==='operator';
 viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelector('.customer-view').hidden=operator;
 document.querySelector('.operator-view').hidden=!operator;
 document.querySelector('#service-title').textContent=operator?'Swell 캠페인 제작 어드민':'현대백화점 앱과 PLAYLOOP';
 document.querySelector('.service-description').textContent=operator?'설정부터 AI 소재 생성, 미리보기와 게시까지':'고객이 이용하는 앱과 캠페인 화면';
}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
 const target=document.querySelector(link.getAttribute('href'));
 if(target?.matches('details'))target.open=true;
}));

function openHashProject(){const id=decodeURIComponent(location.hash.slice(1));const target=document.getElementById(id);if(target?.matches('details'))target.open=true;}
window.addEventListener('hashchange',openHashProject);openHashProject();
