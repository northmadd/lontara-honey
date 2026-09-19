import{c as t,u as p,j as e,m as n}from"./index-C73xk0Sa.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=t("Volume2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=t("VolumeX",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]),m="6282347905543",y=({isMuted:s,onToggleMute:o})=>{const{t:a}=p(),l=()=>{const i=a("whatsapp.message"),c=encodeURIComponent(i),r=`https://api.whatsapp.com/send?phone=${m}&text=${c}`;window.open(r,"_blank")};return e.jsxs("div",{className:"fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 flex flex-col items-center gap-3",children:[e.jsx(n.button,{type:"button",onClick:o,"aria-label":a(s?"whatsapp.unmute.aria":"whatsapp.mute.aria"),className:"w-14 h-14 rounded-full bg-card text-foreground border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors",initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.85,type:"spring",bounce:.5},whileHover:{scale:1.1},whileTap:{scale:.9},children:s?e.jsx(d,{className:"w-6 h-6"}):e.jsx(u,{className:"w-6 h-6"})}),e.jsxs(n.button,{type:"button",onClick:l,"aria-label":a("whatsapp.chat.aria"),className:"relative w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors",initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{delay:1,type:"spring",bounce:.5},whileHover:{scale:1.1},whileTap:{scale:.9},children:[e.jsx(h,{className:"w-7 h-7"}),e.jsx("span",{className:"absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"})]})]})};export{y as default};
