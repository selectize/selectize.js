---
title: selectize
description: API Reference for selectize
---
# API Documentation for selectize

        

## setup()
Creates all elements and sets up event bindings.

**Kind**: global function  


## setupTemplates()
Sets up default rendering functions.

**Kind**: global function  


## setupCallbacks()
Maps fired events to callbacks provided
in the settings used when creating the control.

**Kind**: global function  


## onClick(e) ⇒ `boolean`
Triggered when the main control element
has a click event.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `PointerEvent` | 



## onMouseDown(e) ⇒ `boolean`
Triggered when the main control element
has a mouse down event.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onChange()
Triggered when the value of the control has been changed.
This should propagate the event to the original DOM
input / select element.

**Kind**: global function  


## onPaste(e) ⇒ `boolean`
Triggered on  paste.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onKeyPress(e) ⇒ `boolean`
Triggered on  keypress.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onKeyDown(e) ⇒ `boolean`
Triggered on  keydown.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onInput(e) ⇒ `boolean`
Triggered on  input.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onSearchChange(value)
Invokes the user-provide option provider / loader.

Note: this function is debounced in the Selectize
constructor (by `settings.loadThrottle` milliseconds)

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## onFocus(e) ⇒ `boolean`
Triggered on  focus.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | `FocusEvent` | (optional) |



## onBlur(e, dest)
Triggered on  blur.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 
| dest | `Element` | 



## onOptionHover(e) ⇒ `boolean`
Triggered when the user rolls over
an option in the autocomplete dropdown menu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onOptionSelect(e) ⇒ `boolean`
Triggered when the user clicks on an option
in the autocomplete dropdown menu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## onItemSelect(e) ⇒ `boolean`
Triggered when the user clicks on an item
that has been selected.

**Kind**: global function  

| Param | Type |
| --- | --- |
| e | `object` | 



## load(fn)
Invokes the provided method that provides
results to a callback---which are then added
as options to the control.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | `function` | 



## getTextboxValue() ⇒ `string`
Gets the value of input field of the control.

**Kind**: global function  
**Returns**: `string` - value  


## setTextboxValue(value)
Sets the input field of the control to the specified value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## getValue() ⇒ `mixed`
Returns the value of the control. If multiple items
can be selected (e.g. ), this returns
an array. If only one item can be selected, this
returns a string.

**Kind**: global function  


## setValue(value)
Resets the selected items to the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `Array.&lt;(String\|Number)&gt;` | 



## setMaxItems(value)
Resets the number of max items to the given value

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `number` | 



## setActiveItem($item, e)
Sets the selected item.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $item | `object` |  |
| e | `object` | (optional) |



## setActiveOption($object, scroll, animate)
Sets the selected item in the dropdown menu
of available options.

**Kind**: global function  

| Param | Type |
| --- | --- |
| $object | `object` | 
| scroll | `boolean` | 
| animate | `boolean` | 



## selectAll()
Selects all items (CTRL + A).

**Kind**: global function  


## hideInput()
Hides the input element out of view, while
retaining its focus.

**Kind**: global function  


## showInput()
Restores input visibility.

**Kind**: global function  


## focus()
Gives the control focus.

**Kind**: global function  


## blur(dest)
Forces the control out of focus.

**Kind**: global function  

| Param | Type |
| --- | --- |
| dest | `Element` | 



## getScoreFunction(query, options) ⇒ `function`
Returns a function that scores an object
to show how good of a match it is to the
provided query.

**Kind**: global function  

| Param | Type |
| --- | --- |
| query | `string` | 
| options | `object` | 



## getSearchOptions() ⇒ `object`
Returns search options for sifter (the system
for scoring and sorting results).

**Kind**: global function  
**See**: https://github.com/brianreavis/sifter.js  


## search(query) ⇒ `object`
Searches through available options and returns
a sorted array of matches.

Returns an object containing:

  - query {string}
  - tokens {array}
  - total {int}
  - items {array}

**Kind**: global function  

| Param | Type |
| --- | --- |
| query | `string` | 



## refreshOptions(triggerDropdown)
Refreshes the list of available options shown
in the autocomplete dropdown menu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| triggerDropdown | `boolean` | 



## addOption(data)
Adds an available option. If it already exists,
nothing will happen. Note: this does not refresh
the options list dropdown (use `refreshOptions`
for that).

Usage:

  this.addOption(data)

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | `object` \| `array` | 



## registerOption(data) ⇒ `boolean` \| `string`
Registers an option to the pool of options.

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | `object` | 



## registerOptionGroup(data) ⇒ `boolean` \| `string`
Registers an option group to the pool of option groups.

**Kind**: global function  

| Param | Type |
| --- | --- |
| data | `object` | 



## addOptionGroup(id, data)
Registers a new optgroup for options
to be bucketed into.

**Kind**: global function  

| Param | Type |
| --- | --- |
| id | `string` | 
| data | `object` | 



## removeOptionGroup(id)
Removes an existing option group.

**Kind**: global function  

| Param | Type |
| --- | --- |
| id | `string` | 



## clearOptionGroups()
Clears all existing option groups.

**Kind**: global function  


