import{W as r}from"./chunk-2NGYUYTC.js";import{b as n}from"./chunk-GQEPK4C4.js";import{a as s}from"./chunk-BTKBODVJ.js";import{f as a,h as t,n as i}from"./chunk-3KENBVE7.js";t();i();var o=a(s()),c=56,d=n().name==="Google Chrome",p=async()=>{try{if(chrome.sidePanel){let{openPanelOnActionClick:e}=await chrome.sidePanel.getPanelBehavior();e&&await chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!1})}}catch(e){console.error(e)}},m=async()=>{try{if(chrome?.runtime!=null)return(await chrome.runtime.getContexts({contextTypes:[chrome.runtime.ContextType.SIDE_PANEL]})).length>0}catch{}return o.default.sidebarAction?await o.default.sidebarAction.isOpen({}):self.outerHeight-self.innerHeight>c},u=self.innerHeight>r.height,f=async()=>{o.default.sidebarAction?await o.default.sidebarAction.close():(await p(),self.close())},P=async()=>{if(o.default.sidebarAction)await o.default.sidebarAction.open(),self.close();else{let[e]=await o.default.tabs.query({active:!0,currentWindow:!0});if(e.id===void 0||e.windowId===void 0)return;d&&await chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}),await chrome.sidePanel.open({tabId:e.id,windowId:e.windowId}),self.close()}};export{d as a,p as b,m as c,f as d,P as e};
//# sourceMappingURL=chunk-XJZOYN2T.js.map
