import{c as wt,j as e,r as a,u as Ct,C as Me,a as jt,F as St,R as _e,O as Rt,A as At,b as Lt,P as _t,V as W,d as ot,e as Mt,S as qe,W as He,f as Pt,M as Be,g as pe,I as It,h as kt,i as Et,k as Nt,l as Ft,m as zt,n as Tt,o as Dt,p as st,q as at,s as rt,t as lt,v as z,w as Ot,x as ct,y as ut,z as Ut,B as dt,D as Bt,E as Gt,G as qt,H as Ht,J as Yt,K as Wt,L as Vt,N as Jt,Q as Xt,T as Qt,U as Kt,X as Zt,Y as $t,Z as ei}from"./vendor-CWohnw__.js";import{A as re,m as T,u as we,a as Ge,b as Pe}from"./framer-motion-CQoqgKBs.js";import{R as ti,T as ii,P as ni,C as Ye,M as oi}from"./ogl--UM621jO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function i(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=i(s);fetch(s.href,c)}})();const xe=wt(n=>({isUnlocked:!1,unlockApp:()=>n({isUnlocked:!0}),lockGame:()=>n({isUnlocked:!1}),activeShop:null,openShop:t=>n({activeShop:t}),closeShop:()=>n({activeShop:null}),activeBackground:"gradient",setBackground:t=>n({activeBackground:t}),activeCursor:"default",setCursor:t=>n({activeCursor:t}),activeTrail:"none",setTrail:t=>n({activeTrail:t})})),si=({text:n,disabled:t=!1,speed:i=3,className:o="",color:s="#7c7c7c",shineColor:c="#ffffff",direction:f="right"})=>e.jsx("div",{className:`shiny-text ${f} ${t?"disabled":""} ${o}`,style:{"--shiny-speed":`${i}s`,"--base-color":s,"--shine-color":c},children:n}),ai=n=>(n=n.replace("#",""),[parseInt(n.slice(0,2),16)/255,parseInt(n.slice(2,4),16)/255,parseInt(n.slice(4,6),16)/255]),ri=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  // FIX: Usar coordenadas de clip directas para llenar la pantalla siempre
  gl_Position = vec4(position, 1.0);
}
`,li=`
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
`,ft=a.forwardRef(function({uniforms:t},i){return Ct((o,s)=>{i.current.material.uniforms.uTime.value+=.1*s}),e.jsxs("mesh",{ref:i,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{uniforms:t,vertexShader:ri,fragmentShader:li})]})});ft.displayName="SilkPlane";const mt=({speed:n=1,scale:t=2,color:i="#ff99cc",noiseIntensity:o=.5,rotation:s=0})=>{const c=a.useRef(),f=a.useMemo(()=>({uSpeed:{value:n},uScale:{value:t},uNoiseIntensity:{value:o},uColor:{value:new Me(...ai(i))},uRotation:{value:s},uTime:{value:0}}),[n,t,o,i,s]);return a.useEffect(()=>{const d=setInterval(()=>window.dispatchEvent(new Event("resize")),50),m=setTimeout(()=>clearInterval(d),1200);return()=>{clearInterval(d),clearTimeout(m)}},[]),e.jsx(jt,{dpr:[1,2],frameloop:"always",resize:{debounce:0},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(ft,{ref:c,uniforms:f})})},ci=()=>{const[n,t]=a.useState(""),[i,o]=a.useState(!1),s=xe(d=>d.unlockApp),c="230824",f=d=>{const m=d.target.value.replace(/\D/g,"");if(m.length>6)return;let l=m;m.length>2&&(l=m.slice(0,2)+"/"+m.slice(2)),m.length>4&&(l=l.slice(0,5)+"/"+m.slice(4)),t(l),o(!1)},p=d=>{d.preventDefault(),n.replace(/\//g,"")===c?s():(o(!0),setTimeout(()=>o(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(mt,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(si,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:p,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:n,onChange:f,className:i?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(St,{size:20})})]})]})]})},ui=""+new URL("bridge-CojLCfPY.jpeg",import.meta.url).href,di=Object.freeze(Object.defineProperty({__proto__:null,default:ui},Symbol.toStringTag,{value:"Module"})),fi=""+new URL("first-D3M4TVfP.jpg",import.meta.url).href,mi=Object.freeze(Object.defineProperty({__proto__:null,default:fi},Symbol.toStringTag,{value:"Module"})),pi=""+new URL("graduated-B6wsMf9J.jpeg",import.meta.url).href,hi=Object.freeze(Object.defineProperty({__proto__:null,default:pi},Symbol.toStringTag,{value:"Module"})),gi=""+new URL("halloween-BidyR4aF.jpg",import.meta.url).href,vi=Object.freeze(Object.defineProperty({__proto__:null,default:gi},Symbol.toStringTag,{value:"Module"})),xi=""+new URL("miestrella-TqC41RJI.jpg",import.meta.url).href,yi=Object.freeze(Object.defineProperty({__proto__:null,default:xi},Symbol.toStringTag,{value:"Module"})),bi=""+new URL("murder-olQPuXYs.jpeg",import.meta.url).href,wi=Object.freeze(Object.defineProperty({__proto__:null,default:bi},Symbol.toStringTag,{value:"Module"})),Ci=""+new URL("rock-DJ9ByMrB.jpeg",import.meta.url).href,ji=Object.freeze(Object.defineProperty({__proto__:null,default:Ci},Symbol.toStringTag,{value:"Module"})),Si=""+new URL("sleepy-vWyZnVIh.jpg",import.meta.url).href,Ri=Object.freeze(Object.defineProperty({__proto__:null,default:Si},Symbol.toStringTag,{value:"Module"})),Ai=""+new URL("sunshine-B5Zoex-L.jpeg",import.meta.url).href,Li=Object.freeze(Object.defineProperty({__proto__:null,default:Ai},Symbol.toStringTag,{value:"Module"})),_i=Object.assign({"../../assets/img/photos/bridge.jpeg":di,"../../assets/img/photos/first.jpg":mi,"../../assets/img/photos/graduated.jpeg":hi,"../../assets/img/photos/halloween.jpg":vi,"../../assets/img/photos/miestrella.jpg":yi,"../../assets/img/photos/murder.jpeg":wi,"../../assets/img/photos/rock.jpeg":ji,"../../assets/img/photos/sleepy.jpg":Ri,"../../assets/img/photos/sunshine.jpeg":Li}),ze=Object.values(_i).map(n=>n.default),Mi=()=>{const[n,t]=a.useState(null);let i=[...ze];if(i.length>0)for(;i.length<18;)i=[...i,...ze];const o=[...i,...i];return e.jsxs("div",{className:"main-container",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),ze.length>0&&e.jsx("div",{className:"gallery-container",children:e.jsx("div",{className:"gallery-track",children:o.map((s,c)=>e.jsx("img",{src:s,alt:`Memory ${c}`,className:"gallery-item",onClick:()=>t(s)},c))})}),e.jsx(re,{children:n&&e.jsx(T.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(10px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},onClick:()=>t(null),style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(0, 0, 0, 0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"},children:e.jsx(T.img,{src:n,initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",damping:25,stiffness:300},style:{maxHeight:"85vh",maxWidth:"90vw",borderRadius:"16px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)"},onClick:s=>s.stopPropagation()})})})]})},Pi=()=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:"linear-gradient(to bottom, #b117f8, #2c0b2e)",animation:"spinGradient 20s linear infinite"}}),e.jsx("style",{children:`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `})]}),Ii=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,ki=`
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
`,Ei=({focal:n=[.5,.5],rotation:t=[1,0],starSpeed:i=0,density:o=1.5,hueShift:s=300,disableAnimation:c=!1,speed:f=.5,mouseInteraction:p=!0,glowIntensity:d=.5,saturation:m=.8,mouseRepulsion:l=!0,repulsionStrength:g=.5,twinkleIntensity:y=.5,rotationSpeed:x=.05,autoCenterRepulsion:h=0,transparent:C=!0,...F})=>{const N=a.useRef(null),O=a.useRef({x:.5,y:.5}),D=a.useRef({x:.5,y:.5}),L=a.useRef(0),P=a.useRef(0);return a.useEffect(()=>{if(!N.current)return;const j=N.current;j.innerHTML="";const U=new ti({alpha:C,premultipliedAlpha:!1,dpr:1}),u=U.gl;C?(u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE_MINUS_SRC_ALPHA),u.clearColor(0,0,0,0)):u.clearColor(0,0,0,1);let _;function I(){U.setSize(j.offsetWidth*1,j.offsetHeight*1),_&&(_.uniforms.uResolution.value=new Ye(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height))}window.addEventListener("resize",I,!1),I();const S=new ii(u);_=new ni(u,{vertex:Ii,fragment:ki,uniforms:{uTime:{value:0},uResolution:{value:new Ye(u.canvas.width,u.canvas.height,u.canvas.width/u.canvas.height)},uFocal:{value:new Float32Array(n)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:i},uDensity:{value:o},uHueShift:{value:s},uSpeed:{value:f},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:d},uSaturation:{value:m},uMouseRepulsion:{value:l},uTwinkleIntensity:{value:y},uRotationSpeed:{value:x},uRepulsionStrength:{value:g},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:h},uTransparent:{value:C}}});const k=new oi(u,{geometry:S,program:_});let w,r=0;const R=1e3/30;function B(X){if(w=requestAnimationFrame(B),!N.current)return;const $=X-r;if($<R)return;r=X-$%R,c||(_.uniforms.uTime.value=X*.001,_.uniforms.uStarSpeed.value=X*.001*i/10);const Q=.05;D.current.x+=(O.current.x-D.current.x)*Q,D.current.y+=(O.current.y-D.current.y)*Q,P.current+=(L.current-P.current)*Q,_.uniforms.uMouse.value[0]=D.current.x,_.uniforms.uMouse.value[1]=D.current.y,_.uniforms.uMouseActiveFactor.value=P.current,U.render({scene:k})}w=requestAnimationFrame(B),j.appendChild(u.canvas),u.canvas.style.width="100%",u.canvas.style.height="100%",u.canvas.style.display="block",u.canvas.style.willChange="transform";function J(X){const $=j.getBoundingClientRect(),Q=(X.clientX-$.left)/$.width,K=1-(X.clientY-$.top)/$.height;O.current={x:Q,y:K},L.current=1}function oe(){L.current=0}return p&&(j.addEventListener("mousemove",J),j.addEventListener("mouseleave",oe)),()=>{cancelAnimationFrame(w),window.removeEventListener("resize",I),p&&(j.removeEventListener("mousemove",J),j.removeEventListener("mouseleave",oe)),j&&u.canvas&&j.contains(u.canvas)&&j.removeChild(u.canvas),u.getExtension("WEBGL_lose_context")?.loseContext()}},[n,t,i,o,s,c,f,p,d,m,l,y,x,g,h,C]),e.jsx("div",{ref:N,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},...F})},Ni=_e.memo(Ei);class Fi{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#i;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#j;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#o=!1;#n=!1;isDisposed=!1;#s;#a;#r;#l=new ot;#t={elapsed:0,delta:0};#d;constructor(t){this.#e={...t},this.#h(),this.#g(),this.#v(),this.resize(),this.#x()}#h(){this.camera=new Mt,this.cameraFov=this.camera.fov}#g(){this.scene=new qe}#v(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const t={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new He(t),this.renderer.outputColorSpace=Pt}#x(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#c.bind(this)),this.#e.size==="parent"&&this.canvas.parentNode&&(this.#a=new ResizeObserver(this.#c.bind(this)),this.#a.observe(this.canvas.parentNode))),this.#s=new IntersectionObserver(this.#b.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#s.observe(this.canvas),document.addEventListener("visibilitychange",this.#f.bind(this))}#y(){window.removeEventListener("resize",this.#c.bind(this)),this.#a?.disconnect(),this.#s?.disconnect(),document.removeEventListener("visibilitychange",this.#f.bind(this))}#b(t){this.#o=t[0].isIntersecting,this.#o?this.#p():this.#u()}#f(){this.#o&&(document.hidden?this.#u():this.#p())}#c(){this.#r&&clearTimeout(this.#r),this.#r=setTimeout(this.resize.bind(this),100)}resize(){let t,i;this.#e.size instanceof Object?(t=this.#e.size.width,i=this.#e.size.height):this.#e.size==="parent"&&this.canvas.parentNode?(t=this.canvas.parentNode.offsetWidth,i=this.canvas.parentNode.offsetHeight):(t=window.innerWidth,i=window.innerHeight),this.size.width=t,this.size.height=i,this.size.ratio=t/i,this.#w(),this.#C(),this.onAfterResize(this.size)}#w(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#m(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#m(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#m(t){const i=Math.tan(Be.degToRad(this.cameraFov/2))/(this.camera.aspect/t);this.camera.fov=2*Be.radToDeg(Math.atan(i))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const t=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(t/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#C(){this.renderer.setSize(this.size.width,this.size.height),this.#i?.setSize(this.size.width,this.size.height);let t=window.devicePixelRatio;this.maxPixelRatio&&t>this.maxPixelRatio?t=this.maxPixelRatio:this.minPixelRatio&&t<this.minPixelRatio&&(t=this.minPixelRatio),this.renderer.setPixelRatio(t),this.size.pixelRatio=t}get postprocessing(){return this.#i}set postprocessing(t){this.#i=t,this.render=t.render.bind(t)}#p(){if(this.#n)return;const t=()=>{this.#d=requestAnimationFrame(t),this.#t.delta=this.#l.getDelta(),this.#t.elapsed+=this.#t.delta,this.onBeforeRender(this.#t),this.render(),this.onAfterRender(this.#t)};this.#n=!0,this.#l.start(),t()}#u(){this.#n&&(cancelAnimationFrame(this.#d),this.#n=!1,this.#l.stop())}#j(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse(t=>{t.isMesh&&typeof t.material=="object"&&t.material!==null&&(Object.keys(t.material).forEach(i=>{const o=t.material[i];o!==null&&typeof o=="object"&&typeof o.dispose=="function"&&o.dispose()}),t.material.dispose(),t.geometry.dispose())}),this.scene.clear()}dispose(){this.#y(),this.#u(),this.clear(),this.#i?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const ue=new Map,le=new pe;let Te=!1;function zi(n){const t={position:new pe,nPosition:new pe,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...n};return(function(i,o){ue.has(i)||(ue.set(i,o),Te||(document.body.addEventListener("pointermove",We),document.body.addEventListener("pointerleave",Je),document.body.addEventListener("click",Ve),document.body.addEventListener("touchstart",Xe,{passive:!1}),document.body.addEventListener("touchmove",Qe,{passive:!1}),document.body.addEventListener("touchend",Se,{passive:!1}),document.body.addEventListener("touchcancel",Se,{passive:!1}),Te=!0))})(n.domElement,t),t.dispose=()=>{const i=n.domElement;ue.delete(i),ue.size===0&&(document.body.removeEventListener("pointermove",We),document.body.removeEventListener("pointerleave",Je),document.body.removeEventListener("click",Ve),document.body.removeEventListener("touchstart",Xe),document.body.removeEventListener("touchmove",Qe),document.body.removeEventListener("touchend",Se),document.body.removeEventListener("touchcancel",Se),Te=!1)},t}function We(n){le.x=n.clientX,le.y=n.clientY,Ti()}function Ti(){for(const[n,t]of ue){const i=n.getBoundingClientRect();ke(i)?(Ie(t,i),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t)):t.hover&&!t.touching&&(t.hover=!1,t.onLeave(t))}}function Ve(n){le.x=n.clientX,le.y=n.clientY;for(const[t,i]of ue){const o=t.getBoundingClientRect();Ie(i,o),ke(o)&&i.onClick(i)}}function Je(){for(const n of ue.values())n.hover&&(n.hover=!1,n.onLeave(n))}function Xe(n){if(n.touches.length>0){n.preventDefault(),le.x=n.touches[0].clientX,le.y=n.touches[0].clientY;for(const[t,i]of ue){const o=t.getBoundingClientRect();ke(o)&&(i.touching=!0,Ie(i,o),i.hover||(i.hover=!0,i.onEnter(i)),i.onMove(i))}}}function Qe(n){if(n.touches.length>0){n.preventDefault(),le.x=n.touches[0].clientX,le.y=n.touches[0].clientY;for(const[t,i]of ue){const o=t.getBoundingClientRect();Ie(i,o),ke(o)?(i.hover||(i.hover=!0,i.touching=!0,i.onEnter(i)),i.onMove(i)):i.hover&&i.touching&&i.onMove(i)}}}function Se(){for(const[,n]of ue)n.touching&&(n.touching=!1,n.hover&&(n.hover=!1,n.onLeave(n)))}function Ie(n,t){const{position:i,nPosition:o}=n;i.x=le.x-t.left,i.y=le.y-t.top,o.x=i.x/t.width*2-1,o.y=-i.y/t.height*2+1}function ke(n){const{x:t,y:i}=le,{left:o,top:s,width:c,height:f}=n;return t>=o&&t<=o+c&&i>=s&&i<=s+f}const{randFloat:Di,randFloatSpread:De}=Be,Oe=new W,q=new W,Re=new W,Oi=new W,H=new W,Ae=new W,ge=new W,me=new W,Le=new W,Ke=new W;class Ui{constructor(t){this.config=t,this.positionData=new Float32Array(3*t.count).fill(0),this.velocityData=new Float32Array(3*t.count).fill(0),this.sizeData=new Float32Array(t.count).fill(1),this.center=new W,this.#e(),this.setSizes()}#e(){const{config:t,positionData:i}=this;this.center.toArray(i,0);for(let o=1;o<t.count;o++){const s=3*o;i[s]=De(2*t.maxX),i[s+1]=De(2*t.maxY),i[s+2]=De(2*t.maxZ)}}setSizes(){const{config:t,sizeData:i}=this;i[0]=t.size0;for(let o=1;o<t.count;o++)i[o]=Di(t.minSize,t.maxSize)}update(t){const{config:i,center:o,positionData:s,sizeData:c,velocityData:f}=this;let p=0;i.controlSphere0&&(p=1,Oe.fromArray(s,0),Oe.lerp(o,.1).toArray(s,0),Oi.set(0,0,0).toArray(f,0));for(let d=p;d<i.count;d++){const m=3*d;q.fromArray(s,m),H.fromArray(f,m),H.y-=t.delta*i.gravity*c[d],H.multiplyScalar(i.friction),H.clampLength(0,i.maxVelocity),q.add(H),q.toArray(s,m),H.toArray(f,m)}for(let d=p;d<i.count;d++){const m=3*d;q.fromArray(s,m),H.fromArray(f,m);const l=c[d];for(let y=d+1;y<i.count;y++){const x=3*y;Re.fromArray(s,x),Ae.fromArray(f,x);const h=c[y];ge.copy(Re).sub(q);const C=ge.length(),F=l+h;if(C<F){const N=F-C;me.copy(ge).normalize().multiplyScalar(.5*N),Le.copy(me).multiplyScalar(Math.max(H.length(),1)),Ke.copy(me).multiplyScalar(Math.max(Ae.length(),1)),q.sub(me),H.sub(Le),q.toArray(s,m),H.toArray(f,m),Re.add(me),Ae.add(Ke),Re.toArray(s,x),Ae.toArray(f,x)}}if(i.controlSphere0){ge.copy(Oe).sub(q);const y=ge.length(),x=l+c[0];if(y<x){const h=x-y;me.copy(ge.normalize()).multiplyScalar(h),Le.copy(me).multiplyScalar(Math.max(H.length(),2)),q.sub(me),H.sub(Le)}}Math.abs(q.x)+l>i.maxX&&(q.x=Math.sign(q.x)*(i.maxX-l),H.x=-H.x*i.wallBounce),i.gravity===0?Math.abs(q.y)+l>i.maxY&&(q.y=Math.sign(q.y)*(i.maxY-l),H.y=-H.y*i.wallBounce):q.y-l<-i.maxY&&(q.y=-i.maxY+l,H.y=-H.y*i.wallBounce);const g=Math.max(i.maxZ,i.maxSize);Math.abs(q.z)+l>g&&(q.z=Math.sign(q.z)*(i.maxZ-l),H.z=-H.z*i.wallBounce),q.toArray(s,m),H.toArray(f,m)}}}class Bi extends Tt{constructor(t){super(t),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=i=>{Object.assign(i.uniforms,this.uniforms),i.fragmentShader=`
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
      `);const o=Dt.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);i.fragmentShader=i.fragmentShader.replace("#include <lights_fragment_begin>",o),this.onBeforeCompile2&&this.onBeforeCompile2(i)}}}const Gi={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0},ve=new Rt;class qi extends It{constructor(t,i={}){const o={...Gi,...i},s=new kt,c=new Et(t,.04).fromScene(s).texture,f=new Nt,p=new Bi({envMap:c,...o.materialParams});p.envMapRotation.x=-Math.PI/2,super(f,p,o.count),this.config=o,this.physics=new Ui(o),this.#e(),this.setColors(o.colors)}#e(){this.ambientLight=new Ft(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new zt(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(t){if(Array.isArray(t)&&t.length>1){const i=(function(o){let s,c;function f(p){s=p,c=[],s.forEach(d=>{c.push(new Me(d))})}return f(o),{setColors:f,getColorAt:function(p,d=new Me){const m=Math.max(0,Math.min(1,p))*(s.length-1),l=Math.floor(m),g=c[l];if(l>=s.length-1)return g.clone();const y=m-l,x=c[l+1];return d.r=g.r+y*(x.r-g.r),d.g=g.g+y*(x.g-g.g),d.b=g.b+y*(x.b-g.b),d}}})(t);for(let o=0;o<this.count;o++)this.setColorAt(o,i.getColorAt(o/this.count)),o===0&&this.light.color.copy(i.getColorAt(o/this.count));this.instanceColor.needsUpdate=!0}}update(t){this.physics.update(t);for(let i=0;i<this.count;i++)ve.position.fromArray(this.physics.positionData,3*i),i===0&&this.config.followCursor===!1?ve.scale.setScalar(0):ve.scale.setScalar(this.physics.sizeData[i]),ve.updateMatrix(),this.setMatrixAt(i,ve.matrix),i===0&&this.light.position.copy(ve.position);this.instanceMatrix.needsUpdate=!0}}function Hi(n,t={}){const i=new Fi({canvas:n,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let o;i.renderer.toneMapping=At,i.camera.position.set(0,0,20),i.camera.lookAt(0,0,0),i.cameraMaxAspect=1.5,i.resize(),m(t);const s=new Lt,c=new _t(new W(0,0,1),0),f=new W;let p=!1;n.style.touchAction="none",n.style.userSelect="none",n.style.webkitUserSelect="none";const d=zi({domElement:n,onMove(){s.setFromCamera(d.nPosition,i.camera),i.camera.getWorldDirection(c.normal),s.ray.intersectPlane(c,f),o.physics.center.copy(f),o.config.controlSphere0=!0},onLeave(){o.config.controlSphere0=!1}});function m(l){o&&(i.clear(),i.scene.remove(o)),o=new qi(i.renderer,l),i.scene.add(o)}return i.onBeforeRender=l=>{p||o.update(l)},i.onAfterResize=l=>{o.config.maxX=l.wWidth/2,o.config.maxY=l.wHeight/2},{three:i,get spheres(){return o},setCount(l){m({...o.config,count:l})},togglePause(){p=!p},dispose(){d.dispose(),i.dispose()}}}const Yi=({className:n="",followCursor:t=!0,count:i=100,gravity:o=.5,friction:s=.9975,wallBounce:c=.95,colors:f=[0,0,0],...p})=>{const d=a.useRef(null),m=a.useRef(null);return a.useEffect(()=>{const l=d.current;if(l)return m.current=Hi(l,{followCursor:t,count:i,gravity:o,friction:s,wallBounce:c,colors:f,...p}),()=>{m.current&&m.current.dispose()}},[]),a.useEffect(()=>{const l=m.current;if(!l||!l.spheres)return;const g=l.spheres.config;g.gravity=o,g.friction=s,g.wallBounce=c,g.followCursor=t,l.spheres.setColors(f)},[o,s,c,t,f]),a.useEffect(()=>{const l=m.current;l&&l.setCount(i)},[i]),e.jsx("canvas",{className:n,ref:d,style:{width:"100%",height:"100%"}})},Wi=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Vi=`
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
`,Ue=8;function Ze(n){let t=n.trim();t.startsWith("#")&&(t=t.slice(1));let i=255,o=255,s=255;return t.length===3?(i=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),s=parseInt(t[2]+t[2],16)):t.length===6&&(i=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16)),new W(i/255,o/255,s/255)}function Ji({linesGradient:n,enabledWaves:t=["top","middle","bottom"],lineCount:i=[6],lineDistance:o=[5],topWavePosition:s,middleWavePosition:c,bottomWavePosition:f={x:2,y:-.7,rotate:-1},animationSpeed:p=1,interactive:d=!1,bendRadius:m=5,bendStrength:l=-.5,mouseDamping:g=.05,mixBlendMode:y="screen"}){const x=a.useRef(null),h=a.useRef(null),C=a.useRef(null),F=a.useRef(new pe(-1e3,-1e3)),N=a.useRef(new pe(-1e3,-1e3)),O=a.useRef(0),D=a.useRef(0),L=a.useRef(d);a.useEffect(()=>{L.current=d},[d]);const P=w=>{if(typeof i=="number")return i;if(!t.includes(w))return 0;const r=t.indexOf(w);return i[r]??6},j=w=>{if(typeof o=="number")return o;if(!t.includes(w))return .1;const r=t.indexOf(w);return o[r]??.1},U=t.includes("top")?P("top"):0,u=t.includes("middle")?P("middle"):0,_=t.includes("bottom")?P("bottom"):0,I=t.includes("top")?j("top")*.01:.01,S=t.includes("middle")?j("middle")*.01:.01,k=t.includes("bottom")?j("bottom")*.01:.01;return a.useEffect(()=>{if(C.current&&n&&n.length>0){const w=n.slice(0,Ue);C.current.uniforms.lineGradientCount.value=w.length,w.forEach((r,b)=>{const R=Ze(r);C.current.uniforms.lineGradient.value[b].set(R.x,R.y,R.z)})}},[n]),a.useEffect(()=>{if(!C.current)return;const w=C.current.uniforms;w.animationSpeed.value=p,w.bendRadius.value=m,w.bendStrength.value=l,w.interactive.value=d,w.enableTop.value=t.includes("top"),w.enableMiddle.value=t.includes("middle"),w.enableBottom.value=t.includes("bottom");const r=R=>{if(typeof i=="number")return i;if(!t.includes(R))return 0;const B=t.indexOf(R);return i[B]??6},b=R=>{if(typeof o=="number")return o;if(!t.includes(R))return .1;const B=t.indexOf(R);return o[B]??.1};w.topLineCount.value=t.includes("top")?r("top"):0,w.middleLineCount.value=t.includes("middle")?r("middle"):0,w.bottomLineCount.value=t.includes("bottom")?r("bottom"):0,w.topLineDistance.value=t.includes("top")?b("top")*.01:.01,w.middleLineDistance.value=t.includes("middle")?b("middle")*.01:.01,w.bottomLineDistance.value=t.includes("bottom")?b("bottom")*.01:.01},[p,m,l,d,t,i,o]),a.useEffect(()=>{if(!x.current)return;const w=new qe,r=new st(-1,1,1,-1,0,1);r.position.z=1;const b=new He({antialias:!0,alpha:!1});b.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),b.domElement.style.width="100%",b.domElement.style.height="100%",x.current.appendChild(b.domElement),h.current=b;const R={iTime:{value:0},iResolution:{value:new W(1,1,1)},animationSpeed:{value:p},enableTop:{value:t.includes("top")},enableMiddle:{value:t.includes("middle")},enableBottom:{value:t.includes("bottom")},topLineCount:{value:U},middleLineCount:{value:u},bottomLineCount:{value:_},topLineDistance:{value:I},middleLineDistance:{value:S},bottomLineDistance:{value:k},topWavePosition:{value:new W(s?.x??10,s?.y??.5,s?.rotate??-.4)},middleWavePosition:{value:new W(c?.x??5,c?.y??0,c?.rotate??.2)},bottomWavePosition:{value:new W(f?.x??2,f?.y??-.7,f?.rotate??.4)},iMouse:{value:new pe(-1e3,-1e3)},interactive:{value:d},bendRadius:{value:m},bendStrength:{value:l},bendInfluence:{value:0},lineGradient:{value:Array.from({length:Ue},()=>new W(1,1,1))},lineGradientCount:{value:0}};if(n&&n.length>0){const te=n.slice(0,Ue);R.lineGradientCount.value=te.length,te.forEach((ie,Z)=>{const V=Ze(ie);R.lineGradient.value[Z].set(V.x,V.y,V.z)})}const B=new at({uniforms:R,vertexShader:Wi,fragmentShader:Vi});C.current=B;const J=new rt(2,2),oe=new lt(J,B);w.add(oe);const X=new ot,$=()=>{const te=x.current,ie=te.clientWidth||1,Z=te.clientHeight||1;b.setSize(ie,Z,!1);const V=b.domElement.width,ne=b.domElement.height;R.iResolution.value.set(V,ne,1)};$();const Q=typeof ResizeObserver<"u"?new ResizeObserver($):null;Q&&x.current&&Q.observe(x.current);const K=te=>{if(!L.current)return;const ie=b.domElement.getBoundingClientRect(),Z=te.clientX-ie.left,V=te.clientY-ie.top,ne=b.getPixelRatio();F.current.set(Z*ne,(ie.height-V)*ne),O.current=1};window.addEventListener("pointermove",K);let ce=0;const fe=()=>{R.iTime.value=X.getElapsedTime(),L.current&&(N.current.lerp(F.current,g),R.iMouse.value.copy(N.current),D.current+=(O.current-D.current)*g,R.bendInfluence.value=D.current),b.render(w,r),ce=requestAnimationFrame(fe)};return fe(),()=>{cancelAnimationFrame(ce),Q&&x.current&&Q.disconnect(),window.removeEventListener("pointermove",K),J.dispose(),B.dispose(),b.dispose(),b.domElement.parentElement&&b.domElement.parentElement.removeChild(b.domElement)}},[]),e.jsx("div",{ref:x,className:"floating-lines-container",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",mixBlendMode:y}})}const Xi=({topColor:n="#5227FF",bottomColor:t="#FF9FFC",intensity:i=1,rotationSpeed:o=.3,interactive:s=!1,className:c="",glowAmount:f=.005,pillarWidth:p=3,pillarHeight:d=.4,noiseIntensity:m=.5,mixBlendMode:l="screen",pillarRotation:g=0,quality:y="high"})=>{const x=a.useRef(null),h=a.useRef(null),C=a.useRef(null),F=a.useRef(null),N=a.useRef(null),O=a.useRef(null),D=a.useRef(null),L=a.useRef(new pe(0,0)),P=a.useRef(0),[j,U]=a.useState(!0);return a.useEffect(()=>{const u=document.createElement("canvas");u.getContext("webgl")||u.getContext("experimental-webgl")||U(!1)},[]),a.useEffect(()=>{if(!x.current||!j)return;const u=x.current,_=u.clientWidth,I=u.clientHeight,S=new qe;N.current=S;const k=new st(-1,1,1,-1,0,1);O.current=k;const w=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),r=w||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let b=y;r&&y==="high"&&(b="medium"),w&&y!=="low"&&(b="low");const R={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},B=R[b]||R.medium;let J;try{J=new He({antialias:!1,alpha:!0,powerPreference:b==="high"?"high-performance":"low-power",precision:B.precision,stencil:!1,depth:!1})}catch{U(!1);return}J.setSize(_,I),J.setPixelRatio(B.pixelRatio),x.current.appendChild(J.domElement),C.current=J;const oe=M=>{const E=new Me(M);return new W(E.r,E.g,E.b)},X=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,$=`
      precision ${B.precision} float;

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

      const float STEP_MULT = ${B.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${B.iterations};
      const int WAVE_ITER = ${B.waveIterations};

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
    `,Q=g*Math.PI/180,K=Math.sin(.4),ce=Math.cos(.4),fe=new at({vertexShader:X,fragmentShader:$,uniforms:{uTime:{value:0},uResolution:{value:new pe(_,I)},uMouse:{value:L.current},uTopColor:{value:oe(n)},uBottomColor:{value:oe(t)},uIntensity:{value:i},uInteractive:{value:s},uGlowAmount:{value:f},uPillarWidth:{value:p},uPillarHeight:{value:d},uNoiseIntensity:{value:m},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(Q)},uPillarRotSin:{value:Math.sin(Q)},uWaveSin:{value:K},uWaveCos:{value:ce}},transparent:!0,depthWrite:!1,depthTest:!1});F.current=fe;const te=new rt(2,2);D.current=te;const ie=new lt(te,fe);S.add(ie);let Z=null;const V=M=>{if(!s||Z)return;Z=window.setTimeout(()=>{Z=null},16);const E=u.getBoundingClientRect(),G=(M.clientX-E.left)/E.width*2-1,Y=-((M.clientY-E.top)/E.height)*2+1;L.current.set(G,Y)};s&&u.addEventListener("mousemove",V,{passive:!0});let ne=performance.now();const Ce=1e3/(b==="low"?30:60),ye=M=>{if(!F.current||!C.current||!N.current||!O.current)return;const E=M-ne;if(E>=Ce){P.current+=.016*o;const G=P.current;F.current.uniforms.uTime.value=G,F.current.uniforms.uRotCos.value=Math.cos(G*.3),F.current.uniforms.uRotSin.value=Math.sin(G*.3),C.current.render(N.current,O.current),ne=M-E%Ce}h.current=requestAnimationFrame(ye)};h.current=requestAnimationFrame(ye);let v=null;const A=()=>{v&&clearTimeout(v),v=window.setTimeout(()=>{if(!C.current||!F.current||!x.current)return;const M=x.current.clientWidth,E=x.current.clientHeight;C.current.setSize(M,E),F.current.uniforms.uResolution.value.set(M,E)},150)};return window.addEventListener("resize",A,{passive:!0}),()=>{window.removeEventListener("resize",A),s&&u.removeEventListener("mousemove",V),h.current&&cancelAnimationFrame(h.current),C.current&&(C.current.dispose(),C.current.forceContextLoss(),u.contains(C.current.domElement)&&u.removeChild(C.current.domElement)),F.current&&F.current.dispose(),D.current&&D.current.dispose(),C.current=null,F.current=null,N.current=null,O.current=null,D.current=null,h.current=null}},[n,t,i,o,s,f,p,d,m,g,j,y]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),j?e.jsx("div",{ref:x,className:`light-pillar-container ${c}`,style:{mixBlendMode:l}}):e.jsx("div",{className:`light-pillar-fallback ${c}`,style:{mixBlendMode:l},children:"WebGL not supported"})]})},Qi=({floatingLinesConfig:n,lightPillarsConfig:t,ballpitConfig:i})=>{const{activeBackground:o,floatingLinesConfig:s,lightPillarsConfig:c,ballpitConfig:f}=xe(),p=n||s,d=t||c,m=i||f,l=p||{colors:["#f700ff","#bd71ff","#29b1ff"],count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},g=d||{topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},y=m||{colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1};return e.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:e.jsxs(re,{mode:"wait",children:[o==="gradient"&&e.jsx(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(Pi,{})},"gradient"),o==="galaxy"&&e.jsx(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(Ni,{mouseRepulsion:!1,mouseInteraction:!1,density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5})},"galaxy"),o==="silk"&&e.jsx(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(mt,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0})},"silk"),o==="ballpit"&&e.jsxs(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#111111"},children:[" ",e.jsx(Yi,{count:y.count,gravity:y.gravity,friction:y.friction,wallBounce:y.wallBounce,followCursor:y.followCursor,colors:y.colors})]},"ballpit"),o==="floatinglines"&&e.jsx(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(Ji,{linesGradient:l.colors,lineCount:l.count,lineDistance:l.distance,animationSpeed:.5,bendRadius:l.bendRadius,bendStrength:l.bendStrength,enabledWaves:l.enabledWaves,interactive:l.interactive??!1,parallax:l.parallax??!1})},"floatinglines"),o==="lightpillars"&&e.jsx(T.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(Xi,{topColor:g.topColor,bottomColor:g.bottomColor,intensity:g.intensity,rotationSpeed:g.rotationSpeed,glowAmount:g.glowAmount??.002,pillarWidth:g.pillarWidth,pillarHeight:g.pillarHeight,noiseIntensity:g.noiseIntensity,pillarRotation:g.pillarRotation,interactive:g.interactive??!0,quality:g.quality??"high"})},"lightpillars")]})})},Ki=({onItemClick:n,isOpen:t,onToggle:i,position:o="left",colors:s=["#B19EEF","#5227FF"],items:c=[],socialItems:f=[],displaySocials:p=!0,displayItemNumbering:d=!0,className:m,logoUrl:l=null,menuButtonColor:g="#fff",openMenuButtonColor:y="#000",accentColor:x="#5227FF",changeMenuColorOnOpen:h=!0,isFixed:C=!1,closeOnClickAway:F=!0,onMenuOpen:N,onMenuClose:O})=>{const[D,L]=a.useState(!1),P=typeof t=="boolean",j=P?t:D,U=a.useRef(!1),u=a.useRef(null),_=a.useRef(null),I=a.useRef([]),S=a.useRef(null),k=a.useRef(null),w=a.useRef(null),r=a.useRef(null),b=a.useRef(null),[R,B]=a.useState(["Menu","Close"]),J=a.useRef(null),oe=a.useRef(null),X=a.useRef(null),$=a.useRef(null),Q=a.useRef(null),K=a.useRef(null),ce=a.useRef(!1),fe=a.useRef(null);a.useLayoutEffect(()=>{const v=z.context(()=>{const A=u.current,M=_.current,E=S.current,G=k.current,Y=w.current,ee=r.current;if(!A||!E||!G||!Y||!ee)return;let se=[];M&&(se=Array.from(M.querySelectorAll(".sm-prelayer"))),I.current=se;const ae=o==="left"?-100:100;z.set([A,...se],{xPercent:ae}),z.set(E,{transformOrigin:"50% 50%",rotate:0}),z.set(G,{transformOrigin:"50% 50%",rotate:90}),z.set(Y,{rotate:0,transformOrigin:"50% 50%"}),z.set(ee,{yPercent:0}),K.current&&z.set(K.current,{color:g})});return()=>v.revert()},[g,o]);const te=a.useCallback(()=>{const v=u.current,A=I.current;if(!v)return null;J.current?.kill(),oe.current&&(oe.current.kill(),oe.current=null),fe.current?.kill();const M=Array.from(v.querySelectorAll(".sm-panel-itemLabel")),E=Array.from(v.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),G=v.querySelector(".sm-socials-title"),Y=Array.from(v.querySelectorAll(".sm-socials-link")),ee=A.map(de=>({el:de,start:Number(z.getProperty(de,"xPercent"))})),se=Number(z.getProperty(v,"xPercent"));M.length&&z.set(M,{yPercent:140,rotate:10}),E.length&&z.set(E,{"--sm-num-opacity":0}),G&&z.set(G,{opacity:0}),Y.length&&z.set(Y,{y:25,opacity:0});const ae=z.timeline({paused:!0});ee.forEach((de,je)=>{ae.fromTo(de.el,{xPercent:de.start},{xPercent:0,duration:.8,ease:"power4.out"},je*.07)});const Ne=(ee.length?(ee.length-1)*.07:0)+(ee.length?.08:0),Fe=1;if(ae.fromTo(v,{xPercent:se},{xPercent:0,duration:Fe,ease:"power4.out"},Ne),M.length){const je=Ne+Fe*.15;ae.to(M,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},je),E.length&&ae.to(E,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},je+.1)}if(G||Y.length){const de=Ne+Fe*.4;G&&ae.to(G,{opacity:1,duration:.5,ease:"power2.out"},de),Y.length&&ae.to(Y,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{z.set(Y,{clearProps:"opacity"})}},de+.04)}return J.current=ae,ae},[]),ie=a.useCallback(()=>{if(ce.current)return;ce.current=!0;const v=te();v?(v.eventCallback("onComplete",()=>{ce.current=!1}),v.play(0)):ce.current=!1},[te]),Z=a.useCallback(()=>{J.current?.kill(),J.current=null,fe.current?.kill();const v=u.current,A=I.current;if(!v)return;const M=[...A,v];oe.current?.kill();const E=o==="left"?-100:100;oe.current=z.to(M,{xPercent:E,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const G=Array.from(v.querySelectorAll(".sm-panel-itemLabel"));G.length&&z.set(G,{yPercent:140,rotate:10});const Y=Array.from(v.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));Y.length&&z.set(Y,{"--sm-num-opacity":0});const ee=v.querySelector(".sm-socials-title"),se=Array.from(v.querySelectorAll(".sm-socials-link"));ee&&z.set(ee,{opacity:0}),se.length&&z.set(se,{y:25,opacity:0}),ce.current=!1}})},[o]),V=a.useCallback(v=>{const A=w.current;A&&(X.current?.kill(),v?X.current=z.to(A,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):X.current=z.to(A,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),ne=a.useCallback(v=>{const A=K.current;if(A)if(Q.current?.kill(),h){const M=v?y:g;Q.current=z.to(A,{color:M,delay:.18,duration:.3,ease:"power2.out"})}else z.set(A,{color:g})},[y,g,h]);_e.useEffect(()=>{if(K.current)if(h){const v=U.current?y:g;z.set(K.current,{color:v})}else z.set(K.current,{color:g})},[h,g,y]);const he=a.useCallback(v=>{const A=r.current;if(!A)return;$.current?.kill();const M=v?"Menu":"Close",E=v?"Close":"Menu",G=3,Y=[M];let ee=M;for(let Ee=0;Ee<G;Ee++)ee=ee==="Menu"?"Close":"Menu",Y.push(ee);ee!==E&&Y.push(E),Y.push(E),B(Y),z.set(A,{yPercent:0});const se=Y.length,ae=(se-1)/se*100;$.current=z.to(A,{yPercent:-ae,duration:.5+se*.07,ease:"power4.out"})},[]),Ce=a.useCallback(()=>{if(P)i&&i(!j);else{const v=!U.current;U.current=v,L(v),v?(N?.(),ie()):(O?.(),Z()),V(v),ne(v),he(v)}},[P,t,i,j,ie,Z,V,ne,he,N,O]);_e.useEffect(()=>{P&&(U.current=t,t?(N?.(),ie()):(O?.(),Z()),V(t),ne(t),he(t))},[t,P,ie,Z,V,ne,he,N,O]);const ye=a.useCallback(()=>{P?j&&i&&i(!1):U.current&&(U.current=!1,L(!1),O?.(),Z(),V(!1),ne(!1),he(!1))},[P,j,i,Z,V,ne,he,O]);return _e.useEffect(()=>{if(!F||!j)return;const v=A=>{const M=u.current&&u.current.contains(A.target),E=K.current&&K.current.contains(A.target),G=A.target.closest(".shop-overlay");!M&&!E&&!G&&ye()};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[F,j,ye]),e.jsxs("div",{className:(m?m+" ":"")+"staggered-menu-wrapper"+(C?" fixed-wrapper":""),style:x?{"--sm-accent":x}:void 0,"data-position":o,"data-open":j||void 0,children:[e.jsx("div",{ref:_,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let A=[...s&&s.length?s.slice(0,4):["#1e1e22","#35353c"]];if(A.length>=3){const M=Math.floor(A.length/2);A.splice(M,1)}return A.map((M,E)=>e.jsx("div",{className:"sm-prelayer",style:{background:M}},E))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:l?e.jsx("img",{src:l,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:K,className:"sm-toggle","aria-label":j?"Close menu":"Open menu","aria-expanded":j,"aria-controls":"staggered-menu-panel",onClick:Ce,type:"button",children:[e.jsx("span",{ref:b,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:r,className:"sm-toggle-textInner",children:R.map((v,A)=>e.jsx("span",{className:"sm-toggle-line",children:v},A))})}),e.jsxs("span",{ref:w,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:S,className:"sm-icon-line"}),e.jsx("span",{ref:k,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:u,className:"staggered-menu-panel","aria-hidden":!j,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":d||void 0,children:c&&c.length?c.map((v,A)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:M=>{M.preventDefault(),n&&n(v.id)},"aria-label":v.ariaLabel,"data-index":A+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:v.label})})},v.label+A)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),p&&f&&f.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:f.map((v,A)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:v.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:v.label})},v.label+A))})]})]})})]})},pt=[{name:"Neon",colors:["#f700ff","#bd71ff","#29b1ff"]},{name:"Fire",colors:["#ff0000","#ff7f00","#ffff00"]},{name:"Matrix",colors:["#00ff00","#003300","#ccffcc"]},{name:"Ice",colors:["#00ffff","#ffffff","#0088ff"]},{name:"CMY",colors:["#ff00ff","#ffff00","#00ffff"]}],$e={colors:pt[0].colors,count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1},Zi=[{label:"Baja",value:"low"},{label:"Media",value:"medium"},{label:"Alta",value:"high"}],et={topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},tt={colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1},$i=({onClose:n,floatingLinesConfig:t,setFloatingLinesConfig:i,lightPillarsConfig:o,setLightPillarsConfig:s,ballpitConfig:c,setBallpitConfig:f})=>{const{activeBackground:p,floatingLinesConfig:d,setFloatingLinesConfig:m,lightPillarsConfig:l,setLightPillarsConfig:g,ballpitConfig:y,setBallpitConfig:x}=xe(),h=t||d,C=i||m,F=o||l,N=s||g,O=c||y,D=f||x,L=h||$e,P=(r,b)=>{C&&C({...L,[r]:b})},j=r=>{const b=L.enabledWaves,R=b.includes(r)?b.filter(B=>B!==r):[...b,r];P("enabledWaves",R)},U=(r,b)=>{const R=[...L.colors];R[r]=b,P("colors",R)},u=F||et,_=(r,b)=>{N?N({...u,[r]:b}):console.warn("setLightPillarsConfig no está definido en el store. Asegúrate de agregarlo.")},I=O||tt,S=(r,b)=>{D&&D({...I,[r]:b})},k=(r,b)=>{const R=[...I.colors];R[r]=b,S("colors",R)},w=()=>{p==="floatinglines"&&C?C($e):p==="lightpillars"&&N?N(et):p==="ballpit"&&D&&D(tt)};return e.jsxs("div",{className:"bg-customizer-panel",style:{pointerEvents:"auto"},children:[e.jsxs("div",{className:"bg-customizer-header",children:[e.jsx("h3",{children:"Personalizar Fondo"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:w,className:"reset-btn",title:"Restaurar valores por defecto",children:e.jsx(Ot,{})}),e.jsx("button",{onClick:n,className:"close-btn",children:e.jsx(ct,{})})]})]}),e.jsxs("div",{className:"bg-customizer-content",children:[p==="floatinglines"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Presets de Color"}),e.jsx("div",{className:"presets-grid",children:pt.map(r=>e.jsx("button",{className:"preset-btn",onClick:()=>P("colors",r.colors),style:{background:`linear-gradient(to right, ${r.colors[0]}, ${r.colors[1]}, ${r.colors[2]})`},title:r.name,children:JSON.stringify(L.colors)===JSON.stringify(r.colors)&&e.jsx(ut,{})},r.name))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores Personalizados"}),e.jsx("div",{className:"color-pickers",children:L.colors.map((r,b)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:r,onChange:R=>U(b,R.target.value)}),e.jsx("span",{className:"hex-code",children:r})]},b))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad de Líneas ",e.jsx("span",{children:L.count})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:L.count,onChange:r=>P("count",parseInt(r.target.value))}),e.jsxs("label",{children:["Distancia entre Líneas ",e.jsx("span",{children:L.distance})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:L.distance,onChange:r=>P("distance",parseInt(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Radio de Curvatura ",e.jsx("span",{children:L.bendRadius})]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"0.1",value:L.bendRadius,onChange:r=>P("bendRadius",parseFloat(r.target.value))}),e.jsxs("label",{children:["Fuerza de Curvatura ",e.jsx("span",{children:L.bendStrength})]}),e.jsx("input",{type:"range",min:"-2",max:"2",step:"0.1",value:L.bendStrength,onChange:r=>P("bendStrength",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Capas Activas"}),e.jsx("div",{className:"toggles-row",children:["top","middle","bottom"].map(r=>e.jsx("button",{className:`toggle-btn ${L.enabledWaves.includes(r)?"active":""}`,onClick:()=>j(r),children:r.charAt(0).toUpperCase()+r.slice(1)},r))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${L.interactive!==!1?"active":""}`,onClick:()=>P("interactive",L.interactive===!1),style:{width:"100%",textAlign:"center"},children:L.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),p==="lightpillars"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:u.topColor,onChange:r=>_("topColor",r.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:u.bottomColor,onChange:r=>_("bottomColor",r.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Intensidad ",e.jsx("span",{children:u.intensity})]}),e.jsx("input",{type:"range",min:"0.1",max:"3",step:"0.1",value:u.intensity,onChange:r=>_("intensity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:u.rotationSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:u.rotationSpeed,onChange:r=>_("rotationSpeed",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Ancho del Pilar ",e.jsx("span",{children:u.pillarWidth})]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.5",value:u.pillarWidth,onChange:r=>_("pillarWidth",parseFloat(r.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[u.pillarRotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:u.pillarRotation,onChange:r=>_("pillarRotation",parseInt(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Altura del Pilar ",e.jsx("span",{children:u.pillarHeight})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:u.pillarHeight,onChange:r=>_("pillarHeight",parseFloat(r.target.value))}),e.jsxs("label",{children:["Intensidad Ruido ",e.jsx("span",{children:u.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:u.noiseIntensity,onChange:r=>_("noiseIntensity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Resplandor ",e.jsx("span",{children:u.glowAmount})]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.02",step:"0.0001",value:u.glowAmount,onChange:r=>_("glowAmount",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Calidad"}),e.jsx("div",{className:"toggles-row",children:Zi.map(r=>e.jsx("button",{className:`toggle-btn ${u.quality===r.value?"active":""}`,onClick:()=>_("quality",r.value),children:r.label},r.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${u.interactive!==!1?"active":""}`,onClick:()=>_("interactive",u.interactive===!1),style:{width:"100%",textAlign:"center"},children:u.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),p==="ballpit"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsx("div",{className:"color-pickers",children:I.colors.map((r,b)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:r,onChange:R=>k(b,R.target.value)}),e.jsx("span",{className:"hex-code",children:r})]},b))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad ",e.jsx("span",{children:I.count})]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:I.count,onChange:r=>S("count",parseInt(r.target.value))}),e.jsxs("label",{children:["Gravedad ",e.jsx("span",{children:I.gravity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:I.gravity,onChange:r=>S("gravity",parseFloat(r.target.value))}),e.jsxs("label",{children:["Fricción ",e.jsx("span",{children:I.friction})]}),e.jsx("input",{type:"range",min:"0.8",max:"1",step:"0.001",value:I.friction,onChange:r=>S("friction",parseFloat(r.target.value))}),e.jsxs("label",{children:["Rebote Pared ",e.jsx("span",{children:I.wallBounce})]}),e.jsx("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:I.wallBounce,onChange:r=>S("wallBounce",parseFloat(r.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${I.followCursor?"active":""}`,onClick:()=>S("followCursor",!I.followCursor),style:{width:"100%",textAlign:"center"},children:I.followCursor?"Seguir Cursor":"Cursor Libre"})]})]})]})]})};function en({children:n,className:t="",onClick:i,mouseX:o,spring:s,distance:c,magnification:f,baseItemSize:p}){const d=a.useRef(null),m=we(0),l=Ge(o,x=>{if(!d.current)return 1/0;const h=d.current.getBoundingClientRect(),C=h.x+h.width/2;return Math.abs(x-C)}),g=Ge(l,[0,c],[f,p]),y=Pe(g,s);return e.jsx(T.div,{ref:d,style:{width:y,height:y,minWidth:y,minHeight:y},onHoverStart:()=>m.set(1),onHoverEnd:()=>m.set(0),onClick:i,className:`dock-item ${t}`,"aria-haspopup":"true",children:a.Children.map(n,x=>a.cloneElement(x,{isHovered:m}))})}function tn({children:n,className:t="",...i}){const{isHovered:o}=i,[s,c]=a.useState(!1);return a.useEffect(()=>{const f=o.on("change",p=>{c(p===1)});return()=>f()},[o]),e.jsx(re,{children:s&&e.jsx(T.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${t}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:n})})}function nn({children:n,className:t=""}){return e.jsx("div",{className:`dock-icon ${t}`,children:n})}function on({items:n,className:t="",spring:i={mass:.1,stiffness:300,damping:20},magnification:o=70,distance:s=200,panelHeight:c=68,dockHeight:f=256,baseItemSize:p=50}){const d=we(1/0),m=we(0),l=a.useMemo(()=>Math.max(f,o+o/2+4),[o,f]),g=Ge(m,[0,1],[c,l]),y=Pe(g,i);return e.jsx(T.div,{style:{height:y,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(T.div,{onMouseMove:({pageX:x})=>{m.set(1),d.set(x)},onMouseLeave:()=>{m.set(0),d.set(1/0)},className:`dock-panel ${t}`,style:{height:c},role:"toolbar","aria-label":"Application dock",children:n.map((x,h)=>e.jsxs(en,{onClick:x.onClick,className:x.className,mouseX:d,spring:i,distance:s,magnification:o,baseItemSize:p,children:[e.jsx(nn,{children:x.icon}),e.jsx(tn,{children:x.label})]},h))})})}const ht=""+new URL("apple-cat-BHTFRffC.gif",import.meta.url).href,gt=""+new URL("jump-cat-BVsZ-jsy.gif",import.meta.url).href,vt=""+new URL("rolling-cat-BlLA7Xch.gif",import.meta.url).href,xt=""+new URL("duck-BnqypGlP.png",import.meta.url).href,yt="data:image/png;base64,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",bt=""+new URL("skeleton-run-CHzXkBxe.gif",import.meta.url).href,sn={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"},{id:"silk",name:"Silk",description:"Suavidad y elegancia.",price:"Gratis",previewColor:"#ff99cc"},{id:"ballpit",name:"Ball Pit",description:"Física interactiva y relajante.",price:"Gratis",previewColor:"#29b1ff"},{id:"floatinglines",name:"Floating Lines",description:"Ondas de energía interactivas.",price:"Gratis",previewColor:"#bd71ff"},{id:"lightpillars",name:"Light Pillars",description:"Pilares de luz etéreos.",price:"Gratis",previewColor:"#00ffff"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(dt,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(Gt,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:ht,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:gt,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:vt,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:xt,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:yt,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:bt,alt:"Skeleton",style:{width:"40px"}})}]},an=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Ut,{})},{id:"cursors",label:"Cursores",icon:e.jsx(dt,{})},{id:"trails",label:"Mascotas",icon:e.jsx(Bt,{})}],rn=()=>{const{activeShop:n,openShop:t,closeShop:i,activeBackground:o,setBackground:s,activeCursor:c,setCursor:f,activeTrail:p,setTrail:d}=xe(),[m,l]=a.useState(n);a.useEffect(()=>{n&&l(n)},[n]);const g=sn[m]||[],y=h=>{n==="backgrounds"&&s(h),n==="cursors"&&f(h),n==="trails"&&d(h)},x=h=>n==="backgrounds"?o===h:n==="cursors"?c===h:n==="trails"?p===h:!1;return e.jsx(re,{children:n&&e.jsxs(T.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:i,style:{position:"absolute",inset:0}}),e.jsxs(T.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:an.map(h=>e.jsxs("button",{onClick:()=>t(h.id),className:`tab-btn ${n===h.id?"active":""}`,children:[h.icon,e.jsx("span",{children:h.label}),n===h.id&&e.jsx(T.div,{layoutId:"activeTab",className:"active-line"})]},h.id))}),e.jsx("button",{onClick:i,className:"close-btn",children:e.jsx(ct,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",m==="backgrounds"?"Fondos":m==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(re,{mode:"wait",children:e.jsx(T.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:g.map(h=>e.jsxs("div",{className:`shop-item ${x(h.id)?"equipped":""}`,onClick:()=>y(h.id),children:[e.jsxs("div",{className:"item-preview",style:{background:h.previewColor},children:[h.icon&&e.jsx("div",{className:"preview-icon",children:h.icon}),x(h.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(ut,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:h.name}),e.jsx("p",{children:h.description}),e.jsx("span",{className:"price-tag",children:h.price})]})]},h.id))},m)})})]})]})})},ln=()=>{const{activeTrail:n}=xe(),t=we(-100),i=we(-100),o={damping:25,stiffness:70,mass:1},s=Pe(t,o),c=Pe(i,o);a.useEffect(()=>{const p=d=>{t.set(d.clientX),i.set(d.clientY)};return window.addEventListener("mousemove",p),()=>window.removeEventListener("mousemove",p)},[t,i]);const f={"apple-cat":ht,"jump-cat":gt,"rolling-cat":vt,duck:xt,pompom:yt,"skeleton-run":bt,ghost:null};return!n||n==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:f[n]?e.jsx(T.img,{src:f[n],alt:"trail",style:{x:s,y:c,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):n==="ghost"?e.jsx(T.div,{style:{x:s,y:c,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},it=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],cn=({progress:n})=>{const[t,i]=a.useState(0);return a.useEffect(()=>{const o=setInterval(()=>{i(s=>(s+1)%it.length)},1500);return()=>clearInterval(o)},[]),e.jsxs(T.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[n,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(T.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${n}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(T.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:it[t]},t)})]})]})},un=""+new URL("For You I'll Die - JAY SAV-BGIKD8t9.mp3",import.meta.url).href,dn=Object.freeze(Object.defineProperty({__proto__:null,default:un},Symbol.toStringTag,{value:"Module"})),fn=""+new URL("From The Start (Sped Up) - Laufey-D4ysqUTI.mp3",import.meta.url).href,mn=Object.freeze(Object.defineProperty({__proto__:null,default:fn},Symbol.toStringTag,{value:"Module"})),pn=""+new URL("I Really Want to Stay At Your House - Rosa Walton-BKlM1ya2.mp3",import.meta.url).href,hn=Object.freeze(Object.defineProperty({__proto__:null,default:pn},Symbol.toStringTag,{value:"Module"})),gn=""+new URL("La cena - Las Petunias-BzZvyMnw.mp3",import.meta.url).href,vn=Object.freeze(Object.defineProperty({__proto__:null,default:gn},Symbol.toStringTag,{value:"Module"})),xn=""+new URL("Let You Down - Dawid Podsiadło-CMbNZyx7.mp3",import.meta.url).href,yn=Object.freeze(Object.defineProperty({__proto__:null,default:xn},Symbol.toStringTag,{value:"Module"})),bn=""+new URL("Tek It - Cafuné-DeWKFaBa.mp3",import.meta.url).href,wn=Object.freeze(Object.defineProperty({__proto__:null,default:bn},Symbol.toStringTag,{value:"Module"})),Cn=""+new URL("You and I - d4vd -DLXjY2fT.mp3",import.meta.url).href,jn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),Sn=""+new URL("gourmet - rickyedit-u4-Lg7PG.mp3",import.meta.url).href,Rn=Object.freeze(Object.defineProperty({__proto__:null,default:Sn},Symbol.toStringTag,{value:"Module"})),An=""+new URL("una manera perfecta de morir - INTERROGACIÓN AMOR-Bn3KiH1Y.mp3",import.meta.url).href,Ln=Object.freeze(Object.defineProperty({__proto__:null,default:An},Symbol.toStringTag,{value:"Module"})),nt=Object.assign({"../../assets/songs/For You I'll Die - JAY SAV.mp3":dn,"../../assets/songs/From The Start (Sped Up) - Laufey.mp3":mn,"../../assets/songs/I Really Want to Stay At Your House - Rosa Walton.mp3":hn,"../../assets/songs/La cena - Las Petunias.mp3":vn,"../../assets/songs/Let You Down - Dawid Podsiadło.mp3":yn,"../../assets/songs/Tek It - Cafuné.mp3":wn,"../../assets/songs/You and I - d4vd .mp3":jn,"../../assets/songs/gourmet - rickyedit.mp3":Rn,"../../assets/songs/una manera perfecta de morir - INTERROGACIÓN AMOR.mp3":Ln}),be=Object.keys(nt).map(n=>({title:n.split("/").pop().split(".")[0].replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase()),artist:"Only U Playlist",src:nt[n].default}));be.length===0&&be.push({title:"No Songs Found",artist:"Add mp3 to assets/songs",src:""});const _n=.1,Mn=({visible:n,onClose:t})=>{const i=a.useRef(null),o=a.useRef(null),[s,c]=a.useState(!1),[f,p]=a.useState(0),[d,m]=a.useState(.05),[l,g]=a.useState(!1),[y,x]=a.useState(!1),[h,C]=a.useState(!1),[F,N]=a.useState(0),[O,D]=a.useState(0),L=be[f];a.useEffect(()=>{i.current&&(i.current.volume=l?0:Math.pow(d,2)*_n)},[d,l]),a.useEffect(()=>{s&&i.current&&i.current.play().catch(S=>console.log("Autoplay blocked",S))},[f]),a.useEffect(()=>{n||(x(!1),C(!1))},[n]),a.useEffect(()=>{const S=k=>{n&&(o.current&&o.current.contains(k.target)||k.target.closest(".dock-outer")||t&&t())};return document.addEventListener("mousedown",S),()=>document.removeEventListener("mousedown",S)},[n,t]);const P=()=>{i.current&&(N(i.current.currentTime),D(i.current.duration||0))},j=S=>{const k=parseFloat(S.target.value);N(k),i.current&&(i.current.currentTime=k)},U=()=>{s?i.current.pause():i.current.play(),c(!s)},u=()=>{p(S=>(S+1)%be.length)},_=S=>{p(S),c(!0),C(!1)},I=S=>{if(!S||isNaN(S))return"0:00";const k=Math.floor(S/60),w=Math.floor(S%60);return`${k}:${w<10?"0":""}${w}`};return e.jsxs(T.div,{ref:o,className:"music-player-container",initial:"hidden",animate:n?"visible":"hidden",variants:{visible:{opacity:1,y:0,scale:1,pointerEvents:"auto"},hidden:{opacity:0,y:50,scale:.95,pointerEvents:"none"}},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("audio",{ref:i,src:L.src,onEnded:u,onTimeUpdate:P,onLoadedMetadata:P,preload:"auto"}),e.jsx(re,{children:h&&e.jsx(T.div,{className:"playlist-popup",initial:{opacity:0,y:10,scale:.95,x:"-50%"},animate:{opacity:1,y:0,scale:1,x:"-50%"},exit:{opacity:0,y:10,scale:.95,x:"-50%"},transition:{duration:.2},children:be.map((S,k)=>e.jsxs("div",{className:`playlist-item ${k===f?"active":""}`,onClick:()=>_(k),children:[k+1,". ",S.title]},k))})}),e.jsx("div",{className:"compact-info",onClick:()=>C(!h),children:e.jsxs("div",{className:"song-title-wrapper",style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{className:"song-title",children:L.title}),e.jsx(qt,{size:14,style:{minWidth:14,marginLeft:8,opacity:.6}})]})}),e.jsxs("div",{className:"compact-controls-row",children:[e.jsx("button",{className:"mini-play-btn",onClick:U,children:s?e.jsx(Ht,{size:16}):e.jsx(Yt,{size:16,style:{marginLeft:"2px"}})}),e.jsxs("div",{className:"seek-bar-container",children:[e.jsx("input",{type:"range",min:"0",max:O,value:F,onChange:j,className:"seek-slider"}),e.jsxs("div",{className:"time-display",children:[I(F)," / ",I(O)]})]}),e.jsx("button",{className:"icon-btn",onClick:u,children:e.jsx(Wt,{size:18})}),e.jsxs("div",{className:"volume-wrapper",children:[e.jsx("button",{className:`icon-btn ${y?"active":""}`,onClick:()=>x(!y),children:l||d===0?e.jsx(Vt,{size:18}):e.jsx(Jt,{size:18})}),e.jsx(re,{children:y&&e.jsx(T.div,{className:"volume-popup",initial:{opacity:0,scale:.8,x:10},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.8,x:0},children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:l?0:d,onChange:S=>m(parseFloat(S.target.value))})})})]})]})]})},Pn=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],In=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function kn(){const{isUnlocked:n,openShop:t,closeShop:i,lockGame:o,activeBackground:s}=xe(),[c,f]=a.useState(!0),[p,d]=a.useState(!1),[m,l]=a.useState(!1),[g,y]=a.useState(!1),[x,h]=a.useState(!1),[C,F]=a.useState(null),[N,O]=a.useState(null),[D,L]=a.useState(null),P=k=>{k&&t(k)},j=()=>{m?(l(!1),g&&f(!0)):(h(!1),y(c),f(!1),l(!0))},U=[{icon:e.jsx(Xt,{size:22}),label:"Texto",onClick:()=>f(!c)},{icon:e.jsx(Qt,{size:22}),label:"Música",onClick:()=>d(!p)},{icon:e.jsx(Kt,{size:22}),label:"Juego",onClick:()=>console.log("Toggle Game")},{icon:e.jsx(Zt,{size:22}),label:"Fondo",onClick:j},{icon:e.jsx($t,{size:22}),label:"Bloquear",onClick:()=>{o&&(i(),d(!1),o())}}],[u,_]=a.useState(!0),[I,S]=a.useState(0);return a.useEffect(()=>{const k=setInterval(()=>{S(w=>{const r=w+Math.floor(Math.random()*15)+5;return r>=100?(clearInterval(k),setTimeout(()=>_(!1),200),100):r})},200);return()=>clearInterval(k)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(re,{mode:"wait",children:u&&e.jsx(cn,{progress:I},"loader")}),e.jsx(re,{children:!n&&e.jsx(T.div,{initial:{opacity:0,filter:"blur(20px)",scale:1.1},animate:{opacity:1,filter:"blur(0px)",scale:1},exit:{opacity:0,filter:"blur(20px)",scale:1.1,transition:{duration:2}},transition:{duration:2,ease:"easeInOut"},style:{position:"fixed",zIndex:9999,inset:0,background:"#000"},children:e.jsx(ci,{})},"lock-screen")}),e.jsx(re,{children:n&&e.jsxs(T.div,{className:"app-content",initial:{opacity:0,scale:.95,filter:"blur(10px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},exit:{opacity:0,scale:1.1,filter:"blur(10px)",transition:{duration:1}},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},children:[e.jsx(Qi,{floatingLinesConfig:C,lightPillarsConfig:N,ballpitConfig:D}),e.jsx(Ki,{isOpen:x,onToggle:k=>{h(k),k&&l(!1)},items:Pn,socialItems:In,isFixed:!0,position:"right",onItemClick:P,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(rn,{}),e.jsx(ln,{}),e.jsx(re,{children:c&&e.jsx(T.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},style:{position:"absolute",width:"100%",height:"100%",zIndex:10},children:e.jsx(Mi,{})})}),e.jsx(re,{children:m&&(s==="floatinglines"||s==="lightpillars"||s==="ballpit")&&e.jsx(T.div,{initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:50},transition:{duration:.3},style:{position:"absolute",top:0,right:0,zIndex:200,height:"100%",pointerEvents:"auto"},children:e.jsx("div",{style:{height:"100%"},children:e.jsx($i,{onClose:j,floatingLinesConfig:C,setFloatingLinesConfig:F,lightPillarsConfig:N,setLightPillarsConfig:O,ballpitConfig:D,setBallpitConfig:L})})})}),e.jsx(Mn,{visible:p,onClose:()=>d(!1)}),e.jsx(on,{items:U,panelHeight:60,baseItemSize:45,magnification:60})]},"main-content")})]})}ei.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(kn,{})}));
