import{a as v}from"./chunk-DATME33X.js";import"./chunk-PDSYJ4DQ.js";import{a as E}from"./chunk-DZR774A2.js";import{Ma as L}from"./chunk-JD6NH5K6.js";import"./chunk-KJMFZ7XX.js";import"./chunk-WAFQTOB5.js";import"./chunk-CCUXU2GU.js";import"./chunk-SIDJ2NRC.js";import"./chunk-7UTGLKC7.js";import"./chunk-AHRYSG4W.js";import"./chunk-QEXGR5WT.js";import"./chunk-P5LBFEHG.js";import"./chunk-S24UABH5.js";import"./chunk-MHQYYZ7C.js";import"./chunk-X3ESGVCB.js";import"./chunk-QINBGLLG.js";import"./chunk-SHAEZV7V.js";import"./chunk-IWGMKDQE.js";import{b as C}from"./chunk-DERIAD33.js";import"./chunk-EGXLQXDH.js";import"./chunk-CCQRCL2K.js";import"./chunk-75L54KUM.js";import"./chunk-ROF5SDVA.js";import"./chunk-Q67X6MF4.js";import"./chunk-IVMV7P4T.js";import"./chunk-ZON27MKP.js";import"./chunk-SMVAXKUF.js";import"./chunk-HPOS2V3B.js";import"./chunk-XYJX6G2K.js";import"./chunk-MTQZ2G7K.js";import"./chunk-W27Z2YZM.js";import{a as p,c as h,d as c}from"./chunk-2NGYUYTC.js";import"./chunk-H3FFS4GT.js";import"./chunk-4VDZJDFB.js";import"./chunk-XJTFMD4C.js";import"./chunk-GMBAJ6CC.js";import"./chunk-PTZMRZUV.js";import"./chunk-VQVTLSDS.js";import{h as w}from"./chunk-OKP6DFCI.js";import"./chunk-WIQ4WVKX.js";import{L as H}from"./chunk-SD2LXVLD.js";import"./chunk-UCBZOSRF.js";import"./chunk-F3RUX6TF.js";import"./chunk-HRJWTAGT.js";import"./chunk-LURFXJDV.js";import"./chunk-V5T43K7V.js";import"./chunk-MNXYIK2W.js";import"./chunk-QALJXKGR.js";import"./chunk-MHOQBMVI.js";import"./chunk-GQEPK4C4.js";import"./chunk-BTKBODVJ.js";import"./chunk-7ZN4F6J4.js";import"./chunk-OUYKWOVO.js";import"./chunk-WFPABEAU.js";import"./chunk-THLBAMDB.js";import{a as D}from"./chunk-LDMZMUWY.js";import"./chunk-X2SBUKU4.js";import"./chunk-OXFZHPMY.js";import"./chunk-OYGO47TI.js";import"./chunk-SLQBAOEK.js";import{Dd as x}from"./chunk-MZZEJ42N.js";import"./chunk-E3NPIRHS.js";import{m as I}from"./chunk-56SJOU6P.js";import{V as b}from"./chunk-ALUTR72U.js";import"./chunk-N7UFQNLW.js";import"./chunk-L3A2KHJO.js";import"./chunk-4P36KWOF.js";import{a as y}from"./chunk-7X4NV6OJ.js";import"./chunk-UNDMYLJW.js";import{f,h as i,n as m}from"./chunk-3KENBVE7.js";i();m();var F=f(D()),t=f(y());i();m();var o=f(y());i();m();var n=f(y());var M={input:p({paddingRight:44,paddingLeft:44})},T=(0,n.forwardRef)((e,a)=>{let{showLoadingIcon:r=!1,as:l,...s}=e;return n.default.createElement(c,{direction:"row",width:"100%"},n.default.createElement(c,{padding:4,marginRight:8},r?n.default.createElement(w,{diameter:20}):n.default.createElement(h.Search,{size:20,color:"textTertiary"})),n.default.createElement(C,{className:M.input,padding:"0",placeholderColor:"#777777",...s,ref:a,type:"text"}))});var k=({value:e,isLoading:a,onChange:r})=>{let{t:l}=I(),s=(0,o.useRef)(null),{handleHideModalVisibility:d}=L(),u=(0,o.useCallback)(()=>{d("searchPage")},[d]),S=(0,o.useCallback)(g=>{"value"in g.target&&typeof g.target.value=="string"&&r(g.target.value)},[r]),N=(0,o.useCallback)(()=>{r("")},[r]);return(0,o.useEffect)(()=>{setTimeout(()=>s.current?.focus(),200)},[]),o.default.createElement("div",{className:Q},o.default.createElement(T,{ref:s,borderWidth:"0px",placeholder:l("commandSearch"),value:e,onChange:S,showClearIcon:!!e,showLoadingIcon:a,onClear:N}),o.default.createElement("button",{className:B,onClick:u},o.default.createElement(h.X,{size:20,color:"textTertiary"})))},Q=p({padding:16,backgroundColor:"bgArea",display:"flex",flexDirection:"row",borderBottomStyle:"solid",borderBottomWidth:1,borderBottomColor:"borderSecondary"}),B=p({reset:"button",display:"flex",alignItems:"center",justifyItems:"center",color:"textSecondary",padding:4});var U=(0,F.default)((e,a)=>{e&&E.searchedByUser({searchTerm:e,uiContext:a})},1e3);function z(){let[e,a]=(0,t.useState)(""),r=b(e,250),l=e==null||e.length===0,s=x(),d=l?["solana:101"]:s,u=H({searchQuery:r,networkIds:d}),{showSpinner:S}=u;return(0,t.useEffect)(()=>{U(r,"home")},[r]),t.default.createElement(c,{position:"absolute",inset:0},t.default.createElement(k,{value:e,onChange:a,isLoading:S}),t.default.createElement(c,{overflow:"scroll"},t.default.createElement(v,{...u,entryPoint:"home",searchQuery:e})))}var ie=z;export{z as SearchPage,ie as default};
//# sourceMappingURL=SearchPage-IHOXEZHN.js.map