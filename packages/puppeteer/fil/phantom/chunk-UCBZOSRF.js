import{h as i,n}from"./chunk-3KENBVE7.js";i();n();i();n();i();n();i();n();var y={canSerialize:e=>typeof e=="number"&&Number.isNaN(e),serialize:e=>({["$NAN"]:1}),deserialize:e=>NaN},N={canSerialize:e=>e instanceof Date,serialize:e=>({["$DATE"]:e.valueOf()}),deserialize:e=>new Date(e["$DATE"])},z={canSerialize:e=>e instanceof Uint8Array,serialize:e=>({["$UINT8ARRAY"]:Array.from(e)}),deserialize:e=>Uint8Array.from(e["$UINT8ARRAY"])},A={canSerialize:e=>typeof e=="bigint",serialize:e=>({["$BIGINT"]:e.toString()}),deserialize:e=>BigInt(e["$BIGINT"])},R={canSerialize:e=>e instanceof URL,serialize:e=>({["$URL"]:e.href}),deserialize:e=>new URL(e["$URL"])},a={NAN:y,DATE:N,UINT8ARRAY:z,BIGINT:A,URL:R};var u=function(e){let r=this[e];for(let s of Object.values(a))if(s.canSerialize(r))return s.serialize(r);return r},f=(e,r)=>{if(r&&typeof r=="object"&&Object.keys(r)[0]){let s=Object.keys(r)[0].slice(1);if(s in a)return a[s].deserialize(r)}return r},o=e=>JSON.stringify(e,u),c=e=>JSON.parse(e,f);var m=async(e,r)=>c(await e.sendMessage(o(r))),g=e=>async(r,s)=>{let l=c(r),S=await e(l,s);return o(S)};i();n();export{o as a,c as b,m as c,g as d};
//# sourceMappingURL=chunk-UCBZOSRF.js.map
