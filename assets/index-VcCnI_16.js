import{c as ke,j as e,r as s,u as Ie,a as Ne,C as Ee,b as Me,F as Le,R as fe,g as h,d as Pe,e as Fe,f as Te,h as ge,i as xe,k as De,l as Oe,m as Ge,n as Ue,o as qe}from"./vendor-D_dIBtyL.js";import{R as ze,T as Be,P as He,C as he,M as Qe}from"./ogl--UM621jO.js";import{A as X,m as j,u as _,a as me,b as re}from"./framer-motion-D7uUrjVx.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();const $=ke(t=>({isUnlocked:!1,unlockApp:()=>t({isUnlocked:!0}),activeShop:null,openShop:n=>t({activeShop:n}),closeShop:()=>t({activeShop:null}),activeBackground:"gradient",setBackground:n=>t({activeBackground:n}),activeCursor:"default",setCursor:n=>t({activeCursor:n}),activeTrail:"none",setTrail:n=>t({activeTrail:n})})),Je=({text:t,disabled:n=!1,speed:i=3,className:r="",color:o="#7c7c7c",shineColor:l="#ffffff",direction:p="right"})=>e.jsx("div",{className:`shiny-text ${p} ${n?"disabled":""} ${r}`,style:{"--shiny-speed":`${i}s`,"--base-color":o,"--shine-color":l},children:t}),Ye=t=>(t=t.replace("#",""),[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]),Ve=`
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Xe=`
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
`,ye=s.forwardRef(function({uniforms:n},i){const{viewport:r}=Ie();return s.useLayoutEffect(()=>{i.current&&i.current.scale.set(r.width,r.height,1)},[i,r]),Ne((o,l)=>{i.current.material.uniforms.uTime.value+=.1*l}),e.jsxs("mesh",{ref:i,children:[e.jsx("planeGeometry",{args:[1,1,1,1]}),e.jsx("shaderMaterial",{uniforms:n,vertexShader:Ve,fragmentShader:Xe})]})});ye.displayName="SilkPlane";const We=({speed:t=1,scale:n=2,color:i="#ff99cc",noiseIntensity:r=.5,rotation:o=0})=>{const l=s.useRef(),p=s.useMemo(()=>({uSpeed:{value:t},uScale:{value:n},uNoiseIntensity:{value:r},uColor:{value:new Ee(...Ye(i))},uRotation:{value:o},uTime:{value:0}}),[t,n,r,i,o]);return e.jsx(Me,{dpr:[1,2],frameloop:"always",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,background:"black"},children:e.jsx(ye,{ref:l,uniforms:p})})},Ke=()=>{const[t,n]=s.useState(""),[i,r]=s.useState(!1),o=$(f=>f.unlockApp),l="230824",p=f=>{const c=f.target.value.replace(/\D/g,"");if(c.length>6)return;let x=c;c.length>2&&(x=c.slice(0,2)+"/"+c.slice(2)),c.length>4&&(x=x.slice(0,5)+"/"+c.slice(4)),n(x),r(!1)},g=f=>{f.preventDefault(),t.replace(/\//g,"")===l?o():(r(!0),setTimeout(()=>r(!1),1e3))};return e.jsxs("div",{className:"lock-screen",children:[e.jsx(We,{speed:4,scale:1,color:"#9726fa",noiseIntensity:1.5,rotation:0}),e.jsxs("div",{className:"lock-content",children:[e.jsx("h1",{children:e.jsx(Je,{text:"La fecha donde empezó todo"})}),e.jsxs("form",{onSubmit:g,children:[e.jsx("input",{type:"text",inputMode:"numeric",placeholder:"DD/MM/AA",value:t,onChange:p,className:i?"error":""}),e.jsx("button",{type:"submit",children:e.jsx(Le,{size:20})})]})]})]})},Ze=()=>e.jsx("div",{className:"main-container",children:e.jsxs("div",{className:"glass-card",children:[e.jsxs("header",{children:[e.jsx("h1",{children:"Lorem Ipsum"}),e.jsx("div",{className:"subtitle",children:"Dolor sit amet, consectetur adipiscing elit"})]}),e.jsxs("div",{className:"content-body",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}),e.jsx("p",{children:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]})}),_e=()=>e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:-1,background:"#050505",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"200vmax",height:"200vmax",transform:"translate(-50%, -50%)",background:"linear-gradient(to bottom, #b117f8, #2c0b2e)",animation:"spinGradient 20s linear infinite"}}),e.jsx("style",{children:`
          @keyframes spinGradient {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        `})]}),$e=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,et=`
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
`,tt=({focal:t=[.5,.5],rotation:n=[1,0],starSpeed:i=0,density:r=1.5,hueShift:o=300,disableAnimation:l=!1,speed:p=.5,mouseInteraction:g=!0,glowIntensity:f=.5,saturation:c=.8,mouseRepulsion:x=!0,repulsionStrength:P=.5,twinkleIntensity:w=.5,rotationSpeed:y=.05,autoCenterRepulsion:u=0,transparent:O=!0,...B})=>{const F=s.useRef(null),H=s.useRef({x:.5,y:.5}),N=s.useRef({x:.5,y:.5}),T=s.useRef(0),Q=s.useRef(0);return s.useEffect(()=>{if(!F.current)return;const S=F.current;S.innerHTML="";const J=new ze({alpha:O,premultipliedAlpha:!1,dpr:1}),m=J.gl;O?(m.enable(m.BLEND),m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA),m.clearColor(0,0,0,0)):m.clearColor(0,0,0,1);let I;function q(){J.setSize(S.offsetWidth*1,S.offsetHeight*1),I&&(I.uniforms.uResolution.value=new he(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height))}window.addEventListener("resize",q,!1),q();const ie=new Be(m);I=new He(m,{vertex:$e,fragment:et,uniforms:{uTime:{value:0},uResolution:{value:new he(m.canvas.width,m.canvas.height,m.canvas.width/m.canvas.height)},uFocal:{value:new Float32Array(t)},uRotation:{value:new Float32Array(n)},uStarSpeed:{value:i},uDensity:{value:r},uHueShift:{value:o},uSpeed:{value:p},uMouse:{value:new Float32Array([.5,.5])},uGlowIntensity:{value:f},uSaturation:{value:c},uMouseRepulsion:{value:x},uTwinkleIntensity:{value:w},uRotationSpeed:{value:y},uRepulsionStrength:{value:P},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:u},uTransparent:{value:O}}});const le=new Qe(m,{geometry:ie,program:I});let W,z=0;const V=1e3/30;function K(k){if(W=requestAnimationFrame(K),!F.current)return;const D=k-z;if(D<V)return;z=k-D%V,l||(I.uniforms.uTime.value=k*.001,I.uniforms.uStarSpeed.value=k*.001*i/10);const U=.05;N.current.x+=(H.current.x-N.current.x)*U,N.current.y+=(H.current.y-N.current.y)*U,Q.current+=(T.current-Q.current)*U,I.uniforms.uMouse.value[0]=N.current.x,I.uniforms.uMouse.value[1]=N.current.y,I.uniforms.uMouseActiveFactor.value=Q.current,J.render({scene:le})}W=requestAnimationFrame(K),S.appendChild(m.canvas),m.canvas.style.width="100%",m.canvas.style.height="100%",m.canvas.style.display="block",m.canvas.style.willChange="transform";function Z(k){const D=S.getBoundingClientRect(),U=(k.clientX-D.left)/D.width,ee=1-(k.clientY-D.top)/D.height;H.current={x:U,y:ee},T.current=1}function E(){T.current=0}return g&&(S.addEventListener("mousemove",Z),S.addEventListener("mouseleave",E)),()=>{cancelAnimationFrame(W),window.removeEventListener("resize",q),g&&(S.removeEventListener("mousemove",Z),S.removeEventListener("mouseleave",E)),S&&m.canvas&&S.contains(m.canvas)&&S.removeChild(m.canvas),m.getExtension("WEBGL_lose_context")?.loseContext()}},[t,n,i,r,o,l,p,g,f,c,x,w,y,P,u,O]),e.jsx("div",{ref:F,className:"galaxy-container",style:{width:"100%",height:"100%",position:"absolute",top:0,left:0,contain:"strict",overflow:"hidden"},...B})},st=fe.memo(tt),at=()=>{const{activeBackground:t}=$();return e.jsx("div",{style:{position:"fixed",inset:0,zIndex:0},children:e.jsxs(X,{mode:"wait",children:[t==="gradient"&&e.jsx(j.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},style:{position:"absolute",inset:0},children:e.jsx(_e,{})},"gradient"),t==="galaxy"&&e.jsx(j.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1.5},style:{position:"absolute",inset:0,background:"#050010"},children:e.jsx(st,{mouseRepulsion:!1,mouseInteraction:!1,density:1,glowIntensity:.5,saturation:1,hueShift:110,twinkleIntensity:.3,rotationSpeed:.1,starSpeed:.5,speed:.5})},"galaxy")]})})},nt=({onItemClick:t,position:n="left",colors:i=["#B19EEF","#5227FF"],items:r=[],socialItems:o=[],displaySocials:l=!0,displayItemNumbering:p=!0,className:g,logoUrl:f=null,menuButtonColor:c="#fff",openMenuButtonColor:x="#000",accentColor:P="#5227FF",changeMenuColorOnOpen:w=!0,isFixed:y=!1,closeOnClickAway:u=!0,onMenuOpen:O,onMenuClose:B})=>{const[F,H]=s.useState(!1),N=s.useRef(!1),T=s.useRef(null),Q=s.useRef(null),S=s.useRef([]),J=s.useRef(null),m=s.useRef(null),I=s.useRef(null),q=s.useRef(null),ie=s.useRef(null),[le,W]=s.useState(["Menu","Close"]),z=s.useRef(null),Y=s.useRef(null),V=s.useRef(null),K=s.useRef(null),Z=s.useRef(null),E=s.useRef(null),k=s.useRef(!1),D=s.useRef(null);s.useLayoutEffect(()=>{const a=h.context(()=>{const d=T.current,v=Q.current,b=J.current,C=m.current,A=I.current,R=q.current;if(!d||!b||!C||!A||!R)return;let M=[];v&&(M=Array.from(v.querySelectorAll(".sm-prelayer"))),S.current=M;const L=n==="left"?-100:100;h.set([d,...M],{xPercent:L}),h.set(b,{transformOrigin:"50% 50%",rotate:0}),h.set(C,{transformOrigin:"50% 50%",rotate:90}),h.set(A,{rotate:0,transformOrigin:"50% 50%"}),h.set(R,{yPercent:0}),E.current&&h.set(E.current,{color:c})});return()=>a.revert()},[c,n]);const U=s.useCallback(()=>{const a=T.current,d=S.current;if(!a)return null;z.current?.kill(),Y.current&&(Y.current.kill(),Y.current=null),D.current?.kill();const v=Array.from(a.querySelectorAll(".sm-panel-itemLabel")),b=Array.from(a.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")),C=a.querySelector(".sm-socials-title"),A=Array.from(a.querySelectorAll(".sm-socials-link")),R=d.map(G=>({el:G,start:Number(h.getProperty(G,"xPercent"))})),M=Number(h.getProperty(a,"xPercent"));v.length&&h.set(v,{yPercent:140,rotate:10}),b.length&&h.set(b,{"--sm-num-opacity":0}),C&&h.set(C,{opacity:0}),A.length&&h.set(A,{y:25,opacity:0});const L=h.timeline({paused:!0});R.forEach((G,oe)=>{L.fromTo(G.el,{xPercent:G.start},{xPercent:0,duration:.8,ease:"power4.out"},oe*.07)});const ue=(R.length?(R.length-1)*.07:0)+(R.length?.08:0),de=1;if(L.fromTo(a,{xPercent:M},{xPercent:0,duration:de,ease:"power4.out"},ue),v.length){const oe=ue+de*.15;L.to(v,{yPercent:0,rotate:0,duration:1,ease:"power4.out",stagger:{each:.1,from:"start"}},oe),b.length&&L.to(b,{duration:.6,ease:"power2.out","--sm-num-opacity":1,stagger:{each:.08,from:"start"}},oe+.1)}if(C||A.length){const G=ue+de*.4;C&&L.to(C,{opacity:1,duration:.5,ease:"power2.out"},G),A.length&&L.to(A,{y:0,opacity:1,duration:.55,ease:"power3.out",stagger:{each:.08,from:"start"},onComplete:()=>{h.set(A,{clearProps:"opacity"})}},G+.04)}return z.current=L,L},[]),ee=s.useCallback(()=>{if(k.current)return;k.current=!0;const a=U();a?(a.eventCallback("onComplete",()=>{k.current=!1}),a.play(0)):k.current=!1},[U]),te=s.useCallback(()=>{z.current?.kill(),z.current=null,D.current?.kill();const a=T.current,d=S.current;if(!a)return;const v=[...d,a];Y.current?.kill();const b=n==="left"?-100:100;Y.current=h.to(v,{xPercent:b,duration:.32,ease:"power3.in",overwrite:"auto",onComplete:()=>{const C=Array.from(a.querySelectorAll(".sm-panel-itemLabel"));C.length&&h.set(C,{yPercent:140,rotate:10});const A=Array.from(a.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"));A.length&&h.set(A,{"--sm-num-opacity":0});const R=a.querySelector(".sm-socials-title"),M=Array.from(a.querySelectorAll(".sm-socials-link"));R&&h.set(R,{opacity:0}),M.length&&h.set(M,{y:25,opacity:0}),k.current=!1}})},[n]),se=s.useCallback(a=>{const d=I.current;d&&(V.current?.kill(),a?V.current=h.to(d,{rotate:225,duration:.8,ease:"power4.out",overwrite:"auto"}):V.current=h.to(d,{rotate:0,duration:.35,ease:"power3.inOut",overwrite:"auto"}))},[]),ae=s.useCallback(a=>{const d=E.current;if(d)if(Z.current?.kill(),w){const v=a?x:c;Z.current=h.to(d,{color:v,delay:.18,duration:.3,ease:"power2.out"})}else h.set(d,{color:c})},[x,c,w]);fe.useEffect(()=>{if(E.current)if(w){const a=N.current?x:c;h.set(E.current,{color:a})}else h.set(E.current,{color:c})},[w,c,x]);const ne=s.useCallback(a=>{const d=q.current;if(!d)return;K.current?.kill();const v=a?"Menu":"Close",b=a?"Close":"Menu",C=3,A=[v];let R=v;for(let ce=0;ce<C;ce++)R=R==="Menu"?"Close":"Menu",A.push(R);R!==b&&A.push(b),A.push(b),W(A),h.set(d,{yPercent:0});const M=A.length,L=(M-1)/M*100;K.current=h.to(d,{yPercent:-L,duration:.5+M*.07,ease:"power4.out"})},[]),Re=s.useCallback(()=>{const a=!N.current;N.current=a,H(a),a?(O?.(),ee()):(B?.(),te()),se(a),ae(a),ne(a)},[ee,te,se,ae,ne,O,B]),pe=s.useCallback(()=>{N.current&&(N.current=!1,H(!1),B?.(),te(),se(!1),ae(!1),ne(!1))},[te,se,ae,ne,B]);return fe.useEffect(()=>{if(!u||!F)return;const a=d=>{const v=T.current&&T.current.contains(d.target),b=E.current&&E.current.contains(d.target),C=d.target.closest(".shop-overlay");!v&&!b&&!C&&pe()};return document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[u,F,pe]),e.jsxs("div",{className:(g?g+" ":"")+"staggered-menu-wrapper"+(y?" fixed-wrapper":""),style:P?{"--sm-accent":P}:void 0,"data-position":n,"data-open":F||void 0,children:[e.jsx("div",{ref:Q,className:"sm-prelayers","aria-hidden":"true",children:(()=>{let d=[...i&&i.length?i.slice(0,4):["#1e1e22","#35353c"]];if(d.length>=3){const v=Math.floor(d.length/2);d.splice(v,1)}return d.map((v,b)=>e.jsx("div",{className:"sm-prelayer",style:{background:v}},b))})()}),e.jsxs("header",{className:"staggered-menu-header","aria-label":"Main navigation header",children:[e.jsx("div",{className:"sm-logo","aria-label":"Logo",children:f?e.jsx("img",{src:f,alt:"Logo",className:"sm-logo-img",draggable:!1,width:110,height:24}):null}),e.jsxs("button",{ref:E,className:"sm-toggle","aria-label":F?"Close menu":"Open menu","aria-expanded":F,"aria-controls":"staggered-menu-panel",onClick:Re,type:"button",children:[e.jsx("span",{ref:ie,className:"sm-toggle-textWrap","aria-hidden":"true",children:e.jsx("span",{ref:q,className:"sm-toggle-textInner",children:le.map((a,d)=>e.jsx("span",{className:"sm-toggle-line",children:a},d))})}),e.jsxs("span",{ref:I,className:"sm-icon","aria-hidden":"true",children:[e.jsx("span",{ref:J,className:"sm-icon-line"}),e.jsx("span",{ref:m,className:"sm-icon-line sm-icon-line-v"})]})]})]}),e.jsx("aside",{id:"staggered-menu-panel",ref:T,className:"staggered-menu-panel","aria-hidden":!F,children:e.jsxs("div",{className:"sm-panel-inner",children:[e.jsx("ul",{className:"sm-panel-list",role:"list","data-numbering":p||void 0,children:r&&r.length?r.map((a,d)=>e.jsx("li",{className:"sm-panel-itemWrap",children:e.jsx("a",{className:"sm-panel-item",href:"#",onClick:v=>{v.preventDefault(),t&&t(a.id)},"aria-label":a.ariaLabel,"data-index":d+1,children:e.jsx("span",{className:"sm-panel-itemLabel",children:a.label})})},a.label+d)):e.jsx("li",{className:"sm-panel-itemWrap","aria-hidden":"true",children:e.jsx("span",{className:"sm-panel-item",children:e.jsx("span",{className:"sm-panel-itemLabel",children:"No items"})})})}),l&&o&&o.length>0&&e.jsxs("div",{className:"sm-socials","aria-label":"Social links",children:[e.jsx("h3",{className:"sm-socials-title",children:"Extras"}),e.jsx("ul",{className:"sm-socials-list",role:"list",children:o.map((a,d)=>e.jsx("li",{className:"sm-socials-item",children:e.jsx("a",{href:a.link,target:"_blank",rel:"noopener noreferrer",className:"sm-socials-link",children:a.label})},a.label+d))})]})]})})]})};function ot({children:t,className:n="",onClick:i,mouseX:r,spring:o,distance:l,magnification:p,baseItemSize:g}){const f=s.useRef(null),c=_(0),x=me(r,y=>{if(!f.current)return 1/0;const u=f.current.getBoundingClientRect(),O=u.x+u.width/2;return Math.abs(y-O)}),P=me(x,[0,l],[p,g]),w=re(P,o);return e.jsx(j.div,{ref:f,style:{width:w,height:w,minWidth:w,minHeight:w},onHoverStart:()=>c.set(1),onHoverEnd:()=>c.set(0),onFocus:()=>c.set(1),onBlur:()=>c.set(0),onClick:i,className:`dock-item ${n}`,tabIndex:0,role:"button","aria-haspopup":"true",children:s.Children.map(t,y=>s.cloneElement(y,{isHovered:c}))})}function rt({children:t,className:n="",...i}){const{isHovered:r}=i,[o,l]=s.useState(!1);return s.useEffect(()=>{const p=r.on("change",g=>{l(g===1)});return()=>p()},[r]),e.jsx(X,{children:o&&e.jsx(j.div,{initial:{opacity:0,y:10,x:"-50%"},animate:{opacity:1,y:0,x:"-50%"},exit:{opacity:0,y:5,x:"-50%"},transition:{duration:.2},className:`dock-label ${n}`,role:"tooltip",style:{left:"50%",x:"-50%"},children:t})})}function it({children:t,className:n=""}){return e.jsx("div",{className:`dock-icon ${n}`,children:t})}function lt({items:t,className:n="",spring:i={mass:.1,stiffness:300,damping:20},magnification:r=70,distance:o=200,panelHeight:l=68,dockHeight:p=256,baseItemSize:g=50}){const f=_(1/0),c=_(0),x=s.useMemo(()=>Math.max(p,r+r/2+4),[r,p]),P=me(c,[0,1],[l,x]),w=re(P,i);return e.jsx(j.div,{style:{height:w,scrollbarWidth:"none"},className:"dock-outer",children:e.jsx(j.div,{onMouseMove:({pageX:y})=>{c.set(1),f.set(y)},onMouseLeave:()=>{c.set(0),f.set(1/0)},className:`dock-panel ${n}`,style:{height:l},role:"toolbar","aria-label":"Application dock",children:t.map((y,u)=>e.jsxs(ot,{onClick:y.onClick,className:y.className,mouseX:f,spring:i,distance:o,magnification:r,baseItemSize:g,children:[e.jsx(it,{children:y.icon}),e.jsx(rt,{children:y.label})]},u))})})}const Ae="/assets/apple-cat-BHTFRffC.gif",be="/assets/jump-cat-BVsZ-jsy.gif",je="/assets/rolling-cat-BlLA7Xch.gif",we="/assets/duck-BnqypGlP.png",Se="data:image/png;base64,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",Ce="/assets/skeleton-run-CHzXkBxe.gif",ct={backgrounds:[{id:"gradient",name:"Original Gradient",description:"El clásico atemporal.",price:"Gratis",previewColor:"linear-gradient(45deg, #8629b1, #f700ff)"},{id:"galaxy",name:"Galaxy",description:"Un viaje a las estrellas.",price:"Gratis",previewColor:"#000"}],cursors:[{id:"default",name:"Ratón Estándar",description:"El cursor de toda la vida.",price:"Gratis",previewColor:"transparent",icon:e.jsx(ge,{})}],trails:[{id:"none",name:"Ninguno",description:"Sin rastro, limpio y rápido.",price:"Gratis",previewColor:"transparent",icon:e.jsx(xe,{})},{id:"apple-cat",name:"Gato Manzana",description:"Un gatito adorable en una manzana.",price:"Gratis",previewColor:"#ffadad",icon:e.jsx("img",{src:Ae,alt:"Apple Cat",style:{width:"40px"}})},{id:"jump-cat",name:"Gato Saltarín",description:"Siempre lleno de energía.",price:"Gratis",previewColor:"#a89c8d",icon:e.jsx("img",{src:be,alt:"Jump Cat",style:{width:"40px"}})},{id:"rolling-cat",name:"Gato Rodante",description:"Rodando hacia tu corazón.",price:"Gratis",previewColor:"#ffecb6",icon:e.jsx("img",{src:je,alt:"Rolling Cat",style:{width:"40px"}})},{id:"duck",name:"Pato",description:"Cuack cuack.",price:"Gratis",previewColor:"#ebe371",icon:e.jsx("img",{src:we,alt:"Duck",style:{width:"40px"}})},{id:"pompom",name:"Pompom",description:"Suave y esponjoso.",price:"Gratis",previewColor:"#e3e4b2",icon:e.jsx("img",{src:Se,alt:"Pompom",style:{width:"40px"}})},{id:"skeleton-run",name:"Esqueleto",description:"Spooky scary skeletons.",price:"Gratis",previewColor:"#a3a3a3",icon:e.jsx("img",{src:Ce,alt:"Skeleton",style:{width:"40px"}})}]},ut=[{id:"backgrounds",label:"Fondos",icon:e.jsx(Te,{})},{id:"cursors",label:"Cursores",icon:e.jsx(ge,{})},{id:"trails",label:"Mascotas",icon:e.jsx(xe,{})}],dt=()=>{const{activeShop:t,openShop:n,closeShop:i,activeBackground:r,setBackground:o,activeCursor:l,setCursor:p,activeTrail:g,setTrail:f}=$(),[c,x]=s.useState(t);s.useEffect(()=>{t&&x(t)},[t]);const P=ct[c]||[],w=u=>{t==="backgrounds"&&o(u),t==="cursors"&&p(u),t==="trails"&&f(u)},y=u=>t==="backgrounds"?r===u:t==="cursors"?l===u:t==="trails"?g===u:!1;return e.jsx(X,{children:t&&e.jsxs(j.div,{className:"shop-overlay",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx("div",{className:"click-outside-layer",onClick:i,style:{position:"absolute",inset:0}}),e.jsxs(j.div,{className:"shop-window",initial:{scale:.9,y:20,opacity:0},animate:{scale:1,y:0,opacity:1},exit:{scale:.95,y:10,opacity:0,transition:{duration:.2}},children:[e.jsxs("div",{className:"shop-header-row",children:[e.jsx("div",{className:"shop-tabs",children:ut.map(u=>e.jsxs("button",{onClick:()=>n(u.id),className:`tab-btn ${t===u.id?"active":""}`,children:[u.icon,e.jsx("span",{children:u.label}),t===u.id&&e.jsx(j.div,{layoutId:"activeTab",className:"active-line"})]},u.id))}),e.jsx("button",{onClick:i,className:"close-btn",children:e.jsx(Pe,{})})]}),e.jsxs("div",{className:"shop-section-title",children:["Catálogo de"," ",c==="backgrounds"?"Fondos":c==="cursors"?"Cursores":"Mascotas"]}),e.jsx("div",{className:"shop-grid",children:e.jsx(X,{mode:"wait",children:e.jsx(j.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},exit:{opacity:0,x:-10},transition:{duration:.2},style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"20px",width:"100%"},children:P.map(u=>e.jsxs("div",{className:`shop-item ${y(u.id)?"equipped":""}`,onClick:()=>w(u.id),children:[e.jsxs("div",{className:"item-preview",style:{background:u.previewColor},children:[u.icon&&e.jsx("div",{className:"preview-icon",children:u.icon}),y(u.id)&&e.jsx("div",{className:"check-badge",children:e.jsx(Fe,{})})]}),e.jsxs("div",{className:"item-info",children:[e.jsx("h3",{children:u.name}),e.jsx("p",{children:u.description}),e.jsx("span",{className:"price-tag",children:u.price})]})]},u.id))},c)})})]})]})})},ft=()=>{const{activeTrail:t}=$(),n=_(-100),i=_(-100),r={damping:25,stiffness:70,mass:1},o=re(n,r),l=re(i,r);s.useEffect(()=>{const g=f=>{n.set(f.clientX),i.set(f.clientY)};return window.addEventListener("mousemove",g),()=>window.removeEventListener("mousemove",g)},[n,i]);const p={"apple-cat":Ae,"jump-cat":be,"rolling-cat":je,duck:we,pompom:Se,"skeleton-run":Ce,ghost:null};return!t||t==="none"?null:e.jsx("div",{style:{position:"fixed",top:0,left:0,pointerEvents:"none",zIndex:9999},children:p[t]?e.jsx(j.img,{src:p[t],alt:"trail",style:{x:o,y:l,translateX:25,translateY:25,width:"70px",height:"auto",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))"}}):t==="ghost"?e.jsx(j.div,{style:{x:o,y:l,translateX:20,translateY:20,fontSize:"2rem",filter:"drop-shadow(0 0 10px rgba(255,255,255,0.5))"},children:"👻"}):null})},ve=["Alineando las estrellas...","Despertando a los gatos...","Cargando recuerdos...","Preparando el universo..."],mt=({progress:t})=>{const[n,i]=s.useState(0);return s.useEffect(()=>{const r=setInterval(()=>{i(o=>(o+1)%ve.length)},1500);return()=>clearInterval(r)},[]),e.jsxs(j.div,{className:"loading-screen",exit:{opacity:0,pointerEvents:"none",transition:{duration:.8,ease:"easeInOut"}},children:[e.jsx("div",{className:"loading-background-effect"}),e.jsxs("div",{className:"loading-content",children:[e.jsx("h1",{className:"loading-title",children:"ONLY YOU"}),e.jsxs("div",{className:"progress-wrapper",children:[e.jsxs("div",{className:"progress-info",children:[e.jsx("span",{className:"loading-label",children:"Cargando sistema"}),e.jsxs("span",{className:"loading-percent",children:[t,"%"]})]}),e.jsx("div",{className:"progress-bar-bg",children:e.jsx(j.div,{className:"progress-bar-fill",initial:{width:0},animate:{width:`${t}%`},transition:{type:"spring",stiffness:50,damping:15}})})]}),e.jsx("div",{className:"message-container",children:e.jsx(j.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},exit:{opacity:0,y:-5},transition:{duration:.3},className:"loading-message",children:ve[n]},n)})]})]})},pt=[{id:"backgrounds",label:"Fondos",ariaLabel:"Galería de Fondos"},{id:"cursors",label:"Cursores",ariaLabel:"Personalizar Cursor"},{id:"trails",label:"Mascotas",ariaLabel:"Personalizar Mascota"}],ht=[{label:"GitHub",link:"https://github.com"},{label:"Instagram",link:"https://instagram.com"}];function vt(){const{isUnlocked:t,openShop:n}=$(),i=f=>{f&&n(f)},r=[{icon:e.jsx(De,{size:22}),label:"Inicio",onClick:()=>console.log("Click en Inicio")},{icon:e.jsx(Oe,{size:22}),label:"Apps",onClick:()=>console.log("Click en Apps")},{icon:e.jsx(Ge,{size:22}),label:"Perfil",onClick:()=>console.log("Click en Perfil")},{icon:e.jsx(Ue,{size:22}),label:"Ajustes",onClick:()=>console.log("Click en Ajustes")}],[o,l]=s.useState(!0),[p,g]=s.useState(0);return s.useEffect(()=>{const f=setInterval(()=>{g(c=>{const x=c+Math.floor(Math.random()*15)+5;return x>=100?(clearInterval(f),setTimeout(()=>l(!1),200),100):x})},200);return()=>clearInterval(f)},[]),e.jsxs("main",{style:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden"},children:[e.jsx(X,{mode:"wait",children:o&&e.jsx(mt,{progress:p},"loader")}),e.jsx(X,{children:!t&&e.jsx(j.div,{initial:{opacity:1},exit:{opacity:0,filter:"blur(20px)",transition:{duration:2}},style:{position:"fixed",zIndex:9999,inset:0},children:e.jsx(Ke,{})},"lock-screen")}),t&&e.jsxs(j.div,{className:"app-content",initial:{opacity:0,scale:1},animate:{opacity:1,scale:1},transition:{duration:1},style:{width:"100%",height:"100%",position:"relative"},children:[e.jsx(at,{}),e.jsx(nt,{items:pt,socialItems:ht,isFixed:!0,position:"right",onItemClick:i,colors:["#f700ff","#bd71ff","#8629b1"],accentColor:"#f700ff",menuButtonColor:"#fff",openMenuButtonColor:"#ffffff",displayItemNumbering:!0,logoUrl:null}),e.jsx(dt,{}),e.jsx(ft,{}),e.jsx(Ze,{}),e.jsx(lt,{items:r,panelHeight:60,baseItemSize:45,magnification:60})]})]})}qe.createRoot(document.getElementById("root")).render(e.jsx(s.StrictMode,{children:e.jsx(vt,{})}));
