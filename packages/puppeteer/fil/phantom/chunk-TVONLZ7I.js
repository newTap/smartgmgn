import{B as b,Ma as c}from"./chunk-JD6NH5K6.js";import{j as g}from"./chunk-75L54KUM.js";import{h as y,i as A}from"./chunk-W27Z2YZM.js";import{k as w}from"./chunk-OKP6DFCI.js";import{d as P,ea as h,ha as p}from"./chunk-SD2LXVLD.js";import{a as f}from"./chunk-MHOQBMVI.js";import{wc as d}from"./chunk-MZZEJ42N.js";import{m as S}from"./chunk-56SJOU6P.js";import{x as u}from"./chunk-ALUTR72U.js";import{a as x}from"./chunk-7X4NV6OJ.js";import{f as F,h as l,n as m}from"./chunk-3KENBVE7.js";l();m();var i=F(x());l();m();var I="_19n0krs0";var D=u({days:3}),M=new f,hi=()=>{let t=d(),{isOpen:s}=g(),{data:o,isSuccess:e}=h("AdditionalPermissions"),{handleShowModalVisibility:n}=c(),a=e&&!o&&!s;return(0,i.useEffect)(()=>{a&&(n("additionalPermissions"),t.capture("allSitesPermissionsSeen",{data:{uiContext:"interstitial"}}))},[n,a,t]),null};function wi(){let[t,s]=(0,i.useState)(null),[o,e]=(0,i.useState)(!1),{data:n}=p("AdditionalPermissions");return(0,i.useEffect)(()=>{(async()=>{let r=await P(M);(!r||r&&Date.now()-r>D)&&e(!0)})()},[]),(0,i.useEffect)(()=>{y().then(r=>{s(r)})},[t]),{shouldShowAdditionalPermissionsInterstitial:(0,i.useMemo)(()=>t===null?!1:!t,[t])&&!n&&o}}var T=()=>{let{t}=S(),s=d(),{handleHideModalVisibility:o}=c(),{mutate:e}=p("AdditionalPermissions"),n=(0,i.useCallback)(()=>{s.capture("allSitesPermissions",{data:{uiContext:"interstitial",oldValue:!1,newValue:!1,choice:"commandDontAllow"}}),e(),o("additionalPermissions")},[o,e,s]),a=(0,i.useCallback)(async()=>{let C=await A();s.capture("allSitesPermissions",{data:{uiContext:"interstitial",oldValue:!1,newValue:C,choice:"commandAllow"}}),e(),o("additionalPermissions")},[o,e,s]),r={icon:i.default.createElement("img",{className:I,src:"/images/additional-permissions/interstitial.webp"}),bodyTitle:t("interstitialAdditionalPermissionsTitle"),bodyDescription:t("interstitialAdditionalPermissionsSubtitle"),FooterComponent:()=>i.default.createElement(w,{primaryText:t("commandAllow"),onPrimaryClicked:a,secondaryText:t("commandDontAllow"),onSecondaryClicked:n}),onDismiss:n};return i.default.createElement(b,{...r})},bi=T;export{hi as a,wi as b,T as c,bi as d};
//# sourceMappingURL=chunk-TVONLZ7I.js.map
