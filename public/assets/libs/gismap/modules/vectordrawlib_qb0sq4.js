/* 百度地图API V2 模块
 * 模块名称就是文件名
 * zhuanzhwu整理
 */
 _jsload2&&_jsload2('vectordrawlib', 'function zf(a){this.ZH=o;this.k=x.object.extend(a||{},{Xf:o});Ec.call(this,this.k);this.zg={};this.loaded=q;this.Bt=p;this.YB=q;this.VJ={road:"rd",water:"wt",building:"bd",land:"ld",government:"gv",point:"pts"};this.SE={market:"mt",food:"fd",communications:"cm",hotel:"ht",attractions:"at",recreation:"rc"}}zf.prototype=new Ec; zf.prototype.qa=function(a){if(!this.loaded){this.loaded=o;var b=this;b.map=a;b.bb=b.map.bb;b.map=a;b.Tw=q;b.vK=p;b.ne="df";b.k.poiElements&&b.k.poiElements.name&&(b.ne=b.SE[b.k.poiElements.name]);b.Oe=b.k.style||"normal";b.ln=b.k.styleStr||p;b.bq=200;b.Dg=p;b.Yd=0;b.vb=this.bb.Mn(0);b.Md=this.bb.Mn(10);b.bb.md.appendChild(this.vb);b.bb.md.appendChild(this.Md);b.bb.vb=b.vb;b.bb.Md=this.Md;b.Ib=new z.VectorDrawLib;b.es="";b.k.features&&(b.es=b.TW(b.k.features));b.Ib.nC=b.Oe;b.Yl();b.Oe&&"normal"!== b.Oe||b.ln&&0<b.ln.length?b.Kt(b.Oe,b.ln,function(){b.map.addEventListener("click",function(a){b.Yd++;if(b.Yd===1)b.Dg=setTimeout(function(){b.pu(a);b.Yd=0},b.bq);else{clearTimeout(b.Dg);b.Yd=0;return q}});b.vb.innerHTML="";b.Md.innerHTML="";b.Zd(o)}):(b.Zd(),b.map.addEventListener("click",function(a){b.Yd++;if(b.Yd===1){if(!a.$a)b.Dg=setTimeout(function(){b.pu(a);b.Yd=0},b.bq)}else{clearTimeout(b.Dg);b.Yd=0;return q}}));b.map.K.nj&&(G()&&b.Df==j)&&(b.Df=new z.sG(b.map),b.map.Ia(b.Df))}}; x.extend(zf.prototype,{Yl:function(){var a=this;setTimeout(function(){a.map.addEventListener("poilayervisiblechange",function(b){a.rV(b)});a.map.addEventListener("moveend",function(){a.Zd()});a.map.addEventListener("zoomend",function(){a.my();a.Tw=q;a.Zd(o)});a.map.addEventListener("onresize",function(){a.Zd()});Ta()&&(a.map.addEventListener("onmoving",function(){a.Zd()}),a.map.addEventListener("onmaptypechange",function(){a.Zd()}));a.map.addEventListener("mousemove",function(b){a.map.Ub()&&a.FC(b)})}, 1);a.map.addEventListener("setcustomstyles",function(b){a.oC(b.target)})},TW:function(a){for(var b="",c=0,d=a.length;c<d;c++)b=b+this.VJ[a[c]]+",";b&&(this.Ib.bi=b);return b},Kt:function(a,b,c){if(this.map.Ub()){var d=this,e=z.Hc+"custom/",f;b&&0<b.length?(f="setStyle_"+b.length,e+="mapstyle?styles="+encodeURIComponent(b)):(f="setStyle_"+a,e+="getstyle?customid="+a);f+=this.map.ba;window[f]=function(b,e){var k=x.extend({},d.Ib.nz);d.Ib.Db=x.extend(k,b);k=z.Bb.qe(d.Ib.Db["3181"][1]);d.map.K.zo=k;d.map.Na().style.backgroundColor= k;c(a);d.map.dispatchEvent(new N("onsetmapstylesuccess",e));delete window[f]};Qb(e+("&callback="+f+"&udt=20150116"),q)}},KN:function(a){if(this.map.Ub()){for(var b="",c=0,d=a.length;c<d;c++)b=b+(this.VJ[a[c]]||"")+",";b==this.es&&""==!b||(""==b&&(b="no"),this.es=b,this.Ib.bi=b,this.Ib.As({bg:this.fx(this.vb),poi:this.fx(this.Md)},this.bb,this.ne))}},SN:function(a){if(a.name&&this.SE[a.name]){var b=this.SE[a.name];if(a.styles.visibility==o&&this.ne!==b&&-1<this.es.indexOf("pts")){this.ne=b;if(this.Md)for(var c= [],d=[],a=this.Md.childNodes,b=0,e=a.length;b<e;b++){var f=a[b].id.split("_");c.push([f[1],f[2]]);d.push(a[b])}this.Ib.XC(c,d,this.ne,this.bb,p)}}},Ip:function(a){var b=this;b.Kt(a.style,a.styleStr,function(a){b.Oe=a;b.my();b.Ib.nC=b.Oe;var a=b.Ib.Js,d;for(d in a)delete a[d];"df"!==b.ne&&b.cE();b.$E()})},J3:function(a){var b=this,c=[],d=[],e=a.clickFea;b.vK=e;if(a.type){var f=x.$(e.tileId),g=e.tileId;if(b.ne==a.type){var i=Math.pow(2,18-b.map.Ka);b.f0();b.zg[g]={canvas:f,fea:e.fea};b.YK(e,i);var c= this.zg,k;for(k in c)d=x.$(k).getContext("2d"),b.Ib.km(d,c[k].fea,i,o);return}b.my();b.ne=a.type;b.zg[g]={canvas:f,fea:e.fea};b.YK(e,i)}else{b.lu();if("df"==b.ne)return;b.my();b.ne="df"}if(b.Md){i=b.Md.childNodes;k=0;for(a=i.length;k<a;k++)f=i[k].id.split("_"),c.push([f[f.length-3],f[f.length-2]]),d.push(i[k])}b.YB||(b.map.addEventListener("onclickicondrawed",function(a){var c=a.tarPoi.id;b.Tw=o;b.zg&&b.zg[c]&&(b.zg[c].fea=a.tarPoi.fea)}),b.YB=o);"df"==b.ne?b.lu():b.cE();b.Ib.XC(c,d,b.ne,b.bb,e)}, f0:function(){var a=this.zg,b=Math.pow(2,18-this.map.Ka),c;for(c in a)this.Ib.km(a[c].canvas.getContext("2d"),a[c].fea,b,q);for(var d in a)delete a[d]},my:function(){var a=this.zg;try{for(var b in a)delete a[b]}catch(c){}},YK:function(a){var b=a.tileId.split("_"),c=b.length,d=parseInt(b[c-3]),e=parseInt(b[c-2]),c=parseInt(b[c-1]),f=d-1,g=d+1,i=e-1,k=e+1,l=this.map.ba.replace(/^TANGRAM_/,""),b=x.$(l+"_poi_"+f+"_"+e+"_"+c),e=x.$(l+"_poi_"+g+"_"+e+"_"+c),m=x.$(l+"_poi_"+d+"_"+i+"_"+c),d=x.$(l+"_poi_"+ d+"_"+k+"_"+c),n=x.$(l+"_poi_"+f+"_"+i+"_"+c),f=x.$(l+"_poi_"+f+"_"+k+"_"+c),i=x.$(l+"_poi_"+g+"_"+i+"_"+c),c=x.$(l+"_poi_"+g+"_"+k+"_"+c);b&&this.lk(b,a.fea);e&&this.lk(e,a.fea);m&&this.lk(m,a.fea);d&&this.lk(d,a.fea);n&&this.lk(n,a.fea);f&&this.lk(f,a.fea);i&&this.lk(i,a.fea);c&&this.lk(c,a.fea)},lk:function(a,b){var c=this.qQ(a.Wd,b[5].u);c&&(this.zg[a.id]={canvas:a,fea:c})},qQ:function(a,b){try{if(a.length)for(var c=0,d=a.length;c<d;c++){var e=a[c];if(e[5]&&e[5].u&&e[5].u==b)return e}}catch(f){}}, rV:function(a){a.visible==q?(this.bb.md.removeChild(this.Md),this.ne=""):(this.bb.md.appendChild(this.Md),a=this.bb.xm(this.Md),this.Ib.XC(a.h4,a.g4,this.ne,this.bb))},Zd:function(a){this.map.fa();if(this.map.Ub()){this.vb.style.display="block";this.Md.style.display="block";this.S_(this.vb,this.Md);this.bb.wK={};var b=this.bb.xm(this.vb,"bg");poiVectorObj=this.bb.xm(this.Md,"poi");for(var c in this.zg)x.$(c)||delete this.zg[c];this.Ib.As({bg:b,poi:poiVectorObj,isZoomMap:a?o:q},this.bb,this.ne)}else{a= this.vb;b=this.Md;a.style.display="none";b.style.display="none";c=a.childNodes.length;for(c-=1;0<=c;c--){var d=a.childNodes[c];a.removeChild(d)}c=b.childNodes.length;for(c-=1;0<=c;c--)d=b.childNodes[c],b.removeChild(d)}},fx:function(a){if(a){for(var b=[],a=a.childNodes,c=0,d=a.length;c<d;c++){var e=a[c].id.split("_");b.push([e[e.length-3],e[e.length-2],a[c]])}return b}},$E:function(){this.map.Ub()&&this.Ib.As({bg:this.fx(this.vb),poi:this.fx(this.Md)},this.bb,this.ne)},S_:function(a,b){var c=q;if(a)for(var d= a.childNodes,e=0,f=d.length;e<f;e++)if(d[e].Xe==o){c=o;break}if(!c){c=b.childNodes;d=0;for(f=c.length;d<f;d++)c[d].Xe=q}},pu:function(a){this.map.K.nj&&(a=this.os(a),this.map.K.ww?this.map.K.ww(a):this.Mb(a))},Mb:function(a){a?(Ta()&&this.Qz(a),G()&&this.Df&&this.Df.switchTo(a)):G()&&this.Df&&this.Df.U()},FC:function(a){this.map.K.nj&&(this.os(a)?(this.map.platform.style.cursor="pointer",this.map.R.Mx=o):(this.map.R.Mx=q,this.map.platform.style.cursor!=this.map.K.Wb&&0==this.map.R.Ne.length&&(this.map.platform.style.cursor= this.map.K.Wb)))},Qz:function(a){var b=a.uid;if(b){ua=$a.Fi.ok(2);ua.cu();var c=this;$c.ab(function(d){ua.xO();c.zz(b,d,a);ua.Oy();ua.Xm()},{qt:"inf",uid:b,operate:"mapclick",clicktype:"vector"})}},zz:function(a,b,c){var d=this;if(b&&b.content){var e=b.content,f=e.pano||0,c=d.map.ub(c.point);if(!g)var g={};g.isFromMPC=o;var i=e.addr,g=e.street_id||"";if(1==e.poiType||3==e.poiType)i=P.unique(i.split(";")).join("; ");var k=e.tel;k&&(k=k.replace(/,/g,", "));d.Tq(e.cla);var l=K("div",{style:"font-size:12px;padding:5px 0;overflow:hidden;*zoom:1;"}), b=q;f&&(360>d.map.height?b=o:(f=[],f.push("<div class=\'panoInfoBox\' id=\'panoInfoBox\' title=\'"+e.name+"\\u5916\\u666f\' title=\'\\u67e5\\u770b\\u5168\\u666f\' >"),f.push("<img filter = \'pano_thumnail_img\' class=\'pano_thumnail_img\' width=323 height=101 border=\'0\' alt=\'"+e.name+"\\u5916\\u666f\' src=\'"+(z.url.proto+z.url.domain.pano[0]+"/pr/?qt=poiprv&uid="+g+"&width=323&height=101&quality=80&fovx=200")+"\' id=\'pano_"+a+"\'/>"),f.push("<div filter = \'panoInfoBoxTitleBg\' class=\'panoInfoBoxTitleBg\'></div><a href=\'javascript:void(0)\' filter=\'panoInfoBoxTitleContent\' class=\'panoInfoBoxTitleContent\' >\\u8fdb\\u5165\\u5168\\u666f&gt;&gt;</a>"), f.push("</div>"),l.innerHTML=f.join("")));i&&(f=K("p",{style:"padding:0;margin:0;line-height:18px;font-size:12px;color:#4d4d4d;"}),f.innerHTML="\\u5730\\u5740\\uff1a"+i,l.appendChild(f));k&&(f=K("p",{style:"padding:0;margin:0;line-height:18px;font-size:12px;color:#4d4d4d;"}),f.innerHTML="\\u7535\\u8bdd\\uff1a"+k,l.appendChild(f));e.tag&&(k=K("p",{style:"padding:0;margin:0;line-height:18px;font-size:12px;color:#4d4d4d;color:#7f7f7f;"}),k.innerHTML="\\u6807\\u7b7e\\uff1a"+e.tag,l.appendChild(k));a="http://api.map.baidu.com/place/detail?uid="+ a+"&output=html&source=jsapi&operate=mapclick&clicktype=vector";k="<div style=\'height:26px;\'><a href=\'"+a+"\' target=\'_blank\' style=\'font-size:14px;color:#4d4d4d;font-weight:bold;text-decoration:none;\' onmouseover=\'this.style.textDecoration=\\"underline\\";this.style.color=\\"#3d6dcc\\"\' onmouseout =\'this.style.textDecoration=\\"none\\";this.style.color=\\"#4d4d4d\\"\'>"+e.name+"</a>";a=new qc(l,{width:322,enableSearchTool:o,title:k+("<a href=\'"+a+"\' target=\'_blank\' style=\'font-size:12px;color:#3d6dcc;margin-left:5px;text-decoration:none;\' onmouseover=\'this.style.textDecoration=\\"underline\\"\' onmouseout =\'this.style.textDecoration=\\"none\\"\'>\\u8be6\\u60c5&raquo;</a>")+ "</div>",enableParano:b});b&&(a.street_id=g);a.addEventListener("open",function(){var a=x.$("panoInfoBox");if(a){var b=e.street_id||"";d.ZV("click",function(){Pa(5052);d.Bq(b)},a,"pano_thumnail_img|panoInfoBoxTitleBg|panoInfoBoxTitleContent")}});this.map.Mb(a,c)}},Bq:function(a){var b=z.tg("pano","scape/")[0],c=this,d=(new Date).getTime(),e="Pano"+d;z[e]=function(a){var b=c.map.rm(),a=a.content[0];b.rc(a.poiinfo.PID);b.show();b.Nc({heading:a.poiinfo.Dir,pitch:a.poiinfo.Pitch})};d=(new Date).getTime(); Qb(b+("?qt=poi&udt=20131021&uid="+a+"&t="+d+"&fn=BMap."+e),q)},Tq:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c][1]),c<d-1&&b.push(", ");return b.join("")},os:function(a){var b=this.Md.getElementsByTagName("canvas"),c=a.offsetX,d=a.offsetY,e=j,f=j;this.map.yb();for(var f=this.map.oa().k.Ob,g=0,i=b.length;g<i;g++){var k=this.Pf(b[g]);if(c>k.left&&c<=k.left+f&&d>k.top&&d<=k.top+f){e=b[g];break}}if(e==j||e.Wd==j)return q;f=e.Wd;b=0;for(i=f.length;b<i;b++){var c=f[b],d=c[0],g=c[1],l=this.Ib.Db[c[3]]|| window.Db[c[3]],m=l[0],l=this.Ib.Ss(l,this.Ib.Db[c[4]]||window.Db[c[4]])[1],n=c[5]||{};if(l==j||"empty"==l)break;if(2!=m&&(3!=m&&4!=m&&0<l.length&&n.u)&&(iconX=g[0]+k.left,iconY=g[1]+k.top,a.offsetX>=iconX-15&&a.offsetX<=iconX+15&&a.offsetY>=iconY-15&&a.offsetY<=iconY+15))return{type:c[5].c||"",name:d,uid:n.u||"",point:{x:iconX,y:iconY},clickFea:{tileId:e.id,tile:e,fea:c}}}return q},Lx:function(){return/M040/i.test(navigator.userAgent)},Pf:function(a){for(var b=a.offsetLeft,c=a.offsetTop,a=a.offsetParent;a&& a!=this.map.Na();)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return{top:c,left:b}},oC:function(a){if(this.map.Ub()){this.map.oa().k.Zb=18;var a=this.Bt=a,b;for(b in a)switch(b){case "style":this.Ip(a);break;case "styleStr":this.Ip(a);break;case "features":this.KN(a[b]);break;case "poiElements":this.SN(a[b])}}},cE:function(){this.lu();"dark"==this.Oe?x.D.Ta(this.vb,"light_gray_background"):x.D.Ta(this.vb,"gray_background")},lu:function(){x.D.Rb(this.vb,"gray_background");x.D.Rb(this.vb,"light_gray_background")}, ZV:function(a,b,c,d){var e=this;c.Mm||(c.Mm=[],c.handle={});c.Mm.push({filter:d,mm:b});c.handle[a]||(c.addEventListener(a,function(a){for(var b=a.target;b!=c;){e.Fb(c.Mm,function(c,d){RegExp(d.filter).test(b.getAttribute("filter"))&&d.mm.call(b,a,b.getAttribute("filter"))});b=b.parentNode}},q),c.handle[a]=o)},Fb:function(a,b){for(var c=0,d=a.length;c<d;c++)b(c,a[c])}});window.VectorLayer=zf;Af=1;Bf=2;Cf=3;Df=4;Ef=5; function Gf(){this.Hm=q;this.ct=[z.url.proto+z.url.domain.TILE_ONLINE_URLS[1]+"/"];this.QF=[z.url.proto+z.url.domain.TILE_ONLINE_URLS[1]+"/gvd/?",z.url.proto+z.url.domain.TILE_ONLINE_URLS[2]+"/gvd/?",z.url.proto+z.url.domain.TILE_ONLINE_URLS[3]+"/gvd/?",z.url.proto+z.url.domain.TILE_ONLINE_URLS[4]+"/gvd/?"];this.bb=p;this.qk={};this.map=p;this.Ue=this.lj=0;this.bi=p;this.Db=window.Db;this.nz=x.extend({},window.Db);this.dm={dark:{backColor:"#2D2D2D",textColor:"#bfbfbf",iconUrl:"vector/dicons"},normal:{backColor:"#F3F1EC", textColor:"#c61b1b",iconUrl:"vector/nicons_hd"},light:{backColor:"#EBF8FC",textColor:"#017fb4",iconUrl:"vector/licons"}};this.Js={};this.Ck=o;this.nk=p;this.Zl=/.*GT-I9300.*Version\\/\\d+.*Safari\\/\\d+\\.\\d+$/ig.test(navigator.userAgent)||/baiduboxapp/ig.test(navigator.userAgent)} Gf.prototype={As:function(a,b,c){this.cO=(new Date).getTime();var d=a.bg,e=a.poi;this.HF=d.length;this.lj=0;this.Ue=d.length;this.gK();this.Hm||(this.Hm=o,this.map=b.map,this.bb=b,this.yc=this.map.K.devicePixelRatio,0<this.Ue&&(this.Ob=parseInt(d[0][2].style.width,10)));this.map.yb();this.eO=0;this.UE=c;b=this.map.Ka;this.$m=Math.pow(2,18-b);this.Gj?this.Gj.length=0:this.Gj=[];this.Ck?ua.pc("vector_begin"):this.map.Ka!=this.map.Cc&&(this.JB=(new Date).getTime(),this.rf=G()?$a.Fi.ok(103):$a.Fi.ok(3), this.rf.cu());this.map.dispatchEvent(new N("onvectorbegin"));if(this.HF<=e.length)var f=0,g=this.Ue;else f=0,g=e.length;for(;f<g;f++)d[f][2].Xe=q,e[f][2].Xe=q,d[f][2].nq=(new Date).getTime(),e[f][2].nq=(new Date).getTime(),this.fy(d[f][0],d[f][1],d[f][2],b,e[f][2]||p,c,a.isZoomMap)},gK:function(){for(var a in this.qk)delete this.qk[a]},XC:function(a,b,c,d,e){this.Gj?this.Gj.length=0:this.Gj=[];this.cO=(new Date).getTime();var d=this.map.Ka,f=this.map.Ja(),f=new H(f.lng,f.lat);this.UE=c;this.nk=e; for(var e=0,g=a.length;e<g;e++){b[e].nq=(new Date).getTime();var i=a[e][0],k=a[e][1],l="_"+parseInt(i+""+k+""+d).toString(36);"df"==c&&this.qk[l]?(i=this.qk[l],b[e].Wd=i,this.oj(b[e]),this.Ko(i,b[e],d,p,f,d)):this.fy(i,k,b[e],d,p,c)}},fy:function(a,b,c,d,e,f){var g=this,i=g.QF,k=Math.abs(parseInt(a,10)+parseInt(b,10))%i.length,l="x="+a+"&y="+b+"&z="+d,m=g.map.ba.replace(/^TANGRAM_/,""),n="undefined"!=typeof TVC?TVC.QJ.y4:{},u=n.version?n.version:"002",n=n.mu?n.mu:"20150601",v="",w=m+(0>a?"_":"")+ (0>b?"$":"")+parseInt(Math.abs(a)+""+Math.abs(b)+""+d,10).toString(36);if(c&&e)if(g.bi)if("no"==g.bi)v="&layers=&features="+g.bi,c.Wd=p,e.Wd=p,this.Zl?(f=c.getContext("2d"),a=e.getContext("2d"),f.canvas.width=f.canvas.width,a.canvas.width=a.canvas.width,a=f=p):(g.oj(c),g.oj(e)),g.Ue=0;else if(-1<g.bi.indexOf("pts"))if("pts,"==g.bi)c.Wd=p,this.Zl?(v=c.getContext("2d"),v.canvas.width=v.canvas.width,v=p):g.oj(c),v="&layers="+f;else{g.Ue<2*g.HF&&(g.Ue*=2);a=g.bi.split(",");b="";v=0;for(m=a.length;v<m;v++)"pts"!= a[v]&&""!=a[v]&&(b=a[v]+","+b);v="&layers=bg,"+f+"&features="+b;b=a=p}else e.Wd=p,this.Zl?(v=e.getContext("2d"),v.canvas.width=v.canvas.width,v=p):g.oj(e),v="&layers=bg&features="+g.bi;else v="&layers=bg,"+f;else v="&layers="+f;var i=(i[k]?i[0]:i[k])+"qt=lgvd&"+l+"&styles=pl"+v+"&f=mwebapp&v="+u+"&udt="+n+"&fn=BMap."+w,k=g.map.Ja(),y=new H(k.lng,k.lat),C=g.map.fa();z[w]=function(a){var b=a.content;if(b){c.lq=(new Date).getTime();e&&(e.lq=(new Date).getTime());var f=g.map,a=f.Ja(),f=f.fa();if(!a.mb(y)|| f!=C){delete z[w];return}var a={},i;for(i in b)"df"==i&&(g.qk[w]=b[i]),a[i]=b[i];for(var k in a){i=a;for(var b=k,f=a[k],l=0,m=f.length;l<m;l++)for(var n=f[l][1],u=0,v=0,Qa=0,cb=n.length/2;Qa<cb;Qa++)u+=n[2*Qa]/10,v+=n[2*Qa+1]/10,n[2*Qa]=u,n[2*Qa+1]=v;i[b]=f;"bg"==k?c.mq=(new Date).getTime():e?e.mq=(new Date).getTime():c.mq=(new Date).getTime()}for(var Ya in a)"bg"==Ya?(c.Wd=a[Ya],c&&g.oj(c),g.Ko(a[Ya],c,d,p,y,C)):e!==p?(e.Wd=a[Ya],g.oj(e),g.Ko(a[Ya],e,d,p,y,C)):(c.Wd=a[Ya],c&&g.oj(c),g.Ko(a[Ya],c, d,p,y,C))}delete z[w]};Qb(i)},oj:function(a){var a=a.getContext("2d"),b=this.Ob*this.yc;this.Zl||(a.save(),a.clearRect(0,0,b,b),a.restore())},VC:function(a,b,c){a.fillStyle=c;a.fillRect(0,0,b,b)},Ko:function(a,b,c,d,e,f){b.WU=(new Date).getTime();var g=b.getContext("2d"),i=0;this.Zl?(g.canvas.width=g.canvas.width,g.scale(this.yc,this.yc)):1<this.yc&&!b.lg&&(g.scale(this.yc,this.yc),b.lg=o);g.textBaseline="bottom";-1<b.id.indexOf("bg")&&this.map.K.zo&&this.VC(g,this.Ob,this.map.K.zo);for(var k=this.Ck, l=a.length,d=0,m=this.Db;d<l;d++){var n=a[d],u=m[n[3]]||window.Db[n[3]],v=m[n[4]]||window.Db[n[4]];n.tc=u;n.Qc=v;if(u[0]==Cf)i++,this.km(g,n,p,f);else break}b.VU=(new Date).getTime();n=this.map.Ja();c=this.map.fa();if(n.mb(e)&&c==f){b.xZ=(new Date).getTime();for(var w=[];d<l;d++){var n=a[d],u=m[n[3]]||window.Db[n[3]],v=m[n[4]]||window.Db[n[4]];n.tc=u;n.Qc=v;17<=c&&(u[5]&&0<u[5].length&&1==u[5][0]&&6==u[5][1]&&v&&0<v.length)&&(u[5].length=0,u[6]=0,v[6]=0);if(u[0]==Bf)i++,w.push(n);else break}this.gF(g, w,c,this.$m);b.wZ=(new Date).getTime();n=this.map.Ja();c=this.map.fa();if(n.mb(e)&&c==f){for(b.XY=(new Date).getTime();d<l;d++)n=a[d],u=m[n[3]]||window.Db[n[3]],v=m[n[4]]||window.Db[n[4]],n.tc=u,n.Qc=v,n[5]&&n[5].u&&this.nk&&n[5].c==this.nk.fea[5].c?("df"!==this.nk.fea[5].c?this.km(g,n,this.$m,o,f):n[5].u==this.nk.fea[5].u?this.km(g,n,this.$m,o,f):this.km(g,n,this.$m,q,f),n[5].u==this.nk.fea[5].u&&(c=new N("onclickicondrawed"),c.tarPoi={id:b.id,fea:n,equal:this.DV(n[1],this.nk.fea[1])},this.map.dispatchEvent(c))): this.km(g,n,this.$m,q,f),i++;b.Xe=o;this.pZ();a=(new Date).getTime();b.WY=a;b.BG=a;a=b.lq-b.nq;f=b.mq-b.lq;__drawTime=b.BG-b.mq;this.Gj.push({id:b.id,downLoadTime:a,parseDataTime:f,drawTime:__drawTime,restRate:i+"/"+d,areaTime:b.VU-b.WU,roadTime:b.wZ-b.xZ,otherTime:b.WY-b.XY,timeline:{start:b.nq,downLoadComplete:b.lq,parseComplete:b.mq,drawComplete:b.BG}});this.eO++;1==this.eO&&(this.map.dispatchEvent(new N("onfirstvectorloaded")),k&&ua.pc("firstCanvas"));if(this.Ue==this.lj){if(k){this.Ck=q;ua.pc("vector_loaded"); for(d=f=a=k=b=i=0;c=this.Gj[d];d++)i+=c.parseDataTime,b+=c.drawTime,k+=c.areaTime,a+=c.roadTime,f+=c.otherTime;ua.pc("parseDataTime",i);ua.pc("drawTime",b);ua.pc("areaTime",k);ua.pc("roadTime",a);ua.pc("otherTime",f);d=this.map.yb();ua.pc("map_width",d.width);ua.pc("map_height",d.height);ua.pc("map_size",d.width*d.height);ua.Xm();z.Ij("cus.fire","time",{z_vectorfirstdrawtime:b})}d=(new Date).getTime()-this.cO;c=new N("onvectorloaded");c.HF=this.Ue;c.i4=d;c.d4=this.Gj;this.map.dispatchEvent(c);this.rf&& (this.rf.Oy(),this.rf.Xm(),this.rf=p,z.Ij("cus.fire","time",{z_vectorzoomtime:(new Date).getTime()-this.JB}));this.map.dispatchEvent(new N("ontilesloaded"))}}}},pZ:function(){this.lj++;2>=this.Ue-this.lj&&this.map.dispatchEvent(new N("onallvectorloaded"))},DV:function(a,b){var c=q;if(a.length&&b.length&&a.length==b.length){for(var d=0,e=a.length;d<e&&a[d]===b[d];d++);d==e&&(c=o)}return c},km:function(a,b,c,d,e){switch(b.tc[0]){case Cf:this.Ww(a,b,e);break;case Bf:this.oe(a,b[1],b.tc,b.Qc,b[2],c); break;case Df:this.UC(a,b);break;default:this.WC(a,b,d)}},Ww:function(a,b,c){var d=b.tc,e=d[2],b=b[1];a.fillStyle=z.Bb.qe(d[1]);a.beginPath();a.moveTo(b[0],b[1]);for(var d=2,f=b.length;d<f;d+=2)a.lineTo(b[d],b[d+1]);a.closePath();a.fill();0<e.length&&(a.strokeStyle=a.fillStyle,a.lineWidth=12<=c?3:e[3],a.stroke())},oe:function(a,b,c,d,e,f){if(c||d){var g=z.Bb.qe,i=z.Bb.lx,k=z.Bb.mx;if(this.ht(c,d))firstColor=backColor=(g=d&&d[5]&&0<d[5].length?o:q)?z.Bb.qe(c[1]):"rgba(0, 0, 0, 0)",backLineWidth=c[2], foreLineWidth=g?d[2]:c[2],intervalLen=g?d[5][0]:c[5][0],intervalColor=z.Bb.qe(g?d[1]:c[1]),c=Math.round(e/f),z.Bb.pW(a,b,intervalLen,backLineWidth,foreLineWidth,firstColor,c,backColor,intervalColor);else if(1==c[7])a.strokeStyle=g(c[1]),a.fillStyle=a.strokeStyle,a.lineWidth=c[2],a.lineCap=i(c[3]),a.lineJoin=k(c[4]),z.Bb.JK(a,b,a.lineWidth);else{a.beginPath();a.moveTo(b[0],b[1]);e=2;for(f=b.length;e<f;e+=2)a.lineTo(b[e],b[e+1]);a.strokeStyle=g(c[1]);a.lineCap=i(c[3]);a.lineJoin=k(c[4]);a.lineWidth= c[2];a.stroke();d&&(a.strokeStyle=g(d[1]),a.lineWidth=d[2],a.lineCap=i(d[3]),a.lineJoin=k(d[4]),a.stroke())}}},UC:function(a,b){var c=b[1],d=b.tc,e=z.Bb.qe,f=e(d[1]),g=e(d[2]),i=d[4],e=e(i[1]),i=i[2],d=d[5];z.Bb.YC(a,c,0,d,0,f,g,e,i)},WC:function(a,b,c){a.save();var d=b[1],e=b[0],f=b[2],b=this.Ss(b.tc,b.Qc),g=b[1],i=0;if(!("undefined"==typeof g||"number"==typeof g)){var k=-1<g.indexOf("biaopai");g.indexOf("ditie");if(0<g.length){var l="undefined"!=typeof TVC?TVC.QJ.a0:{},l=this.ct[g.length%this.ct.length]+ this.dm.normal.iconUrl+"/"+g+".png?v="+(l.version?l.version:"002")+"&udt="+(l.mu?l.mu:"201500601"),m=new Image,n=d[0],u=d[1];2<d.length&&(i+=2);var v=this;if(k)(function(a,b,c,d,e,f,g,i,k,l,n){m.onload=function(){c.drawImage(this,a-this.width/4,b-this.height/4,this.width/2,this.height/2);v.Bs(c,d,e,f,g,i,k,l,n);m.onload=p;delete m.onload;m=p}})(n,u,a,d,b,f,e,g,i,k,c),m.src=l;else{var w=v.Js[g];w?a.drawImage(w,n-w.width/4,u-w.height/4,w.width/2,w.height/2):(function(b,c,d){m.onload=function(){a.drawImage(this, b-this.width/4,c-this.height/4,this.width/2,this.height/2);d&&(v.Js[g]=m);m.onload=p;delete m.onload;m=p}}(n,u,v.Ck),m.src=l)}}!k&&(b[2]&&0<b[2].length)&&this.Bs(a,d,b,f,e,g,i,k,c)}a.restore()},Bs:function(a,b,c,d,e,f,g,i,k){var l=z.Bb.qe,m=c[2];if(e&&0<m.length){var n=[],c=m[2],u=m[3],v=m[4],m=m[5];n.push(z.Bb.qL(v));n.push(c+"px");i||n.push("Helvetica Neue,Arial,Hiragino Sans GB,\\u9ed1\\u4f53,sans-serif");a.font=n.join(" ");a.fillStyle=k?"#c61b1b":l(u);if(k=z.Bb.aM(v))a.strokeStyle=l(m),a.lineWidth= i?0.5:2;for(var f=-1<f.indexOf("biaopai_xiandao"),n=e.split("\\\\"),u=0,w=n.length,y=b.length;u<w&&g<y;u++){var C=b[g],A=b[g+1],e=n[u],e=a.measureText(e).width,B=c,g=g+2;10<d&&350>d&&this.OF(a,C,A,d);var D=1;z.Bb.$L(v)&&(z.Bb.XK(a,C-e/2,A-B/2,e,B,{fillStyle:l(m)}),D=0);f?(a.save(),a.scale(0.9,0.9),k&&a.strokeText(n[u],(C-e/2+1)/0.9,(A+B/2+1)/0.9),a.fillText(n[u],(C-e/2+1)/0.9,(A+B/2+1)/0.9),a.restore()):(D=i?2:D,k&&a.strokeText(n[u],C-e/2,A+B/2+D),a.fillText(n[u],C-e/2,A+B/2+D))}}},Ss:function(a,b){var c= [Af,"",[]];a&&(a[0]==Ef?c[2]=a:c=a);b&&(b[0]==Ef?c[2]=b:c[1]=b[1]);return c},OF:function(a,b,c,d){d=d/180*Math.PI;cv=Math.cos(d);sv=Math.sin(d);yy=xx=cv;xy=sv;yx=-sv;x0=b-b*cv-c*sv;y0=c+b*sv-c*cv;a.transform(xx,yx,xy,yy,x0,y0)},gF:function(a,b,c,d){if(16>=c)for(var c=0,e=b.length;c<e;){for(var f=b[c],g=this.Ws(f.tc,f.Qc),f=c+1;f<e;f++){var i=b[f];if(g!=this.Ws(i.tc,i.Qc))break}for(var k=c;k<f;k++){var l=b[k],m=l[1],g=l.tc,i=l.Qc;this.ht(g,i)?l.nE=o:this.oe(a,m,g,q)}for(k=c;k<f;k++)l=b[k],l.nE?this.oe(a, l[1],l.tc,l.Qc,l[2],d):this.oe(a,l[1],l.Qc,q);c=f}else{c=0;for(e=b.length;c<e;c++)f=b[c],g=f.tc,i=f.Qc,k=g[6]&1?o:q,i&&!k&&(k=i[6]&1?o:q),k?f.wE=o:this.oe(a,f[1],g,q);c=0;for(e=b.length;c<e;c++)f=b[c],g=f.tc,i=f.Qc,f.wE?this.oe(a,f[1],g,i,f[2],d):this.oe(a,f[1],i,q)}},Ws:function(a,b){if(!b)return 0;var c=a[6],d=b[6];if(1==c||1==d)return 1;switch(c){case 2:return 2==d?1:0;case 4:case 6:case 8:case 10:return 4<=d&&10>=d?1:0;default:return 0}},ht:function(a,b){return a&&0<a.length&&0<a[5].length||b&& 0<b.length&&0<b[5].length?o:q}};z.VectorDrawLib=Gf; ');
