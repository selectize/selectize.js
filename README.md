# selectize.js
Selectize is a fast, usable, and clean &lt;select&gt; replacement (7kb gzipped). It's a lot like [Chosen](http://harvesthq.github.io/chosen/), [Select2](http://ivaynberg.github.io/select2/), and [Tags Input](https://github.com/xoxco/jQuery-Tags-Input) but with a few advantages. Licensed under the Apache License, Version 2.0… so do whatever you want with it!

- **Multi-property searching**<br>Want to search an item's title *and* description? No problem. You can even override the scoring function if you want to get crazy.
- **Caret between items**<br>Order matters sometimes. Use the [left] and [right] arrow keys to move between items.</li>
- **Select &amp; delete multiple items at once**<br>Hold down [option] on Mac or [ctrl] on Windows to select more than one item to delete.
- **Díåcritîçs supported**<br>Great for international environments.
- **Item creation**<br>Allow users to create items on the fly (async supported).
- **Remote data loading**<br>For when you have thousands of options and want them provided by the server as the user types.
- **Clean API &amp; code**<br>Interface with it and make modifications easily. Pull requests welcome!

### Usage

```html
<script type="text/javascript" src="selectize.js"></script>
<link rel="stylesheet" type="text/css" href="selectize.css" />
<script type="text/javascript">
$(function() {
	$('select').selectize(options);
});
</script>
```

#### Options

