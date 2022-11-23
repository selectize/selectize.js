---
title: utils
description: API Reference for utils
---
# API Documentation for utils

        

## isset(object) ⇒ `boolean`
Determines if the provided value has been defined.

**Kind**: global function  

| Param | Type |
| --- | --- |
| object | `mixed` | 



## hash\_key(value) ⇒ `string` \| `null`
Converts a scalar to its best string representation
for hash keys and HTML attribute values.

Transformations:
  'str'     -> 'str'
  null      -> ''
  undefined -> ''
  true      -> '1'
  false     -> '0'
  0         -> '0'
  1         -> '1'

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | `string` | 



## escape\_html(str) ⇒ `string`
Escapes a string for use within HTML.

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | `string` | 



## escape\_replace(str) ⇒ `string`
Escapes "$" characters in replacement strings.

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | `string` | 



## once(fn) ⇒ `function`
Wraps `fn` so that it can only be invoked once.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | `function` | 



## debounce(fn, delay) ⇒ `function`
Wraps `fn` so that it can only be called once
every `delay` milliseconds (invoked on the falling edge).

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | `function` | 
| delay | `int` | 



## debounce\_events(self, types, fn)
Debounce all fired events types listed in `types`
while executing the provided `fn`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| self | `object` | 
| types | `array` | 
| fn | `function` | 



## watchChildEvent($parent, event, selector, fn)
A workaround for http://bugs.jquery.com/ticket/6696

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $parent | `object` | Parent element to listen on. |
| event | `string` | Event name. |
| selector | `string` | Descendant selector to filter by. |
| fn | `function` | Event handler. |



## getInputSelection(input) ⇒ `object`
Determines the current selection within a text input control.
Returns an object containing:
  - start
  - length

**Kind**: global function  

| Param | Type |
| --- | --- |
| input | `object` | 



## transferStyles($from, $to, properties)
Copies CSS properties from one element to another.

**Kind**: global function  

| Param | Type |
| --- | --- |
| $from | `object` | 
| $to | `object` | 
| properties | `array` | 



## measureString(str, $parent) ⇒ `int`
Measures the width of a string within a
parent element (in pixels).

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | `string` | 
| $parent | `object` | 



## autoGrow($input)
Sets up an input to grow horizontally as the user
types. If the value is changed manually, you can
trigger the "update" handler to resize:

$input.trigger('update');

**Kind**: global function  

| Param | Type |
| --- | --- |
| $input | `object` | 



## isJSON(data) ⇒ `Boolean`
**Kind**: global function  
**Returns**: `Boolean` - true if is an JSON object  

| Param | Type | Description |
| --- | --- | --- |
| data | `any` | Data to testing |

