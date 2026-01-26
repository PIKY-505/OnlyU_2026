import{c as jt,j as e,r as a,u as St,C as _e,a as Rt,F as At,R as ke,O as Lt,A as kt,b as _t,P as It,V as K,d as at,e as Mt,S as qe,W as He,f as Pt,M as Be,g as pe,I as Et,h as Nt,i as Ft,k as zt,l as Tt,m as Dt,n as Ot,o as Ut,p as rt,q as lt,s as ct,t as ut,v as N,w as Bt,x as dt,y as ft,z as Gt,B as mt,D as qt,E as Ht,G as Yt,H as Wt,J as Vt,K as Jt,L as Xt,N as Qt,Q as Kt,T as Zt,U as $t,X as ei,Y as ti,Z as ii}from"./vendor-CWohnw__.js";import{A as le,m as F,u as Ce,a as Ge,b as Ie}from"./framer-motion-CQoqgKBs.js";import{R as ni,T as oi,P as si,C as Ye,M as ai}from"./ogl--UM621jO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function i(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(s){if(s.ep)return;s.ep=!0;const l=i(s);fetch(s.href,l)}})();const xe=jt(n=>({isUnlocked:!1,unlockApp:()=>n({isUnlocked:!0}),lockGame:()=>n({isUnlocked:!1}),activeShop:null,openShop:t=>n({activeShop:t}),closeShop:()=>n({activeShop:null}),activeBackground:"gradient",setBackground:t=>n({activeBackground:t}),activeCursor:"default",setCursor:t=>n({activeCursor:t}),activeTrail:"none",setTrail:t=>n({activeTrail:t})})),ri=({text:n,disabled:t=!1,speed:i=3,className:o="",color:s="#7c7c7c",shineColor:l="#ffffff",direction:f="right"})=>e.jsx("div",{className:`shiny-text ${f} ${t?"disabled":""} ${o}`,style:{"--shiny-speed":`${i}s`,"--base-color":s,"--shine-color":l},children:n}),We=n=>(n=n.replace("#",""),[parseInt(n.slice(0,2),16)/255,parseInt(n.slice(2,4),16)/255,parseInt(n.slice(4,6),16)/255]),li=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  // FIX: Usar coordenadas de clip directas para llenar la pantalla siempre
  gl_Position = vec4(position, 1.0);
}
`,ci=`
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
`,pt=a.forwardRef(function({uniforms:t},i){return St((o,s)=>{i.current.material.uniforms.uTime.value+=.1*s}),e.jsxs("mesh",{ref:i,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{uniforms:t,vertexShader:li,fragmentShader:ci})]})});pt.displayName="SilkPlane";const ht=({speed:n=1,scale:t=2,color:i="#ff99cc",noiseIntensity:o=.5,rotation:s=0})=>{const l=a.useRef(),f=a.useMemo(()=>({uSpeed:{value:n},uScale:{value:t},uNoiseIntensity:{value:o},uColor:{value:new _e(...We(i))},uRotation:{value:s},uTime:{value:0}}),[]);return a.useEffect(()=>{if(l.current){const h=l.current.material.uniforms;h.uSpeed.value=n,h.uScale.value=t,h.uNoiseIntensity.value=o,h.uColor.value.set(...We(i)),h.uRotation.value=s}},[n,t,o,i,s]),a.useEffect(()=>{const u=setInterval(()=>window.dispatchEvent(new Event("resize")),50),c=setTimeout(()=>clearInterval(u),1200);return()=>{clearInterval(u),clearTimeout(c)}},[]),e.jsx(Rt,{dpr:[1,2],frameloop:"always",resize:{debounce:0},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(pt,{ref:l,uniforms:f})})},ui=()=>{const[n,t]=a.useState(""),[i,o]=a.useState(!1),s=xe(u=>u.unlockApp),l="230824",f=u=>{const c=u.target.value.replace(/\D/g,"");if(c.length>6)return;let d=c;c.length>2&&(d=c.slice(0,2)+"/"+c.slice(2)),c.length>4&&(d=d.slice(0,5)+"/"+c.slice(4)),t(d),o(!1)},h=u=>{u.preventDefault(),n.replace(/\//g,"")===l?s():(o(!0),setTimeout(()=>o(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(ht,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(ri,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:h,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:n,onChange:f,className:i?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(At,{size:20})})]})]})]})},di=""+new URL("bridge-CojLCfPY.jpeg",import.meta.url).href,fi=Object.freeze(Object.defineProperty({__proto__:null,default:di},Symbol.toStringTag,{value:"Module"})),mi=""+new URL("first-D3M4TVfP.jpg",import.meta.url).href,pi=Object.freeze(Object.defineProperty({__proto__:null,default:mi},Symbol.toStringTag,{value:"Module"})),hi=""+new URL("graduated-B6wsMf9J.jpeg",import.meta.url).href,gi=Object.freeze(Object.defineProperty({__proto__:null,default:hi},Symbol.toStringTag,{value:"Module"})),vi=""+new URL("halloween-BidyR4aF.jpg",import.meta.url).href,xi=Object.freeze(Object.defineProperty({__proto__:null,default:vi},Symbol.toStringTag,{value:"Module"})),yi=""+new URL("miestrella-TqC41RJI.jpg",import.meta.url).href,bi=Object.freeze(Object.defineProperty({__proto__:null,default:yi},Symbol.toStringTag,{value:"Module"})),Ci=""+new URL("murder-olQPuXYs.jpeg",import.meta.url).href,wi=Object.freeze(Object.defineProperty({__proto__:null,default:Ci},Symbol.toStringTag,{value:"Module"})),ji=""+new URL("rock-DJ9ByMrB.jpeg",import.meta.url).href,Si=Object.freeze(Object.defineProperty({__proto__:null,default:ji},Symbol.toStringTag,{value:"Module"})),Ri=""+new URL("sleepy-vWyZnVIh.jpg",import.meta.url).href,Ai=Object.freeze(Object.defineProperty({__proto__:null,default:Ri},Symbol.toStringTag,{value:"Module"})),Li=""+new URL("sunshine-B5Zoex-L.jpeg",import.meta.url).href,ki=Object.freeze(Object.defineProperty({__proto__:null,default:Li},Symbol.toStringTag,{value:"Module"})),_i=Object.assign({"../../assets/img/photos/bridge.jpeg":fi,"../../assets/img/photos/first.jpg":pi,"../../assets/img/photos/graduated.jpeg":gi,"../../assets/img/photos/halloween.jpg":xi,"../../assets/img/photos/miestrella.jpg":bi,"../../assets/img/photos/murder.jpeg":wi,"../../assets/img/photos/rock.jpeg":Si,"../../assets/img/photos/sleepy.jpg":Ai,"../../assets/img/photos/sunshine.jpeg":ki}),ze=Object.values(_i).map(n=>n.default),Ii=()=>{const[n,t]=a.useState(null);let i=[...ze];if(i.length>0)for(;i.length<18;)i=[...i,...ze];const o=[...i,...i];return e.jsxs("div",{className:"main-container",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),ze.length>0&&e.jsx("div",{className:"gallery-container",children:e.jsx("div",{className:"gallery-track",children:o.map((s,l)=>e.jsx("img",{src:s,alt:`Memory ${l}`,className:"gallery-item",onClick:()=>t(s)},l))})}),e.jsx(le,{children:n&&e.jsx(F.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(10px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},onClick:()=>t(null),style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(0, 0, 0, 0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"},children:e.jsx(F.img,{src:n,initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",damping:25,stiffness:300},style:{maxHeight:"85vh",maxWidth:"90vw",borderRadius:"16px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)"},onClick:s=>s.stopPropagation()})})})]})},Mi=()=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:"linear-gradient(to bottom, #b117f8, #2c0b2e)",animation:"spinGradient 20s linear infinite"}}),e.jsx("style",{children:`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `})]}),Pi=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,Ei=`
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
`,Ni=({focal:n=[.5,.5],rotation:t=[1,0],starSpeed:i=0,density:o=1.5,hueShift:s=300,disableAnimation:l=!1,speed:f=.5,mouseInteraction:h=!0,glowIntensity:u=.5,saturation:c=.8,mouseRepulsion:d=!0,repulsionStrength:b=.5,twinkleIntensity:C=.5,rotationSpeed:p=.05,autoCenterRepulsion:m=0,transparent:y=!0,..._})=>{const z=a.useRef(null),O=a.useRef({x:.5,y:.5}),T=a.useRef({x:.5,y:.5}),W=a.useRef(0),E=a.useRef(0);return a.useEffect(()=>{if(!z.current)return;const A=z.current;A.innerHTML="";const q=new ni({alpha:y,premultipliedAlpha:!1,dpr:1}),g=q.gl;y?(g.enable(g.BLEND),g.blendFunc(g.SRC_ALPHA,g.ONE_MINUS_SRC_ALPHA),g.clearColor(0,0,0,0)):g.clearColor(0,0,0,1);let D;function I(){q.setSize(A.offsetWidth*1,A.offsetHeight*1),D&&(D.uniforms.uResolution.value=new Ye(g.canvas.width,g.canvas.height,g.canvas.width/g.canvas.height))}window.addEventListener("resize",I,!1),I();const R=new oi(g);D=new si(g,{vertex:Pi,fragment:Ei,uniforms:{uTime:{value:0},uResolution:{value:new Ye(g.canvas.width,g.canvas.height,g.canvas.width/g.canvas.height)},uFocal:{value:new Float32Array(n)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:i},uDensity:{value:o},uHueShift:{value:s},uSpeed:{value:f},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:u},uSaturation:{value:c},uMouseRepulsion:{value:d},uTwinkleIntensity:{value:C},uRotationSpeed:{value:p},uRepulsionStrength:{value:b},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:m},uTransparent:{value:y}}});const B=new ai(g,{geometry:R,program:D});let j,x=0;const S=1e3/30;function U(H){if(j=requestAnimationFrame(U),!z.current)return;const $=H-x;if($<S)return;x=H-$%S,l||(D.uniforms.uTime.value=H*.001,D.uniforms.uStarSpeed.value=H*.001*i/10);const r=.05;T.current.x+=(O.current.x-T.current.x)*r,T.current.y+=(O.current.y-T.current.y)*r,E.current+=(W.current-E.current)*r,D.uniforms.uMouse.value[0]=T.current.x,D.uniforms.uMouse.value[1]=T.current.y,D.uniforms.uMouseActiveFactor.value=E.current,q.render({scene:B})}j=requestAnimationFrame(U),A.appendChild(g.canvas),g.canvas.style.width="100%",g.canvas.style.height="100%",g.canvas.style.display="block",g.canvas.style.willChange="transform";function Z(H){const $=A.getBoundingClientRect(),r=(H.clientX-$.left)/$.width,L=1-(H.clientY-$.top)/$.height;O.current={x:r,y:L},W.current=1}function G(){W.current=0}return h&&(A.addEventListener("mousemove",Z),A.addEventListener("mouseleave",G)),()=>{cancelAnimationFrame(j),window.removeEventListener("resize",I),h&&(A.removeEventListener("mousemove",Z),A.removeEventListener("mouseleave",G)),A&&g.canvas&&A.contains(g.canvas)&&A.removeChild(g.canvas),g.getExtension("WEBGL_lose_context")?.loseContext()}},[n,t,i,o,s,l,f,h,u,c,d,C,p,b,m,y]),e.jsx("div",{ref:z,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},..._})},Fi=ke.memo(Ni);class zi{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#i;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#j;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#o=!1;#n=!1;isDisposed=!1;#s;#a;#r;#l=new at;#t={elapsed:0,delta:0};#d;constructor(t){this.#e={...t},this.#h(),this.#g(),this.#v(),this.resize(),this.#x()}#h(){this.camera=new Mt,this.cameraFov=this.camera.fov}#g(){this.scene=new qe}#v(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const t={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new He(t),this.renderer.outputColorSpace=Pt}#x(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#c.bind(this)),this.#e.size==="parent"&&this.canvas.parentNode&&(this.#a=new ResizeObserver(this.#c.bind(this)),this.#a.observe(this.canvas.parentNode))),this.#s=new IntersectionObserver(this.#b.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#s.observe(this.canvas),document.addEventListener("visibilitychange",this.#f.bind(this))}#y(){window.removeEventListener("resize",this.#c.bind(this)),this.#a?.disconnect(),this.#s?.disconnect(),document.removeEventListener("visibilitychange",this.#f.bind(this))}#b(t){this.#o=t[0].isIntersecting,this.#o?this.#p():this.#u()}#f(){this.#o&&(document.hidden?this.#u():this.#p())}#c(){this.#r&&clearTimeout(this.#r),this.#r=setTimeout(this.resize.bind(this),100)}resize(){let t,i;this.#e.size instanceof Object?(t=this.#e.size.width,i=this.#e.size.height):this.#e.size==="parent"&&this.canvas.parentNode?(t=this.canvas.parentNode.offsetWidth,i=this.canvas.parentNode.offsetHeight):(t=window.innerWidth,i=window.innerHeight),this.size.width=t,this.size.height=i,this.size.ratio=t/i,this.#C(),this.#w(),this.onAfterResize(this.size)}#C(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#m(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#m(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#m(t){const i=Math.tan(Be.degToRad(this.cameraFov/2))/(this.camera.aspect/t);this.camera.fov=2*Be.radToDeg(Math.atan(i))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const t=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(t/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#w(){this.renderer.setSize(this.size.width,this.size.height),this.#i?.setSize(this.size.width,this.size.height);let t=window.devicePixelRatio;this.maxPixelRatio&&t>this.maxPixelRatio?t=this.maxPixelRatio:this.minPixelRatio&&t<this.minPixelRatio&&(t=this.minPixelRatio),this.renderer.setPixelRatio(t),this.size.pixelRatio=t}get postprocessing(){return this.#i}set postprocessing(t){this.#i=t,this.render=t.render.bind(t)}#p(){if(this.#n)return;const t=()=>{this.#d=requestAnimationFrame(t),this.#t.delta=this.#l.getDelta(),this.#t.elapsed+=this.#t.delta,this.onBeforeRender(this.#t),this.render(),this.onAfterRender(this.#t)};this.#n=!0,this.#l.start(),t()}#u(){this.#n&&(cancelAnimationFrame(this.#d),this.#n=!1,this.#l.stop())}#j(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse(t=>{t.isMesh&&typeof t.material=="object"&&t.material!==null&&(Object.keys(t.material).forEach(i=>{const o=t.material[i];o!==null&&typeof o=="object"&&typeof o.dispose=="function"&&o.dispose()}),t.material.dispose(),t.geometry.dispose())}),this.scene.clear()}dispose(){this.#y(),this.#u(),this.clear(),this.#i?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const de=new Map,ce=new pe;let Te=!1;function Ti(n){const t={position:new pe,nPosition:new pe,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...n};return(function(i,o){de.has(i)||(de.set(i,o),Te||(document.body.addEventListener("pointermove",Ve),document.body.addEventListener("pointerleave",Xe),document.body.addEventListener("click",Je),document.body.addEventListener("touchstart",Qe,{passive:!1}),document.body.addEventListener("touchmove",Ke,{passive:!1}),document.body.addEventListener("touchend",Se,{passive:!1}),document.body.addEventListener("touchcancel",Se,{passive:!1}),Te=!0))})(n.domElement,t),t.dispose=()=>{const i=n.domElement;de.delete(i),de.size===0&&(document.body.removeEventListener("pointermove",Ve),document.body.removeEventListener("pointerleave",Xe),document.body.removeEventListener("click",Je),document.body.removeEventListener("touchstart",Qe),document.body.removeEventListener("touchmove",Ke),document.body.removeEventListener("touchend",Se),document.body.removeEventListener("touchcancel",Se),Te=!1)},t}function Ve(n){ce.x=n.clientX,ce.y=n.clientY,Di()}function Di(){for(const[n,t]of de){const i=n.getBoundingClientRect();Pe(i)?(Me(t,i),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t)):t.hover&&!t.touching&&(t.hover=!1,t.onLeave(t))}}function Je(n){ce.x=n.clientX,ce.y=n.clientY;for(const[t,i]of de){const o=t.getBoundingClientRect();Me(i,o),Pe(o)&&i.onClick(i)}}function Xe(){for(const n of de.values())n.hover&&(n.hover=!1,n.onLeave(n))}function Qe(n){if(n.touches.length>0){n.preventDefault(),ce.x=n.touches[0].clientX,ce.y=n.touches[0].clientY;for(const[t,i]of de){const o=t.getBoundingClientRect();Pe(o)&&(i.touching=!0,Me(i,o),i.hover||(i.hover=!0,i.onEnter(i)),i.onMove(i))}}}function Ke(n){if(n.touches.length>0){n.preventDefault(),ce.x=n.touches[0].clientX,ce.y=n.touches[0].clientY;for(const[t,i]of de){const o=t.getBoundingClientRect();Me(i,o),Pe(o)?(i.hover||(i.hover=!0,i.touching=!0,i.onEnter(i)),i.onMove(i)):i.hover&&i.touching&&i.onMove(i)}}}function Se(){for(const[,n]of de)n.touching&&(n.touching=!1,n.hover&&(n.hover=!1,n.onLeave(n)))}function Me(n,t){const{position:i,nPosition:o}=n;i.x=ce.x-t.left,i.y=ce.y-t.top,o.x=i.x/t.width*2-1,o.y=-i.y/t.height*2+1}function Pe(n){const{x:t,y:i}=ce,{left:o,top:s,width:l,height:f}=n;return t>=o&&t<=o+l&&i>=s&&i<=s+f}const{randFloat:Oi,randFloatSpread:De}=Be,Oe=new K,J=new K,Re=new K,Ui=new K,X=new K,Ae=new K,ge=new K,me=new K,Le=new K,Ze=new K;class Bi{constructor(t){this.config=t,this.positionData=new Float32Array(3*t.count).fill(0),this.velocityData=new Float32Array(3*t.count).fill(0),this.sizeData=new Float32Array(t.count).fill(1),this.center=new K,this.#e(),this.setSizes()}#e(){const{config:t,positionData:i}=this;this.center.toArray(i,0);for(let o=1;o<t.count;o++){const s=3*o;i[s]=De(2*t.maxX),i[s+1]=De(2*t.maxY),i[s+2]=De(2*t.maxZ)}}setSizes(){const{config:t,sizeData:i}=this;i[0]=t.size0;for(let o=1;o<t.count;o++)i[o]=Oi(t.minSize,t.maxSize)}update(t){const{config:i,center:o,positionData:s,sizeData:l,velocityData:f}=this;let h=0;i.controlSphere0&&(h=1,Oe.fromArray(s,0),Oe.lerp(o,.1).toArray(s,0),Ui.set(0,0,0).toArray(f,0));for(let u=h;u<i.count;u++){const c=3*u;J.fromArray(s,c),X.fromArray(f,c),X.y-=t.delta*i.gravity*l[u],X.multiplyScalar(i.friction),X.clampLength(0,i.maxVelocity),J.add(X),J.toArray(s,c),X.toArray(f,c)}for(let u=h;u<i.count;u++){const c=3*u;J.fromArray(s,c),X.fromArray(f,c);const d=l[u];for(let C=u+1;C<i.count;C++){const p=3*C;Re.fromArray(s,p),Ae.fromArray(f,p);const m=l[C];ge.copy(Re).sub(J);const y=ge.length(),_=d+m;if(y<_){const z=_-y;me.copy(ge).normalize().multiplyScalar(.5*z),Le.copy(me).multiplyScalar(Math.max(X.length(),1)),Ze.copy(me).multiplyScalar(Math.max(Ae.length(),1)),J.sub(me),X.sub(Le),J.toArray(s,c),X.toArray(f,c),Re.add(me),Ae.add(Ze),Re.toArray(s,p),Ae.toArray(f,p)}}if(i.controlSphere0){ge.copy(Oe).sub(J);const C=ge.length(),p=d+l[0];if(C<p){const m=p-C;me.copy(ge.normalize()).multiplyScalar(m),Le.copy(me).multiplyScalar(Math.max(X.length(),2)),J.sub(me),X.sub(Le)}}Math.abs(J.x)+d>i.maxX&&(J.x=Math.sign(J.x)*(i.maxX-d),X.x=-X.x*i.wallBounce),i.gravity===0?Math.abs(J.y)+d>i.maxY&&(J.y=Math.sign(J.y)*(i.maxY-d),X.y=-X.y*i.wallBounce):J.y-d<-i.maxY&&(J.y=-i.maxY+d,X.y=-X.y*i.wallBounce);const b=Math.max(i.maxZ,i.maxSize);Math.abs(J.z)+d>b&&(J.z=Math.sign(J.z)*(i.maxZ-d),X.z=-X.z*i.wallBounce),J.toArray(s,c),X.toArray(f,c)}}}class Gi extends Ot{constructor(t){super(t),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=i=>{Object.assign(i.uniforms,this.uniforms),i.fragmentShader=`
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      `+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("void main() {",`
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
      `);const o=Ut.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);i.fragmentShader=i.fragmentShader.replace("#include <lights_fragment_begin>",o),this.onBeforeCompile2&&this.onBeforeCompile2(i)}}}const qi={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},ve=new Lt;class Hi extends Et{constructor(t,i={}){const o={...qi,...i},s=new Nt,l=new Ft(t,.04).fromScene(s).texture,f=new zt,h=new Gi({envMap:l,...o.materialParams});h.envMapRotation.x=-Math.PI/2,super(f,h,o.count),this.config=o,this.physics=new Bi(o),this.#e(),this.setColors(o.colors)}#e(){this.ambientLight=new Tt(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new Dt(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(t){if(Array.isArray(t)&&t.length>1){const i=(function(o){let s,l;function f(h){s=h,l=[],s.forEach(u=>{l.push(new _e(u))})}return f(o),{setColors:f,getColorAt:function(h,u=new _e){const c=Math.max(0,Math.min(1,h))*(s.length-1),d=Math.floor(c),b=l[d];if(d>=s.length-1)return b.clone();const C=c-d,p=l[d+1];return u.r=b.r+C*(p.r-b.r),u.g=b.g+C*(p.g-b.g),u.b=b.b+C*(p.b-b.b),u}}})(t);for(let o=0;o<this.count;o++)this.setColorAt(o,i.getColorAt(o/this.count)),o===0&&this.light.color.copy(i.getColorAt(o/this.count));this.instanceColor.needsUpdate=!0}}update(t){this.physics.update(t);for(let i=0;i<this.count;i++)ve.position.fromArray(this.physics.positionData,3*i),i===0&&this.config.followCursor===!1?ve.scale.setScalar(0):ve.scale.setScalar(this.physics.sizeData[i]),ve.updateMatrix(),this.setMatrixAt(i,ve.matrix),i===0&&this.light.position.copy(ve.position);this.instanceMatrix.needsUpdate=!0}}function Yi(n,t={}){const i=new zi({canvas:n,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let o;i.renderer.toneMapping=kt,i.camera.position.set(0,0,20),i.camera.lookAt(0,0,0),i.cameraMaxAspect=1.5,i.resize(),c(t);const s=new _t,l=new It(new K(0,0,1),0),f=new K;let h=!1;n.style.touchAction="none",n.style.userSelect="none",n.style.webkitUserSelect="none";const u=Ti({domElement:n,onMove(){s.setFromCamera(u.nPosition,i.camera),i.camera.getWorldDirection(l.normal),s.ray.intersectPlane(l,f),o.physics.center.copy(f),o.config.controlSphere0=!0},onLeave(){o.config.controlSphere0=!1}});function c(d){o&&(i.clear(),i.scene.remove(o)),o=new Hi(i.renderer,d),i.scene.add(o)}return i.onBeforeRender=d=>{h||o.update(d)},i.onAfterResize=d=>{o.config.maxX=d.wWidth/2,o.config.maxY=d.wHeight/2},{three:i,get spheres(){return o},setCount(d){c({...o.config,count:d})},togglePause(){h=!h},dispose(){u.dispose(),i.dispose()}}}const Wi=({className:n="",followCursor:t=!0,count:i=100,gravity:o=.5,friction:s=.9975,wallBounce:l=.95,colors:f=[0,0,0],...h})=>{const u=a.useRef(null),c=a.useRef(null);return a.useEffect(()=>{const d=u.current;if(d)return c.current=Yi(d,{followCursor:t,count:i,gravity:o,friction:s,wallBounce:l,colors:f,...h}),()=>{c.current&&c.current.dispose()}},[]),a.useEffect(()=>{const d=c.current;if(!d||!d.spheres)return;const b=d.spheres.config;b.gravity=o,b.friction=s,b.wallBounce=l,b.followCursor=t,d.spheres.setColors(f)},[o,s,l,t,f]),a.useEffect(()=>{const d=c.current;d&&d.setCount(i)},[i]),e.jsx("canvas",{className:n,ref:u,style:{width:"100%",height:"100%"}})},Vi=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Ji=`
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
`,Ue=8;function $e(n){let t=n.trim();t.startsWith("#")&&(t=t.slice(1));let i=255,o=255,s=255;return t.length===3?(i=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),s=parseInt(t[2]+t[2],16)):t.length===6&&(i=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16)),new K(i/255,o/255,s/255)}function Xi({linesGradient:n,enabledWaves:t=["top","middle","bottom"],lineCount:i=[6],lineDistance:o=[5],topWavePosition:s,middleWavePosition:l,bottomWavePosition:f={x:2,y:-.7,rotate:-1},animationSpeed:h=1,interactive:u=!1,bendRadius:c=5,bendStrength:d=-.5,mouseDamping:b=.05,mixBlendMode:C="screen"}){const p=a.useRef(null),m=a.useRef(null),y=a.useRef(null),_=a.useRef(new pe(-1e3,-1e3)),z=a.useRef(new pe(-1e3,-1e3)),O=a.useRef(0),T=a.useRef(0),W=a.useRef(u);a.useEffect(()=>{W.current=u},[u]);const E=j=>{if(typeof i=="number")return i;if(!t.includes(j))return 0;const x=t.indexOf(j);return i[x]??6},A=j=>{if(typeof o=="number")return o;if(!t.includes(j))return .1;const x=t.indexOf(j);return o[x]??.1},q=t.includes("top")?E("top"):0,g=t.includes("middle")?E("middle"):0,D=t.includes("bottom")?E("bottom"):0,I=t.includes("top")?A("top")*.01:.01,R=t.includes("middle")?A("middle")*.01:.01,B=t.includes("bottom")?A("bottom")*.01:.01;return a.useEffect(()=>{if(y.current&&n&&n.length>0){const j=n.slice(0,Ue);y.current.uniforms.lineGradientCount.value=j.length,j.forEach((x,w)=>{const S=$e(x);y.current.uniforms.lineGradient.value[w].set(S.x,S.y,S.z)})}},[n]),a.useEffect(()=>{if(!y.current)return;const j=y.current.uniforms;j.animationSpeed.value=h,j.bendRadius.value=c,j.bendStrength.value=d,j.interactive.value=u,j.enableTop.value=t.includes("top"),j.enableMiddle.value=t.includes("middle"),j.enableBottom.value=t.includes("bottom");const x=S=>{if(typeof i=="number")return i;if(!t.includes(S))return 0;const U=t.indexOf(S);return i[U]??6},w=S=>{if(typeof o=="number")return o;if(!t.includes(S))return .1;const U=t.indexOf(S);return o[U]??.1};j.topLineCount.value=t.includes("top")?x("top"):0,j.middleLineCount.value=t.includes("middle")?x("middle"):0,j.bottomLineCount.value=t.includes("bottom")?x("bottom"):0,j.topLineDistance.value=t.includes("top")?w("top")*.01:.01,j.middleLineDistance.value=t.includes("middle")?w("middle")*.01:.01,j.bottomLineDistance.value=t.includes("bottom")?w("bottom")*.01:.01},[h,c,d,u,t,i,o]),a.useEffect(()=>{if(!p.current)return;const j=new qe,x=new rt(-1,1,1,-1,0,1);x.position.z=1;const w=new He({antialias:!0,alpha:!1});w.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),w.domElement.style.width="100%",w.domElement.style.height="100%",p.current.appendChild(w.domElement),m.current=w;const S={iTime:{value:0},iResolution:{value:new K(1,1,1)},animationSpeed:{value:h},enableTop:{value:t.includes("top")},enableMiddle:{value:t.includes("middle")},enableBottom:{value:t.includes("bottom")},topLineCount:{value:q},middleLineCount:{value:g},bottomLineCount:{value:D},topLineDistance:{value:I},middleLineDistance:{value:R},bottomLineDistance:{value:B},topWavePosition:{value:new K(s?.x??10,s?.y??.5,s?.rotate??-.4)},middleWavePosition:{value:new K(l?.x??5,l?.y??0,l?.rotate??.2)},bottomWavePosition:{value:new K(f?.x??2,f?.y??-.7,f?.rotate??.4)},iMouse:{value:new pe(-1e3,-1e3)},interactive:{value:u},bendRadius:{value:c},bendStrength:{value:d},bendInfluence:{value:0},lineGradient:{value:Array.from({length:Ue},()=>new K(1,1,1))},lineGradientCount:{value:0}};if(n&&n.length>0){const ne=n.slice(0,Ue);S.lineGradientCount.value=ne.length,ne.forEach((oe,te)=>{const ee=$e(oe);S.lineGradient.value[te].set(ee.x,ee.y,ee.z)})}const U=new lt({uniforms:S,vertexShader:Vi,fragmentShader:Ji});y.current=U;const Z=new ct(2,2),G=new ut(Z,U);j.add(G);const H=new at,$=()=>{const ne=p.current,oe=ne.clientWidth||1,te=ne.clientHeight||1;w.setSize(oe,te,!1);const ee=w.domElement.width,se=w.domElement.height;S.iResolution.value.set(ee,se,1)};$();const r=typeof ResizeObserver<"u"?new ResizeObserver($):null;r&&p.current&&r.observe(p.current);const L=ne=>{if(!W.current)return;const oe=w.domElement.getBoundingClientRect(),te=ne.clientX-oe.left,ee=ne.clientY-oe.top,se=w.getPixelRatio();_.current.set(te*se,(oe.height-ee)*se),O.current=1};window.addEventListener("pointermove",L);let Y=0;const ue=()=>{S.iTime.value=H.getElapsedTime(),W.current&&(z.current.lerp(_.current,b),S.iMouse.value.copy(z.current),T.current+=(O.current-T.current)*b,S.bendInfluence.value=T.current),w.render(j,x),Y=requestAnimationFrame(ue)};return ue(),()=>{cancelAnimationFrame(Y),r&&p.current&&r.disconnect(),window.removeEventListener("pointermove",L),Z.dispose(),U.dispose(),w.dispose(),w.domElement.parentElement&&w.domElement.parentElement.removeChild(w.domElement)}},[]),e.jsx("div",{ref:p,className:"floating-lines-container",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",mixBlendMode:C}})}const Qi=({topColor:n="#5227FF",bottomColor:t="#FF9FFC",intensity:i=1,rotationSpeed:o=.3,interactive:s=!1,className:l="",glowAmount:f=.005,pillarWidth:h=3,pillarHeight:u=.4,noiseIntensity:c=.5,mixBlendMode:d="screen",pillarRotation:b=0,quality:C="high"})=>{const p=a.useRef(null),m=a.useRef(null),y=a.useRef(null),_=a.useRef(null),z=a.useRef(null),O=a.useRef(null),T=a.useRef(null),W=a.useRef(new pe(0,0)),E=a.useRef(0),[A,q]=a.useState(!0);return a.useEffect(()=>{const g=document.createElement("canvas");g.getContext("webgl")||g.getContext("experimental-webgl")||q(!1)},[]),a.useEffect(()=>{if(!p.current||!A)return;const g=p.current,D=g.clientWidth,I=g.clientHeight,R=new qe;z.current=R;const B=new rt(-1,1,1,-1,0,1);O.current=B;const j=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),x=j||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let w=C;x&&C==="high"&&(w="medium"),j&&C!=="low"&&(w="low");const S={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},U=S[w]||S.medium;let Z;try{Z=new He({antialias:!1,alpha:!0,powerPreference:w==="high"?"high-performance":"low-power",precision:U.precision,stencil:!1,depth:!1})}catch{q(!1);return}Z.setSize(D,I),Z.setPixelRatio(U.pixelRatio),p.current.appendChild(Z.domElement),y.current=Z;const G=M=>{const P=new _e(M);return new K(P.r,P.g,P.b)},H=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,$=`
      precision ${U.precision} float;

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

      const float STEP_MULT = ${U.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${U.iterations};
      const int WAVE_ITER = ${U.waveIterations};

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
    `,r=b*Math.PI/180,L=Math.sin(.4),Y=Math.cos(.4),ue=new lt({vertexShader:H,fragmentShader:$,uniforms:{uTime:{value:0},uResolution:{value:new pe(D,I)},uMouse:{value:W.current},uTopColor:{value:G(n)},uBottomColor:{value:G(t)},uIntensity:{value:i},uInteractive:{value:s},uGlowAmount:{value:f},uPillarWidth:{value:h},uPillarHeight:{value:u},uNoiseIntensity:{value:c},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(r)},uPillarRotSin:{value:Math.sin(r)},uWaveSin:{value:L},uWaveCos:{value:Y}},transparent:!0,depthWrite:!1,depthTest:!1});_.current=ue;const ne=new ct(2,2);T.current=ne;const oe=new ut(ne,ue);R.add(oe);let te=null;const ee=M=>{if(!s||te)return;te=window.setTimeout(()=>{te=null},16);const P=g.getBoundingClientRect(),V=(M.clientX-P.left)/P.width*2-1,Q=-((M.clientY-P.top)/P.height)*2+1;W.current.set(V,Q)};s&&g.addEventListener("mousemove",ee,{passive:!0});let se=performance.now();const we=1e3/(w==="low"?30:60),ye=M=>{if(!_.current||!y.current||!z.current||!O.current)return;const P=M-se;if(P>=we){E.current+=.016*o;const V=E.current;_.current.uniforms.uTime.value=V,_.current.uniforms.uRotCos.value=Math.cos(V*.3),_.current.uniforms.uRotSin.value=Math.sin(V*.3),y.current.render(z.current,O.current),se=M-P%we}m.current=requestAnimationFrame(ye)};m.current=requestAnimationFrame(ye);let v=null;const k=()=>{v&&clearTimeout(v),v=window.setTimeout(()=>{if(!y.current||!_.current||!p.current)return;const M=p.current.clientWidth,P=p.current.clientHeight;y.current.setSize(M,P),_.current.uniforms.uResolution.value.set(M,P)},150)};return window.addEventListener("resize",k,{passive:!0}),()=>{window.removeEventListener("resize",k),s&&g.removeEventListener("mousemove",ee),m.current&&cancelAnimationFrame(m.current),y.current&&(y.current.dispose(),y.current.forceContextLoss(),g.contains(y.current.domElement)&&g.removeChild(y.current.domElement)),_.current&&_.current.dispose(),T.current&&T.current.dispose(),y.current=null,_.current=null,z.current=null,O.current=null,T.current=null,m.current=null}},[n,t,i,o,s,f,h,u,c,b,A,C]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),A?e.jsx("div",{ref:p,className:`light-pillar-container ${l}`,style:{mixBlendMode:d}}):e.jsx("div",{className:`light-pillar-fallback ${l}`,style:{mixBlendMode:d},children:"WebGL not supported"})]})},Ki=({floatingLinesConfig:n,lightPillarsConfig:t,ballpitConfig:i,silkConfig:o})=>{const{activeBackground:s,floatingLinesConfig:l,lightPillarsConfig:f,ballpitConfig:h,silkConfig:u}=xe(),c=n||l,d=t||f,b=i||h,C=o||u,p=c||{colors:["#f700ff","#bd71ff","#29b1ff"],count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},m=d||{topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},y=b||{colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1},_=C||{color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0};return e.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:e.jsxs(le,{mode:"wait",children:[s==="gradient"&&e.jsx(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(Mi,{})},"gradient"),s==="galaxy"&&e.jsx(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(Fi,{mouseRepulsion:!1,mouseInteraction:!1,density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5})},"galaxy"),s==="silk"&&e.jsx(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(ht,{speed:_.speed,scale:_.scale,color:_.color,noiseIntensity:_.noiseIntensity,rotation:_.rotation})},"silk"),s==="ballpit"&&e.jsxs(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#111111"},children:[" ",e.jsx(Wi,{count:y.count,gravity:y.gravity,friction:y.friction,wallBounce:y.wallBounce,followCursor:y.followCursor,colors:y.colors})]},"ballpit"),s==="floatinglines"&&e.jsx(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(Xi,{linesGradient:p.colors,lineCount:p.count,lineDistance:p.distance,animationSpeed:.5,bendRadius:p.bendRadius,bendStrength:p.bendStrength,enabledWaves:p.enabledWaves,interactive:p.interactive??!1,parallax:p.parallax??!1})},"floatinglines"),s==="lightpillars"&&e.jsx(F.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(Qi,{topColor:m.topColor,bottomColor:m.bottomColor,intensity:m.intensity,rotationSpeed:m.rotationSpeed,glowAmount:m.glowAmount??.002,pillarWidth:m.pillarWidth,pillarHeight:m.pillarHeight,noiseIntensity:m.noiseIntensity,pillarRotation:m.pillarRotation,interactive:m.interactive??!0,quality:m.quality??"high"})},"lightpillars")]})})},Zi=({onItemClick:n,isOpen:t,onToggle:i,position:o="left",colors:s=["#B19EEF","#5227FF"],items:l=[],socialItems:f=[],displaySocials:h=!0,displayItemNumbering:u=!0,className:c,logoUrl:d=null,menuButtonColor:b="#fff",openMenuButtonColor:C="#000",accentColor:p="#5227FF",changeMenuColorOnOpen:m=!0,isFixed:y=!1,closeOnClickAway:_=!0,onMenuOpen:z,onMenuClose:O})=>{const[T,W]=a.useState(!1),E=typeof t=="boolean",A=E?t:T,q=a.useRef(!1),g=a.useRef(null),D=a.useRef(null),I=a.useRef([]),R=a.useRef(null),B=a.useRef(null),j=a.useRef(null),x=a.useRef(null),w=a.useRef(null),[S,U]=a.useState(["Menu","Close"]),Z=a.useRef(null),G=a.useRef(null),H=a.useRef(null),$=a.useRef(null),r=a.useRef(null),L=a.useRef(null),Y=a.useRef(!1),ue=a.useRef(null);a.useLayoutEffect(()=>{const v=N.context(()=>{const k=g.current,M=D.current,P=R.current,V=B.current,Q=j.current,ie=x.current;if(!k||!P||!V||!Q||!ie)return;let ae=[];M&&(ae=Array.from(M.querySelectorAll(".sm-prelayer"))),I.current=ae;const re=o==="left"?-100:100;N.set([k,...ae],{xPercent:re}),N.set(P,{transformOrigin:"50% 50%",rotate:0}),N.set(V,{transformOrigin:"50% 50%",rotate:90}),N.set(Q,{rotate:0,transformOrigin:"50% 50%"}),N.set(ie,{yPercent:0}),L.current&&N.set(L.current,{color:b})});return()=>v.revert()},[b,o]);const ne=a.useCallback(()=>{const v=g.current,k=I.current;if(!v)return null;Z.current?.kill(),G.current&&(G.current.kill(),G.current=null),ue.current?.kill();const M=Array.from(v.querySelectorAll(".sm-panel-itemLabel")),P=Array.from(v.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),V=v.querySelector(".sm-socials-title"),Q=Array.from(v.querySelectorAll(".sm-socials-link")),ie=k.map(fe=>({el:fe,start:Number(N.getProperty(fe,"xPercent"))})),ae=Number(N.getProperty(v,"xPercent"));M.length&&N.set(M,{yPercent:140,rotate:10}),P.length&&N.set(P,{"--sm-num-opacity":0}),V&&N.set(V,{opacity:0}),Q.length&&N.set(Q,{y:25,opacity:0});const re=N.timeline({paused:!0});ie.forEach((fe,je)=>{re.fromTo(fe.el,{xPercent:fe.start},{xPercent:0,duration:.8,ease:"power4.out"},je*.07)});const Ne=(ie.length?(ie.length-1)*.07:0)+(ie.length?.08:0),Fe=1;if(re.fromTo(v,{xPercent:ae},{xPercent:0,duration:Fe,ease:"power4.out"},Ne),M.length){const je=Ne+Fe*.15;re.to(M,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},je),P.length&&re.to(P,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},je+.1)}if(V||Q.length){const fe=Ne+Fe*.4;V&&re.to(V,{opacity:1,duration:.5,ease:"power2.out"},fe),Q.length&&re.to(Q,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{N.set(Q,{clearProps:"opacity"})}},fe+.04)}return Z.current=re,re},[]),oe=a.useCallback(()=>{if(Y.current)return;Y.current=!0;const v=ne();v?(v.eventCallback("onComplete",()=>{Y.current=!1}),v.play(0)):Y.current=!1},[ne]),te=a.useCallback(()=>{Z.current?.kill(),Z.current=null,ue.current?.kill();const v=g.current,k=I.current;if(!v)return;const M=[...k,v];G.current?.kill();const P=o==="left"?-100:100;G.current=N.to(M,{xPercent:P,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const V=Array.from(v.querySelectorAll(".sm-panel-itemLabel"));V.length&&N.set(V,{yPercent:140,rotate:10});const Q=Array.from(v.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));Q.length&&N.set(Q,{"--sm-num-opacity":0});const ie=v.querySelector(".sm-socials-title"),ae=Array.from(v.querySelectorAll(".sm-socials-link"));ie&&N.set(ie,{opacity:0}),ae.length&&N.set(ae,{y:25,opacity:0}),Y.current=!1}})},[o]),ee=a.useCallback(v=>{const k=j.current;k&&(H.current?.kill(),v?H.current=N.to(k,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):H.current=N.to(k,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),se=a.useCallback(v=>{const k=L.current;if(k)if(r.current?.kill(),m){const M=v?C:b;r.current=N.to(k,{color:M,delay:.18,duration:.3,ease:"power2.out"})}else N.set(k,{color:b})},[C,b,m]);ke.useEffect(()=>{if(L.current)if(m){const v=q.current?C:b;N.set(L.current,{color:v})}else N.set(L.current,{color:b})},[m,b,C]);const he=a.useCallback(v=>{const k=x.current;if(!k)return;$.current?.kill();const M=v?"Menu":"Close",P=v?"Close":"Menu",V=3,Q=[M];let ie=M;for(let Ee=0;Ee<V;Ee++)ie=ie==="Menu"?"Close":"Menu",Q.push(ie);ie!==P&&Q.push(P),Q.push(P),U(Q),N.set(k,{yPercent:0});const ae=Q.length,re=(ae-1)/ae*100;$.current=N.to(k,{yPercent:-re,duration:.5+ae*.07,ease:"power4.out"})},[]),we=a.useCallback(()=>{if(E)i&&i(!A);else{const v=!q.current;q.current=v,W(v),v?(z?.(),oe()):(O?.(),te()),ee(v),se(v),he(v)}},[E,t,i,A,oe,te,ee,se,he,z,O]);ke.useEffect(()=>{E&&(q.current=t,t?(z?.(),oe()):(O?.(),te()),ee(t),se(t),he(t))},[t,E,oe,te,ee,se,he,z,O]);const ye=a.useCallback(()=>{E?A&&i&&i(!1):q.current&&(q.current=!1,W(!1),O?.(),te(),ee(!1),se(!1),he(!1))},[E,A,i,te,ee,se,he,O]);return ke.useEffect(()=>{if(!_||!A)return;const v=k=>{const M=g.current&&g.current.contains(k.target),P=L.current&&L.current.contains(k.target),V=k.target.closest(".shop-overlay");!M&&!P&&!V&&ye()};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[_,A,ye]),e.jsxs("div",{className:(c?c+" ":"")+"staggered-menu-wrapper"+(y?" fixed-wrapper":""),style:p?{"--sm-accent":p}:void 0,"data-position":o,"data-open":A||void 0,children:[e.jsx("div",{ref:D,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let k=[...s&&s.length?s.slice(0,4):["#1e1e22","#35353c"]];if(k.length>=3){const M=Math.floor(k.length/2);k.splice(M,1)}return k.map((M,P)=>e.jsx("div",{className:"sm-prelayer",style:{background:M}},P))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:d?e.jsx("img",{src:d,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:L,className:"sm-toggle","aria-label":A?"Close menu":"Open menu","aria-expanded":A,"aria-controls":"staggered-menu-panel",onClick:we,type:"button",children:[e.jsx("span",{ref:w,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:x,className:"sm-toggle-textInner",children:S.map((v,k)=>e.jsx("span",{className:"sm-toggle-line",children:v},k))})}),e.jsxs("span",{ref:j,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:R,className:"sm-icon-line"}),e.jsx("span",{ref:B,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:g,className:"staggered-menu-panel","aria-hidden":!A,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":u||void 0,children:l&&l.length?l.map((v,k)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:M=>{M.preventDefault(),n&&n(v.id)},"aria-label":v.ariaLabel,"data-index":k+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:v.label})})},v.label+k)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),h&&f&&f.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:f.map((v,k)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:v.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:v.label})},v.label+k))})]})]})})]})},gt=[{name:"Neon",colors:["#f700ff","#bd71ff","#29b1ff"]},{name:"Fire",colors:["#ff0000","#ff7f00","#ffff00"]},{name:"Matrix",colors:["#00ff00","#003300","#ccffcc"]},{name:"Ice",colors:["#00ffff","#ffffff","#0088ff"]},{name:"CMY",colors:["#ff00ff","#ffff00","#00ffff"]}],et={colors:gt[0].colors,count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},$i=[{label:"Baja",value:"low"},{label:"Media",value:"medium"},{label:"Alta",value:"high"}],tt={topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},it={colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1},nt={color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0},en=({onClose:n,floatingLinesConfig:t,setFloatingLinesConfig:i,lightPillarsConfig:o,setLightPillarsConfig:s,ballpitConfig:l,setBallpitConfig:f,silkConfig:h,setSilkConfig:u})=>{const{activeBackground:c,floatingLinesConfig:d,setFloatingLinesConfig:b,lightPillarsConfig:C,setLightPillarsConfig:p,ballpitConfig:m,setBallpitConfig:y,silkConfig:_,setSilkConfig:z}=xe(),O=t||d,T=i||b,W=o||C,E=s||p,A=l||m,q=f||y,g=h||_,D=u||z,I=O||et,R=(r,L)=>{T&&T({...I,[r]:L})},B=r=>{const L=I.enabledWaves,Y=L.includes(r)?L.filter(ue=>ue!==r):[...L,r];R("enabledWaves",Y)},j=(r,L)=>{const Y=[...I.colors];Y[r]=L,R("colors",Y)},x=W||tt,w=(r,L)=>{E?E({...x,[r]:L}):console.warn("setLightPillarsConfig no está definido en el store. Asegúrate de agregarlo.")},S=A||it,U=(r,L)=>{q&&q({...S,[r]:L})},Z=(r,L)=>{const Y=[...S.colors];Y[r]=L,U("colors",Y)},G=g||nt,H=(r,L)=>{D&&D({...G,[r]:L})},$=()=>{c==="floatinglines"&&T?T(et):c==="lightpillars"&&E?E(tt):c==="ballpit"&&q?q(it):c==="silk"&&D&&D(nt)};return e.jsxs("div",{className:"bg-customizer-panel",style:{pointerEvents:"auto"},children:[e.jsxs("div",{className:"bg-customizer-header",children:[e.jsx("h3",{children:"Personalizar Fondo"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:$,className:"reset-btn",title:"Restaurar valores por defecto",children:e.jsx(Bt,{})}),e.jsx("button",{onClick:n,className:"close-btn",children:e.jsx(dt,{})})]})]}),e.jsxs("div",{className:"bg-customizer-content",children:[c==="floatinglines"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Presets de Color"}),e.jsx("div",{className:"presets-grid",children:gt.map(r=>e.jsx("button",{className:"preset-btn",onClick:()=>R("colors",r.colors),style:{background:`linear-gradient(to right, ${r.colors[0]}, ${r.colors[1]}, ${r.colors[2]})`},title:r.name,children:JSON.stringify(I.colors)===JSON.stringify(r.colors)&&e.jsx(ft,{})},r.name))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores Personalizados"}),e.jsx("div",{className:"color-pickers",children:I.colors.map((r,L)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:r,onChange:Y=>j(L,Y.target.value)}),e.jsx("span",{className:"hex-code",children:r})]},L))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad de Líneas ",e.jsx("span",{children:I.count})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:I.count,onChange:r=>R("count",parseInt(r.target.value))}),e.jsxs("label",{children:["Distancia entre Líneas ",e.jsx("span",{children:I.distance})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:I.distance,onChange:r=>R("distance",parseInt(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Radio de Curvatura ",e.jsx("span",{children:I.bendRadius})]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"0.1",value:I.bendRadius,onChange:r=>R("bendRadius",parseFloat(r.target.value))}),e.jsxs("label",{children:["Fuerza de Curvatura ",e.jsx("span",{children:I.bendStrength})]}),e.jsx("input",{type:"range",min:"-2",max:"2",step:"0.1",value:I.bendStrength,onChange:r=>R("bendStrength",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Capas Activas"}),e.jsx("div",{className:"toggles-row",children:["top","middle","bottom"].map(r=>e.jsx("button",{className:`toggle-btn ${I.enabledWaves.includes(r)?"active":""}`,onClick:()=>B(r),children:r.charAt(0).toUpperCase()+r.slice(1)},r))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${I.interactive!==!1?"active":""}`,onClick:()=>R("interactive",I.interactive===!1),style:{width:"100%",textAlign:"center"},children:I.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),c==="lightpillars"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:x.topColor,onChange:r=>w("topColor",r.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:x.bottomColor,onChange:r=>w("bottomColor",r.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Intensidad ",e.jsx("span",{children:x.intensity})]}),e.jsx("input",{type:"range",min:"0.1",max:"3",step:"0.1",value:x.intensity,onChange:r=>w("intensity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:x.rotationSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:x.rotationSpeed,onChange:r=>w("rotationSpeed",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Ancho del Pilar ",e.jsx("span",{children:x.pillarWidth})]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.5",value:x.pillarWidth,onChange:r=>w("pillarWidth",parseFloat(r.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[x.pillarRotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:x.pillarRotation,onChange:r=>w("pillarRotation",parseInt(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Altura del Pilar ",e.jsx("span",{children:x.pillarHeight})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:x.pillarHeight,onChange:r=>w("pillarHeight",parseFloat(r.target.value))}),e.jsxs("label",{children:["Intensidad Ruido ",e.jsx("span",{children:x.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:x.noiseIntensity,onChange:r=>w("noiseIntensity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Resplandor ",e.jsx("span",{children:x.glowAmount})]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.02",step:"0.0001",value:x.glowAmount,onChange:r=>w("glowAmount",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Calidad"}),e.jsx("div",{className:"toggles-row",children:$i.map(r=>e.jsx("button",{className:`toggle-btn ${x.quality===r.value?"active":""}`,onClick:()=>w("quality",r.value),children:r.label},r.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${x.interactive!==!1?"active":""}`,onClick:()=>w("interactive",x.interactive===!1),style:{width:"100%",textAlign:"center"},children:x.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),c==="ballpit"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsx("div",{className:"color-pickers",children:S.colors.map((r,L)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:r,onChange:Y=>Z(L,Y.target.value)}),e.jsx("span",{className:"hex-code",children:r})]},L))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad ",e.jsx("span",{children:S.count})]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:S.count,onChange:r=>U("count",parseInt(r.target.value))}),e.jsxs("label",{children:["Gravedad ",e.jsx("span",{children:S.gravity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:S.gravity,onChange:r=>U("gravity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Fricción ",e.jsx("span",{children:S.friction})]}),e.jsx("input",{type:"range",min:"0.8",max:"1",step:"0.001",value:S.friction,onChange:r=>U("friction",parseFloat(r.target.value))}),e.jsxs("label",{children:["Rebote Pared ",e.jsx("span",{children:S.wallBounce})]}),e.jsx("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:S.wallBounce,onChange:r=>U("wallBounce",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${S.followCursor?"active":""}`,onClick:()=>U("followCursor",!S.followCursor),style:{width:"100%",textAlign:"center"},children:S.followCursor?"Seguir Cursor":"Cursor Libre"})]})]}),c==="silk"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Color"}),e.jsx("div",{className:"color-pickers",children:e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:G.color,onChange:r=>H("color",r.target.value)}),e.jsx("span",{className:"hex-code",children:G.color})]})})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:G.speed})]}),e.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",value:G.speed,onChange:r=>H("speed",parseFloat(r.target.value))}),e.jsxs("label",{children:["Escala ",e.jsx("span",{children:G.scale})]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:G.scale,onChange:r=>H("scale",parseFloat(r.target.value))}),e.jsxs("label",{children:["Ruido ",e.jsx("span",{children:G.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:G.noiseIntensity,onChange:r=>H("noiseIntensity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[G.rotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"15",value:G.rotation,onChange:r=>H("rotation",parseInt(r.target.value))})]})]})]})]})};function tn({children:n,className:t="",onClick:i,mouseX:o,spring:s,distance:l,magnification:f,baseItemSize:h}){const u=a.useRef(null),c=Ce(0),d=Ge(o,p=>{if(!u.current)return 1/0;const m=u.current.getBoundingClientRect(),y=m.x+m.width/2;return Math.abs(p-y)}),b=Ge(d,[0,l],[f,h]),C=Ie(b,s);return e.jsx(F.div,{ref:u,style:{width:C,height:C,minWidth:C,minHeight:C},onHoverStart:()=>c.set(1),onHoverEnd:()=>c.set(0),onClick:i,className:`dock-item ${t}`,"aria-haspopup":"true",children:a.Children.map(n,p=>a.cloneElement(p,{isHovered:c}))})}function nn({children:n,className:t="",...i}){const{isHovered:o}=i,[s,l]=a.useState(!1);return a.useEffect(()=>{const f=o.on("change",h=>{l(h===1)});return()=>f()},[o]),e.jsx(le,{children:s&&e.jsx(F.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${t}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:n})})}function on({children:n,className:t=""}){return e.jsx("div",{className:`dock-icon ${t}`,children:n})}function sn({items:n,className:t="",spring:i={mass:.1,stiffness:300,damping:20},magnification:o=70,distance:s=200,panelHeight:l=68,dockHeight:f=256,baseItemSize:h=50}){const u=Ce(1/0),c=Ce(0),d=a.useMemo(()=>Math.max(f,o+o/2+4),[o,f]),b=Ge(c,[0,1],[l,d]),C=Ie(b,i);return e.jsx(F.div,{style:{height:C,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(F.div,{onMouseMove:({pageX:p})=>{c.set(1),u.set(p)},onMouseLeave:()=>{c.set(0),u.set(1/0)},className:`dock-panel ${t}`,style:{height:l},role:"toolbar","aria-label":"Application dock",children:n.map((p,m)=>e.jsxs(tn,{onClick:p.onClick,className:p.className,mouseX:u,spring:i,distance:s,magnification:o,baseItemSize:h,children:[e.jsx(on,{children:p.icon}),e.jsx(nn,{children:p.label})]},m))})})}const vt=""+new URL("apple-cat-BHTFRffC.gif",import.meta.url).href,xt=""+new URL("jump-cat-BVsZ-jsy.gif",import.meta.url).href,yt=""+new URL("rolling-cat-BlLA7Xch.gif",import.meta.url).href,bt=""+new URL("duck-BnqypGlP.png",import.meta.url).href,Ct="data:image/png;base64,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",wt=""+new URL("skeleton-run-CHzXkBxe.gif",import.meta.url).href,an={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"},{id:"silk",name:"Silk",description:"Suavidad y elegancia.",price:"Gratis",previewColor:"#ff99cc"},{id:"ballpit",name:"Ball Pit",description:"Física interactiva y relajante.",price:"Gratis",previewColor:"#29b1ff"},{id:"floatinglines",name:"Floating Lines",description:"Ondas de energía interactivas.",price:"Gratis",previewColor:"#bd71ff"},{id:"lightpillars",name:"Light Pillars",description:"Pilares de luz etéreos.",price:"Gratis",previewColor:"#00ffff"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(mt,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(Ht,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:vt,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:xt,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:yt,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:bt,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:Ct,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:wt,alt:"Skeleton",style:{width:"40px"}})}]},rn=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Gt,{})},{id:"cursors",label:"Cursores",icon:e.jsx(mt,{})},{id:"trails",label:"Mascotas",icon:e.jsx(qt,{})}],ln=()=>{const{activeShop:n,openShop:t,closeShop:i,activeBackground:o,setBackground:s,activeCursor:l,setCursor:f,activeTrail:h,setTrail:u}=xe(),[c,d]=a.useState(n);a.useEffect(()=>{n&&d(n)},[n]);const b=an[c]||[],C=m=>{n==="backgrounds"&&s(m),n==="cursors"&&f(m),n==="trails"&&u(m)},p=m=>n==="backgrounds"?o===m:n==="cursors"?l===m:n==="trails"?h===m:!1;return e.jsx(le,{children:n&&e.jsxs(F.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:i,style:{position:"absolute",inset:0}}),e.jsxs(F.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:rn.map(m=>e.jsxs("button",{onClick:()=>t(m.id),className:`tab-btn ${n===m.id?"active":""}`,children:[m.icon,e.jsx("span",{children:m.label}),n===m.id&&e.jsx(F.div,{layoutId:"activeTab",className:"active-line"})]},m.id))}),e.jsx("button",{onClick:i,className:"close-btn",children:e.jsx(dt,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",c==="backgrounds"?"Fondos":c==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(le,{mode:"wait",children:e.jsx(F.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:b.map(m=>e.jsxs("div",{className:`shop-item ${p(m.id)?"equipped":""}`,onClick:()=>C(m.id),children:[e.jsxs("div",{className:"item-preview",style:{background:m.previewColor},children:[m.icon&&e.jsx("div",{className:"preview-icon",children:m.icon}),p(m.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(ft,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:m.name}),e.jsx("p",{children:m.description}),e.jsx("span",{className:"price-tag",children:m.price})]})]},m.id))},c)})})]})]})})},cn=()=>{const{activeTrail:n}=xe(),t=Ce(-100),i=Ce(-100),o={damping:25,stiffness:70,mass:1},s=Ie(t,o),l=Ie(i,o);a.useEffect(()=>{const h=u=>{t.set(u.clientX),i.set(u.clientY)};return window.addEventListener("mousemove",h),()=>window.removeEventListener("mousemove",h)},[t,i]);const f={"apple-cat":vt,"jump-cat":xt,"rolling-cat":yt,duck:bt,pompom:Ct,"skeleton-run":wt,ghost:null};return!n||n==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:f[n]?e.jsx(F.img,{src:f[n],alt:"trail",style:{x:s,y:l,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):n==="ghost"?e.jsx(F.div,{style:{x:s,y:l,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},ot=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],un=({progress:n})=>{const[t,i]=a.useState(0);return a.useEffect(()=>{const o=setInterval(()=>{i(s=>(s+1)%ot.length)},1500);return()=>clearInterval(o)},[]),e.jsxs(F.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(F.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${n}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(F.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:ot[t]},t)})]})]})},dn=""+new URL("For You I'll Die - JAY SAV-BGIKD8t9.mp3",import.meta.url).href,fn=Object.freeze(Object.defineProperty({__proto__:null,default:dn},Symbol.toStringTag,{value:"Module"})),mn=""+new URL("From The Start (Sped Up) - Laufey-D4ysqUTI.mp3",import.meta.url).href,pn=Object.freeze(Object.defineProperty({__proto__:null,default:mn},Symbol.toStringTag,{value:"Module"})),hn=""+new URL("I Really Want to Stay At Your House - Rosa Walton-BKlM1ya2.mp3",import.meta.url).href,gn=Object.freeze(Object.defineProperty({__proto__:null,default:hn},Symbol.toStringTag,{value:"Module"})),vn=""+new URL("La cena - Las Petunias-BzZvyMnw.mp3",import.meta.url).href,xn=Object.freeze(Object.defineProperty({__proto__:null,default:vn},Symbol.toStringTag,{value:"Module"})),yn=""+new URL("Let You Down - Dawid Podsiadło-CMbNZyx7.mp3",import.meta.url).href,bn=Object.freeze(Object.defineProperty({__proto__:null,default:yn},Symbol.toStringTag,{value:"Module"})),Cn=""+new URL("Tek It - Cafuné-DeWKFaBa.mp3",import.meta.url).href,wn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),jn=""+new URL("You and I - d4vd -DLXjY2fT.mp3",import.meta.url).href,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Rn=""+new URL("gourmet - rickyedit-u4-Lg7PG.mp3",import.meta.url).href,An=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),Ln=""+new URL("una manera perfecta de morir - INTERROGACIÓN AMOR-Bn3KiH1Y.mp3",import.meta.url).href,kn=Object.freeze(Object.defineProperty({__proto__:null,default:Ln},Symbol.toStringTag,{value:"Module"})),st=Object.assign({"../../assets/songs/For You I'll Die - JAY SAV.mp3":fn,"../../assets/songs/From The Start (Sped Up) - Laufey.mp3":pn,"../../assets/songs/I Really Want to Stay At Your House - Rosa Walton.mp3":gn,"../../assets/songs/La cena - Las Petunias.mp3":xn,"../../assets/songs/Let You Down - Dawid Podsiadło.mp3":bn,"../../assets/songs/Tek It - Cafuné.mp3":wn,"../../assets/songs/You and I - d4vd .mp3":Sn,"../../assets/songs/gourmet - rickyedit.mp3":An,"../../assets/songs/una manera perfecta de morir - INTERROGACIÓN AMOR.mp3":kn}),be=Object.keys(st).map(n=>({title:n.split("/").pop().split(".")[0].replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase()),artist:"Only U Playlist",src:st[n].default}));be.length===0&&be.push({title:"No Songs Found",artist:"Add mp3 to assets/songs",src:""});const _n=.1,In=({visible:n,onClose:t})=>{const i=a.useRef(null),o=a.useRef(null),[s,l]=a.useState(!1),[f,h]=a.useState(0),[u,c]=a.useState(.05),[d,b]=a.useState(!1),[C,p]=a.useState(!1),[m,y]=a.useState(!1),[_,z]=a.useState(0),[O,T]=a.useState(0),W=be[f];a.useEffect(()=>{i.current&&(i.current.volume=d?0:Math.pow(u,2)*_n)},[u,d]),a.useEffect(()=>{s&&i.current&&i.current.play().catch(R=>console.log("Autoplay blocked",R))},[f]),a.useEffect(()=>{n||(p(!1),y(!1))},[n]),a.useEffect(()=>{const R=B=>{n&&(o.current&&o.current.contains(B.target)||B.target.closest(".dock-outer")||t&&t())};return document.addEventListener("mousedown",R),()=>document.removeEventListener("mousedown",R)},[n,t]);const E=()=>{i.current&&(z(i.current.currentTime),T(i.current.duration||0))},A=R=>{const B=parseFloat(R.target.value);z(B),i.current&&(i.current.currentTime=B)},q=()=>{s?i.current.pause():i.current.play(),l(!s)},g=()=>{h(R=>(R+1)%be.length)},D=R=>{h(R),l(!0),y(!1)},I=R=>{if(!R||isNaN(R))return"0:00";const B=Math.floor(R/60),j=Math.floor(R%60);return`${B}:${j<10?"0":""}${j}`};return e.jsxs(F.div,{ref:o,className:"music-player-container",initial:"hidden",animate:n?"visible":"hidden",variants:{visible:{opacity:1,y:0,scale:1,pointerEvents:"auto"},hidden:{opacity:0,y:50,scale:.95,pointerEvents:"none"}},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("audio",{ref:i,src:W.src,onEnded:g,onTimeUpdate:E,onLoadedMetadata:E,preload:"auto"}),e.jsx(le,{children:m&&e.jsx(F.div,{className:"playlist-popup",initial:{opacity:0,y:10,scale:.95,x:"-50%"},animate:{opacity:1,y:0,scale:1,x:"-50%"},exit:{opacity:0,y:10,scale:.95,x:"-50%"},transition:{duration:.2},children:be.map((R,B)=>e.jsxs("div",{className:`playlist-item ${B===f?"active":""}`,onClick:()=>D(B),children:[B+1,". ",R.title]},B))})}),e.jsx("div",{className:"compact-info",onClick:()=>y(!m),children:e.jsxs("div",{className:"song-title-wrapper",style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{className:"song-title",children:W.title}),e.jsx(Yt,{size:14,style:{minWidth:14,marginLeft:8,opacity:.6}})]})}),e.jsxs("div",{className:"compact-controls-row",children:[e.jsx("button",{className:"mini-play-btn",onClick:q,children:s?e.jsx(Wt,{size:16}):e.jsx(Vt,{size:16,style:{marginLeft:"2px"}})}),e.jsxs("div",{className:"seek-bar-container",children:[e.jsx("input",{type:"range",min:"0",max:O,value:_,onChange:A,className:"seek-slider"}),e.jsxs("div",{className:"time-display",children:[I(_)," / ",I(O)]})]}),e.jsx("button",{className:"icon-btn",onClick:g,children:e.jsx(Jt,{size:18})}),e.jsxs("div",{className:"volume-wrapper",children:[e.jsx("button",{className:`icon-btn ${C?"active":""}`,onClick:()=>p(!C),children:d||u===0?e.jsx(Xt,{size:18}):e.jsx(Qt,{size:18})}),e.jsx(le,{children:C&&e.jsx(F.div,{className:"volume-popup",initial:{opacity:0,scale:.8,x:10},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.8,x:0},children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:d?0:u,onChange:R=>c(parseFloat(R.target.value))})})})]})]})]})},Mn=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],Pn=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function En(){const{isUnlocked:n,openShop:t,closeShop:i,lockGame:o,activeBackground:s}=xe(),[l,f]=a.useState(!0),[h,u]=a.useState(!1),[c,d]=a.useState(!1),[b,C]=a.useState(!1),[p,m]=a.useState(!1),[y,_]=a.useState(null),[z,O]=a.useState(null),[T,W]=a.useState(null),[E,A]=a.useState(null),q=x=>{x&&t(x)},g=()=>{c?(d(!1),b&&f(!0)):(m(!1),C(l),f(!1),d(!0))},D=[{icon:e.jsx(Kt,{size:22}),label:"Texto",onClick:()=>f(!l)},{icon:e.jsx(Zt,{size:22}),label:"Música",onClick:()=>u(!h)},{icon:e.jsx($t,{size:22}),label:"Juego",onClick:()=>console.log("Toggle Game")},{icon:e.jsx(ei,{size:22}),label:"Fondo",onClick:g},{icon:e.jsx(ti,{size:22}),label:"Bloquear",onClick:()=>{o&&(i(),u(!1),_(null),O(null),W(null),A(null),o())}}],[I,R]=a.useState(!0),[B,j]=a.useState(0);return a.useEffect(()=>{const x=setInterval(()=>{j(w=>{const S=w+Math.floor(Math.random()*15)+5;return S>=100?(clearInterval(x),setTimeout(()=>R(!1),200),100):S})},200);return()=>clearInterval(x)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(le,{mode:"wait",children:I&&e.jsx(un,{progress:B},"loader")}),e.jsx(le,{children:!n&&e.jsx(F.div,{initial:{opacity:0,filter:"blur(20px)",scale:1.1},animate:{opacity:1,filter:"blur(0px)",scale:1},exit:{opacity:0,filter:"blur(20px)",scale:1.1,transition:{duration:2}},transition:{duration:2,ease:"easeInOut"},style:{position:"fixed",zIndex:9999,inset:0,background:"#000"},children:e.jsx(ui,{})},"lock-screen")}),e.jsx(le,{children:n&&e.jsxs(F.div,{className:"app-content",initial:{opacity:0,scale:.95,filter:"blur(10px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},exit:{opacity:0,scale:1.1,filter:"blur(10px)",transition:{duration:1}},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},children:[e.jsx(Ki,{floatingLinesConfig:y,lightPillarsConfig:z,ballpitConfig:T,silkConfig:E}),e.jsx(Zi,{isOpen:p,onToggle:x=>{m(x),x&&d(!1)},items:Mn,socialItems:Pn,isFixed:!0,position:"right",onItemClick:q,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(ln,{}),e.jsx(cn,{}),e.jsx(le,{children:l&&e.jsx(F.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},style:{position:"absolute",width:"100%",height:"100%",zIndex:10},children:e.jsx(Ii,{})})}),e.jsx(le,{children:c&&(s==="floatinglines"||s==="lightpillars"||s==="ballpit"||s==="silk")&&e.jsx(F.div,{initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:50},transition:{duration:.3},style:{position:"absolute",top:0,right:0,zIndex:200,height:"100%",pointerEvents:"auto"},children:e.jsx("div",{style:{height:"100%"},children:e.jsx(en,{onClose:g,floatingLinesConfig:y,setFloatingLinesConfig:_,lightPillarsConfig:z,setLightPillarsConfig:O,ballpitConfig:T,setBallpitConfig:W,silkConfig:E,setSilkConfig:A})})})}),e.jsx(In,{visible:h,onClose:()=>u(!1)}),e.jsx(sn,{items:D,panelHeight:60,baseItemSize:45,magnification:60})]},"main-content")})]})}ii.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(En,{})}));
