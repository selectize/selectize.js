"use strict";(self.webpackChunkselectize_dev=self.webpackChunkselectize_dev||[]).push([[2272],{3066:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>i,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=n(7462),l=(n(7294),n(3905));const r={title:"Usage",description:"Usage"},i=void 0,o={unversionedId:"usage",id:"usage",title:"Usage",description:"Usage",source:"@site/docs/usage.mdx",sourceDirName:".",slug:"/usage",permalink:"/docs/usage",draft:!1,tags:[],version:"current",frontMatter:{title:"Usage",description:"Usage"},sidebar:"docsSidebar",previous:{title:"Getting Started with Selectize",permalink:"/docs/intro"},next:{title:"Events",permalink:"/docs/events"}},d={},p=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Advanced Usage",id:"advanced-usage",level:2},{value:"Glossary",id:"glossary",level:3},{value:"Configuration",id:"configuration",level:3},{value:"Data/Searching",id:"datasearching",level:3},{value:"Event Callbacks",id:"event-callbacks",level:3},{value:"Custom Rendering",id:"custom-rendering",level:3}],m={toc:p};function s(t){let{components:e,...n}=t;return(0,l.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,l.kt)("p",null,"In its simplest form, Selectize is initialized using an existing ",(0,l.kt)("inlineCode",{parentName:"p"},"<select>")," element:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<script>\n  $(function () {\n    $("select").selectize(options);\n  });\n<\/script>\n')),(0,l.kt)("h2",{id:"advanced-usage"},"Advanced Usage"),(0,l.kt)("p",null,"Configuration options are available for more advanced scenarios, including plugin support, remote data loading, custom rendering, and more.\nThe available settings are documented in the table below. See the ",(0,l.kt)("a",{parentName:"p",href:"/docs/demos"},"Demos")," page for examples of each option in action."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<script type="text/javascript" src="selectize.js"><\/script>\n<link rel="stylesheet" type="text/css" href="selectize.css" />\n<script>\n  $(function () {\n    $("select").selectize({\n      plugins: ["restore_on_backspace", "clear_button"],\n      delimiter: " - ",\n      persist: false,\n      maxItems: null,\n      valueField: "email",\n      labelField: "name",\n      searchField: ["name", "email"],\n      options: [\n        { email: "selectize@risadams.com", name: "Ris Adams" },\n        { email: "someone@gmail.com", name: "Someone" },\n        { email: "someone-else@yahoo.com", name: "Someone Else" },\n      ],\n    });\n  });\n<\/script>\n')),(0,l.kt)("h3",{id:"glossary"},"Glossary"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Config/configuration"),": the initial settings of Selectize, given at initialization."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Settings"),": the current settings of Selectize might have been updated. Accessible with the ",(0,l.kt)("inlineCode",{parentName:"li"},"setting")," property of the Selectize object."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Options"),": the list of objects to display.",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Each object must have a property with a unique ",(0,l.kt)("strong",{parentName:"li"},"value")," to identify the option; the ",(0,l.kt)("inlineCode",{parentName:"li"},"valueField")," setting defines the property name."),(0,l.kt)("li",{parentName:"ul"},"Option objects must also have a property with the ",(0,l.kt)("strong",{parentName:"li"},"label")," to display (as tag, in the drop down, etc.); the ",(0,l.kt)("inlineCode",{parentName:"li"},"labelField")," setting defines the property name."),(0,l.kt)("li",{parentName:"ul"},"The options can have other properties, ignored unless referenced by different settings, like ",(0,l.kt)("inlineCode",{parentName:"li"},"sortField")," or ",(0,l.kt)("inlineCode",{parentName:"li"},"searchField"),"."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"Items"),": the list of selected options. Or, more precisely, the list of the chosen options values.")),(0,l.kt)("h3",{id:"configuration"},"Configuration"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Setting"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"options")),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"[]"),(0,l.kt)("td",{parentName:"tr",align:null},"An array of the initial options available to select; array of objects. By default, this is populated from the original input element. If your element is a ",(0,l.kt)("inlineCode",{parentName:"td"},"<select>")," with ",(0,l.kt)("inlineCode",{parentName:"td"},"<option>"),"s specified, this property gets populated automatically. Setting this property is convenient if you have your data as an array and want to generate the ",(0,l.kt)("inlineCode",{parentName:"td"},"<option>"),"s automatically.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"items")),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"[]"),(0,l.kt)("td",{parentName:"tr",align:null},"An array of the initial selected values. By default, this is populated from the original input element.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"delimiter")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"','"),(0,l.kt)("td",{parentName:"tr",align:null},"The string to separate items by. When typing an item in a multi-selection control allowing creation, then the delimiter, the item is added. If you paste delimiter-separated items in such control, the items are added at once. The delimiter is also used in the getValue API call on a text ",(0,l.kt)("inlineCode",{parentName:"td"},"<input>")," tag to separate the multiple values.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"create")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean","|","function"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Allows the user to create new items that aren't in the initial list of options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"showAddOptionOnCreate")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"Toggles whether to show ",(0,l.kt)("inlineCode",{parentName:"td"},"'Add ...option...'")," within the dropdown menu (if the create setting is enabled).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"createOnBlur")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, when a user exits the field (clicks outside of input), a new option is created and selected (if the create setting is enabled).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"createFilter")),(0,l.kt)("td",{parentName:"tr",align:null},"RegExp","|","Function"),(0,l.kt)("td",{parentName:"tr",align:null},"string","|","null"),(0,l.kt)("td",{parentName:"tr",align:null},"Specifies a Regular Expression or a string containing a regular expression that the current search filter must match to be allowed to be created. A predicate function may also take the filter text and return whether it is allowed.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"highlight")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"Toggles match highlighting within the dropdown menu.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"persist")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"If false, items created by the user will not appear as available options once they are unselected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"openOnFocus")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"Show the dropdown immediately when the control receives focus.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"maxOptions")),(0,l.kt)("td",{parentName:"tr",align:null},"int"),(0,l.kt)("td",{parentName:"tr",align:null},"1000"),(0,l.kt)("td",{parentName:"tr",align:null},"The max number of items to render at once in the dropdown list of options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"maxItems")),(0,l.kt)("td",{parentName:"tr",align:null},"int"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"The max number of items the user can select. ",(0,l.kt)("inlineCode",{parentName:"td"},"1")," makes the control mono-selection, ",(0,l.kt)("inlineCode",{parentName:"td"},"null")," allows an unlimited number of items.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"hideSelected")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, the currently selected items will not be shown in the dropdown list of available options. This option defaults to true when in a multi-selection control and to false otherwise.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"closeAfterSelect")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, the dropdown will be closed after a selection is made.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"closeDropdownThreshold")),(0,l.kt)("td",{parentName:"tr",align:null},"int"),(0,l.kt)("td",{parentName:"tr",align:null},"250"),(0,l.kt)("td",{parentName:"tr",align:null},"The number of milliseconds to throttle the dropdown opening after it is closed by clicking on the control. Setting this to ",(0,l.kt)("inlineCode",{parentName:"td"},"0")," will reopen the drop down after clicking on the control when the dropdown is open. This option does not affect multi-selects.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"allowEmptyOption")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},'If true, Selectize will treat any options with a "" value like normal. This defaults to false to accommodate the common ',(0,l.kt)("inlineCode",{parentName:"td"},"<select>")," practice of having the first empty option act as a placeholder.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"showEmptyOptionInDropdown")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, Selectize will show an option with value ",(0,l.kt)("inlineCode",{parentName:"td"},'""')," in dropdown, if one does not exist, which is required when you want to select an empty option via ",(0,l.kt)("inlineCode",{parentName:"td"},"selectOnTab"),". This requires ",(0,l.kt)("inlineCode",{parentName:"td"},"allowEmptyOption: true"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"emptyOptionLabel")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'--'"),(0,l.kt)("td",{parentName:"tr",align:null},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"showEmptyOptionInDropdown: true")," and an option with value ",(0,l.kt)("inlineCode",{parentName:"td"},'""')," in dropdown does not exist, an option with ",(0,l.kt)("inlineCode",{parentName:"td"},'""')," value is created, the label/text of the option can be set via this option, this requires ",(0,l.kt)("inlineCode",{parentName:"td"},"showEmptyOptionInDropdown: true"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"scrollDuration")),(0,l.kt)("td",{parentName:"tr",align:null},"int"),(0,l.kt)("td",{parentName:"tr",align:null},"60"),(0,l.kt)("td",{parentName:"tr",align:null},"The animation duration (in milliseconds) of the scroll animation triggered when going ","[up]"," and ","[down]"," in the options dropdown.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"deselectBehavior")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"previous"),(0,l.kt)("td",{parentName:"tr",align:null},"If an option is selected, the same option is highlighted/marked active in the dropdown; pressing backspace on the input control removes the option, and in the drop down the last element is highlighted. When this option is set to ",(0,l.kt)("inlineCode",{parentName:"td"},"top")," it shifts the highlight to the top-most option. Valid options are ",(0,l.kt)("inlineCode",{parentName:"td"},"top")," and ",(0,l.kt)("inlineCode",{parentName:"td"},"previous"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"loadThrottle")),(0,l.kt)("td",{parentName:"tr",align:null},"int"),(0,l.kt)("td",{parentName:"tr",align:null},"300"),(0,l.kt)("td",{parentName:"tr",align:null},"The number of milliseconds to wait before requesting options from the server or null. If `null``, throttling is disabled. Useful when loading options dynamically while the user types a search/filter expression.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"loadingClass")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'loading'"),(0,l.kt)("td",{parentName:"tr",align:null},"The class name is added to the wrapper element while awaiting the fulfillment of load requests.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"placeholder")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"undefined"),(0,l.kt)("td",{parentName:"tr",align:null},"The placeholder of the control (displayed when nothing is selected/typed). Defaults to input element's placeholder unless this one is specified.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"preload")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean","|","string"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, the load function will be called upon control initialization (with an empty search). Alternatively, it can be set to 'focus' to call the load function when the control receives focus.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"dropdownParent")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"The element the dropdown menu is appended to. This option should be ",(0,l.kt)("inlineCode",{parentName:"td"},"'body'")," or ",(0,l.kt)("inlineCode",{parentName:"td"},"null"),". If ",(0,l.kt)("inlineCode",{parentName:"td"},"null"),", the dropdown will be appended as a child of the Selectize control.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"addPrecedence")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},'If true, the "Add..." option is the default selection in the dropdown.')),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"selectOnTab")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If true, the tab key will choose the currently selected item.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"diacritics")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"Enable or disable international character support.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"setFirstOptionActive")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"Enable setting the first option in the list as active.")))),(0,l.kt)("h3",{id:"datasearching"},"Data/Searching"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Setting"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"options")),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"[]"),(0,l.kt)("td",{parentName:"tr",align:null},"See above")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroups")),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"[]"),(0,l.kt)("td",{parentName:"tr",align:null},"Option groups that options will be bucketed into. If your element is a ",(0,l.kt)("inlineCode",{parentName:"td"},"<select>")," with ",(0,l.kt)("inlineCode",{parentName:"td"},"<optgroup>"),"s, this property gets populated automatically. Ensure each object in the array has a property that matches the name of the ",(0,l.kt)("inlineCode",{parentName:"td"},"optgroupValueField"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"dataAttr")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'data-data'"),(0,l.kt)("td",{parentName:"tr",align:null},"The ",(0,l.kt)("inlineCode",{parentName:"td"},"<option>")," attribute from which to read JSON data about the option.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"valueField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'value'"),(0,l.kt)("td",{parentName:"tr",align:null},"The property name to use as the value when an item is selected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroupValueField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'value'"),(0,l.kt)("td",{parentName:"tr",align:null},"The name of the option group property that serves as its unique identifier.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"labelField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'text'"),(0,l.kt)("td",{parentName:"tr",align:null},"The property name to render as an ",(0,l.kt)("inlineCode",{parentName:"td"},"option"),"/",(0,l.kt)("inlineCode",{parentName:"td"},"item")," label (not needed when custom rendering functions are defined).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroupLabelField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'label'"),(0,l.kt)("td",{parentName:"tr",align:null},"The property name to render as an option group label (not needed when custom rendering functions are defined).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroupField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'optgroup'"),(0,l.kt)("td",{parentName:"tr",align:null},"The property name by which to group items.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"disabledField")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'disabled'"),(0,l.kt)("td",{parentName:"tr",align:null},"The property name to disabled option and ",(0,l.kt)("inlineCode",{parentName:"td"},"optgroup"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"sortField")),(0,l.kt)("td",{parentName:"tr",align:null},"string","|"," array"),(0,l.kt)("td",{parentName:"tr",align:null},"'$order'"),(0,l.kt)("td",{parentName:"tr",align:null},"A single field or an array of fields to sort by. Each item in the array should be an object containing at least a field property. Optionally, a direction can be set to either ",(0,l.kt)("inlineCode",{parentName:"td"},"'asc'")," or ",(0,l.kt)("inlineCode",{parentName:"td"},"'desc'"),". The order of the array defines the sort precedence.Unless present, a special ",(0,l.kt)("inlineCode",{parentName:"td"},"$score")," field will be automatically added to the beginning of the sort list. This option will make results sorted primarily by match quality (descending). You can override the ",(0,l.kt)("inlineCode",{parentName:"td"},"$score")," function. For more information, see the ",(0,l.kt)("em",{parentName:"td"},"sifter")," documentation.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"searchField")),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"['text']"),(0,l.kt)("td",{parentName:"tr",align:null},"An array of property names to analyze when filtering options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"searchConjunction")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"'and'"),(0,l.kt)("td",{parentName:"tr",align:null},"When searching for multiple terms (separated by space), this is the operator used. This option can be set to ",(0,l.kt)("inlineCode",{parentName:"td"},"'and'")," or ",(0,l.kt)("inlineCode",{parentName:"td"},"'or'"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"nesting")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", nested fields will be available for search using dot-notation to reference them (e.g., the nested. property). ",(0,l.kt)("em",{parentName:"td"},"Warning: can reduce performance."))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"lockOptgroupOrder")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", Selectize will make all option groups appear in the same order as they were added (by the ",(0,l.kt)("inlineCode",{parentName:"td"},"$order")," property). Otherwise, it will order based on the score of the results in each.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"copyClassesToDropdown")),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," Copies the original input classes to the dropdown element.")))),(0,l.kt)("h3",{id:"event-callbacks"},"Event Callbacks"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Setting"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"load(query, callback)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when new options are loaded from the server. Called with the current query string and a callback function to call with the results when they are loaded (or nothing when an error arises).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"score(search)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},'Overrides the scoring function used to sort available options. The provided function should return a function that returns a number greater than or equal to zero to represent the score of an item (the function\'s first argument). If 0, the option is declared not a match. A search argument is a Search object. For an example, see the "GitHub" example.')),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"formatValueToKey(key)")),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Function to generate a key for a new item created from input when create is set to true, to generate a (",(0,l.kt)("inlineCode",{parentName:"td"},"'key' =>")," 'value'",(0,l.kt)("inlineCode",{parentName:"td"},") combination. Without using this function, it will result in a ("),"'value' =>",(0,l.kt)("inlineCode",{parentName:"td"}," 'value'"),") combination. The provided function should return a unique key that is not an object or function.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onInitialize()")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked once the control is completely initialized.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onFocus()")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the control gains focus.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onBlur()")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the control loses focus.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onChange(value)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the value of the control changes.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onItemAdd(value, $item)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when an item is selected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onItemRemove(value)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when an item is deselected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onClear()")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the control is manually cleared via the clear() method.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onDelete(values)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the user attempts to delete the current selection.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onOptionAdd(value, data)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when a new option is added to the list of available options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onOptionRemove(value)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when an option is removed from the available options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onDropdownOpen($dropdown)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the dropdown opens.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onDropdownClose($dropdown)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the dropdown closes.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onType(str)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when the user types while filtering options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"onLoad(data)")),(0,l.kt)("td",{parentName:"tr",align:null},"function"),(0,l.kt)("td",{parentName:"tr",align:null},"null"),(0,l.kt)("td",{parentName:"tr",align:null},"Invoked when new options have been loaded and added to the control (via the load option or load API method).")))),(0,l.kt)("h3",{id:"custom-rendering"},"Custom Rendering"),(0,l.kt)("p",null,"Custom rendering functions. Each function should accept two arguments: ",(0,l.kt)("inlineCode",{parentName:"p"},"data")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"escape"),", and must return HTML (string or DOM element) with a single root element.\nThe escape argument is a function that takes a string and escapes all special HTML characters; this is very important to use to prevent XSS vulnerabilities."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Function"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"option")),(0,l.kt)("td",{parentName:"tr",align:null},"An option in the dropdown list of available options.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"item")),(0,l.kt)("td",{parentName:"tr",align:null},"An item the user has selected.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"option_create")),(0,l.kt)("td",{parentName:"tr",align:null},'The "create new" option is at the bottom of the dropdown. The data contains one property: ',(0,l.kt)("inlineCode",{parentName:"td"},"input")," (which is what the user has typed).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroup_header")),(0,l.kt)("td",{parentName:"tr",align:null},"The header of an option group.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("strong",{parentName:"td"},"optgroup")),(0,l.kt)("td",{parentName:"tr",align:null},"The wrapper for an optgroup. The html property in the data will be the raw html of the optgroup header and options.")))))}s.isMDXComponent=!0}}]);