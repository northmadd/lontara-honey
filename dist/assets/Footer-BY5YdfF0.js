import{c as L,u as S,j as e,l as W,r as E}from"./index-q_dLPer8.js";import{M as P}from"./map-pin-DCeFycVE.js";import{P as $}from"./phone-D1Wvo2oM.js";import{M as B}from"./mail-BXLy0sP6.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=L("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=L("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=L("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]),q="/assets/honey-footer-BrnrYwdJ.webp",H="/assets/scene-F8nsAT0c.mp4",T="/assets/scene-CtjW0hyU.webm",U=()=>{const t=E.useRef(null),a=E.useRef(null);return E.useEffect(()=>{const r=t.current,n=a.current,m=n==null?void 0:n.getContext("2d",{willReadFrequently:!0});if(!r||!n||!m)return;const o=document.createElement("canvas"),x=o.getContext("2d",{willReadFrequently:!0});if(!x)return;let s=0,y=!1,v=!1,b=!1;const D=()=>{if(!r.videoWidth)return;const i=Math.min(1,300/r.videoWidth),d=Math.round(r.videoWidth*i),g=Math.round(r.videoHeight*i);(n.width!==d||n.height!==g)&&(n.width=d,n.height=g)},k=()=>{if(b||!r.videoWidth)return;D();const i=160/r.videoWidth,d=Math.max(24,Math.round(r.videoWidth*i)),g=Math.max(24,Math.round(r.videoHeight*i));o.width!==d&&(o.width=d,o.height=g),x.drawImage(r,0,0,d,g);try{const N=x.getImageData(0,0,d,g),p=N.data;for(let c=0;c<p.length;c+=4){const _=p[c],F=p[c+1],R=p[c+2],h=.2126*_+.7152*F+.0722*R;p[c+3]=h<=45?0:h>=100?255:Math.round((h-45)/55*255);const A=1.45;p[c]=h+(_-h)*A+9,p[c+1]=h+(F-h)*A+6,p[c+2]=h+(R-h)*A}x.putImageData(N,0,0),m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",m.clearRect(0,0,n.width,n.height),m.drawImage(o,0,0,n.width,n.height),n.style.opacity!=="1"&&(n.style.opacity="1")}catch{b=!0}},C=()=>{s=0,k(),y&&v&&!b&&(s=requestAnimationFrame(C))},j=()=>{y&&v&&!b?s||(s=requestAnimationFrame(C)):s&&(cancelAnimationFrame(s),s=0)},w=()=>{const i=r.play();i&&i.catch(()=>{})},I=()=>{y=!0,j()},M=()=>{y=!1,j()},u=typeof IntersectionObserver<"u"?new IntersectionObserver(i=>{i.forEach(d=>{v=d.isIntersecting,j()})},{rootMargin:"100px"}):null;u?u.observe(n):v=!0,n.style.opacity="0";const z=()=>{D(),k()};r.addEventListener("play",I),r.addEventListener("pause",M),r.addEventListener("loadeddata",k),r.addEventListener("loadedmetadata",z),r.addEventListener("canplay",w),w();const l=()=>{w(),document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",l),document.removeEventListener("touchstart",l)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",l),document.addEventListener("touchstart",l),()=>{s&&cancelAnimationFrame(s),u==null||u.disconnect(),document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",l),document.removeEventListener("touchstart",l),r.removeEventListener("play",I),r.removeEventListener("pause",M),r.removeEventListener("loadeddata",k),r.removeEventListener("loadedmetadata",z),r.removeEventListener("canplay",w)}},[]),e.jsxs("span",{className:"northmad-badge",children:[e.jsxs("video",{ref:t,loop:!0,muted:!0,playsInline:!0,preload:"auto",className:"northmad-video-source select-none pointer-events-none",tabIndex:-1,children:[e.jsx("source",{src:H,type:"video/mp4"}),e.jsx("source",{src:T,type:"video/webm"})]}),e.jsx("canvas",{ref:a,className:"northmad-canvas select-none pointer-events-none","aria-hidden":"true"})]})},f="/".replace(/\/$/,""),X=()=>{const{t}=S(),a=o=>{const x=document.getElementById(o);x&&x.scrollIntoView({behavior:"smooth"})},r=o=>{const s=`https://wa.me/6282347905543?text=${encodeURIComponent(o)}`;window.open(s,"_blank")},n=[{icon:P,label:t("contact.address"),href:"https://www.google.com/maps/search/?api=1&query=South+Sulawesi+Indonesia"},{icon:$,label:"+62 823 4790 5543",href:"tel:+6282347905543"},{icon:B,label:"lontarajayanusantara@",href:"mailto:lontarajayanusantara@gmail.com"}],m=[{icon:V,href:"https://instagram.com/maduhutanlontara",label:t("footer.social.instagram")},{icon:O,href:"https://tiktok.com/@maduhutanlontara",label:t("footer.social.tiktok")},{icon:Y,href:"https://youtube.com/@rajamadusulawesi7380",label:t("footer.social.youtube")}];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .northmad-credit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
          line-height: 1;
        }

        .northmad-line {
          position: relative;
          display: block;
          width: fit-content;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c87f2a;
          isolation: isolate;
        }

        .northmad-name {
          margin-top: 7px;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 0.24em;
          background: linear-gradient(
            105deg,
            #8b5a1b 0%,
            #d4a056 28%,
            #ffe0a3 46%,
            #d4a056 56%,
            #a86b24 78%,
            #d4a056 100%
          );
          background-size: 320% 100%;
          background-position: 210% center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 12px rgba(212, 160, 86, 0.3), 0 0 26px rgba(139, 90, 27, 0.24);
          will-change: background-position, filter;
          animation: northmad-shimmer 2.4s ease-in-out infinite, northmad-glow 3s ease-in-out infinite alternate !important;
        }

        .northmad-line::after {
          display: none;
        }

        .northmad-name::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          display: block;
          color: rgba(212, 160, 86, 0.24);
          -webkit-text-fill-color: rgba(212, 160, 86, 0.22);
          opacity: 0.38;
          filter: blur(0.45px);
          animation: northmad-flash 2.4s ease-in-out infinite !important;
          pointer-events: none;
        }

        @keyframes northmad-shimmer {
          0% {
            background-position: 210% center;
          }

          100% {
            background-position: -110% center;
          }
        }

        @keyframes northmad-glow {
          0% {
            filter: drop-shadow(0 0 2px rgba(212, 160, 86, 0.18));
          }

          100% {
            filter: drop-shadow(0 0 12px rgba(212, 160, 86, 0.42));
          }
        }

        @keyframes northmad-flash {
          0%, 100% {
            opacity: 0.18;
          }

          50% {
            opacity: 0.48;
          }
        }

        @keyframes northmad-line-glow {
          0%, 100% {
            opacity: 0.85;
            filter: drop-shadow(0 0 3px rgba(232, 168, 60, 0.5));
          }

          50% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(232, 168, 60, 0.95));
          }
        }

        @media (max-width: 480px) {
          .northmad-line {
            font-size: 11px;
            letter-spacing: 0.23em;
          }

          .northmad-name {
            font-size: 16px;
            letter-spacing: 0.19em;
          }
        }

        .northmad-badge {
          position: relative;
          display: block;
          width: 200px;
          margin: -40px auto -14px;
        }

        .northmad-canvas {
          display: block;
          width: 100%;
          height: auto;
          background: transparent !important;
          border: 0;
          outline: 0;
        }

        .northmad-video-source {
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          height: auto;
          opacity: 0;
          pointer-events: none;
          background: transparent !important;
          border: 0;
          outline: 0;
        }

      `}),e.jsxs("footer",{className:"bg-background text-foreground border-t border-border dark:from-[#1a120d] dark:bg-gradient-to-br dark:via-[#2a1c0f]/80 dark:to-[#3c2414]/60 dark:text-white pt-8 pb-0 md:pt-16 md:pb-0 relative overflow-hidden",children:[e.jsx("div",{className:"absolute bottom-48 right-3 hidden w-full pointer-events-none z-0 min-[1250px]:block",children:e.jsx("div",{className:"container mx-auto px-4 md:px-6",children:e.jsx("div",{className:"relative h-64 w-64 ml-4",children:e.jsx("img",{src:q,alt:t("footer.honeyAlt"),className:"w-full h-full object-contain drop-shadow-lg rounded-2xl shadow-amber-200/30",loading:"lazy",decoding:"async"})})})}),e.jsxs("div",{className:"container mx-auto px-4 md:px-6",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 md:items-stretch min-[1250px]:grid-cols-4 min-[1250px]:items-start items-start",children:[e.jsxs("div",{className:"space-y-6 relative z-10 md:flex md:flex-col",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("img",{src:W,alt:t("footer.logoAlt"),loading:"lazy",decoding:"async",className:"h-16 w-16 object-contain"}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-serif text-xl font-bold tracking-wide text-foreground",children:["LONTARA ",e.jsx("span",{className:"text-honey-gold dark:text-honey-gold",children:"HONEY"})]}),e.jsxs("p",{className:"mt-1 text-sm font-medium text-foreground/90 dark:text-white italic font-serif leading-snug",children:[t("footer.tagline1"),e.jsx("br",{}),t("footer.tagline2")]})]})]}),e.jsx("div",{className:"block min-[1250px]:hidden relative z-0 ml-6 mr-auto md:mx-0 md:ml-0 -mt-1 md:-mt-2",children:e.jsx("div",{className:"h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72",children:e.jsx("img",{src:q,alt:t("footer.honeyAlt"),className:"w-full h-full object-contain drop-shadow-[0_12px_32px_hsl(35_100%_50%/0.25)]",loading:"lazy",decoding:"async"})})}),e.jsx("div",{className:"hidden md:block min-[1250px]:hidden ml-[76px]",children:e.jsx("div",{className:"flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80",children:n.map(o=>e.jsxs("a",{href:o.href,className:"group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:[e.jsx("span",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})}),e.jsx("span",{className:"whitespace-nowrap underline-offset-4 group-hover:underline",children:o.label})]},o.label))})}),e.jsx("div",{className:"hidden md:flex min-[1250px]:hidden items-center gap-4 ml-[76px] md:mt-auto md:pt-4",children:m.map(o=>e.jsx("a",{href:o.href,target:"_blank",rel:"noopener noreferrer","aria-label":o.label,className:"flex h-10 w-10 items-center justify-center border border-honey-gold/40 rounded-full bg-transparent text-honey-gold transition-all hover:bg-honey-gold/10 hover:border-honey-gold/60 dark:border-yellow-300/60 dark:text-yellow-300 dark:hover:bg-yellow-200/20 dark:hover:border-yellow-200/80",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})},o.label))})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 min-[1250px]:contents",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4 group",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.navigation")}),e.jsx("div",{className:"honey-underline mt-2"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{onClick:()=>a("home"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.home")}),e.jsx("li",{onClick:()=>a("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.products")}),e.jsx("li",{onClick:()=>a("about"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.about")}),e.jsx("li",{onClick:()=>a("story"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.story")}),e.jsx("li",{onClick:()=>a("international"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.international")}),e.jsx("li",{onClick:()=>a("contact"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.contact")})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4 group",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.quickLink")}),e.jsx("div",{className:"honey-underline mt-2"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{children:e.jsx("a",{href:`${f}/legal/faq`,target:"_blank",rel:"noopener noreferrer",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.faqs")})}),e.jsx("li",{onClick:()=>alert(t("footer.blog.comingSoon")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.blog")}),e.jsx("li",{onClick:()=>r(t("footer.wa.booking")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.booking")}),e.jsx("li",{children:e.jsx("a",{href:`${f}/legal/privacy`,target:"_blank",rel:"noopener noreferrer",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.privacy")})}),e.jsx("li",{children:e.jsx("a",{href:`${f}/legal/terms`,target:"_blank",rel:"noopener noreferrer",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.terms")})}),e.jsx("li",{children:e.jsx("a",{href:`${f}/legal/shipping`,target:"_blank",rel:"noopener noreferrer",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.shipping")})}),e.jsx("li",{children:e.jsx("a",{href:`${f}/legal/refund`,target:"_blank",rel:"noopener noreferrer",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.refund")})})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4 group",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.services")}),e.jsx("div",{className:"honey-underline mt-2"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{onClick:()=>a("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.premiumSupply")}),e.jsx("li",{onClick:()=>r(t("footer.wa.wholesale")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.wholesale")}),e.jsx("li",{onClick:()=>a("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.retail")}),e.jsx("li",{onClick:()=>a("contact"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.support")})]})]})]})]}),e.jsxs("div",{className:"mt-6 grid gap-6 md:hidden min-[1250px]:grid min-[1250px]:mt-12 min-[1250px]:grid-cols-4 min-[1250px]:items-center min-[1250px]:gap-8 min-[1250px]:pt-4",children:[e.jsx("div",{className:"flex justify-start min-[1250px]:col-span-2 min-[1250px]:col-start-2 min-[1250px]:justify-center",children:e.jsx("div",{className:"flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80 min-[1250px]:flex-row min-[1250px]:items-center min-[1250px]:gap-10",children:n.map(o=>e.jsxs("a",{href:o.href,className:"group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:[e.jsx("span",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})}),e.jsx("span",{className:"whitespace-nowrap underline-offset-4 group-hover:underline",children:o.label})]},o.label))})}),e.jsx("div",{className:"flex items-center gap-4 justify-start mt-2 min-[1250px]:mt-0 min-[1250px]:gap-3",children:m.map(o=>e.jsx("a",{href:o.href,target:"_blank",rel:"noopener noreferrer","aria-label":o.label,className:"flex h-10 w-10 items-center justify-center border border-honey-gold/40 rounded-full bg-transparent text-honey-gold transition-all hover:bg-honey-gold/10 hover:border-honey-gold/60 dark:border-yellow-300/60 dark:text-yellow-300 dark:hover:bg-yellow-200/20 dark:hover:border-yellow-200/80",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})},o.label))})]}),e.jsxs("div",{className:"mt-4 border-t border-honey-gold/30 pt-2 text-center md:mt-6 md:pt-4 dark:border-yellow-300/30",children:[e.jsx("p",{className:"text-xs md:text-sm text-muted-foreground dark:text-white/80",children:t("footer.copyright")}),e.jsxs("a",{href:"https://www.instagram.com/northmadd/",target:"_blank",rel:"noopener noreferrer","aria-label":t("footer.northmadAria"),className:"northmad-credit block transition-opacity duration-300 hover:opacity-80",children:[e.jsx("span",{className:"northmad-line","data-text":t("footer.websiteBy"),children:t("footer.websiteBy")}),e.jsx(U,{})]})]})]})]})]})};export{X as default};
