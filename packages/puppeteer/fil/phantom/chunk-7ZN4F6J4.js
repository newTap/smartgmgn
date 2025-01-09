import{a as ee,c as h,d as T,e as te,f as q,g as se,k as re,l as ne,m as oe,o as N,p as ae,w as u,y as F}from"./chunk-SLQBAOEK.js";import{$b as $,Gb as K,Kd as ie,Pa as A,Yb as G,Zb as Y,_b as X,ca as O,lc as z,pc as J,qc as Z,rd as d,sd as B,ub as j,wc as x}from"./chunk-MZZEJ42N.js";import{m as H}from"./chunk-56SJOU6P.js";import{G as D,ia as l,ka as S,la as p,w as M}from"./chunk-L3A2KHJO.js";import{a as R}from"./chunk-4P36KWOF.js";import{a as P}from"./chunk-7X4NV6OJ.js";import{f as U,h as a,n as i}from"./chunk-3KENBVE7.js";a();i();var Q=R.enum(["ALWAYS_ASK","USE_PHANTOM","USE_METAMASK"]),de="metaMaskOverride";async function ue(e){let t=await e.get(de),s=Q.safeParse(t);return s.success?s.data:Q.enum.ALWAYS_ASK}function Me(){let e=d();return S({queryKey:u.metaMaskOverride(),refetchOnMount:"always",async queryFn(){return ue(e)}})}function Oe(){let e=d(),t=l(),s=x();return p({async mutationFn(r){await ce(e,r),s.capture("metamaskOverrideSettingsChanged",{data:{setting:r}})},async onSuccess(){await t.invalidateQueries({queryKey:u.metaMaskOverride()})}})}async function ce(e,t){await e.set(de,t)}a();i();function Ke(e){return E(t=>{let s=t.explorers[e]??ee.get(e).defaultExplorer;return se[s]})}function Be(e,t){return E(s=>{let r=s.explorers[e];return N({networkID:e,endpoint:"address",explorerType:r,param:t})})}function qe(e){return E(t=>{if(!e)return"";let s=e.networkID,r=t.explorers[s];return N({networkID:s,endpoint:"transaction",explorerType:r,param:e.id})})}function E(e){let t=d(),s=u.preferredExplorers();return S({queryKey:s,queryFn:async()=>{let n=await t.get("userExplorerPreferenceV2");return n?{version:n.version,explorers:{...q.explorers,...n.explorers}}:q},select:e})}function Ne(){let e=d(),t=l();return p({mutationFn:async({preferredExplorers:n})=>{await e.set("userExplorerPreferenceV2",n)},onSuccess:()=>{t.invalidateQueries({queryKey:u.preferredExplorers()})}})}a();i();function Fe(){let e=d(),t=u.showWalletShortcuts();return S({queryKey:t,queryFn:async()=>{let r=await e.get("showWalletShortcuts");return r!=null?r==="true":ne}})}function Qe(){let e=d(),t=l();return p({mutationFn:async({showWalletShortcuts:n})=>{await e.set("showWalletShortcuts",n?"true":"false")},onSuccess:()=>{t.invalidateQueries({queryKey:u.showWalletShortcuts()})}})}a();i();var pe=async(e,t)=>{let s=await e.get("solanaActionsEnabled");return s===null?t??!1:s};function Ve(e=!1){let t=d(),s=u.solanaActionsEnabled();return S({queryKey:s,queryFn:async()=>pe(t,e)})}function _e(){let e=d(),t=l();return p({mutationFn:async({enabled:n})=>{await e.set("solanaActionsEnabled",n)},onSuccess:()=>{t.invalidateQueries({queryKey:u.solanaActionsEnabled()})}})}a();i();var fe=U(P());a();i();function le(){let{isSuccess:e,data:t}=B(),s=d(),r=u.recentAddresses();return S({enabled:e,queryKey:r,queryFn:async()=>{let o=await s.get("userRecentAddresses");if(!t)throw new Error(K);let c=t.enabledChainIDs;return o?Se(o,c):h}})}function me(){let{isSuccess:e,data:t}=B(),s=d(),r=u.savedAddresses();return S({enabled:e,queryKey:r,queryFn:async()=>{let o=await s.get("userSavedAddresses");if(!t)throw new Error(K);let c=t.enabledChainIDs;return o?Se(o,c):T}})}var Se=(e,t)=>({...e,addresses:e.addresses.filter(s=>t.includes(A.getChainID(s.chainID)))});a();i();function ye(){let e=d(),t=l();return p({mutationFn:async({recentAddresses:n})=>{await e.set("userRecentAddresses",n)},onSuccess:()=>{t.invalidateQueries({queryKey:u.recentAddresses()})}})}function ge(){let e=d(),t=l();return p({mutationFn:async({savedAddresses:n})=>{await e.set("userSavedAddresses",n)},onSuccess:()=>{t.invalidateQueries({queryKey:u.savedAddresses()})}})}var Le=()=>{let{data:e=[]}=ie(),{data:t=h}=le(),{data:s=T}=me(),{mutate:r}=ye(),{mutate:n}=ge();return(0,fe.useMemo)(()=>({recentAddresses:t,savedAddresses:s,addRecentAddress:({address:o,chainID:c,timestamp:y=Date.now()})=>je(e,t,s,r,{address:o,chainID:c,timestamp:y}),addSavedAddress:o=>Ge(e,t,s,r,n,o),editSavedAddress:(o,c)=>Ye(s,n,o,c),getExistingAccount:o=>He(e,o),getSavedAddressLabel:(o,c)=>Ae(s.addresses,o,c),getKnownAddressLabel:(o,c)=>Ae([s.addresses,We(e)].flat(),o,c),isExistingAccountAddress:o=>V(e,o),isRecentAddress:(o,c)=>ve(t,o,c),isSavedAddress:(o,c)=>_(s,o,c),removeRecentAddress:o=>xe(t,r,o),removeSavedAddress:o=>Xe(s,n,o)}),[e,t,s,r,n])},We=e=>{let t=[];for(let s of e)t.push(...s.addresses.map(({address:r,networkID:n})=>({address:r,chainID:n,label:s.name})));return t},He=(e,t)=>e[be(e,t)],V=(e,t)=>be(e,t)>-1,ve=(e,t,s)=>b(e.addresses,{address:t,chainID:s})>-1,_=(e,t,s)=>b(e.addresses,{address:t,chainID:s})>-1,je=(e,t,s,r,{address:n,chainID:o,timestamp:c=Date.now()})=>{if(V(e,n)||_(s,n,o)||ve(t,n,o))return;t.addresses.unshift({address:n,chainID:o,timestamp:c});let{addresses:y}=t;return t.addresses=y.slice(0,te),r({recentAddresses:t}),t},Ge=(e,t,s,r,n,o)=>{let{address:c,chainID:y}=o;if(V(e,c)||_(s,c,y))return;xe(t,r,{address:c,chainID:y,timestamp:0});let v={...s,addresses:[...s.addresses,o]};return n({savedAddresses:v}),v},Ye=(e,t,s,r)=>{let n=b(e.addresses,s);if(n<0)return;let o=[...e.addresses];o[n]=r;let c={...e,addresses:o};return t({savedAddresses:c}),c},xe=(e,t,s)=>{let r=b(e.addresses,s);if(r<0)return;let n=[...e.addresses];n.splice(r,1);let o={...e,addresses:n};return t({recentAddresses:o}),o},Xe=(e,t,s)=>{let r=b(e.addresses,s);if(r<0)return;let n=[...e.addresses];n.splice(r,1);let o={...e,addresses:n};return t({savedAddresses:o}),o},Ae=(e,t,s)=>{let r=b(e,{address:t,chainID:s});if(!(r<0))return e[r].label},Ee=(e,t,s)=>A.isEVMNetworkID(s)?e.toLowerCase()===t.toLowerCase():e===t,be=(e,t)=>e.findIndex(s=>s.addresses.find(r=>Ee(r.address,t,r.networkID))),b=(e,t)=>e.findIndex(s=>{let r=t.chainID===s.chainID,n=Ee(t.address,s.address,t.chainID);return r&&n});a();i();a();i();var Ce=async e=>{let t=await e.get("apiEnvironment");t&&M(t)},$e=()=>{let e=d();return p({mutationFn:async()=>{await Ce(e)}})},ze=()=>{let e=d(),t=z(),s=l();return p({mutationFn:async n=>{await e.set("apiEnvironment",n),await t.logOut(),await Promise.all([J(s),G(s),X(s)]),await Promise.all([Z(s),Y(s),$(s)]),M(n)}})};a();i();function Je(){let e=d(),t=u.emojiSkinTone();return S({queryKey:t,queryFn:async()=>await e.get("emojiSkinTone")})}function Ze(){let e=d(),t=l();return p({mutationFn:async({skinTone:n})=>{await e.set("emojiSkinTone",{version:1,skinTone:n})},onSuccess:()=>{t.invalidateQueries({queryKey:u.emojiSkinTone()})}})}a();i();var Re=async e=>await e.get("isAnalyticsOptedOut")??re;function L(){let e=d(),t=u.isAnalyticsOptedOut();return S({queryKey:t,queryFn:async()=>Re(e)})}function et(){let e=d(),t=x(),s=l();return p({mutationFn:async({isAnalyticsOptedOut:o})=>{await e.set("isAnalyticsOptedOut",o),await t.setAnalyticsOptedOut(o)},onSuccess:()=>{s.invalidateQueries({queryKey:u.isAnalyticsOptedOut()})}})}a();i();var tt=()=>{let e=d(),t=async()=>!!await e.get("balanceHiddenStatus"),{data:s}=S({queryKey:["balanceHiddenStatus"],queryFn:t});return s??!1};a();i();var st=()=>{let e=d(),t=async()=>await e.get("lockTimerMs")??oe;return S({queryKey:["lockTimerMs"],queryFn:t})},rt=()=>{let e=d(),t=l();return p({mutationFn:async({lockTimeInMs:r})=>await e.set("lockTimerMs",r),onSuccess:()=>{t.invalidateQueries({queryKey:["lockTimerMs"]})}})};a();i();var ir=R.boolean();a();i();var De=U(P());var nt=()=>{let{data:e,isFetching:t}=F(),{data:s,isFetching:r}=L(),{data:n,isFetching:o}=E(),c=t||r||o;return(0,De.useMemo)(()=>({data:{"Analytics Opt Out":s,"Preferred Explorers":ae(n),"Trusted Apps":e},isFetching:c}),[s,c,n,e])};a();i();var he=async e=>{await e.invalidateQueries({queryKey:u.recentAddresses()}),await e.invalidateQueries({queryKey:u.savedAddresses()})};j(he);a();i();var f=U(P()),ot=({isTestnetMode:e,enabledAddressTypes:t,enableAddressTypes:s,disableAddressTypes:r})=>{let{t:n}=H(),o=(0,f.useMemo)(()=>A.getAddressTypes(e?"bip122:000000000933ea01ad0ee984209779ba":"bip122:000000000019d6689c085ae165831e93").sort(we),[e]),c=(0,f.useMemo)(()=>o.filter(g=>t.includes(g)).sort(we),[o,t]),y=(0,f.useCallback)(g=>{let k=A.getChainIDs(g);for(let Ue of k)if(A[Ue].addressTypes.filter(Pe=>t.includes(Pe)).length<=1)return!1;return!0},[t]),v=x(),Ie=(0,f.useCallback)((g,k)=>{k?y(g)&&(r({addressTypes:[g]}),v.capture("settingsPreferredBitcoinAddressToggledOffByUser",{data:{toggle:{addressType:g}}})):(s({addressTypes:[g]}),v.capture("settingsPreferredBitcoinAddressToggledOnByUser",{data:{toggle:{addressType:g}}}))},[v,y,r,s]),ke=(0,f.useMemo)(()=>({bip122_p2wpkh:{title:O.getDisplayName("bip122_p2wpkh"),subtitle:n("settingsPreferredBitcoinAddressNativeSegwitExplainer")},bip122_p2tr:{title:O.getDisplayName("bip122_p2tr"),subtitle:n("settingsPreferredBitcoinAddressTaprootExplainer")}}),[n]);return{availableBitcoinAddressTypes:o,enabledBitcoinAddressTypes:c,canDisableAddressType:y,handleAddressTypeEnablementChange:Ie,PREFERRED_BTC_ADDRESS_CONTENT:ke}},Te=["bip122_p2wpkh","bip122_p2tr","bip122_p2sh","bip122_p2pkh"],we=(e,t)=>Te.indexOf(e)-Te.indexOf(t);a();i();a();i();a();i();var I={AUD:{name:"Australian Dollar",abbreviation:"AUD",languageCode:"en-AU",value:"AUD",symbol:"A$"},BDT:{name:"Bangladeshi Taka",abbreviation:"BDT",languageCode:"bn-BD",value:"BDT",symbol:"\u09F3"},BRL:{name:"Brazilian Real",abbreviation:"BRL",languageCode:"pt-BR",value:"BRL",symbol:"R$"},CAD:{name:"Canadian Dollar",abbreviation:"CAD",languageCode:"en-CA",value:"CAD",symbol:"CA$"},EUR:{name:"Euro",abbreviation:"EUR",languageCode:"en",value:"EUR",symbol:"\u20AC"},GBP:{name:"British Pound",abbreviation:"GBP",languageCode:"en-GB",value:"GBP",symbol:"\xA3"},HKD:{name:"Hong Kong Dollar",abbreviation:"HKD",languageCode:"zh-HK",value:"HKD",symbol:"HK$"},IDR:{name:"Indonesian Rupiah",abbreviation:"IDR",languageCode:"id-ID",value:"IDR",symbol:"Rp"},INR:{name:"Indian Rupee",abbreviation:"INR",languageCode:"hi-IN",value:"INR",symbol:"\u20B9"},IRR:{name:"Iranian Rial",abbreviation:"IRR",languageCode:"fa-IR",value:"IRR",symbol:"\uFDFC"},JPY:{name:"Japanese Yen",abbreviation:"JPY",languageCode:"ja-JP",value:"JPY",symbol:"\xA5"},KRW:{name:"South Korean Won",abbreviation:"KRW",languageCode:"ko-KR",value:"KRW",symbol:"\u20A9"},MXN:{name:"Mexican Peso",abbreviation:"MXN",languageCode:"es-MX",value:"MXN",symbol:"Mex$"},NGN:{name:"Nigerian Naira",abbreviation:"NGN",languageCode:"en-NG",value:"NGN",symbol:"\u20A6"},RUB:{name:"Russian Ruble",abbreviation:"RUB",languageCode:"ru-RU",value:"RUB",symbol:"\u20BD"},SGD:{name:"Singapore Dollar",abbreviation:"SGD",languageCode:"en-SG",value:"SGD",symbol:"S$"},TRY:{name:"Turkish Lira",abbreviation:"TRY",languageCode:"tr-TR",value:"TRY",symbol:"\u20BA"},USD:{name:"United States Dollar",abbreviation:"USD",languageCode:"en-US",value:"USD",symbol:"$"},VND:{name:"Vietnamese Dong",abbreviation:"VND",languageCode:"vi-VN",value:"VND",symbol:"\u20AB"}},Pr=I.USD;a();i();a();i();var at="currency",it="currencyExchangeRates",W={currencyExchangeRates:()=>[at,it,D]};var dt=e=>e.queryKey[1]===W.currencyExchangeRates()[1]&&e.queryKey[2]===D;a();i();var ut=I.USD.value,ct=e=>{let t=d();return S({queryKey:u.selectedCurrency(),enabled:e,queryFn:async()=>await t.get("selectedCurrency")??ut})},pt=()=>{let e=d(),t=l();return p({mutationFn:async s=>e.set("selectedCurrency",s),onSuccess:()=>{t.invalidateQueries({queryKey:u.selectedCurrency()})}})};a();i();export{Q as a,ue as b,Me as c,Oe as d,ce as e,$e as f,ze as g,Je as h,Ze as i,Re as j,L as k,et as l,tt as m,st as n,rt as o,Ke as p,Be as q,qe as r,E as s,Ne as t,Fe as u,Qe as v,pe as w,Ve as x,_e as y,Le as z,nt as A,he as B,ot as C,I as D,Pr as E,W as F,dt as G,ct as H,pt as I};
//# sourceMappingURL=chunk-7ZN4F6J4.js.map