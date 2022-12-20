"use strict";(self.webpackChunkselectize_dev=self.webpackChunkselectize_dev||[]).push([[5560],{3636:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(7294),o=n(6010),l=n(5742);function i(){return(0,a.useEffect)((()=>{const e=$(".theme-changer button");e.off("click").on("click",(function(){if($(this).hasClass("active"))return;const t=$(this).data("theme");e.removeClass("active"),$(this).addClass("active"),$("link[data-theme]").remove();0===$("link[data-theme="+t+"]").length&&$("head").append(`<link data-theme="${t}" href="/css/selectize.${t}.css" rel="stylesheet">`)}))})),a.createElement(a.Fragment,null,a.createElement(l.Z,null,a.createElement("link",{rel:"stylesheet",href:"/css/selectize.css"}),a.createElement("link",{rel:"stylesheet","data-theme":"default",href:"/css/selectize.default.css"})),a.createElement("span",{className:(0,o.Z)("theme-changer","isolate inline-flex rounded-md shadow-sm mb-6")},[{src:"default",label:"Selectize",icon:"fak fa-selectize"},{src:"bootstrap2",label:"Bootstrap 2",icon:"fa-duotone fa-square-b"},{src:"bootstrap3",label:"Bootstrap 3",icon:"fa-duotone fa-square-b"},{src:"bootstrap4",label:"Bootstrap 4",icon:"fa-duotone fa-square-b"},{src:"bootstrap5",label:"Bootstrap 5",icon:"fa-duotone fa-square-b"}].map(((e,t)=>{const n=0===t?"active":"";return a.createElement("button",{className:(0,o.Z)(n,"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"),key:t,type:"button","data-theme":e.src},a.createElement("span",{className:(0,o.Z)(e.icon,"pr-2")}),e.label)}))))}},6224:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>m,default:()=>E,frontMatter:()=>c,metadata:()=>u,toc:()=>d});var a=n(7462),o=n(7294),l=n(3905),i=n(7819),s=n(3636);function r(){return(0,o.useEffect)((()=>{var e=function(e){return function(){console.log(e,arguments),$("#log").append('<div><span class="name">'+e+"</span></div>")}};$("#select-state").selectize({create:!0,onChange:e("onChange"),onItemAdd:e("onItemAdd"),onItemRemove:e("onItemRemove"),onOptionAdd:e("onOptionAdd"),onOptionRemove:e("onOptionRemove"),onDropdownOpen:e("onDropdownOpen"),onDropdownClose:e("onDropdownClose"),onFocus:e("onFocus"),onBlur:e("onBlur"),onInitialize:e("onInitialize")})})),o.createElement(o.Fragment,null,o.createElement("div",{style:{marginBottom:"1rem"}},o.createElement(s.Z,null),o.createElement("h4",null,"Using Events"),o.createElement("p",null,"Check out the console for more details about each event."),o.createElement("div",{className:"control-group"},o.createElement("label",{htmlFor:"select-state"},"States:"),o.createElement("select",{id:"select-state",multiple:!0,name:"state",defaultValue:["WY"]},o.createElement("option",{value:""},"Select a state..."),o.createElement("option",{value:"AL"},"Alabama"),o.createElement("option",{value:"AK"},"Alaska"),o.createElement("option",{value:"AZ"},"Arizona"),o.createElement("option",{value:"AR"},"Arkansas"),o.createElement("option",{value:"CA"},"California"),o.createElement("option",{value:"CO"},"Colorado"),o.createElement("option",{value:"CT"},"Connecticut"),o.createElement("option",{value:"DE"},"Delaware"),o.createElement("option",{value:"DC"},"District of Columbia"),o.createElement("option",{value:"FL"},"Florida"),o.createElement("option",{value:"GA"},"Georgia"),o.createElement("option",{value:"HI"},"Hawaii"),o.createElement("option",{value:"ID"},"Idaho"),o.createElement("option",{value:"IL"},"Illinois"),o.createElement("option",{value:"IN"},"Indiana"),o.createElement("option",{value:"IA"},"Iowa"),o.createElement("option",{value:"KS"},"Kansas"),o.createElement("option",{value:"KY"},"Kentucky"),o.createElement("option",{value:"LA"},"Louisiana"),o.createElement("option",{value:"ME"},"Maine"),o.createElement("option",{value:"MD"},"Maryland"),o.createElement("option",{value:"MA"},"Massachusetts"),o.createElement("option",{value:"MI"},"Michigan"),o.createElement("option",{value:"MN"},"Minnesota"),o.createElement("option",{value:"MS"},"Mississippi"),o.createElement("option",{value:"MO"},"Missouri"),o.createElement("option",{value:"MT"},"Montana"),o.createElement("option",{value:"NE"},"Nebraska"),o.createElement("option",{value:"NV"},"Nevada"),o.createElement("option",{value:"NH"},"New Hampshire"),o.createElement("option",{value:"NJ"},"New Jersey"),o.createElement("option",{value:"NM"},"New Mexico"),o.createElement("option",{value:"NY"},"New York"),o.createElement("option",{value:"NC"},"North Carolina"),o.createElement("option",{value:"ND"},"North Dakota"),o.createElement("option",{value:"OH"},"Ohio"),o.createElement("option",{value:"OK"},"Oklahoma"),o.createElement("option",{value:"OR"},"Oregon"),o.createElement("option",{value:"PA"},"Pennsylvania"),o.createElement("option",{value:"RI"},"Rhode Island"),o.createElement("option",{value:"SC"},"South Carolina"),o.createElement("option",{value:"SD"},"South Dakota"),o.createElement("option",{value:"TN"},"Tennessee"),o.createElement("option",{value:"TX"},"Texas"),o.createElement("option",{value:"UT"},"Utah"),o.createElement("option",{value:"VT"},"Vermont"),o.createElement("option",{value:"VA"},"Virginia"),o.createElement("option",{value:"WA"},"Washington"),o.createElement("option",{value:"WV"},"West Virginia"),o.createElement("option",{value:"WI"},"Wisconsin"),o.createElement("option",{value:"WY"},"Wyoming"))),o.createElement("h4",{className:"mt-4"},"Event Log"),o.createElement("pre",{id:"log"})),o.createElement(i.Z,{className:"language-html",title:"Html"},'<div class="control-group">\n  <label for="select-state">States:</label>\n  <select id="select-state" multiple name="state[]" class="demo-default">\n    <option value="">Select a state...</option>\n    <option value="AL">Alabama</option>\n    ***\n    <option value="WY" selected>Wyoming</option>\n  </select>\n</div>'),o.createElement(i.Z,{className:"language-javascript",title:"Javascript"},"var eventHandler = function(name) {\n  return function() {\n    console.log(name, arguments);\n    $('#log').append('<div><span class=\"name\">' + name + '</span></div>');\n  };\n};\nvar $select = $('#select-state').selectize({\n  create          : true,\n  onChange        : eventHandler('onChange'),\n  onItemAdd       : eventHandler('onItemAdd'),\n  onItemRemove    : eventHandler('onItemRemove'),\n  onOptionAdd     : eventHandler('onOptionAdd'),\n  onOptionRemove  : eventHandler('onOptionRemove'),\n  onDropdownOpen  : eventHandler('onDropdownOpen'),\n  onDropdownClose : eventHandler('onDropdownClose'),\n  onFocus         : eventHandler('onFocus'),\n  onBlur          : eventHandler('onBlur'),\n  onInitialize    : eventHandler('onInitialize'),\n});"))}const c={id:"events",title:"Using Events",description:"Examples of using selectize events"},m=void 0,u={unversionedId:"demos/events",id:"demos/events",title:"Using Events",description:"Examples of using selectize events",source:"@site/docs/demos/events.mdx",sourceDirName:"demos",slug:"/demos/events",permalink:"/docs/demos/events",draft:!1,tags:[],version:"current",frontMatter:{id:"events",title:"Using Events",description:"Examples of using selectize events"},sidebar:"demoSidebar",previous:{title:"Custom Rendering and Validation",permalink:"/docs/demos/email-contact"},next:{title:"Control Locking",permalink:"/docs/demos/lock"}},p={},d=[],v={toc:d};function E(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(r,{mdxType:"Events"}))}E.isMDXComponent=!0}}]);