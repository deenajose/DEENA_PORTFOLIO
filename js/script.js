document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);
location.href='mailto:deenajoseph28@gmail.com?subject='+encodeURIComponent('Portfolio message from '+d.get('n'))+'&body='+encodeURIComponent(d.get('m')+'\n\n'+d.get('n')+' ('+d.get('e')+')');});


/* ===== ANIMATIONS ===== */
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=(s,r=document)=>[...r.querySelectorAll(s)];

// 1. count-up numbers (start after hero intro)
function count(el){
  const end=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),t0=performance.now(),dur=1800;
  const tick=t=>{const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=(end*e).toFixed(dec); if(p<1)requestAnimationFrame(tick)};
  reduce?el.textContent=end.toFixed(dec):requestAnimationFrame(tick);
}
setTimeout(()=>$('[data-count]').forEach(count),reduce?0:1900);

// 2. scroll-linked word fill for the big statement
const st=document.getElementById('stmt');
if(st){st.innerHTML=st.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span>').join(' ');}
const words=$('.w');
function fill(){
  if(!st)return;const r=st.getBoundingClientRect(),vh=innerHeight;
  const p=Math.min(Math.max((vh*.85-r.top)/(r.height+vh*.35),0),1);
  const n=Math.round(p*words.length);words.forEach((w,i)=>w.classList.toggle('on',i<n));
}

// 3. reveal on scroll
const targets=$('.about>*,.exp h2,.box,.card,.tiles div,.skills h3,.yrs,.svc a,.contact .cwrap>*,.name');
targets.forEach(t=>t.classList.add('rv'));
$('.name').forEach(n=>n.classList.remove('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
targets.forEach(t=>io.observe(t));

// 4. parallax + moving WORKS heading + back-to-top
const dev=document.getElementById('dev'),me=$('.hero .me')[0],wk=document.getElementById('wk'),top=$('.top')[0];
let ticking=false;
function onScroll(){
  const y=scrollY,vh=innerHeight;
  if(!reduce){
    if(y<vh*1.2){ if(dev)dev.style.translate='0 '+(y*.25)+'px'; if(me)me.style.translate='0 '+(y*-.06)+'px'; if(me)me.style.scale=1+y/4000; }
    if(wk){const r=wk.getBoundingClientRect();const p=(vh-r.top)/(vh+r.height);wk.style.translate=((p-.4)*-18)+'vw 0';}
  }
  fill(); top&&top.classList.toggle('show',y>600); ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();

})();
