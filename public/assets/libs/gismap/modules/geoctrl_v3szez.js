/* 百度地图API V2 模块
 * 模块名称就是文件名
 * zhuanzhwu整理
 */
 _jsload2&&_jsload2('geoctrl', 'x.extend(Wb.prototype,{initialize:function(a){var b=this;Sb.prototype.initialize.call(b,a);b.za();b.mr={"default":z.ma+"images/geolocation-control/mobile/default-40x40.png",loading:z.ma+"images/geolocation-control/mobile/loading-40x40.gif",success:z.ma+"images/geolocation-control/mobile/success-40x40.png",fail:z.ma+"images/geolocation-control/mobile/fail-40x40.png"};b.pj=b.B.children[0];b.wD=b.pj.children[0];b.So=b.wD.children[0];b.uD=b.pj.children[1];b.dL=b.uD.children[0].children[0];var c;b.C.addEventListener("moveend", function(){if(c){var a=b.C.Ja();a.lng===c.lng&&a.lat===c.lat?b.Hr(b.mr.success):(b.Hr(b.mr["default"]),b.vQ())}});x.M(b.So,"click",function(){b.Hr(b.mr.loading);(new Geolocation({timeout:1E4})).getCurrentPosition(function(d){b.Hr(b.mr.success);if(d.address&&b.k.h_){var e="";d.address.city?e+=d.address.city:d.address.province&&(e+=d.address.province);d.address.district&&(e+=d.address.district);d.address.street&&(e+=d.address.street);d.address.street_number&&(e+=d.address.street_number);b.YT(e)}var e= new H(d.longitude,d.latitude),f=new T(e,{icon:b.k.AM?b.k.AM:new nc(z.ma+"images/geolocation-control/point/position-icon-14x14.png",new L(14,14))});c=e;b.xD=e;a.Ia(f);a.Cd(e,15);d.address&&(b.Xr={province:d.address.province||"",city:d.address.city||"",district:d.address.district||"",street:d.address.street||"",streetNumber:d.address.street_number||""},Pa(7001,{longitude:d.longitude,latitude:d.latitude,accuracy:d.accuracy}));d=new N("locationSuccess");d.point=b.xD;d.addressComponent=b.Xr;b.dispatchEvent(d)}, function(a){b.Hr(b.mr.fail);var c=new N("locationError");c.code=a.errorCode;c.message=a.jf;b.dispatchEvent(c)})});return b.B},location:function(){var a=this;a.W_.push({});(new Geolocation({timeout:1E4})).getCurrentPosition(function(b){a.xD=new H(b.longitude,b.latitude);b.address&&(a.Xr={province:b.address.province||"",city:b.address.city||"",district:b.address.district||"",street:b.address.street||"",streetNumber:b.address.street_number||""});b=new N("locationSuccess");b.point=a.xD;b.addressComponent= a.Xr;a.dispatchEvent(b)},function(b){var c=new N("locationError");c.code=b.errorCode;c.message=b.jf;a.dispatchEvent(c)})},SW:function(){return this.Xr?this.Xr:p},UP:function(){this.C?this.Ce(this.C):this.map&&this.Ce(this.map)},za:function(){Sb.prototype.za.call(this);this.B.style.cssText="height: 32px;";this.B.innerHTML=this.Rq()},Rq:function(){return[\'<div class="BMap_geolocationContainer" style="height: 32px; margin: 0px; box-sizing: border-box; border: 1px solid #d9d7d5; border-radius: 3px; -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,.2); overflow: hidden;">\', \'<div class="BMap_geolocationIconBackground" style="float: left; width: 32px; height: 32px; background-image: url(\\\'\'+z.ma+"images/geolocation-control/mobile/gradient-bg-1x64.png\'); background-size: 1px 32px; background-repeat: repeat-x;\\">",\'<div class="BMap_geolocationIcon" style="width: 32px; height: 32px; cursor: pointer; background-image: url(\\\'\'+z.ma+"images/geolocation-control/mobile/default-40x40.png\'); background-size: 20px 20px; background-repeat: no-repeat; background-position: center center;\\"></div>", "</div>",\'<div class="BMap_geolocationAddress" style="display: none; float: left; min-width: 50px; padding-left: 10px; padding-right: 10px; border-left: 1px solid #d9d7d5; background-image: url(\'+z.ma+\'images/geolocation-control/mobile/gradient-bg-1x64.png); background-size: 1px 32px; background-repeat: repeat-x;">\',\'<div style="height: 32px; display: table-cell; vertical-align: middle;"><div class="BMap_geolocationAddressText" style="font-size: 12px; color: #666666; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; display: block; min-width: 50px; max-width: 200px;"></div></div></div></div>\'].join("")}, Hr:function(a){this.So.style.backgroundImage="url(\'"+a+"\')"},YT:function(a){this.uD.style.display="block";this.dL.textContent=a},vQ:function(){this.dL.textContent="";this.uD.style.display="none"}});Wb.prototype.location=Wb.prototype.location;Wb.prototype.getAddressComponent=Wb.prototype.SW; ');
