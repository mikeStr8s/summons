import{S as e,P as o,W as t,A as n,O as a,M as r,G as s,a as d,R as x,b as l,s as z,V as m,r as h,D as c,F as i,c as M,B as w,d as y}from"./vendor.c1cc110f.js";const u=(e,o,t,n,s,d,x)=>{const l=new a;(new r).load(o,(o=>{o.preload(),l.setMaterials(o),l.load(e,(e=>{e.translateX(n.x),e.translateY(n.y),e.translateZ(n.z),e.rotateX(s.x),e.rotateY(s.y),e.rotateZ(s.z),e.scale.set(d,d,d);for(let o=0;o<e.children.length;o++)for(let t=0;t<e.children[o].material.length;t++)e.children[o].material[t].shininess=x;t.add(e)}))}))},f=(e,o,t,n)=>{const a=new x(e,o,t),r=new l(n);return new d(a,r)},_=(e,o,t,n)=>{const a=new z;a.setPoints([new m(e,t,0),new m(o,n,0)]);const r=new h({color:16711680,lineWidth:.01,fog:!0});return new d(a,r)},P=[{x:1.7866157573446673,z:-4.071564845329321},{x:-12.136566435662752,z:-.7516356528224621},{x:5.389445586123264,z:-14.189660375424188},{x:-11.852843686023443,z:-13.463418316770724},{x:7.270334474457498,z:-6.44793917556473},{x:-18.58020155056663,z:-18.79956957400577},{x:5.3492190718947885,z:-.9534928646799213},{x:-11.375388963968197,z:-2.5780722286084146},{x:4.388591783674314,z:-5.657858012590569},{x:-3.798528996460604,z:-18.04464138820219},{x:10.336249325405209,z:-1.0202380602410255},{x:-11.874529167938311,z:-10.729324822909359},{x:12.556634477434216,z:-9.934539336590712},{x:-5.576893826289884,z:-1.4308062529344268},{x:4.748434210645973,z:-2.726835252086399},{x:-11.941821792117025,z:-5.067437788835223},{x:9.662322229370428,z:-3.390595380201731},{x:-19.295364616093895,z:-3.3994519631283326},{x:7.691568905064447,z:-12.134126148870825},{x:-13.911617513762824,z:-8.893448598720163},{x:14.330807329184406,z:-5.243416901854818},{x:-18.04244655948947,z:-6.906598887012181},{x:13.639148779746604,z:-2.43385769062217},{x:-.9765015374218945,z:-17.25458068590975},{x:9.933082410561186,z:-14.591591028351502},{x:-12.899702912378084,z:-19.97826524159192},{x:19.432796880619083,z:-11.654347612968133},{x:-9.868923067027978,z:-19.079399634155617},{x:11.459710448365165,z:-11.29297147812551},{x:-11.345566644112996,z:-3.919449270513424},{x:14.144312320464543,z:-11.436589241977595},{x:-15.976965462160008,z:-13.794274640161234},{x:6.4603768082367985,z:-1.451270131115634},{x:-5.379182415946824,z:-4.816240210311462},{x:13.472099879477387,z:-2.2159483678677727},{x:-4.785138374556932,z:-14.008667913194163},{x:11.553676230087083,z:-3.546697094612412},{x:-9.45449304778163,z:-15.911167075950297},{x:10.158329669566482,z:-8.181614631387308},{x:-6.851819000346805,z:-13.170366130663307},{x:3.0722609751553525,z:-7.553214795335603},{x:-5.053675477608843,z:-4.881192430077617},{x:5.433879862700897,z:-1.9987827578549935},{x:-15.480478017049068,z:-13.576265894176009},{x:9.657878384371147,z:-11.12120845015735},{x:-15.23349125091013,z:-5.767702047150087},{x:1.9018707134490498,z:-16.184174736005005},{x:-11.801499760740132,z:-.7181597314083364},{x:19.265185997074642,z:-.648166334816076},{x:-13.37826023655242,z:-7.9408345299701555}],{scene:S,camera:T,renderer:b}=(()=>{const a=new e,r=new o(75,window.innerWidth/window.innerHeight,.1,1e3),s=new t({canvas:document.querySelector("#bg")});s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight);const d=new n(16777215,.5);return a.add(d),{scene:a,camera:r,renderer:s}})();S.fog=new i(0,1,10),T.position.set(0,.75,.5),T.lookAt(0,.25,-1);const g=new M(16711680,.3,20,2);g.position.set(0,.25,.5),S.add(g);for(let L=0;L<P.length;L++){const e=Math.floor(5*Math.random())+1,o=Math.floor(360*Math.random())+1,t={x:P[L].x,y:0,z:P[L].z+10};u(`models/CommonTree_Dead_${e}.obj`,`models/CommonTree_Dead_${e}.mtl`,S,t,{x:0,y:o,z:0},4,0)}for(let L=0;L<50;L++){const e=Math.floor(5*Math.random())+1,o=Math.floor(360*Math.random())+1,t=L%2==0?1e3*Math.random()/100:1e3*Math.random()/100*-1,n=1e3*Math.random()/100*-1;u(`models/CommonTree_Dead_${e}.obj`,`models/CommonTree_Dead_${e}.mtl`,S,{x:t,y:0,z:n-5},{x:0,y:o,z:0},4,0)}u("models/TreeStump.obj","models/TreeStump.mtl",S,{x:3,y:0,z:-2},{x:0,y:0,z:0},1,0),u("models/WoodLog.obj","models/WoodLog.mtl",S,{x:1,y:0,z:-3},{x:0,y:1.25*Math.PI,z:0},1,0),u("models/Rock_6.obj","models/Rock_6.mtl",S,{x:-2,y:-2,z:-5},{x:0,y:0,z:0},4,0),u("models/Rock_1.obj","models/Rock_1.mtl",S,{x:-1,y:-2,z:-5.5},{x:0,y:90,z:0},4,0),u("models/Rock_1.obj","models/Rock_5.mtl",S,{x:-5,y:-2,z:-2},{x:0,y:0,z:0},4,0);for(let L=0;L<2e3;L++){const e="models/Grass_Short.obj",o="models/Grass_Short.mtl",t=Math.floor(360*Math.random())+1,n=Math.floor(2*Math.random())%2==0?1e3*Math.random()/100:1e3*Math.random()/100*-1,a=(10*Math.random()+15)/100*-1,r=Math.floor(2*Math.random())%2==0?1e3*Math.random()/100:1e3*Math.random()/100*-1;u(e,o,S,{x:n,y:a,z:r},{x:0,y:t,z:0},1,0)}const j=new w(500,5,500),p=new y({color:2963496,shininess:0}),R=new d(j,p);R.position.set(0,-2.5,0),S.add(R);const I=(()=>{const e=new s,o={color:16711680,side:c};e.add(f(1,.98,128,o)),e.add(f(.9,.88,128,o)),e.add(f(.5,.48,128,o)),e.add(f(.4,.38,128,o));for(let t=0;t<8;t++){const n={x:.8*Math.cos(Math.PI/4*t),y:.8*Math.sin(Math.PI/4*t)},a={x1:.7*Math.cos(Math.PI/4*t),x2:.7*Math.cos(Math.PI/4*(t+3)),y1:.7*Math.sin(Math.PI/4*t),y2:.7*Math.sin(Math.PI/4*(t+3))},r=f(.1,.08,128,o);r.position.set(n.x,n.y,0),e.add(r),e.add(_(a.x1,a.x2,a.y1,a.y2))}return e})();S.add(I),I.position.set(0,.25,-1),I.rotateX(Math.PI/2);const k=document.querySelector("#day-num"),D=document.querySelector("#hour-num"),q=document.querySelector("#minute-num"),H=document.querySelector("#second-num");!function e(){requestAnimationFrame(e),b.render(S,T);const o=new Date;let t=new Date("2021-08-01T16:00:00+04:00")-o;k.innerHTML=Math.floor(t/864e5),t%=864e5,D.innerHTML=Math.floor(t/36e5),t%=36e5,q.innerHTML=Math.floor(t/6e4),t%=6e4,H.innerHTML=Math.floor(t/1e3)}();
