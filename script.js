const pages=["home","moves","reasons","wishes","gift"],labels=["Home","Moves","Reasons","Wishes","Gift"];
const $=id=>document.getElementById(id);
const who="Reshma Sree";
const photos=['assets/photo1.jpg', 'assets/photo2.jpg', 'assets/photo3.jpg', 'assets/photo4.jpg'];
let pi=0;const showP=()=>{$("ph").src=photos[pi]};
$("prev").onclick=()=>{pi=(pi+photos.length-1)%photos.length;showP()};
$("next").onclick=()=>{pi=(pi+1)%photos.length;showP()};
showP();
$("mus").onclick=()=>{const a=$("au");if(a.paused){a.play().then(()=>$("mus").textContent="Pause music").catch(()=>{})}else{a.pause();$("mus").textContent="Play music"}};
const nav=$("nav");
pages.forEach((p,i)=>{const b=document.createElement("button");b.textContent=labels[i];b.onclick=()=>go(p);b.dataset.p=p;nav.appendChild(b)});
function go(p){
  pages.forEach(x=>$(x).classList.toggle("on",x===p));
  nav.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.p===p));
  $(p).scrollIntoView();
  try{history.replaceState(null,"","#"+p)}catch(e){}
}
$("start").onclick=()=>{go("moves");burst(60)};

const styles={
 Classical:{t:"Grace, expression and tradition in every step.",s:2,h:"95%",c:"#ffc24b"},
 Western:{t:"Bold, energetic and full of attitude.",s:.5,h:"85%",c:"#ff4f8b"}
};
const stage=$("stage");
for(let i=0;i<14;i++){const e=document.createElement("i");e.style.setProperty("--i",i);stage.appendChild(e)}
Object.keys(styles).forEach((k,n)=>{
  const b=document.createElement("button");b.className="ghost";b.textContent=k;
  b.onclick=()=>{const v=styles[k];
    document.querySelectorAll("#styles button").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");
    $("mdesc").textContent=k+": "+v.t;
    stage.querySelectorAll("i").forEach(e=>{e.style.setProperty("--s",v.s+"s");e.style.setProperty("--h",v.h);e.style.setProperty("--c",v.c)})};
  $("styles").appendChild(b);if(!n)b.click()});

const reasons=[["Your classical side","Your classical dance is full of grace and expression."],["Your western side","Your western dance brings huge energy to the floor."],["Since 2024","You have been my favorite dancer since 2024."],["Your inspiration","You inspire everyone who watches you."]];
reasons.forEach(r=>{const b=document.createElement("button");b.className="flip";b.setAttribute("aria-label",r[0]);
  b.innerHTML='<span class="in"><span class="face front">'+r[0]+' 🤍</span><span class="face back">'+r[1]+'</span></span>';
  b.onclick=()=>{b.classList.toggle("open");if(b.classList.contains("open"))setTimeout(()=>burst(14),400);
    $("all").hidden=document.querySelectorAll(".flip.open").length<reasons.length};
  $("cards").appendChild(b)});

for(let i=0;i<5;i++){const f=document.createElement("div");f.className="flame";f.style.animationDelay=(i*.1)+"s";$("cake").appendChild(f)}
$("blow").onclick=()=>{const fl=[...document.querySelectorAll(".flame")];
  fl.forEach((f,i)=>setTimeout(()=>f.classList.add("out"),i*180));
  setTimeout(()=>{burst(90);setTimeout(()=>fl.forEach(f=>f.classList.remove("out")),2500)},fl.length*180)};


$("open").onclick=()=>{
  const m=$("msg");m.textContent="I just wanted to gift you anything, and I thought, why shouldn’t I gift a webpage? So I started making it and gifted it to you 🤍 Happy birthday 🤍";
  m.classList.add("reveal");$("open").style.display="none";burst(220)};

/* confetti */
const cv=$("cv"),cx=cv.getContext("2d");let ps=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener("resize",size);
function burst(n){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  const cols=["#ff4f8b","#ffc24b","#8fd3ff","#ff8a3d","#b58cff"];
  for(let i=0;i<n;i++)ps.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*14,vy:Math.random()*-14-2,r:Math.random()*6+3,c:cols[i%5],l:120+Math.random()*60});
  if(!run){run=true;tick()}
}
function tick(){
  cx.clearRect(0,0,cv.width,cv.height);
  ps=ps.filter(p=>p.l-->0);
  ps.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r,p.r*1.6)});
  if(ps.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}
}
const h=location.hash.slice(1);go(pages.includes(h)?h:"home");
