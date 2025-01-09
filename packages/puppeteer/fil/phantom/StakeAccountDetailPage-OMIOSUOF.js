import{a as k}from"./chunk-WAFQTOB5.js";import{a as At}from"./chunk-7UTGLKC7.js";import{a as mt,b as pt,e as gt}from"./chunk-P5LBFEHG.js";import{b as dt}from"./chunk-S24UABH5.js";import{d as ft,h as St,i as vt}from"./chunk-QINBGLLG.js";import{m as h}from"./chunk-75L54KUM.js";import"./chunk-ROF5SDVA.js";import"./chunk-HPOS2V3B.js";import"./chunk-XYJX6G2K.js";import{d as ct,e as lt}from"./chunk-2NGYUYTC.js";import"./chunk-H3FFS4GT.js";import{a as kt}from"./chunk-4VDZJDFB.js";import"./chunk-GMBAJ6CC.js";import"./chunk-PTZMRZUV.js";import{h as ut,j as p}from"./chunk-OKP6DFCI.js";import{o as s,rb as i}from"./chunk-WIQ4WVKX.js";import{b as F,v as rt,w as st}from"./chunk-HRJWTAGT.js";import"./chunk-V5T43K7V.js";import"./chunk-MNXYIK2W.js";import"./chunk-MHOQBMVI.js";import"./chunk-GQEPK4C4.js";import"./chunk-BTKBODVJ.js";import{p as Z,q as R}from"./chunk-7ZN4F6J4.js";import{M as et,N as ot,hc as nt,rb as at,xc as it}from"./chunk-OUYKWOVO.js";import"./chunk-WFPABEAU.js";import"./chunk-THLBAMDB.js";import"./chunk-LDMZMUWY.js";import"./chunk-X2SBUKU4.js";import"./chunk-OXFZHPMY.js";import"./chunk-OYGO47TI.js";import"./chunk-SLQBAOEK.js";import{$d as tt,Pa as J,Pb as z,kb as X}from"./chunk-MZZEJ42N.js";import"./chunk-E3NPIRHS.js";import{m as f}from"./chunk-56SJOU6P.js";import{B as V}from"./chunk-ALUTR72U.js";import"./chunk-N7UFQNLW.js";import"./chunk-L3A2KHJO.js";import"./chunk-4P36KWOF.js";import{a as $}from"./chunk-7X4NV6OJ.js";import"./chunk-UNDMYLJW.js";import{f as G,h as w,n as y}from"./chunk-3KENBVE7.js";w();y();var t=G($());w();y();var l=G($());var zt=s.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 47px auto;
  align-items: center;
  justify-content: flex-start;
  background: #2a2a2a;
  width: 328px;
  border-radius: 6px;
  margin-top: 24px;
`,Ft=s.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 33px 1fr auto;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 1px solid #222222;
`,Et=s(At)``,Lt=s.section`
  padding: 14px;
`,Nt=s.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 30px;
  align-items: center;
`,Ht=s(i)`
  color: ${a=>a.activationState==="active"?"#21E56F":a.activationState==="inactive"?"#EB3742":a.activationState==="activating"||a.activationState==="deactivating"?"#FFE920":"#777777"};
`,Mt=s(gt).attrs(()=>({tooltipAlignment:"bottomCenter",iconSize:12,lineHeight:17,fontWeight:400,fontSize:14,noWrap:!0}))``,E=a=>{let{t:o}=f(),{data:u}=ft(a.validatorKeybaseUsername),d=a.validatorName??a.validatorKeybaseUsername??a.voteAccountPubkey??a.stakeAccountPubkey;return l.default.createElement(zt,null,l.default.createElement(Ft,null,l.default.createElement(Et,{width:28,iconUrl:a.validatorIconUrl??u}),l.default.createElement(i,{textAlign:"left",weight:600,size:16,noWrap:!0},d),l.default.createElement(Ht,{activationState:a.status,textAlign:"right",weight:400,size:14,noWrap:!0,textTransform:"capitalize"},a.status??"")),l.default.createElement(Lt,null,Object.entries(a.data).map(([r,n])=>l.default.createElement(Nt,{key:r,onClick:n.onClick},l.default.createElement(Mt,{info:n.tooltip?l.default.createElement(pt,null,l.default.createElement(mt,null,n.tooltip)):null},r==="Stake Account"?o("stakeAccountCardStakeAccount"):"",r==="Balance"?o("stakeAccountCardBalance"):"",r==="Rent Reserve"?o("stakeAccountCardRentReserve"):"",r==="Active Stake"?o("stakeAccountCardActiveStake"):"",r==="Lockup"?o("stakeAccountCardLockup"):"",r==="Rewards"?o("stakeAccountCardRewards"):""),n.node))))};var C=s.div`
  position: relative;
  display: grid;
  grid-template-rows: 42px auto 47px;
  height: 100%;
