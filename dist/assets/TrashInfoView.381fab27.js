import{r as u,l as h,o as r,c as l,b as o,t as n,w as g,f as $,F as p,g as y,a as T,e as v}from"./index.8e29202f.js";import{_ as z}from"./plugin-vue_export-helper.21dcd24c.js";const C={name:"TrashInfo",props:{org_name:String,plan_id:Number,trash_id:Number,zone_id:Number},methods:{classifyTrash:w},data(){return{trash_info:k(this.plan_id,this.trash_id,this.zone_id),wantToClassify:c,categories:b,classification:_}}},I={}.VITE_API_HOST||"http://localhost:8080",m=I,c=u(!1),b=u(["Plastica","Vetro","Carta","Metallo","Organico","Indifferenziato","Non riconosciuto"]),_=u("");function k(t,a,d){console.log(a);let f=u({});return fetch(m+"/rifiuto/toclassify?"+new URLSearchParams({id_zona:d}),{method:"GET",headers:{"Content-Type":"application/json","x-access-token":h.token}}).then(i=>i.json()).then(function(i){Array.isArray(i)||(i=[i]),console.log(i);for(let e=0;e<i.length;e++)i[e]._id===a&&(f.value=i[e])}).catch(i=>console.error(i)),console.log(f),h.currentTrash=a,f}function w(t){if(console.log("Chiamata a classifica rifiuto: "+c.value),!c.value){c.value=!0;return}console.log("Classificazione rifiuto: "+_.value),fetch(m+"/rifiuto/"+t,{method:"PATCH",headers:{"Content-Type":"application/json","x-access-token":h.token},body:JSON.stringify({classificazione:_.value})}).catch(a=>console.error(a)),c.value=!1,this.$router.replace("/organisations/"+this.org_name+"/plans/"+this.plan_id+"/toclassify")}const N=o("h1",null,"Dettagli rifiuto non riconosciuto",-1),S={style:{float:"right","margin-top":"-155px"}},V=o("h1",null,"Foto rifiuto",-1),P=["src"],A=o("br",null,null,-1),U={key:0},D=o("h2",null,"Classifica rifiuto",-1),L=["value"],O=o("br",null,null,-1);function B(t,a,d,f,i,e){return r(),l(p,null,[o("form",null,[N,o("ul",null,[o("li",null,"ID: "+n(t.$data.trash_info._id),1),o("li",null,"Zona: "+n(t.$data.trash_info.id_zona),1),o("li",null,"Stato classificazione: "+n(t.$data.trash_info.classificazione),1),o("li",null,"Posizione rilevata: "+n(t.$data.trash_info.posizione),1),o("div",S,[V,o("img",{src:t.$data.trash_info.URL_foto,width:"500",height:"400"},null,8,P)]),A,t.$data.wantToClassify?(r(),l("div",U,[D,g(o("select",{"onUpdate:modelValue":a[0]||(a[0]=s=>t.$data.classification=s)},[(r(!0),l(p,null,y(t.$data.categories,s=>(r(),l("option",{value:s},n(s),9,L))),256))],512),[[$,t.$data.classification]])])):T("",!0)])]),O,o("button",{style:{float:"left","margin-left":"30px"},onClick:a[1]||(a[1]=s=>e.classifyTrash(t.$data.trash_info._id))},"Classifica rifiuto")],64)}var E=z(C,[["render",B]]);const R={__name:"TrashInfoView",setup(t){return(a,d)=>(r(),l("main",null,[v(E,{org_name:a.$route.params.org_name,plan_id:a.$route.params.plan_id,trash_id:a.$route.params.trash_id,zone_id:a.$route.query.id_zona},null,8,["org_name","plan_id","trash_id","zone_id"])]))}};export{R as default};
