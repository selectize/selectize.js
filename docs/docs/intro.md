---
sidebar_position: 1
---

# Getting Started with Selectize

Selectize is a JavaScript library that provides a rich user experience for selecting items from a list. It supports single and multi-value selections, searching, tagging, remote data sets, and infinite scrolling.

## Installation

### What you'll need

Selectize requires jQuery. We also include styles for bootstrap, but also provide raw Less and Sass files for you to customize with any framework you like.

If you want to use the Drag & Drop plugin, you'll need jQuery UI.

### Install with npm

```bash
npm install @selectize/selectize
```

## Usage

In its simplest form, Selectize can be initialized on an existing `<select>` element:

```html
<script type="text/javascript" src="selectize.js"></script>
<link rel="stylesheet" type="text/css" href="selectize.css" />
<script>
  $(function () {
    $("select").selectize(options);
  });
</script>
```