`,x=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,wt=s.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  color: #ab9ff2;
  text-decoration: none;
  cursor: pointer;
`,L=s.section`
  display: flex;
  gap: 15px;
`,Kt=s.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`,Ot=5e3,_t=a=>{let{t:o}=f(),{showStakeAccountDeactivateStakeStatusModal:u,showStakeAccountDelegateStakeStatusModal:d,showStakeAccountWithdrawStakeStatusModal:r,closeAllModals:n}=dt(),{data:S}=tt(),v=(0,t.useMemo)(()=>S?.addresses.find(g=>J.isSolanaNetworkID(g.networkID)),[S]),{solanaPublicKey:ht,connection:b,networkID:N}=(0,t.useMemo)(()=>{let g=v?.address??"",Y=v?.networkID,It=et(ot(Y));return{solanaPublicKey:g,connection:It,networkID:Y}},[v]),Ct=X("solana"),{data:xt}=at({query:{data:Ct}}),{fungible:P}=nt({key:"SolanaNative"}),T=xt?.usd,A=St(b,ht),e=A.data?.find(g=>g.pubkey===a.stakeAccountPubkey),D=e?.info.meta.authorized.staker,bt=e?.lamports??0,H=parseFloat(e?.info.meta.rentExemptReserve??"0"),Pt=!!e?.inflationReward,{data:Tt=H}=it(v),W=typeof P?.data.balance<"u"&&P.data.balance.shiftedBy(P.data.decimals).gt(Tt+Ot),c=vt(b,e?.pubkey).data,Dt=c?.active??0,Wt=c?.inactive??0,B=bt-H-Dt,M=e?.info.stake?.delegation.voter,Bt=jt(b),m=M?Bt.get(M):void 0,K=new Date((e?.info.meta.lockup?.unixTimestamp??0)*1e3),U=st(e),O=(c?.state==="active"||c?.state==="activating")&&W,_=c?.state==="inactive"&&!U&&W,{data:Ut}=Z(N),{data:j}=R(N,e?.pubkey??""),I=[{key:"viewOnExplorer",label:o("stakeAccountViewViewOnExplorer",{explorer:Ut}),onClick:()=>{j&&self.open(j,"_blank")}}];e&&(m&&(c?.state==="inactive"||c?.state==="deactivating")&&I.push({key:"restake",label:o("stakeAccountViewRestake"),onClick:()=>{d({stakeAccountPubkey:e.pubkey,voteAccountPubkey:m?.voteAccountPubkey,lamports:c.inactive,onClose:n})}}),B>0&&B>Wt&&I.push({key:"withdrawUnstakedSOL",label:o("stakeAccountViewWithdrawUnstakedSOL"),onClick:()=>{r({stakeAccountPubkey:e.pubkey,amount:B,usdPerSol:T,onClose:n})}}));let Q=(0,t.useCallback)(()=>{!e||!D||u({stakeAccountPubkey:e.pubkey,stakeAuthorityPubkey:D,onClose:n})},[e,D,u,n]),q=(0,t.useCallback)(()=>{e&&r({stakeAccountPubkey:e.pubkey,amount:e.lamports,usdPerSol:T,onClose:n})},[e,r,T,n]);return A.isPending?t.default.createElement(C,null,t.default.createElement(ut,null)):A.isError?t.default.createElement(C,null,t.default.createElement(h,null,o("stakeAccountViewPrimaryText")),t.default.createElement(x,null,t.default.createElement(i,{size:16,color:"#777777",lineHeight:20},A.error?.message??o("stakeAccountViewError"))),t.default.createElement(L,null,t.default.createElement(p,{onClick:n},o("commandClose")))):A.isSuccess&&e?t.default.createElement(C,null,t.default.createElement(h,{items:I},o("stakeAccountViewPrimaryText")),m?t.default.createElement(t.default.Fragment,null,t.default.createElement(x,null,t.default.createElement(i,{size:16,color:"#777777",lineHeight:20},t.default.createElement(kt,{i18nKey:"stakeAccountViewSOLCurrentlyStakedInterpolated"},"Your SOL is currently staked with a validator. You\u2019ll need to unstake to ",t.default.createElement("br",null),"access these funds. ",t.default.createElement(wt,{href:F},"Learn more"))),t.default.createElement(E,{stakeAccountPubkey:e.pubkey,voteAccountPubkey:m?.voteAccountPubkey,validatorName:m?.info?.name,validatorKeybaseUsername:m?.info?.keybaseUsername,validatorIconUrl:m?.info?.iconUrl,status:c?.state,data:{"Stake Account":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},z(e.pubkey))},Balance:{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,e.lamports))},"Rent Reserve":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,e.info.meta.rentExemptReserve))},"Active Stake":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,c?.active))},Lockup:{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},U?V(K):"\u2013")},Rewards:Pt?{node:t.default.createElement(Kt,null,t.default.createElement(i,{color:"#21E56F",textAlign:"right",weight:500,size:14,noWrap:!0},"+",t.default.createElement(k,null,e?.inflationReward))),tooltip:o("stakeAccountCardRewardsTooltip")}:{node:t.default.createElement(i,{color:"#777777",textAlign:"right",weight:500,size:14,noWrap:!0},"\u2013")}}}),W?null:t.default.createElement(ct,{marginY:"base"},t.default.createElement(lt,{color:"accentAlert",children:o("stakeAccountInsufficientFunds")}))),t.default.createElement(yt,{canUnstake:O,canWithdrawStake:_,onClose:n,onUnstake:Q,onWithdrawStake:q})):t.default.createElement(t.default.Fragment,null,t.default.createElement(x,null,t.default.createElement(i,{size:16,color:"#777777",lineHeight:20},o("stakeAccountViewStakeInactive.part1")," ",t.default.createElement(wt,{href:F},o("stakeAccountViewStakeInactive.part2"))),t.default.createElement(E,{stakeAccountPubkey:e.pubkey,status:c?.state,data:{"Stake Account":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},z(e.pubkey))},Balance:{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,e.lamports))},"Rent Reserve":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,e.info.meta.rentExemptReserve))},"Active Stake":{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},t.default.createElement(k,null,c?.active))},Lockup:{node:t.default.createElement(i,{textAlign:"right",weight:500,size:14,noWrap:!0},U?V(K):"\u2013")}}})),t.default.createElement(yt,{canUnstake:O,canWithdrawStake:_,onClose:n,onUnstake:Q,onWithdrawStake:q}))):t.default.createElement(C,null,t.default.createElement(h,null,o("stakeAccountViewPrimaryText")),t.default.createElement(x,null,t.default.createElement(i,{size:16,color:"#777777",lineHeight:20},o("stakeAccountViewStakeNotFound"))),t.default.createElement(L,null,t.default.createElement(p,{onClick:n},o("commandClose"))))},Pe=_t,yt=a=>{let{t:o}=f(),{canUnstake:u,canWithdrawStake:d,onClose:r,onUnstake:n,onWithdrawStake:S}=a;return t.default.createElement(L,null,t.default.createElement(p,{onClick:r},o("commandClose")),u?t.default.createElement(p,{theme:"primary",onClick:n},o("stakeAccountViewActionButtonUnstake")):null,d?t.default.createElement(p,{theme:"primary",onClick:S},o("stakeAccountViewWithdrawStake")):null)},jt=a=>{let o=rt(a),u=o.results??[],d=(0,t.useRef)(u);return d.current=u,(0,t.useMemo)(()=>new Map(d.current.map(n=>[n.voteAccountPubkey,n])),[o.dataUpdatedAt,d])};export{_t as StakeAccountDetailPage,Pe as default};
//# sourceMappingURL=StakeAccountDetailPage-OMIOSUOF.js.map
