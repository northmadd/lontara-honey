import{c as y,u as z,j as e,l as E,L as x,r as u}from"./index-BEu4pS5t.js";import{M}from"./map-pin-CJu3nttE.js";import{P as F,M as _}from"./phone-ZtDWqjoj.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=y("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=y("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=y("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]),D="/assets/honey-footer-BrnrYwdJ.webp",W="/assets/scene-F8nsAT0c.mp4",S="/assets/scene-CtjW0hyU.webm",B=()=>{const t=u.useRef(null),n=u.useRef(null);return u.useEffect(()=>{const r=t.current,a=n.current,c=a==null?void 0:a.getContext("2d",{willReadFrequently:!0});if(!r||!a||!c)return;let o=0,l=!1,h=!1,p=!1;const b=()=>{if(!r.videoWidth)return;const d=Math.min(1,300/r.videoWidth),s=Math.round(r.videoWidth*d),i=Math.round(r.videoHeight*d);(a.width!==s||a.height!==i)&&(a.width=s,a.height=i)},g=()=>{if(!(p||!r.videoWidth)){b(),c.drawImage(r,0,0,a.width,a.height);try{const d=c.getImageData(0,0,a.width,a.height),s=d.data;for(let i=0;i<s.length;i+=4){const C=s[i],L=s[i+1],I=s[i+2],A=.2126*C+.7152*L+.0722*I;s[i+3]=A<18?0:Math.min(255,A*1.4)}c.putImageData(d,0,0),a.style.opacity!=="1"&&(a.style.opacity="1")}catch{p=!0}}},v=()=>{o=0,g(),l&&h&&!p&&(o=requestAnimationFrame(v))},f=()=>{l&&h&&!p?o||(o=requestAnimationFrame(v)):o&&(cancelAnimationFrame(o),o=0)},k=()=>{l=!0,f()},j=()=>{l=!1,f()},m=typeof IntersectionObserver<"u"?new IntersectionObserver(d=>{d.forEach(s=>{h=s.isIntersecting,f()})},{rootMargin:"100px"}):null;m?m.observe(a):h=!0,a.style.opacity="0";const w=()=>{b(),g()};r.addEventListener("play",k),r.addEventListener("pause",j),r.addEventListener("loadeddata",g),r.addEventListener("loadedmetadata",w);const N=r.play();return N&&N.catch(()=>{}),()=>{o&&cancelAnimationFrame(o),m==null||m.disconnect(),r.removeEventListener("play",k),r.removeEventListener("pause",j),r.removeEventListener("loadeddata",g),r.removeEventListener("loadedmetadata",w)}},[]),e.jsxs("span",{className:"northmad-badge",children:[e.jsxs("video",{ref:t,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,className:"northmad-video select-none pointer-events-none","aria-label":"Northmad",tabIndex:-1,children:[e.jsx("source",{src:S,type:"video/webm"}),e.jsx("source",{src:W,type:"video/mp4"})]}),e.jsx("canvas",{ref:n,className:"northmad-video-canvas select-none pointer-events-none","aria-hidden":"true"})]})},T=()=>{const{t}=z(),n=o=>{const l=document.getElementById(o);l&&l.scrollIntoView({behavior:"smooth"})},r=o=>{const h=`https://wa.me/6282347905543?text=${encodeURIComponent(o)}`;window.open(h,"_blank")},a=[{icon:M,label:t("contact.address"),href:"https://www.google.com/maps/search/?api=1&query=South+Sulawesi+Indonesia"},{icon:F,label:"+62 823 4790 5543",href:"tel:+6282347905543"},{icon:_,label:"lontarajayanusantara@",href:"mailto:lontarajayanusantara@gmail.com"}],c=[{icon:P,href:"https://instagram.com/maduhutanlontara",label:t("footer.social.instagram")},{icon:q,href:"https://tiktok.com/@maduhutanlontara",label:t("footer.social.tiktok")},{icon:R,href:"https://youtube.com/@rajamadusulawesi7380",label:t("footer.social.youtube")}];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

        .northmad-video {
          display: block;
          width: 100%;
          height: auto;
          background: transparent !important;
          border: 0;
          outline: 0;
        }

        .northmad-video-canvas {
          display: none;
          background: transparent !important;
          border: 0;
          outline: 0;
        }

        html.dark .northmad-video {
          mix-blend-mode: screen;
          isolation: isolate;
        }

        html:not(.dark) .northmad-video {
          opacity: 0;
        }

        html:not(.dark) .northmad-video-canvas {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          transition: opacity 0.4s ease;
        }

      `}),e.jsxs("footer",{className:"bg-background text-foreground border-t border-border dark:from-[#1a120d] dark:bg-gradient-to-br dark:via-[#2a1c0f]/80 dark:to-[#3c2414]/60 dark:text-white pt-8 pb-0 md:pt-16 md:pb-0 relative overflow-hidden",children:[e.jsx("div",{className:"absolute bottom-48 right-3 hidden w-full pointer-events-none z-0 min-[1250px]:block",children:e.jsx("div",{className:"container mx-auto px-4 md:px-6",children:e.jsx("div",{className:"relative h-64 w-64 ml-4",children:e.jsx("img",{src:D,alt:t("footer.honeyAlt"),className:"w-full h-full object-contain drop-shadow-lg rounded-2xl shadow-amber-200/30",loading:"lazy",decoding:"async"})})})}),e.jsxs("div",{className:"container mx-auto px-4 md:px-6",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 md:items-stretch min-[1250px]:grid-cols-4 min-[1250px]:items-start items-start",children:[e.jsxs("div",{className:"space-y-6 relative z-10 md:flex md:flex-col",children:[e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("img",{src:E,alt:t("footer.logoAlt"),loading:"lazy",decoding:"async",className:"h-16 w-16 object-contain"}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-serif text-xl font-bold tracking-wide text-foreground",children:["LONTARA ",e.jsx("span",{className:"text-honey-gold dark:text-honey-gold",children:"HONEY"})]}),e.jsxs("p",{className:"mt-1 text-sm font-medium text-foreground/90 dark:text-white italic font-serif leading-snug",children:[t("footer.tagline1"),e.jsx("br",{}),t("footer.tagline2")]})]})]}),e.jsx("div",{className:"block min-[1250px]:hidden relative z-0 ml-6 mr-auto md:mx-0 md:ml-0 -mt-1 md:-mt-2",children:e.jsx("div",{className:"h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72",children:e.jsx("img",{src:D,alt:t("footer.honeyAlt"),className:"w-full h-full object-contain drop-shadow-[0_12px_32px_hsl(35_100%_50%/0.25)]",loading:"lazy",decoding:"async"})})}),e.jsx("div",{className:"hidden md:block min-[1250px]:hidden ml-[76px]",children:e.jsx("div",{className:"flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80",children:a.map(o=>e.jsxs("a",{href:o.href,className:"group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:[e.jsx("span",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})}),e.jsx("span",{className:"whitespace-nowrap underline-offset-4 group-hover:underline",children:o.label})]},o.label))})}),e.jsx("div",{className:"hidden md:flex min-[1250px]:hidden items-center gap-4 ml-[76px] md:mt-auto md:pt-4",children:c.map(o=>e.jsx("a",{href:o.href,target:"_blank",rel:"noopener noreferrer","aria-label":o.label,className:"flex h-10 w-10 items-center justify-center border border-honey-gold/40 rounded-full bg-transparent text-honey-gold transition-all hover:bg-honey-gold/10 hover:border-honey-gold/60 dark:border-yellow-300/60 dark:text-yellow-300 dark:hover:bg-yellow-200/20 dark:hover:border-yellow-200/80",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})},o.label))})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-6 min-[1250px]:contents",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.navigation")}),e.jsx("div",{className:"mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{onClick:()=>n("home"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.home")}),e.jsx("li",{onClick:()=>n("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.products")}),e.jsx("li",{onClick:()=>n("about"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.about")}),e.jsx("li",{onClick:()=>n("story"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.story")}),e.jsx("li",{onClick:()=>n("international"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.international")}),e.jsx("li",{onClick:()=>n("contact"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("nav.contact")})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.quickLink")}),e.jsx("div",{className:"mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{children:e.jsx(x,{to:"/legal/faq",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.faqs")})}),e.jsx("li",{onClick:()=>alert(t("footer.blog.comingSoon")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.blog")}),e.jsx("li",{onClick:()=>r(t("footer.wa.booking")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.booking")}),e.jsx("li",{children:e.jsx(x,{to:"/legal/privacy",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.privacy")})}),e.jsx("li",{children:e.jsx(x,{to:"/legal/terms",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.terms")})}),e.jsx("li",{children:e.jsx(x,{to:"/legal/shipping",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.shipping")})}),e.jsx("li",{children:e.jsx(x,{to:"/legal/refund",className:"transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.refund")})})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:"text-xs font-semibold tracking-[0.3em] uppercase text-honey-gold dark:text-honey-gold",children:t("footer.services")}),e.jsx("div",{className:"mt-2 h-0.5 w-12 bg-honey-gold/60 dark:bg-honey-gold/50"})]}),e.jsxs("ul",{className:"space-y-2 text-sm md:text-[0.85rem] text-foreground",children:[e.jsx("li",{onClick:()=>n("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.premiumSupply")}),e.jsx("li",{onClick:()=>r(t("footer.wa.wholesale")),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.wholesale")}),e.jsx("li",{onClick:()=>n("products"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.retail")}),e.jsx("li",{onClick:()=>n("contact"),className:"cursor-pointer transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:t("footer.support")})]})]})]})]}),e.jsxs("div",{className:"mt-6 grid gap-6 md:hidden min-[1250px]:grid min-[1250px]:mt-12 min-[1250px]:grid-cols-4 min-[1250px]:items-center min-[1250px]:gap-8 min-[1250px]:pt-4",children:[e.jsx("div",{className:"flex justify-start min-[1250px]:col-span-2 min-[1250px]:col-start-2 min-[1250px]:justify-center",children:e.jsx("div",{className:"flex flex-col gap-4 text-sm text-muted-foreground dark:text-white/80 min-[1250px]:flex-row min-[1250px]:items-center min-[1250px]:gap-10",children:a.map(o=>e.jsxs("a",{href:o.href,className:"group flex items-center gap-2 transition-colors hover:text-honey-gold dark:hover:text-[#D4A347]",children:[e.jsx("span",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-honey-gold/10 text-honey-amber dark:bg-yellow-300/15 dark:text-yellow-300/85 dark:border dark:border-yellow-300/50",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})}),e.jsx("span",{className:"whitespace-nowrap underline-offset-4 group-hover:underline",children:o.label})]},o.label))})}),e.jsx("div",{className:"flex items-center gap-4 justify-start mt-2 min-[1250px]:mt-0 min-[1250px]:gap-3",children:c.map(o=>e.jsx("a",{href:o.href,target:"_blank",rel:"noopener noreferrer","aria-label":o.label,className:"flex h-10 w-10 items-center justify-center border border-honey-gold/40 rounded-full bg-transparent text-honey-gold transition-all hover:bg-honey-gold/10 hover:border-honey-gold/60 dark:border-yellow-300/60 dark:text-yellow-300 dark:hover:bg-yellow-200/20 dark:hover:border-yellow-200/80",children:e.jsx(o.icon,{className:"h-3.5 w-3.5"})},o.label))})]}),e.jsxs("div",{className:"mt-4 border-t border-honey-gold/30 pt-2 text-center md:mt-6 md:pt-4 dark:border-yellow-300/30",children:[e.jsx("p",{className:"text-xs md:text-sm text-muted-foreground dark:text-white/80",children:t("footer.copyright")}),e.jsxs("a",{href:"https://www.instagram.com/northmadd/",target:"_blank",rel:"noopener noreferrer","aria-label":t("footer.northmadAria"),className:"northmad-credit block transition-opacity duration-300 hover:opacity-80",children:[e.jsx("span",{className:"northmad-line","data-text":t("footer.websiteBy"),children:t("footer.websiteBy")}),e.jsx(B,{})]})]})]})]})]})};export{T as default};
