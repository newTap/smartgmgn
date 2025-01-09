import{a as Y,b as Z,c as Pe,d as De,e as se,f as ue,h as $,i as pe,l as Ve,u as de,w as V,x as Ie}from"./chunk-HPOS2V3B.js";import{a as le}from"./chunk-H3FFS4GT.js";import{ga as Le,o as S,rb as q}from"./chunk-WIQ4WVKX.js";import{f as xe}from"./chunk-MNXYIK2W.js";import{a as H}from"./chunk-7X4NV6OJ.js";import{f as C,h,i as c,n as b}from"./chunk-3KENBVE7.js";h();b();h();b();var u=C(H());h();b();function Ce(e){var o,n,t=$(e),i=t.defaultView||self;return t?{width:(o=t.documentElement.clientWidth)!=null?o:i.innerWidth,height:(n=t.documentElement.clientHeight)!=null?n:i.innerHeight}:{width:0,height:0}}h();b();var ee=C(H()),ce=C(le());function J(){return J=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},J.apply(this,arguments)}function Ye(e,o){if(e==null)return{};var n={},t=Object.keys(e),i,r;for(r=0;r<t.length;r++)i=t[r],!(o.indexOf(i)>=0)&&(n[i]=e[i]);return n}var $e=["as","style"],Q=(0,ee.forwardRef)(function(o,n){var t=o.as,i=t===void 0?"span":t,r=o.style,p=r===void 0?{}:r,a=Ye(o,$e);return(0,ee.createElement)(i,J({ref:n,style:J({border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap",wordWrap:"normal"},p)},a))});c.NODE_ENV!=="production"&&(Q.displayName="VisuallyHidden",Q.propTypes={as:ce.default.any,children:ce.default.node});h();b();var y=C(H()),oe=C(le());var Se=function(o){var n=o.onChange,t=o.observe,i=t===void 0?!0:t,r=o.children,p=(0,y.useRef)(null),a=te(p,{observe:i,onChange:n});return r({ref:p,rect:a})};c.NODE_ENV!=="production"&&(Se.displayName="Rect",Se.propTypes={children:oe.default.func.isRequired,observe:oe.default.bool,onChange:oe.default.func});function te(e,o,n){var t,i;if(se(o))t=o;else{var r;t=(r=o?.observe)!=null?r:!0,i=o?.onChange}ue(n)&&(i=n),c.NODE_ENV!=="production"&&((0,y.useEffect)(function(){c.NODE_ENV!=="production"&&Y(!se(o),"Passing `observe` as the second argument to `useRect` is deprecated and will be removed in a future version of Reach UI. Instead, you can pass an object of options with an `observe` property as the second argument (`useRect(ref, { observe })`).\nSee https://reach.tech/rect#userect-observe")},[o]),(0,y.useEffect)(function(){c.NODE_ENV!=="production"&&Y(!ue(n),"Passing `onChange` as the third argument to `useRect` is deprecated and will be removed in a future version of Reach UI. Instead, you can pass an object of options with an `onChange` property as the second argument (`useRect(ref, { onChange })`).\nSee https://reach.tech/rect#userect-onchange")},[n]));var p=(0,y.useState)(e.current),a=p[0],d=p[1],m=(0,y.useRef)(!1),g=(0,y.useRef)(!1),M=(0,y.useState)(null),O=M[0],D=M[1],E=(0,y.useRef)(i);return Z(function(){E.current=i,e.current!==a&&d(e.current)}),Z(function(){a&&!m.current&&(m.current=!0,D(a.getBoundingClientRect()))},[a]),Z(function(){if(t){var v=a;if(g.current||(g.current=!0,v=e.current),!v){c.NODE_ENV!=="production"&&console.warn("You need to place the ref");return}var x=De(v,function(f){E.current==null||E.current(f),D(f)});return x.observe(),function(){x.unobserve()}}},[t,a,e]),O}var F=C(le());function _(){return _=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var n=arguments[o];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},_.apply(this,arguments)}function ae(e,o){if(e==null)return{};var n={},t=Object.keys(e),i,r;for(r=0;r<t.length;r++)i=t[r],!(o.indexOf(i)>=0)&&(n[i]=e[i]);return n}var Ke=["children","label","ariaLabel","id","DEBUG_STYLE"],je=["label","ariaLabel","isVisible","id"],Ge=["ariaLabel","aria-label","as","id","isVisible","label","position","style","triggerRect"],ke=["type"],ne,R,I,K,ie,N,ze=100,Xe=500,s;(function(e){e.Idle="IDLE",e.Focused="FOCUSED",e.Visible="VISIBLE",e.LeavingVisible="LEAVING_VISIBLE",e.Dismissed="DISMISSED"})(s||(s={}));var l;(function(e){e.Blur="BLUR",e.Focus="FOCUS",e.GlobalMouseMove="GLOBAL_MOUSE_MOVE",e.MouseDown="MOUSE_DOWN",e.MouseEnter="MOUSE_ENTER",e.MouseLeave="MOUSE_LEAVE",e.MouseMove="MOUSE_MOVE",e.Rest="REST",e.SelectWithKeyboard="SELECT_WITH_KEYBOARD",e.TimeComplete="TIME_COMPLETE"})(l||(l={}));var me={initial:s.Idle,states:(N={},N[s.Idle]={enter:fe,on:(ne={},ne[l.MouseEnter]=s.Focused,ne[l.Focus]=s.Visible,ne)},N[s.Focused]={enter:Je,leave:Qe,on:(R={},R[l.MouseMove]=s.Focused,R[l.MouseLeave]=s.Idle,R[l.MouseDown]=s.Dismissed,R[l.Blur]=s.Idle,R[l.Rest]=s.Visible,R)},N[s.Visible]={on:(I={},I[l.Focus]=s.Focused,I[l.MouseEnter]=s.Focused,I[l.MouseLeave]=s.LeavingVisible,I[l.Blur]=s.LeavingVisible,I[l.MouseDown]=s.Dismissed,I[l.SelectWithKeyboard]=s.Dismissed,I[l.GlobalMouseMove]=s.LeavingVisible,I)},N[s.LeavingVisible]={enter:eo,leave:function(){oo(),fe()},on:(K={},K[l.MouseEnter]=s.Visible,K[l.Focus]=s.Visible,K[l.TimeComplete]=s.Idle,K)},N[s.Dismissed]={leave:function(){fe()},on:(ie={},ie[l.MouseLeave]=s.Idle,ie[l.Blur]=s.Idle,ie)},N)},w={value:me.initial,context:{id:null}},re=[];function qe(e){return re.push(e),function(){re.splice(re.indexOf(e),1)}}function Ze(){re.forEach(function(e){return e(w)})}var ve;function Je(){self.clearTimeout(ve),ve=self.setTimeout(function(){T({type:l.Rest})},ze)}function Qe(){self.clearTimeout(ve)}var he;function eo(){self.clearTimeout(he),he=self.setTimeout(function(){return T({type:l.TimeComplete})},Xe)}function oo(){self.clearTimeout(he)}function fe(){w.context.id=null}function we(e){var o=e===void 0?{}:e,n=o.id,t=o.onPointerEnter,i=o.onPointerMove,r=o.onPointerLeave,p=o.onPointerDown,a=o.onMouseEnter,d=o.onMouseMove,m=o.onMouseLeave,g=o.onMouseDown,M=o.onFocus,O=o.onBlur,D=o.onKeyDown,E=o.disabled,v=o.ref,x=o.DEBUG_STYLE,f=String(Ve(n)),G=(0,u.useState)(x?!0:Oe(f,!0)),B=G[0],Re=G[1],k=(0,u.useRef)(null),Ne=pe(v,k),Fe=te(k,{observe:B});(0,u.useEffect)(function(){return qe(function(){Re(Oe(f))})},[f]),Ie("tooltip"),(0,u.useEffect)(function(){var L=$(k.current);function U(W){(W.key==="Escape"||W.key==="Esc")&&w.value===s.Visible&&T({type:l.SelectWithKeyboard})}return L.addEventListener("keydown",U),function(){return L.removeEventListener("keydown",U)}},[]),ro({disabled:E,isVisible:B,ref:k});function z(L,U){return typeof self<"u"&&"PointerEvent"in self?L:V(L,U)}function X(L){return function(W){W.pointerType==="mouse"&&L(W)}}function Ee(){T({type:l.MouseEnter,id:f})}function ye(){T({type:l.MouseMove,id:f})}function Te(){T({type:l.MouseLeave})}function Me(){w.context.id===f&&T({type:l.MouseDown})}function Be(){self.__REACH_DISABLE_TOOLTIPS||T({type:l.Focus,id:f})}function Ae(){w.context.id===f&&T({type:l.Blur})}function Ue(L){(L.key==="Enter"||L.key===" ")&&T({type:l.SelectWithKeyboard})}var We={"aria-describedby":B?de("tooltip",f):void 0,"data-state":B?"tooltip-visible":"tooltip-hidden","data-reach-tooltip-trigger":"",ref:Ne,onPointerEnter:V(t,X(Ee)),onPointerMove:V(i,X(ye)),onPointerLeave:V(r,X(Te)),onPointerDown:V(p,X(Me)),onMouseEnter:z(a,Ee),onMouseMove:z(d,ye),onMouseLeave:z(m,Te),onMouseDown:z(g,Me),onFocus:V(M,Be),onBlur:V(O,Ae),onKeyDown:V(D,Ue)},He={id:f,triggerRect:Fe,isVisible:B};return[We,He,B]}var _e=(0,u.forwardRef)(function(e,o){var n=e.children,t=e.label,i=e.ariaLabel,r=e.id,p=e.DEBUG_STYLE,a=ae(e,Ke),d=u.Children.only(n);c.NODE_ENV!=="production"&&Y(!i,"The `ariaLabel prop is deprecated and will be removed from @reach/tooltip in a future version of Reach UI. Please use `aria-label` instead.");var m=we({id:r,onPointerEnter:d.props.onPointerEnter,onPointerMove:d.props.onPointerMove,onPointerLeave:d.props.onPointerLeave,onPointerDown:d.props.onPointerDown,onMouseEnter:d.props.onMouseEnter,onMouseMove:d.props.onMouseMove,onMouseLeave:d.props.onMouseLeave,onMouseDown:d.props.onMouseDown,onFocus:d.props.onFocus,onBlur:d.props.onBlur,onKeyDown:d.props.onKeyDown,disabled:d.props.disabled,ref:d.ref,DEBUG_STYLE:p}),g=m[0],M=m[1];return(0,u.createElement)(u.Fragment,null,(0,u.cloneElement)(d,g),(0,u.createElement)(j,_({ref:o,label:t,"aria-label":i},M,a)))});c.NODE_ENV!=="production"&&(_e.displayName="Tooltip",_e.propTypes={children:F.default.node.isRequired,label:F.default.node.isRequired,ariaLabel:F.default.string});var j=(0,u.forwardRef)(function(o,n){var t=o.label,i=o.ariaLabel,r=o.isVisible,p=o.id,a=ae(o,je);return r?(0,u.createElement)(Pe,null,(0,u.createElement)(be,_({ref:n,label:t,"aria-label":i,isVisible:r},a,{id:de("tooltip",String(p))}))):null});c.NODE_ENV!=="production"&&(j.displayName="TooltipPopup",j.propTypes={label:F.default.node.isRequired,ariaLabel:F.default.string,position:F.default.func});var be=(0,u.forwardRef)(function(o,n){var t=o.ariaLabel,i=o["aria-label"],r=o.as,p=r===void 0?"div":r,a=o.id,d=o.isVisible,m=o.label,g=o.position,M=g===void 0?io:g,O=o.style,D=o.triggerRect,E=ae(o,Ge),v=(i||t)!=null,x=(0,u.useRef)(null),f=pe(n,x),G=te(x,{observe:d});return(0,u.createElement)(u.Fragment,null,(0,u.createElement)(p,_({role:v?void 0:"tooltip"},E,{ref:f,"data-reach-tooltip":"",id:v?void 0:a,style:_({},O,to(M,D,G))}),m),v&&(0,u.createElement)(Q,{role:"tooltip",id:a},i||t))});c.NODE_ENV!=="production"&&(be.displayName="TooltipContent",be.propTypes={});function to(e,o,n){var t=!n;return t?{visibility:"hidden"}:e(o,n)}var no=8,io=function(o,n,t){t===void 0&&(t=no);var i=Ce(),r=i.width,p=i.height;if(!o||!n)return{};var a={top:o.top-n.height<0,right:r<o.left+n.width,bottom:p<o.bottom+n.height+t,left:o.left-n.width<0},d=a.right&&!a.left,m=a.bottom&&!a.top;return{left:d?o.right-n.width+self.pageXOffset+"px":o.left+self.pageXOffset+"px",top:m?o.top-t-n.height+self.pageYOffset+"px":o.top+t+o.height+self.pageYOffset+"px"}};function ro(e){var o=e.disabled,n=e.isVisible,t=e.ref;(0,u.useEffect)(function(){if(!(typeof self<"u"&&"PointerEvent"in self)||!o||!n)return;var i=$(t.current);function r(p){n&&(p.target instanceof Element&&p.target.closest("[data-reach-tooltip-trigger][data-state='tooltip-visible']")||T({type:l.GlobalMouseMove}))}return i.addEventListener("mousemove",r),function(){i.removeEventListener("mousemove",r)}},[o,n,t])}function T(e){var o=ao(w,e),n=o.value,t=o.context,i=o.changed;i&&(w={value:n,context:t},Ze())}function ao(e,o){var n=me.states[e.value],t=n&&n.on&&n.on[o.type];if(!t)return _({},e,{changed:!1});n&&n.leave&&n.leave(e.context,o),o.type;var i=ae(o,ke),r=_({},w.context,i),p=typeof t=="string"?t:t.target,a=me.states[p];return a&&a.enter&&a.enter(e.context,o),{value:p,context:r,changed:!0}}function Oe(e,o){return w.context.id===e&&(o?w.value===s.Visible:w.value===s.Visible||w.value===s.LeavingVisible)}var A=C(H());var lo=S(q)`
  text-align: left;
  white-space: normal;
`;lo.defaultProps={color:"#fff",size:14,lineHeight:20,weight:500};var et=S.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-left: ${e=>e.paddingLeft}px;
  padding-right: ${e=>e.paddingRight}px;
  width: ${e=>e.width||"270px"};
`,ot=S.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,so=S(j)`
  padding: 8px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${e=>e.color};
  border-radius: 6px;
  border: none;
  color: white;
  z-index: ${xe+2}; // setting to higher than MODAL_Z_INDEX to ensure it's above the Modals
`,uo=(e,o)=>{if(!e||!o)return{left:0,top:0};let t=e.left+e.width/2-o.width/2,i=self.innerWidth-o.width-2;return{left:Math.min(Math.max(2,t),i)+self.scrollX,top:e.bottom+self.scrollY+8}},po=(e,o)=>{if(!e||!o)return{left:0,top:0};let t=e.left+e.width/2-o.width/2,i=self.innerWidth-o.width-2;return{left:Math.min(Math.max(2,t),i)+self.scrollX,top:e.top+self.scrollY-40}},co=(e,o)=>!e||!o?{left:0,top:0}:{left:e.left-o.width+e.width,top:e.bottom+self.scrollY+8},fo=(e,o)=>!e||!o?{left:0,top:0}:{left:e.left,top:e.bottom+self.scrollY+8},mo=(e,o)=>!e||!o?{left:0,top:0}:{left:e.left,top:e.top+self.scrollY-8-o.height},vo={bottomCenter:uo,bottomRight:co,bottomLeft:fo,topLeft:mo,topCenter:po},ge=A.default.memo(({children:e,alignment:o="bottomCenter",label:n,ariaLabel:t,triggerParams:i,...r})=>{let[p,a]=we(i),d=vo[o];return A.default.createElement(A.default.Fragment,null,A.default.cloneElement(e,p),A.default.createElement(so,{...a,label:n,ariaLabel:t,position:d,...r}))});ge.defaultProps={color:"#000"};h();b();var P=C(H());var ho=S.div`
  display: flex;
  ${e=>e.isVisible?"cursor: pointer;":""}
  align-items: center;
  margin-right: ${e=>e.hasChildren?10:0}px;
  p {
    margin-right: 6px;
    white-space: nowrap;
  }
`,bo=S.div`
  position: relative;
  top: 1px;
`,ut=({children:e,fontWeight:o,fontSize:n=14,iconSize:t,info:i,lineHeight:r,tooltipAlignment:p,noWrap:a,textAlign:d="left",showInfoIcon:m=!0,textColor:g,iconColor:M})=>{let[O,D]=(0,P.useState)(!1),E=!!i,v=E&&O,x=v?"#AB9FF2":"#777";return P.default.createElement(ge,{label:E?i:P.default.createElement(P.default.Fragment,null),ariaLabel:"Info",color:"#000",alignment:p,isVisible:v,triggerParams:{onMouseEnter:()=>D(!0),onMouseLeave:()=>{D(!1)}}},P.default.createElement(ho,{isVisible:v,hasChildren:!!e},P.default.createElement(q,{color:g??x,lineHeight:r,size:n,weight:o,noWrap:a,textAlign:d},e),E&&m?P.default.createElement(bo,null,P.default.createElement(Le,{fill:M??x,width:t})):null))};export{lo as a,et as b,ot as c,ge as d,ut as e};
//# sourceMappingURL=chunk-P5LBFEHG.js.map
