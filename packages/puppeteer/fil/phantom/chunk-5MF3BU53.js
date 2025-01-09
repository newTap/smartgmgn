import{jb as Ie,o as we,p as K}from"./chunk-SD2LXVLD.js";import{w as xe}from"./chunk-LURFXJDV.js";import{a as P,b as M,c as Ce}from"./chunk-MHOQBMVI.js";import{a as Je}from"./chunk-BTKBODVJ.js";import{D as Se,E as L}from"./chunk-SLQBAOEK.js";import{Pa as q,Q as k,_c as de,ad as T,dd as fe,ed as le,fd as me,gd as ge,hd as he,jd as ye,nd as Re,tb as ce,ua as ue,wc as pe}from"./chunk-MZZEJ42N.js";import{K as ne}from"./chunk-E3NPIRHS.js";import{Z as ae,v}from"./chunk-ALUTR72U.js";import{Oa as se,Pa as oe,Ra as ie,ta as w}from"./chunk-L3A2KHJO.js";import{c as b,d as Ge,f as D,h as c,m as Buffer,n as p}from"./chunk-3KENBVE7.js";var De=b(C=>{"use strict";c();p();Object.defineProperty(C,"__esModule",{value:!0});C.TokenData=void 0;C.parse=z;C.compile=mt;C.match=ht;C.pathToRegexp=be;C.stringify=xt;var _="/",j=e=>e,Te=/^[$_\p{ID_Start}]$/u,F=/^[$\u200c\u200d\p{ID_Continue}]$/u,U="https://git.new/pathToRegexpError",dt={"{":"{","}":"}","(":"(",")":")","[":"[","]":"]","+":"+","?":"?","!":"!"};function ft(e){return e.replace(/[{}()\[\]+?!:*]/g,"\\$&")}function x(e){return e.replace(/[.+*?^${}()[\]|/\\]/g,"\\$&")}function*lt(e){let t=[...e],r=0;function n(){let s="";if(Te.test(t[++r]))for(s+=t[r];F.test(t[++r]);)s+=t[r];else if(t[r]==='"'){let o=r;for(;r<t.length;){if(t[++r]==='"'){r++,o=0;break}t[r]==="\\"?s+=t[++r]:s+=t[r]}if(o)throw new TypeError(`Unterminated quote at ${o}: ${U}`)}if(!s)throw new TypeError(`Missing parameter name at ${r}: ${U}`);return s}for(;r<t.length;){let s=t[r],o=dt[s];if(o)yield{type:o,index:r++,value:s};else if(s==="\\")yield{type:"ESCAPED",index:r++,value:t[r++]};else if(s===":"){let i=n();yield{type:"PARAM",index:r,value:i}}else if(s==="*"){let i=n();yield{type:"WILDCARD",index:r,value:i}}else yield{type:"CHAR",index:r,value:t[r++]}}return{type:"END",index:r,value:""}}var W=class{constructor(t){this.tokens=t}peek(){if(!this._peek){let t=this.tokens.next();this._peek=t.value}return this._peek}tryConsume(t){let r=this.peek();if(r.type===t)return this._peek=void 0,r.value}consume(t){let r=this.tryConsume(t);if(r!==void 0)return r;let{type:n,index:s}=this.peek();throw new TypeError(`Unexpected ${n} at ${s}, expected ${t}: ${U}`)}text(){let t="",r;for(;r=this.tryConsume("CHAR")||this.tryConsume("ESCAPED");)t+=r;return t}},A=class{constructor(t){this.tokens=t}};C.TokenData=A;function z(e,t={}){let{encodePath:r=j}=t,n=new W(lt(e));function s(i){let u=[];for(;;){let f=n.text();f&&u.push({type:"text",value:r(f)});let m=n.tryConsume("PARAM");if(m){u.push({type:"param",name:m});continue}let g=n.tryConsume("WILDCARD");if(g){u.push({type:"wildcard",name:g});continue}if(n.tryConsume("{")){u.push({type:"group",tokens:s("}")});continue}return n.consume(i),u}}let o=s("END");return new A(o)}function mt(e,t={}){let{encode:r=encodeURIComponent,delimiter:n=_}=t,s=e instanceof A?e:z(e,t),o=Ee(s.tokens,n,r);return function(u={}){let[f,...m]=o(u);if(m.length)throw new TypeError(`Missing parameters: ${m.join(", ")}`);return f}}function Ee(e,t,r){let n=e.map(s=>gt(s,t,r));return s=>{let o=[""];for(let i of n){let[u,...f]=i(s);o[0]+=u,o.push(...f)}return o}}function gt(e,t,r){if(e.type==="text")return()=>[e.value];if(e.type==="group"){let s=Ee(e.tokens,t,r);return o=>{let[i,...u]=s(o);return u.length?[""]:[i]}}let n=r||j;return e.type==="wildcard"&&r!==!1?s=>{let o=s[e.name];if(o==null)return["",e.name];if(!Array.isArray(o)||o.length===0)throw new TypeError(`Expected "${e.name}" to be a non-empty array`);return[o.map((i,u)=>{if(typeof i!="string")throw new TypeError(`Expected "${e.name}/${u}" to be a string`);return n(i)}).join(t)]}:s=>{let o=s[e.name];if(o==null)return["",e.name];if(typeof o!="string")throw new TypeError(`Expected "${e.name}" to be a string`);return[n(o)]}}function ht(e,t={}){let{decode:r=decodeURIComponent,delimiter:n=_}=t,{regexp:s,keys:o}=be(e,t),i=o.map(u=>r===!1?j:u.type==="param"?r:f=>f.split(n).map(r));return function(f){let m=s.exec(f);if(!m)return!1;let g=m[0],h=Object.create(null);for(let y=1;y<m.length;y++){if(m[y]===void 0)continue;let R=o[y-1],V=i[y-1];h[R.name]=V(m[y])}return{path:g,params:h}}}function be(e,t={}){let{delimiter:r=_,end:n=!0,sensitive:s=!1,trailing:o=!0}=t,i=[],u=[],f=s?"":"i",g=(Array.isArray(e)?e:[e]).map(R=>R instanceof A?R:z(R,t));for(let{tokens:R}of g)for(let V of N(R,0,[])){let ze=yt(V,r,i);u.push(ze)}let h=`^(?:${u.join("|")})`;return o&&(h+=`(?:${x(r)}$)?`),h+=n?"$":`(?=${x(r)}|$)`,{regexp:new RegExp(h,f),keys:i}}function*N(e,t,r){if(t===e.length)return yield r;let n=e[t];if(n.type==="group"){let s=r.slice();for(let o of N(n.tokens,0,s))yield*N(e,t+1,o)}else r.push(n);yield*N(e,t+1,r)}function yt(e,t,r){let n="",s="",o=!0;for(let i=0;i<e.length;i++){let u=e[i];if(u.type==="text"){n+=x(u.value),s+=u.value,o||(o=u.value.includes(t));continue}if(u.type==="param"||u.type==="wildcard"){if(!o&&!s)throw new TypeError(`Missing text after "${u.name}": ${U}`);u.type==="param"?n+=`(${Rt(t,o?"":s)}+)`:n+="([\\s\\S]+)",r.push(u),s="",o=!1;continue}}return n}function Rt(e,t){return t.length<2?e.length<2?`[^${x(e+t)}]`:`(?:(?!${x(e)})[^${x(t)}])`:e.length<2?`(?:(?!${x(t)})[^${x(e)}])`:`(?:(?!${x(t)}|${x(e)})[\\s\\S])`}function xt(e){return e.tokens.map(function t(r,n,s){if(r.type==="text")return ft(r.value);if(r.type==="group")return`{${r.tokens.map(t).join("")}}`;let i=St(r.name)&&wt(s[n+1])?r.name:JSON.stringify(r.name);if(r.type==="param")return`:${i}`;if(r.type==="wildcard")return`*${i}`;throw new TypeError(`Unexpected token: ${r}`)}).join("")}function St(e){let[t,...r]=e;return Te.test(t)?r.every(n=>F.test(n)):!1}function wt(e){return e?.type!=="text"?!0:!F.test(e.value[0])}});var $=b(d=>{"use strict";c();p();Object.defineProperty(d,"__esModule",{value:!0});d.isHexString=d.getKeys=d.fromAscii=d.fromUtf8=d.toAscii=d.arrayContainsArray=d.getBinarySize=d.padToEven=d.stripHexPrefix=d.isHexPrefixed=void 0;function Ue(e){if(typeof e!="string")throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof e}`);return e[0]==="0"&&e[1]==="x"}d.isHexPrefixed=Ue;var Mt=e=>{if(typeof e!="string")throw new Error(`[stripHexPrefix] input must be type 'string', received ${typeof e}`);return Ue(e)?e.slice(2):e};d.stripHexPrefix=Mt;function Be(e){let t=e;if(typeof t!="string")throw new Error(`[padToEven] value must be type 'string', received ${typeof t}`);return t.length%2&&(t=`0${t}`),t}d.padToEven=Be;function Nt(e){if(typeof e!="string")throw new Error(`[getBinarySize] method requires input type 'string', received ${typeof e}`);return Buffer.byteLength(e,"utf8")}d.getBinarySize=Nt;function Ut(e,t,r){if(Array.isArray(e)!==!0)throw new Error(`[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof e}'`);if(Array.isArray(t)!==!0)throw new Error(`[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof t}'`);return t[r===!0?"some":"every"](n=>e.indexOf(n)>=0)}d.arrayContainsArray=Ut;function Bt(e){let t="",r=0,n=e.length;for(e.substring(0,2)==="0x"&&(r=2);r<n;r+=2){let s=parseInt(e.substr(r,2),16);t+=String.fromCharCode(s)}return t}d.toAscii=Bt;function $t(e){let t=Buffer.from(e,"utf8");return`0x${Be(t.toString("hex")).replace(/^0+|0+$/g,"")}`}d.fromUtf8=$t;function Ot(e){let t="";for(let r=0;r<e.length;r++){let s=e.charCodeAt(r).toString(16);t+=s.length<2?`0${s}`:s}return`0x${t}`}d.fromAscii=Ot;function Ht(e,t,r){if(!Array.isArray(e))throw new Error(`[getKeys] method expects input 'params' to be an array, got ${typeof e}`);if(typeof t!="string")throw new Error(`[getKeys] method expects input 'key' to be type 'string', got ${typeof e}`);let n=[];for(let s=0;s<e.length;s++){let o=e[s][t];if(r===!0&&!o)o="";else if(typeof o!="string")throw new Error(`invalid abi - expected type 'string', received ${typeof o}`);n.push(o)}return n}d.getKeys=Ht;function Vt(e,t){return!(typeof e!="string"||!e.match(/^0x[0-9A-Fa-f]*$/)||typeof t<"u"&&t>0&&e.length!==2+2*t)}d.isHexString=Vt});var $e=b(S=>{"use strict";c();p();Object.defineProperty(S,"__esModule",{value:!0});S.assertIsString=S.assertIsArray=S.assertIsBuffer=S.assertIsHexString=void 0;var Lt=$(),Kt=function(e){if(!(0,Lt.isHexString)(e)){let t=`This method only supports 0x-prefixed hex strings but input was: ${e}`;throw new Error(t)}};S.assertIsHexString=Kt;var Wt=function(e){if(!Buffer.isBuffer(e)){let t=`This method only supports Buffer but input was: ${e}`;throw new Error(t)}};S.assertIsBuffer=Wt;var _t=function(e){if(!Array.isArray(e)){let t=`This method only supports number arrays but input was: ${e}`;throw new Error(t)}};S.assertIsArray=_t;var jt=function(e){if(typeof e!="string"){let t=`This method only supports strings but input was: ${e}`;throw new Error(t)}};S.assertIsString=jt});var Le=b(a=>{"use strict";c();p();Object.defineProperty(a,"__esModule",{value:!0});a.intToUnpaddedBuffer=a.bigIntToUnpaddedBuffer=a.bigIntToHex=a.bufArrToArr=a.arrToBufArr=a.validateNoLeadingZeroes=a.baToJSON=a.toUtf8=a.short=a.addHexPrefix=a.toUnsigned=a.fromSigned=a.bufferToInt=a.bigIntToBuffer=a.bufferToBigInt=a.bufferToHex=a.toBuffer=a.unpadHexString=a.unpadArray=a.unpadBuffer=a.setLengthRight=a.setLengthLeft=a.zeros=a.intToBuffer=a.intToHex=void 0;var E=$e(),I=$(),Ft=function(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`Received an invalid integer type: ${e}`);return`0x${e.toString(16)}`};a.intToHex=Ft;var zt=function(e){let t=(0,a.intToHex)(e);return Buffer.from((0,I.padToEven)(t.slice(2)),"hex")};a.intToBuffer=zt;var Gt=function(e){return Buffer.allocUnsafe(e).fill(0)};a.zeros=Gt;var Oe=function(e,t,r){let n=(0,a.zeros)(t);return r?e.length<t?(e.copy(n),n):e.slice(0,t):e.length<t?(e.copy(n,t-e.length),n):e.slice(-t)},Jt=function(e,t){return(0,E.assertIsBuffer)(e),Oe(e,t,!1)};a.setLengthLeft=Jt;var Xt=function(e,t){return(0,E.assertIsBuffer)(e),Oe(e,t,!0)};a.setLengthRight=Xt;var J=function(e){let t=e[0];for(;e.length>0&&t.toString()==="0";)e=e.slice(1),t=e[0];return e},Yt=function(e){return(0,E.assertIsBuffer)(e),J(e)};a.unpadBuffer=Yt;var Zt=function(e){return(0,E.assertIsArray)(e),J(e)};a.unpadArray=Zt;var Qt=function(e){return(0,E.assertIsHexString)(e),e=(0,I.stripHexPrefix)(e),"0x"+J(e)};a.unpadHexString=Qt;var er=function(e){if(e==null)return Buffer.allocUnsafe(0);if(Buffer.isBuffer(e))return Buffer.from(e);if(Array.isArray(e)||e instanceof Uint8Array)return Buffer.from(e);if(typeof e=="string"){if(!(0,I.isHexString)(e))throw new Error(`Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`);return Buffer.from((0,I.padToEven)((0,I.stripHexPrefix)(e)),"hex")}if(typeof e=="number")return(0,a.intToBuffer)(e);if(typeof e=="bigint"){if(e<BigInt(0))throw new Error(`Cannot convert negative bigint to buffer. Given: ${e}`);let t=e.toString(16);return t.length%2&&(t="0"+t),Buffer.from(t,"hex")}if(e.toArray)return Buffer.from(e.toArray());if(e.toBuffer)return Buffer.from(e.toBuffer());throw new Error("invalid type")};a.toBuffer=er;var tr=function(e){return e=(0,a.toBuffer)(e),"0x"+e.toString("hex")};a.bufferToHex=tr;function X(e){let t=(0,a.bufferToHex)(e);return BigInt(t==="0x"?0:t)}a.bufferToBigInt=X;function Y(e){return(0,a.toBuffer)("0x"+e.toString(16))}a.bigIntToBuffer=Y;var rr=function(e){let t=Number(X(e));if(!Number.isSafeInteger(t))throw new Error("Number exceeds 53 bits");return t};a.bufferToInt=rr;var nr=function(e){return BigInt.asIntN(256,X(e))};a.fromSigned=nr;var sr=function(e){return Y(BigInt.asUintN(256,e))};a.toUnsigned=sr;var or=function(e){return typeof e!="string"||(0,I.isHexPrefixed)(e)?e:"0x"+e};a.addHexPrefix=or;function ir(e,t=50){let r=Buffer.isBuffer(e)?e.toString("hex"):e;return r.length<=t?r:r.slice(0,t)+"\u2026"}a.short=ir;var ar=function(e){let t=/^(00)+|(00)+$/g;if(e=(0,I.stripHexPrefix)(e),e.length%2!==0)throw new Error("Invalid non-even hex string input for toUtf8() provided");return Buffer.from(e.replace(t,""),"hex").toString("utf8")};a.toUtf8=ar;var ur=function(e){if(Buffer.isBuffer(e))return`0x${e.toString("hex")}`;if(e instanceof Array){let t=[];for(let r=0;r<e.length;r++)t.push((0,a.baToJSON)(e[r]));return t}};a.baToJSON=ur;var cr=function(e){for(let[t,r]of Object.entries(e))if(r!==void 0&&r.length>0&&r[0]===0)throw new Error(`${t} cannot have leading zeroes, received: ${r.toString("hex")}`)};a.validateNoLeadingZeroes=cr;function He(e){return Array.isArray(e)?e.map(t=>He(t)):Buffer.from(e)}a.arrToBufArr=He;function Ve(e){return Array.isArray(e)?e.map(t=>Ve(t)):Uint8Array.from(e??[])}a.bufArrToArr=Ve;var pr=e=>"0x"+e.toString(16);a.bigIntToHex=pr;function dr(e){return(0,a.unpadBuffer)(Y(e))}a.bigIntToUnpaddedBuffer=dr;function fr(e){return(0,a.unpadBuffer)((0,a.intToBuffer)(e))}a.intToUnpaddedBuffer=fr});var Ae={};Ge(Ae,{any:()=>Qe,cancelled:()=>pt,chainDisconnected:()=>et,error:()=>Ze,internalError:()=>rt,invalidInput:()=>tt,methodNotFound:()=>nt,rateLimited:()=>ut,resourceUnavailable:()=>st,result:()=>Ye,transactionRejected:()=>ot,unauthorized:()=>it,unsupportedMethod:()=>at,userRejectedRequest:()=>ct});c();p();var Ye=(e,t)=>({jsonrpc:"2.0",id:e,result:t}),Ze=(e,t)=>({jsonrpc:"2.0",id:e,error:t}),Qe=(e,t)=>({...t,jsonrpc:"2.0",id:e}),et=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:4901,message:t??"The Provider is not connected to the requested chain."}}),tt=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32e3,message:t??"Missing or invalid parameters."}}),rt=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32603,message:t??"Something went wrong."}}),nt=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32601,message:t??"Method does not exist."}}),st=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32002,message:t??"Requested resource not available."}}),ot=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32003,message:t??"Transaction creation failed."}}),it=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:4100,message:t??"The requested method and/or account has not been authorized by the user."}}),at=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:4200,message:t??"The requested method is not supported."}}),ut=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:4290,message:t??"The requested method has been rate limited."}}),ct=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:4001,message:t??"User rejected the request."}}),pt=(e,t)=>({id:e,jsonrpc:"2.0",error:{code:-32800,message:t??"The request was cancelled."}});c();p();c();p();var ke=D(De());function Ct(e,t){return{request:e,source:t,id:ne()}}function It(){return{parse(e){return At(e)}}}function At(e){function t(r,n,s){return async i=>{if(e.path&&i.source?.type==="DeepLinkRpcRequestSource"){let g=new URL(i.source.deepLinkUrl),h=g.host+g.pathname,R=(0,ke.match)(e.path)(h);R&&i.request.params&&typeof i.request.params=="object"&&(i.request.params={...i.request.params,...R.params})}let u={...i,request:e.request.parse(i.request)},f=[];for(let g of n){let h=await g(u,r);if(h){if(typeof h!="function")return setTimeout(()=>{for(let y of f)y(h)},0),h;f.push(h)}}let m=e.response.parse(await s(u,r));if(m.id!==i.request.id){let g="Request id does not match response id";throw console.error(g,{request:i.request,response:m}),new Error(g)}return setTimeout(()=>{for(let g of f)g(m)},0),m}}return{context(r){return{use:(n,s)=>t(r,n,s)}},use:(r,n)=>t(void 0,r,n)}}c();p();var G=class{#e;constructor(t){this.#e=t}init(t,r){let n=new AbortController,{signal:s}=n,o=Tt(this.#e.routes,this.#e.concurrent);return{start:async()=>{if(s.aborted){console.warn("stream already closed");return}try{await t.pipeThrough(o,{signal:s}).pipeTo(r,{signal:s})}catch(i){s.aborted||console.error("RPC router stream error",i)}},stop:i=>{n.abort(i)}}}};function Tt(e,t){return new TransformStream({async transform(r,n){let s=async()=>{let o=e[r.request.method];if(!o){let i={jsonrpc:"2.0",id:r.request.id,error:{code:0,message:`${r.request.method} isn't implemented`}};return n.enqueue([r,i])}try{let i=await o(r);return n.enqueue([r,i])}catch(i){console.error("RPC ROUTER: Unexpected error",i);let u={jsonrpc:"2.0",id:r.request.id,error:{code:-32603,message:"Unexpected error"}};return n.enqueue([r,u])}};t?s():await s()}})}c();p();c();p();var ve=e=>{let t=new P,r=new ie({storage:t,getPassword:e}),n=oe.fromStorage(t,r),s=new ue,o=new he({keyPair:{solana:me(),eip155:fe(),bip122_p2tr:T(),bip122_p2wpkh:T(),bip122_p2sh:T(),bip122_p2pkh:T(),bip44_ed25519:ge(),JWT:le()},ledger:xe(),seedVault:{type:"seedVault",async sign(){return de("unsupportedOperation")}}}),i=()=>ce(t),u={generalStorage:t,secretsStorage:n,secureCache:ye({isEnabled:()=>!M("kill-vault-secure-cache"),generalStorage:t,secretsStorage:n}),fetchChainAvailability:i,keypairGenerator:s,vaultSigner:o};return{vault:Re(u),getChainAvailability:i,encryptedStorage:n,storageEncryptionKeyManager:r}};c();p();var Et=/^\.phantom-labs\.vault\.seed\.[0-9A-Fa-f]+$/,bt=/^\.phantom-labs\.vault\.privateKey\.[0-9A-Fa-f]+$/;async function Pe(e){let t;try{if(t=await e.storageEncryptionKeyManager.hasPersistedDeviceEncryptionKey(),!t)return{status:"noMiddleEncryptionKey"}}catch{return{status:"errorRetrievingMiddleEncryptionKey"}}let r;try{r=(await e.vault.checkVaultIntegrity()).status}catch{return{status:"errorUnableToCheckVaultIntegrity"}}try{let n=await e.generalStorage.getAll(),[s,o]=await qe(e,n,Et),[i,u]=await qe(e,n,bt);return{status:"hasMiddleEncryptionKey",vaultStatus:r,numberOfEncryptedSeeds:s,numberOfDecryptableSeeds:o,numberOfEncryptedPrivateKeys:i,numberOfDecryptablePrivateKeys:u}}catch{return{status:"errorUnableToCountDecryptableValues",vaultStatus:r}}}async function qe(e,t,r){let n=0,s=0;for(let[o,i]of Object.entries(t))if(!(!o.match(r)||!se.safeParse(i).success)){n++;try{await e.secretsStorage.getSecureValue(o),s++}catch{}}return[n,s]}var dn="HAS_ONBOARDING_BEEN_OPENED",fn="EXTENSION_LOCKED",B=null,ln=()=>B,vt=e=>{B=e},mn=()=>{B=null},qt=()=>B??null,{vault:Me,getChainAvailability:gn,encryptedStorage:Pt,storageEncryptionKeyManager:Ne}=ve(qt),hn=async e=>!e||!await w.startSpan({name:"storageEncryptionKeyManager.verifyPassword"},()=>Ne.verifyPassword(e))?!1:(vt(e),!0),yn=async()=>{let e=await Me.deriveAddresses();return e&&(w.addBreadcrumb("account","\u2705 Derived new addresses in Vault","info"),await Ie.invalidateQueries({refetchType:"all"})),e},Rn=async()=>{if(!M("kill-extension-storage-integrity-check"))try{let e=await Pe({generalStorage:new P,secretsStorage:Pt,storageEncryptionKeyManager:Ne,vault:Me});Ce.capture("extensionStorageIntegrityCheck",{data:{extensionStorageIntegrityCheck:e}})}catch{}};c();p();var Z=D(Le()),Ke=D($()),lr=/^[0-9A-Fa-f]+$/gu;function We(e){try{let t=(0,Ke.stripHexPrefix)(e);if(t.match(lr))return mr(t)}catch{return(0,Z.bufferToHex)(Buffer.from(e,"utf8"))}return(0,Z.bufferToHex)(Buffer.from(e,"utf8"))}var mr=e=>typeof e!="string"||e.match(/^-?0x/u)?e:e.match(/^-?0X/u)?e.replace("0X","0x"):e.startsWith("-")?e.replace("-","-0x"):`0x${e}`,gr=e=>{let t=Buffer.from(e.substring(2),"hex"),r=t.length===32?"hex":"utf8",n;switch(r){case"hex":n=We(e);break;case"utf8":default:n=t.toString("utf8")}return n};c();p();c();p();var Q=D(Je()),On=async e=>{let t=await Q.default.tabs.get(e);if(!t?.url?.startsWith("http"))return{iconUrl:void 0,title:void 0};let r=await hr(e);return{iconUrl:r?.iconUrl??t?.favIconUrl,title:r?.title??t?.title}},hr=async e=>{try{let r=(await Q.default.scripting.executeScript({target:{tabId:e},func:()=>{let o={},i=document.querySelectorAll("head link[rel^=apple-touch-icon]");i&&(o.iconTuples=Array.from(i).map(f=>[f.href,f.sizes?.[0]??"0x0"]));let u=document.querySelector("meta[property='og:title']");return u&&(o.title=u.content),o}}))[0].result;if(!r)return{iconUrl:void 0,title:void 0};let n,s=0;for(let[o,i]of r.iconTuples??[]){if(n||(n=o),!i)continue;parseInt(i.split("x")[0]??0)>s&&(n=o)}return{title:r.title,iconUrl:n}}catch(t){return console.error("Failed to get tab meta",t),{iconUrl:void 0,title:void 0}}};c();p();var Rr={UNSUPPORTED_DAPP:"autoConfirmReasonDappNotWhitelisted",DISABLED:"autoConfirmReasonSessionNotActive",RATE_LIMIT_EXCEEDED:"autoConfirmReasonRateLimited",SIMULATION_FAILED:"autoConfirmReasonSimulationFailed",UNSUPPORTED_NETWORK_ID:"autoConfirmReasonUnsupportedNetwork",TAB_NOT_FOCUSED:"autoConfirmReasonTabNotFocused",WALLET_LOCKED:"autoConfirmReasonNotUnlocked"},xr=e=>e?Rr[e]:void 0;c();p();c();p();c();p();var ee=e=>`/auto-confirm/v1/${e}`;async function te(e){return q.isEVMNetworkID(e.chainId)?(await k.api().post(ee("transaction"),{txObjects:e.txObjects,chainId:e.chainId,domain:e.domain})).data?.isEligible===!0:q.isSolanaNetworkID(e.chainId)?(await k.api().post(ee("transaction"),{transactions:e.transactions,chainId:e.chainId,domain:e.domain})).data?.isEligible===!0:!1}async function _e(e){if(q.isEVMNetworkID(e.chainId)){let t=JSON.parse(JSON.stringify(e.data));return delete t.message,delete t.primaryType,delete t.types,(await(await k.api().post(ee("message"),{chainId:e.chainId,domain:e.domain,data:[t]})).data)?.isEligible===!0}return!1}var Sr=10,O=[],re=class{constructor(t){this.storage=t;this.executedChecksAudit=[]}async isEthTransactionAutoConfirmable(t,r){this.executedChecksAudit=[];let n=await this.didPassGenericChecks(t);if(n.status!=="OK")return n;if(!(await this.isDappWhitelistOverridden()||await te({chainId:t.networkID,domain:v(t.url.origin),txObjects:t.data})))return{...n,status:"UNSUPPORTED_DAPP",auditTrail:this.executedChecksAudit};let{success:o,...i}=await this.didPassEthTransactionSimulation(t,r);return o?{...n,...i,status:"OK",auditTrail:this.executedChecksAudit}:{...n,...i,status:"SIMULATION_FAILED",auditTrail:this.executedChecksAudit}}async isEthMessageAutoConfirmable(t,r){this.executedChecksAudit=[];let n=await this.didPassGenericChecks(t);return n.status!=="OK"?n:await this.isDappWhitelistOverridden()||await _e({chainId:t.networkID,domain:v(t.url.origin),data:t.data})?await this.didPassEthMessageSimulation(t,r)?{...n,status:"OK",auditTrail:this.executedChecksAudit}:{...n,status:"SIMULATION_FAILED",auditTrail:this.executedChecksAudit}:{...n,status:"UNSUPPORTED_DAPP",auditTrail:this.executedChecksAudit}}async isSolTransactionAutoConfirmable(t,r){this.executedChecksAudit=[];let n=await this.didPassGenericChecks(t);if(n.status!=="OK")return n;if(!(await this.isDappWhitelistOverridden()||await te({chainId:t.networkID,domain:v(t.url.origin),transactions:t.data})))return{...n,status:"UNSUPPORTED_DAPP",auditTrail:this.executedChecksAudit};let{success:o,...i}=await this.didPassSolTransactionSimulation(t,r);return o?{...n,...i,status:"OK",auditTrail:this.executedChecksAudit}:{...n,...i,status:"SIMULATION_FAILED",auditTrail:this.executedChecksAudit}}isSolMessageAutoConfirmable(t){return this.executedChecksAudit=[],Promise.resolve({status:"UNIMPLEMENTED"})}async didPassGenericChecks(t){try{if(!await this.isFeatureEnabled())return{status:"FEATURE_KILLED"};if(!await this.isWalletUnlocked())return{status:"WALLET_LOCKED"};if(!await this.isTabFocused(t.url.origin))return{status:"TAB_NOT_FOCUSED"};if(!await this.isAutoConfirmEnabledInUserSettings({origin:t.url.origin,networkID:t.networkID,accountIdentifier:t.accountIdentifier}))return{status:"DISABLED"};let r=await this.isAutoConfirmSessionActive(t.accountIdentifier,t.url.origin);return r.success?await this.isNotRateLimited()?{status:"OK",sessionStartTime:r.sessionStartTime,sessionMaxDuration:r.sessionMaxDuration}:{status:"RATE_LIMIT_EXCEEDED",sessionStartTime:r.sessionStartTime,sessionMaxDuration:r.sessionMaxDuration}:{status:"SESSION_EXPIRED",sessionStartTime:r.sessionStartTime,sessionMaxDuration:r.sessionMaxDuration}}catch{return{status:"UNKNOWN"}}}async isAutoConfirmEnabledInUserSettings({origin:t,accountIdentifier:r,networkID:n}){return this.executedChecksAudit.push("IS_AUTO_CONFIRM_ENABLED_IN_USER_SETTINGS"),(await L(this.storage,r,t))?.networks?.[n]===!0}isNotRateLimited(){this.executedChecksAudit.push("IS_NOT_RATE_LIMITED");let t=O.findIndex(r=>r<=Date.now()-6e4);return t>-1&&O.splice(t),O.length>=Sr?!1:(O.push(Date.now()),!0)}async isAutoConfirmSessionActive(t,r){this.executedChecksAudit.push("IS_AUTO_CONFIRM_SESSION_ACTIVE");let n=await L(this.storage,t,r),s=Se(n);return{sessionStartTime:n.sessionStartTime,sessionMaxDuration:n.maxSessionDuration,success:s}}async didPassEthTransactionSimulation(t,r){this.executedChecksAudit.push("DID_PASS_ETH_TRANSACTION_SIMULATION");try{let n=await K(r.locale,r.deviceId,{networkID:t.networkID,type:"transaction",url:t.url?.href,userAccount:t.userAccountAddress,params:{transactions:t.data,userAddresses:[]}});return je(n)}catch{return{success:!1}}}async didPassSolTransactionSimulation(t,r){this.executedChecksAudit.push("DID_PASS_SOL_TRANSACTION_SIMULATION");try{let n=await K(r.locale,r.deviceId,{networkID:t.networkID,type:"transaction",url:t.url.href,userAccount:t.userAccountAddress,params:{transactions:t.data,method:"signAndSendTransaction"}});return je(n)}catch{return{success:!1}}}async didPassEthMessageSimulation(t,r){this.executedChecksAudit.push("DID_PASS_ETH_MESSAGE_SIMULATION");try{let n=await we(r.locale,r.deviceId,{params:{message:"0x"+Buffer.from(JSON.stringify(t.data)).toString("hex")},type:"message",userAccount:t.userAccountAddress,networkID:t.networkID,url:t.url?.href});return wr(n)}catch{return!1}}};function je(e){let t=!!e.warnings.find(s=>s.severity<=3),r=!!e.block,n=e.expectedChanges.map(s=>s.type==="AssetChange"&&s.asset.usdValue||0).reduce((s,o)=>s+o,0);return{success:!t&&!r&&!e.error,dollarValue:parseFloat((n||0).toFixed(6))}}function wr(e){let t=!!e.warnings.find(n=>n.severity<=3),r=!!e.block;return!t&&!r&&!e.error}c();p();var Fe=7,ps=ae(pe,e=>new H(e)),H=class{#e;constructor(t){this.#e=t}onAutoConfirmSettingsChanged({origin:t,networkID:r,enabled:n,sessionStartTime:s,maxSessionDuration:o,view:i}){w.addBreadcrumb(`Auto-Confirm: ${n?"Enabling":"Disabling"} network ID ${r}`,"autoConfirm","info"),this.#e.capture("autoConfirmSettingsChanged",{data:{origin:t,networkId:r,enabled:n,sessionStartTime:n?s:void 0,maxSessionDuration:n?o:void 0,view:i}})}transactionAutoConfirmed(t){let r={type:"transaction",data:t};return t.autoConfirm.auditTrail?.length&&t.autoConfirm.auditTrail.length<Fe&&(t.autoConfirm.suspectSettingsTamper=!0),w.addBreadcrumb(`Auto-Confirm: transaction on origin ${t.origin} for network ${t.networkId} auto-confirmed`,"autoConfirm","info"),t.autoConfirm.suspectSettingsTamper&&w.addBreadcrumb("Auto-Confirm: suspected tampering with settings...","autoConfirm","info"),this.#e.capture("transactionAutoConfirmed",r)}messageAutoConfirmed(t){let r={type:"message",data:t};return t.autoConfirm.auditTrail?.length&&t.autoConfirm.auditTrail.length<Fe&&(t.autoConfirm.suspectSettingsTamper=!0),w.addBreadcrumb(`Auto-Confirm: message on origin ${t.origin} for network ${t.networkId} auto-confirmed`,"autoConfirm","info"),t.autoConfirm.suspectSettingsTamper&&w.addBreadcrumb("Auto-Confirm: suspected tampering with settings...","autoConfirm","info"),this.#e.capture("transactionAutoConfirmed",r)}};export{Ct as a,It as b,G as c,Ae as d,dn as e,fn as f,ln as g,vt as h,mn as i,Me as j,gn as k,Pt as l,Ne as m,hn as n,yn as o,Rn as p,re as q,ps as r,H as s,xr as t,We as u,gr as v,On as w,hr as x};
//# sourceMappingURL=chunk-5MF3BU53.js.map
