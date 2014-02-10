## Selectize – Usage

```html
<script type="text/javascript" src="selectize.js"></script>
<link rel="stylesheet" type="text/css" href="selectize.css" />
<script type="text/javascript">
$(function() {
	$('select').selectize(options);
});
</script>
```

### Options

<table width="100%">
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#general" name="general">General</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" width="60px" align="left">Type</th>
		<th valign="top" width="60px" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>delimiter</code></td>
		<td valign="top">The string to separate items by. This option is only used when Selectize is instantiated from a &lt;input type="text"&gt; element.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>','</code></td>
	</tr>
	<tr>
		<td valign="top"><code>diacritics</code></td>
		<td valign="top">Enable or disable international character support.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<td valign="top"><code>create</code></td>
		<td valign="top">
			Allows the user to create a new items that aren't in the list of options. This option can be any of the following: "true" (default behavior), "false" (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.</td>
		<td valign="top"><code>mixed</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>createOnBlur</code></td>
		<td valign="top">
			If true, when user exits the field (clicks outside of input or presses ESC) new option is created and selected (if `create`-option is enabled).
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
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
	<tr>
		<td valign="top"><code>maxItems</code></td>
		<td valign="top">The max number of items the user can select.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>∞</code></td>
	</tr>
	<tr>
		<td valign="top"><code>hideSelected</code></td>
		<td valign="top">If true, the items that are currently selected will not be shown in the dropdown list of available options.</td>
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
		<td valign="top">The number of milliseconds to wait before requesting options from the server.</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>300</code></td>
	</tr>
	<tr>
		<td valign="top"><code>preload</code></td>
		<td valign="top">If true, the "load" function will be called upon control initialization (with an empty search). Alternatively it can be set to "focus" to call the "load" function when control receives focus.</td>
		<td valign="top"><code>boolean/string</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>dropdownParent</code></td>
		<td valign="top">The element the dropdown menu is appended to. This should be "body" or null. If null, the dropdown will be appended as a child of the selectize control.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>addPrecedence</code></td>
		<td valign="top">Sets if the "Add..." option should be the default selection in the dropdown.</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#data_searching" name="data_searching">Data / Searching</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
		<th valign="top" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>dataAttr</code></td>
		<td valign="top">The &lt;option&gt; attribute from which to read JSON data about the option.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'data-data'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>valueField</code></td>
		<td valign="top">The name of the property to use as the "value" when an item is selected.</td>
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
		<td valign="top"><code>sortField</code></td>
		<td valign="top">
			A single field or an array of fields to sort by. Each item in the array should be an object containing at
			least a "field" property. Optionally, "direction" can be set to "asc" or "desc". The
			order of the array defines the sort precedence.<br><br>

			Unless present, a special "$score" field will be automatically added to the beginning
			of the sort list. This will make results sorted primarily by match quality (descending).<br><br>

			For more information, see the <a href="https://github.com/brianreavis/sifter.js#sifterjs">sifter documentation</a>.
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
		<td valign="top">When searching for multiple terms (separated by a space), this is the operator used. Can be "and" or "or".</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>'and'</code></td>
	</tr>
	<tr>
		<td valign="top"><code>optgroupOrder</td>
		<td valign="top">An array of optgroup values that indicates the order they should be listed in in the dropdown. If not provided, groups will be ordered by the ranking of the options within them.</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#callbacks" name="callbacks">Callbacks</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
		<th valign="top" align="left">Default</th>
	</tr>
	<tr>
		<td valign="top"><code>load(query, callback)</code></td>
		<td valign="top">Invoked when new options should be loaded from the server.</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>score(search)</code></td>
		<td valign="top">Overrides the scoring function used to sort available options. The provided function should return a <strong>function</strong> that returns a number greater than or equal to zero to represent the "score" of an item (the function's first argument). If 0, the option is declared not a match. The "search" argument is a <a href="#search">Search</a> object. For an example, see the <a href="https://github.com/brianreavis/selectize.js/blob/master/examples/github.html">"GitHub" example</a>.</td>
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
		<td valign="top">Invoked when new options have been loaded and added to the control (via the "load" option or "load" API method).</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="4" align="left"><a href="#rendering" name="rendering">Rendering</a></th>
	</tr>
	<tr>
		<td valign="top"><code>render</code></td>
		<td valign="top">
			Custom rendering functions. Each function should accept two arguments: "data" and "escape".
			The "escape" argument is a function that takes a string and escapes all special HTML characters.
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
					<td valign="top">The "create new" option at the bottom of the dropdown. The data contains one property: "input" (which is what the user has typed).</td>
				</tr>
				<tr>
					<td valign="top"><code>optgroup_header</code></td>
					<td valign="top">The header of an option group.</td>
				</tr>
				<tr>
					<td valign="top"><code>optgroup</code></td>
					<td valign="top">The wrapper for an optgroup. The "html" property in the data will be the raw html of the optgroup's header and options.</td>
				</tr>
			</table>
		</td>
		<td valign="top"><code>object</code></td>
		<td valign="top"></td>
	</tr>
</table>
