import{c as Pt,j as e,r as a,u as Lt,C as ke,a as It,F as _t,R as Fe,O as Mt,A as Ft,b as Et,P as Nt,V as ne,d as pt,e as zt,S as Ne,W as ze,f as Tt,M as Ve,g as be,I as Dt,h as Ot,i as Ut,k as Bt,l as Gt,m as qt,n as Vt,o as Ht,p as Ye,q as We,s as Xe,t as Je,v as q,w as Yt,x as ht,y as gt,z as Wt,B as vt,D as Xt,E as Jt,G as Qt,H as Kt,J as Zt,K as $t,L as en,N as tn,Q as nn,T as on,U as sn,X as an,Y as rn,Z as ln}from"./vendor-CWohnw__.js";import{A as pe,m as G,u as Pe,a as He,b as Ee}from"./framer-motion-CQoqgKBs.js";import{R as cn,T as un,P as dn,C as Qe,M as fn}from"./ogl--UM621jO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Se=Pt(i=>({isUnlocked:!1,unlockApp:()=>i({isUnlocked:!0}),lockGame:()=>i({isUnlocked:!1}),activeShop:null,openShop:t=>i({activeShop:t}),closeShop:()=>i({activeShop:null}),activeBackground:"gradient",setBackground:t=>i({activeBackground:t}),activeCursor:"default",setCursor:t=>i({activeCursor:t}),activeTrail:"none",setTrail:t=>i({activeTrail:t})})),mn=({text:i,disabled:t=!1,speed:n=3,className:o="",color:r="#7c7c7c",shineColor:l="#ffffff",direction:d="right"})=>e.jsx("div",{className:`shiny-text ${d} ${t?"disabled":""} ${o}`,style:{"--shiny-speed":`${n}s`,"--base-color":r,"--shine-color":l},children:i}),Ke=i=>(i=i.replace("#",""),[parseInt(i.slice(0,2),16)/255,parseInt(i.slice(2,4),16)/255,parseInt(i.slice(4,6),16)/255]),pn=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  // FIX: Usar coordenadas de clip directas para llenar la pantalla siempre
  gl_Position = vec4(position, 1.0);
}
`,hn=`
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`,xt=a.forwardRef(function({uniforms:t},n){return Lt((o,r)=>{n.current.material.uniforms.uTime.value+=.1*r}),e.jsxs("mesh",{ref:n,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{uniforms:t,vertexShader:pn,fragmentShader:hn})]})});xt.displayName="SilkPlane";const yt=({speed:i=1,scale:t=2,color:n="#ff99cc",noiseIntensity:o=.5,rotation:r=0})=>{const l=a.useRef(),d=a.useMemo(()=>({uSpeed:{value:i},uScale:{value:t},uNoiseIntensity:{value:o},uColor:{value:new ke(...Ke(n))},uRotation:{value:r},uTime:{value:0}}),[]);return a.useEffect(()=>{if(l.current){const h=l.current.material.uniforms;h.uSpeed.value=i,h.uScale.value=t,h.uNoiseIntensity.value=o,h.uColor.value.set(...Ke(n)),h.uRotation.value=r}},[i,t,o,n,r]),a.useEffect(()=>{const c=setInterval(()=>window.dispatchEvent(new Event("resize")),50),f=setTimeout(()=>clearInterval(c),1200);return()=>{clearInterval(c),clearTimeout(f)}},[]),e.jsx(It,{dpr:[1,2],frameloop:"always",resize:{debounce:0},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(xt,{ref:l,uniforms:d})})},gn=()=>{const[i,t]=a.useState(""),[n,o]=a.useState(!1),r=Se(c=>c.unlockApp),l="230824",d=c=>{const f=c.target.value.replace(/\D/g,"");if(f.length>6)return;let u=f;f.length>2&&(u=f.slice(0,2)+"/"+f.slice(2)),f.length>4&&(u=u.slice(0,5)+"/"+f.slice(4)),t(u),o(!1)},h=c=>{c.preventDefault(),i.replace(/\//g,"")===l?r():(o(!0),setTimeout(()=>o(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(yt,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(mn,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:h,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:i,onChange:d,className:n?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(_t,{size:20})})]})]})]})},vn=""+new URL("bridge-CojLCfPY.jpeg",import.meta.url).href,xn=Object.freeze(Object.defineProperty({__proto__:null,default:vn},Symbol.toStringTag,{value:"Module"})),yn=""+new URL("first-D3M4TVfP.jpg",import.meta.url).href,bn=Object.freeze(Object.defineProperty({__proto__:null,default:yn},Symbol.toStringTag,{value:"Module"})),Cn=""+new URL("graduated-B6wsMf9J.jpeg",import.meta.url).href,wn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),jn=""+new URL("halloween-BidyR4aF.jpg",import.meta.url).href,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Rn=""+new URL("miestrella-TqC41RJI.jpg",import.meta.url).href,An=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),kn=""+new URL("murder-olQPuXYs.jpeg",import.meta.url).href,Pn=Object.freeze(Object.defineProperty({__proto__:null,default:kn},Symbol.toStringTag,{value:"Module"})),Ln=""+new URL("rock-DJ9ByMrB.jpeg",import.meta.url).href,In=Object.freeze(Object.defineProperty({__proto__:null,default:Ln},Symbol.toStringTag,{value:"Module"})),_n=""+new URL("sleepy-vWyZnVIh.jpg",import.meta.url).href,Mn=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"})),Fn=""+new URL("sunshine-B5Zoex-L.jpeg",import.meta.url).href,En=Object.freeze(Object.defineProperty({__proto__:null,default:Fn},Symbol.toStringTag,{value:"Module"})),Nn=Object.assign({"../../assets/img/photos/bridge.jpeg":xn,"../../assets/img/photos/first.jpg":bn,"../../assets/img/photos/graduated.jpeg":wn,"../../assets/img/photos/halloween.jpg":Sn,"../../assets/img/photos/miestrella.jpg":An,"../../assets/img/photos/murder.jpeg":Pn,"../../assets/img/photos/rock.jpeg":In,"../../assets/img/photos/sleepy.jpg":Mn,"../../assets/img/photos/sunshine.jpeg":En}),Oe=Object.values(Nn).map(i=>i.default),zn=()=>{const[i,t]=a.useState(null);let n=[...Oe];if(n.length>0)for(;n.length<18;)n=[...n,...Oe];const o=[...n,...n];return e.jsxs("div",{className:"main-container",children:[e.jsx("style",{children:`
        .gallery-container {
          margin-top: 0; /* El espaciado lo controla el contenedor padre ahora */
          width: 100%;
          overflow: hidden;
          position: relative;
          flex-shrink: 0; /* IMPORTANTE: Evita que la galería se aplaste o corte */
          /* Máscara para desvanecer los bordes suavemente */
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .gallery-track {
          display: flex;
          align-items: center;
          gap: 15px;
          width: max-content;
          animation: scrollLeft 60s linear infinite; /* Más lento (60s) */
          padding: 30px 0; /* Espacio vertical para evitar recortes al hacer hover */
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
        .gallery-item {
          height: 220px;
          width: 150px; /* Ancho fijo para consistencia total */
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }
        .gallery-item:hover {
          transform: scale(1.15);
          border-color: #f700ff;
          box-shadow: 0 0 25px rgba(247, 0, 255, 0.5);
          z-index: 10;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}),e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),Oe.length>0&&e.jsx("div",{className:"gallery-container",children:e.jsx("div",{className:"gallery-track",children:o.map((r,l)=>e.jsx("img",{src:r,alt:`Memory ${l}`,className:"gallery-item",onClick:()=>t(r)},l))})}),e.jsx(pe,{children:i&&e.jsx(G.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(10px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},onClick:()=>t(null),style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(0, 0, 0, 0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"},children:e.jsx(G.img,{src:i,initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",damping:25,stiffness:300},style:{maxHeight:"85vh",maxWidth:"90vw",borderRadius:"16px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)"},onClick:r=>r.stopPropagation()})})})]})},Tn=({color1:i="#b117f8",color2:t="#2c0b2e",speed:n=20})=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:`linear-gradient(to bottom, ${i}, ${t})`,animation:`spinGradient ${n}s linear infinite`}}),e.jsx("style",{children:`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `})]}),Dn=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,On=`
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
varying vec2 vUv;

// --- OPTIMIZACIÓN 1: Reducimos las capas a 3.0 para equilibrio calidad/rendimiento ---
#define NUM_LAYER 3.0 
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float tri(float x) { return abs(fract(x) * 2.0 - 1.0); }
float tris(float x) { float t = fract(x); return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0)); }
float trisn(float x) { float t = fract(x); return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0; }
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}
vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      col += star * size * color;
    }
  }
  return col;
}
void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }
  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;
  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
  vec3 col = vec3(0.0);
  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }
  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`,Un=({focal:i=[.5,.5],rotation:t=[1,0],starSpeed:n=0,density:o=1.5,hueShift:r=300,disableAnimation:l=!1,speed:d=.5,mouseInteraction:h=!0,glowIntensity:c=.5,saturation:f=.8,mouseRepulsion:u=!0,repulsionStrength:C=.5,twinkleIntensity:w=.5,rotationSpeed:x=.05,autoCenterRepulsion:v=0,transparent:y=!0,...F})=>{const N=a.useRef(null),z=a.useRef({x:.5,y:.5}),T=a.useRef({x:.5,y:.5}),V=a.useRef(0),D=a.useRef(0);return a.useEffect(()=>{if(!N.current)return;const b=N.current;b.innerHTML="";const g=new cn({alpha:y,premultipliedAlpha:!1,dpr:1}),m=g.gl;y?(m.enable(m.BLEND),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.clearColor(0,0,0,0)):m.clearColor(0,0,0,1);let L;function k(){g.setSize(b.offsetWidth*1,b.offsetHeight*1),L&&(L.uniforms.uResolution.value=new Qe(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height))}window.addEventListener("resize",k,!1),k();const j=new un(m);L=new dn(m,{vertex:Dn,fragment:On,uniforms:{uTime:{value:0},uResolution:{value:new Qe(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height)},uFocal:{value:new Float32Array(i)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:n},uDensity:{value:o},uHueShift:{value:r},uSpeed:{value:d},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:c},uSaturation:{value:f},uMouseRepulsion:{value:u},uTwinkleIntensity:{value:w},uRotationSpeed:{value:x},uRepulsionStrength:{value:C},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:v},uTransparent:{value:y}}});const P=new fn(m,{geometry:j,program:L});let S,U=0;const B=1e3/30;function W(H){if(S=requestAnimationFrame(W),!N.current)return;const K=H-U;if(K<B)return;U=H-K%B,l||(L.uniforms.uTime.value=H*.001,L.uniforms.uStarSpeed.value=H*.001*n/10);const Z=.05;T.current.x+=(z.current.x-T.current.x)*Z,T.current.y+=(z.current.y-T.current.y)*Z,D.current+=(V.current-D.current)*Z,L.uniforms.uMouse.value[0]=T.current.x,L.uniforms.uMouse.value[1]=T.current.y,L.uniforms.uMouseActiveFactor.value=D.current,g.render({scene:P})}S=requestAnimationFrame(W),b.appendChild(m.canvas),m.canvas.style.width="100%",m.canvas.style.height="100%",m.canvas.style.display="block",m.canvas.style.willChange="transform";function ie(H){const K=b.getBoundingClientRect(),Z=(H.clientX-K.left)/K.width,$=1-(H.clientY-K.top)/K.height;z.current={x:Z,y:$},V.current=1}function oe(){V.current=0}return h&&(b.addEventListener("mousemove",ie),b.addEventListener("mouseleave",oe)),()=>{cancelAnimationFrame(S),window.removeEventListener("resize",k),h&&(b.removeEventListener("mousemove",ie),b.removeEventListener("mouseleave",oe)),b&&m.canvas&&b.contains(m.canvas)&&b.removeChild(m.canvas),m.getExtension("WEBGL_lose_context")?.loseContext()}},[i,t,n,o,r,l,d,h,c,f,u,w,x,C,v,y]),e.jsx("div",{ref:N,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},...F})},Bn=Fe.memo(Un);class Gn{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#n;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#j;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#o=!1;#i=!1;isDisposed=!1;#s;#a;#r;#l=new pt;#t={elapsed:0,delta:0};#d;constructor(t){this.#e={...t},this.#h(),this.#g(),this.#v(),this.resize(),this.#x()}#h(){this.camera=new zt,this.cameraFov=this.camera.fov}#g(){this.scene=new Ne}#v(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const t={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new ze(t),this.renderer.outputColorSpace=Tt}#x(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#c.bind(this)),this.#e.size==="parent"&&this.canvas.parentNode&&(this.#a=new ResizeObserver(this.#c.bind(this)),this.#a.observe(this.canvas.parentNode))),this.#s=new IntersectionObserver(this.#b.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#s.observe(this.canvas),document.addEventListener("visibilitychange",this.#f.bind(this))}#y(){window.removeEventListener("resize",this.#c.bind(this)),this.#a?.disconnect(),this.#s?.disconnect(),document.removeEventListener("visibilitychange",this.#f.bind(this))}#b(t){this.#o=t[0].isIntersecting,this.#o?this.#p():this.#u()}#f(){this.#o&&(document.hidden?this.#u():this.#p())}#c(){this.#r&&clearTimeout(this.#r),this.#r=setTimeout(this.resize.bind(this),100)}resize(){let t,n;this.#e.size instanceof Object?(t=this.#e.size.width,n=this.#e.size.height):this.#e.size==="parent"&&this.canvas.parentNode?(t=this.canvas.parentNode.offsetWidth,n=this.canvas.parentNode.offsetHeight):(t=window.innerWidth,n=window.innerHeight),this.size.width=t,this.size.height=n,this.size.ratio=t/n,this.#C(),this.#w(),this.onAfterResize(this.size)}#C(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#m(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#m(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#m(t){const n=Math.tan(Ve.degToRad(this.cameraFov/2))/(this.camera.aspect/t);this.camera.fov=2*Ve.radToDeg(Math.atan(n))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const t=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(t/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#w(){this.renderer.setSize(this.size.width,this.size.height),this.#n?.setSize(this.size.width,this.size.height);let t=window.devicePixelRatio;this.maxPixelRatio&&t>this.maxPixelRatio?t=this.maxPixelRatio:this.minPixelRatio&&t<this.minPixelRatio&&(t=this.minPixelRatio),this.renderer.setPixelRatio(t),this.size.pixelRatio=t}get postprocessing(){return this.#n}set postprocessing(t){this.#n=t,this.render=t.render.bind(t)}#p(){if(this.#i)return;const t=()=>{this.#d=requestAnimationFrame(t),this.#t.delta=this.#l.getDelta(),this.#t.elapsed+=this.#t.delta,this.onBeforeRender(this.#t),this.render(),this.onAfterRender(this.#t)};this.#i=!0,this.#l.start(),t()}#u(){this.#i&&(cancelAnimationFrame(this.#d),this.#i=!1,this.#l.stop())}#j(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse(t=>{t.isMesh&&typeof t.material=="object"&&t.material!==null&&(Object.keys(t.material).forEach(n=>{const o=t.material[n];o!==null&&typeof o=="object"&&typeof o.dispose=="function"&&o.dispose()}),t.material.dispose(),t.geometry.dispose())}),this.scene.clear()}dispose(){this.#y(),this.#u(),this.clear(),this.#n?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const xe=new Map,ve=new be;let Ue=!1;function qn(i){const t={position:new be,nPosition:new be,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...i};return(function(n,o){xe.has(n)||(xe.set(n,o),Ue||(document.body.addEventListener("pointermove",Ze),document.body.addEventListener("pointerleave",et),document.body.addEventListener("click",$e),document.body.addEventListener("touchstart",tt,{passive:!1}),document.body.addEventListener("touchmove",nt,{passive:!1}),document.body.addEventListener("touchend",Le,{passive:!1}),document.body.addEventListener("touchcancel",Le,{passive:!1}),Ue=!0))})(i.domElement,t),t.dispose=()=>{const n=i.domElement;xe.delete(n),xe.size===0&&(document.body.removeEventListener("pointermove",Ze),document.body.removeEventListener("pointerleave",et),document.body.removeEventListener("click",$e),document.body.removeEventListener("touchstart",tt),document.body.removeEventListener("touchmove",nt),document.body.removeEventListener("touchend",Le),document.body.removeEventListener("touchcancel",Le),Ue=!1)},t}function Ze(i){ve.x=i.clientX,ve.y=i.clientY,Vn()}function Vn(){for(const[i,t]of xe){const n=i.getBoundingClientRect();De(n)?(Te(t,n),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t)):t.hover&&!t.touching&&(t.hover=!1,t.onLeave(t))}}function $e(i){ve.x=i.clientX,ve.y=i.clientY;for(const[t,n]of xe){const o=t.getBoundingClientRect();Te(n,o),De(o)&&n.onClick(n)}}function et(){for(const i of xe.values())i.hover&&(i.hover=!1,i.onLeave(i))}function tt(i){if(i.touches.length>0){i.preventDefault(),ve.x=i.touches[0].clientX,ve.y=i.touches[0].clientY;for(const[t,n]of xe){const o=t.getBoundingClientRect();De(o)&&(n.touching=!0,Te(n,o),n.hover||(n.hover=!0,n.onEnter(n)),n.onMove(n))}}}function nt(i){if(i.touches.length>0){i.preventDefault(),ve.x=i.touches[0].clientX,ve.y=i.touches[0].clientY;for(const[t,n]of xe){const o=t.getBoundingClientRect();Te(n,o),De(o)?(n.hover||(n.hover=!0,n.touching=!0,n.onEnter(n)),n.onMove(n)):n.hover&&n.touching&&n.onMove(n)}}}function Le(){for(const[,i]of xe)i.touching&&(i.touching=!1,i.hover&&(i.hover=!1,i.onLeave(i)))}function Te(i,t){const{position:n,nPosition:o}=i;n.x=ve.x-t.left,n.y=ve.y-t.top,o.x=n.x/t.width*2-1,o.y=-n.y/t.height*2+1}function De(i){const{x:t,y:n}=ve,{left:o,top:r,width:l,height:d}=i;return t>=o&&t<=o+l&&n>=r&&n<=r+d}const{randFloat:Hn,randFloatSpread:Be}=Ve,Ge=new ne,ee=new ne,Ie=new ne,Yn=new ne,te=new ne,_e=new ne,we=new ne,Ce=new ne,Me=new ne,it=new ne;class Wn{constructor(t){this.config=t,this.positionData=new Float32Array(3*t.count).fill(0),this.velocityData=new Float32Array(3*t.count).fill(0),this.sizeData=new Float32Array(t.count).fill(1),this.center=new ne,this.#e(),this.setSizes()}#e(){const{config:t,positionData:n}=this;this.center.toArray(n,0);for(let o=1;o<t.count;o++){const r=3*o;n[r]=Be(2*t.maxX),n[r+1]=Be(2*t.maxY),n[r+2]=Be(2*t.maxZ)}}setSizes(){const{config:t,sizeData:n}=this;n[0]=t.size0;for(let o=1;o<t.count;o++)n[o]=Hn(t.minSize,t.maxSize)}update(t){const{config:n,center:o,positionData:r,sizeData:l,velocityData:d}=this;let h=0;n.controlSphere0&&(h=1,Ge.fromArray(r,0),Ge.lerp(o,.1).toArray(r,0),Yn.set(0,0,0).toArray(d,0));for(let c=h;c<n.count;c++){const f=3*c;ee.fromArray(r,f),te.fromArray(d,f),te.y-=t.delta*n.gravity*l[c],te.multiplyScalar(n.friction),te.clampLength(0,n.maxVelocity),ee.add(te),ee.toArray(r,f),te.toArray(d,f)}for(let c=h;c<n.count;c++){const f=3*c;ee.fromArray(r,f),te.fromArray(d,f);const u=l[c];for(let w=c+1;w<n.count;w++){const x=3*w;Ie.fromArray(r,x),_e.fromArray(d,x);const v=l[w];we.copy(Ie).sub(ee);const y=we.length(),F=u+v;if(y<F){const N=F-y;Ce.copy(we).normalize().multiplyScalar(.5*N),Me.copy(Ce).multiplyScalar(Math.max(te.length(),1)),it.copy(Ce).multiplyScalar(Math.max(_e.length(),1)),ee.sub(Ce),te.sub(Me),ee.toArray(r,f),te.toArray(d,f),Ie.add(Ce),_e.add(it),Ie.toArray(r,x),_e.toArray(d,x)}}if(n.controlSphere0){we.copy(Ge).sub(ee);const w=we.length(),x=u+l[0];if(w<x){const v=x-w;Ce.copy(we.normalize()).multiplyScalar(v),Me.copy(Ce).multiplyScalar(Math.max(te.length(),2)),ee.sub(Ce),te.sub(Me)}}Math.abs(ee.x)+u>n.maxX&&(ee.x=Math.sign(ee.x)*(n.maxX-u),te.x=-te.x*n.wallBounce),n.gravity===0?Math.abs(ee.y)+u>n.maxY&&(ee.y=Math.sign(ee.y)*(n.maxY-u),te.y=-te.y*n.wallBounce):ee.y-u<-n.maxY&&(ee.y=-n.maxY+u,te.y=-te.y*n.wallBounce);const C=Math.max(n.maxZ,n.maxSize);Math.abs(ee.z)+u>C&&(ee.z=Math.sign(ee.z)*(n.maxZ-u),te.z=-te.z*n.wallBounce),ee.toArray(r,f),te.toArray(d,f)}}}class Xn extends Vt{constructor(t){super(t),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=n=>{Object.assign(n.uniforms,this.uniforms),n.fragmentShader=`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      `+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("void main() {",`
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
      `);const o=Ht.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);n.fragmentShader=n.fragmentShader.replace("#include <lights_fragment_begin>",o),this.onBeforeCompile2&&this.onBeforeCompile2(n)}}}const Jn={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},je=new Mt;class Qn extends Dt{constructor(t,n={}){const o={...Jn,...n},r=new Ot,l=new Ut(t,.04).fromScene(r).texture,d=new Bt,h=new Xn({envMap:l,...o.materialParams});h.envMapRotation.x=-Math.PI/2,super(d,h,o.count),this.config=o,this.physics=new Wn(o),this.#e(),this.setColors(o.colors)}#e(){this.ambientLight=new Gt(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new qt(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(t){if(Array.isArray(t)&&t.length>1){const n=(function(o){let r,l;function d(h){r=h,l=[],r.forEach(c=>{l.push(new ke(c))})}return d(o),{setColors:d,getColorAt:function(h,c=new ke){const f=Math.max(0,Math.min(1,h))*(r.length-1),u=Math.floor(f),C=l[u];if(u>=r.length-1)return C.clone();const w=f-u,x=l[u+1];return c.r=C.r+w*(x.r-C.r),c.g=C.g+w*(x.g-C.g),c.b=C.b+w*(x.b-C.b),c}}})(t);for(let o=0;o<this.count;o++)this.setColorAt(o,n.getColorAt(o/this.count)),o===0&&this.light.color.copy(n.getColorAt(o/this.count));this.instanceColor.needsUpdate=!0}}update(t){this.physics.update(t);for(let n=0;n<this.count;n++)je.position.fromArray(this.physics.positionData,3*n),n===0&&this.config.followCursor===!1?je.scale.setScalar(0):je.scale.setScalar(this.physics.sizeData[n]),je.updateMatrix(),this.setMatrixAt(n,je.matrix),n===0&&this.light.position.copy(je.position);this.instanceMatrix.needsUpdate=!0}}function Kn(i,t={}){const n=new Gn({canvas:i,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let o;n.renderer.toneMapping=Ft,n.camera.position.set(0,0,20),n.camera.lookAt(0,0,0),n.cameraMaxAspect=1.5,n.resize(),f(t);const r=new Et,l=new Nt(new ne(0,0,1),0),d=new ne;let h=!1;i.style.touchAction="none",i.style.userSelect="none",i.style.webkitUserSelect="none";const c=qn({domElement:i,onMove(){r.setFromCamera(c.nPosition,n.camera),n.camera.getWorldDirection(l.normal),r.ray.intersectPlane(l,d),o.physics.center.copy(d),o.config.controlSphere0=!0},onLeave(){o.config.controlSphere0=!1}});function f(u){o&&(n.clear(),n.scene.remove(o)),o=new Qn(n.renderer,u),n.scene.add(o)}return n.onBeforeRender=u=>{h||o.update(u)},n.onAfterResize=u=>{o.config.maxX=u.wWidth/2,o.config.maxY=u.wHeight/2},{three:n,get spheres(){return o},setCount(u){f({...o.config,count:u})},togglePause(){h=!h},dispose(){c.dispose(),n.dispose()}}}const Zn=({className:i="",followCursor:t=!0,count:n=100,gravity:o=.5,friction:r=.9975,wallBounce:l=.95,colors:d=[0,0,0],...h})=>{const c=a.useRef(null),f=a.useRef(null);return a.useEffect(()=>{const u=c.current;if(u)return f.current=Kn(u,{followCursor:t,count:n,gravity:o,friction:r,wallBounce:l,colors:d,...h}),()=>{f.current&&f.current.dispose()}},[]),a.useEffect(()=>{const u=f.current;if(!u||!u.spheres)return;const C=u.spheres.config;C.gravity=o,C.friction=r,C.wallBounce=l,C.followCursor=t,u.spheres.setColors(d)},[o,r,l,t,d]),a.useEffect(()=>{const u=f.current;u&&u.setCount(n)},[n]),e.jsx("canvas",{className:i,ref:c,style:{width:"100%",height:"100%"}})},$n=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,ei=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,qe=8;function ot(i){let t=i.trim();t.startsWith("#")&&(t=t.slice(1));let n=255,o=255,r=255;return t.length===3?(n=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),r=parseInt(t[2]+t[2],16)):t.length===6&&(n=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16)),new ne(n/255,o/255,r/255)}function ti({linesGradient:i,enabledWaves:t=["top","middle","bottom"],lineCount:n=[6],lineDistance:o=[5],topWavePosition:r,middleWavePosition:l,bottomWavePosition:d={x:2,y:-.7,rotate:-1},animationSpeed:h=1,interactive:c=!1,bendRadius:f=5,bendStrength:u=-.5,mouseDamping:C=.05,mixBlendMode:w="screen"}){const x=a.useRef(null),v=a.useRef(null),y=a.useRef(null),F=a.useRef(new be(-1e3,-1e3)),N=a.useRef(new be(-1e3,-1e3)),z=a.useRef(0),T=a.useRef(0),V=a.useRef(c);a.useEffect(()=>{V.current=c},[c]);const D=S=>{if(typeof n=="number")return n;if(!t.includes(S))return 0;const U=t.indexOf(S);return n[U]??6},b=S=>{if(typeof o=="number")return o;if(!t.includes(S))return .1;const U=t.indexOf(S);return o[U]??.1},g=t.includes("top")?D("top"):0,m=t.includes("middle")?D("middle"):0,L=t.includes("bottom")?D("bottom"):0,k=t.includes("top")?b("top")*.01:.01,j=t.includes("middle")?b("middle")*.01:.01,P=t.includes("bottom")?b("bottom")*.01:.01;return a.useEffect(()=>{if(y.current&&i&&i.length>0){const S=i.slice(0,qe);y.current.uniforms.lineGradientCount.value=S.length,S.forEach((U,I)=>{const B=ot(U);y.current.uniforms.lineGradient.value[I].set(B.x,B.y,B.z)})}},[i]),a.useEffect(()=>{if(!y.current)return;const S=y.current.uniforms;S.animationSpeed.value=h,S.bendRadius.value=f,S.bendStrength.value=u,S.interactive.value=c,S.enableTop.value=t.includes("top"),S.enableMiddle.value=t.includes("middle"),S.enableBottom.value=t.includes("bottom");const U=B=>{if(typeof n=="number")return n;if(!t.includes(B))return 0;const W=t.indexOf(B);return n[W]??6},I=B=>{if(typeof o=="number")return o;if(!t.includes(B))return .1;const W=t.indexOf(B);return o[W]??.1};S.topLineCount.value=t.includes("top")?U("top"):0,S.middleLineCount.value=t.includes("middle")?U("middle"):0,S.bottomLineCount.value=t.includes("bottom")?U("bottom"):0,S.topLineDistance.value=t.includes("top")?I("top")*.01:.01,S.middleLineDistance.value=t.includes("middle")?I("middle")*.01:.01,S.bottomLineDistance.value=t.includes("bottom")?I("bottom")*.01:.01},[h,f,u,c,t,n,o]),a.useEffect(()=>{if(!x.current)return;const S=new Ne,U=new Ye(-1,1,1,-1,0,1);U.position.z=1;const I=new ze({antialias:!0,alpha:!1});I.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),I.domElement.style.width="100%",I.domElement.style.height="100%",x.current.appendChild(I.domElement),v.current=I;const B={iTime:{value:0},iResolution:{value:new ne(1,1,1)},animationSpeed:{value:h},enableTop:{value:t.includes("top")},enableMiddle:{value:t.includes("middle")},enableBottom:{value:t.includes("bottom")},topLineCount:{value:g},middleLineCount:{value:m},bottomLineCount:{value:L},topLineDistance:{value:k},middleLineDistance:{value:j},bottomLineDistance:{value:P},topWavePosition:{value:new ne(r?.x??10,r?.y??.5,r?.rotate??-.4)},middleWavePosition:{value:new ne(l?.x??5,l?.y??0,l?.rotate??.2)},bottomWavePosition:{value:new ne(d?.x??2,d?.y??-.7,d?.rotate??.4)},iMouse:{value:new be(-1e3,-1e3)},interactive:{value:c},bendRadius:{value:f},bendStrength:{value:u},bendInfluence:{value:0},lineGradient:{value:Array.from({length:qe},()=>new ne(1,1,1))},lineGradientCount:{value:0}};if(i&&i.length>0){const ce=i.slice(0,qe);B.lineGradientCount.value=ce.length,ce.forEach((se,E)=>{const X=ot(se);B.lineGradient.value[E].set(X.x,X.y,X.z)})}const W=new We({uniforms:B,vertexShader:$n,fragmentShader:ei});y.current=W;const ie=new Xe(2,2),oe=new Je(ie,W);S.add(oe);const H=new pt,K=()=>{const ce=x.current,se=ce.clientWidth||1,E=ce.clientHeight||1;I.setSize(se,E,!1);const X=I.domElement.width,ue=I.domElement.height;B.iResolution.value.set(X,ue,1)};K();const Z=typeof ResizeObserver<"u"?new ResizeObserver(K):null;Z&&x.current&&Z.observe(x.current);const $=ce=>{if(!V.current)return;const se=I.domElement.getBoundingClientRect(),E=ce.clientX-se.left,X=ce.clientY-se.top,ue=I.getPixelRatio();F.current.set(E*ue,(se.height-X)*ue),z.current=1};window.addEventListener("pointermove",$);let me=0;const fe=()=>{B.iTime.value=H.getElapsedTime(),V.current&&(N.current.lerp(F.current,C),B.iMouse.value.copy(N.current),T.current+=(z.current-T.current)*C,B.bendInfluence.value=T.current),I.render(S,U),me=requestAnimationFrame(fe)};return fe(),()=>{cancelAnimationFrame(me),Z&&x.current&&Z.disconnect(),window.removeEventListener("pointermove",$),ie.dispose(),W.dispose(),I.dispose(),I.domElement.parentElement&&I.domElement.parentElement.removeChild(I.domElement)}},[]),e.jsx("div",{ref:x,className:"floating-lines-container",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",mixBlendMode:w}})}const ni=({topColor:i="#5227FF",bottomColor:t="#FF9FFC",intensity:n=1,rotationSpeed:o=.3,interactive:r=!1,className:l="",glowAmount:d=.005,pillarWidth:h=3,pillarHeight:c=.4,noiseIntensity:f=.5,mixBlendMode:u="screen",pillarRotation:C=0,quality:w="high"})=>{const x=a.useRef(null),v=a.useRef(null),y=a.useRef(null),F=a.useRef(null),N=a.useRef(null),z=a.useRef(null),T=a.useRef(null),V=a.useRef(new be(0,0)),D=a.useRef(0),[b,g]=a.useState(!0);return a.useEffect(()=>{const m=document.createElement("canvas");m.getContext("webgl")||m.getContext("experimental-webgl")||g(!1)},[]),a.useEffect(()=>{if(!x.current||!b)return;const m=x.current,L=m.clientWidth,k=m.clientHeight,j=new Ne;N.current=j;const P=new Ye(-1,1,1,-1,0,1);z.current=P;const S=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),U=S||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let I=w;U&&w==="high"&&(I="medium"),S&&w!=="low"&&(I="low");const B={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},W=B[I]||B.medium;let ie;try{ie=new ze({antialias:!1,alpha:!0,powerPreference:I==="high"?"high-performance":"low-power",precision:W.precision,stencil:!1,depth:!1})}catch{g(!1);return}ie.setSize(L,k),ie.setPixelRatio(W.pixelRatio),x.current.appendChild(ie.domElement),y.current=ie;const oe=_=>{const A=new ke(_);return new ne(A.r,A.g,A.b)},H=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,K=`
      precision ${W.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      const float STEP_MULT = ${W.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${W.iterations};
      const int WAVE_ITER = ${W.waveIterations};

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;
        if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.283185;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;
        
        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;
          
          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }
          
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);
        
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(col * uIntensity, 1.0);
      }
    `,Z=C*Math.PI/180,$=Math.sin(.4),me=Math.cos(.4),fe=new We({vertexShader:H,fragmentShader:K,uniforms:{uTime:{value:0},uResolution:{value:new be(L,k)},uMouse:{value:V.current},uTopColor:{value:oe(i)},uBottomColor:{value:oe(t)},uIntensity:{value:n},uInteractive:{value:r},uGlowAmount:{value:d},uPillarWidth:{value:h},uPillarHeight:{value:c},uNoiseIntensity:{value:f},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(Z)},uPillarRotSin:{value:Math.sin(Z)},uWaveSin:{value:$},uWaveCos:{value:me}},transparent:!0,depthWrite:!1,depthTest:!1});F.current=fe;const ce=new Xe(2,2);T.current=ce;const se=new Je(ce,fe);j.add(se);let E=null;const X=_=>{if(!r||E)return;E=window.setTimeout(()=>{E=null},16);const A=m.getBoundingClientRect(),Y=(_.clientX-A.left)/A.width*2-1,M=-((_.clientY-A.top)/A.height)*2+1;V.current.set(Y,M)};r&&m.addEventListener("mousemove",X,{passive:!0});let ue=performance.now();const J=1e3/(I==="low"?30:60),le=_=>{if(!F.current||!y.current||!N.current||!z.current)return;const A=_-ue;if(A>=J){D.current+=.016*o;const Y=D.current;F.current.uniforms.uTime.value=Y,F.current.uniforms.uRotCos.value=Math.cos(Y*.3),F.current.uniforms.uRotSin.value=Math.sin(Y*.3),y.current.render(N.current,z.current),ue=_-A%J}v.current=requestAnimationFrame(le)};v.current=requestAnimationFrame(le);let p=null;const R=()=>{p&&clearTimeout(p),p=window.setTimeout(()=>{if(!y.current||!F.current||!x.current)return;const _=x.current.clientWidth,A=x.current.clientHeight;y.current.setSize(_,A),F.current.uniforms.uResolution.value.set(_,A)},150)};return window.addEventListener("resize",R,{passive:!0}),()=>{window.removeEventListener("resize",R),r&&m.removeEventListener("mousemove",X),v.current&&cancelAnimationFrame(v.current),y.current&&(y.current.dispose(),y.current.forceContextLoss(),m.contains(y.current.domElement)&&m.removeChild(y.current.domElement)),F.current&&F.current.dispose(),T.current&&T.current.dispose(),y.current=null,F.current=null,N.current=null,z.current=null,T.current=null,v.current=null}},[i,t,n,o,r,d,h,c,f,C,b,w]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          .light-pillar-fallback {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.1);
            color: #888;
            font-size: 14px;
          }

          .light-pillar-container {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        `}),b?e.jsx("div",{ref:x,className:`light-pillar-container ${l}`,style:{mixBlendMode:u}}):e.jsx("div",{className:`light-pillar-fallback ${l}`,style:{mixBlendMode:u},children:"WebGL not supported"})]})},ii=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,oi=`
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uFlakeSize;
uniform float uMinFlakeSize;
uniform float uPixelResolution;
uniform float uSpeed;
uniform float uDepthFade;
uniform float uFarPlane;
uniform vec3 uColor;
uniform float uBrightness;
uniform float uGamma;
uniform float uDensity;
uniform float uVariant;
uniform float uDirection;

// Precomputed constants
#define PI 3.14159265
#define PI_OVER_6 0.5235988
#define PI_OVER_3 1.0471976
#define INV_SQRT3 0.57735027
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10

// Optimized hash - inline multiplication
#define hash(n) (n * (n ^ (n >> 15)))
#define coord3(p) (uvec3(p).x * M1 ^ uvec3(p).y * M2 ^ uvec3(p).z * M3)

// Precomputed camera basis vectors (normalized vec3(1,1,1), vec3(1,0,-1))
const vec3 camK = vec3(0.57735027, 0.57735027, 0.57735027);
const vec3 camI = vec3(0.70710678, 0.0, -0.70710678);
const vec3 camJ = vec3(-0.40824829, 0.81649658, -0.40824829);

// Precomputed branch direction
const vec2 b1d = vec2(0.574, 0.819);

vec3 hash3(uint n) {
  uvec3 hashed = hash(n) * uvec3(1U, 511U, 262143U);
  return vec3(hashed) * F0;
}

float snowflakeDist(vec2 p) {
  float r = length(p);
  float a = atan(p.y, p.x);
  a = abs(mod(a + PI_OVER_6, PI_OVER_3) - PI_OVER_6);
  vec2 q = r * vec2(cos(a), sin(a));
  float dMain = max(abs(q.y), max(-q.x, q.x - 1.0));
  float b1t = clamp(dot(q - vec2(0.4, 0.0), b1d), 0.0, 0.4);
  float dB1 = length(q - vec2(0.4, 0.0) - b1t * b1d);
  float b2t = clamp(dot(q - vec2(0.7, 0.0), b1d), 0.0, 0.25);
  float dB2 = length(q - vec2(0.7, 0.0) - b2t * b1d);
  return min(dMain, min(dB1, dB2)) * 10.0;
}

void main() {
  // Precompute reciprocals to avoid division
  float invPixelRes = 1.0 / uPixelResolution;
  float pixelSize = max(1.0, floor(0.5 + uResolution.x * invPixelRes));
  float invPixelSize = 1.0 / pixelSize;
  
  vec2 fragCoord = floor(gl_FragCoord.xy * invPixelSize);
  vec2 res = uResolution * invPixelSize;
  float invResX = 1.0 / res.x;

  vec3 ray = normalize(vec3((fragCoord - res * 0.5) * invResX, 1.0));
  ray = ray.x * camI + ray.y * camJ + ray.z * camK;

  // Precompute time-based values
  float timeSpeed = uTime * uSpeed;
  float windX = cos(uDirection) * 0.4;
  float windY = sin(uDirection) * 0.4;
  vec3 camPos = (windX * camI + windY * camJ + 0.1 * camK) * timeSpeed;
  vec3 pos = camPos;

  // Precompute ray reciprocal for strides
  vec3 absRay = max(abs(ray), vec3(0.001));
  vec3 strides = 1.0 / absRay;
  vec3 raySign = step(ray, vec3(0.0));
  vec3 phase = fract(pos) * strides;
  phase = mix(strides - phase, phase, raySign);

  // Precompute for intersection test
  float rayDotCamK = dot(ray, camK);
  float invRayDotCamK = 1.0 / rayDotCamK;
  float invDepthFade = 1.0 / uDepthFade;
  float halfInvResX = 0.5 * invResX;
  vec3 timeAnim = timeSpeed * 0.1 * vec3(7.0, 8.0, 5.0);

  float t = 0.0;
  for (int i = 0; i < 128; i++) {
    if (t >= uFarPlane) break;
    
    vec3 fpos = floor(pos);
    uint cellCoord = coord3(fpos);
    float cellHash = hash3(cellCoord).x;

    if (cellHash < uDensity) {
      vec3 h = hash3(cellCoord);
      
      // Optimized flake position calculation
      vec3 sinArg1 = fpos.yzx * 0.073;
      vec3 sinArg2 = fpos.zxy * 0.27;
      vec3 flakePos = 0.5 - 0.5 * cos(4.0 * sin(sinArg1) + 4.0 * sin(sinArg2) + 2.0 * h + timeAnim);
      flakePos = flakePos * 0.8 + 0.1 + fpos;

      float toIntersection = dot(flakePos - pos, camK) * invRayDotCamK;
      
      if (toIntersection > 0.0) {
        vec3 testPos = pos + ray * toIntersection - flakePos;
        float testX = dot(testPos, camI);
        float testY = dot(testPos, camJ);
        vec2 testUV = abs(vec2(testX, testY));
        
        float depth = dot(flakePos - camPos, camK);
        float flakeSize = max(uFlakeSize, uMinFlakeSize * depth * halfInvResX);
        
        // Avoid branching with step functions where possible
        float dist;
        if (uVariant < 0.5) {
          dist = max(testUV.x, testUV.y);
        } else if (uVariant < 1.5) {
          dist = length(testUV);
        } else {
          float invFlakeSize = 1.0 / flakeSize;
          dist = snowflakeDist(vec2(testX, testY) * invFlakeSize) * flakeSize;
        }

        if (dist < flakeSize) {
          float flakeSizeRatio = uFlakeSize / flakeSize;
          float intensity = exp2(-(t + toIntersection) * invDepthFade) *
                           min(1.0, flakeSizeRatio * flakeSizeRatio) * uBrightness;
          gl_FragColor = vec4(uColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
          return;
        }
      }
    }

    float nextStep = min(min(phase.x, phase.y), phase.z);
    vec3 sel = step(phase, vec3(nextStep));
    phase = phase - nextStep + strides * sel;
    t += nextStep;
    pos = mix(pos + ray * nextStep, floor(pos + ray * nextStep + 0.5), sel);
  }

  gl_FragColor = vec4(0.0);
}
`;function si({color:i="#ffffff",flakeSize:t=.01,minFlakeSize:n=1.25,pixelResolution:o=200,speed:r=1.25,depthFade:l=8,farPlane:d=20,brightness:h=1,gamma:c=.4545,density:f=.3,variant:u="square",direction:C=125,className:w="",style:x={}}){const v=a.useRef(null),y=a.useRef(0),F=a.useRef(!0),N=a.useRef(null),z=a.useRef(null),T=a.useRef(null),V=a.useMemo(()=>u==="round"?1:u==="snowflake"?2:0,[u]),D=a.useMemo(()=>{const g=new ke(i);return new ne(g.r,g.g,g.b)},[i]),b=a.useCallback(()=>{T.current&&clearTimeout(T.current),T.current=window.setTimeout(()=>{const g=v.current,m=N.current,L=z.current;if(!g||!m||!L)return;const k=g.offsetWidth,j=g.offsetHeight;m.setSize(k,j),L.uniforms.uResolution.value.set(k,j)},100)},[]);return a.useEffect(()=>{const g=v.current;if(!g)return;const m=new IntersectionObserver(([L])=>{F.current=L.isIntersecting},{threshold:0});return m.observe(g),()=>m.disconnect()},[]),a.useEffect(()=>{const g=v.current;if(!g)return;const m=new Ne,L=new Ye(-1,1,1,-1,0,1),k=new ze({antialias:!1,alpha:!0,premultipliedAlpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1});k.setPixelRatio(Math.min(window.devicePixelRatio,2)),k.setSize(g.offsetWidth,g.offsetHeight),k.setClearColor(0,0),g.appendChild(k.domElement),N.current=k;const j=new We({vertexShader:ii,fragmentShader:oi,uniforms:{uTime:{value:0},uResolution:{value:new be(g.offsetWidth,g.offsetHeight)},uFlakeSize:{value:t},uMinFlakeSize:{value:n},uPixelResolution:{value:o},uSpeed:{value:r},uDepthFade:{value:l},uFarPlane:{value:d},uColor:{value:D.clone()},uBrightness:{value:h},uGamma:{value:c},uDensity:{value:f},uVariant:{value:V},uDirection:{value:C*Math.PI/180}},transparent:!0});z.current=j;const P=new Xe(2,2);m.add(new Je(P,j)),window.addEventListener("resize",b);const S=performance.now(),U=()=>{y.current=requestAnimationFrame(U),F.current&&(j.uniforms.uTime.value=(performance.now()-S)*.001,k.render(m,L))};return U(),()=>{cancelAnimationFrame(y.current),window.removeEventListener("resize",b),T.current&&clearTimeout(T.current),g.contains(k.domElement)&&g.removeChild(k.domElement),k.dispose(),P.dispose(),j.dispose(),N.current=null,z.current=null}},[b]),a.useEffect(()=>{const g=z.current;g&&(g.uniforms.uFlakeSize.value=t,g.uniforms.uMinFlakeSize.value=n,g.uniforms.uPixelResolution.value=o,g.uniforms.uSpeed.value=r,g.uniforms.uDepthFade.value=l,g.uniforms.uFarPlane.value=d,g.uniforms.uBrightness.value=h,g.uniforms.uGamma.value=c,g.uniforms.uDensity.value=f,g.uniforms.uVariant.value=V,g.uniforms.uDirection.value=C*Math.PI/180,g.uniforms.uColor.value.copy(D))},[t,n,o,r,l,d,h,c,f,V,C,D]),e.jsx("div",{ref:v,className:`pixel-snow-container ${w}`,style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",contain:"layout style paint",...x}})}const ai=({floatingLinesConfig:i,lightPillarsConfig:t,ballpitConfig:n,silkConfig:o,galaxyConfig:r,gradientConfig:l,pixelSnowConfig:d})=>{const{activeBackground:h,floatingLinesConfig:c,lightPillarsConfig:f,ballpitConfig:u,silkConfig:C,galaxyConfig:w,gradientConfig:x,pixelSnowConfig:v}=Se(),y=i||c,F=t||f,N=n||u,z=o||C,T=r||w,V=l||x,D=d||v,b=y||{colors:["#f700ff","#bd71ff","#29b1ff"],count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},g=F||{topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},m=N||{colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1},L=z||{color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0},k=T||{density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5},j=V||{color1:"#b117f8",color2:"#2c0b2e",speed:20},P=D||{color:"#ffffff",flakeSize:.01,minFlakeSize:.6,pixelResolution:800,speed:1.9,density:.45,direction:100,brightness:1.5,variant:"snowflake"};return e.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:e.jsxs(pe,{mode:"wait",children:[h==="gradient"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(Tn,{color1:j.color1,color2:j.color2,speed:j.speed})},"gradient"),h==="galaxy"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(Bn,{mouseRepulsion:!1,mouseInteraction:!1,density:k.density,glowIntensity:k.glowIntensity,saturation:k.saturation,hueShift:k.hueShift,twinkleIntensity:k.twinkleIntensity,rotationSpeed:k.rotationSpeed,starSpeed:k.starSpeed,speed:k.speed})},"galaxy"),h==="silk"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(yt,{speed:L.speed,scale:L.scale,color:L.color,noiseIntensity:L.noiseIntensity,rotation:L.rotation})},"silk"),h==="ballpit"&&e.jsxs(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#111111"},children:[" ",e.jsx(Zn,{count:m.count,gravity:m.gravity,friction:m.friction,wallBounce:m.wallBounce,followCursor:m.followCursor,colors:m.colors})]},"ballpit"),h==="floatinglines"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(ti,{linesGradient:b.colors,lineCount:b.count,lineDistance:b.distance,animationSpeed:.5,bendRadius:b.bendRadius,bendStrength:b.bendStrength,enabledWaves:b.enabledWaves,interactive:b.interactive??!1,parallax:b.parallax??!1})},"floatinglines"),h==="lightpillars"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(ni,{topColor:g.topColor,bottomColor:g.bottomColor,intensity:g.intensity,rotationSpeed:g.rotationSpeed,glowAmount:g.glowAmount??.002,pillarWidth:g.pillarWidth,pillarHeight:g.pillarHeight,noiseIntensity:g.noiseIntensity,pillarRotation:g.pillarRotation,interactive:g.interactive??!0,quality:g.quality??"high"})},"lightpillars"),h==="pixelsnow"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(si,{color:P.color,flakeSize:P.flakeSize,minFlakeSize:P.minFlakeSize,pixelResolution:P.pixelResolution,speed:P.speed,density:P.density,direction:P.direction,brightness:P.brightness,variant:P.variant})},"pixelsnow")]})})},ri=({onItemClick:i,isOpen:t,onToggle:n,position:o="left",colors:r=["#B19EEF","#5227FF"],items:l=[],socialItems:d=[],displaySocials:h=!0,displayItemNumbering:c=!0,className:f,logoUrl:u=null,menuButtonColor:C="#fff",openMenuButtonColor:w="#000",accentColor:x="#5227FF",changeMenuColorOnOpen:v=!0,isFixed:y=!1,closeOnClickAway:F=!0,onMenuOpen:N,onMenuClose:z})=>{const[T,V]=a.useState(!1),D=typeof t=="boolean",b=D?t:T,g=a.useRef(!1),m=a.useRef(null),L=a.useRef(null),k=a.useRef([]),j=a.useRef(null),P=a.useRef(null),S=a.useRef(null),U=a.useRef(null),I=a.useRef(null),[B,W]=a.useState(["Menu","Close"]),ie=a.useRef(null),oe=a.useRef(null),H=a.useRef(null),K=a.useRef(null),Z=a.useRef(null),$=a.useRef(null),me=a.useRef(!1),fe=a.useRef(null);a.useLayoutEffect(()=>{const p=q.context(()=>{const R=m.current,_=L.current,A=j.current,Y=P.current,M=S.current,Q=U.current;if(!R||!A||!Y||!M||!Q)return;let ae=[];_&&(ae=Array.from(_.querySelectorAll(".sm-prelayer"))),k.current=ae;const de=o==="left"?-100:100;q.set([R,...ae],{xPercent:de}),q.set(A,{transformOrigin:"50% 50%",rotate:0}),q.set(Y,{transformOrigin:"50% 50%",rotate:90}),q.set(M,{rotate:0,transformOrigin:"50% 50%"}),q.set(Q,{yPercent:0}),$.current&&q.set($.current,{color:C})});return()=>p.revert()},[C,o]);const ce=a.useCallback(()=>{const p=m.current,R=k.current;if(!p)return null;ie.current?.kill(),oe.current&&(oe.current.kill(),oe.current=null),fe.current?.kill();const _=Array.from(p.querySelectorAll(".sm-panel-itemLabel")),A=Array.from(p.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),Y=p.querySelector(".sm-socials-title"),M=Array.from(p.querySelectorAll(".sm-socials-link")),Q=R.map(s=>({el:s,start:Number(q.getProperty(s,"xPercent"))})),ae=Number(q.getProperty(p,"xPercent"));_.length&&q.set(_,{yPercent:140,rotate:10}),A.length&&q.set(A,{"--sm-num-opacity":0}),Y&&q.set(Y,{opacity:0}),M.length&&q.set(M,{y:25,opacity:0});const de=q.timeline({paused:!0});Q.forEach((s,O)=>{de.fromTo(s.el,{xPercent:s.start},{xPercent:0,duration:.8,ease:"power4.out"},O*.07)});const he=(Q.length?(Q.length-1)*.07:0)+(Q.length?.08:0),Re=1;if(de.fromTo(p,{xPercent:ae},{xPercent:0,duration:Re,ease:"power4.out"},he),_.length){const O=he+Re*.15;de.to(_,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},O),A.length&&de.to(A,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},O+.1)}if(Y||M.length){const s=he+Re*.4;Y&&de.to(Y,{opacity:1,duration:.5,ease:"power2.out"},s),M.length&&de.to(M,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{q.set(M,{clearProps:"opacity"})}},s+.04)}return ie.current=de,de},[]),se=a.useCallback(()=>{if(me.current)return;me.current=!0;const p=ce();p?(p.eventCallback("onComplete",()=>{me.current=!1}),p.play(0)):me.current=!1},[ce]),E=a.useCallback(()=>{ie.current?.kill(),ie.current=null,fe.current?.kill();const p=m.current,R=k.current;if(!p)return;const _=[...R,p];oe.current?.kill();const A=o==="left"?-100:100;oe.current=q.to(_,{xPercent:A,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const Y=Array.from(p.querySelectorAll(".sm-panel-itemLabel"));Y.length&&q.set(Y,{yPercent:140,rotate:10});const M=Array.from(p.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));M.length&&q.set(M,{"--sm-num-opacity":0});const Q=p.querySelector(".sm-socials-title"),ae=Array.from(p.querySelectorAll(".sm-socials-link"));Q&&q.set(Q,{opacity:0}),ae.length&&q.set(ae,{y:25,opacity:0}),me.current=!1}})},[o]),X=a.useCallback(p=>{const R=S.current;R&&(H.current?.kill(),p?H.current=q.to(R,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):H.current=q.to(R,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),ue=a.useCallback(p=>{const R=$.current;if(R)if(Z.current?.kill(),v){const _=p?w:C;Z.current=q.to(R,{color:_,delay:.18,duration:.3,ease:"power2.out"})}else q.set(R,{color:C})},[w,C,v]);Fe.useEffect(()=>{if($.current)if(v){const p=g.current?w:C;q.set($.current,{color:p})}else q.set($.current,{color:C})},[v,C,w]);const ye=a.useCallback(p=>{const R=U.current;if(!R)return;K.current?.kill();const _=p?"Menu":"Close",A=p?"Close":"Menu",Y=3,M=[_];let Q=_;for(let re=0;re<Y;re++)Q=Q==="Menu"?"Close":"Menu",M.push(Q);Q!==A&&M.push(A),M.push(A),W(M),q.set(R,{yPercent:0});const ae=M.length,de=(ae-1)/ae*100;K.current=q.to(R,{yPercent:-de,duration:.5+ae*.07,ease:"power4.out"})},[]),J=a.useCallback(()=>{if(D)n&&n(!b);else{const p=!g.current;g.current=p,V(p),p?(N?.(),se()):(z?.(),E()),X(p),ue(p),ye(p)}},[D,t,n,b,se,E,X,ue,ye,N,z]);Fe.useEffect(()=>{D&&(g.current=t,t?(N?.(),se()):(z?.(),E()),X(t),ue(t),ye(t))},[t,D,se,E,X,ue,ye,N,z]);const le=a.useCallback(()=>{D?b&&n&&n(!1):g.current&&(g.current=!1,V(!1),z?.(),E(),X(!1),ue(!1),ye(!1))},[D,b,n,E,X,ue,ye,z]);return Fe.useEffect(()=>{if(!F||!b)return;const p=R=>{const _=m.current&&m.current.contains(R.target),A=$.current&&$.current.contains(R.target),Y=R.target.closest(".shop-overlay");!_&&!A&&!Y&&le()};return document.addEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}},[F,b,le]),e.jsxs("div",{className:(f?f+" ":"")+"staggered-menu-wrapper"+(y?" fixed-wrapper":""),style:x?{"--sm-accent":x}:void 0,"data-position":o,"data-open":b||void 0,children:[e.jsx("div",{ref:L,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let R=[...r&&r.length?r.slice(0,4):["#1e1e22","#35353c"]];if(R.length>=3){const _=Math.floor(R.length/2);R.splice(_,1)}return R.map((_,A)=>e.jsx("div",{className:"sm-prelayer",style:{background:_}},A))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:u?e.jsx("img",{src:u,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:$,className:"sm-toggle","aria-label":b?"Close menu":"Open menu","aria-expanded":b,"aria-controls":"staggered-menu-panel",onClick:J,type:"button",children:[e.jsx("span",{ref:I,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:U,className:"sm-toggle-textInner",children:B.map((p,R)=>e.jsx("span",{className:"sm-toggle-line",children:p},R))})}),e.jsxs("span",{ref:S,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:j,className:"sm-icon-line"}),e.jsx("span",{ref:P,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:m,className:"staggered-menu-panel","aria-hidden":!b,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":c||void 0,children:l&&l.length?l.map((p,R)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:_=>{_.preventDefault(),i&&i(p.id)},"aria-label":p.ariaLabel,"data-index":R+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:p.label})})},p.label+R)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),h&&d&&d.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:d.map((p,R)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:p.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:p.label})},p.label+R))})]})]})})]})},bt=[{name:"Neon",colors:["#f700ff","#bd71ff","#29b1ff"]},{name:"Fire",colors:["#ff0000","#ff7f00","#ffff00"]},{name:"Matrix",colors:["#00ff00","#003300","#ccffcc"]},{name:"Ice",colors:["#00ffff","#ffffff","#0088ff"]},{name:"CMY",colors:["#ff00ff","#ffff00","#00ffff"]}],st={colors:bt[0].colors,count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},li=[{label:"Baja",value:"low"},{label:"Media",value:"medium"},{label:"Alta",value:"high"}],at={topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},rt={colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1},lt={color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0},ct={density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5},ut={color1:"#b117f8",color2:"#2c0b2e",speed:20},dt={color:"#ffffff",flakeSize:.01,minFlakeSize:.6,pixelResolution:800,speed:1.9,density:.45,direction:100,brightness:1.5,depthFade:3,farPlane:50,gamma:.4545,variant:"snowflake"},ci=({onClose:i,floatingLinesConfig:t,setFloatingLinesConfig:n,lightPillarsConfig:o,setLightPillarsConfig:r,ballpitConfig:l,setBallpitConfig:d,silkConfig:h,setSilkConfig:c,galaxyConfig:f,setGalaxyConfig:u,gradientConfig:C,setGradientConfig:w,pixelSnowConfig:x,setPixelSnowConfig:v})=>{const{activeBackground:y,floatingLinesConfig:F,setFloatingLinesConfig:N,lightPillarsConfig:z,setLightPillarsConfig:T,ballpitConfig:V,setBallpitConfig:D,silkConfig:b,setSilkConfig:g,galaxyConfig:m,setGalaxyConfig:L,gradientConfig:k,setGradientConfig:j,pixelSnowConfig:P,setPixelSnowConfig:S}=Se(),U=t||F,I=n||N,B=o||z,W=r||T,ie=l||V,oe=d||D,H=h||b,K=c||g,Z=f||m,$=u||L,me=C||k,fe=w||j,ce=x||P,se=v||S,E=U||st,X=(s,O)=>{I&&I({...E,[s]:O})},ue=s=>{const O=E.enabledWaves,ge=O.includes(s)?O.filter(kt=>kt!==s):[...O,s];X("enabledWaves",ge)},ye=(s,O)=>{const ge=[...E.colors];ge[s]=O,X("colors",ge)},J=B||at,le=(s,O)=>{W?W({...J,[s]:O}):console.warn("setLightPillarsConfig no está definido en el store. Asegúrate de agregarlo.")},p=ie||rt,R=(s,O)=>{oe&&oe({...p,[s]:O})},_=(s,O)=>{const ge=[...p.colors];ge[s]=O,R("colors",ge)},A=H||lt,Y=(s,O)=>{K&&K({...A,[s]:O})},M=Z||ct,Q=(s,O)=>{$&&$({...M,[s]:O})},ae=me||ut,de=(s,O)=>{fe&&fe({...ae,[s]:O})},re=ce||dt,he=(s,O)=>{se&&se({...re,[s]:O})},Re=()=>{y==="floatinglines"&&I?I(st):y==="lightpillars"&&W?W(at):y==="ballpit"&&oe?oe(rt):y==="silk"&&K?K(lt):y==="galaxy"&&$?$(ct):y==="gradient"&&fe?fe(ut):y==="pixelsnow"&&se&&se(dt)};return e.jsxs("div",{className:"bg-customizer-panel",style:{pointerEvents:"auto"},children:[e.jsxs("div",{className:"bg-customizer-header",children:[e.jsx("h3",{children:"Personalizar Fondo"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:Re,className:"reset-btn",title:"Restaurar valores por defecto",children:e.jsx(Yt,{})}),e.jsx("button",{onClick:i,className:"close-btn",children:e.jsx(ht,{})})]})]}),e.jsxs("div",{className:"bg-customizer-content",children:[y==="floatinglines"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Presets de Color"}),e.jsx("div",{className:"presets-grid",children:bt.map(s=>e.jsx("button",{className:"preset-btn",onClick:()=>X("colors",s.colors),style:{background:`linear-gradient(to right, ${s.colors[0]}, ${s.colors[1]}, ${s.colors[2]})`},title:s.name,children:JSON.stringify(E.colors)===JSON.stringify(s.colors)&&e.jsx(gt,{})},s.name))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores Personalizados"}),e.jsx("div",{className:"color-pickers",children:E.colors.map((s,O)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:s,onChange:ge=>ye(O,ge.target.value)}),e.jsx("span",{className:"hex-code",children:s})]},O))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad de Líneas ",e.jsx("span",{children:E.count})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:E.count,onChange:s=>X("count",parseInt(s.target.value))}),e.jsxs("label",{children:["Distancia entre Líneas ",e.jsx("span",{children:E.distance})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:E.distance,onChange:s=>X("distance",parseInt(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Radio de Curvatura ",e.jsx("span",{children:E.bendRadius})]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"0.1",value:E.bendRadius,onChange:s=>X("bendRadius",parseFloat(s.target.value))}),e.jsxs("label",{children:["Fuerza de Curvatura ",e.jsx("span",{children:E.bendStrength})]}),e.jsx("input",{type:"range",min:"-2",max:"2",step:"0.1",value:E.bendStrength,onChange:s=>X("bendStrength",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Capas Activas"}),e.jsx("div",{className:"toggles-row",children:["top","middle","bottom"].map(s=>e.jsx("button",{className:`toggle-btn ${E.enabledWaves.includes(s)?"active":""}`,onClick:()=>ue(s),children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${E.interactive!==!1?"active":""}`,onClick:()=>X("interactive",E.interactive===!1),style:{width:"100%",textAlign:"center"},children:E.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),y==="lightpillars"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:J.topColor,onChange:s=>le("topColor",s.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:J.bottomColor,onChange:s=>le("bottomColor",s.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Intensidad ",e.jsx("span",{children:J.intensity})]}),e.jsx("input",{type:"range",min:"0.1",max:"3",step:"0.1",value:J.intensity,onChange:s=>le("intensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:J.rotationSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:J.rotationSpeed,onChange:s=>le("rotationSpeed",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Ancho del Pilar ",e.jsx("span",{children:J.pillarWidth})]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.5",value:J.pillarWidth,onChange:s=>le("pillarWidth",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[J.pillarRotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:J.pillarRotation,onChange:s=>le("pillarRotation",parseInt(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Altura del Pilar ",e.jsx("span",{children:J.pillarHeight})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:J.pillarHeight,onChange:s=>le("pillarHeight",parseFloat(s.target.value))}),e.jsxs("label",{children:["Intensidad Ruido ",e.jsx("span",{children:J.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:J.noiseIntensity,onChange:s=>le("noiseIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Resplandor ",e.jsx("span",{children:J.glowAmount})]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.02",step:"0.0001",value:J.glowAmount,onChange:s=>le("glowAmount",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Calidad"}),e.jsx("div",{className:"toggles-row",children:li.map(s=>e.jsx("button",{className:`toggle-btn ${J.quality===s.value?"active":""}`,onClick:()=>le("quality",s.value),children:s.label},s.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${J.interactive!==!1?"active":""}`,onClick:()=>le("interactive",J.interactive===!1),style:{width:"100%",textAlign:"center"},children:J.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),y==="ballpit"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsx("div",{className:"color-pickers",children:p.colors.map((s,O)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:s,onChange:ge=>_(O,ge.target.value)}),e.jsx("span",{className:"hex-code",children:s})]},O))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad ",e.jsx("span",{children:p.count})]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:p.count,onChange:s=>R("count",parseInt(s.target.value))}),e.jsxs("label",{children:["Gravedad ",e.jsx("span",{children:p.gravity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:p.gravity,onChange:s=>R("gravity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Fricción ",e.jsx("span",{children:p.friction})]}),e.jsx("input",{type:"range",min:"0.8",max:"1",step:"0.001",value:p.friction,onChange:s=>R("friction",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rebote Pared ",e.jsx("span",{children:p.wallBounce})]}),e.jsx("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:p.wallBounce,onChange:s=>R("wallBounce",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${p.followCursor?"active":""}`,onClick:()=>R("followCursor",!p.followCursor),style:{width:"100%",textAlign:"center"},children:p.followCursor?"Seguir Cursor":"Cursor Libre"})]})]}),y==="silk"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Color"}),e.jsx("div",{className:"color-pickers",children:e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:A.color,onChange:s=>Y("color",s.target.value)}),e.jsx("span",{className:"hex-code",children:A.color})]})})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:A.speed})]}),e.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",value:A.speed,onChange:s=>Y("speed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Escala ",e.jsx("span",{children:A.scale})]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:A.scale,onChange:s=>Y("scale",parseFloat(s.target.value))}),e.jsxs("label",{children:["Ruido ",e.jsx("span",{children:A.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:A.noiseIntensity,onChange:s=>Y("noiseIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[A.rotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"15",value:A.rotation,onChange:s=>Y("rotation",parseInt(s.target.value))})]})]}),y==="galaxy"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Densidad ",e.jsx("span",{children:M.density})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:M.density,onChange:s=>Q("density",parseFloat(s.target.value))}),e.jsxs("label",{children:["Intensidad Brillo ",e.jsx("span",{children:M.glowIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:M.glowIntensity,onChange:s=>Q("glowIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Saturación ",e.jsx("span",{children:M.saturation})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:M.saturation,onChange:s=>Q("saturation",parseFloat(s.target.value))}),e.jsxs("label",{children:["Cambio de Tono (Hue) ",e.jsx("span",{children:M.hueShift})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:M.hueShift,onChange:s=>Q("hueShift",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad Rotación ",e.jsx("span",{children:M.rotationSpeed})]}),e.jsx("input",{type:"range",min:"-0.5",max:"0.5",step:"0.01",value:M.rotationSpeed,onChange:s=>Q("rotationSpeed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad Estrellas ",e.jsx("span",{children:M.starSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:M.starSpeed,onChange:s=>Q("starSpeed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad Animación ",e.jsx("span",{children:M.speed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:M.speed,onChange:s=>Q("speed",parseFloat(s.target.value))})]})]}),y==="gradient"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:ae.color1,onChange:s=>de("color1",s.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:ae.color2,onChange:s=>de("color2",s.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad (segundos) ",e.jsxs("span",{children:[ae.speed,"s"]})]}),e.jsx("input",{type:"range",min:"1",max:"60",step:"1",value:ae.speed,onChange:s=>de("speed",parseInt(s.target.value))})]})]}),y==="pixelsnow"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Color"}),e.jsx("div",{className:"color-pickers",children:e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:re.color,onChange:s=>he("color",s.target.value)}),e.jsx("span",{className:"hex-code",children:re.color})]})})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Variante"}),e.jsx("div",{className:"toggles-row",children:["snowflake","square","round"].map(s=>e.jsx("button",{className:`toggle-btn ${re.variant===s?"active":""}`,onClick:()=>he("variant",s),children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:re.speed})]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:re.speed,onChange:s=>he("speed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Densidad ",e.jsx("span",{children:re.density})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:re.density,onChange:s=>he("density",parseFloat(s.target.value))}),e.jsxs("label",{children:["Dirección ",e.jsxs("span",{children:[re.direction,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:re.direction,onChange:s=>he("direction",parseInt(s.target.value))}),e.jsxs("label",{children:["Tamaño Copo ",e.jsx("span",{children:re.flakeSize})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.05",step:"0.001",value:re.flakeSize,onChange:s=>he("flakeSize",parseFloat(s.target.value))}),e.jsxs("label",{children:["Brillo ",e.jsx("span",{children:re.brightness})]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:re.brightness,onChange:s=>he("brightness",parseFloat(s.target.value))})]})]})]})]})};function ui({children:i,className:t="",onClick:n,mouseX:o,spring:r,distance:l,magnification:d,baseItemSize:h}){const c=a.useRef(null),f=Pe(0),u=He(o,x=>{if(!c.current)return 1/0;const v=c.current.getBoundingClientRect(),y=v.x+v.width/2;return Math.abs(x-y)}),C=He(u,[0,l],[d,h]),w=Ee(C,r);return e.jsx(G.div,{ref:c,style:{width:w,height:w,minWidth:w,minHeight:w},onHoverStart:()=>f.set(1),onHoverEnd:()=>f.set(0),onClick:n,className:`dock-item ${t}`,"aria-haspopup":"true",children:a.Children.map(i,x=>a.cloneElement(x,{isHovered:f}))})}function di({children:i,className:t="",...n}){const{isHovered:o}=n,[r,l]=a.useState(!1);return a.useEffect(()=>{const d=o.on("change",h=>{l(h===1)});return()=>d()},[o]),e.jsx(pe,{children:r&&e.jsx(G.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${t}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:i})})}function fi({children:i,className:t=""}){return e.jsx("div",{className:`dock-icon ${t}`,children:i})}function mi({items:i,className:t="",spring:n={mass:.1,stiffness:300,damping:20},magnification:o=70,distance:r=200,panelHeight:l=68,dockHeight:d=256,baseItemSize:h=50}){const c=Pe(1/0),f=Pe(0),u=a.useMemo(()=>Math.max(d,o+o/2+4),[o,d]),C=He(f,[0,1],[l,u]),w=Ee(C,n);return e.jsx(G.div,{style:{height:w,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(G.div,{onMouseMove:({pageX:x})=>{f.set(1),c.set(x)},onMouseLeave:()=>{f.set(0),c.set(1/0)},className:`dock-panel ${t}`,style:{height:l},role:"toolbar","aria-label":"Application dock",children:i.map((x,v)=>e.jsxs(ui,{onClick:x.onClick,className:x.className,mouseX:c,spring:n,distance:r,magnification:o,baseItemSize:h,children:[e.jsx(fi,{children:x.icon}),e.jsx(di,{children:x.label})]},v))})})}const Ct=""+new URL("apple-cat-BHTFRffC.gif",import.meta.url).href,wt=""+new URL("jump-cat-BVsZ-jsy.gif",import.meta.url).href,jt=""+new URL("rolling-cat-BlLA7Xch.gif",import.meta.url).href,St=""+new URL("duck-BnqypGlP.png",import.meta.url).href,Rt="data:image/png;base64,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",At=""+new URL("skeleton-run-CHzXkBxe.gif",import.meta.url).href,pi={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"},{id:"silk",name:"Silk",description:"Suavidad y elegancia.",price:"Gratis",previewColor:"#ff99cc"},{id:"ballpit",name:"Ball Pit",description:"Física interactiva y relajante.",price:"Gratis",previewColor:"#29b1ff"},{id:"floatinglines",name:"Floating Lines",description:"Ondas de energía interactivas.",price:"Gratis",previewColor:"#bd71ff"},{id:"lightpillars",name:"Light Pillars",description:"Pilares de luz etéreos.",price:"Gratis",previewColor:"#00ffff"},{id:"pixelsnow",name:"Pixel Snow",description:"Nevada suave y distante.",price:"Gratis",previewColor:"#ffffff"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(vt,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(Jt,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:Ct,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:wt,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:jt,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:St,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:Rt,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:At,alt:"Skeleton",style:{width:"40px"}})}]},hi=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Wt,{})},{id:"cursors",label:"Cursores",icon:e.jsx(vt,{})},{id:"trails",label:"Mascotas",icon:e.jsx(Xt,{})}],gi=()=>{const{activeShop:i,openShop:t,closeShop:n,activeBackground:o,setBackground:r,activeCursor:l,setCursor:d,activeTrail:h,setTrail:c}=Se(),[f,u]=a.useState(i);a.useEffect(()=>{i&&u(i)},[i]);const C=pi[f]||[],w=v=>{i==="backgrounds"&&r(v),i==="cursors"&&d(v),i==="trails"&&c(v)},x=v=>i==="backgrounds"?o===v:i==="cursors"?l===v:i==="trails"?h===v:!1;return e.jsx(pe,{children:i&&e.jsxs(G.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:n,style:{position:"absolute",inset:0}}),e.jsxs(G.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:hi.map(v=>e.jsxs("button",{onClick:()=>t(v.id),className:`tab-btn ${i===v.id?"active":""}`,children:[v.icon,e.jsx("span",{children:v.label}),i===v.id&&e.jsx(G.div,{layoutId:"activeTab",className:"active-line"})]},v.id))}),e.jsx("button",{onClick:n,className:"close-btn",children:e.jsx(ht,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",f==="backgrounds"?"Fondos":f==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(pe,{mode:"wait",children:e.jsx(G.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:C.map(v=>e.jsxs("div",{className:`shop-item ${x(v.id)?"equipped":""}`,onClick:()=>w(v.id),children:[e.jsxs("div",{className:"item-preview",style:{background:v.previewColor},children:[v.icon&&e.jsx("div",{className:"preview-icon",children:v.icon}),x(v.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(gt,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:v.name}),e.jsx("p",{children:v.description}),e.jsx("span",{className:"price-tag",children:v.price})]})]},v.id))},f)})})]})]})})},vi=()=>{const{activeTrail:i}=Se(),t=Pe(-100),n=Pe(-100),o={damping:25,stiffness:70,mass:1},r=Ee(t,o),l=Ee(n,o);a.useEffect(()=>{const h=c=>{t.set(c.clientX),n.set(c.clientY)};return window.addEventListener("mousemove",h),()=>window.removeEventListener("mousemove",h)},[t,n]);const d={"apple-cat":Ct,"jump-cat":wt,"rolling-cat":jt,duck:St,pompom:Rt,"skeleton-run":At,ghost:null};return!i||i==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:d[i]?e.jsx(G.img,{src:d[i],alt:"trail",style:{x:r,y:l,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):i==="ghost"?e.jsx(G.div,{style:{x:r,y:l,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},ft=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],xi=({progress:i})=>{const[t,n]=a.useState(0);return a.useEffect(()=>{const o=setInterval(()=>{n(r=>(r+1)%ft.length)},1500);return()=>clearInterval(o)},[]),e.jsxs(G.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[i,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(G.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${i}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(G.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:ft[t]},t)})]})]})},yi=""+new URL("For You I'll Die - JAY SAV-BGIKD8t9.mp3",import.meta.url).href,bi=Object.freeze(Object.defineProperty({__proto__:null,default:yi},Symbol.toStringTag,{value:"Module"})),Ci=""+new URL("From The Start (Sped Up) - Laufey-D4ysqUTI.mp3",import.meta.url).href,wi=Object.freeze(Object.defineProperty({__proto__:null,default:Ci},Symbol.toStringTag,{value:"Module"})),ji=""+new URL("I Really Want to Stay At Your House - Rosa Walton-BKlM1ya2.mp3",import.meta.url).href,Si=Object.freeze(Object.defineProperty({__proto__:null,default:ji},Symbol.toStringTag,{value:"Module"})),Ri=""+new URL("La cena - Las Petunias-BzZvyMnw.mp3",import.meta.url).href,Ai=Object.freeze(Object.defineProperty({__proto__:null,default:Ri},Symbol.toStringTag,{value:"Module"})),ki=""+new URL("Let You Down - Dawid Podsiadło-CMbNZyx7.mp3",import.meta.url).href,Pi=Object.freeze(Object.defineProperty({__proto__:null,default:ki},Symbol.toStringTag,{value:"Module"})),Li=""+new URL("Tek It - Cafuné-DeWKFaBa.mp3",import.meta.url).href,Ii=Object.freeze(Object.defineProperty({__proto__:null,default:Li},Symbol.toStringTag,{value:"Module"})),_i=""+new URL("You and I - d4vd -DLXjY2fT.mp3",import.meta.url).href,Mi=Object.freeze(Object.defineProperty({__proto__:null,default:_i},Symbol.toStringTag,{value:"Module"})),Fi=""+new URL("gourmet - rickyedit-u4-Lg7PG.mp3",import.meta.url).href,Ei=Object.freeze(Object.defineProperty({__proto__:null,default:Fi},Symbol.toStringTag,{value:"Module"})),Ni=""+new URL("una manera perfecta de morir - INTERROGACIÓN AMOR-Bn3KiH1Y.mp3",import.meta.url).href,zi=Object.freeze(Object.defineProperty({__proto__:null,default:Ni},Symbol.toStringTag,{value:"Module"})),mt=Object.assign({"../../assets/songs/For You I'll Die - JAY SAV.mp3":bi,"../../assets/songs/From The Start (Sped Up) - Laufey.mp3":wi,"../../assets/songs/I Really Want to Stay At Your House - Rosa Walton.mp3":Si,"../../assets/songs/La cena - Las Petunias.mp3":Ai,"../../assets/songs/Let You Down - Dawid Podsiadło.mp3":Pi,"../../assets/songs/Tek It - Cafuné.mp3":Ii,"../../assets/songs/You and I - d4vd .mp3":Mi,"../../assets/songs/gourmet - rickyedit.mp3":Ei,"../../assets/songs/una manera perfecta de morir - INTERROGACIÓN AMOR.mp3":zi}),Ae=Object.keys(mt).map(i=>({title:i.split("/").pop().split(".")[0].replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase()),artist:"Only U Playlist",src:mt[i].default}));Ae.length===0&&Ae.push({title:"No Songs Found",artist:"Add mp3 to assets/songs",src:""});const Ti=.1,Di=({visible:i,onClose:t})=>{const n=a.useRef(null),o=a.useRef(null),[r,l]=a.useState(!1),[d,h]=a.useState(0),[c,f]=a.useState(.05),[u,C]=a.useState(!1),[w,x]=a.useState(!1),[v,y]=a.useState(!1),[F,N]=a.useState(0),[z,T]=a.useState(0),V=Ae[d];a.useEffect(()=>{n.current&&(n.current.volume=u?0:Math.pow(c,2)*Ti)},[c,u]),a.useEffect(()=>{r&&n.current&&n.current.play().catch(j=>console.log("Autoplay blocked",j))},[d]),a.useEffect(()=>{i||(x(!1),y(!1))},[i]),a.useEffect(()=>{const j=P=>{i&&(o.current&&o.current.contains(P.target)||P.target.closest(".dock-outer")||t&&t())};return document.addEventListener("mousedown",j),()=>document.removeEventListener("mousedown",j)},[i,t]);const D=()=>{n.current&&(N(n.current.currentTime),T(n.current.duration||0))},b=j=>{const P=parseFloat(j.target.value);N(P),n.current&&(n.current.currentTime=P)},g=()=>{r?n.current.pause():n.current.play(),l(!r)},m=()=>{h(j=>(j+1)%Ae.length)},L=j=>{h(j),l(!0),y(!1)},k=j=>{if(!j||isNaN(j))return"0:00";const P=Math.floor(j/60),S=Math.floor(j%60);return`${P}:${S<10?"0":""}${S}`};return e.jsxs(G.div,{ref:o,className:"music-player-container",initial:"hidden",animate:i?"visible":"hidden",variants:{visible:{opacity:1,y:0,scale:1,pointerEvents:"auto"},hidden:{opacity:0,y:50,scale:.95,pointerEvents:"none"}},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("audio",{ref:n,src:V.src,onEnded:m,onTimeUpdate:D,onLoadedMetadata:D,preload:"auto"}),e.jsx(pe,{children:v&&e.jsx(G.div,{className:"playlist-popup",initial:{opacity:0,y:10,scale:.95,x:"-50%"},animate:{opacity:1,y:0,scale:1,x:"-50%"},exit:{opacity:0,y:10,scale:.95,x:"-50%"},transition:{duration:.2},children:Ae.map((j,P)=>e.jsxs("div",{className:`playlist-item ${P===d?"active":""}`,onClick:()=>L(P),children:[P+1,". ",j.title]},P))})}),e.jsx("div",{className:"compact-info",onClick:()=>y(!v),children:e.jsxs("div",{className:"song-title-wrapper",style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{className:"song-title",children:V.title}),e.jsx(Qt,{size:14,style:{minWidth:14,marginLeft:8,opacity:.6}})]})}),e.jsxs("div",{className:"compact-controls-row",children:[e.jsx("button",{className:"mini-play-btn",onClick:g,children:r?e.jsx(Kt,{size:16}):e.jsx(Zt,{size:16,style:{marginLeft:"2px"}})}),e.jsxs("div",{className:"seek-bar-container",children:[e.jsx("input",{type:"range",min:"0",max:z,value:F,onChange:b,className:"seek-slider"}),e.jsxs("div",{className:"time-display",children:[k(F)," / ",k(z)]})]}),e.jsx("button",{className:"icon-btn",onClick:m,children:e.jsx($t,{size:18})}),e.jsxs("div",{className:"volume-wrapper",children:[e.jsx("button",{className:`icon-btn ${w?"active":""}`,onClick:()=>x(!w),children:u||c===0?e.jsx(en,{size:18}):e.jsx(tn,{size:18})}),e.jsx(pe,{children:w&&e.jsx(G.div,{className:"volume-popup",initial:{opacity:0,scale:.8,x:10},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.8,x:0},children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:u?0:c,onChange:j=>f(parseFloat(j.target.value))})})})]})]})]})},Oi=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],Ui=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function Bi(){const{isUnlocked:i,openShop:t,closeShop:n,lockGame:o,activeBackground:r}=Se(),[l,d]=a.useState(!0),[h,c]=a.useState(!1),[f,u]=a.useState(!1),[C,w]=a.useState(!1),[x,v]=a.useState(!1),[y,F]=a.useState(null),[N,z]=a.useState(null),[T,V]=a.useState(null),[D,b]=a.useState(null),[g,m]=a.useState(null),[L,k]=a.useState(null),[j,P]=a.useState(null),S=H=>{H&&t(H)},U=()=>{f?(u(!1),C&&d(!0)):(v(!1),w(l),d(!1),u(!0))},I=[{icon:e.jsx(nn,{size:22}),label:"Texto",onClick:()=>d(!l)},{icon:e.jsx(on,{size:22}),label:"Música",onClick:()=>c(!h)},{icon:e.jsx(sn,{size:22}),label:"Juego",onClick:()=>console.log("Toggle Game")},{icon:e.jsx(an,{size:22}),label:"Fondo",onClick:U},{icon:e.jsx(rn,{size:22}),label:"Bloquear",onClick:()=>{o&&(n(),c(!1),F(null),z(null),V(null),b(null),m(null),k(null),P(null),o())}}],[B,W]=a.useState(!0),[ie,oe]=a.useState(0);return a.useEffect(()=>{const H=setInterval(()=>{oe(K=>{const Z=K+Math.floor(Math.random()*15)+5;return Z>=100?(clearInterval(H),setTimeout(()=>W(!1),200),100):Z})},200);return()=>clearInterval(H)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(pe,{mode:"wait",children:B&&e.jsx(xi,{progress:ie},"loader")}),e.jsx(pe,{children:!i&&e.jsx(G.div,{initial:{opacity:0,filter:"blur(20px)",scale:1.1},animate:{opacity:1,filter:"blur(0px)",scale:1},exit:{opacity:0,filter:"blur(20px)",scale:1.1,transition:{duration:2}},transition:{duration:2,ease:"easeInOut"},style:{position:"fixed",zIndex:9999,inset:0,background:"#000"},children:e.jsx(gn,{})},"lock-screen")}),e.jsx(pe,{children:i&&e.jsxs(G.div,{className:"app-content",initial:{opacity:0,scale:.95,filter:"blur(10px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},exit:{opacity:0,scale:1.1,filter:"blur(10px)",transition:{duration:1}},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},children:[e.jsx(ai,{floatingLinesConfig:y,lightPillarsConfig:N,ballpitConfig:T,silkConfig:D,galaxyConfig:g,gradientConfig:L,pixelSnowConfig:j}),e.jsx(ri,{isOpen:x,onToggle:H=>{v(H),H&&u(!1)},items:Oi,socialItems:Ui,isFixed:!0,position:"right",onItemClick:S,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(gi,{}),e.jsx(vi,{}),e.jsx(pe,{children:l&&e.jsx(G.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},style:{position:"absolute",width:"100%",height:"100%",zIndex:10},children:e.jsx(zn,{})})}),e.jsx(pe,{children:f&&["floatinglines","lightpillars","ballpit","silk","galaxy","gradient","pixelsnow"].includes(r)&&e.jsx(G.div,{initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:50},transition:{duration:.3},style:{position:"absolute",top:0,right:0,zIndex:200,height:"100%",pointerEvents:"auto"},children:e.jsx("div",{style:{height:"100%"},children:e.jsx(ci,{onClose:U,floatingLinesConfig:y,setFloatingLinesConfig:F,lightPillarsConfig:N,setLightPillarsConfig:z,ballpitConfig:T,setBallpitConfig:V,silkConfig:D,setSilkConfig:b,galaxyConfig:g,setGalaxyConfig:m,gradientConfig:L,setGradientConfig:k,pixelSnowConfig:j,setPixelSnowConfig:P})})})}),e.jsx(Di,{visible:h,onClose:()=>c(!1)}),e.jsx(mi,{items:I,panelHeight:60,baseItemSize:45,magnification:60})]},"main-content")})]})}ln.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(Bi,{})}));
