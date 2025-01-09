import{a as V,d as z,f as U}from"./chunk-S7TXLC7D.js";import"./chunk-RJRYVRTS.js";import{a as D}from"./chunk-PUJH7423.js";import"./chunk-XYFNIIUY.js";import"./chunk-O5AAGNHJ.js";import"./chunk-Q3HNV7GN.js";import"./chunk-XJWRT6N6.js";import{b as H}from"./chunk-SIDJ2NRC.js";import"./chunk-7UTGLKC7.js";import"./chunk-AHRYSG4W.js";import"./chunk-QEXGR5WT.js";import{a as A,e as O}from"./chunk-P5LBFEHG.js";import{b as _}from"./chunk-S24UABH5.js";import"./chunk-X3ESGVCB.js";import"./chunk-SHAEZV7V.js";import"./chunk-DERIAD33.js";import{a as g}from"./chunk-CCQRCL2K.js";import{h as v,m as B}from"./chunk-75L54KUM.js";import"./chunk-ROF5SDVA.js";import"./chunk-HPOS2V3B.js";import"./chunk-XYJX6G2K.js";import"./chunk-W27Z2YZM.js";import"./chunk-2NGYUYTC.js";import"./chunk-H3FFS4GT.js";import"./chunk-4VDZJDFB.js";import"./chunk-GMBAJ6CC.js";import"./chunk-PTZMRZUV.js";import{k as N}from"./chunk-OKP6DFCI.js";import{ga as M,o,rb as k}from"./chunk-WIQ4WVKX.js";import{W as u,l as E}from"./chunk-F3RUX6TF.js";import"./chunk-LURFXJDV.js";import"./chunk-V5T43K7V.js";import"./chunk-MNXYIK2W.js";import"./chunk-MHOQBMVI.js";import"./chunk-GQEPK4C4.js";import"./chunk-BTKBODVJ.js";import"./chunk-7ZN4F6J4.js";import{Bb as I,Xb as p}from"./chunk-OUYKWOVO.js";import"./chunk-WFPABEAU.js";import"./chunk-THLBAMDB.js";import"./chunk-LDMZMUWY.js";import"./chunk-X2SBUKU4.js";import"./chunk-OXFZHPMY.js";import"./chunk-OYGO47TI.js";import"./chunk-SLQBAOEK.js";import{L as c,P as oe,pe as w}from"./chunk-MZZEJ42N.js";import"./chunk-E3NPIRHS.js";import{m as F}from"./chunk-56SJOU6P.js";import"./chunk-ALUTR72U.js";import"./chunk-N7UFQNLW.js";import"./chunk-L3A2KHJO.js";import"./chunk-4P36KWOF.js";import{a as ie}from"./chunk-7X4NV6OJ.js";import"./chunk-UNDMYLJW.js";import{f as te,h as T,n as S}from"./chunk-3KENBVE7.js";T();S();var e=te(ie());var re=o(g).attrs({justify:"space-between"})`
  height: 100%;
`,ne=o(g).attrs({align:"center"})``,se=o(N)`
  width: 100%;
`,le=o.div`
  width: 100%;
  padding: 10px 10px 10px 0px;
`,ae=o.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 16px;
`,ce=o.div`
  display: flex;
  align-items: center;
`,me=o(k).attrs({size:14})`
  padding: 4px;
  margin-left: 4px;
  text-align: left;
`,de=o.div`
  border-bottom: 1px solid #222222;
  border-bottom-width: 1px;
`,pe=()=>{let{t}=F(),{pushDetailView:f}=v(),{hideCollectibleListingModal:P}=_(),$=(0,e.useCallback)(()=>{P()},[P]),{cluster:W}=I(),s=u(a=>a.listCollectible);if(!s)return null;let j=u(a=>a.setListPrice),[m,b]=(0,e.useState)(""),r=parseFloat(m),{data:K}=w("solana"),q=K?.address??void 0,G=s.asset.mintPubKey??"",{data:i}=E(W,G,q),l=i?.magic_eden?.floorPrice!==void 0?c(i?.magic_eden?.floorPrice):null,C=i?.magic_eden?.lastPurchasePrice!==void 0?c(i?.magic_eden?.lastPurchasePrice):null,L=i?.magic_eden?.feeInBasisPoints!==void 0?p(i?.magic_eden?.feeInBasisPoints):null,x=i?.magic_eden?.marketplaceFee!==void 0?Math.abs(p(i?.magic_eden?.marketplaceFee)):null,y=i?.magic_eden?.minListPrice!==void 0?c(i?.magic_eden?.minListPrice):null,J=s.asset.collectibleImage,Q=s.asset.name??null,X=s.asset.collectionName??null,Y=()=>{b(`${l??""}`)},[n,d]=(0,e.useState)();(0,e.useEffect)(()=>{t&&(y&&r<y.toNumber()?d({errorMessage:t("collectiblesMinimumListingPrice"),errorColor:"#EB3742"}):l&&r<l.toNumber()?d({errorMessage:t("collectiblesBelowFloorPrice"),errorColor:"#E5A221"}):d(void 0))},[t,r]);let Z=a=>{b(a)},h=m.length>0&&Number.isFinite(r)&&r>0&&n?.errorMessage!==t("collectiblesMinimumListingPrice"),R=()=>{j(r),n?.errorMessage===t("collectiblesBelowFloorPrice")?f(e.default.createElement(U,{artistRoyalties:L,marketplaceFee:x})):f(e.default.createElement(z,{artistRoyalties:L,marketplaceFee:x}))},ee=[{label:t("collectiblesFloorPrice"),value:l===null?"\u2014":`${l} SOL`,tooltipContent:t("collectiblesFloorPriceTooltip")},{label:t("collectiblesOriginalPurchasePrice"),value:C===null?"\u2014":`${C} SOL`,tooltipContent:t("collectiblesOriginalPurchasePriceTooltip")}];return e.default.createElement(re,null,e.default.createElement(ne,null,e.default.createElement(B,null,t("collectiblesListOnMagicEden")),e.default.createElement(le,null,e.default.createElement(O,{tooltipAlignment:"topLeft",iconSize:12,lineHeight:17,fontWeight:500,fontSize:16,info:e.default.createElement(A,null,t("collectiblesListPriceTooltip"))},t("collectiblesListPrice"))),e.default.createElement(ae,null,e.default.createElement(D,{value:m,symbol:"SOL",alignSymbol:"right",buttonText:t("collectiblesUseFloor"),width:80,maxLength:16,onSetTarget:Y,onUserInput:Z}),n&&e.default.createElement(ce,null,e.default.createElement(M,{fill:n.errorColor}),e.default.createElement(me,{color:n.errorColor},n.errorMessage))),e.default.createElement(V,{uri:J,collectibleName:Q,collectionName:X,borderRadius:"8px 8px 0px 0px"}),e.default.createElement(de,null),e.default.createElement(H,{rows:ee,borderRadius:"0px 0px 8px 8px"})),e.default.createElement(se,{primaryText:t("commandNext"),secondaryText:t("commandCancel"),onPrimaryClicked:R,onSecondaryClicked:$,primaryTheme:h?"primary":"default",primaryDisabled:!h}))},De=pe;export{pe as CreateListingPage,De as default};
//# sourceMappingURL=CreateListingPage-6YJKXNOP.js.map
