## Selectize – Usage

```html
<script type="text/javascript" src="selectize.js"></script>
<link rel="stylesheet" type="text/css" href="selectize.css" />
<script>
$(function() {
	$('select').selectize(options);
});
</script>
```

### Glossary

- Config / configuration: the initial settings of Selectize, given at initialization.
- Settings: the current settings of Selectize, might be updated. Accessible with the `setting` property of the Selectize object.
- Options: the list of objects to display.
  Each object must have a property with an unique **value** to identify the option; the property name is defined by the `valueField` setting.
  Option objects must also have a property with the **label** to display (as tag, in the drop down, etc.); the property name is defined by the `labelField` setting.
  The options can have other properties, ignored, unless referenced by other settings, like `sortField` or `searchField`.
- Items: the list of selected options. Or more exactly, the list of the values of the selected options.

### Configuration

<table width="100%">
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#general" name="general">General</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Setting</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" width="60px" align="left">Type</th>
		<th valign="top" width="60px" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>options</code></td>
		<td valign="top">
			An array of the initial options available to select; array
			of objects.
			By default this is populated from the original input
			element.  If your element is a &lt;select&gt; with
			&lt;option&gt;s specified this property gets populated
			automatically.
			Setting this property is convenient if you have your data as
			an array and want to automatically generate the
			&lt;option&gt;s.
		</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>[]</code></td>
	</tr>
	<tr>
		<td valign="top"><code>items</code></td>
		<td valign="top">An array of the initial selected values. By default this is populated from the original input element.</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>[]</code></td>
	</tr>
	<tr>
		<td valign="top"><code>delimiter</code></td>
		<td valign="top">The string to separate items by. When typing an item in a multi-selection control allowing creation, then the delimiter, the item is added. If you paste delimiter-separated items in such control, the items are added at once. The delimiter is also used in the <code>getValue</code> API call on a text &lt;input&gt; tag to separate the multiple values.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>','</code></td>
	</tr>
	<tr>
		<td valign="top"><code>create</code></td>
		<td valign="top">
			Allows the user to create new items that aren't in the
			initial list of options. This setting can be any of the
			following: <code>true</code>, <code>false</code> (disabled), or a function to
			process input. The function can take one of two forms:
			synchronous (with signature <code>function(input){}</code>
			or asynchronous (with signature <code>function(input,
			callback)</code>. In the synchronous case, the function
			should <code>return</code> an object for the options (eg,
			with defaults: <code>return { 'value': value, 'text': text
			};</code>). The asynchronous version should invoke the
			callback with the result in the same format as the object
			above (eg, <code>callback( { 'value': value, 'text':
			text});</code>)</td>
		<td valign="top"><code>boolean/function</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>createOnBlur</code></td>
		<td valign="top">
			If true, when user exits the field (clicks outside of input), a new option is created and selected (if <code>create</code> setting is enabled).
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>createFilter</code></td>
		<td valign="top">
			Specifies a RegExp or a string containing a regular expression that the current search filter must match to be allowed to be created. May also be a predicate function that takes the filter text and returns whether it is allowed.</td>
		<td valign="top"><code>RegExp|string|function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>highlight</code></td>
		<td valign="top">Toggles match highlighting within the dropdown menu.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<td valign="top"><code>persist</code></td>
		<td valign="top">If false, items created by the user will not show up as available options once they are unselected.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<td valign="top"><code>openOnFocus</code></td>
		<td valign="top">Show the dropdown immediately when the control receives focus.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<td valign="top"><code>maxOptions</code></td>
		<td valign="top">The max number of items to render at once in the dropdown list of options.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>1000</code></td>
	</tr>
	<tr name="maxItems">
		<td valign="top"><code>maxItems</code></td>
		<td valign="top">The max number of items the user can select. 1 makes the control mono-selection, null allows an unlimited number of items.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>1</code></td>
	</tr>
	<tr>
		<td valign="top"><code>hideSelected</code></td>
		<td valign="top">If true, the items that are currently selected will not be shown in the dropdown list of available options.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>closeAfterSelect</code></td>
		<td valign="top">If true, the dropdown will be closed after a selection is made.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>allowEmptyOption</code></td>
		<td valign="top">If true, Selectize will treat any options with a "" value like normal. This defaults to false to accomodate the common &lt;select&gt; practice of having the first empty option to act as a placeholder.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>scrollDuration</code></td>
		<td valign="top">The animation duration (in milliseconds) of the scroll animation triggered when going [up] and [down] in the options dropdown.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>60</code></td>
	</tr>
	<tr>
		<td valign="top"><code>loadThrottle</code></td>
		<td valign="top">The number of milliseconds to wait before requesting options from the server or null. If null, throttling is disabled. Useful when loading options dynamically while the user types a search / filter expression.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>300</code></td>
	</tr>
	<tr>
		<td valign="top"><code>loadingClass</code></td>
		<td valign="top">The class name added to the wrapper element while awaiting the fulfillment of load requests.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'loading'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>placeholder</code></td>
		<td valign="top">The placeholder of the control (displayed when nothing is selected / typed). Defaults to input element's placeholder, unless this one is specified.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>undefined</code></td>
	</tr>
	<tr>
		<td valign="top"><code>preload</code></td>
		<td valign="top">If true, the <code>load</code> function will be called upon control initialization (with an empty search). Alternatively it can be set to <code>'focus'</code> to call the <code>load</code> function when control receives focus.</td>
		<td valign="top"><code>boolean/string</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>dropdownParent</code></td>
		<td valign="top">The element the dropdown menu is appended to. This should be <code>'body'</code> or <code>null</code>. If null, the dropdown will be appended as a child of the Selectize control.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>addPrecedence</code></td>
		<td valign="top">If true, the "Add..." option is the default selection in the dropdown.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>selectOnTab</code></td>
		<td valign="top">If true, the tab key will choose the currently selected item.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>diacritics</code></td>
		<td valign="top">Enable or disable international character support.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#data_searching" name="data_searching">Data / Searching</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Setting</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
		<th valign="top" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>options</code></td>
		<td valign="top">See above</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>[]</code></td>
	</tr>
	<tr>
		<td valign="top"><code>optgroups</code></td>
		<td valign="top">
			Option groups that options will be bucketed into. If your
			element is a &lt;select&gt; with &lt;optgroup&gt;s this
			property gets populated automatically. Make sure each object
			in the array has a property named whatever
			<code>optgroupValueField</code> is set to.
		</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>[]</code></td>
	</tr>
	<tr>
		<td valign="top"><code>dataAttr</code></td>
		<td valign="top">The &lt;option&gt; attribute from which to read JSON data about the option.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'data-data'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>valueField</code></td>
		<td valign="top">The name of the property to use as the <code>value</code> when an item is selected.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'value'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>optgroupValueField</code></td>
		<td valign="top">The name of the option group property that serves as its unique identifier.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'value'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>labelField</code></td>
		<td valign="top">The name of the property to render as an option / item label (not needed when custom rendering functions are defined).</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'text'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>optgroupLabelField</code></td>
		<td valign="top">The name of the property to render as an option group label (not needed when custom rendering functions are defined).</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'label'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>optgroupField</code></td>
		<td valign="top">The name of the property to group items by.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'optgroup'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>disabledField</code></td>
		<td valign="top">The name of the property to disabled option and optgroup.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'disabled'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>sortField</code></td>
		<td valign="top">
			<p>A single field or an array of fields to sort by. Each item in the array should be an object containing at least a <code>field</code> property. Optionally, <code>direction</code> can be set to <code>'asc'</code> or <code>'desc'</code>. The order of the array defines the sort precedence.</p>
			<p>Unless present, a special `$score` field will be automatically added to the beginning of the sort list. This will make results sorted primarily by match quality (descending).</p>
			<p>You can override the `$score` function. For more information, see the <a href="https://github.com/brianreavis/sifter.js#sifterjs">sifter documentation</a>.</p>
		</td>
		<td valign="top"><code>string|array</code></td>
		<td valign="top"><code>'$order'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>searchField</td>
		<td valign="top">An array of property names to analyze when filtering options.</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>['text']</code></td>
	</tr>
	<tr>
		<td valign="top"><code>searchConjunction</td>
		<td valign="top">When searching for multiple terms (separated by space), this is the operator used. Can be <code>'and'</code> or <code>'or'</code> .</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'and'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>lockOptgroupOrder</td>
		<td valign="top">If truthy, Selectize will make all optgroups be in the same order as they were added (by the `$order` property). Otherwise, it will order based on the score of the results in each.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>copyClassesToDropdown</code></td>
		<td valign="top">Copy the original input classes to the dropdown element.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#callbacks" name="callbacks">Callbacks</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Setting</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
		<th valign="top" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>load(query, callback)</code></td>
		<td valign="top">Invoked when new options should be loaded from the server. Called with the current query string and a callback function to call with the results when they are loaded (or nothing when an error arises).</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>score(search)</code></td>
		<td valign="top">Overrides the scoring function used to sort available options. The provided function should return a <strong>function</strong> that returns a number greater than or equal to zero to represent the <code>score</code> of an item (the function's first argument). If 0, the option is declared not a match. The <code>search</code> argument is a <a href="#search">Search</a> object. For an example, see the <a href="https://github.com/brianreavis/selectize.js/blob/master/examples/github.html">"GitHub" example</a>.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onInitialize()</code></td>
		<td valign="top">Invoked once the control is completely initialized.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onFocus()</code></td>
		<td valign="top">Invoked when the control gains focus.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onBlur()</code></td>
		<td valign="top">Invoked when the control loses focus.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onChange(value)</code></td>
		<td valign="top">Invoked when the value of the control changes.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onItemAdd(value, $item)</code></td>
		<td valign="top">Invoked when an item is selected.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onItemRemove(value)</code></td>
		<td valign="top">Invoked when an item is deselected.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onClear()</code></td>
		<td valign="top">Invoked when the control is manually cleared via the clear() method.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onDelete(values)</code></td>
		<td valign="top">Invoked when the user attempts to delete the current selection.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onOptionAdd(value, data)</code></td>
		<td valign="top">Invoked when a new option is added to the available options list.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onOptionRemove(value)</code></td>
		<td valign="top">Invoked when an option is removed from the available options.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onDropdownOpen($dropdown)</code></td>
		<td valign="top">Invoked when the dropdown opens.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onDropdownClose($dropdown)</code></td>
		<td valign="top">Invoked when the dropdown closes.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onType(str)</code></td>
		<td valign="top">Invoked when the user types while filtering options.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onLoad(data)</code></td>
		<td valign="top">Invoked when new options have been loaded and added to the control (via the <code>load</code> option or <code>load</code> API method).</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#rendering" name="rendering">Rendering</a></th>
	</tr>
	<tr>
		<td valign="top"><code>render</code></td>
		<td valign="top">
			Custom rendering functions. Each function should accept two
			arguments: <code>data</code> and <code>escape</code> and return HTML (string
			or DOM element) with a single root element.
			The <code>escape</code> argument is a function that takes a string and
			escapes all special HTML characters.
			This is very important to use to prevent XSS vulnerabilities.
			<table width="100%">
				<tr>
					<td valign="top"><code>option</code></td>
					<td valign="top">An option in the dropdown list of available options.</td>
				</tr>
				<tr>
					<td valign="top"><code>item</code></td>
					<td valign="top">An item the user has selected.</td>
				</tr>
				<tr>
					<td valign="top"><code>option_create</code></td>
					<td valign="top">The "create new" option at the bottom of the dropdown. The data contains one property: <code>input</code> (which is what the user has typed).</td>
				</tr>
				<tr>
					<td valign="top"><code>optgroup_header</code></td>
					<td valign="top">The header of an option group.</td>
				</tr>
				<tr>
					<td valign="top"><code>optgroup</code></td>
					<td valign="top">The wrapper for an optgroup. The <code>html</code> property in the data will be the raw html of the optgroup's header and options.</td>
				</tr>
			</table>
		</td>
		<td valign="top"><code>object</code></td>
		<td valign="top"></td>
	</tr>
</table>
