import{c as ut,j as e,r as a,u as dt,C as Ce,a as ft,F as mt,R as ze,O as pt,A as ht,b as vt,P as gt,V as U,d as Qe,e as yt,S as Oe,W as De,f as xt,M as Ne,g as se,I as bt,h as wt,i as Rt,k as St,l as At,m as Ct,n as jt,o as Lt,p as Ke,q as Ze,s as $e,t as et,v as S,w as _t,x as Mt,y as Pt,z as tt,B as kt,D as It,E as Et,G as Tt,H as zt,J as Nt,K as Ft,L as Ot,N as Dt,Q as Ut,T as Bt,U as Gt,X as qt,Y as Yt}from"./vendor-DlhAFS-x.js";import{A as ae,m as L,u as ye,a as Fe,b as je}from"./framer-motion-BjzNwZFG.js";import{R as Ht,T as Wt,P as Vt,C as Ue,M as Xt}from"./ogl--UM621jO.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const xe=ut(o=>({isUnlocked:!1,unlockApp:()=>o({isUnlocked:!0}),lockGame:()=>o({isUnlocked:!1}),activeShop:null,openShop:i=>o({activeShop:i}),closeShop:()=>o({activeShop:null}),activeBackground:"gradient",setBackground:i=>o({activeBackground:i}),activeCursor:"default",setCursor:i=>o({activeCursor:i}),activeTrail:"none",setTrail:i=>o({activeTrail:i})})),Jt=({text:o,disabled:i=!1,speed:t=3,className:n="",color:s="#7c7c7c",shineColor:r="#ffffff",direction:d="right"})=>e.jsx("div",{className:`shiny-text ${d} ${i?"disabled":""} ${n}`,style:{"--shiny-speed":`${t}s`,"--base-color":s,"--shine-color":r},children:o}),Qt=o=>(o=o.replace("#",""),[parseInt(o.slice(0,2),16)/255,parseInt(o.slice(2,4),16)/255,parseInt(o.slice(4,6),16)/255]),Kt=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  // FIX: Usar coordenadas de clip directas para llenar la pantalla siempre
  gl_Position = vec4(position, 1.0);
}
`,Zt=`
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
`,it=a.forwardRef(function({uniforms:i},t){return dt((n,s)=>{t.current.material.uniforms.uTime.value+=.1*s}),e.jsxs("mesh",{ref:t,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{uniforms:i,vertexShader:Kt,fragmentShader:Zt})]})});it.displayName="SilkPlane";const ot=({speed:o=1,scale:i=2,color:t="#ff99cc",noiseIntensity:n=.5,rotation:s=0})=>{const r=a.useRef(),d=a.useMemo(()=>({uSpeed:{value:o},uScale:{value:i},uNoiseIntensity:{value:n},uColor:{value:new Ce(...Qt(t))},uRotation:{value:s},uTime:{value:0}}),[o,i,n,t,s]);return a.useEffect(()=>{const l=setInterval(()=>window.dispatchEvent(new Event("resize")),50),c=setTimeout(()=>clearInterval(l),1200);return()=>{clearInterval(l),clearTimeout(c)}},[]),e.jsx(ft,{dpr:[1,2],frameloop:"always",resize:{debounce:0},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(it,{ref:r,uniforms:d})})},$t=()=>{const[o,i]=a.useState(""),[t,n]=a.useState(!1),s=xe(l=>l.unlockApp),r="230824",d=l=>{const c=l.target.value.replace(/\D/g,"");if(c.length>6)return;let m=c;c.length>2&&(m=c.slice(0,2)+"/"+c.slice(2)),c.length>4&&(m=m.slice(0,5)+"/"+c.slice(4)),i(m),n(!1)},p=l=>{l.preventDefault(),o.replace(/\//g,"")===r?s():(n(!0),setTimeout(()=>n(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(ot,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(Jt,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:p,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:o,onChange:d,className:t?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(mt,{size:20})})]})]})]})},ei=""+new URL("bridge-CojLCfPY.jpeg",import.meta.url).href,ti=Object.freeze(Object.defineProperty({__proto__:null,default:ei},Symbol.toStringTag,{value:"Module"})),ii=""+new URL("first-D3M4TVfP.jpg",import.meta.url).href,oi=Object.freeze(Object.defineProperty({__proto__:null,default:ii},Symbol.toStringTag,{value:"Module"})),ni=""+new URL("graduated-B6wsMf9J.jpeg",import.meta.url).href,si=Object.freeze(Object.defineProperty({__proto__:null,default:ni},Symbol.toStringTag,{value:"Module"})),ai=""+new URL("halloween-BidyR4aF.jpg",import.meta.url).href,ri=Object.freeze(Object.defineProperty({__proto__:null,default:ai},Symbol.toStringTag,{value:"Module"})),li=""+new URL("miestrella-TqC41RJI.jpg",import.meta.url).href,ci=Object.freeze(Object.defineProperty({__proto__:null,default:li},Symbol.toStringTag,{value:"Module"})),ui=""+new URL("murder-olQPuXYs.jpeg",import.meta.url).href,di=Object.freeze(Object.defineProperty({__proto__:null,default:ui},Symbol.toStringTag,{value:"Module"})),fi=""+new URL("rock-DJ9ByMrB.jpeg",import.meta.url).href,mi=Object.freeze(Object.defineProperty({__proto__:null,default:fi},Symbol.toStringTag,{value:"Module"})),pi=""+new URL("sleepy-vWyZnVIh.jpg",import.meta.url).href,hi=Object.freeze(Object.defineProperty({__proto__:null,default:pi},Symbol.toStringTag,{value:"Module"})),vi=""+new URL("sunshine-B5Zoex-L.jpeg",import.meta.url).href,gi=Object.freeze(Object.defineProperty({__proto__:null,default:vi},Symbol.toStringTag,{value:"Module"})),yi=Object.assign({"../../assets/img/photos/bridge.jpeg":ti,"../../assets/img/photos/first.jpg":oi,"../../assets/img/photos/graduated.jpeg":si,"../../assets/img/photos/halloween.jpg":ri,"../../assets/img/photos/miestrella.jpg":ci,"../../assets/img/photos/murder.jpeg":di,"../../assets/img/photos/rock.jpeg":mi,"../../assets/img/photos/sleepy.jpg":hi,"../../assets/img/photos/sunshine.jpeg":gi}),ke=Object.values(yi).map(o=>o.default),xi=()=>{const[o,i]=a.useState(null);let t=[...ke];if(t.length>0)for(;t.length<18;)t=[...t,...ke];const n=[...t,...t];return e.jsxs("div",{className:"main-container",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),ke.length>0&&e.jsx("div",{className:"gallery-container",children:e.jsx("div",{className:"gallery-track",children:n.map((s,r)=>e.jsx("img",{src:s,alt:`Memory ${r}`,className:"gallery-item",onClick:()=>i(s)},r))})}),e.jsx(ae,{children:o&&e.jsx(L.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(10px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},onClick:()=>i(null),style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(0, 0, 0, 0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"},children:e.jsx(L.img,{src:o,initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",damping:25,stiffness:300},style:{maxHeight:"85vh",maxWidth:"90vw",borderRadius:"16px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)"},onClick:s=>s.stopPropagation()})})})]})},bi=()=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:"linear-gradient(to bottom, #b117f8, #2c0b2e)",animation:"spinGradient 20s linear infinite"}}),e.jsx("style",{children:`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `})]}),wi=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,Ri=`
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
`,Si=({focal:o=[.5,.5],rotation:i=[1,0],starSpeed:t=0,density:n=1.5,hueShift:s=300,disableAnimation:r=!1,speed:d=.5,mouseInteraction:p=!0,glowIntensity:l=.5,saturation:c=.8,mouseRepulsion:m=!0,repulsionStrength:b=.5,twinkleIntensity:g=.5,rotationSpeed:h=.05,autoCenterRepulsion:f=0,transparent:x=!0,...w})=>{const M=a.useRef(null),V=a.useRef({x:.5,y:.5}),k=a.useRef({x:.5,y:.5}),B=a.useRef(0),J=a.useRef(0);return a.useEffect(()=>{if(!M.current)return;const _=M.current;_.innerHTML="";const Q=new Ht({alpha:x,premultipliedAlpha:!1,dpr:1}),v=Q.gl;x?(v.enable(v.BLEND),v.blendFunc(v.SRC_ALPHA,v.ONE_MINUS_SRC_ALPHA),v.clearColor(0,0,0,0)):v.clearColor(0,0,0,1);let T;function K(){Q.setSize(_.offsetWidth*1,_.offsetHeight*1),T&&(T.uniforms.uResolution.value=new Ue(v.canvas.width,v.canvas.height,v.canvas.width/v.canvas.height))}window.addEventListener("resize",K,!1),K();const R=new Wt(v);T=new Vt(v,{vertex:wi,fragment:Ri,uniforms:{uTime:{value:0},uResolution:{value:new Ue(v.canvas.width,v.canvas.height,v.canvas.width/v.canvas.height)},uFocal:{value:new Float32Array(o)},uRotation:{value:new Float32Array(i)},uStarSpeed:{value:t},uDensity:{value:n},uHueShift:{value:s},uSpeed:{value:d},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:l},uSaturation:{value:c},uMouseRepulsion:{value:m},uTwinkleIntensity:{value:g},uRotationSpeed:{value:h},uRepulsionStrength:{value:b},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:f},uTransparent:{value:x}}});const D=new Xt(v,{geometry:R,program:T});let ie,q=0;const P=1e3/30;function z(H){if(ie=requestAnimationFrame(z),!M.current)return;const ee=H-q;if(ee<P)return;q=H-ee%P,r||(T.uniforms.uTime.value=H*.001,T.uniforms.uStarSpeed.value=H*.001*t/10);const te=.05;k.current.x+=(V.current.x-k.current.x)*te,k.current.y+=(V.current.y-k.current.y)*te,J.current+=(B.current-J.current)*te,T.uniforms.uMouse.value[0]=k.current.x,T.uniforms.uMouse.value[1]=k.current.y,T.uniforms.uMouseActiveFactor.value=J.current,Q.render({scene:D})}ie=requestAnimationFrame(z),_.appendChild(v.canvas),v.canvas.style.width="100%",v.canvas.style.height="100%",v.canvas.style.display="block",v.canvas.style.willChange="transform";function $(H){const ee=_.getBoundingClientRect(),te=(H.clientX-ee.left)/ee.width,ne=1-(H.clientY-ee.top)/ee.height;V.current={x:te,y:ne},B.current=1}function Y(){B.current=0}return p&&(_.addEventListener("mousemove",$),_.addEventListener("mouseleave",Y)),()=>{cancelAnimationFrame(ie),window.removeEventListener("resize",K),p&&(_.removeEventListener("mousemove",$),_.removeEventListener("mouseleave",Y)),_&&v.canvas&&_.contains(v.canvas)&&_.removeChild(v.canvas),v.getExtension("WEBGL_lose_context")?.loseContext()}},[o,i,t,n,s,r,d,p,l,c,m,g,h,b,f,x]),e.jsx("div",{ref:M,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},...w})},Ai=ze.memo(Si);class Ci{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#i;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#S;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#n=!1;#o=!1;isDisposed=!1;#s;#a;#r;#l=new Qe;#t={elapsed:0,delta:0};#d;constructor(i){this.#e={...i},this.#h(),this.#v(),this.#g(),this.resize(),this.#y()}#h(){this.camera=new yt,this.cameraFov=this.camera.fov}#v(){this.scene=new Oe}#g(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const i={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new De(i),this.renderer.outputColorSpace=xt}#y(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#c.bind(this)),this.#e.size==="parent"&&this.canvas.parentNode&&(this.#a=new ResizeObserver(this.#c.bind(this)),this.#a.observe(this.canvas.parentNode))),this.#s=new IntersectionObserver(this.#b.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#s.observe(this.canvas),document.addEventListener("visibilitychange",this.#f.bind(this))}#x(){window.removeEventListener("resize",this.#c.bind(this)),this.#a?.disconnect(),this.#s?.disconnect(),document.removeEventListener("visibilitychange",this.#f.bind(this))}#b(i){this.#n=i[0].isIntersecting,this.#n?this.#p():this.#u()}#f(){this.#n&&(document.hidden?this.#u():this.#p())}#c(){this.#r&&clearTimeout(this.#r),this.#r=setTimeout(this.resize.bind(this),100)}resize(){let i,t;this.#e.size instanceof Object?(i=this.#e.size.width,t=this.#e.size.height):this.#e.size==="parent"&&this.canvas.parentNode?(i=this.canvas.parentNode.offsetWidth,t=this.canvas.parentNode.offsetHeight):(i=window.innerWidth,t=window.innerHeight),this.size.width=i,this.size.height=t,this.size.ratio=i/t,this.#w(),this.#R(),this.onAfterResize(this.size)}#w(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#m(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#m(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#m(i){const t=Math.tan(Ne.degToRad(this.cameraFov/2))/(this.camera.aspect/i);this.camera.fov=2*Ne.radToDeg(Math.atan(t))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const i=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(i/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#R(){this.renderer.setSize(this.size.width,this.size.height),this.#i?.setSize(this.size.width,this.size.height);let i=window.devicePixelRatio;this.maxPixelRatio&&i>this.maxPixelRatio?i=this.maxPixelRatio:this.minPixelRatio&&i<this.minPixelRatio&&(i=this.minPixelRatio),this.renderer.setPixelRatio(i),this.size.pixelRatio=i}get postprocessing(){return this.#i}set postprocessing(i){this.#i=i,this.render=i.render.bind(i)}#p(){if(this.#o)return;const i=()=>{this.#d=requestAnimationFrame(i),this.#t.delta=this.#l.getDelta(),this.#t.elapsed+=this.#t.delta,this.onBeforeRender(this.#t),this.render(),this.onAfterRender(this.#t)};this.#o=!0,this.#l.start(),i()}#u(){this.#o&&(cancelAnimationFrame(this.#d),this.#o=!1,this.#l.stop())}#S(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse(i=>{i.isMesh&&typeof i.material=="object"&&i.material!==null&&(Object.keys(i.material).forEach(t=>{const n=i.material[t];n!==null&&typeof n=="object"&&typeof n.dispose=="function"&&n.dispose()}),i.material.dispose(),i.geometry.dispose())}),this.scene.clear()}dispose(){this.#x(),this.#u(),this.clear(),this.#i?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const ue=new Map,re=new se;let Ie=!1;function ji(o){const i={position:new se,nPosition:new se,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...o};return(function(t,n){ue.has(t)||(ue.set(t,n),Ie||(document.body.addEventListener("pointermove",Be),document.body.addEventListener("pointerleave",qe),document.body.addEventListener("click",Ge),document.body.addEventListener("touchstart",Ye,{passive:!1}),document.body.addEventListener("touchmove",He,{passive:!1}),document.body.addEventListener("touchend",we,{passive:!1}),document.body.addEventListener("touchcancel",we,{passive:!1}),Ie=!0))})(o.domElement,i),i.dispose=()=>{const t=o.domElement;ue.delete(t),ue.size===0&&(document.body.removeEventListener("pointermove",Be),document.body.removeEventListener("pointerleave",qe),document.body.removeEventListener("click",Ge),document.body.removeEventListener("touchstart",Ye),document.body.removeEventListener("touchmove",He),document.body.removeEventListener("touchend",we),document.body.removeEventListener("touchcancel",we),Ie=!1)},i}function Be(o){re.x=o.clientX,re.y=o.clientY,Li()}function Li(){for(const[o,i]of ue){const t=o.getBoundingClientRect();_e(t)?(Le(i,t),i.hover||(i.hover=!0,i.onEnter(i)),i.onMove(i)):i.hover&&!i.touching&&(i.hover=!1,i.onLeave(i))}}function Ge(o){re.x=o.clientX,re.y=o.clientY;for(const[i,t]of ue){const n=i.getBoundingClientRect();Le(t,n),_e(n)&&t.onClick(t)}}function qe(){for(const o of ue.values())o.hover&&(o.hover=!1,o.onLeave(o))}function Ye(o){if(o.touches.length>0){o.preventDefault(),re.x=o.touches[0].clientX,re.y=o.touches[0].clientY;for(const[i,t]of ue){const n=i.getBoundingClientRect();_e(n)&&(t.touching=!0,Le(t,n),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t))}}}function He(o){if(o.touches.length>0){o.preventDefault(),re.x=o.touches[0].clientX,re.y=o.touches[0].clientY;for(const[i,t]of ue){const n=i.getBoundingClientRect();Le(t,n),_e(n)?(t.hover||(t.hover=!0,t.touching=!0,t.onEnter(t)),t.onMove(t)):t.hover&&t.touching&&t.onMove(t)}}}function we(){for(const[,o]of ue)o.touching&&(o.touching=!1,o.hover&&(o.hover=!1,o.onLeave(o)))}function Le(o,i){const{position:t,nPosition:n}=o;t.x=re.x-i.left,t.y=re.y-i.top,n.x=t.x/i.width*2-1,n.y=-t.y/i.height*2+1}function _e(o){const{x:i,y:t}=re,{left:n,top:s,width:r,height:d}=o;return i>=n&&i<=n+r&&t>=s&&t<=s+d}const{randFloat:_i,randFloatSpread:Ee}=Ne,Te=new U,F=new U,Re=new U,Mi=new U,O=new U,Se=new U,pe=new U,me=new U,Ae=new U,We=new U;class Pi{constructor(i){this.config=i,this.positionData=new Float32Array(3*i.count).fill(0),this.velocityData=new Float32Array(3*i.count).fill(0),this.sizeData=new Float32Array(i.count).fill(1),this.center=new U,this.#e(),this.setSizes()}#e(){const{config:i,positionData:t}=this;this.center.toArray(t,0);for(let n=1;n<i.count;n++){const s=3*n;t[s]=Ee(2*i.maxX),t[s+1]=Ee(2*i.maxY),t[s+2]=Ee(2*i.maxZ)}}setSizes(){const{config:i,sizeData:t}=this;t[0]=i.size0;for(let n=1;n<i.count;n++)t[n]=_i(i.minSize,i.maxSize)}update(i){const{config:t,center:n,positionData:s,sizeData:r,velocityData:d}=this;let p=0;t.controlSphere0&&(p=1,Te.fromArray(s,0),Te.lerp(n,.1).toArray(s,0),Mi.set(0,0,0).toArray(d,0));for(let l=p;l<t.count;l++){const c=3*l;F.fromArray(s,c),O.fromArray(d,c),O.y-=i.delta*t.gravity*r[l],O.multiplyScalar(t.friction),O.clampLength(0,t.maxVelocity),F.add(O),F.toArray(s,c),O.toArray(d,c)}for(let l=p;l<t.count;l++){const c=3*l;F.fromArray(s,c),O.fromArray(d,c);const m=r[l];for(let g=l+1;g<t.count;g++){const h=3*g;Re.fromArray(s,h),Se.fromArray(d,h);const f=r[g];pe.copy(Re).sub(F);const x=pe.length(),w=m+f;if(x<w){const M=w-x;me.copy(pe).normalize().multiplyScalar(.5*M),Ae.copy(me).multiplyScalar(Math.max(O.length(),1)),We.copy(me).multiplyScalar(Math.max(Se.length(),1)),F.sub(me),O.sub(Ae),F.toArray(s,c),O.toArray(d,c),Re.add(me),Se.add(We),Re.toArray(s,h),Se.toArray(d,h)}}if(t.controlSphere0){pe.copy(Te).sub(F);const g=pe.length(),h=m+r[0];if(g<h){const f=h-g;me.copy(pe.normalize()).multiplyScalar(f),Ae.copy(me).multiplyScalar(Math.max(O.length(),2)),F.sub(me),O.sub(Ae)}}Math.abs(F.x)+m>t.maxX&&(F.x=Math.sign(F.x)*(t.maxX-m),O.x=-O.x*t.wallBounce),t.gravity===0?Math.abs(F.y)+m>t.maxY&&(F.y=Math.sign(F.y)*(t.maxY-m),O.y=-O.y*t.wallBounce):F.y-m<-t.maxY&&(F.y=-t.maxY+m,O.y=-O.y*t.wallBounce);const b=Math.max(t.maxZ,t.maxSize);Math.abs(F.z)+m>b&&(F.z=Math.sign(F.z)*(t.maxZ-m),O.z=-O.z*t.wallBounce),F.toArray(s,c),O.toArray(d,c)}}}class ki extends jt{constructor(i){super(i),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=t=>{Object.assign(t.uniforms,this.uniforms),t.fragmentShader=`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      `+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("void main() {",`
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
      `);const n=Lt.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);t.fragmentShader=t.fragmentShader.replace("#include <lights_fragment_begin>",n),this.onBeforeCompile2&&this.onBeforeCompile2(t)}}}const Ii={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},he=new pt;class Ei extends bt{constructor(i,t={}){const n={...Ii,...t},s=new wt,r=new Rt(i,.04).fromScene(s).texture,d=new St,p=new ki({envMap:r,...n.materialParams});p.envMapRotation.x=-Math.PI/2,super(d,p,n.count),this.config=n,this.physics=new Pi(n),this.#e(),this.setColors(n.colors)}#e(){this.ambientLight=new At(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new Ct(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(i){if(Array.isArray(i)&&i.length>1){const t=(function(n){let s,r;function d(p){s=p,r=[],s.forEach(l=>{r.push(new Ce(l))})}return d(n),{setColors:d,getColorAt:function(p,l=new Ce){const c=Math.max(0,Math.min(1,p))*(s.length-1),m=Math.floor(c),b=r[m];if(m>=s.length-1)return b.clone();const g=c-m,h=r[m+1];return l.r=b.r+g*(h.r-b.r),l.g=b.g+g*(h.g-b.g),l.b=b.b+g*(h.b-b.b),l}}})(i);for(let n=0;n<this.count;n++)this.setColorAt(n,t.getColorAt(n/this.count)),n===0&&this.light.color.copy(t.getColorAt(n/this.count));this.instanceColor.needsUpdate=!0}}update(i){this.physics.update(i);for(let t=0;t<this.count;t++)he.position.fromArray(this.physics.positionData,3*t),t===0&&this.config.followCursor===!1?he.scale.setScalar(0):he.scale.setScalar(this.physics.sizeData[t]),he.updateMatrix(),this.setMatrixAt(t,he.matrix),t===0&&this.light.position.copy(he.position);this.instanceMatrix.needsUpdate=!0}}function Ti(o,i={}){const t=new Ci({canvas:o,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let n;t.renderer.toneMapping=ht,t.camera.position.set(0,0,20),t.camera.lookAt(0,0,0),t.cameraMaxAspect=1.5,t.resize(),c(i);const s=new vt,r=new gt(new U(0,0,1),0),d=new U;let p=!1;o.style.touchAction="none",o.style.userSelect="none",o.style.webkitUserSelect="none";const l=ji({domElement:o,onMove(){s.setFromCamera(l.nPosition,t.camera),t.camera.getWorldDirection(r.normal),s.ray.intersectPlane(r,d),n.physics.center.copy(d),n.config.controlSphere0=!0},onLeave(){n.config.controlSphere0=!1}});function c(m){n&&(t.clear(),t.scene.remove(n)),n=new Ei(t.renderer,m),t.scene.add(n)}return t.onBeforeRender=m=>{p||n.update(m)},t.onAfterResize=m=>{n.config.maxX=m.wWidth/2,n.config.maxY=m.wHeight/2},{three:t,get spheres(){return n},setCount(m){c({...n.config,count:m})},togglePause(){p=!p},dispose(){l.dispose(),t.dispose()}}}const zi=({className:o="",followCursor:i=!0,...t})=>{const n=a.useRef(null),s=a.useRef(null);return a.useEffect(()=>{const r=n.current;if(r)return s.current=Ti(r,{followCursor:i,...t}),()=>{s.current&&s.current.dispose()}},[]),e.jsx("canvas",{className:o,ref:n,style:{width:"100%",height:"100%"}})},Ni=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Fi=`
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

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

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
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

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
`,Ve=8;function Oi(o){let i=o.trim();i.startsWith("#")&&(i=i.slice(1));let t=255,n=255,s=255;return i.length===3?(t=parseInt(i[0]+i[0],16),n=parseInt(i[1]+i[1],16),s=parseInt(i[2]+i[2],16)):i.length===6&&(t=parseInt(i.slice(0,2),16),n=parseInt(i.slice(2,4),16),s=parseInt(i.slice(4,6),16)),new U(t/255,n/255,s/255)}function Di({linesGradient:o,enabledWaves:i=["top","middle","bottom"],lineCount:t=[6],lineDistance:n=[5],topWavePosition:s,middleWavePosition:r,bottomWavePosition:d={x:2,y:-.7,rotate:-1},animationSpeed:p=1,interactive:l=!0,bendRadius:c=5,bendStrength:m=-.5,mouseDamping:b=.05,parallax:g=!0,parallaxStrength:h=.2,mixBlendMode:f="screen"}){const x=a.useRef(null),w=a.useRef(new se(-1e3,-1e3)),M=a.useRef(new se(-1e3,-1e3)),V=a.useRef(0),k=a.useRef(0),B=a.useRef(new se(0,0)),J=a.useRef(new se(0,0)),_=q=>{if(typeof t=="number")return t;if(!i.includes(q))return 0;const G=i.indexOf(q);return t[G]??6},Q=q=>{if(typeof n=="number")return n;if(!i.includes(q))return .1;const G=i.indexOf(q);return n[G]??.1},v=i.includes("top")?_("top"):0,T=i.includes("middle")?_("middle"):0,K=i.includes("bottom")?_("bottom"):0,R=i.includes("top")?Q("top")*.01:.01,D=i.includes("middle")?Q("middle")*.01:.01,ie=i.includes("bottom")?Q("bottom")*.01:.01;return a.useEffect(()=>{if(!x.current)return;const q=new Oe,G=new Ke(-1,1,1,-1,0,1);G.position.z=1;const P=new De({antialias:!0,alpha:!1});P.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),P.domElement.style.width="100%",P.domElement.style.height="100%",x.current.appendChild(P.domElement);const z={iTime:{value:0},iResolution:{value:new U(1,1,1)},animationSpeed:{value:p},enableTop:{value:i.includes("top")},enableMiddle:{value:i.includes("middle")},enableBottom:{value:i.includes("bottom")},topLineCount:{value:v},middleLineCount:{value:T},bottomLineCount:{value:K},topLineDistance:{value:R},middleLineDistance:{value:D},bottomLineDistance:{value:ie},topWavePosition:{value:new U(s?.x??10,s?.y??.5,s?.rotate??-.4)},middleWavePosition:{value:new U(r?.x??5,r?.y??0,r?.rotate??.2)},bottomWavePosition:{value:new U(d?.x??2,d?.y??-.7,d?.rotate??.4)},iMouse:{value:new se(-1e3,-1e3)},interactive:{value:l},bendRadius:{value:c},bendStrength:{value:m},bendInfluence:{value:0},parallax:{value:g},parallaxStrength:{value:h},parallaxOffset:{value:new se(0,0)},lineGradient:{value:Array.from({length:Ve},()=>new U(1,1,1))},lineGradientCount:{value:0}};if(o&&o.length>0){const Z=o.slice(0,Ve);z.lineGradientCount.value=Z.length,Z.forEach((X,oe)=>{const u=Oi(X);z.lineGradient.value[oe].set(u.x,u.y,u.z)})}const $=new Ze({uniforms:z,vertexShader:Ni,fragmentShader:Fi}),Y=new $e(2,2),H=new et(Y,$);q.add(H);const ee=new Qe,te=()=>{const Z=x.current,X=Z.clientWidth||1,oe=Z.clientHeight||1;P.setSize(X,oe,!1);const u=P.domElement.width,y=P.domElement.height;z.iResolution.value.set(u,y,1)};te();const ne=typeof ResizeObserver<"u"?new ResizeObserver(te):null;ne&&x.current&&ne.observe(x.current);const de=Z=>{const X=P.domElement.getBoundingClientRect(),oe=Z.clientX-X.left,u=Z.clientY-X.top,y=P.getPixelRatio();if(w.current.set(oe*y,(X.height-u)*y),V.current=1,g){const A=X.width/2,E=X.height/2,N=(oe-A)/X.width,I=-(u-E)/X.height;B.current.set(N*h,I*h)}};l&&window.addEventListener("pointermove",de);let le=0;const ce=()=>{z.iTime.value=ee.getElapsedTime(),l&&(M.current.lerp(w.current,b),z.iMouse.value.copy(M.current),k.current+=(V.current-k.current)*b,z.bendInfluence.value=k.current),g&&(J.current.lerp(B.current,b),z.parallaxOffset.value.copy(J.current)),P.render(q,G),le=requestAnimationFrame(ce)};return ce(),()=>{cancelAnimationFrame(le),ne&&x.current&&ne.disconnect(),l&&window.removeEventListener("pointermove",de),Y.dispose(),$.dispose(),P.dispose(),P.domElement.parentElement&&P.domElement.parentElement.removeChild(P.domElement)}},[o,i,t,n,s,r,d,p,l,c,m,b,g,h]),e.jsx("div",{ref:x,className:"floating-lines-container",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",mixBlendMode:f}})}const Ui=({topColor:o="#5227FF",bottomColor:i="#FF9FFC",intensity:t=1,rotationSpeed:n=.3,interactive:s=!1,className:r="",glowAmount:d=.005,pillarWidth:p=3,pillarHeight:l=.4,noiseIntensity:c=.5,mixBlendMode:m="screen",pillarRotation:b=0,quality:g="high"})=>{const h=a.useRef(null),f=a.useRef(null),x=a.useRef(null),w=a.useRef(null),M=a.useRef(null),V=a.useRef(null),k=a.useRef(null),B=a.useRef(new se(0,0)),J=a.useRef(0),[_,Q]=a.useState(!0);return a.useEffect(()=>{const v=document.createElement("canvas");v.getContext("webgl")||v.getContext("experimental-webgl")||Q(!1)},[]),a.useEffect(()=>{if(!h.current||!_)return;const v=h.current,T=v.clientWidth,K=v.clientHeight,R=new Oe;M.current=R;const D=new Ke(-1,1,1,-1,0,1);V.current=D;const ie=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),q=ie||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let G=g;q&&g==="high"&&(G="medium"),ie&&g!=="low"&&(G="low");const P={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},z=P[G]||P.medium;let $;try{$=new De({antialias:!1,alpha:!0,powerPreference:G==="high"?"high-performance":"low-power",precision:z.precision,stencil:!1,depth:!1})}catch{Q(!1);return}$.setSize(T,K),$.setPixelRatio(z.pixelRatio),h.current.appendChild($.domElement),x.current=$;const Y=C=>{const j=new Ce(C);return new U(j.r,j.g,j.b)},H=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,ee=`
      precision ${z.precision} float;

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

      const float STEP_MULT = ${z.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${z.iterations};
      const int WAVE_ITER = ${z.waveIterations};

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
    `,te=b*Math.PI/180,ne=Math.sin(.4),de=Math.cos(.4),le=new Ze({vertexShader:H,fragmentShader:ee,uniforms:{uTime:{value:0},uResolution:{value:new se(T,K)},uMouse:{value:B.current},uTopColor:{value:Y(o)},uBottomColor:{value:Y(i)},uIntensity:{value:t},uInteractive:{value:s},uGlowAmount:{value:d},uPillarWidth:{value:p},uPillarHeight:{value:l},uNoiseIntensity:{value:c},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(te)},uPillarRotSin:{value:Math.sin(te)},uWaveSin:{value:ne},uWaveCos:{value:de}},transparent:!0,depthWrite:!1,depthTest:!1});w.current=le;const ce=new $e(2,2);k.current=ce;const Z=new et(ce,le);R.add(Z);let X=null;const oe=C=>{if(!s||X)return;X=window.setTimeout(()=>{X=null},16);const j=v.getBoundingClientRect(),W=(C.clientX-j.left)/j.width*2-1,ve=-((C.clientY-j.top)/j.height)*2+1;B.current.set(W,ve)};s&&v.addEventListener("mousemove",oe,{passive:!0});let u=performance.now();const A=1e3/(G==="low"?30:60),E=C=>{if(!w.current||!x.current||!M.current||!V.current)return;const j=C-u;if(j>=A){J.current+=.016*n;const W=J.current;w.current.uniforms.uTime.value=W,w.current.uniforms.uRotCos.value=Math.cos(W*.3),w.current.uniforms.uRotSin.value=Math.sin(W*.3),x.current.render(M.current,V.current),u=C-j%A}f.current=requestAnimationFrame(E)};f.current=requestAnimationFrame(E);let N=null;const I=()=>{N&&clearTimeout(N),N=window.setTimeout(()=>{if(!x.current||!w.current||!h.current)return;const C=h.current.clientWidth,j=h.current.clientHeight;x.current.setSize(C,j),w.current.uniforms.uResolution.value.set(C,j)},150)};return window.addEventListener("resize",I,{passive:!0}),()=>{window.removeEventListener("resize",I),s&&v.removeEventListener("mousemove",oe),f.current&&cancelAnimationFrame(f.current),x.current&&(x.current.dispose(),x.current.forceContextLoss(),v.contains(x.current.domElement)&&v.removeChild(x.current.domElement)),w.current&&w.current.dispose(),k.current&&k.current.dispose(),x.current=null,w.current=null,M.current=null,V.current=null,k.current=null,f.current=null}},[o,i,t,n,s,d,p,l,c,b,_,g]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),_?e.jsx("div",{ref:h,className:`light-pillar-container ${r}`,style:{mixBlendMode:m}}):e.jsx("div",{className:`light-pillar-fallback ${r}`,style:{mixBlendMode:m},children:"WebGL not supported"})]})},Bi=["#f700ff","#bd71ff","#29b1ff"],Gi=()=>{const{activeBackground:o}=xe();return e.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:e.jsxs(ae,{mode:"wait",children:[o==="gradient"&&e.jsx(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(bi,{})},"gradient"),o==="galaxy"&&e.jsx(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(Ai,{mouseRepulsion:!1,mouseInteraction:!1,density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5})},"galaxy"),o==="silk"&&e.jsx(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(ot,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0})},"silk"),o==="ballpit"&&e.jsxs(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#111111"},children:[" ",e.jsx(zi,{count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1,colors:["#f700ff","#bd71ff","#29b1ff"]})]},"ballpit"),o==="floatinglines"&&e.jsx(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(Di,{linesGradient:Bi,lineCount:6,lineDistance:5,animationSpeed:.5})},"floatinglines"),o==="lightpillars"&&e.jsx(L.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000000"},children:e.jsx(Ui,{topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,glowAmount:.005,pillarWidth:2.5,pillarHeight:.4,noiseIntensity:.7,pillarRotation:293,interactive:!1,mixBlendMode:"lighten",quality:"high"})},"lightpillars")]})})},qi=({onItemClick:o,position:i="left",colors:t=["#B19EEF","#5227FF"],items:n=[],socialItems:s=[],displaySocials:r=!0,displayItemNumbering:d=!0,className:p,logoUrl:l=null,menuButtonColor:c="#fff",openMenuButtonColor:m="#000",accentColor:b="#5227FF",changeMenuColorOnOpen:g=!0,isFixed:h=!1,closeOnClickAway:f=!0,onMenuOpen:x,onMenuClose:w})=>{const[M,V]=a.useState(!1),k=a.useRef(!1),B=a.useRef(null),J=a.useRef(null),_=a.useRef([]),Q=a.useRef(null),v=a.useRef(null),T=a.useRef(null),K=a.useRef(null),R=a.useRef(null),[D,ie]=a.useState(["Menu","Close"]),q=a.useRef(null),G=a.useRef(null),P=a.useRef(null),z=a.useRef(null),$=a.useRef(null),Y=a.useRef(null),H=a.useRef(!1),ee=a.useRef(null);a.useLayoutEffect(()=>{const u=S.context(()=>{const y=B.current,A=J.current,E=Q.current,N=v.current,I=T.current,C=K.current;if(!y||!E||!N||!I||!C)return;let j=[];A&&(j=Array.from(A.querySelectorAll(".sm-prelayer"))),_.current=j;const W=i==="left"?-100:100;S.set([y,...j],{xPercent:W}),S.set(E,{transformOrigin:"50% 50%",rotate:0}),S.set(N,{transformOrigin:"50% 50%",rotate:90}),S.set(I,{rotate:0,transformOrigin:"50% 50%"}),S.set(C,{yPercent:0}),Y.current&&S.set(Y.current,{color:c})});return()=>u.revert()},[c,i]);const te=a.useCallback(()=>{const u=B.current,y=_.current;if(!u)return null;q.current?.kill(),G.current&&(G.current.kill(),G.current=null),ee.current?.kill();const A=Array.from(u.querySelectorAll(".sm-panel-itemLabel")),E=Array.from(u.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),N=u.querySelector(".sm-socials-title"),I=Array.from(u.querySelectorAll(".sm-socials-link")),C=y.map(fe=>({el:fe,start:Number(S.getProperty(fe,"xPercent"))})),j=Number(S.getProperty(u,"xPercent"));A.length&&S.set(A,{yPercent:140,rotate:10}),E.length&&S.set(E,{"--sm-num-opacity":0}),N&&S.set(N,{opacity:0}),I.length&&S.set(I,{y:25,opacity:0});const W=S.timeline({paused:!0});C.forEach((fe,be)=>{W.fromTo(fe.el,{xPercent:fe.start},{xPercent:0,duration:.8,ease:"power4.out"},be*.07)});const Me=(C.length?(C.length-1)*.07:0)+(C.length?.08:0),Pe=1;if(W.fromTo(u,{xPercent:j},{xPercent:0,duration:Pe,ease:"power4.out"},Me),A.length){const be=Me+Pe*.15;W.to(A,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},be),E.length&&W.to(E,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},be+.1)}if(N||I.length){const fe=Me+Pe*.4;N&&W.to(N,{opacity:1,duration:.5,ease:"power2.out"},fe),I.length&&W.to(I,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{S.set(I,{clearProps:"opacity"})}},fe+.04)}return q.current=W,W},[]),ne=a.useCallback(()=>{if(H.current)return;H.current=!0;const u=te();u?(u.eventCallback("onComplete",()=>{H.current=!1}),u.play(0)):H.current=!1},[te]),de=a.useCallback(()=>{q.current?.kill(),q.current=null,ee.current?.kill();const u=B.current,y=_.current;if(!u)return;const A=[...y,u];G.current?.kill();const E=i==="left"?-100:100;G.current=S.to(A,{xPercent:E,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const N=Array.from(u.querySelectorAll(".sm-panel-itemLabel"));N.length&&S.set(N,{yPercent:140,rotate:10});const I=Array.from(u.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));I.length&&S.set(I,{"--sm-num-opacity":0});const C=u.querySelector(".sm-socials-title"),j=Array.from(u.querySelectorAll(".sm-socials-link"));C&&S.set(C,{opacity:0}),j.length&&S.set(j,{y:25,opacity:0}),H.current=!1}})},[i]),le=a.useCallback(u=>{const y=T.current;y&&(P.current?.kill(),u?P.current=S.to(y,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):P.current=S.to(y,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),ce=a.useCallback(u=>{const y=Y.current;if(y)if($.current?.kill(),g){const A=u?m:c;$.current=S.to(y,{color:A,delay:.18,duration:.3,ease:"power2.out"})}else S.set(y,{color:c})},[m,c,g]);ze.useEffect(()=>{if(Y.current)if(g){const u=k.current?m:c;S.set(Y.current,{color:u})}else S.set(Y.current,{color:c})},[g,c,m]);const Z=a.useCallback(u=>{const y=K.current;if(!y)return;z.current?.kill();const A=u?"Menu":"Close",E=u?"Close":"Menu",N=3,I=[A];let C=A;for(let ve=0;ve<N;ve++)C=C==="Menu"?"Close":"Menu",I.push(C);C!==E&&I.push(E),I.push(E),ie(I),S.set(y,{yPercent:0});const j=I.length,W=(j-1)/j*100;z.current=S.to(y,{yPercent:-W,duration:.5+j*.07,ease:"power4.out"})},[]),X=a.useCallback(()=>{const u=!k.current;k.current=u,V(u),u?(x?.(),ne()):(w?.(),de()),le(u),ce(u),Z(u)},[ne,de,le,ce,Z,x,w]),oe=a.useCallback(()=>{k.current&&(k.current=!1,V(!1),w?.(),de(),le(!1),ce(!1),Z(!1))},[de,le,ce,Z,w]);return ze.useEffect(()=>{if(!f||!M)return;const u=y=>{const A=B.current&&B.current.contains(y.target),E=Y.current&&Y.current.contains(y.target),N=y.target.closest(".shop-overlay");!A&&!E&&!N&&oe()};return document.addEventListener("mousedown",u),()=>{document.removeEventListener("mousedown",u)}},[f,M,oe]),e.jsxs("div",{className:(p?p+" ":"")+"staggered-menu-wrapper"+(h?" fixed-wrapper":""),style:b?{"--sm-accent":b}:void 0,"data-position":i,"data-open":M||void 0,children:[e.jsx("div",{ref:J,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let y=[...t&&t.length?t.slice(0,4):["#1e1e22","#35353c"]];if(y.length>=3){const A=Math.floor(y.length/2);y.splice(A,1)}return y.map((A,E)=>e.jsx("div",{className:"sm-prelayer",style:{background:A}},E))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:l?e.jsx("img",{src:l,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:Y,className:"sm-toggle","aria-label":M?"Close menu":"Open menu","aria-expanded":M,"aria-controls":"staggered-menu-panel",onClick:X,type:"button",children:[e.jsx("span",{ref:R,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:K,className:"sm-toggle-textInner",children:D.map((u,y)=>e.jsx("span",{className:"sm-toggle-line",children:u},y))})}),e.jsxs("span",{ref:T,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:Q,className:"sm-icon-line"}),e.jsx("span",{ref:v,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:B,className:"staggered-menu-panel","aria-hidden":!M,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":d||void 0,children:n&&n.length?n.map((u,y)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:A=>{A.preventDefault(),o&&o(u.id)},"aria-label":u.ariaLabel,"data-index":y+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:u.label})})},u.label+y)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),r&&s&&s.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:s.map((u,y)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:u.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:u.label})},u.label+y))})]})]})})]})};function Yi({children:o,className:i="",onClick:t,mouseX:n,spring:s,distance:r,magnification:d,baseItemSize:p}){const l=a.useRef(null),c=ye(0),m=Fe(n,h=>{if(!l.current)return 1/0;const f=l.current.getBoundingClientRect(),x=f.x+f.width/2;return Math.abs(h-x)}),b=Fe(m,[0,r],[d,p]),g=je(b,s);return e.jsx(L.div,{ref:l,style:{width:g,height:g,minWidth:g,minHeight:g},onHoverStart:()=>c.set(1),onHoverEnd:()=>c.set(0),onClick:t,className:`dock-item ${i}`,"aria-haspopup":"true",children:a.Children.map(o,h=>a.cloneElement(h,{isHovered:c}))})}function Hi({children:o,className:i="",...t}){const{isHovered:n}=t,[s,r]=a.useState(!1);return a.useEffect(()=>{const d=n.on("change",p=>{r(p===1)});return()=>d()},[n]),e.jsx(ae,{children:s&&e.jsx(L.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${i}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:o})})}function Wi({children:o,className:i=""}){return e.jsx("div",{className:`dock-icon ${i}`,children:o})}function Vi({items:o,className:i="",spring:t={mass:.1,stiffness:300,damping:20},magnification:n=70,distance:s=200,panelHeight:r=68,dockHeight:d=256,baseItemSize:p=50}){const l=ye(1/0),c=ye(0),m=a.useMemo(()=>Math.max(d,n+n/2+4),[n,d]),b=Fe(c,[0,1],[r,m]),g=je(b,t);return e.jsx(L.div,{style:{height:g,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(L.div,{onMouseMove:({pageX:h})=>{c.set(1),l.set(h)},onMouseLeave:()=>{c.set(0),l.set(1/0)},className:`dock-panel ${i}`,style:{height:r},role:"toolbar","aria-label":"Application dock",children:o.map((h,f)=>e.jsxs(Yi,{onClick:h.onClick,className:h.className,mouseX:l,spring:t,distance:s,magnification:n,baseItemSize:p,children:[e.jsx(Wi,{children:h.icon}),e.jsx(Hi,{children:h.label})]},f))})})}const nt=""+new URL("apple-cat-BHTFRffC.gif",import.meta.url).href,st=""+new URL("jump-cat-BVsZ-jsy.gif",import.meta.url).href,at=""+new URL("rolling-cat-BlLA7Xch.gif",import.meta.url).href,rt=""+new URL("duck-BnqypGlP.png",import.meta.url).href,lt="data:image/png;base64,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",ct=""+new URL("skeleton-run-CHzXkBxe.gif",import.meta.url).href,Xi={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"},{id:"silk",name:"Silk",description:"Suavidad y elegancia.",price:"Gratis",previewColor:"#ff99cc"},{id:"ballpit",name:"Ball Pit",description:"Física interactiva y relajante.",price:"Gratis",previewColor:"#29b1ff"},{id:"floatinglines",name:"Floating Lines",description:"Ondas de energía interactivas.",price:"Gratis",previewColor:"#bd71ff"},{id:"lightpillars",name:"Light Pillars",description:"Pilares de luz etéreos.",price:"Gratis",previewColor:"#00ffff"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(tt,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(It,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:nt,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:st,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:at,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:rt,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:lt,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:ct,alt:"Skeleton",style:{width:"40px"}})}]},Ji=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Pt,{})},{id:"cursors",label:"Cursores",icon:e.jsx(tt,{})},{id:"trails",label:"Mascotas",icon:e.jsx(kt,{})}],Qi=()=>{const{activeShop:o,openShop:i,closeShop:t,activeBackground:n,setBackground:s,activeCursor:r,setCursor:d,activeTrail:p,setTrail:l}=xe(),[c,m]=a.useState(o);a.useEffect(()=>{o&&m(o)},[o]);const b=Xi[c]||[],g=f=>{o==="backgrounds"&&s(f),o==="cursors"&&d(f),o==="trails"&&l(f)},h=f=>o==="backgrounds"?n===f:o==="cursors"?r===f:o==="trails"?p===f:!1;return e.jsx(ae,{children:o&&e.jsxs(L.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:t,style:{position:"absolute",inset:0}}),e.jsxs(L.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:Ji.map(f=>e.jsxs("button",{onClick:()=>i(f.id),className:`tab-btn ${o===f.id?"active":""}`,children:[f.icon,e.jsx("span",{children:f.label}),o===f.id&&e.jsx(L.div,{layoutId:"activeTab",className:"active-line"})]},f.id))}),e.jsx("button",{onClick:t,className:"close-btn",children:e.jsx(_t,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",c==="backgrounds"?"Fondos":c==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(ae,{mode:"wait",children:e.jsx(L.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:b.map(f=>e.jsxs("div",{className:`shop-item ${h(f.id)?"equipped":""}`,onClick:()=>g(f.id),children:[e.jsxs("div",{className:"item-preview",style:{background:f.previewColor},children:[f.icon&&e.jsx("div",{className:"preview-icon",children:f.icon}),h(f.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(Mt,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:f.name}),e.jsx("p",{children:f.description}),e.jsx("span",{className:"price-tag",children:f.price})]})]},f.id))},c)})})]})]})})},Ki=()=>{const{activeTrail:o}=xe(),i=ye(-100),t=ye(-100),n={damping:25,stiffness:70,mass:1},s=je(i,n),r=je(t,n);a.useEffect(()=>{const p=l=>{i.set(l.clientX),t.set(l.clientY)};return window.addEventListener("mousemove",p),()=>window.removeEventListener("mousemove",p)},[i,t]);const d={"apple-cat":nt,"jump-cat":st,"rolling-cat":at,duck:rt,pompom:lt,"skeleton-run":ct,ghost:null};return!o||o==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:d[o]?e.jsx(L.img,{src:d[o],alt:"trail",style:{x:s,y:r,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):o==="ghost"?e.jsx(L.div,{style:{x:s,y:r,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},Xe=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],Zi=({progress:o})=>{const[i,t]=a.useState(0);return a.useEffect(()=>{const n=setInterval(()=>{t(s=>(s+1)%Xe.length)},1500);return()=>clearInterval(n)},[]),e.jsxs(L.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[o,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(L.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${o}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(L.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:Xe[i]},i)})]})]})},$i=""+new URL("For You I'll Die - JAY SAV-BGIKD8t9.mp3",import.meta.url).href,eo=Object.freeze(Object.defineProperty({__proto__:null,default:$i},Symbol.toStringTag,{value:"Module"})),to=""+new URL("From The Start (Sped Up) - Laufey-D4ysqUTI.mp3",import.meta.url).href,io=Object.freeze(Object.defineProperty({__proto__:null,default:to},Symbol.toStringTag,{value:"Module"})),oo=""+new URL("I Really Want to Stay At Your House - Rosa Walton-BKlM1ya2.mp3",import.meta.url).href,no=Object.freeze(Object.defineProperty({__proto__:null,default:oo},Symbol.toStringTag,{value:"Module"})),so=""+new URL("La cena - Las Petunias-BzZvyMnw.mp3",import.meta.url).href,ao=Object.freeze(Object.defineProperty({__proto__:null,default:so},Symbol.toStringTag,{value:"Module"})),ro=""+new URL("Let You Down - Dawid Podsiadło-CMbNZyx7.mp3",import.meta.url).href,lo=Object.freeze(Object.defineProperty({__proto__:null,default:ro},Symbol.toStringTag,{value:"Module"})),co=""+new URL("Tek It - Cafuné-DeWKFaBa.mp3",import.meta.url).href,uo=Object.freeze(Object.defineProperty({__proto__:null,default:co},Symbol.toStringTag,{value:"Module"})),fo=""+new URL("You and I - d4vd -DLXjY2fT.mp3",import.meta.url).href,mo=Object.freeze(Object.defineProperty({__proto__:null,default:fo},Symbol.toStringTag,{value:"Module"})),po=""+new URL("gourmet - rickyedit-u4-Lg7PG.mp3",import.meta.url).href,ho=Object.freeze(Object.defineProperty({__proto__:null,default:po},Symbol.toStringTag,{value:"Module"})),vo=""+new URL("una manera perfecta de morir - INTERROGACIÓN AMOR-Bn3KiH1Y.mp3",import.meta.url).href,go=Object.freeze(Object.defineProperty({__proto__:null,default:vo},Symbol.toStringTag,{value:"Module"})),Je=Object.assign({"../../assets/songs/For You I'll Die - JAY SAV.mp3":eo,"../../assets/songs/From The Start (Sped Up) - Laufey.mp3":io,"../../assets/songs/I Really Want to Stay At Your House - Rosa Walton.mp3":no,"../../assets/songs/La cena - Las Petunias.mp3":ao,"../../assets/songs/Let You Down - Dawid Podsiadło.mp3":lo,"../../assets/songs/Tek It - Cafuné.mp3":uo,"../../assets/songs/You and I - d4vd .mp3":mo,"../../assets/songs/gourmet - rickyedit.mp3":ho,"../../assets/songs/una manera perfecta de morir - INTERROGACIÓN AMOR.mp3":go}),ge=Object.keys(Je).map(o=>({title:o.split("/").pop().split(".")[0].replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase()),artist:"Only U Playlist",src:Je[o].default}));ge.length===0&&ge.push({title:"No Songs Found",artist:"Add mp3 to assets/songs",src:""});const yo=.1,xo=({visible:o,onClose:i})=>{const t=a.useRef(null),n=a.useRef(null),[s,r]=a.useState(!1),[d,p]=a.useState(0),[l,c]=a.useState(.05),[m,b]=a.useState(!1),[g,h]=a.useState(!1),[f,x]=a.useState(!1),[w,M]=a.useState(0),[V,k]=a.useState(0),B=ge[d];a.useEffect(()=>{t.current&&(t.current.volume=m?0:Math.pow(l,2)*yo)},[l,m]),a.useEffect(()=>{s&&t.current&&t.current.play().catch(R=>console.log("Autoplay blocked",R))},[d]),a.useEffect(()=>{o||(h(!1),x(!1))},[o]),a.useEffect(()=>{const R=D=>{o&&(n.current&&n.current.contains(D.target)||D.target.closest(".dock-outer")||i&&i())};return document.addEventListener("mousedown",R),()=>document.removeEventListener("mousedown",R)},[o,i]);const J=()=>{t.current&&(M(t.current.currentTime),k(t.current.duration||0))},_=R=>{const D=parseFloat(R.target.value);M(D),t.current&&(t.current.currentTime=D)},Q=()=>{s?t.current.pause():t.current.play(),r(!s)},v=()=>{p(R=>(R+1)%ge.length)},T=R=>{p(R),r(!0),x(!1)},K=R=>{if(!R||isNaN(R))return"0:00";const D=Math.floor(R/60),ie=Math.floor(R%60);return`${D}:${ie<10?"0":""}${ie}`};return e.jsxs(L.div,{ref:n,className:"music-player-container",initial:"hidden",animate:o?"visible":"hidden",variants:{visible:{opacity:1,y:0,scale:1,pointerEvents:"auto"},hidden:{opacity:0,y:50,scale:.95,pointerEvents:"none"}},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("audio",{ref:t,src:B.src,onEnded:v,onTimeUpdate:J,onLoadedMetadata:J,preload:"auto"}),e.jsx(ae,{children:f&&e.jsx(L.div,{className:"playlist-popup",initial:{opacity:0,y:10,scale:.95,x:"-50%"},animate:{opacity:1,y:0,scale:1,x:"-50%"},exit:{opacity:0,y:10,scale:.95,x:"-50%"},transition:{duration:.2},children:ge.map((R,D)=>e.jsxs("div",{className:`playlist-item ${D===d?"active":""}`,onClick:()=>T(D),children:[D+1,". ",R.title]},D))})}),e.jsx("div",{className:"compact-info",onClick:()=>x(!f),children:e.jsxs("div",{className:"song-title-wrapper",style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{className:"song-title",children:B.title}),e.jsx(Et,{size:14,style:{minWidth:14,marginLeft:8,opacity:.6}})]})}),e.jsxs("div",{className:"compact-controls-row",children:[e.jsx("button",{className:"mini-play-btn",onClick:Q,children:s?e.jsx(Tt,{size:16}):e.jsx(zt,{size:16,style:{marginLeft:"2px"}})}),e.jsxs("div",{className:"seek-bar-container",children:[e.jsx("input",{type:"range",min:"0",max:V,value:w,onChange:_,className:"seek-slider"}),e.jsxs("div",{className:"time-display",children:[K(w)," / ",K(V)]})]}),e.jsx("button",{className:"icon-btn",onClick:v,children:e.jsx(Nt,{size:18})}),e.jsxs("div",{className:"volume-wrapper",children:[e.jsx("button",{className:`icon-btn ${g?"active":""}`,onClick:()=>h(!g),children:m||l===0?e.jsx(Ft,{size:18}):e.jsx(Ot,{size:18})}),e.jsx(ae,{children:g&&e.jsx(L.div,{className:"volume-popup",initial:{opacity:0,scale:.8,x:10},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.8,x:0},children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:m?0:l,onChange:R=>c(parseFloat(R.target.value))})})})]})]})]})},bo=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],wo=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function Ro(){const{isUnlocked:o,openShop:i,closeShop:t,lockGame:n}=xe(),[s,r]=a.useState(!0),[d,p]=a.useState(!1),l=f=>{f&&i(f)},c=[{icon:e.jsx(Dt,{size:22}),label:"Texto",onClick:()=>r(!s)},{icon:e.jsx(Ut,{size:22}),label:"Música",onClick:()=>p(!d)},{icon:e.jsx(Bt,{size:22}),label:"Juego",onClick:()=>console.log("Toggle Game")},{icon:e.jsx(Gt,{size:22}),label:"Fondo",onClick:()=>console.log("Personalize Background")},{icon:e.jsx(qt,{size:22}),label:"Bloquear",onClick:()=>{n&&(t(),p(!1),n())}}],[m,b]=a.useState(!0),[g,h]=a.useState(0);return a.useEffect(()=>{const f=setInterval(()=>{h(x=>{const w=x+Math.floor(Math.random()*15)+5;return w>=100?(clearInterval(f),setTimeout(()=>b(!1),200),100):w})},200);return()=>clearInterval(f)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(ae,{mode:"wait",children:m&&e.jsx(Zi,{progress:g},"loader")}),e.jsx(ae,{children:!o&&e.jsx(L.div,{initial:{opacity:0,filter:"blur(20px)",scale:1.1},animate:{opacity:1,filter:"blur(0px)",scale:1},exit:{opacity:0,filter:"blur(20px)",scale:1.1,transition:{duration:2}},transition:{duration:2,ease:"easeInOut"},style:{position:"fixed",zIndex:9999,inset:0,background:"#000"},children:e.jsx($t,{})},"lock-screen")}),e.jsx(ae,{children:o&&e.jsxs(L.div,{className:"app-content",initial:{opacity:0,scale:.95,filter:"blur(10px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},exit:{opacity:0,scale:1.1,filter:"blur(10px)",transition:{duration:1}},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},children:[e.jsx(Gi,{}),e.jsx(qi,{items:bo,socialItems:wo,isFixed:!0,position:"right",onItemClick:l,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(Qi,{}),e.jsx(Ki,{}),e.jsx(ae,{children:s&&e.jsx(L.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},style:{position:"absolute",width:"100%",height:"100%",zIndex:10},children:e.jsx(xi,{})})}),e.jsx(xo,{visible:d,onClose:()=>p(!1)}),e.jsx(Vi,{items:c,panelHeight:60,baseItemSize:45,magnification:60})]},"main-content")})]})}Yt.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(Ro,{})}));
