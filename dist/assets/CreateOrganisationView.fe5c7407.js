import{r as a,o as p,c as g,b as e,w as u,v as _,t as d,l as f,e as y}from"./index.8e29202f.js";const O=e("h1",null," Crea un'organizzazione ",-1),b=e("br",null,null,-1),x={style:{float:"left","margin-right":"20px"}},T=e("label",null," Nome organizzazione ",-1),k={style:{float:"left","margin-right":"20px"}},w=e("label",null," Numero di impiegati ",-1),C=e("br",null,null,-1),N={style:{color:"red"}},S={style:{color:"white"}},V={__name:"CreateOrganisation",setup(m){const c={}.VITE_API_HOST||"http://localhost:8080",s=a(""),l=a(""),i=a(""),r=a("");function v(){i.value="",r.value="",z(s.value,l.value).catch(n=>console.log(n))}async function z(n,o){(await fetch(c+"/organisation",{method:"POST",headers:{"Content-Type":"application/json","x-access-token":f.token},body:JSON.stringify({name:n,employee_num:o})})).ok?r.value="Organizzazione creata con successo":i.value="Errore nella creazione dell'organizzazione"}return(n,o)=>(p(),g("form",null,[O,b,e("div",x,[T,u(e("input",{"onUpdate:modelValue":o[0]||(o[0]=t=>s.value=t),placeholder:"Nome"},null,512),[[_,s.value]]),e("button",{type:"button",onClick:v},"Crea organizzazione")]),e("div",k,[w,u(e("input",{"onUpdate:modelValue":o[1]||(o[1]=t=>l.value=t),placeholder:"0"},null,512),[[_,l.value]])]),C,e("span",N,d(i.value),1),e("span",S,d(r.value),1)]))}},U={__name:"CreateOrganisationView",setup(m){return(h,c)=>(p(),g("main",null,[y(V)]))}};export{U as default};