import{d as p,o as c,c as d,a as P,t as b,b as h,_ as v,u as S,r as u,e as _,n as f,f as $,g as B,h as C,F as L,i as k,j as m,w as y,p as W,k as R,l as D}from"./index-65f4eaf3.js";import{a as w,s as I}from"./axios-8938ec0c.js";const N=["id"],T=p({__name:"InputField",props:{input:null},setup(s){return(o,t)=>(c(),d("label",null,[P(b(s.input.field)+" ",1),h("input",{id:s.input.inputId,class:"form-input",type:"text"},null,8,N)]))}}),V=v(T,[["__scopeId","data-v-40025745"]]),z=p({__name:"Loading",setup(s){const o=S(),t=u(!1),a=u(!1),i=u(!1);return o.$subscribe((l,g)=>{switch(g.currState){case"Loading":t.value=!0,i.value=!1;break;case"Welcome":t.value=!1,a.value=!0;break;case"Wrong Password":t.value=!1,i.value=!0}}),(l,g)=>(c(),d("div",{class:f(["loading-container",{isLoading:t.value,isResult:a.value,failed:i.value}])},b(_(o).currLoginState),3))}}),E=v(z,[["__scopeId","data-v-4533c532"]]),j=p({__name:"Button",props:{buttonProps:null},setup(s){const o=s,t=o.buttonProps.height===void 0?10:o.buttonProps.height,a=o.buttonProps.width===void 0?2:o.buttonProps.width;return(i,l)=>(c(),d("div",{class:f(["button",{disabled:o.buttonProps.disabled}]),style:$({height:`${_(a)}rem`,width:`${_(t)}rem`})},[h("p",null,b(s.buttonProps.text),1)],6))}}),M=v(j,[["__scopeId","data-v-318bd1fa"]]),O=p({__name:"Form",props:{FormInfos:null},setup(s){const o=s,t=[],a=S(),i=B(),l=u(!1);function g(){l.value=!0,a.setLoginState("Loading");let n=x();w({method:"post",url:I+"/authenticate",data:n,withCredentials:!0,validateStatus:function(e){return e<500}}).then(e=>{e.status==200?(console.log(e),a.setLoginState("Welcome"),i.setId(e.data.id)):e.status==404?(console.log("non exist, now registering"),a.setLoginState("Registering.."),w({method:"post",url:I+"/register",data:n,withCredentials:!0}).then(r=>{r.status==200?(a.setLoginState("Welcome"),i.setId(r.data.id)):console.log("server error")})):e.status==401&&a.setLoginState("Wrong Password")}).finally(()=>{l.value=!1})}C(()=>{o.FormInfos.map((n,e)=>t.push({field:n.field,value:n.value,inputId:e.toString()}))});const x=()=>{const n={};return t.map(e=>{console.log(e);let r=e.inputId,F=document.getElementById(r).value;n[e.field]=F}),n};return(n,e)=>(c(),d(L,null,[(c(),d(L,null,k(t,r=>m(V,{input:r},null,8,["input"])),64)),m(M,{buttonProps:{text:"Login",disabled:l.value},onClick:g},null,8,["buttonProps"])],64))}}),U=s=>(W("data-v-02fdbb62"),s=s(),R(),s),q=U(()=>h("p",{class:"header"},"Chatroom",-1)),A=p({__name:"Login",setup(s){const o=D();u(!1);const t=S(),a=u(!1);return y(()=>t.isSuccess,()=>{t.isSuccess&&(console.log("switching animation"),a.value=!0,setTimeout(()=>o.push("/chat"),1e3))}),(i,l)=>(c(),d("div",{class:f(["login-container base-shadow-div",{SwitchToChat:a.value}])},[q,m(E),h("div",{class:f({"form-wrapper":!0,"loading-state-transition":_(t).isLoading})},[m(O,{FormInfos:[{field:"username",value:""},{field:"password",value:""}]})],2)],2))}}),J=v(A,[["__scopeId","data-v-02fdbb62"]]);export{J as default};
