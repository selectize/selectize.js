---
title: sifter
description: API Reference for sifter
---
# API Documentation for sifter
<a name="Sifter"></a>

## Sifter
**Kind**: global class  

* [Sifter](#Sifter)
    * [new Sifter(items, items)](#new_Sifter_new)
    * [.tokenize(query)](#Sifter+tokenize) ⇒ <code>array</code>
    * [.iterator(object)](#Sifter+iterator)
    * [.getScoreFunction(search, options)](#Sifter+getScoreFunction) ⇒ <code>function</code>
        * [~scoreObject](#Sifter+getScoreFunction..scoreObject) ⇒ <code>number</code>
        * [~scoreValue(value, token)](#Sifter+getScoreFunction..scoreValue) ⇒ <code>number</code>
    * [.getSortFunction(search, options)](#Sifter+getSortFunction) ⇒
        * [~get_field(name, result)](#Sifter+getSortFunction..get_field) ⇒ <code>mixed</code>
    * [.prepareSearch(query, options)](#Sifter+prepareSearch) ⇒ <code>object</code>
    * [.search(query, options)](#Sifter+search) ⇒ <code>object</code>

<a name="new_Sifter_new"></a>

### new Sifter(items, items)
Textually searches arrays and hashes of objects
by property (or multiple properties). Designed
specifically for autocomplete.


| Param | Type |
| --- | --- |
| items | <code>array</code> \| <code>object</code> | 
| items | <code>object</code> | 

<a name="Sifter+tokenize"></a>

### sifter.tokenize(query) ⇒ <code>array</code>
Splits a search string into an array of individual
regexps to be used to match results.

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 

<a name="Sifter+iterator"></a>

### sifter.iterator(object)
Iterates over arrays and hashes.

```
this.iterator(this.items, function(item, id) {
   // invoked for each item
});
```

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  

| Param | Type |
| --- | --- |
| object | <code>array</code> \| <code>object</code> | 

<a name="Sifter+getScoreFunction"></a>

### sifter.getScoreFunction(search, options) ⇒ <code>function</code>
Returns a function to be used to score individual results.

Good matches will have a higher score than poor matches.
If an item is not a match, 0 will be returned by the function.

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  

| Param | Type | Description |
| --- | --- | --- |
| search | <code>object</code> \| <code>string</code> |  |
| options | <code>object</code> | (optional) |


* [.getScoreFunction(search, options)](#Sifter+getScoreFunction) ⇒ <code>function</code>
    * [~scoreObject](#Sifter+getScoreFunction..scoreObject) ⇒ <code>number</code>
    * [~scoreValue(value, token)](#Sifter+getScoreFunction..scoreValue) ⇒ <code>number</code>

<a name="Sifter+getScoreFunction..scoreObject"></a>

#### getScoreFunction~scoreObject ⇒ <code>number</code>
Calculates the score of an object
against the search query.

**Kind**: inner property of [<code>getScoreFunction</code>](#Sifter+getScoreFunction)  

| Param | Type |
| --- | --- |
| token | <code>object</code> | 
| data | <code>object</code> | 

<a name="Sifter+getScoreFunction..scoreValue"></a>

#### getScoreFunction~scoreValue(value, token) ⇒ <code>number</code>
Calculates how close of a match the
given value is against a search token.

**Kind**: inner method of [<code>getScoreFunction</code>](#Sifter+getScoreFunction)  

| Param | Type |
| --- | --- |
| value | <code>mixed</code> | 
| token | <code>object</code> | 

<a name="Sifter+getSortFunction"></a>

### sifter.getSortFunction(search, options) ⇒
Returns a function that can be used to compare two
results, for sorting purposes. If no sorting should
be performed, `null` will be returned.

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  
**Returns**: function(a,b)  

| Param | Type |
| --- | --- |
| search | <code>string</code> \| <code>object</code> | 
| options | <code>object</code> | 

<a name="Sifter+getSortFunction..get_field"></a>

#### getSortFunction~get\_field(name, result) ⇒ <code>mixed</code>
Fetches the specified sort field value
from a search result item.

**Kind**: inner method of [<code>getSortFunction</code>](#Sifter+getSortFunction)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| result | <code>object</code> | 

<a name="Sifter+prepareSearch"></a>

### sifter.prepareSearch(query, options) ⇒ <code>object</code>
Parses a search query and returns an object
with tokens and fields ready to be populated
with results.

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 
| options | <code>object</code> | 

<a name="Sifter+search"></a>

### sifter.search(query, options) ⇒ <code>object</code>
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

**Kind**: instance method of [<code>Sifter</code>](#Sifter)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 
| options | <code>object</code> | 

<a name="getattr"></a>

## getattr(obj, name, nesting) ⇒ <code>Object</code>
A property getter resolving dot-notation

**Kind**: global function  
**Returns**: <code>Object</code> - The resolved property value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The root object to fetch property on |
| name | <code>String</code> | The optionally dotted property name to fetch |
| nesting | <code>Boolean</code> | Handle nesting or not |

