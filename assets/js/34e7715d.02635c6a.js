"use strict";(self.webpackChunkselectize_dev=self.webpackChunkselectize_dev||[]).push([[8196],{3636:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(7294),l=n(6010),a=n(5742);function i(){return(0,o.useEffect)((()=>{const e=$(".theme-changer button");e.off("click").on("click",(function(){if($(this).hasClass("active"))return;const t=$(this).data("theme");e.removeClass("active"),$(this).addClass("active"),$("link[data-theme]").remove();0===$("link[data-theme="+t+"]").length&&$("head").append(`<link data-theme="${t}" href="/css/selectize.${t}.css" rel="stylesheet">`)}))})),o.createElement(o.Fragment,null,o.createElement(a.Z,null,o.createElement("link",{rel:"stylesheet",href:"/css/selectize.css"}),o.createElement("link",{rel:"stylesheet","data-theme":"default",href:"/css/selectize.default.css"})),o.createElement("span",{className:(0,l.Z)("theme-changer","isolate inline-flex rounded-md shadow-sm mb-6")},[{src:"default",label:"Selectize",icon:"fak fa-selectize"},{src:"bootstrap2",label:"Bootstrap 2",icon:"fa-duotone fa-square-b"},{src:"bootstrap3",label:"Bootstrap 3",icon:"fa-duotone fa-square-b"},{src:"bootstrap4",label:"Bootstrap 4",icon:"fa-duotone fa-square-b"},{src:"bootstrap5",label:"Bootstrap 5",icon:"fa-duotone fa-square-b"}].map(((e,t)=>{const n=0===t?"active":"";return o.createElement("button",{className:(0,l.Z)(n,"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"),key:t,type:"button","data-theme":e.src},o.createElement("span",{className:(0,l.Z)(e.icon,"pr-2")}),e.label)}))))}},5204:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>u,default:()=>f,frontMatter:()=>r,metadata:()=>m,toc:()=>p});var o=n(7462),l=n(7294),a=n(3905),i=n(7819),c=n(3636);function s(){return(0,l.useEffect)((()=>{var e=$("#select-tools").selectize({maxItems:null,valueField:"id",labelField:"title",searchField:"title",options:[{id:1,title:"Spectrometer",url:"http://en.wikipedia.org/wiki/Spectrometers"},{id:2,title:"Star Chart",url:"http://en.wikipedia.org/wiki/Star_chart"},{id:3,title:"Electrical Tape",url:"http://en.wikipedia.org/wiki/Electrical_tape"}],create:!1})[0].selectize;$("#button-clear").on("click",(function(){e.clear()})),$("#button-clearoptions").on("click",(function(){e.clearOptions()})),$("#button-addoption").on("click",(function(){e.addOption({id:4,title:"Something New",url:"http://google.com"})})),$("#button-additem").on("click",(function(){e.addItem(2)})),$("#button-maxitems2").on("click",(function(){e.setMaxItems(2)})),$("#button-maxitems100").on("click",(function(){e.setMaxItems(100)})),$("#button-setvalue").on("click",(function(){e.setValue([2,3])}))})),l.createElement(l.Fragment,null,l.createElement("div",{style:{marginBottom:"1rem"}},l.createElement(c.Z,null),l.createElement("h4",null,"Examples of how to interact with the control programmatically."),l.createElement("div",{className:"control-group"},l.createElement("select",{id:"select-tools",multiple:!0,placeholder:"Pick a tool..."})),l.createElement("div",{className:"pt-4"},l.createElement("button",{type:"button",value:"clear()",id:"button-clear"},"clear()"),l.createElement("button",{type:"button",value:"clearOptions()",id:"button-clearoptions"},"clearOptions()"),l.createElement("button",{type:"button",value:"addOption()",id:"button-addoption"},"addOption()"),l.createElement("button",{type:"button",value:"addItem()",id:"button-additem"},"addItem()"),l.createElement("button",{type:"button",value:"setValue()",id:"button-setvalue"},"setValue()"),l.createElement("button",{type:"button",value:"maxItems(2)",id:"button-maxitems2"},"maxItems(2)"),l.createElement("button",{type:"button",value:"maxItems(100)",id:"button-maxitems100"},"maxItems(100)"))),l.createElement(i.Z,{className:"language-html",title:"Html"},'<select id="select-tools" multiple placeholder="Pick a tool..."></select>'),l.createElement(i.Z,{className:"language-javascript",title:"Javascript"},"var $select = $('#select-tools').selectize({\n  maxItems: null,\n  valueField: 'id',\n  labelField: 'title',\n  searchField: 'title',\n  options: [\n    {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},\n    {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},\n    {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}\n  ],\n  create: false\n});\n\n// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\nvar control = $select[0].selectize;\n\n$('#button-clear').on('click', function() {\n  control.clear();\n});\n\n$('#button-clearoptions').on('click', function() {\n  control.clearOptions();\n});\n\n$('#button-addoption').on('click', function() {\n  control.addOption({\n    id: 4,\n    title: 'Something New',\n    url: 'http://google.com'\n  });\n});\n\n$('#button-additem').on('click', function() {\n  control.addItem(2);\n});\n\n$('#button-maxitems2').on('click', function() {\n  control.setMaxItems(2);\n});\n\n$('#button-maxitems100').on('click', function() {\n  control.setMaxItems(100);\n});\n\n$('#button-setvalue').on('click', function() {\n  control.setValue([2, 3]);\n});\n        "))}const r={id:"api",title:"Using the API",description:"Examples of using the API to control selectize"},u=void 0,m={unversionedId:"demos/api",id:"demos/api",title:"Using the API",description:"Examples of using the API to control selectize",source:"@site/docs/demos/api.mdx",sourceDirName:"demos",slug:"/demos/api",permalink:"/docs/demos/api",draft:!1,tags:[],version:"current",frontMatter:{id:"api",title:"Using the API",description:"Examples of using the API to control selectize"},sidebar:"demoSidebar",previous:{title:"Selectize demos",permalink:"/docs/demos"},next:{title:"Confirm Delete",permalink:"/docs/demos/confirm"}},d={},p=[],b={toc:p};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(s,{mdxType:"Api"}))}f.isMDXComponent=!0}}]);