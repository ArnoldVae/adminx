!function(a,b,c){"use strict";function d(a){var b,c,d,e,h,l,m,n=[],o=0;b=j.createDiv(),b.style.overflow="hidden";var p=a.getView();p.insertBefore(b,a.getCanvas()),c=i.Default.createDiv(),c.style.WebkitTransformStyle="preserve-3d",c.style.MozTransformStyle="preserve-3d",c.style.transformStyle="preserve-3d",b.appendChild(c),[{event:"mousedown",style:"none"},{event:"mouseup",style:"auto"},{event:"touchstart",style:"none"},{event:"touchend",style:"auto"}].forEach(function(a){var c=a.style;k.addEventListener(p,a.event,function(){b.style.pointerEvents=c})}),this.updateWebView=function(){if(a.getWidth()&&a.getHeight()){var g=a.getCanvas(),i=1*g.style.width.slice(0,-2),j=1*g.style.height.slice(0,-2);(n[0]!==i||n[1]!==j)&&(n[0]=i,n[1]=j,b.style.width=i+"px",b.style.height=j+"px",c.style.width=i+"px",c.style.height=j+"px");var k=a._projectMatrix[5]*n[1]/2;k!==d&&(d=k,b.style.WebkitPerspective=d+"px",b.style.MozPerspective=d+"px",b.style.perspective=d+"px"),l="translateZ("+d+"px)"+f(a._viewMatrix);var p=l+"translate("+n[0]/2+"px,"+n[1]/2+"px)";e===p||h||(c.style.WebkitTransform=p,c.style.MozTransform=p,c.style.transform=p,e=p),o++,m=!1,a.dm().each(function(a){a.isWebView&&r(a)});for(var q,s=c.children,t=[],u=0,v=s.length;v>u;u++)q=s[u],q._isHtWebView&&q._renderCookie!==o&&t.push(q);t.length&&t.forEach(function(a){c.removeChild(a)})}};var q=new Array(16),r=function(a){var b=a.getAttach();if(b){b.parentElement!==c&&c.appendChild(b),b._renderCookie=o,m=!0;var d=a.getFinalScale3d(),e=a._prefrenceSize;e&&e[0]?e[1]||(e[1]=e[0]/d[0]*d[1]):e=[d[0],d[1]],b.style.width=e[0]+"px",b.style.height=e[1]+"px";var f=1/e[0],i=1/e[1],j=1,k=a.mat;q[0]=k[0]*f,q[1]=k[1]*f,q[2]=k[2]*f,q[3]=k[3]*f,q[4]=k[4]*i,q[5]=k[5]*i,q[6]=k[6]*i,q[7]=k[7]*i,q[8]=k[8]*j,q[9]=k[9]*j,q[10]=k[10]*j,q[11]=k[11]*j,q[12]=k[12],q[13]=k[13],q[14]=k[14],q[15]=k[15];var p=g(q,h?"translate("+n[0]/2+"px,"+n[1]/2+"px)"+l:""),r=b.$a2;r!==p&&(b.$a2=p,b.style.WebkitTransform=p,b.style.MozTransform=p,b.style.transform=p)}}}function e(a){return Math.abs(a)<1e-10?0:a}function f(a){var b=a;return"matrix3d("+e(b[0])+","+e(-b[1])+","+e(b[2])+","+e(b[3])+","+e(b[4])+","+e(-b[5])+","+e(b[6])+","+e(b[7])+","+e(b[8])+","+e(-b[9])+","+e(b[10])+","+e(b[11])+","+e(b[12])+","+e(-b[13])+","+e(b[14])+","+e(b[15])+")"}function g(a,b){var c=a,d="matrix3d("+e(c[0])+","+e(c[1])+","+e(c[2])+","+e(c[3])+","+e(-c[4])+","+e(-c[5])+","+e(-c[6])+","+e(-c[7])+","+e(c[8])+","+e(c[9])+","+e(c[10])+","+e(c[11])+","+e(c[12])+","+e(c[13])+","+e(c[14])+","+e(c[15])+")";return"translate(-50%,-50%)"+(b||"")+d}var h="ht",i=a[h],j=i.Default,k=j.getInternal(),l=k.superCall,m=i.graph3d.Graph3dView,n=m.prototype.validateImpl;m.prototype.validateImpl=function(){n.call(this);var a=this._webViewRenderer;a||(a=this._webViewRenderer=new d(this)),a.updateWebView()};var o=i.WebView3d=function(){var a=this;l(o,a),a.s({shape3d:"billboard","shape3d.reverse.flip":!0})},p=[1,1,1,1],q=[0,0,0,0];j.def(h+".WebView3d",i.Node,{ms_ac:["attach"],isWebView:!0,attachDOM:function(a,b,c){if(!a)return this.detachDOM();if("string"==typeof a){var d=document.createElement("iframe");d.src=a,a=d}var e=a.style;e.position="absolute",e.border=0,e.outline=0,e.padding=0,e.margin=0,a._isHtWebView=!0,this.setAttach(a),this._prefrenceSize=[b,c],this.s("shape3d.blend",q)},detachDOM:function(){this.setAttach(null),this.s("shape3d.blend",this.getBgColor())},setBgColor:function(a){this.a("defaultBgColor",a),this.getAttach()||this.s("shape3d.blend",a)},getBgColor:function(){return this.a("defaultBgColor")||p}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);