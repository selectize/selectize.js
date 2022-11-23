---
title: microevent
description: API Reference for microevent
---
# API Documentation for microevent

        

## MicroEvent()
MicroEvent - to make any js object an event emitter

- pure javascript - server compatible, browser compatible
- don't rely on the browser doms
- super simple - you get it immediately, no mystery, no magic involved

**Kind**: global function  
**Author**: Jerome Etienne (https://github.com/jeromeetienne)  


### MicroEvent.mixin(the)
Mixin will delegate all MicroEvent.js function in the destination object.

- MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent

**Kind**: static method of [`MicroEvent`](#MicroEvent)  

| Param | Type | Description |
| --- | --- | --- |
| the | `object` | object which will support MicroEvent |

