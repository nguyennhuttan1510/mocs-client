(this.webpackJsonpmocs=this.webpackJsonpmocs||[]).push([[21],{245:function(e,c,t){"use strict";t.d(c,"a",(function(){return i}));var s=t(298),n=t.n(s),i={Date:function(e){return n()(e).format("DD-MM-YYYY, h:mm a")},Money:function(e){return(new Intl.NumberFormat).format(e)},upCaseFirst:function(e){return e.toLowerCase().split(" ").map((function(e){return e[0].toUpperCase()+e.slice(1)})).join(" ")}}},266:function(e,c,t){"use strict";t.d(c,"a",(function(){return n}));var s=t(302),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"success",c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";s.a[e]({message:c,description:t})}},595:function(e,c,t){},736:function(e,c,t){"use strict";t.r(c);var s=t(7),n=t.n(s),i=t(50),a=t(208),r=t(764),j=t(357),l=t(358),d=t(84),b=t(245),h=t(266),o=t(0),O=t(6),u=(t(595),t(5)),x=[1,2,3,4];c.default=function(e){var c=Object(o.useState)({}),t=Object(a.a)(c,2),s=t[0],p=t[1],f=Object(O.h)().id;return Object(o.useEffect)((function(){(function(){var e=Object(i.a)(n.a.mark((function e(){var c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.getStaff(f);case 2:(c=e.sent).status?p(c.data):Object(h.a)("error","Failed",c.message);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(u.jsx)("div",{className:"profile-page",children:Object(u.jsxs)(j.a,{justify:"space-around",children:[Object(u.jsx)(l.a,{span:6,children:Object(u.jsxs)("div",{className:"salary",children:[Object(u.jsx)("div",{className:"title",children:Object(u.jsx)("h3",{children:"Salary Table"})}),Object(u.jsxs)("div",{className:"info",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Top range:"}),Object(u.jsx)("div",{children:x.map((function(){return Object(u.jsx)(r.a,{})}))})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Salary:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:b.a.Money(s.salary)||0})})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Bonus:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:b.a.Money(s.bonus)||0})})]})]})]})}),Object(u.jsx)(l.a,{span:6,children:Object(u.jsxs)("div",{className:"profile",children:[Object(u.jsx)("div",{className:"title",children:Object(u.jsx)("h2",{style:{fontSize:"2.3vw"},children:"Profile"})}),Object(u.jsx)("div",{className:"avatar",style:{backgroundImage:s.avatar?'url("'.concat("https://mocsproduct.herokuapp.com",'/public/uploads/1626881544984-1f1d4099-6fb5-45e8-9bdb-ab5e155c291d.jpg")'):"black"}})]})}),Object(u.jsx)(l.a,{span:6,children:Object(u.jsxs)("div",{className:"detail",children:[Object(u.jsx)("div",{className:"title",children:Object(u.jsx)("h3",{children:"Detail"})}),Object(u.jsxs)("div",{className:"info",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Full Name:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:s.name||"No Data"})})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Age:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:"20"})})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Phone:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:s.phone||"No phone"})})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Position:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:s.position||"No position"})})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("span",{children:"Created At:"}),Object(u.jsx)("h4",{children:Object(u.jsx)("b",{children:b.a.Date(s.createdAt)||"Null"})})]})]})]})})]})})}}}]);
//# sourceMappingURL=21.164b027b.chunk.js.map