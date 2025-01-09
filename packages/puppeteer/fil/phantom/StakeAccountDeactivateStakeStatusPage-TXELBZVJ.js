import{a as B}from"./chunk-R3J4EMVA.js";import{a as g}from"./chunk-43DCCALR.js";import{a as U,b as K,c as F}from"./chunk-O5AAGNHJ.js";import"./chunk-Q3HNV7GN.js";import"./chunk-XJWRT6N6.js";import{a as H,f as _}from"./chunk-QINBGLLG.js";import"./chunk-SHAEZV7V.js";import"./chunk-75L54KUM.js";import"./chunk-ROF5SDVA.js";import"./chunk-HPOS2V3B.js";import"./chunk-XYJX6G2K.js";import"./chunk-W27Z2YZM.js";import"./chunk-H3FFS4GT.js";import{a as z}from"./chunk-4VDZJDFB.js";import"./chunk-GMBAJ6CC.js";import{b as f}from"./chunk-PTZMRZUV.js";import"./chunk-OKP6DFCI.js";import{rb as A}from"./chunk-WIQ4WVKX.js";import{r as O}from"./chunk-HRJWTAGT.js";import"./chunk-LURFXJDV.js";import"./chunk-V5T43K7V.js";import"./chunk-MNXYIK2W.js";import"./chunk-MHOQBMVI.js";import"./chunk-GQEPK4C4.js";import"./chunk-BTKBODVJ.js";import"./chunk-7ZN4F6J4.js";import{M as x,N,i as L,j as I}from"./chunk-OUYKWOVO.js";import"./chunk-WFPABEAU.js";import"./chunk-THLBAMDB.js";import"./chunk-X2SBUKU4.js";import"./chunk-OXFZHPMY.js";import"./chunk-OYGO47TI.js";import"./chunk-SLQBAOEK.js";import{$d as E,P as u,Pa as p}from"./chunk-MZZEJ42N.js";import"./chunk-E3NPIRHS.js";import{m as P}from"./chunk-56SJOU6P.js";import"./chunk-ALUTR72U.js";import"./chunk-N7UFQNLW.js";import"./chunk-L3A2KHJO.js";import"./chunk-4P36KWOF.js";import{a as W}from"./chunk-7X4NV6OJ.js";import"./chunk-UNDMYLJW.js";import{f as J,h as C,n as T}from"./chunk-3KENBVE7.js";C();T();var e=J(W());var X=n=>{let r={stakePubkey:n.stakeAccountPubkey,stakeAuthorityPubkey:n.stakeAuthorityPubkey,onClose:n.onClose},{t}=P(),{deactivateStake:c,needsLedgerApproval:k,txHash:i,confirmationStatus:s,isError:l,error:d,onDeny:a}=Z(r);if(k)return e.default.createElement(K,{ledgerAction:c,cancel:a});if(l){let o=d,S=o?.message,m=U(o),y=o?.message.includes(I),w=o?.message.includes(L);return m?e.default.createElement(F,{ledgerActionError:o,onRetryClick:c,onCancelClick:a}):y||w?e.default.createElement(B,{onCancelClick:a}):e.default.createElement(f,{icon:"error",title:t("stakeAccountDeactivateStakeUnstakingFailed"),onClose:a,iconSize:"large"},e.default.createElement(A,{wordBreak:"break-word",color:"#777777",size:16,lineHeight:20.8},S??t("stakeAccountDeactivateStakeUnstakingFailedDescription")),e.default.createElement(g,{txHash:i},t("stakeAccountDeactivateStakeViewTransaction")))}return s==="confirmed"||s==="finalized"?e.default.createElement(f,{icon:"success",title:t("stakeAccountDeactivateStakeSolUnstaked"),onClose:n.onClose,iconSize:"large"},e.default.createElement(A,{wordBreak:"break-word",color:"#777777",size:16,lineHeight:20.8},e.default.createElement(z,{i18nKey:"stakeAccountDeactivateStakeSolUnstakedDescriptionInterpolated"},"You will be able to withdraw your stake",e.default.createElement("br",null)," in the next couple days once the stake account becomes inactive.")),e.default.createElement(g,{txHash:i},t("stakeAccountDeactivateStakeViewTransaction"))):e.default.createElement(f,{icon:"loading",title:t("stakeAccountDeactivateStakeUnstakingSol"),onClose:n.onClose,iconSize:"large"},e.default.createElement(A,{wordBreak:"break-word",color:"#777777",size:16,lineHeight:20.8},t("stakeAccountDeactivateStakeUnstakingSolDescription")),e.default.createElement(g,{txHash:i},t("stakeAccountDeactivateStakeViewTransaction")))},ge=X,Z=({onClose:n,...r})=>{let{data:t,isSuccess:c}=E(),{accountIdentifier:k,isLedgerAccount:i,solanaChainAddress:s,solanaPublicKey:l,connection:d,networkID:a}=(0,e.useMemo)(()=>{let Q=t?.identifier??"",h=(t?.addresses??[]).find(G=>p.isSolanaNetworkID(G.networkID)),Y=new u.PublicKey(h?.address??""),j=t?.type==="ledger",v=h?.networkID,q=x(N(v));return{accountIdentifier:Q,isLedgerAccount:j,solanaChainAddress:h,solanaPublicKey:Y,connection:q,networkID:v}},[t]),o=H(d),S=(0,e.useCallback)(()=>{o.mutate({...r,accountIdentifier:k,senderAddress:s,stakePubkey:new u.PublicKey(r.stakePubkey),stakeAuthorityPubkey:new u.PublicKey(r.stakeAuthorityPubkey),authorizedPubkey:l})},[k,r,o,s,l]),m=O(),y=(0,e.useCallback)(()=>{m.denied({chainType:"solana",chainName:"solana",networkId:p.getSolanaNetworkIDValue(a),type:"undelegate"}),n()},[a,n,m]);(0,e.useEffect)(()=>{if(c){if(!t||!s)throw new Error("Selected account undefined when trying to perform stake transaction.");i||S()}},[c]);let b=o.data?.id,D=_(d,2e3,b),M=i&&(o.isIdle||o.isPending),V=D.data?.value?.confirmationStatus;return{deactivateStake:S,onDeny:y,needsLedgerApproval:M,txHash:b,confirmationStatus:V,isError:o.isError??D.isError,error:o.error??D.error}};export{X as StakeAccountDeactivateStakeStatusPage,ge as default};
//# sourceMappingURL=StakeAccountDeactivateStakeStatusPage-TXELBZVJ.js.map