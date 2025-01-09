import{a as K,b as ue,c as pe,e as ge,f as fe}from"./chunk-S7TXLC7D.js";import"./chunk-RJRYVRTS.js";import{a as de}from"./chunk-PUJH7423.js";import"./chunk-XYFNIIUY.js";import"./chunk-O5AAGNHJ.js";import"./chunk-Q3HNV7GN.js";import"./chunk-XJWRT6N6.js";import{b as H}from"./chunk-SIDJ2NRC.js";import"./chunk-7UTGLKC7.js";import{j as me}from"./chunk-AHRYSG4W.js";import"./chunk-QEXGR5WT.js";import{a as ae,e as ce}from"./chunk-P5LBFEHG.js";import{b as O}from"./chunk-S24UABH5.js";import"./chunk-X3ESGVCB.js";import"./chunk-SHAEZV7V.js";import"./chunk-DERIAD33.js";import{a as S}from"./chunk-CCQRCL2K.js";import{h as R,m as le}from"./chunk-75L54KUM.js";import"./chunk-ROF5SDVA.js";import"./chunk-HPOS2V3B.js";import"./chunk-XYJX6G2K.js";import"./chunk-W27Z2YZM.js";import"./chunk-2NGYUYTC.js";import"./chunk-H3FFS4GT.js";import"./chunk-4VDZJDFB.js";import"./chunk-GMBAJ6CC.js";import"./chunk-PTZMRZUV.js";import{j as ne,k as D}from"./chunk-OKP6DFCI.js";import{ga as se,o as r,rb as q}from"./chunk-WIQ4WVKX.js";import{W as u,Z as re,l as ie}from"./chunk-F3RUX6TF.js";import"./chunk-LURFXJDV.js";import{v as oe}from"./chunk-V5T43K7V.js";import"./chunk-MNXYIK2W.js";import{c as te}from"./chunk-MHOQBMVI.js";import"./chunk-GQEPK4C4.js";import"./chunk-BTKBODVJ.js";import"./chunk-7ZN4F6J4.js";import{Bb as _,Ja as Z,N as Y,Xb as G}from"./chunk-OUYKWOVO.js";import"./chunk-WFPABEAU.js";import"./chunk-THLBAMDB.js";import"./chunk-LDMZMUWY.js";import"./chunk-X2SBUKU4.js";import"./chunk-OXFZHPMY.js";import{i as ee}from"./chunk-OYGO47TI.js";import"./chunk-SLQBAOEK.js";import{$d as X,L,P as M,Pa as Q,pe as B}from"./chunk-MZZEJ42N.js";import"./chunk-E3NPIRHS.js";import{m as T}from"./chunk-56SJOU6P.js";import"./chunk-ALUTR72U.js";import"./chunk-N7UFQNLW.js";import"./chunk-L3A2KHJO.js";import"./chunk-4P36KWOF.js";import{a as j}from"./chunk-7X4NV6OJ.js";import"./chunk-UNDMYLJW.js";import{f as W,h,n as x}from"./chunk-3KENBVE7.js";h();x();var e=W(j());h();x();var s=W(j());h();x();var w=W(j());var Pe=()=>{let t=u(a=>a.unlistCollectible);return t?w.default.createElement(he,{unlistCollectible:t}):null},he=({unlistCollectible:t})=>{let{closeAllModals:a}=O(),{t:o}=T(),{data:g}=X(),{solanaPublicKey:C,cluster:l}=(0,w.useMemo)(()=>{let A=(g?.addresses??[]).find(p=>Q.isSolanaNetworkID(p.networkID)),U=A?.networkID,$=new M.PublicKey(A?.address??""),V=Y(U);return{solanaPublicKey:$,cluster:V}},[g]),E="magic_eden",i=t.asset.name,y=(0,w.useMemo)(()=>({errorTitle:o("removeListStatusErrorTitle"),successTitle:o("removeListStatusSuccessTitle"),loadingTitle:o("removeListStatusLoadingTitle"),errorMessage:o("removeListStatusErrorMessage",{name:i}),successMessage:o("removeListStatusSuccessMessage",{name:i}),loadingMessage:o("removeListStatusLoadingMessage",{name:i})}),[o,i]),{errorTitle:f,successTitle:b,loadingTitle:c,errorMessage:k,successMessage:I,loadingMessage:n}=y,{unlist:m,error:v,transaction:P}=re(),F=ue({collectible:t,action:()=>m(l,C),actionType:"remove",actionError:v,transaction:P,errorTitle:f,successTitle:b,loadingTitle:c,errorMessage:k,successMessage:I,loadingMessage:n,marketplace:E,onClose:a});return w.default.createElement(pe,{...F})};var Te=r(S).attrs({justify:"space-between"})`
  height: 100%;
`,we=r(S).attrs({align:"center"})``,Ee=r(D)`
  width: 100%;
`,ke=r.div`
  width: 100%;
  overflow: hidden;
`,Ie=r.div`
  border-bottom: 1px solid #222222;
  border-bottom-width: 1px;
`,Le=({artistRoyalties:t,marketplaceFee:a})=>{let{t:o}=T(),g=me(),{pushDetailView:C,popDetailView:l}=R(),E=(0,s.useCallback)(()=>{l()},[l]),i=u(P=>P.unlistCollectible),y=(0,s.useMemo)(()=>!!i?.listings?.magic_eden,[i?.listings?.magic_eden]);if((0,s.useEffect)(()=>{y||l()},[y,l]),!i)return null;let{data:f}=B("solana");oe(f,"REMOVE_LISTING");let{cluster:b}=_(),c=L(Z),k=i.asset.collectibleImage,I=i.asset.name,n=i.asset.collectionName??null,m=(0,s.useCallback)(()=>{te.capture("listCollectibleRemoveListing",{data:{mint:i.asset.mintPubKey}}),g.approved({chainId:ee(b),type:"remove",list:{type:"remove",tokenId:i.asset.mintPubKey}}),C(s.default.createElement(Pe,null))},[C,i.asset.mintPubKey,b,g]),v=[{label:o("collectiblesListPrice"),value:i.listings?.magic_eden?.listingPrice!==void 0?`${L(parseInt(i.listings.magic_eden.listingPrice,10))} SOL`:"\u2014"},{label:o("collectiblesMagicEdenFee"),value:a===null?"\u2014":`${a}%`},{label:o("collectiblesArtistRoyalties"),value:t===null?"\u2014":`${t}%`},{label:o("sendConfirmationNetworkFee"),value:`${c} SOL`}];return s.default.createElement(Te,null,s.default.createElement(we,null,s.default.createElement(le,null,o("collectiblesRemoveListing")),s.default.createElement(K,{uri:k,collectibleName:I,collectionName:n,borderRadius:"6px 6px 0px 0px"}),s.default.createElement(Ie,null),s.default.createElement(ke,null,s.default.createElement(H,{rows:v,borderRadius:"0px 0px 6px 6px"}))),s.default.createElement(Ee,{primaryText:o("collectiblesRemoveListing"),secondaryText:o("commandCancel"),onPrimaryClicked:m,onSecondaryClicked:E}))};var Fe=r(S).attrs({justify:"space-between"})`
  height: 100%;
`,Me=r(S).attrs({align:"center"})``,Ne=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0px 33px;
`,Ae=r(D)`
  width: 100%;
