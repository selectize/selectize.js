
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Performance() {
  useEffect(() => {
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV';
    var children = [];
    var options = [];
    for (var i = 0; i < 25000; i++) {
      var title = [];
      for (var j = 0; j < 8; j++) {
        title.push(letters.charAt(Math.round((letters.length - 1) * Math.random())));
      }
      options.push({
        id: i,
        title: title.join('')
      });
    }

    $('#select-junk').selectize({
      maxItems: null,
      maxOptions: 100,
      valueField: 'id',
      labelField: 'title',
      searchField: 'title',
      sortField: 'title',
      options: options,
      create: false
    });

    $('#select-children-load').click(function () {
      for (var i = 0; i < 12000; i++) {
        var title = [];

        for (var j = 0; j < 8; j++) {
          title.push(letters.charAt(Math.round((letters.length - 1) * Math.random())));
        }

        title = title.join('');

        var node = $('<option>', { text: title, value: title });
        children.push(node);
      }

      $('#select-children').append(children);
    });

    $('#select-children-activate').click(function () {
      $('#select-children').selectize({
        maxItems: null,
        create: true
      });
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Performance Demo</h4>
      <p>This shows how it performs with 25,000 items.</p>
      <div className="control-group">
        <label htmlFor="select-junk">Jumbled Mess:</label>
        <select id="select-junk" placeholder="Start Typing..."></select>
      </div>

      <h4 className="pt-6">Digestion of many children</h4>
      <p>This example shows how long it takes to initialize a demo with a lot of DOM children. Hint: Click the load button, then click the selectize button to run the demo.</p>
      <div className='pt-2 pb-2'>
        <button type="button" className="activate" id="select-children-load">Load</button>
        <button type="button" className="activate" id="select-children-activate">Selectize</button>
      </div>

      <div className="control-group">
        <select id="select-children"></select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group">
  <label for="select-junk">Jumbled Mess:</label>
  <select id="select-junk" placeholder="Start Typing..."></select>
</div>

<button type="button" class="activate" id="select-children-load">Load</button>
  <button type="button" class="activate" id="select-children-activate">Selectize</button>

  <div class="control-group">
    <select id="select-children"></select>
  </div>

`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {` var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV';
var options = [];
var children = [];
for (var i = 0; i < 25000; i++) {
  var title = [];
  for (var j = 0; j < 8; j++) {
    title.push(letters.charAt(Math.round((letters.length - 1) * Math.random())));
  }
  options.push({
    id: i,
    title: title.join('')
  });
}

$('#select-junk').selectize({
  maxItems: null,
  maxOptions: 100,
  valueField: 'id',
  labelField: 'title',
  searchField: 'title',
  sortField: 'title',
  options: options,
  create: false
});

$('#select-children-load').click(function () {
  for (var i = 0; i < 12000; i++) {
    var title = [];

    for (var j = 0; j < 8; j++) {
      title.push(letters.charAt(Math.round((letters.length - 1) * Math.random())));
    }

    title = title.join('');

    var node = $('<option>', { text: title, value: title });
    children.push(node);
  }

  $('#select-children').append(children);
});

$('#select-children-activate').click(function () {
  $('#select-children').selectize({
    maxItems: null,
    create: true
  });
});`}
      </CodeBlock>
    </>
  );
}
