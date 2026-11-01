const P={blue:'#2c6bd6',red:'#d23b30',yel:'#ffc93c',grn:'#1f8a50'};
const CL={r:'#d23b30',b:'#2c6bd6',y:'#ffc93c',g:'#1f8a50',w:'#f4f6fa',k:'#1c2540',t:'#bfe3ff',s:'#c3cddb'};
const art=rows=>{const W=20,H=22,n=rows[0].length,ox=(320-n*W)/2;let o='';
 for(let r=rows.length-1;r>=0;r--){const y=150-(rows.length-r)*H;let i=0;
  while(i<n){const ch=rows[r][i];if(ch==='.'){i++;continue}let j=i;while(j<n&&rows[r][j]===ch)j++;const f=CL[ch],x=ox+i*W,w=(j-i)*W;
   for(let q=i;q<j;q++)o+=`<rect x="${ox+q*W+4}" y="${y-5}" width="12" height="8" rx="3" fill="${f}"/>`;
   o+=`<rect x="${x}" y="${y}" width="${w}" height="${H}" rx="3" fill="${f}"/><rect x="${x}" y="${y}" width="${w}" height="3" rx="1.5" fill="#fff" opacity=".28"/><rect x="${x}" y="${y+H-5}" width="${w}" height="5" rx="2" fill="#000" opacity=".16"/>`;i=j}}
 return o};
