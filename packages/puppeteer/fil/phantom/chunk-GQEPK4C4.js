import{h as a,n as s}from"./chunk-3KENBVE7.js";a();s();var o={},i=()=>{let e=globalThis.chrome?.storage?.local,r=globalThis.window?.localStorage;return e||r},m=async()=>{if(typeof document>"u")return!1;let e=document.createElement("div");e.style.display="none",document.body.appendChild(e);let r=getComputedStyle(e).getPropertyValue("--arc-palette-title");return document.body.removeChild(e),await i().set({isArcBrowser:!!r}),!!r},c=async()=>(await i().get("isArcBrowser"))?.isArcBrowser,f=async()=>{let e=await navigator.userAgentData?.getHighEntropyValues(["platform","platformVersion","brands"]);if(!e)return;o={...await g(e.brands),platform:e.platform,platformVersion:e.platformVersion}},p=async e=>{if(e.includes("Chrome/"))e.includes("Edg/")?(o.name="Microsoft Edge",o.version=e.split("Edg/")[1].split(" ")[0]):e.includes("OPR/")?(o.name="Opera",o.version=e.split("OPR/")[1].split(" ")[0]):(navigator.brave?.isBrave()?o.name="Brave":o.name="Chrome",o.version=e.split("Chrome/")[1].split(" ")[0]);else if(e.includes("Firefox/"))o.name="Firefox",o.version=e.split("Firefox/")[1].split(" ")[0];else if(e.includes("Safari/")&&!e.includes("Chrome/"))o.name="Safari",o.version=e.split("Version/")[1].split(" ")[0];else{let r=/(?:Mozilla|Opera|AppleWebKit)\/[\d.]+\s+\(.*?\)\s+(?!Version)([^/]+)\/([^ ]+)/,n=e.match(r);n&&(o.name=n[1],o.version=n[2])}o.name?.match(/Chrome/)&&(o.name=await c()?"Arc":"Chrome")},d=e=>{let r=[{name:"Windows",pattern:/Windows NT ([0-9._]+)/},{name:"Mac OS",pattern:/Mac OS X ([0-9._]+)/},{name:"Linux",pattern:/Linux/},{name:"Chrome OS",pattern:/CrOS/}];for(let n of r){let t=e.match(n.pattern);t&&(o.platform=n.name,o.platformVersion=t[1])}o.platform||(o.platform="Unknown",o.platformVersion="Unknown")},w=async()=>{let e=navigator.userAgent;await p(e),d(e)},g=async e=>{if(!e||!e.length)return;let r;for(let n of e)if(!(n.brand.includes("Not")||n.brand.includes("Chromium"))){r={name:n.brand,version:n.version};break}if(!r?.name){let n=e.find(t=>t.brand==="Chromium");n?r={name:await c()?"Arc":"Chromium",version:n.version}:r={name:e[0].brand,version:e[0].version}}return r},u=async()=>{try{await m()}catch{}await f(),o?.name||await w()},h=()=>o;a();s();export{u as a,h as b};
//# sourceMappingURL=chunk-GQEPK4C4.js.map