<table width="100%">
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#general" name="general">General</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" width="60px" align="left">Type</th>
	</tr>
	<tr>
		<td valign="top"><code>delimiter</code></td>
		<td valign="top">The string to separate items by. This option is only used when Selectize is instantiated from a &lt;input type="text"&gt; element.</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>diacritics</code></td>
		<td valign="top">Enable or disable international character support.</td>
		<td valign="top"><code>boolean</code></td>
	</tr>
	<tr>
		<td valign="top"><code>create</code></td>
		<td valign="top">
			Allows the user to create a new items that aren't in the list of options. This option can be any of the following: "true" (default behavior), "false" (disabled), or a function that accepts two arguments: "input" and "callback". The callback should be invoked with the final data for the option.</td>
		<td valign="top"><code>mixed</code></td>
	</tr>
	<tr>
		<td valign="top"><code>highlight</code></td>
		<td valign="top">Toggles match highlighting within the dropdown menu.</td>
		<td valign="top"><code>boolean</code></td>
	</tr>
	<tr>
		<td valign="top"><code>persist</code></td>
		<td valign="top">If false, items created by the user will not show up as available options once they are unselected.</td>
		<td valign="top"><code>boolean</code></td>
	</tr>
	<tr>
		<td valign="top"><code>openOnFocus</code></td>
		<td valign="top">Show the dropdown immediately when the control receives focus.</td>
		<td valign="top"><code>boolean</code></td>
	</tr>
	<tr>
		<td valign="top"><code>maxOptions</code></td>
		<td valign="top">The max number of items to render at once in the dropdown list of options.</td>
		<td valign="top"><code>int</code></td>
	</tr>
	<tr>
		<td valign="top"><code>maxItems</code></td>
		<td valign="top">The max number of items the user can select.</td>
		<td valign="top"><code>int</code></td>
	</tr>
	<tr>
		<td valign="top"><code>hideSelected</code></td>
		<td valign="top">If true, the items that are currently selected will not be shown in the dropdown list of available options.</td>
		<td valign="top"><code>boolean</code></td>
	</tr>
	<tr>
		<td valign="top"><code>scrollDuration</code></td>
		<td valign="top">The animation duration (in milliseconds) of the scroll animation triggered when going [up] and [down] in the options dropdown.</td>
		<td valign="top"><code>int</code></td>
	</tr>
	<tr>
		<td valign="top"><code>loadThrottle</code></td>
		<td valign="top">The number of milliseconds to wait before requesting options from the server.</td>
		<td valign="top"><code>int</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#data_searching" name="data_searching">Data / Searching</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
	</tr>
	<tr>
		<td valign="top"><code>dataAttr</code></td>
		<td valign="top">The &lt;option&gt; attribute from which to read JSON data about the option.</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>valueField</code></td>
		<td valign="top">The name of the property to use as the "value" when an item is selected.</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>labelField</code></td>
		<td valign="top">The name of the property to render as the option/item label (not needed when custom rendering functions are defined).</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>sortField</code></td>
		<td valign="top">The name of the property to sort by. This is only used when the score of two or more items is identical.</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>sortDirection</code></td>
		<td valign="top">Sort direction ("asc" or "desc").</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>searchField</td>
		<td valign="top">An array of property names to analyze when filtering options.</td>
		<td valign="top"><code>array</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#callbacks" name="callbacks">Callbacks</a></th>
	</tr>
	<tr>
		<th valign="top" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" align="left">Type</th>
	</tr>
	<tr>
		<td valign="top"><code>load(query, callback)</code></td>
		<td valign="top">Invoked when new options should be loaded from the server.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>score(search)</code></td>
		<td valign="top">Overrides the scoring function used to sort available options. The provided function should return a number greater than or equal to zero to represent the "score" of the item. If 0, the option is declared not a match. The "search" argument is a <a href="#search">Search</a> object.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onChange(value)</code></td>
		<td valign="top">Invoked when the value of the control changes.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onItemAdd(value, $item)</code></td>
		<td valign="top">Invoked when an item is selected.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onItemRemove(value)</code></td>
		<td valign="top">Invoked when an item is deselected.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onClear()</code></td>
		<td valign="top">Invoked when the control is manually cleared via the clear() method.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onOptionAdd(value, data)</code></td>
		<td valign="top">Invoked when a new option is added to the available options list.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onOptionRemove(value)</code></td>
		<td valign="top">Invoked when an option is removed from the available options.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onDropdownOpen($dropdown)</code></td>
		<td valign="top">Invoked when the dropdown opens.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onDropdownClose($dropdown)</code></td>
		<td valign="top">Invoked when the dropdown closes.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<td valign="top"><code>onType(str)</code></td>
		<td valign="top">Invoked when the user types while filtering options.</td>
		<td valign="top"><code>function</code></td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#rendering" name="rendering">Rendering</a></th>
	</tr>
	<tr>
		<td valign="top"><code>render</code></td>
		<td valign="top">
			An object containing any of the following methods:
			<table width="100%">
				<tr>
					<td valign="top"><code>option(data)</code></td>
					<td valign="top">An option in the dropdown list of available options.</td>
				</tr>
				<tr>
					<td valign="top"><code>item(data)</code></td>
					<td valign="top">An item the user has selected.</td>
				</tr>
				<tr>
					<td valign="top"><code>option_create(data)</code></td>
					<td valign="top">The "create new" option at the bottom of the dropdown. The "data" argument contains one property: "input" (which is what the user has typed).</td>
				</tr>
			</table>
		</td>
		<td valign="top"><code>object</code></td>
	</tr>
</table>

## API

Selectize controls can be controlled programmatically via the methods described in this section.
When initializing the control, the "selectize" property is
added on the original &lt;select&gt; / &lt;input&gt; element—this
property points to the underlying Selectize instance.

```js
// initialize the selectize control
var $select = $('select').selectize(options);

// fetch the instance
var selectize = $select[0].selectize;
```

### Methods