const thumb=(a,rows)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="18" cy="18" r="10" fill="#fff" opacity=".12"/><circle cx="15" cy="15" r="3.5" fill="#fff" opacity=".18"/></pattern><linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs><rect width="320" height="180" fill="${a}"/><rect width="320" height="180" fill="url(#p)"/><rect width="320" height="180" fill="url(#d)"/><rect y="150" width="320" height="30" fill="#000" opacity=".22"/><rect y="150" width="320" height="3" fill="#fff" opacity=".25"/>${art(rows)}</svg>`);
const R={
 robot:['...rr...','..bbbb..','..wbbw..','..bkkb..','.rrrrrr.','.gg..gg.'],
 car:['...rrrrrr...','..rttrrttr..','rrrrrrrrrrrr','.kk......kk.'],
 books:['..rrwwrr..','.yyywwyyy.','bbbbwwbbbb'],
 chat:['.bbbbbbbbb.','.bbwbwbwbb.','.bbbbbbbbb.','.....b.....'],
 laptop:['.kkkkkkkk.','.kggggggk.','.kgyggygk.','.kggggggk.','kkkkkkkkkk','ssssssssss'],
 stage:['....yy....','....ww....','..yywwgg..','..yywwgg..'],
 phone:['..kkkk..','..kyyk..','..kwwk..','..krrk..','..kkkk..']};
const projects=[
 {t:'StudyBuddy AI',c:'AI',d:'A chatbot that turns lecture notes into quick quizzes.',tags:['Python','Gemini API'],a:P.yel,m:R.robot,i:'brick-built robot'},
 {t:'CampusRide',c:'Mobile',d:'Find and share rides between campus and the city.',tags:['Flutter','Firebase'],a:P.blue,m:R.car,i:'brick-built car'},
 {t:'NotesHub',c:'Web',d:'A shared library of semester notes, searchable by subject.',tags:['React','Firebase'],a:P.grn,m:R.books,i:'stack of brick books'},
 {t:'SignSpeak',c:'AI',d:'Reads basic hand signs through the camera and shows text.',tags:['TensorFlow','JS'],a:P.red,m:R.chat,i:'brick speech bubble'}];
const events=[
 {t:'Build with AI Workshop',d:'15 Nov 2026',k:'Workshop',v:'Seminar Hall',x:'Build your first app with the Gemini API in one afternoon.',a:P.blue,m:R.laptop,i:'brick laptop'},
 {t:'DevFest MMMUT 2026',d:'6 Dec 2026',k:'Conference',v:'Main Auditorium',x:'Talks, demos and a project showcase by students and mentors.',a:P.red,m:R.stage,i:'brick podium'},
 {t:'Flutter Study Jam',d:'20 Dec 2026',k:'Online',v:'Google Meet',x:'Learn Flutter step by step and publish a small app.',a:P.grn,m:R.phone,i:'brick phone'}];
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cats=['All',...new Set(projects.map(p=>p.c))];
function showProjects(f='All'){
 $('#filters').innerHTML=cats.map(c=>`<button aria-pressed="${c===f}" data-c="${c}">${c}</button>`).join('');
 $('#project-grid').innerHTML=projects.filter(p=>f==='All'||p.c===f).map(p=>`<article class="card" style="--c:${p.a}"><img src="${thumb(p.a,p.m)}" alt="${p.t}, illustrated as a ${p.i}" width="320" height="180"><div class="body"><span class="meta">${p.c}</span><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div></article>`).join('');
}
$('#filters').onclick=e=>{if(e.target.dataset.c){showProjects(e.target.dataset.c);$('#filters [aria-pressed=true]').focus()}};
showProjects();
$('#event-grid').innerHTML=events.map(e=>`<article class="card" style="--c:${e.a}"><div class="poster"><img src="${thumb(e.a,e.m)}" alt="${e.t}, illustrated as a ${e.i}" width="320" height="180"><span class="dt" aria-hidden="true"><b>${e.d.split(' ')[0]}</b>${e.d.split(' ')[1]}</span></div><div class="body"><span class="meta">${e.d} · ${e.k} · ${e.v}</span><h3>${e.t}</h3><p>${e.x}</p><a class="btn line" href="#join" data-ev="${e.t}">Register</a></div></article>`).join('');
let picked='';
$('#event-grid').onclick=e=>{const a=e.target.closest('[data-ev]');if(!a)return;picked=a.dataset.ev;const p=$('#picked');p.hidden=false;p.textContent='Registering for: '+picked;setTimeout(()=>$('#form [name=name]').focus({preventScroll:true}),700)};
const menu=$('#menu'),burger=$('#burger');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.onclick=e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}};
let dark=matchMedia('(prefers-color-scheme:dark)').matches;
const setTheme=()=>{document.documentElement.dataset.theme=dark?'dark':'light';const t=$('#theme');t.setAttribute('aria-pressed',dark);t.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');t.textContent=dark?'☀':'◐'};
try{const s=localStorage.getItem('gdg-theme');if(s)dark=s==='dark'}catch{}
setTheme();$('#theme').onclick=()=>{dark=!dark;setTheme();try{localStorage.setItem('gdg-theme',dark?'dark':'light')}catch{}};
const closeMenu=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();burger.focus()}});
document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!burger.contains(e.target))closeMenu()});
function count(el,to){const t0=performance.now();(function f(n){const p=Math.min((n-t0)/1200,1);el.textContent=Math.round(to*p);if(p<1)requestAnimationFrame(f)})(t0)}
const seen=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){seen.unobserve(e.target);count(e.target,+e.target.dataset.to)}}));
fetch('https://gdg-project-backend.onrender.com').then(r=>r.json()).then(d=>{if(d.count)$('#members').dataset.to=d.count}).catch(()=>{$('#members').dataset.to=128}).finally(()=>document.querySelectorAll('[data-to]').forEach(el=>seen.observe(el)));
$('#form').onsubmit=async e=>{
 e.preventDefault();const f=e.target,m=$('#msg'),d=Object.fromEntries(new FormData(f));d.event=picked;
 f.querySelectorAll('input').forEach(i=>i.classList.remove('bad'));
 const bad=n=>{f[n].classList.add('bad');f[n].focus()};
 if(d.name.trim().length<2){m.className='err';m.textContent='Enter your full name.';return bad('name')}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){m.className='err';m.textContent='Enter a valid email address.';return bad('email')}
 m.className='';m.textContent='Sending...';
 try{
  const r=await fetch('https://gdg-project-backend.onrender.com',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  const j=await r.json();
  if(!r.ok){m.className='err';m.textContent=j.error;return}
  m.className='ok';m.textContent=j.message;f.reset();picked='';$('#picked').hidden=true;
  if(j.count)$('#members').textContent=j.count;
 }catch{m.className='ok';m.textContent='Welcome aboard, '+d.name.trim().split(' ')[0]+'! Demo mode: your details were checked but not sent.';f.reset();picked='';$('#picked').hidden=true}
};


if(matchMedia('(hover:hover)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 const sel='.card,.benefits li,.tile';
 document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest(sel);if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');});
 document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest(sel);if(c&&!c.contains(e.relatedTarget))c.style.transform=''});
}

(function(){
 const cols={b:'#2c6bd6',r:'#d23b30',y:'#ffc93c',g:'#1f8a50'},keys=Object.keys(cols),names=['Blue','Red','Yellow','Green'];
 const art=['..b.yr..','.b..y.r.','b..y...r','.b.y..r.','..by.r..'].join('');
 const plate=$('#plate'),pal=$('#palette');let cur='b';
 const paint=(b,k)=>{if(k&&k!=='.'){b.dataset.k=k;b.style.setProperty('--c',cols[k])}else{delete b.dataset.k;b.style.removeProperty('--c')}};
 plate.innerHTML=[...art].map((_,i)=>`<button class="stud" aria-label="Stud ${i+1}"></button>`).join('');
 plate.querySelectorAll('.stud').forEach((b,i)=>paint(b,art[i]));
 pal.innerHTML=keys.map((k,i)=>`<button class="sw" style="--c:${cols[k]}" data-k="${k}" aria-label="${names[i]}" aria-pressed="${k===cur}"></button>`).join('')+'<button class="clear" id="clear">Clear</button>';
 plate.onclick=e=>{const b=e.target.closest('.stud');if(b)paint(b,b.dataset.k===cur?'':cur)};
 pal.onclick=e=>{const s=e.target.closest('.sw');if(s){cur=s.dataset.k;pal.querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed',x===s))}else if(e.target.id==='clear')plate.querySelectorAll('.stud').forEach(b=>paint(b,''))};
})();

// topics strip
(function(){const T=['Web','Android','Flutter','Firebase','Gemini API','Cloud','AI and ML','Open Source','Hackathons','DevFest','Study Jams','Career Talks'];
 $('#track').innerHTML=[...T,...T].map(t=>`<span>${t}</span>`).join('')})();
// scroll: reveal, progress bar, active link, back to top, hero parallax
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=!reduce&&'IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null;
function reveal(){if(!io)return;document.querySelectorAll('.sec h2,.note,.about-text,.stage,.benefits li,.tile,.chips,.card,details,.quote,.shot,.cta>*').forEach(e=>{if(e.dataset.rv)return;e.dataset.rv=1;e.style.setProperty('--d',(e.matches('.card,.benefits li,.tile,.quote')?[...e.parentNode.children].indexOf(e)*.08:0)+'s');e.classList.add('rv');io.observe(e)})}
reveal();['#project-grid','#event-grid'].forEach(q=>new MutationObserver(reveal).observe($(q),{childList:true}));
(function(){const bar=$('#bar'),up=$('#toTop'),art=$('.hero-art'),links=[...document.querySelectorAll('#menu a[href^="#"]:not(.menu-cta)')],secs=links.map(a=>$(a.getAttribute('href')));
 const on=()=>{const y=scrollY,mx=document.documentElement.scrollHeight-innerHeight;bar.style.width=(mx>0?y/mx*100:0)+'%';up.classList.toggle('show',y>600);let c=0;secs.forEach((q,i)=>{if(q&&q.getBoundingClientRect().top<=120)c=i});links.forEach((a,i)=>a.classList.toggle('act',i===c&&y>20))};
 addEventListener('scroll',on,{passive:true});on()})();
