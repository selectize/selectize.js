## Selectize API – Events

In the [usage documentation](usage.md), a few callbacks are listed that
allow you to listen for certain events. Callbacks aren't always ideal though;
specifically when you wish to have multiple handlers.

Selectize instances have a basic event emitter interface that mimics jQuery, Backbone.js, et al:

```js
var handler = function() { /* ... */ };
selectize.on('event_name', handler);
selectize.off('event_name');
selectize.off('event_name', handler);
```

### List of Events


<table width="100%">
	<tr>
		<th valign="top" width="200px" align="left">Event</th>
		<th valign="top" width="100px" align="left">Params</th>
		<th valign="top" align="left">Description</th>
	</tr>
	<tr>
		<td valign="top"><code>"initialize"</code></td>
		<td valign="top"></td>
		<td valign="top">Invoked once the control is completely initialized.</td>
	</tr>
	<tr>
		<td valign="top"><code>"change"</code></td>
		<td valign="top">value</td>
		<td valign="top">Invoked when the value of the control changes.</td>
	</tr>
	<tr>
		<td valign="top"><code>"item_add"</code></td>
		<td valign="top">value, $item</td>
		<td valign="top">Invoked when an item is selected.</td>
	</tr>
	<tr>
		<td valign="top"><code>"item_remove"</code></td>
		<td valign="top">value</td>
		<td valign="top">Invoked when an item is deselected.</td>
	</tr>
	<tr>
		<td valign="top"><code>"clear"</code></td>
		<td valign="top"></td>
		<td valign="top">Invoked when the control is manually cleared via the clear() method.</td>
	</tr>
	<tr>
		<td valign="top"><code>"option_add"</code></td>
		<td valign="top">value, data</td>
		<td valign="top">Invoked when a new option is added to the available options list.</td>
	</tr>
	<tr>
		<td valign="top"><code>"option_remove"</code></td>
		<td valign="top">value</td>
		<td valign="top">Invoked when an option is removed from the available options.</td>
	</tr>
	<tr>
		<td valign="top"><code>"dropdown_open"</code></td>
		<td valign="top">$dropdown</td>
		<td valign="top">Invoked when the dropdown opens.</td>
	</tr>
	<tr>
		<td valign="top"><code>"dropdown_close"</code></td>
		<td valign="top">$dropdown</td>
		<td valign="top">Invoked when the dropdown closes.</td>
	</tr>
	<tr>
		<td valign="top"><code>"type"</code></td>
		<td valign="top">str</td>
		<td valign="top">Invoked when the user types while filtering options.</td>
	</tr>
	<tr>
		<td valign="top"><code>"load"</code></td>
		<td valign="top">data</td>
		<td valign="top">Invoked when new options have been loaded and added to the control (via the "load" option or "load" API method).</td>
	</tr>
	<tr>
		<td valign="top"><code>"destroy"</code></td>
		<td valign="top"></td>
		<td valign="top">Invoked right before the control is destroyed.</td>
	</tr>
</table>