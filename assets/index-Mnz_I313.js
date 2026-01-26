import{c as Pt,j as e,r as a,u as Lt,C as we,a as It,F as _t,R as Ne,O as Mt,A as Et,b as Nt,P as Ft,V as oe,d as pt,e as zt,S as ze,W as Te,f as Tt,M as He,g as be,I as Dt,h as Ot,i as Ut,k as Bt,l as Gt,m as qt,n as Ht,o as Vt,p as Ye,q as We,s as Xe,t as Je,v as Y,w as Yt,x as ht,y as gt,z as Wt,B as vt,D as Xt,E as Jt,G as Qt,H as Kt,J as Zt,K as $t,L as en,N as tn,Q as nn,T as on,U as sn,X as an,Y as rn,Z as ln}from"./vendor-CWohnw__.js";import{A as ge,m as G,u as Pe,a as Ve,b as Fe}from"./framer-motion-CQoqgKBs.js";import{R as cn,T as un,P as dn,C as Qe,M as fn}from"./ogl--UM621jO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Re=Pt(i=>({isUnlocked:!1,unlockApp:()=>i({isUnlocked:!0}),lockGame:()=>i({isUnlocked:!1}),activeShop:null,openShop:t=>i({activeShop:t}),closeShop:()=>i({activeShop:null}),activeBackground:"gradient",setBackground:t=>i({activeBackground:t}),activeCursor:"default",setCursor:t=>i({activeCursor:t}),activeTrail:"none",setTrail:t=>i({activeTrail:t})})),mn=({text:i,disabled:t=!1,speed:n=3,className:o="",color:r="#7c7c7c",shineColor:l="#ffffff",direction:u="right"})=>e.jsx("div",{className:`shiny-text ${u} ${t?"disabled":""} ${o}`,style:{"--shiny-speed":`${n}s`,"--base-color":r,"--shine-color":l},children:i}),Ke=i=>(i=i.replace("#",""),[parseInt(i.slice(0,2),16)/255,parseInt(i.slice(2,4),16)/255,parseInt(i.slice(4,6),16)/255]),pn=`
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
`,xt=a.forwardRef(function({uniforms:t},n){return Lt((o,r)=>{n.current.material.uniforms.uTime.value+=.1*r}),e.jsxs("mesh",{ref:n,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{uniforms:t,vertexShader:pn,fragmentShader:hn})]})});xt.displayName="SilkPlane";const yt=({speed:i=1,scale:t=2,color:n="#ff99cc",noiseIntensity:o=.5,rotation:r=0})=>{const l=a.useRef(),u=a.useMemo(()=>({uSpeed:{value:i},uScale:{value:t},uNoiseIntensity:{value:o},uColor:{value:new we(...Ke(n))},uRotation:{value:r},uTime:{value:0}}),[]);return a.useEffect(()=>{if(l.current){const d=l.current.material.uniforms;d.uSpeed.value=i,d.uScale.value=t,d.uNoiseIntensity.value=o,d.uColor.value.set(...Ke(n)),d.uRotation.value=r}},[i,t,o,n,r]),a.useEffect(()=>{const c=setInterval(()=>window.dispatchEvent(new Event("resize")),50),m=setTimeout(()=>clearInterval(c),1200);return()=>{clearInterval(c),clearTimeout(m)}},[]),e.jsx(It,{dpr:[1,2],frameloop:"always",resize:{debounce:0},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(xt,{ref:l,uniforms:u})})},gn=()=>{const[i,t]=a.useState(""),[n,o]=a.useState(!1),r=Re(c=>c.unlockApp),l="230824",u=c=>{const m=c.target.value.replace(/\D/g,"");if(m.length>6)return;let p=m;m.length>2&&(p=m.slice(0,2)+"/"+m.slice(2)),m.length>4&&(p=p.slice(0,5)+"/"+m.slice(4)),t(p),o(!1)},d=c=>{c.preventDefault(),i.replace(/\//g,"")===l?r():(o(!0),setTimeout(()=>o(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(yt,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(mn,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:d,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:i,onChange:u,className:n?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(_t,{size:20})})]})]})]})},vn=""+new URL("bridge-CojLCfPY.jpeg",import.meta.url).href,xn=Object.freeze(Object.defineProperty({__proto__:null,default:vn},Symbol.toStringTag,{value:"Module"})),yn=""+new URL("first-D3M4TVfP.jpg",import.meta.url).href,bn=Object.freeze(Object.defineProperty({__proto__:null,default:yn},Symbol.toStringTag,{value:"Module"})),Cn=""+new URL("graduated-B6wsMf9J.jpeg",import.meta.url).href,wn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),jn=""+new URL("halloween-BidyR4aF.jpg",import.meta.url).href,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Rn=""+new URL("miestrella-TqC41RJI.jpg",import.meta.url).href,An=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),kn=""+new URL("murder-olQPuXYs.jpeg",import.meta.url).href,Pn=Object.freeze(Object.defineProperty({__proto__:null,default:kn},Symbol.toStringTag,{value:"Module"})),Ln=""+new URL("rock-DJ9ByMrB.jpeg",import.meta.url).href,In=Object.freeze(Object.defineProperty({__proto__:null,default:Ln},Symbol.toStringTag,{value:"Module"})),_n=""+new URL("sleepy-vWyZnVIh.jpg",import.meta.url).href,Mn=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"})),En=""+new URL("sunshine-B5Zoex-L.jpeg",import.meta.url).href,Nn=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"})),Fn=Object.assign({"../../assets/img/photos/bridge.jpeg":xn,"../../assets/img/photos/first.jpg":bn,"../../assets/img/photos/graduated.jpeg":wn,"../../assets/img/photos/halloween.jpg":Sn,"../../assets/img/photos/miestrella.jpg":An,"../../assets/img/photos/murder.jpeg":Pn,"../../assets/img/photos/rock.jpeg":In,"../../assets/img/photos/sleepy.jpg":Mn,"../../assets/img/photos/sunshine.jpeg":Nn}),Ue=Object.values(Fn).map(i=>i.default),zn=()=>{const[i,t]=a.useState(null);let n=[...Ue];if(n.length>0)for(;n.length<18;)n=[...n,...Ue];const o=[...n,...n];return e.jsxs("div",{className:"main-container",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),Ue.length>0&&e.jsx("div",{className:"gallery-container",children:e.jsx("div",{className:"gallery-track",children:o.map((r,l)=>e.jsx("img",{src:r,alt:`Memory ${l}`,className:"gallery-item",onClick:()=>t(r)},l))})}),e.jsx(ge,{children:i&&e.jsx(G.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(10px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},onClick:()=>t(null),style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(0, 0, 0, 0.7)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"},children:e.jsx(G.img,{src:i,initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{type:"spring",damping:25,stiffness:300},style:{maxHeight:"85vh",maxWidth:"90vw",borderRadius:"16px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.1)"},onClick:r=>r.stopPropagation()})})})]})},Tn=({color1:i="#b117f8",color2:t="#2c0b2e",speed:n=20})=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:`linear-gradient(to bottom, ${i}, ${t})`,animation:`spinGradient ${n}s linear infinite`}}),e.jsx("style",{children:`
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
`,Un=({focal:i=[.5,.5],rotation:t=[1,0],starSpeed:n=0,density:o=1.5,hueShift:r=300,disableAnimation:l=!1,speed:u=.5,mouseInteraction:d=!0,glowIntensity:c=.5,saturation:m=.8,mouseRepulsion:p=!0,repulsionStrength:C=.5,twinkleIntensity:y=.5,rotationSpeed:x=.05,autoCenterRepulsion:g=0,transparent:w=!0,rainbow:k=!1,warp:U=!1,...B})=>{const W=a.useRef(null),q=a.useRef({x:.5,y:.5}),N=a.useRef({x:.5,y:.5}),P=a.useRef(0),I=a.useRef(0),S=a.useRef(r);return a.useEffect(()=>{if(!W.current)return;const v=W.current;v.innerHTML="";const _=new cn({alpha:w,premultipliedAlpha:!1,dpr:1}),h=_.gl;w?(h.enable(h.BLEND),h.blendFunc(h.SRC_ALPHA,h.ONE_MINUS_SRC_ALPHA),h.clearColor(0,0,0,0)):h.clearColor(0,0,0,1);let b;function X(){_.setSize(v.offsetWidth*1,v.offsetHeight*1),b&&(b.uniforms.uResolution.value=new Qe(h.canvas.width,h.canvas.height,h.canvas.width/h.canvas.height))}window.addEventListener("resize",X,!1),X();const le=new un(h);b=new dn(h,{vertex:Dn,fragment:On,uniforms:{uTime:{value:0},uResolution:{value:new Qe(h.canvas.width,h.canvas.height,h.canvas.width/h.canvas.height)},uFocal:{value:new Float32Array(i)},uRotation:{value:new Float32Array(t)},uStarSpeed:{value:n},uDensity:{value:o},uHueShift:{value:r},uSpeed:{value:u},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:c},uSaturation:{value:m},uMouseRepulsion:{value:p},uTwinkleIntensity:{value:y},uRotationSpeed:{value:x},uRepulsionStrength:{value:C},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:g},uTransparent:{value:w}}});const R=new fn(h,{geometry:le,program:b});let H,M=0;const Q=1e3/30;function Z(V){if(H=requestAnimationFrame(Z),!W.current)return;const $=V-M;if($<Q)return;if(M=V-$%Q,!l){b.uniforms.uTime.value=V*.001;const me=U?n*10:n;b.uniforms.uStarSpeed.value=V*.001*me/10,k?(S.current+=.5,b.uniforms.uHueShift.value=S.current%360):b.uniforms.uHueShift.value=r}const se=.05;N.current.x+=(q.current.x-N.current.x)*se,N.current.y+=(q.current.y-N.current.y)*se,I.current+=(P.current-I.current)*se,b.uniforms.uMouse.value[0]=N.current.x,b.uniforms.uMouse.value[1]=N.current.y,b.uniforms.uMouseActiveFactor.value=I.current,_.render({scene:R})}H=requestAnimationFrame(Z),v.appendChild(h.canvas),h.canvas.style.width="100%",h.canvas.style.height="100%",h.canvas.style.display="block",h.canvas.style.willChange="transform";function ue(V){const $=v.getBoundingClientRect(),se=(V.clientX-$.left)/$.width,me=1-(V.clientY-$.top)/$.height;q.current={x:se,y:me},P.current=1}function de(){P.current=0}return d&&(v.addEventListener("mousemove",ue),v.addEventListener("mouseleave",de)),()=>{cancelAnimationFrame(H),window.removeEventListener("resize",X),d&&(v.removeEventListener("mousemove",ue),v.removeEventListener("mouseleave",de)),v&&h.canvas&&v.contains(h.canvas)&&v.removeChild(h.canvas),h.getExtension("WEBGL_lose_context")?.loseContext()}},[i,t,n,o,r,l,u,d,c,m,p,y,x,C,g,w,k,U]),e.jsx("div",{ref:W,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},...B})},Bn=Ne.memo(Un);class Gn{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#n;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#j;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#o=!1;#i=!1;isDisposed=!1;#s;#a;#r;#l=new pt;#t={elapsed:0,delta:0};#d;constructor(t){this.#e={...t},this.#h(),this.#g(),this.#v(),this.resize(),this.#x()}#h(){this.camera=new zt,this.cameraFov=this.camera.fov}#g(){this.scene=new ze}#v(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const t={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new Te(t),this.renderer.outputColorSpace=Tt}#x(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#c.bind(this)),this.#e.size==="parent"&&this.canvas.parentNode&&(this.#a=new ResizeObserver(this.#c.bind(this)),this.#a.observe(this.canvas.parentNode))),this.#s=new IntersectionObserver(this.#b.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#s.observe(this.canvas),document.addEventListener("visibilitychange",this.#f.bind(this))}#y(){window.removeEventListener("resize",this.#c.bind(this)),this.#a?.disconnect(),this.#s?.disconnect(),document.removeEventListener("visibilitychange",this.#f.bind(this))}#b(t){this.#o=t[0].isIntersecting,this.#o?this.#p():this.#u()}#f(){this.#o&&(document.hidden?this.#u():this.#p())}#c(){this.#r&&clearTimeout(this.#r),this.#r=setTimeout(this.resize.bind(this),100)}resize(){let t,n;this.#e.size instanceof Object?(t=this.#e.size.width,n=this.#e.size.height):this.#e.size==="parent"&&this.canvas.parentNode?(t=this.canvas.parentNode.offsetWidth,n=this.canvas.parentNode.offsetHeight):(t=window.innerWidth,n=window.innerHeight),this.size.width=t,this.size.height=n,this.size.ratio=t/n,this.#C(),this.#w(),this.onAfterResize(this.size)}#C(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#m(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#m(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#m(t){const n=Math.tan(He.degToRad(this.cameraFov/2))/(this.camera.aspect/t);this.camera.fov=2*He.radToDeg(Math.atan(n))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const t=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(t/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#w(){this.renderer.setSize(this.size.width,this.size.height),this.#n?.setSize(this.size.width,this.size.height);let t=window.devicePixelRatio;this.maxPixelRatio&&t>this.maxPixelRatio?t=this.maxPixelRatio:this.minPixelRatio&&t<this.minPixelRatio&&(t=this.minPixelRatio),this.renderer.setPixelRatio(t),this.size.pixelRatio=t}get postprocessing(){return this.#n}set postprocessing(t){this.#n=t,this.render=t.render.bind(t)}#p(){if(this.#i)return;const t=()=>{this.#d=requestAnimationFrame(t),this.#t.delta=this.#l.getDelta(),this.#t.elapsed+=this.#t.delta,this.onBeforeRender(this.#t),this.render(),this.onAfterRender(this.#t)};this.#i=!0,this.#l.start(),t()}#u(){this.#i&&(cancelAnimationFrame(this.#d),this.#i=!1,this.#l.stop())}#j(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse(t=>{t.isMesh&&typeof t.material=="object"&&t.material!==null&&(Object.keys(t.material).forEach(n=>{const o=t.material[n];o!==null&&typeof o=="object"&&typeof o.dispose=="function"&&o.dispose()}),t.material.dispose(),t.geometry.dispose())}),this.scene.clear()}dispose(){this.#y(),this.#u(),this.clear(),this.#n?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const ye=new Map,xe=new be;let Be=!1;function qn(i){const t={position:new be,nPosition:new be,hover:!1,touching:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...i};return(function(n,o){ye.has(n)||(ye.set(n,o),Be||(document.body.addEventListener("pointermove",Ze),document.body.addEventListener("pointerleave",et),document.body.addEventListener("click",$e),document.body.addEventListener("touchstart",tt,{passive:!1}),document.body.addEventListener("touchmove",nt,{passive:!1}),document.body.addEventListener("touchend",Le,{passive:!1}),document.body.addEventListener("touchcancel",Le,{passive:!1}),Be=!0))})(i.domElement,t),t.dispose=()=>{const n=i.domElement;ye.delete(n),ye.size===0&&(document.body.removeEventListener("pointermove",Ze),document.body.removeEventListener("pointerleave",et),document.body.removeEventListener("click",$e),document.body.removeEventListener("touchstart",tt),document.body.removeEventListener("touchmove",nt),document.body.removeEventListener("touchend",Le),document.body.removeEventListener("touchcancel",Le),Be=!1)},t}function Ze(i){xe.x=i.clientX,xe.y=i.clientY,Hn()}function Hn(){for(const[i,t]of ye){const n=i.getBoundingClientRect();Oe(n)?(De(t,n),t.hover||(t.hover=!0,t.onEnter(t)),t.onMove(t)):t.hover&&!t.touching&&(t.hover=!1,t.onLeave(t))}}function $e(i){xe.x=i.clientX,xe.y=i.clientY;for(const[t,n]of ye){const o=t.getBoundingClientRect();De(n,o),Oe(o)&&n.onClick(n)}}function et(){for(const i of ye.values())i.hover&&(i.hover=!1,i.onLeave(i))}function tt(i){if(i.touches.length>0){i.preventDefault(),xe.x=i.touches[0].clientX,xe.y=i.touches[0].clientY;for(const[t,n]of ye){const o=t.getBoundingClientRect();Oe(o)&&(n.touching=!0,De(n,o),n.hover||(n.hover=!0,n.onEnter(n)),n.onMove(n))}}}function nt(i){if(i.touches.length>0){i.preventDefault(),xe.x=i.touches[0].clientX,xe.y=i.touches[0].clientY;for(const[t,n]of ye){const o=t.getBoundingClientRect();De(n,o),Oe(o)?(n.hover||(n.hover=!0,n.touching=!0,n.onEnter(n)),n.onMove(n)):n.hover&&n.touching&&n.onMove(n)}}}function Le(){for(const[,i]of ye)i.touching&&(i.touching=!1,i.hover&&(i.hover=!1,i.onLeave(i)))}function De(i,t){const{position:n,nPosition:o}=i;n.x=xe.x-t.left,n.y=xe.y-t.top,o.x=n.x/t.width*2-1,o.y=-n.y/t.height*2+1}function Oe(i){const{x:t,y:n}=xe,{left:o,top:r,width:l,height:u}=i;return t>=o&&t<=o+l&&n>=r&&n<=r+u}const{randFloat:Vn,randFloatSpread:Ge}=He,qe=new oe,ne=new oe,Ie=new oe,Yn=new oe,ie=new oe,_e=new oe,je=new oe,Ce=new oe,Me=new oe,it=new oe;class Wn{constructor(t){this.config=t,this.positionData=new Float32Array(3*t.count).fill(0),this.velocityData=new Float32Array(3*t.count).fill(0),this.sizeData=new Float32Array(t.count).fill(1),this.center=new oe,this.#e(),this.setSizes()}#e(){const{config:t,positionData:n}=this;this.center.toArray(n,0);for(let o=1;o<t.count;o++){const r=3*o;n[r]=Ge(2*t.maxX),n[r+1]=Ge(2*t.maxY),n[r+2]=Ge(2*t.maxZ)}}setSizes(){const{config:t,sizeData:n}=this;n[0]=t.size0;for(let o=1;o<t.count;o++)n[o]=Vn(t.minSize,t.maxSize)}update(t){const{config:n,center:o,positionData:r,sizeData:l,velocityData:u}=this;let d=0;n.controlSphere0&&(d=1,qe.fromArray(r,0),qe.lerp(o,.1).toArray(r,0),Yn.set(0,0,0).toArray(u,0));for(let c=d;c<n.count;c++){const m=3*c;ne.fromArray(r,m),ie.fromArray(u,m),ie.y-=t.delta*n.gravity*l[c],ie.multiplyScalar(n.friction),ie.clampLength(0,n.maxVelocity),ne.add(ie),ne.toArray(r,m),ie.toArray(u,m)}for(let c=d;c<n.count;c++){const m=3*c;ne.fromArray(r,m),ie.fromArray(u,m);const p=l[c];for(let y=c+1;y<n.count;y++){const x=3*y;Ie.fromArray(r,x),_e.fromArray(u,x);const g=l[y];je.copy(Ie).sub(ne);const w=je.length(),k=p+g;if(w<k){const U=k-w;Ce.copy(je).normalize().multiplyScalar(.5*U),Me.copy(Ce).multiplyScalar(Math.max(ie.length(),1)),it.copy(Ce).multiplyScalar(Math.max(_e.length(),1)),ne.sub(Ce),ie.sub(Me),ne.toArray(r,m),ie.toArray(u,m),Ie.add(Ce),_e.add(it),Ie.toArray(r,x),_e.toArray(u,x)}}if(n.controlSphere0){je.copy(qe).sub(ne);const y=je.length(),x=p+l[0];if(y<x){const g=x-y;Ce.copy(je.normalize()).multiplyScalar(g),Me.copy(Ce).multiplyScalar(Math.max(ie.length(),2)),ne.sub(Ce),ie.sub(Me)}}Math.abs(ne.x)+p>n.maxX&&(ne.x=Math.sign(ne.x)*(n.maxX-p),ie.x=-ie.x*n.wallBounce),n.gravity===0?Math.abs(ne.y)+p>n.maxY&&(ne.y=Math.sign(ne.y)*(n.maxY-p),ie.y=-ie.y*n.wallBounce):ne.y-p<-n.maxY&&(ne.y=-n.maxY+p,ie.y=-ie.y*n.wallBounce);const C=Math.max(n.maxZ,n.maxSize);Math.abs(ne.z)+p>C&&(ne.z=Math.sign(ne.z)*(n.maxZ-p),ie.z=-ie.z*n.wallBounce),ne.toArray(r,m),ie.toArray(u,m)}}explode(t,n=.5){const{positionData:o,velocityData:r,config:l}=this;for(let u=0;u<l.count;u++){const d=3*u,c=o[d]-t.x,m=o[d+1]-t.y,p=o[d+2]-t.z,C=c*c+m*m+p*p;if(C<60){const y=Math.sqrt(C)+.01,x=n*50/(y+1),g=(Math.random()-.5)*1.5,w=(Math.random()-.5)*1.5,k=(Math.random()-.5)*1.5;r[d]+=(c/y+g)*x,r[d+1]+=(m/y+w)*x,r[d+2]+=(p/y+k)*x}}}}class Xn extends Ht{constructor(t){super(t),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=n=>{Object.assign(n.uniforms,this.uniforms),n.fragmentShader=`
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
      `);const o=Vt.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",`
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `);n.fragmentShader=n.fragmentShader.replace("#include <lights_fragment_begin>",o),this.onBeforeCompile2&&this.onBeforeCompile2(n)}}}const Jn={count:200,colors:[0,0,0],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1,followCursor:!0,enableExplosion:!1,rainbow:!1},Se=new Mt;class Qn extends Dt{constructor(t,n={}){const o={...Jn,...n},r=new Ot,l=new Ut(t,.04).fromScene(r).texture,u=new Bt,d=new Xn({envMap:l,...o.materialParams});d.envMapRotation.x=-Math.PI/2,super(u,d,o.count),this.config=o,this.physics=new Wn(o),this.#e(),this.setColors(o.colors),this.rainbowHue=0}#e(){this.ambientLight=new Gt(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new qt(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(t){if(Array.isArray(t)&&t.length>1){const n=(function(o){let r,l;function u(d){r=d,l=[],r.forEach(c=>{l.push(new we(c))})}return u(o),{setColors:u,getColorAt:function(d,c=new we){const m=Math.max(0,Math.min(1,d))*(r.length-1),p=Math.floor(m),C=l[p];if(p>=r.length-1)return C.clone();const y=m-p,x=l[p+1];return c.r=C.r+y*(x.r-C.r),c.g=C.g+y*(x.g-C.g),c.b=C.b+y*(x.b-C.b),c}}})(t);for(let o=0;o<this.count;o++)this.setColorAt(o,n.getColorAt(o/this.count)),o===0&&this.light.color.copy(n.getColorAt(o/this.count));this.instanceColor.needsUpdate=!0}}update(t){if(this.physics.update(t),this.config.rainbow){this.rainbowHue+=t.delta*.2,this.light.color.setHSL(this.rainbowHue%1,1,.5);for(let n=0;n<this.count;n++){const o=(this.rainbowHue+n*.05)%1,r=new we().setHSL(o,.9,.6);this.setColorAt(n,r)}this.instanceColor.needsUpdate=!0}for(let n=0;n<this.count;n++)Se.position.fromArray(this.physics.positionData,3*n),n===0&&this.config.followCursor===!1?Se.scale.setScalar(0):Se.scale.setScalar(this.physics.sizeData[n]),Se.updateMatrix(),this.setMatrixAt(n,Se.matrix),n===0&&this.light.position.copy(Se.position);this.instanceMatrix.needsUpdate=!0}}function Kn(i,t={}){const n=new Gn({canvas:i,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let o;n.renderer.toneMapping=Et,n.camera.position.set(0,0,20),n.camera.lookAt(0,0,0),n.cameraMaxAspect=1.5,n.resize(),m(t);const r=new Nt,l=new Ft(new oe(0,0,1),0),u=new oe;let d=!1;i.style.touchAction="none",i.style.userSelect="none",i.style.webkitUserSelect="none";const c=qn({domElement:i,onMove(){r.setFromCamera(c.nPosition,n.camera),n.camera.getWorldDirection(l.normal),r.ray.intersectPlane(l,u),o.physics.center.copy(u),o.config.controlSphere0=!0},onClick(){o&&o.config.enableExplosion&&o.physics.explode(o.physics.center,2)},onLeave(){o.config.controlSphere0=!1}});function m(p){o&&(n.clear(),n.scene.remove(o)),o=new Qn(n.renderer,p),n.scene.add(o)}return n.onBeforeRender=p=>{d||o.update(p)},n.onAfterResize=p=>{o.config.maxX=p.wWidth/2,o.config.maxY=p.wHeight/2},{three:n,get spheres(){return o},setCount(p){m({...o.config,count:p})},togglePause(){d=!d},dispose(){c.dispose(),n.dispose()}}}const Zn=({className:i="",followCursor:t=!0,count:n=100,gravity:o=.5,friction:r=.9975,wallBounce:l=.95,colors:u=[0,0,0],enableExplosion:d=!1,rainbow:c=!1,...m})=>{const p=a.useRef(null),C=a.useRef(null);return a.useEffect(()=>{const y=p.current;if(y)return C.current=Kn(y,{followCursor:t,count:n,gravity:o,friction:r,wallBounce:l,colors:u,enableExplosion:d,rainbow:c,...m}),()=>{C.current&&C.current.dispose()}},[]),a.useEffect(()=>{const y=C.current;if(!y||!y.spheres)return;const x=y.spheres.config;x.gravity=o,x.friction=r,x.wallBounce=l,x.followCursor=t,x.enableExplosion=d,x.rainbow=c,y.spheres.setColors(u)},[o,r,l,t,u,d,c]),a.useEffect(()=>{const y=C.current;y&&y.setCount(n)},[n]),e.jsx("canvas",{className:i,ref:p,style:{width:"100%",height:"100%"}})},$n=`
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
`,Ee=8;function ot(i){let t=i.trim();t.startsWith("#")&&(t=t.slice(1));let n=255,o=255,r=255;return t.length===3?(n=parseInt(t[0]+t[0],16),o=parseInt(t[1]+t[1],16),r=parseInt(t[2]+t[2],16)):t.length===6&&(n=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16)),new oe(n/255,o/255,r/255)}function ti({linesGradient:i,enabledWaves:t=["top","middle","bottom"],lineCount:n=[6],lineDistance:o=[5],topWavePosition:r,middleWavePosition:l,bottomWavePosition:u={x:2,y:-.7,rotate:-1},animationSpeed:d=1,interactive:c=!1,bendRadius:m=5,bendStrength:p=-.5,mouseDamping:C=.05,mixBlendMode:y="screen",rainbow:x=!1}){const g=a.useRef(null),w=a.useRef(null),k=a.useRef(null),U=a.useRef(new be(-1e3,-1e3)),B=a.useRef(new be(-1e3,-1e3)),W=a.useRef(0),q=a.useRef(0),N=a.useRef(x),P=a.useRef(c);a.useEffect(()=>{P.current=c},[c]),a.useEffect(()=>{N.current=x},[x]);const I=R=>{if(typeof n=="number")return n;if(!t.includes(R))return 0;const H=t.indexOf(R);return n[H]??6},S=R=>{if(typeof o=="number")return o;if(!t.includes(R))return .1;const H=t.indexOf(R);return o[H]??.1},v=t.includes("top")?I("top"):0,_=t.includes("middle")?I("middle"):0,h=t.includes("bottom")?I("bottom"):0,b=t.includes("top")?S("top")*.01:.01,X=t.includes("middle")?S("middle")*.01:.01,le=t.includes("bottom")?S("bottom")*.01:.01;return a.useEffect(()=>{if(k.current&&i&&i.length>0&&!x){const R=i.slice(0,Ee);k.current.uniforms.lineGradientCount.value=R.length,R.forEach((H,M)=>{const F=ot(H);k.current.uniforms.lineGradient.value[M].set(F.x,F.y,F.z)})}},[i,x]),a.useEffect(()=>{if(!k.current)return;const R=k.current.uniforms;R.animationSpeed.value=d,R.bendRadius.value=m,R.bendStrength.value=p,R.interactive.value=c,R.enableTop.value=t.includes("top"),R.enableMiddle.value=t.includes("middle"),R.enableBottom.value=t.includes("bottom");const H=F=>{if(typeof n=="number")return n;if(!t.includes(F))return 0;const Q=t.indexOf(F);return n[Q]??6},M=F=>{if(typeof o=="number")return o;if(!t.includes(F))return .1;const Q=t.indexOf(F);return o[Q]??.1};R.topLineCount.value=t.includes("top")?H("top"):0,R.middleLineCount.value=t.includes("middle")?H("middle"):0,R.bottomLineCount.value=t.includes("bottom")?H("bottom"):0,R.topLineDistance.value=t.includes("top")?M("top")*.01:.01,R.middleLineDistance.value=t.includes("middle")?M("middle")*.01:.01,R.bottomLineDistance.value=t.includes("bottom")?M("bottom")*.01:.01},[d,m,p,c,t,n,o]),a.useEffect(()=>{if(!g.current)return;const R=new ze,H=new Ye(-1,1,1,-1,0,1);H.position.z=1;const M=new Te({antialias:!0,alpha:!1});M.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),M.domElement.style.width="100%",M.domElement.style.height="100%",g.current.appendChild(M.domElement),w.current=M;const F={iTime:{value:0},iResolution:{value:new oe(1,1,1)},animationSpeed:{value:d},enableTop:{value:t.includes("top")},enableMiddle:{value:t.includes("middle")},enableBottom:{value:t.includes("bottom")},topLineCount:{value:v},middleLineCount:{value:_},bottomLineCount:{value:h},topLineDistance:{value:b},middleLineDistance:{value:X},bottomLineDistance:{value:le},topWavePosition:{value:new oe(r?.x??10,r?.y??.5,r?.rotate??-.4)},middleWavePosition:{value:new oe(l?.x??5,l?.y??0,l?.rotate??.2)},bottomWavePosition:{value:new oe(u?.x??2,u?.y??-.7,u?.rotate??.4)},iMouse:{value:new be(-1e3,-1e3)},interactive:{value:c},bendRadius:{value:m},bendStrength:{value:p},bendInfluence:{value:0},lineGradient:{value:Array.from({length:Ee},()=>new oe(1,1,1))},lineGradientCount:{value:0}};if(i&&i.length>0){const L=i.slice(0,Ee);F.lineGradientCount.value=L.length,L.forEach((T,ae)=>{const te=ot(T);F.lineGradient.value[ae].set(te.x,te.y,te.z)})}const Q=new We({uniforms:F,vertexShader:$n,fragmentShader:ei});k.current=Q;const Z=new Xe(2,2),ue=new Je(Z,Q);R.add(ue);const de=new pt,V=()=>{const L=g.current,T=L.clientWidth||1,ae=L.clientHeight||1;M.setSize(T,ae,!1);const te=M.domElement.width,O=M.domElement.height;F.iResolution.value.set(te,O,1)};V();const $=typeof ResizeObserver<"u"?new ResizeObserver(V):null;$&&g.current&&$.observe(g.current);const se=L=>{if(!P.current)return;const T=M.domElement.getBoundingClientRect(),ae=L.clientX-T.left,te=L.clientY-T.top,O=M.getPixelRatio();U.current.set(ae*O,(T.height-te)*O),W.current=1};window.addEventListener("pointermove",se);let me=0;const pe=()=>{if(F.iTime.value=de.getElapsedTime(),P.current&&(B.current.lerp(U.current,C),F.iMouse.value.copy(B.current),q.current+=(W.current-q.current)*C,F.bendInfluence.value=q.current),N.current){const L=de.getElapsedTime();F.lineGradientCount.value<3&&(F.lineGradientCount.value=3);for(let T=0;T<Ee;T++){const ae=(L*.1+T*.15)%1,te=new we().setHSL(ae,.8,.5);F.lineGradient.value[T].set(te.r,te.g,te.b)}}M.render(R,H),me=requestAnimationFrame(pe)};return pe(),()=>{cancelAnimationFrame(me),$&&g.current&&$.disconnect(),window.removeEventListener("pointermove",se),Z.dispose(),Q.dispose(),M.dispose(),M.domElement.parentElement&&M.domElement.parentElement.removeChild(M.domElement)}},[]),e.jsx("div",{ref:g,className:"floating-lines-container",style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",mixBlendMode:y}})}const ni=({topColor:i="#5227FF",bottomColor:t="#FF9FFC",intensity:n=1,rotationSpeed:o=.3,interactive:r=!1,className:l="",glowAmount:u=.005,pillarWidth:d=3,pillarHeight:c=.4,noiseIntensity:m=.5,mixBlendMode:p="screen",pillarRotation:C=0,quality:y="high"})=>{const x=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(null),U=a.useRef(null),B=a.useRef(null),W=a.useRef(null),q=a.useRef(new be(0,0)),N=a.useRef(0),[P,I]=a.useState(!0);return a.useEffect(()=>{const S=document.createElement("canvas");S.getContext("webgl")||S.getContext("experimental-webgl")||I(!1)},[]),a.useEffect(()=>{if(!x.current||!P)return;const S=x.current,v=S.clientWidth,_=S.clientHeight,h=new ze;U.current=h;const b=new Ye(-1,1,1,-1,0,1);B.current=b;const X=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),le=X||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let R=y;le&&y==="high"&&(R="medium"),X&&y!=="low"&&(R="low");const H={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},M=H[R]||H.medium;let F;try{F=new Te({antialias:!1,alpha:!0,powerPreference:R==="high"?"high-performance":"low-power",precision:M.precision,stencil:!1,depth:!1})}catch{I(!1);return}F.setSize(v,_),F.setPixelRatio(M.pixelRatio),x.current.appendChild(F.domElement),w.current=F;const Q=z=>{const A=new we(z);return new oe(A.r,A.g,A.b)},Z=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,ue=`
      precision ${M.precision} float;

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

      const float STEP_MULT = ${M.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${M.iterations};
      const int WAVE_ITER = ${M.waveIterations};

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
    `,de=C*Math.PI/180,V=Math.sin(.4),$=Math.cos(.4),se=new We({vertexShader:Z,fragmentShader:ue,uniforms:{uTime:{value:0},uResolution:{value:new be(v,_)},uMouse:{value:q.current},uTopColor:{value:Q(i)},uBottomColor:{value:Q(t)},uIntensity:{value:n},uInteractive:{value:r},uGlowAmount:{value:u},uPillarWidth:{value:d},uPillarHeight:{value:c},uNoiseIntensity:{value:m},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(de)},uPillarRotSin:{value:Math.sin(de)},uWaveSin:{value:V},uWaveCos:{value:$}},transparent:!0,depthWrite:!1,depthTest:!1});k.current=se;const me=new Xe(2,2);W.current=me;const pe=new Je(me,se);h.add(pe);let L=null;const T=z=>{if(!r||L)return;L=window.setTimeout(()=>{L=null},16);const A=S.getBoundingClientRect(),J=(z.clientX-A.left)/A.width*2-1,E=-((z.clientY-A.top)/A.height)*2+1;q.current.set(J,E)};r&&S.addEventListener("mousemove",T,{passive:!0});let ae=performance.now();const O=1e3/(R==="low"?30:60),ce=z=>{if(!k.current||!w.current||!U.current||!B.current)return;const A=z-ae;if(A>=O){N.current+=.016*o;const J=N.current;k.current.uniforms.uTime.value=J,k.current.uniforms.uRotCos.value=Math.cos(J*.3),k.current.uniforms.uRotSin.value=Math.sin(J*.3),w.current.render(U.current,B.current),ae=z-A%O}g.current=requestAnimationFrame(ce)};g.current=requestAnimationFrame(ce);let f=null;const j=()=>{f&&clearTimeout(f),f=window.setTimeout(()=>{if(!w.current||!k.current||!x.current)return;const z=x.current.clientWidth,A=x.current.clientHeight;w.current.setSize(z,A),k.current.uniforms.uResolution.value.set(z,A)},150)};return window.addEventListener("resize",j,{passive:!0}),()=>{window.removeEventListener("resize",j),r&&S.removeEventListener("mousemove",T),g.current&&cancelAnimationFrame(g.current),w.current&&(w.current.dispose(),w.current.forceContextLoss(),S.contains(w.current.domElement)&&S.removeChild(w.current.domElement)),k.current&&k.current.dispose(),W.current&&W.current.dispose(),w.current=null,k.current=null,U.current=null,B.current=null,W.current=null,g.current=null}},[i,t,n,o,r,u,d,c,m,C,P,y]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),P?e.jsx("div",{ref:x,className:`light-pillar-container ${l}`,style:{mixBlendMode:p}}):e.jsx("div",{className:`light-pillar-fallback ${l}`,style:{mixBlendMode:p},children:"WebGL not supported"})]})},ii=`
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
uniform float uRainbow; // 0.0 o 1.0

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

// Helper para HSV a RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
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
          
          vec3 finalColor = uColor;
          if (uRainbow > 0.5) {
             // Color aleatorio basado en el hash de la celda y el tiempo
             float hue = fract(cellHash * 10.0 + uTime * 0.2);
             finalColor = hsv2rgb(vec3(hue, 0.7, 1.0));
          }
          gl_FragColor = vec4(finalColor * pow(vec3(intensity), vec3(uGamma)), 1.0);
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
`;function si({color:i="#ffffff",flakeSize:t=.01,minFlakeSize:n=1.25,pixelResolution:o=200,speed:r=1.25,depthFade:l=8,farPlane:u=20,brightness:d=1,gamma:c=.4545,density:m=.3,variant:p="square",direction:C=125,rainbow:y=!1,storm:x=!1,className:g="",style:w={}}){const k=a.useRef(null),U=a.useRef(0),B=a.useRef(!0),W=a.useRef(null),q=a.useRef(null),N=a.useRef(null),P=a.useMemo(()=>p==="round"?1:p==="snowflake"?2:0,[p]),I=a.useMemo(()=>{const v=new we(i);return new oe(v.r,v.g,v.b)},[i]),S=a.useCallback(()=>{N.current&&clearTimeout(N.current),N.current=window.setTimeout(()=>{const v=k.current,_=W.current,h=q.current;if(!v||!_||!h)return;const b=v.offsetWidth,X=v.offsetHeight;_.setSize(b,X),h.uniforms.uResolution.value.set(b,X)},100)},[]);return a.useEffect(()=>{const v=k.current;if(!v)return;const _=new IntersectionObserver(([h])=>{B.current=h.isIntersecting},{threshold:0});return _.observe(v),()=>_.disconnect()},[]),a.useEffect(()=>{const v=k.current;if(!v)return;const _=new ze,h=new Ye(-1,1,1,-1,0,1),b=new Te({antialias:!1,alpha:!0,premultipliedAlpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1});b.setPixelRatio(Math.min(window.devicePixelRatio,2)),b.setSize(v.offsetWidth,v.offsetHeight),b.setClearColor(0,0),v.appendChild(b.domElement),W.current=b;const X=new We({vertexShader:ii,fragmentShader:oi,uniforms:{uTime:{value:0},uResolution:{value:new be(v.offsetWidth,v.offsetHeight)},uFlakeSize:{value:t},uMinFlakeSize:{value:n},uPixelResolution:{value:o},uSpeed:{value:r},uDepthFade:{value:l},uFarPlane:{value:u},uColor:{value:I.clone()},uBrightness:{value:d},uGamma:{value:c},uDensity:{value:m},uVariant:{value:P},uDirection:{value:C*Math.PI/180},uRainbow:{value:y?1:0}},transparent:!0});q.current=X;const le=new Xe(2,2);_.add(new Je(le,X)),window.addEventListener("resize",S);const R=performance.now(),H=()=>{U.current=requestAnimationFrame(H),B.current&&(X.uniforms.uTime.value=(performance.now()-R)*.001,b.render(_,h))};return H(),()=>{cancelAnimationFrame(U.current),window.removeEventListener("resize",S),N.current&&clearTimeout(N.current),v.contains(b.domElement)&&v.removeChild(b.domElement),b.dispose(),le.dispose(),X.dispose(),W.current=null,q.current=null}},[S]),a.useEffect(()=>{const v=q.current;v&&(v.uniforms.uFlakeSize.value=t,v.uniforms.uMinFlakeSize.value=n,v.uniforms.uPixelResolution.value=o,v.uniforms.uSpeed.value=x?r*4:r,v.uniforms.uDepthFade.value=l,v.uniforms.uFarPlane.value=u,v.uniforms.uBrightness.value=d,v.uniforms.uGamma.value=c,v.uniforms.uDensity.value=m,v.uniforms.uVariant.value=P,v.uniforms.uDirection.value=C*Math.PI/180,v.uniforms.uColor.value.copy(I),v.uniforms.uRainbow.value=y?1:0)},[t,n,o,r,l,u,d,c,m,P,C,I,y,x]),e.jsx("div",{ref:k,className:`pixel-snow-container ${g}`,style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",contain:"layout style paint",...w}})}const ai=({floatingLinesConfig:i,lightPillarsConfig:t,ballpitConfig:n,silkConfig:o,galaxyConfig:r,gradientConfig:l,pixelSnowConfig:u})=>{const{activeBackground:d,floatingLinesConfig:c,lightPillarsConfig:m,ballpitConfig:p,silkConfig:C,galaxyConfig:y,gradientConfig:x,pixelSnowConfig:g}=Re(),w=i||c,k=t||m,U=n||p,B=o||C,W=r||y,q=l||x,N=u||g,P=w||{colors:["#f700ff","#bd71ff","#29b1ff"],count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1,rainbow:!1},I=k||{topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},S=U||{colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1,enableExplosion:!1,rainbow:!1},v=B||{color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0},_=W||{density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5,rainbow:!1,warp:!1},h=q||{color1:"#b117f8",color2:"#2c0b2e",speed:20},b=N||{color:"#c9c9c9",flakeSize:.021,minFlakeSize:.6,pixelResolution:800,speed:.9,density:.6,direction:100,brightness:1.5,variant:"snowflake",rainbow:!1,storm:!1};return e.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:e.jsxs(ge,{mode:"wait",children:[d==="gradient"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(Tn,{color1:h.color1,color2:h.color2,speed:h.speed})},"gradient"),d==="galaxy"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(Bn,{mouseRepulsion:!1,mouseInteraction:!1,density:_.density,glowIntensity:_.glowIntensity,saturation:_.saturation,hueShift:_.hueShift,twinkleIntensity:_.twinkleIntensity,rotationSpeed:_.rotationSpeed,starSpeed:_.starSpeed,speed:_.speed,rainbow:_.rainbow,warp:_.warp})},"galaxy"),d==="silk"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(yt,{speed:v.speed,scale:v.scale,color:v.color,noiseIntensity:v.noiseIntensity,rotation:v.rotation})},"silk"),d==="ballpit"&&e.jsxs(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#111111"},children:[" ",e.jsx(Zn,{count:S.count,gravity:S.gravity,friction:S.friction,wallBounce:S.wallBounce,followCursor:S.followCursor,colors:S.colors,enableExplosion:S.enableExplosion,rainbow:S.rainbow})]},"ballpit"),d==="floatinglines"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(ti,{linesGradient:P.colors,lineCount:P.count,lineDistance:P.distance,animationSpeed:.5,bendRadius:P.bendRadius,bendStrength:P.bendStrength,enabledWaves:P.enabledWaves,interactive:P.interactive??!1,parallax:P.parallax??!1,rainbow:P.rainbow})},"floatinglines"),d==="lightpillars"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(ni,{topColor:I.topColor,bottomColor:I.bottomColor,intensity:I.intensity,rotationSpeed:I.rotationSpeed,glowAmount:I.glowAmount??.002,pillarWidth:I.pillarWidth,pillarHeight:I.pillarHeight,noiseIntensity:I.noiseIntensity,pillarRotation:I.pillarRotation,interactive:I.interactive??!0,quality:I.quality??"high"})},"lightpillars"),d==="pixelsnow"&&e.jsx(G.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0,background:"#000"},children:e.jsx(si,{color:b.color,flakeSize:b.flakeSize,minFlakeSize:b.minFlakeSize,pixelResolution:b.pixelResolution,speed:b.speed,density:b.density,direction:b.direction,brightness:b.brightness,variant:b.variant,rainbow:b.rainbow,storm:b.storm})},"pixelsnow")]})})},ri=({onItemClick:i,isOpen:t,onToggle:n,position:o="left",colors:r=["#B19EEF","#5227FF"],items:l=[],socialItems:u=[],displaySocials:d=!0,displayItemNumbering:c=!0,className:m,logoUrl:p=null,menuButtonColor:C="#fff",openMenuButtonColor:y="#000",accentColor:x="#5227FF",changeMenuColorOnOpen:g=!0,isFixed:w=!1,closeOnClickAway:k=!0,onMenuOpen:U,onMenuClose:B})=>{const[W,q]=a.useState(!1),N=typeof t=="boolean",P=N?t:W,I=a.useRef(!1),S=a.useRef(null),v=a.useRef(null),_=a.useRef([]),h=a.useRef(null),b=a.useRef(null),X=a.useRef(null),le=a.useRef(null),R=a.useRef(null),[H,M]=a.useState(["Menu","Close"]),F=a.useRef(null),Q=a.useRef(null),Z=a.useRef(null),ue=a.useRef(null),de=a.useRef(null),V=a.useRef(null),$=a.useRef(!1),se=a.useRef(null);a.useLayoutEffect(()=>{const f=Y.context(()=>{const j=S.current,z=v.current,A=h.current,J=b.current,E=X.current,K=le.current;if(!j||!A||!J||!E||!K)return;let re=[];z&&(re=Array.from(z.querySelectorAll(".sm-prelayer"))),_.current=re;const fe=o==="left"?-100:100;Y.set([j,...re],{xPercent:fe}),Y.set(A,{transformOrigin:"50% 50%",rotate:0}),Y.set(J,{transformOrigin:"50% 50%",rotate:90}),Y.set(E,{rotate:0,transformOrigin:"50% 50%"}),Y.set(K,{yPercent:0}),V.current&&Y.set(V.current,{color:C})});return()=>f.revert()},[C,o]);const me=a.useCallback(()=>{const f=S.current,j=_.current;if(!f)return null;F.current?.kill(),Q.current&&(Q.current.kill(),Q.current=null),se.current?.kill();const z=Array.from(f.querySelectorAll(".sm-panel-itemLabel")),A=Array.from(f.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),J=f.querySelector(".sm-socials-title"),E=Array.from(f.querySelectorAll(".sm-socials-link")),K=j.map(s=>({el:s,start:Number(Y.getProperty(s,"xPercent"))})),re=Number(Y.getProperty(f,"xPercent"));z.length&&Y.set(z,{yPercent:140,rotate:10}),A.length&&Y.set(A,{"--sm-num-opacity":0}),J&&Y.set(J,{opacity:0}),E.length&&Y.set(E,{y:25,opacity:0});const fe=Y.timeline({paused:!0});K.forEach((s,D)=>{fe.fromTo(s.el,{xPercent:s.start},{xPercent:0,duration:.8,ease:"power4.out"},D*.07)});const he=(K.length?(K.length-1)*.07:0)+(K.length?.08:0),Ae=1;if(fe.fromTo(f,{xPercent:re},{xPercent:0,duration:Ae,ease:"power4.out"},he),z.length){const D=he+Ae*.15;fe.to(z,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},D),A.length&&fe.to(A,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},D+.1)}if(J||E.length){const s=he+Ae*.4;J&&fe.to(J,{opacity:1,duration:.5,ease:"power2.out"},s),E.length&&fe.to(E,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{Y.set(E,{clearProps:"opacity"})}},s+.04)}return F.current=fe,fe},[]),pe=a.useCallback(()=>{if($.current)return;$.current=!0;const f=me();f?(f.eventCallback("onComplete",()=>{$.current=!1}),f.play(0)):$.current=!1},[me]),L=a.useCallback(()=>{F.current?.kill(),F.current=null,se.current?.kill();const f=S.current,j=_.current;if(!f)return;const z=[...j,f];Q.current?.kill();const A=o==="left"?-100:100;Q.current=Y.to(z,{xPercent:A,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const J=Array.from(f.querySelectorAll(".sm-panel-itemLabel"));J.length&&Y.set(J,{yPercent:140,rotate:10});const E=Array.from(f.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));E.length&&Y.set(E,{"--sm-num-opacity":0});const K=f.querySelector(".sm-socials-title"),re=Array.from(f.querySelectorAll(".sm-socials-link"));K&&Y.set(K,{opacity:0}),re.length&&Y.set(re,{y:25,opacity:0}),$.current=!1}})},[o]),T=a.useCallback(f=>{const j=X.current;j&&(Z.current?.kill(),f?Z.current=Y.to(j,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):Z.current=Y.to(j,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),ae=a.useCallback(f=>{const j=V.current;if(j)if(de.current?.kill(),g){const z=f?y:C;de.current=Y.to(j,{color:z,delay:.18,duration:.3,ease:"power2.out"})}else Y.set(j,{color:C})},[y,C,g]);Ne.useEffect(()=>{if(V.current)if(g){const f=I.current?y:C;Y.set(V.current,{color:f})}else Y.set(V.current,{color:C})},[g,C,y]);const te=a.useCallback(f=>{const j=le.current;if(!j)return;ue.current?.kill();const z=f?"Menu":"Close",A=f?"Close":"Menu",J=3,E=[z];let K=z;for(let ee=0;ee<J;ee++)K=K==="Menu"?"Close":"Menu",E.push(K);K!==A&&E.push(A),E.push(A),M(E),Y.set(j,{yPercent:0});const re=E.length,fe=(re-1)/re*100;ue.current=Y.to(j,{yPercent:-fe,duration:.5+re*.07,ease:"power4.out"})},[]),O=a.useCallback(()=>{if(N)n&&n(!P);else{const f=!I.current;I.current=f,q(f),f?(U?.(),pe()):(B?.(),L()),T(f),ae(f),te(f)}},[N,t,n,P,pe,L,T,ae,te,U,B]);Ne.useEffect(()=>{N&&(I.current=t,t?(U?.(),pe()):(B?.(),L()),T(t),ae(t),te(t))},[t,N,pe,L,T,ae,te,U,B]);const ce=a.useCallback(()=>{N?P&&n&&n(!1):I.current&&(I.current=!1,q(!1),B?.(),L(),T(!1),ae(!1),te(!1))},[N,P,n,L,T,ae,te,B]);return Ne.useEffect(()=>{if(!k||!P)return;const f=j=>{const z=S.current&&S.current.contains(j.target),A=V.current&&V.current.contains(j.target),J=j.target.closest(".shop-overlay");!z&&!A&&!J&&ce()};return document.addEventListener("mousedown",f),()=>{document.removeEventListener("mousedown",f)}},[k,P,ce]),e.jsxs("div",{className:(m?m+" ":"")+"staggered-menu-wrapper"+(w?" fixed-wrapper":""),style:x?{"--sm-accent":x}:void 0,"data-position":o,"data-open":P||void 0,children:[e.jsx("div",{ref:v,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let j=[...r&&r.length?r.slice(0,4):["#1e1e22","#35353c"]];if(j.length>=3){const z=Math.floor(j.length/2);j.splice(z,1)}return j.map((z,A)=>e.jsx("div",{className:"sm-prelayer",style:{background:z}},A))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:p?e.jsx("img",{src:p,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:V,className:"sm-toggle","aria-label":P?"Close menu":"Open menu","aria-expanded":P,"aria-controls":"staggered-menu-panel",onClick:O,type:"button",children:[e.jsx("span",{ref:R,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:le,className:"sm-toggle-textInner",children:H.map((f,j)=>e.jsx("span",{className:"sm-toggle-line",children:f},j))})}),e.jsxs("span",{ref:X,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:h,className:"sm-icon-line"}),e.jsx("span",{ref:b,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:S,className:"staggered-menu-panel","aria-hidden":!P,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":c||void 0,children:l&&l.length?l.map((f,j)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:z=>{z.preventDefault(),i&&i(f.id)},"aria-label":f.ariaLabel,"data-index":j+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:f.label})})},f.label+j)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),d&&u&&u.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:u.map((f,j)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:f.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:f.label})},f.label+j))})]})]})})]})},bt=[{name:"Neon",colors:["#f700ff","#bd71ff","#29b1ff"]},{name:"Fire",colors:["#ff0000","#ff7f00","#ffff00"]},{name:"Matrix",colors:["#00ff00","#003300","#ccffcc"]},{name:"Ice",colors:["#00ffff","#ffffff","#0088ff"]},{name:"CMY",colors:["#ff00ff","#ffff00","#00ffff"]}],st={colors:bt[0].colors,count:6,distance:5,bendRadius:5,bendStrength:-.5,enabledWaves:["top","middle","bottom"],interactive:!1,rainbow:!1},li=[{label:"Baja",value:"low"},{label:"Media",value:"medium"},{label:"Alta",value:"high"}],at={topColor:"#5227FF",bottomColor:"#FF9FFC",intensity:1,rotationSpeed:.3,pillarWidth:3,pillarHeight:.4,noiseIntensity:.5,pillarRotation:293,interactive:!1,glowAmount:.002,quality:"high"},rt={colors:["#f700ff","#bd71ff","#29b1ff"],count:60,gravity:.1,friction:.995,wallBounce:.9,followCursor:!1,enableExplosion:!1,rainbow:!1},lt={color:"#9726fa",speed:4,scale:1,noiseIntensity:1.5,rotation:0},ct={density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5,rainbow:!1,warp:!1},ut={color1:"#b117f8",color2:"#2c0b2e",speed:20},dt={color:"#c9c9c9",flakeSize:.021,minFlakeSize:.6,pixelResolution:800,speed:.9,density:.6,direction:100,brightness:1.5,depthFade:3,farPlane:10,gamma:.4545,variant:"snowflake",rainbow:!1,storm:!1},ci=({onClose:i,floatingLinesConfig:t,setFloatingLinesConfig:n,lightPillarsConfig:o,setLightPillarsConfig:r,ballpitConfig:l,setBallpitConfig:u,silkConfig:d,setSilkConfig:c,galaxyConfig:m,setGalaxyConfig:p,gradientConfig:C,setGradientConfig:y,pixelSnowConfig:x,setPixelSnowConfig:g})=>{const{activeBackground:w,floatingLinesConfig:k,setFloatingLinesConfig:U,lightPillarsConfig:B,setLightPillarsConfig:W,ballpitConfig:q,setBallpitConfig:N,silkConfig:P,setSilkConfig:I,galaxyConfig:S,setGalaxyConfig:v,gradientConfig:_,setGradientConfig:h,pixelSnowConfig:b,setPixelSnowConfig:X}=Re(),le=t||k,R=n||U,H=o||B,M=r||W,F=l||q,Q=u||N,Z=d||P,ue=c||I,de=m||S,V=p||v,$=C||_,se=y||h,me=x||b,pe=g||X,L=le||st,T=(s,D)=>{R&&R({...L,[s]:D})},ae=s=>{const D=L.enabledWaves,ve=D.includes(s)?D.filter(kt=>kt!==s):[...D,s];T("enabledWaves",ve)},te=(s,D)=>{const ve=[...L.colors];ve[s]=D,T("colors",ve)},O=H||at,ce=(s,D)=>{M?M({...O,[s]:D}):console.warn("setLightPillarsConfig no está definido en el store. Asegúrate de agregarlo.")},f=F||rt,j=(s,D)=>{Q&&Q({...f,[s]:D})},z=(s,D)=>{const ve=[...f.colors];ve[s]=D,j("colors",ve)},A=Z||lt,J=(s,D)=>{ue&&ue({...A,[s]:D})},E=de||ct,K=(s,D)=>{V&&V({...E,[s]:D})},re=$||ut,fe=(s,D)=>{se&&se({...re,[s]:D})},ee=me||dt,he=(s,D)=>{pe&&pe({...ee,[s]:D})},Ae=()=>{w==="floatinglines"&&R?R(st):w==="lightpillars"&&M?M(at):w==="ballpit"&&Q?Q(rt):w==="silk"&&ue?ue(lt):w==="galaxy"&&V?V(ct):w==="gradient"&&se?se(ut):w==="pixelsnow"&&pe&&pe(dt)};return e.jsxs("div",{className:"bg-customizer-panel",style:{pointerEvents:"auto"},children:[e.jsxs("div",{className:"bg-customizer-header",children:[e.jsx("h3",{children:"Personalizar Fondo"}),e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:Ae,className:"reset-btn",title:"Restaurar valores por defecto",children:e.jsx(Yt,{})}),e.jsx("button",{onClick:i,className:"close-btn",children:e.jsx(ht,{})})]})]}),e.jsxs("div",{className:"bg-customizer-content",children:[w==="floatinglines"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Presets de Color"}),e.jsx("div",{className:"presets-grid",children:bt.map(s=>e.jsx("button",{className:"preset-btn",onClick:()=>T("colors",s.colors),style:{background:`linear-gradient(to right, ${s.colors[0]}, ${s.colors[1]}, ${s.colors[2]})`},title:s.name,children:JSON.stringify(L.colors)===JSON.stringify(s.colors)&&e.jsx(gt,{})},s.name))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores Personalizados"}),e.jsx("div",{className:"color-pickers",children:L.colors.map((s,D)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:s,onChange:ve=>te(D,ve.target.value)}),e.jsx("span",{className:"hex-code",children:s})]},D))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad de Líneas ",e.jsx("span",{children:L.count})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:L.count,onChange:s=>T("count",parseInt(s.target.value))}),e.jsxs("label",{children:["Distancia entre Líneas ",e.jsx("span",{children:L.distance})]}),e.jsx("input",{type:"range",min:"1",max:"20",value:L.distance,onChange:s=>T("distance",parseInt(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Radio de Curvatura ",e.jsx("span",{children:L.bendRadius})]}),e.jsx("input",{type:"range",min:"5",max:"10",step:"0.1",value:L.bendRadius,onChange:s=>T("bendRadius",parseFloat(s.target.value))}),e.jsxs("label",{children:["Fuerza de Curvatura ",e.jsx("span",{children:L.bendStrength})]}),e.jsx("input",{type:"range",min:"-7",max:"7",step:"0.1",value:L.bendStrength,onChange:s=>T("bendStrength",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Capas Activas"}),e.jsx("div",{className:"toggles-row",children:["top","middle","bottom"].map(s=>e.jsx("button",{className:`toggle-btn ${L.enabledWaves.includes(s)?"active":""}`,onClick:()=>ae(s),children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${L.interactive!==!1?"active":""}`,onClick:()=>T("interactive",L.interactive===!1),style:{width:"100%",textAlign:"center"},children:L.interactive!==!1?"Activada (Ratón)":"Desactivada"})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Efectos"}),e.jsx("button",{className:`toggle-btn ${L.rainbow?"active":""}`,onClick:()=>T("rainbow",!L.rainbow),style:{width:"100%",textAlign:"center"},children:"🌈 Modo Arcoíris"})]})]}),w==="lightpillars"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:O.topColor,onChange:s=>ce("topColor",s.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:O.bottomColor,onChange:s=>ce("bottomColor",s.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Intensidad ",e.jsx("span",{children:O.intensity})]}),e.jsx("input",{type:"range",min:"0.1",max:"3",step:"0.1",value:O.intensity,onChange:s=>ce("intensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:O.rotationSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:O.rotationSpeed,onChange:s=>ce("rotationSpeed",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Ancho del Pilar ",e.jsx("span",{children:O.pillarWidth})]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.5",value:O.pillarWidth,onChange:s=>ce("pillarWidth",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[O.pillarRotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:O.pillarRotation,onChange:s=>ce("pillarRotation",parseInt(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Altura del Pilar ",e.jsx("span",{children:O.pillarHeight})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:O.pillarHeight,onChange:s=>ce("pillarHeight",parseFloat(s.target.value))}),e.jsxs("label",{children:["Intensidad Ruido ",e.jsx("span",{children:O.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:O.noiseIntensity,onChange:s=>ce("noiseIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Resplandor ",e.jsx("span",{children:O.glowAmount})]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.02",step:"0.0001",value:O.glowAmount,onChange:s=>ce("glowAmount",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Calidad"}),e.jsx("div",{className:"toggles-row",children:li.map(s=>e.jsx("button",{className:`toggle-btn ${O.quality===s.value?"active":""}`,onClick:()=>ce("quality",s.value),children:s.label},s.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${O.interactive!==!1?"active":""}`,onClick:()=>ce("interactive",O.interactive===!1),style:{width:"100%",textAlign:"center"},children:O.interactive!==!1?"Activada (Ratón)":"Desactivada"})]})]}),w==="ballpit"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsx("div",{className:"color-pickers",children:f.colors.map((s,D)=>e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:s,onChange:ve=>z(D,ve.target.value)}),e.jsx("span",{className:"hex-code",children:s})]},D))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Cantidad ",e.jsx("span",{children:f.count})]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:f.count,onChange:s=>j("count",parseInt(s.target.value))}),e.jsxs("label",{children:["Gravedad ",e.jsx("span",{children:f.gravity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:f.gravity,onChange:s=>j("gravity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Fricción ",e.jsx("span",{children:f.friction})]}),e.jsx("input",{type:"range",min:"0.8",max:"1",step:"0.001",value:f.friction,onChange:s=>j("friction",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rebote Pared ",e.jsx("span",{children:f.wallBounce})]}),e.jsx("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:f.wallBounce,onChange:s=>j("wallBounce",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Interacción"}),e.jsx("button",{className:`toggle-btn ${f.followCursor?"active":""}`,onClick:()=>j("followCursor",!f.followCursor),style:{width:"100%",textAlign:"center"},children:f.followCursor?"Seguir Cursor":"Cursor Libre"})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Eventos Divertidos"}),e.jsxs("div",{className:"toggles-row",children:[e.jsx("button",{className:`toggle-btn ${f.enableExplosion?"active":""}`,onClick:()=>j("enableExplosion",!f.enableExplosion),title:"Haz clic para explotar las bolas",children:"💥 Explosión al Clic"}),e.jsx("button",{className:`toggle-btn ${f.rainbow?"active":""}`,onClick:()=>j("rainbow",!f.rainbow),title:"Ciclo de colores automático",children:"🌈 Modo Arcoíris"})]})]})]}),w==="silk"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Color"}),e.jsx("div",{className:"color-pickers",children:e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:A.color,onChange:s=>J("color",s.target.value)}),e.jsx("span",{className:"hex-code",children:A.color})]})})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:A.speed})]}),e.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",value:A.speed,onChange:s=>J("speed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Escala ",e.jsx("span",{children:A.scale})]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:A.scale,onChange:s=>J("scale",parseFloat(s.target.value))}),e.jsxs("label",{children:["Ruido ",e.jsx("span",{children:A.noiseIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:A.noiseIntensity,onChange:s=>J("noiseIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Rotación ",e.jsxs("span",{children:[A.rotation,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"15",value:A.rotation,onChange:s=>J("rotation",parseInt(s.target.value))})]})]}),w==="galaxy"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Densidad ",e.jsx("span",{children:E.density})]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:E.density,onChange:s=>K("density",parseFloat(s.target.value))}),e.jsxs("label",{children:["Intensidad Brillo ",e.jsx("span",{children:E.glowIntensity})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:E.glowIntensity,onChange:s=>K("glowIntensity",parseFloat(s.target.value))}),e.jsxs("label",{children:["Saturación ",e.jsx("span",{children:E.saturation})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:E.saturation,onChange:s=>K("saturation",parseFloat(s.target.value))}),e.jsxs("label",{children:["Cambio de Tono (Hue) ",e.jsx("span",{children:E.hueShift})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:E.hueShift,onChange:s=>K("hueShift",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad Rotación ",e.jsx("span",{children:E.rotationSpeed})]}),e.jsx("input",{type:"range",min:"-0.5",max:"0.5",step:"0.01",value:E.rotationSpeed,onChange:s=>K("rotationSpeed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad Estrellas ",e.jsx("span",{children:E.starSpeed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:E.starSpeed,onChange:s=>K("starSpeed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Velocidad Animación ",e.jsx("span",{children:E.speed})]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:E.speed,onChange:s=>K("speed",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Efectos"}),e.jsx("button",{className:`toggle-btn ${E.rainbow?"active":""}`,onClick:()=>K("rainbow",!E.rainbow),style:{width:"100%",textAlign:"center"},children:"🌈 Modo Arcoíris"}),e.jsx("button",{className:`toggle-btn ${E.warp?"active":""}`,onClick:()=>K("warp",!E.warp),style:{width:"100%",textAlign:"center",marginTop:"10px"},children:"🚀 Velocidad Warp"})]})]}),w==="gradient"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Colores"}),e.jsxs("div",{className:"color-pickers",children:[e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Superior"}),e.jsx("input",{type:"color",value:re.color1,onChange:s=>fe("color1",s.target.value)})]}),e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("label",{style:{fontSize:"0.8rem",marginBottom:5},children:"Inferior"}),e.jsx("input",{type:"color",value:re.color2,onChange:s=>fe("color2",s.target.value)})]})]})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad (segundos) ",e.jsxs("span",{children:[re.speed,"s"]})]}),e.jsx("input",{type:"range",min:"1",max:"60",step:"1",value:re.speed,onChange:s=>fe("speed",parseInt(s.target.value))})]})]}),w==="pixelsnow"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Color"}),e.jsx("div",{className:"color-pickers",children:e.jsxs("div",{className:"color-input-wrapper",children:[e.jsx("input",{type:"color",value:ee.color,onChange:s=>he("color",s.target.value)}),e.jsx("span",{className:"hex-code",children:ee.color})]})})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Variante"}),e.jsx("div",{className:"toggles-row",children:["snowflake","square","round"].map(s=>e.jsx("button",{className:`toggle-btn ${ee.variant===s?"active":""}`,onClick:()=>he("variant",s),children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{className:"section",children:[e.jsxs("label",{children:["Velocidad ",e.jsx("span",{children:ee.speed})]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:ee.speed,onChange:s=>he("speed",parseFloat(s.target.value))}),e.jsxs("label",{children:["Densidad ",e.jsx("span",{children:ee.density})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:ee.density,onChange:s=>he("density",parseFloat(s.target.value))}),e.jsxs("label",{children:["Dirección ",e.jsxs("span",{children:[ee.direction,"°"]})]}),e.jsx("input",{type:"range",min:"0",max:"360",step:"5",value:ee.direction,onChange:s=>he("direction",parseInt(s.target.value))}),e.jsxs("label",{children:["Tamaño Copo ",e.jsx("span",{children:ee.flakeSize})]}),e.jsx("input",{type:"range",min:"0.005",max:"0.05",step:"0.001",value:ee.flakeSize,onChange:s=>he("flakeSize",parseFloat(s.target.value))}),e.jsxs("label",{children:["Brillo ",e.jsx("span",{children:ee.brightness})]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:ee.brightness,onChange:s=>he("brightness",parseFloat(s.target.value))})]}),e.jsxs("div",{className:"section",children:[e.jsx("label",{children:"Efectos"}),e.jsx("button",{className:`toggle-btn ${ee.rainbow?"active":""}`,onClick:()=>he("rainbow",!ee.rainbow),style:{width:"100%",textAlign:"center"},children:"🌈 Modo Arcoíris"}),e.jsx("button",{className:`toggle-btn ${ee.storm?"active":""}`,onClick:()=>he("storm",!ee.storm),style:{width:"100%",textAlign:"center",marginTop:"10px"},children:"🌪️ Modo Tormenta"})]})]})]})]})};function ui({children:i,className:t="",onClick:n,mouseX:o,spring:r,distance:l,magnification:u,baseItemSize:d}){const c=a.useRef(null),m=Pe(0),p=Ve(o,x=>{if(!c.current)return 1/0;const g=c.current.getBoundingClientRect(),w=g.x+g.width/2;return Math.abs(x-w)}),C=Ve(p,[0,l],[u,d]),y=Fe(C,r);return e.jsx(G.div,{ref:c,style:{width:y,height:y,minWidth:y,minHeight:y},onHoverStart:()=>m.set(1),onHoverEnd:()=>m.set(0),onClick:n,className:`dock-item ${t}`,"aria-haspopup":"true",children:a.Children.map(i,x=>a.cloneElement(x,{isHovered:m}))})}function di({children:i,className:t="",...n}){const{isHovered:o}=n,[r,l]=a.useState(!1);return a.useEffect(()=>{const u=o.on("change",d=>{l(d===1)});return()=>u()},[o]),e.jsx(ge,{children:r&&e.jsx(G.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${t}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:i})})}function fi({children:i,className:t=""}){return e.jsx("div",{className:`dock-icon ${t}`,children:i})}function mi({items:i,className:t="",spring:n={mass:.1,stiffness:300,damping:20},magnification:o=70,distance:r=200,panelHeight:l=68,dockHeight:u=256,baseItemSize:d=50}){const c=Pe(1/0),m=Pe(0),p=a.useMemo(()=>Math.max(u,o+o/2+4),[o,u]),C=Ve(m,[0,1],[l,p]),y=Fe(C,n);return e.jsx(G.div,{style:{height:y,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(G.div,{onMouseMove:({pageX:x})=>{m.set(1),c.set(x)},onMouseLeave:()=>{m.set(0),c.set(1/0)},className:`dock-panel ${t}`,style:{height:l},role:"toolbar","aria-label":"Application dock",children:i.map((x,g)=>e.jsxs(ui,{onClick:x.onClick,className:x.className,mouseX:c,spring:n,distance:r,magnification:o,baseItemSize:d,children:[e.jsx(fi,{children:x.icon}),e.jsx(di,{children:x.label})]},g))})})}const Ct=""+new URL("apple-cat-BHTFRffC.gif",import.meta.url).href,wt=""+new URL("jump-cat-BVsZ-jsy.gif",import.meta.url).href,jt=""+new URL("rolling-cat-BlLA7Xch.gif",import.meta.url).href,St=""+new URL("duck-BnqypGlP.png",import.meta.url).href,Rt="data:image/png;base64,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",At=""+new URL("skeleton-run-CHzXkBxe.gif",import.meta.url).href,pi={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"},{id:"silk",name:"Silk",description:"Suavidad y elegancia.",price:"Gratis",previewColor:"#ff99cc"},{id:"ballpit",name:"Ball Pit",description:"Física interactiva y relajante.",price:"Gratis",previewColor:"#29b1ff"},{id:"floatinglines",name:"Floating Lines",description:"Ondas de energía interactivas.",price:"Gratis",previewColor:"#bd71ff"},{id:"lightpillars",name:"Light Pillars",description:"Pilares de luz etéreos.",price:"Gratis",previewColor:"#00ffff"},{id:"pixelsnow",name:"Pixel Snow",description:"Nevada suave y distante.",price:"Gratis",previewColor:"#ffffff"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(vt,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(Jt,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:Ct,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:wt,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:jt,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:St,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:Rt,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:At,alt:"Skeleton",style:{width:"40px"}})}]},hi=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Wt,{})},{id:"cursors",label:"Cursores",icon:e.jsx(vt,{})},{id:"trails",label:"Mascotas",icon:e.jsx(Xt,{})}],gi=()=>{const{activeShop:i,openShop:t,closeShop:n,activeBackground:o,setBackground:r,activeCursor:l,setCursor:u,activeTrail:d,setTrail:c}=Re(),[m,p]=a.useState(i);a.useEffect(()=>{i&&p(i)},[i]);const C=pi[m]||[],y=g=>{i==="backgrounds"&&r(g),i==="cursors"&&u(g),i==="trails"&&c(g)},x=g=>i==="backgrounds"?o===g:i==="cursors"?l===g:i==="trails"?d===g:!1;return e.jsx(ge,{children:i&&e.jsxs(G.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:n,style:{position:"absolute",inset:0}}),e.jsxs(G.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:hi.map(g=>e.jsxs("button",{onClick:()=>t(g.id),className:`tab-btn ${i===g.id?"active":""}`,children:[g.icon,e.jsx("span",{children:g.label}),i===g.id&&e.jsx(G.div,{layoutId:"activeTab",className:"active-line"})]},g.id))}),e.jsx("button",{onClick:n,className:"close-btn",children:e.jsx(ht,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",m==="backgrounds"?"Fondos":m==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(ge,{mode:"wait",children:e.jsx(G.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:C.map(g=>e.jsxs("div",{className:`shop-item ${x(g.id)?"equipped":""}`,onClick:()=>y(g.id),children:[e.jsxs("div",{className:"item-preview",style:{background:g.previewColor},children:[g.icon&&e.jsx("div",{className:"preview-icon",children:g.icon}),x(g.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(gt,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:g.name}),e.jsx("p",{children:g.description}),e.jsx("span",{className:"price-tag",children:g.price})]})]},g.id))},m)})})]})]})})},vi=()=>{const{activeTrail:i}=Re(),t=Pe(-100),n=Pe(-100),o={damping:25,stiffness:70,mass:1},r=Fe(t,o),l=Fe(n,o);a.useEffect(()=>{const d=c=>{t.set(c.clientX),n.set(c.clientY)};return window.addEventListener("mousemove",d),()=>window.removeEventListener("mousemove",d)},[t,n]);const u={"apple-cat":Ct,"jump-cat":wt,"rolling-cat":jt,duck:St,pompom:Rt,"skeleton-run":At,ghost:null};return!i||i==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:u[i]?e.jsx(G.img,{src:u[i],alt:"trail",style:{x:r,y:l,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):i==="ghost"?e.jsx(G.div,{style:{x:r,y:l,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},ft=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],xi=({progress:i})=>{const[t,n]=a.useState(0);return a.useEffect(()=>{const o=setInterval(()=>{n(r=>(r+1)%ft.length)},1500);return()=>clearInterval(o)},[]),e.jsxs(G.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[i,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(G.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${i}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(G.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:ft[t]},t)})]})]})},yi=""+new URL("For You I'll Die - JAY SAV-BGIKD8t9.mp3",import.meta.url).href,bi=Object.freeze(Object.defineProperty({__proto__:null,default:yi},Symbol.toStringTag,{value:"Module"})),Ci=""+new URL("From The Start (Sped Up) - Laufey-D4ysqUTI.mp3",import.meta.url).href,wi=Object.freeze(Object.defineProperty({__proto__:null,default:Ci},Symbol.toStringTag,{value:"Module"})),ji=""+new URL("I Really Want to Stay At Your House - Rosa Walton-BKlM1ya2.mp3",import.meta.url).href,Si=Object.freeze(Object.defineProperty({__proto__:null,default:ji},Symbol.toStringTag,{value:"Module"})),Ri=""+new URL("La cena - Las Petunias-BzZvyMnw.mp3",import.meta.url).href,Ai=Object.freeze(Object.defineProperty({__proto__:null,default:Ri},Symbol.toStringTag,{value:"Module"})),ki=""+new URL("Let You Down - Dawid Podsiadło-CMbNZyx7.mp3",import.meta.url).href,Pi=Object.freeze(Object.defineProperty({__proto__:null,default:ki},Symbol.toStringTag,{value:"Module"})),Li=""+new URL("Tek It - Cafuné-DeWKFaBa.mp3",import.meta.url).href,Ii=Object.freeze(Object.defineProperty({__proto__:null,default:Li},Symbol.toStringTag,{value:"Module"})),_i=""+new URL("You and I - d4vd -DLXjY2fT.mp3",import.meta.url).href,Mi=Object.freeze(Object.defineProperty({__proto__:null,default:_i},Symbol.toStringTag,{value:"Module"})),Ei=""+new URL("gourmet - rickyedit-u4-Lg7PG.mp3",import.meta.url).href,Ni=Object.freeze(Object.defineProperty({__proto__:null,default:Ei},Symbol.toStringTag,{value:"Module"})),Fi=""+new URL("una manera perfecta de morir - INTERROGACIÓN AMOR-Bn3KiH1Y.mp3",import.meta.url).href,zi=Object.freeze(Object.defineProperty({__proto__:null,default:Fi},Symbol.toStringTag,{value:"Module"})),mt=Object.assign({"../../assets/songs/For You I'll Die - JAY SAV.mp3":bi,"../../assets/songs/From The Start (Sped Up) - Laufey.mp3":wi,"../../assets/songs/I Really Want to Stay At Your House - Rosa Walton.mp3":Si,"../../assets/songs/La cena - Las Petunias.mp3":Ai,"../../assets/songs/Let You Down - Dawid Podsiadło.mp3":Pi,"../../assets/songs/Tek It - Cafuné.mp3":Ii,"../../assets/songs/You and I - d4vd .mp3":Mi,"../../assets/songs/gourmet - rickyedit.mp3":Ni,"../../assets/songs/una manera perfecta de morir - INTERROGACIÓN AMOR.mp3":zi}),ke=Object.keys(mt).map(i=>({title:i.split("/").pop().split(".")[0].replace(/-/g," ").replace(/\b\w/g,o=>o.toUpperCase()),artist:"Only U Playlist",src:mt[i].default}));ke.length===0&&ke.push({title:"No Songs Found",artist:"Add mp3 to assets/songs",src:""});const Ti=.1,Di=({visible:i,onClose:t})=>{const n=a.useRef(null),o=a.useRef(null),[r,l]=a.useState(!1),[u,d]=a.useState(0),[c,m]=a.useState(.05),[p,C]=a.useState(!1),[y,x]=a.useState(!1),[g,w]=a.useState(!1),[k,U]=a.useState(0),[B,W]=a.useState(0),q=ke[u];a.useEffect(()=>{n.current&&(n.current.volume=p?0:Math.pow(c,2)*Ti)},[c,p]),a.useEffect(()=>{r&&n.current&&n.current.play().catch(h=>console.log("Autoplay blocked",h))},[u]),a.useEffect(()=>{i||(x(!1),w(!1))},[i]),a.useEffect(()=>{const h=b=>{i&&(o.current&&o.current.contains(b.target)||b.target.closest(".dock-outer")||t&&t())};return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[i,t]);const N=()=>{n.current&&(U(n.current.currentTime),W(n.current.duration||0))},P=h=>{const b=parseFloat(h.target.value);U(b),n.current&&(n.current.currentTime=b)},I=()=>{r?n.current.pause():n.current.play(),l(!r)},S=()=>{d(h=>(h+1)%ke.length)},v=h=>{d(h),l(!0),w(!1)},_=h=>{if(!h||isNaN(h))return"0:00";const b=Math.floor(h/60),X=Math.floor(h%60);return`${b}:${X<10?"0":""}${X}`};return e.jsxs(G.div,{ref:o,className:"music-player-container",initial:"hidden",animate:i?"visible":"hidden",variants:{visible:{opacity:1,y:0,scale:1,pointerEvents:"auto"},hidden:{opacity:0,y:50,scale:.95,pointerEvents:"none"}},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("audio",{ref:n,src:q.src,onEnded:S,onTimeUpdate:N,onLoadedMetadata:N,preload:"auto"}),e.jsx(ge,{children:g&&e.jsx(G.div,{className:"playlist-popup",initial:{opacity:0,y:10,scale:.95,x:"-50%"},animate:{opacity:1,y:0,scale:1,x:"-50%"},exit:{opacity:0,y:10,scale:.95,x:"-50%"},transition:{duration:.2},children:ke.map((h,b)=>e.jsxs("div",{className:`playlist-item ${b===u?"active":""}`,onClick:()=>v(b),children:[b+1,". ",h.title]},b))})}),e.jsx("div",{className:"compact-info",onClick:()=>w(!g),children:e.jsxs("div",{className:"song-title-wrapper",style:{display:"flex",alignItems:"center"},children:[e.jsx("span",{className:"song-title",children:q.title}),e.jsx(Qt,{size:14,style:{minWidth:14,marginLeft:8,opacity:.6}})]})}),e.jsxs("div",{className:"compact-controls-row",children:[e.jsx("button",{className:"mini-play-btn",onClick:I,children:r?e.jsx(Kt,{size:16}):e.jsx(Zt,{size:16,style:{marginLeft:"2px"}})}),e.jsxs("div",{className:"seek-bar-container",children:[e.jsx("input",{type:"range",min:"0",max:B,value:k,onChange:P,className:"seek-slider"}),e.jsxs("div",{className:"time-display",children:[_(k)," / ",_(B)]})]}),e.jsx("button",{className:"icon-btn",onClick:S,children:e.jsx($t,{size:18})}),e.jsxs("div",{className:"volume-wrapper",children:[e.jsx("button",{className:`icon-btn ${y?"active":""}`,onClick:()=>x(!y),children:p||c===0?e.jsx(en,{size:18}):e.jsx(tn,{size:18})}),e.jsx(ge,{children:y&&e.jsx(G.div,{className:"volume-popup",initial:{opacity:0,scale:.8,x:10},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.8,x:0},children:e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:p?0:c,onChange:h=>m(parseFloat(h.target.value))})})})]})]})]})},Oi=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],Ui=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function Bi(){const{isUnlocked:i,openShop:t,closeShop:n,lockGame:o,activeBackground:r}=Re(),[l,u]=a.useState(!0),[d,c]=a.useState(!1),[m,p]=a.useState(!1),[C,y]=a.useState(!1),[x,g]=a.useState(!1),[w,k]=a.useState(null),[U,B]=a.useState(null),[W,q]=a.useState(null),[N,P]=a.useState(null),[I,S]=a.useState(null),[v,_]=a.useState(null),[h,b]=a.useState(null),X=Z=>{Z&&t(Z)},le=()=>{m?(p(!1),C&&u(!0)):(g(!1),y(l),u(!1),p(!0))},R=[{icon:e.jsx(nn,{size:22}),label:"Texto",onClick:()=>u(!l)},{icon:e.jsx(on,{size:22}),label:"Música",onClick:()=>c(!d)},{icon:e.jsx(sn,{size:22}),label:"Juego",onClick:()=>console.log("Toggle Game")},{icon:e.jsx(an,{size:22}),label:"Fondo",onClick:le},{icon:e.jsx(rn,{size:22}),label:"Bloquear",onClick:()=>{o&&(n(),c(!1),k(null),B(null),q(null),P(null),S(null),_(null),b(null),o())}}],[H,M]=a.useState(!0),[F,Q]=a.useState(0);return a.useEffect(()=>{const Z=setInterval(()=>{Q(ue=>{const de=ue+Math.floor(Math.random()*15)+5;return de>=100?(clearInterval(Z),setTimeout(()=>M(!1),200),100):de})},200);return()=>clearInterval(Z)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(ge,{mode:"wait",children:H&&e.jsx(xi,{progress:F},"loader")}),e.jsx(ge,{children:!i&&e.jsx(G.div,{initial:{opacity:0,filter:"blur(20px)",scale:1.1},animate:{opacity:1,filter:"blur(0px)",scale:1},exit:{opacity:0,filter:"blur(20px)",scale:1.1,transition:{duration:2}},transition:{duration:2,ease:"easeInOut"},style:{position:"fixed",zIndex:9999,inset:0,background:"#000"},children:e.jsx(gn,{})},"lock-screen")}),e.jsx(ge,{children:i&&e.jsxs(G.div,{className:"app-content",initial:{opacity:0,scale:.95,filter:"blur(10px)"},animate:{opacity:1,scale:1,filter:"blur(0px)"},exit:{opacity:0,scale:1.1,filter:"blur(10px)",transition:{duration:1}},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative",overflow:"hidden"},children:[e.jsx(ai,{floatingLinesConfig:w,lightPillarsConfig:U,ballpitConfig:W,silkConfig:N,galaxyConfig:I,gradientConfig:v,pixelSnowConfig:h}),e.jsx(ri,{isOpen:x,onToggle:Z=>{g(Z),Z&&p(!1)},items:Oi,socialItems:Ui,isFixed:!0,position:"right",onItemClick:X,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(gi,{}),e.jsx(vi,{}),e.jsx(ge,{children:l&&e.jsx(G.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},transition:{duration:.3},style:{position:"absolute",width:"100%",height:"100%",zIndex:10},children:e.jsx(zn,{})})}),e.jsx(ge,{children:m&&["floatinglines","lightpillars","ballpit","silk","galaxy","gradient","pixelsnow"].includes(r)&&e.jsx(G.div,{initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:50},transition:{duration:.3},style:{position:"absolute",top:0,right:0,zIndex:200,height:"100%",pointerEvents:"auto"},children:e.jsx("div",{style:{height:"100%"},children:e.jsx(ci,{onClose:le,floatingLinesConfig:w,setFloatingLinesConfig:k,lightPillarsConfig:U,setLightPillarsConfig:B,ballpitConfig:W,setBallpitConfig:q,silkConfig:N,setSilkConfig:P,galaxyConfig:I,setGalaxyConfig:S,gradientConfig:v,setGradientConfig:_,pixelSnowConfig:h,setPixelSnowConfig:b})})})}),e.jsx(Di,{visible:d,onClose:()=>c(!1)}),e.jsx(mi,{items:R,panelHeight:60,baseItemSize:45,magnification:60})]},"main-content")})]})}ln.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(Bi,{})}));
