import{Pa as w,Ra as k,Sa as b,nb as N,ob as I,rd as g}from"./chunk-MZZEJ42N.js";import{a as y}from"./chunk-56SJOU6P.js";import{x as L}from"./chunk-ALUTR72U.js";import{L as _,ia as x,ka as S,la as d}from"./chunk-L3A2KHJO.js";import{a as f}from"./chunk-4P36KWOF.js";import{h as n,n as s}from"./chunk-3KENBVE7.js";n();s();n();s();n();s();var m={};var U={...m,defaultExplorer:"basescan",getExplorerUrl:function(e){let t;switch(e){case"eip155:84532":t="sepolia.";break;case"eip155:8453":default:t=""}return{basescan:(r,o)=>{let a=Array.isArray(o)?o.join("/"):o,i={transaction:"tx",address:"address",token:"token",nft:"nft"}[r];return`https://${t}basescan.org/${i}/${a}`}}}};n();s();var V={getExplorerUrl:function(){return{mempool:(e,t)=>`https://mempool.space/${{transaction:"tx",address:"address"}[e]}/${t}`}},defaultExplorer:"mempool"};n();s();var R={...m,getExplorerUrl(e){let t;switch(e){case"eip155:11155111":t="sepolia.";break;case"eip155:1":default:t=""}return{etherscan:(r,o)=>{let a=Array.isArray(o)?o.join("/"):o,i={transaction:"tx",address:"address",token:"token",nft:"nft"}[r];return`https://${t}etherscan.io/${i}/${a}`}}},defaultExplorer:"etherscan"};n();s();var $={...m,getExplorerUrl:function(){return{monadscan:(e,t)=>{let r=Array.isArray(t)?t.join("/"):t;return`https://brightstar-884.devnet1.monad.xyz/${{transaction:"tx",address:"address",token:"token",nft:"nft"}[e]}/${r}`}}},defaultExplorer:"monadscan"};n();s();var O={...m,getExplorerUrl:function(e){let t;switch(e){case"eip155:80002":t="amoy.";break;case"eip155:137":default:t=""}return{polygonscan:(r,o)=>{let a=Array.isArray(o)?o.join("/"):o,i={transaction:"tx",address:"address",token:"token",nft:"nft"}[r];return`https://${t}polygonscan.com/${i}/${a}`}}},defaultExplorer:"polygonscan"};n();s();var M={getExplorerUrl:function(e){let t;switch(e){case"solana:103":t="devnet";break;case"solana:102":t="testnet";break;case"solana:101":t="mainnet-beta";break;case"solana:localnet":t="mainnet-beta";break}let r="";return["devnet","testnet"].includes(t)&&(r=`?cluster=${t}`),{"solana-beach":(o,a)=>`https://solanabeach.io/${o}/${a}${r}`,solscan:(o,a)=>`https://solscan.io/${{transaction:"tx",address:"account"}[o]}/${a}${r}`,"solana-explorer":(o,a)=>`https://explorer.solana.com/${o}/${a}${r}`,"solana-fm":(o,a)=>{let i={"mainnet-beta":"mainnet-qn1",testnet:"testnet-solana",devnet:"devnet-solana",localhost:"localhost"}[t];return`https://solana.fm/${{transaction:"tx",address:"address"}[o]}/${a}?cluster=${i}`},xray:(o,a)=>`https://xray.helius.xyz/${{transaction:"tx",address:"token"}[o]}/${a}${r}`}},defaultExplorer:"solscan"};var q=new I({solana:M,ethereum:R,polygon:O,monad:$,base:U,bitcoin:V,sui:{}}),E=N(q);n();s();n();s();var rt=15,nt={version:1,addresses:[]},st={version:1,addresses:[]},at=20,Q=()=>{let e={};return Object.keys(k).flatMap(t=>{let r=k[t];return Object.values(r)}).forEach(t=>{let r=t,o=E.get(r).defaultExplorer;o&&(e[r]=o)}),e},it={version:1,explorers:Q()},pt={"solana-beach":"Solana Beach",solscan:"Solscan","solana-explorer":"Solana Explorer","solana-fm":"Solana FM",xray:"XRAY",etherscan:"Etherscan",basescan:"Basescan",polygonscan:"Polygonscan",mempool:"Mempool",monadscan:"Monadscan"},P={version:1,apps:{}},z={default:"",light:"1f3fb",medium_light:"1f3fc",medium:"1f3fd",medium_dark:"1f3fe",dark:"1f3ff"},lt={"":"","1f3fb":"\u{1F3FB}","1f3fc":"\u{1F3FC}","1f3fd":"\u{1F3FD}","1f3fe":"\u{1F3FE}","1f3ff":"\u{1F3FF}"},ut={version:1,skinTone:z.default},ct=_,ft=!0,mt=L({minutes:15}),v=[{value:"en",displayValue:"English",isLocale:!1},{value:"es",displayValue:"Espa\xF1ol",isLocale:!1},{value:"de",displayValue:"Deutsch",isLocale:!1},{value:"fr",displayValue:"Fran\xE7ais",isLocale:!1},{value:"it",displayValue:"Italiano",isLocale:!1},{value:"zh-CN",displayValue:"\u4E2D\u6587(\u7B80\u4F53)",isLocale:!0},{value:"zh-TW",displayValue:"\u4E2D\u6587(\u7E41\u9AD4)",isLocale:!0},{value:"bn",displayValue:"\u09AC\u09BE\u0982\u09B2\u09BE",isLocale:!1},{value:"ja",displayValue:"\u65E5\u672C",isLocale:!1},{value:"ko",displayValue:"\uD55C\uAD6D\uC5B4",isLocale:!1},{value:"ru",displayValue:"P\u0443\u0441\u0441\u043A\u0438\u0439",isLocale:!1},{value:"hi",displayValue:"\u0939\u093F\u0902\u0926\u0940",isLocale:!1},{value:"id",displayValue:"Indonesia",isLocale:!1},{value:"ms",displayValue:"Melayu",isLocale:!1},{value:"th",displayValue:"\u0E44\u0E17\u0E22",isLocale:!1},{value:"vi",displayValue:"Ti\u1EBFng Vi\u1EC7t",isLocale:!1},{value:"pt",displayValue:"Portugu\xEAs",isLocale:!1},{value:"tr",displayValue:"T\xFCrk\xE7e",isLocale:!1},{value:"fil",displayValue:"Filipino",isLocale:!1},{value:"my",displayValue:"\u1019\u103C\u1014\u103A\u1019\u102C\u1018\u102C\u101E\u102C",isLocale:!1},{value:"am",displayValue:"\u12A0\u121B\u122D\u129B",isLocale:!1},{value:"ar",displayValue:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629",isLocale:!1},{value:"gu",displayValue:"\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",isLocale:!1},{value:"ha",displayValue:"Hausa",isLocale:!1},{value:"ig",displayValue:"\xC1s\u1EE5\u0300s\u1EE5\u0301 \xCCgb\xF2",isLocale:!1},{value:"pa",displayValue:"\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",isLocale:!1},{value:"sw",displayValue:"Kiswahili",isLocale:!1},{value:"ta",displayValue:"\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",isLocale:!1},{value:"te",displayValue:"\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",isLocale:!1},{value:"yo",displayValue:"\xC8d\xE8 Yor\xF9b\xE1",isLocale:!1}];n();s();var G=({networkID:e,endpoint:t,param:r,explorerType:o})=>{let i=E.get(e).getExplorerUrl(e)[o??E.get(e).defaultExplorer];return i?i(t,r):""},ht=e=>{if(!e)return;let{explorers:t}=e,r={};return w.getAllNetworkIDs().forEach(a=>{let i=w.getNetworkName(a),u=t[a];r[i]=u}),{...e,explorers:r}};n();s();n();s();var X=e=>{switch(e){case"privateKey":return y.t("removeAccountWarningPrivateKey");case"seed":return y.t("removeAccountWarningSeed");case"ledger":return y.t("removeAccountWarningLedger");case"seedVault":return y.t("removeAccountWarningSeedVault");case"readOnly":return y.t("removeAccountWarningReadOnly")}};n();s();var Y=()=>{let e=[];return v.forEach(t=>{e.push(t.value),t.isLocale&&e.push(t.value.substr(0,2))}),[...new Set(e)]},D=(e,t)=>e.substr(0,3)==="fil"?t==="fil":e.substr(0,2)==="zh"?e==="zh-TW"?t==="zh-TW":t==="zh-CN":t===e.substr(0,2),H=e=>v.find(t=>D(e,t.value))?.displayValue,J=e=>v.find(t=>D(e,t.value))?.value;n();s();var Z=(e,t)=>e.filter(o=>F(t,o.title)||F(t,o.tags?.join(" "))),F=(e,t)=>{if(t===void 0)return!1;let r=e.toLowerCase();return t.toLowerCase().split(" ").map(o=>o.startsWith(r)||r.startsWith(o)&&t.toLowerCase().includes(r)).includes(!0)};n();s();n();s();var l="@phantom/settings",c={emojiSkinTone(){return[`${l}:emoji-skin-tone`]},isAnalyticsOptedOut(){return[`${l}:is-analytics-opted-out`]},solanaActionsEnabled(){return[`${l}:solana-actions-enabled`]},showWalletShortcuts(){return[`${l}:show-wallet-shortcuts`]},preferredExplorers(){return[`${l}:multi-chain-preferred-explorers`]},recentAddresses(){return[`${l}:multi-chain-recent-addresses`]},savedAddresses(){return[`${l}:multi-chain-saved-addresses`]},trustedApps(){return[`${l}:multi-chain-trusted-apps`]},metaMaskOverride(){return[`${l}:multi-chain-metamask-override`]},autoConfirm(e,t){return[l,"auto-confirm",e,t]},allAutoConfirm(e){return[l,"auto-confirm",e]},webViewDebugging(){return[`${l}:enable-webview-debugging:v1`]},selectedCurrency(){return[`${l}:selected-currency`]}};n();s();async function C(e){return await e.get(j)??P}function to(){let e=g();return S({queryKey:c.trustedApps(),refetchOnMount:"always",async queryFn(){return await C(e)}})}async function h(e,t){await e.set(j,t)}function oo(){let e=g(),t=x();return d({async mutationFn({trustedApps:r}){await h(e,r)},async onSuccess(){await t.invalidateQueries({queryKey:c.trustedApps()})}})}var j="userTrustedApps";n();s();var T=7200,K=()=>({networks:{},maxSessionDuration:T}),ee=f.object({networks:f.record(b,f.boolean()),sessionStartTime:f.number().optional(),maxSessionDuration:f.literal(T)}),fo=f.record(f.string(),ee);function te(e){let{sessionStartTime:t=0,maxSessionDuration:r=T,networks:o={}}=e??{};return Object.values(o).some(i=>i===!0)&&t>Date.now()-r*1e3}async function oe(e,t){let o={...await C(e)};for(let a of Object.keys(o.apps[t]))o.apps[t][a].autoConfirm&&delete o.apps[t][a].autoConfirm;await h(e,o)}async function W(e,t,r){let o=r.replace(/\/$/,""),a=await C(e),i=a?.apps?.[t]?.[o]??{},u=i?.autoConfirm??K();if(i?.autoConfirm){let A=Object.values(u.networks).some(B=>B===!0);te(i?.autoConfirm)===!1&&A&&(u=await re(i.autoConfirm),u=u??K())}return i.autoConfirm=u,await h(e,a),i.autoConfirm}function mo(e,t){let r=g(),o=x(),a=t.replace(/\/$/,"");return{set:d({async mutationFn(i){let u=await W(r,e,a),A=await C(r);return A.apps[e][a]&&(A.apps[e][a].autoConfirm=i),await h(r,A),u},async onSuccess(){await o.invalidateQueries({queryKey:c.trustedApps()}),await o.invalidateQueries({queryKey:c.allAutoConfirm(e)})}}),remove:d({async mutationFn(){let i=await C(r);i.apps[e][t]?.autoConfirm&&delete i.apps[e][t].autoConfirm,await h(r,i)},async onSuccess(){await o.invalidateQueries({queryKey:c.autoConfirm(e,t)})}}),get:S({queryKey:c.autoConfirm(e,t),refetchOnMount:"always",async queryFn(){return await W(r,e,t)}})}}function yo(e){let t=g(),r=x();return{removeAll:d({async mutationFn(){return await oe(t,e)},async onSuccess(){await r.invalidateQueries({queryKey:c.trustedApps()}),await r.resetQueries({queryKey:c.allAutoConfirm(e)})}})}}async function re(e){if(!e?.networks)return e;for(let t of Object.keys(e?.networks))e.networks[t]=!1;return e}export{E as a,rt as b,nt as c,st as d,at as e,it as f,pt as g,z as h,lt as i,ut as j,ct as k,ft as l,mt as m,v as n,G as o,ht as p,X as q,Y as r,D as s,H as t,J as u,Z as v,c as w,C as x,to as y,h as z,oo as A,j as B,T as C,te as D,W as E,mo as F,yo as G};
//# sourceMappingURL=chunk-SLQBAOEK.js.map