`,Be=r.div`
  width: 100%;
  padding: 10px 10px 10px 0px;
`,_e=r.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
`,De=r.div`
  display: flex;
  align-items: center;
`,Oe=r(q).attrs({size:14})`
  padding: 4px;
  margin-left: 4px;
  text-align: left;
`,Re=r(S)`
  width: 100%;
  margin-top: 12px;
`,He=r.div`
  border-bottom: 1px solid #222222;
  border-bottom-width: 1px;
`,Ke=()=>{let{t}=T(),{pushDetailView:a}=R(),{hideEditCollectibleListingModal:o}=O(),g=(0,e.useCallback)(()=>{o()},[o]),{cluster:C}=_(),l=u(d=>d.listCollectible);if(!l)return null;let E=u(d=>d.listCollectiblePrice),i=u(d=>d.setEditListPrice),y=u(d=>d.setUnlistCollectible),[f,b]=(0,e.useState)(E?.toString()??""),c=parseFloat(f),{data:k}=B("solana"),I=k?.address??void 0,{data:n}=ie(C,l?.asset.mintPubKey,I),m=n?.magic_eden?.floorPrice!==void 0?L(n?.magic_eden?.floorPrice):null,v=n?.magic_eden?.lastPurchasePrice!==void 0?L(n?.magic_eden?.lastPurchasePrice):null,P=n?.magic_eden?.feeInBasisPoints!==void 0?G(n?.magic_eden?.feeInBasisPoints):null,F=n?.magic_eden?.marketplaceFee!==void 0?Math.abs(G(n?.magic_eden?.marketplaceFee)):null,N=n?.magic_eden?.minListPrice!==void 0?L(n?.magic_eden?.minListPrice):null,A=l.asset.collectibleImage,U=l.asset.name,$=l.asset.collectionName??null,V=()=>{b(`${m??""}`)},[p,z]=(0,e.useState)();(0,e.useEffect)(()=>{t&&(N&&c<N.toNumber()?z({errorMessage:t("collectiblesMinimumListingPrice"),errorColor:"#EB3742",isBlocking:!0}):m&&c<m.toNumber()?z({errorMessage:t("collectiblesBelowFloorPrice"),errorColor:"#E5A221",isBlocking:!1}):z(void 0))},[m,N,t,c]);let Se=d=>{b(d)},J=f.length>0&&Number.isFinite(c)&&c>0&&!p?.isBlocking,Ce=()=>{i(c),p?.errorMessage===t("collectiblesBelowFloorPrice")?a(e.default.createElement(fe,{artistRoyalties:P,marketplaceFee:F,isEditing:!0})):a(e.default.createElement(ge,{artistRoyalties:P,marketplaceFee:F}))},ye=()=>{y(l),a(e.default.createElement(Le,{artistRoyalties:P,marketplaceFee:F}))},ve=[{label:t("collectiblesFloorPrice"),value:m===null?"\u2014":`${m} SOL`,tooltipContent:t("collectiblesFloorPriceTooltip")},{label:t("collectiblesOriginalPurchasePrice"),value:v===null?"\u2014":`${v} SOL`,tooltipContent:t("collectiblesOriginalPurchasePriceTooltip")}];return e.default.createElement(Fe,null,e.default.createElement(Me,null,e.default.createElement(Ne,null,e.default.createElement(q,{weight:500,size:22},t("collectiblesEditListing"))),e.default.createElement(Be,null,e.default.createElement(ce,{tooltipAlignment:"topLeft",iconSize:12,lineHeight:17,fontWeight:500,fontSize:16,info:e.default.createElement(ae,null,t("collectiblesListPriceTooltip"))},t("collectiblesListPrice"))),e.default.createElement(_e,null,e.default.createElement(de,{value:f,symbol:"SOL",alignSymbol:"right",buttonText:t("collectiblesUseFloor"),width:80,maxLength:16,onSetTarget:V,onUserInput:Se}),p&&e.default.createElement(De,null,e.default.createElement(se,{fill:p.errorColor}),e.default.createElement(Oe,{color:p.errorColor},p.errorMessage))),e.default.createElement(K,{uri:A,collectibleName:U,collectionName:$}),e.default.createElement(He,null),e.default.createElement(H,{rows:ve,borderRadius:"0px 0px 8px 8px"}),e.default.createElement(Re,null,e.default.createElement(ne,{theme:"warning",onClick:ye},t("collectiblesRemoveListing")))),e.default.createElement(Ae,{primaryText:t("commandSave"),secondaryText:t("commandCancel"),onPrimaryClicked:Ce,onSecondaryClicked:g,primaryTheme:J?"primary":"default",primaryDisabled:!J}))},Wt=Ke;export{Ke as EditListingPage,Wt as default};
//# sourceMappingURL=EditListingPage-432AEXCS.js.map