<table width="100%">
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#methods_options" name="methods_options">Options</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Method</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>addOption(value, data)</code></td>
		<td valign="top">Adds an available option. If it already exists, nothing will happen. Note: this does not refresh the options list dropdown (use refreshOptions() for that).</td>
	</tr>
	<tr>
		<td valign="top"><code>updateOption(value, data)</code></td>
		<td valign="top">Updates an option available for selection. If it is visible in the selected items or options dropdown, it will be re-rendered automatically.</td>
	</tr>
	<tr>
		<td valign="top"><code>removeOption(value)</code></td>
		<td valign="top">Removes the option identified by the given value.</td>
	</tr>
	<tr>
		<td valign="top"><code>getOption(value)</code></td>
		<td valign="top">Retrieves the data for the option identified by the given value.</td>
	</tr>
	<tr>
		<td valign="top"><code>refreshOptions(triggerDropdown)</code></td>
		<td valign="top">Refreshes the list of available options shown in the autocomplete dropdown menu.</td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#methods_items" name="methods_items">Items</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Method</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>clear()</code></td>
		<td valign="top">Resets / clears all selected items from the control.</td>
	</tr>
	<tr>
		<td valign="top"><code>getItem(value)</code></td>
		<td valign="top">Returns the jQuery element of the item matching the given value.</td>
	</tr>
	<tr>
		<td valign="top"><code>addItem(value)</code></td>
		<td valign="top">"Selects" an item. Adds it to the list at the current caret position.</td>
	</tr>
	<tr>
		<td valign="top"><code>removeItem(value)</code></td>
		<td valign="top">Removes the selected item matching the provided value.</td>
	</tr>
	<tr>
		<td valign="top"><code>createItem(value)</code></td>
		<td valign="top">Invokes the "create" method provided in the selectize options that should provide the data for the new item, given the user input. Once this completes, it will be added to the item list.</td>
	</tr>
	<tr>
		<td valign="top"><code>refreshItems()</code></td>
		<td valign="top">Re-renders the selected item lists.</td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#methods_search" name="methods_search">Search</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Method</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>getScoreFunction(search)</code></td>
		<td valign="top">Returns a function for scoring individual options. This should only be used within the "score" callback provided in the options. Returns a float.</td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#methods_dropdown" name="methods_dropdown">Dropdown</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Method</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>open()</code></td>
		<td valign="top">Shows the autocomplete dropdown containing the available options.</td>
	</tr>
	<tr>
		<td valign="top"><code>close()</code></td>
		<td valign="top">Closes the autocomplete dropdown menu.</td>
	</tr>
	<tr>
		<td valign="top"><code>positionDropdown()</code></td>
		<td valign="top">Calculates and applies the appropriate position of the dropdown.</td>
	</tr>
	<tr>
		<th valign="top" colspan="3" align="left"><a href="#methods_other" name="methods_other">Other</a></th>
	</tr>
	<tr>
		<th valign="top" width="120px" align="left">Method</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>blur()</code></td>
		<td valign="top">Forces the control out of focus.</td>
	</tr>
	<tr>
		<td valign="top"><code>lock()</code></td>
		<td valign="top">Disables user input on the control.</td>
	</tr>
	<tr>
		<td valign="top"><code>unlock()</code></td>
		<td valign="top">Re-enables user input on the control.</td>
	</tr>
	<tr>
		<td valign="top"><code>getValue()</code></td>
		<td valign="top">Returns the value of the control. If multiple items can be selected (e.g. &lt;select multiple&gt;), this returns an array. If only one item can be selected, this returns a string.</td>
	</tr>
	<tr>
		<td valign="top"><code>setValue(value)</code></td>
		<td valign="top">Resets the selected items to the given value.</td>
	</tr>
</table>

### Related Objects

#### Search

<table width="100%">
	<tr>
		<th valign="top" width="120px" align="left">Option</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" width="60px" align="left">Type</th>
	</tr>
	<tr>
		<td valign="top"><code>query</code></td>
		<td valign="top">The raw user input.</td>
		<td valign="top"><code>string</code></td>
	</tr>
	<tr>
		<td valign="top"><code>tokens</code></td>
		<td valign="top">An array containing parsed search tokens. A token is an object containing two properties: "string" and "regex".</td>
		<td valign="top"><code>array</code></td>
	</tr>
	<tr>
		<td valign="top"><code>total</code></td>
		<td valign="top">The total number of results.</td>
		<td valign="top"><code>int</code></td>
	</tr>
	<tr>
		<td valign="top"><code>items</code></td>
		<td valign="top">A list of matched results. Each result is an object containing two properties: "score" and "value".</td>
		<td valign="top"><code>array</code></td>
	</tr>
</table>

## License

Copyright &copy; 2013 [Brian Reavis](http://twitter.com/brianreavis), [DIY](https://diy.org), & Contributors

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.