## updateOption(value, data)
Updates an option available for selection. If
it is visible in the selected items or options
dropdown, it will be re-rendered automatically.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 
| data | `object` | 



## removeOption(value, silent)
Removes a single option.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 
| silent | `boolean` | 



## clearOptions(silent)
Clears all options, including all selected items

**Kind**: global function  

| Param | Type |
| --- | --- |
| silent | `boolean` | 



## getOption(value) ⇒ `object`
Returns the jQuery element of the option
matching the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## getFirstOption() ⇒ `object`
Returns the jQuery element of the first
selectable option.

**Kind**: global function  


## getAdjacentOption($option, direction) ⇒ `object`
Returns the jQuery element of the next or
previous selectable option.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $option | `object` |  |
| direction | `int` | can be 1 for next or -1 for previous |



## getElementWithValue(value, $els) ⇒ `object`
Finds the first element with a "data-value" attribute
that matches the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `mixed` | 
| $els | `object` | 



## getElementWithTextContent(textContent, ignoreCase, $els) ⇒ `object`
Finds the first element with a "textContent" property
that matches the given textContent value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| textContent | `mixed` | 
| ignoreCase | `boolean` | 
| $els | `object` | 



## getItem(value) ⇒ `object`
Returns the jQuery element of the item
matching the given value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## getFirstItemMatchedByTextContent(value, ignoreCase) ⇒ `object`
Returns the jQuery element of the item
matching the given textContent.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 
| ignoreCase | `boolean` | 



## addItems(values, silent)
"Selects" multiple items at once. Adds them to the list
at the current caret position.

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | `string` | 
| silent | `boolean` | 



## addItem(value, silent)
"Selects" an item. Adds it to the list
at the current caret position.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 
| silent | `boolean` | 



## removeItem(value)
Removes the selected item matching
the provided value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## createItem(value, [triggerDropdown], [callback]) ⇒ `boolean`
Invokes the `create` method provided in the
selectize options that should provide the data
for the new item, given the user input.

Once this completes, it will be added
to the item list.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 
| [triggerDropdown] | `boolean` | 
| [callback] | `function` | 



## refreshItems()
Re-renders the selected item lists.

**Kind**: global function  


## refreshState()
Updates all state-dependent attributes
and CSS classes.

**Kind**: global function  


## refreshValidityState()
Update the `required` attribute of both input and control input.

The `required` property needs to be activated on the control input
for the error to be displayed at the right place. `required` also
needs to be temporarily deactivated on the input since the input is
hidden and can't show errors.

**Kind**: global function  


## refreshClasses()
Updates all state-dependent CSS classes.

**Kind**: global function  


## isFull() ⇒ `boolean`
Determines whether or not more items can be added
to the control without exceeding the user-defined maximum.

**Kind**: global function  


## updateOriginalInput()
Refreshes the original  or 
element to reflect the current state.

**Kind**: global function  


## updatePlaceholder()
Shows/hide the input placeholder depending
on if there items in the list already.

**Kind**: global function  


## open()
Shows the autocomplete dropdown containing
the available options.

**Kind**: global function  


## close()
Closes the autocomplete dropdown menu.

**Kind**: global function  


## positionDropdown()
Calculates and applies the appropriate
position of the dropdown.

**Kind**: global function  


## clear(silent)
Resets / clears all selected items
from the control.

**Kind**: global function  

| Param | Type |
| --- | --- |
| silent | `boolean` | 



## insertAtCaret($el)
A helper method for inserting an element
at the current caret position.

**Kind**: global function  

| Param | Type |
| --- | --- |
| $el | `object` | 



### insertAtCaret~target : `HTMLElement`
**Kind**: inner property of [`insertAtCaret`](#insertAtCaret)  


## deleteSelection(e) ⇒ `boolean`
Removes the current selected item(s).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | `object` | (optional) |



## advanceSelection(direction, e)
Selects the previous / next item (depending
on the `direction` argument).

> 0 - right


## advanceCaret(direction, e)
Moves the caret left / right.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| direction | `int` |  |
| e | `object` | (optional) |



## setCaret(i)
Moves the caret to the specified index.

**Kind**: global function  

| Param | Type |
| --- | --- |
| i | `int` | 



## lock()
Disables user input on the control. Used while
items are being asynchronously created.

**Kind**: global function  


## unlock()
Re-enables user input on the control.

**Kind**: global function  


## disable()
Disables user input on the control completely.
While disabled, it cannot receive focus.

**Kind**: global function  


## enable()
Enables the control so that it can respond
to focus and user input.

**Kind**: global function  


## destroy()
Completely destroys the control and
unbinds all event listeners so that it can
be garbage collected.

**Kind**: global function  


## render(templateName, data) ⇒ `string`
A helper method for rendering "item" and
"option" templates, given the data.

**Kind**: global function  

| Param | Type |
| --- | --- |
| templateName | `string` | 
| data | `object` | 



## clearCache(templateName)
Clears the render cache for a template. If
no template is given, clears all render
caches.

**Kind**: global function  

| Param | Type |
| --- | --- |
| templateName | `string` | 



## canCreate(input) ⇒ `boolean`
Determines whether or not to display the
create item prompt, given a user input.

**Kind**: global function  

| Param | Type |
| --- | --- |
| input | `string` | 

