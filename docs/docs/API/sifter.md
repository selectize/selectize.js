---
title: sifter
description: API Reference for sifter
---
# API Documentation for sifter

        

## Sifter
**Kind**: global class  

* [Sifter](#Sifter)
    * [new Sifter(items, items)](#new_Sifter_new)
    * [.tokenize(query)](#Sifter+tokenize) ⇒ `array`
    * [.iterator(object)](#Sifter+iterator)
    * [.getScoreFunction(search, options)](#Sifter+getScoreFunction) ⇒ `function`
        * [~scoreObject](#Sifter+getScoreFunction..scoreObject) ⇒ `number`
        * [~scoreValue(value, token)](#Sifter+getScoreFunction..scoreValue) ⇒ `number`
    * [.getSortFunction(search, options)](#Sifter+getSortFunction) ⇒
        * [~get_field(name, result)](#Sifter+getSortFunction..get_field) ⇒ `mixed`
    * [.prepareSearch(query, options)](#Sifter+prepareSearch) ⇒ `object`
    * [.search(query, options)](#Sifter+search) ⇒ `object`



### new Sifter(items, items)
Textually searches arrays and hashes of objects
by property (or multiple properties). Designed
specifically for autocomplete.


| Param | Type |
| --- | --- |
| items | `array` \| `object` | 
| items | `object` | 



### sifter.tokenize(query) ⇒ `array`
Splits a search string into an array of individual
regexps to be used to match results.

**Kind**: instance method of [`Sifter`](#Sifter)  

| Param | Type |
| --- | --- |
| query | `string` | 



### sifter.iterator(object)
Iterates over arrays and hashes.

```
this.iterator(this.items, function(item, id) {
   // invoked for each item
});
```

**Kind**: instance method of [`Sifter`](#Sifter)  

| Param | Type |
| --- | --- |
| object | `array` \| `object` | 



### sifter.getScoreFunction(search, options) ⇒ `function`
Returns a function to be used to score individual results.

Good matches will have a higher score than poor matches.
If an item is not a match, 0 will be returned by the function.

**Kind**: instance method of [`Sifter`](#Sifter)  

| Param | Type | Description |
| --- | --- | --- |
| search | `object` \| `string` |  |
| options | `object` | (optional) |


* [.getScoreFunction(search, options)](#Sifter+getScoreFunction) ⇒ `function`
    * [~scoreObject](#Sifter+getScoreFunction..scoreObject) ⇒ `number`
    * [~scoreValue(value, token)](#Sifter+getScoreFunction..scoreValue) ⇒ `number`



#### getScoreFunction~scoreObject ⇒ `number`
Calculates the score of an object
against the search query.

**Kind**: inner property of [`getScoreFunction`](#Sifter+getScoreFunction)  

| Param | Type |
| --- | --- |
| token | `object` | 
| data | `object` | 



#### getScoreFunction~scoreValue(value, token) ⇒ `number`
Calculates how close of a match the
given value is against a search token.

**Kind**: inner method of [`getScoreFunction`](#Sifter+getScoreFunction)  

| Param | Type |
| --- | --- |
| value | `mixed` | 
| token | `object` | 



### sifter.getSortFunction(search, options) ⇒
Returns a function that can be used to compare two
results, for sorting purposes. If no sorting should
be performed, `null` will be returned.

**Kind**: instance method of [`Sifter`](#Sifter)  
**Returns**: function(a,b)  

| Param | Type |
| --- | --- |
| search | `string` \| `object` | 
| options | `object` | 



#### getSortFunction~get\_field(name, result) ⇒ `mixed`
Fetches the specified sort field value
from a search result item.

**Kind**: inner method of [`getSortFunction`](#Sifter+getSortFunction)  

| Param | Type |
| --- | --- |
| name | `string` | 
| result | `object` | 



### sifter.prepareSearch(query, options) ⇒ `object`
Parses a search query and returns an object
with tokens and fields ready to be populated
with results.

**Kind**: instance method of [`Sifter`](#Sifter)  

| Param | Type |
| --- | --- |
| query | `string` | 
| options | `object` | 



### sifter.search(query, options) ⇒ `object`
Searches through all items and returns a sorted array of matches.

The `options` parameter can contain:

  - fields {string|array}
  - sort {array}
  - score {function}
  - filter {bool}
  - limit {integer}

Returns an object containing:

  - options {object}
  - query {string}
  - tokens {array}
  - total {int}
  - items {array}

**Kind**: instance method of [`Sifter`](#Sifter)  

| Param | Type |
| --- | --- |
| query | `string` | 
| options | `object` | 



## getattr(obj, name, nesting) ⇒ `Object`
A property getter resolving dot-notation

**Kind**: global function  
**Returns**: `Object` - The resolved property value  

| Param | Type | Description |
| --- | --- | --- |
| obj | `Object` | The root object to fetch property on |
| name | `String` | The optionally dotted property name to fetch |
| nesting | `Boolean` | Handle nesting or not |

