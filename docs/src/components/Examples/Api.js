
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Api() {
  useEffect(() => {
    var $select = $('#select-tools').selectize({
      maxItems: null,
      valueField: 'id',
      labelField: 'title',
      searchField: 'title',
      options: [
        { id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers' },
        { id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart' },
        { id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape' }
      ],
      create: false
    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    var control = $select[0].selectize;

    $('#button-clear').on('click', function () {
      control.clear();
    });

    $('#button-clearoptions').on('click', function () {
      control.clearOptions();
    });

    $('#button-addoption').on('click', function () {
      control.addOption({
        id: 4,
        title: 'Something New',
        url: 'http://google.com'
      });
    });

    $('#button-additem').on('click', function () {
      control.addItem(2);
    });

    $('#button-maxitems2').on('click', function () {
      control.setMaxItems(2);
    });

    $('#button-maxitems100').on('click', function () {
      control.setMaxItems(100);
    });

    $('#button-setvalue').on('click', function () {
      control.setValue([2, 3]);
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Examples of how to interact with the control programmatically.</h4>
      <div className="control-group">
        <select id="select-tools" multiple placeholder="Pick a tool..."></select>
      </div>

      <div className="pt-4">
        <button type="button" value="clear()" id="button-clear">clear()</button>
        <button type="button" value="clearOptions()" id="button-clearoptions">clearOptions()</button>
        <button type="button" value="addOption()" id="button-addoption">addOption()</button>
        <button type="button" value="addItem()" id="button-additem">addItem()</button>
        <button type="button" value="setValue()" id="button-setvalue">setValue()</button>
        <button type="button" value="maxItems(2)" id="button-maxitems2">maxItems(2)</button>
        <button type="button" value="maxItems(100)" id="button-maxitems100">maxItems(100)</button>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<select id="select-tools" multiple placeholder="Pick a tool..."></select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`var $select = $('#select-tools').selectize({
  maxItems: null,
  valueField: 'id',
  labelField: 'title',
  searchField: 'title',
  options: [
    {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
    {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
    {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
  ],
  create: false
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var control = $select[0].selectize;

$('#button-clear').on('click', function() {
  control.clear();
});

$('#button-clearoptions').on('click', function() {
  control.clearOptions();
});

$('#button-addoption').on('click', function() {
  control.addOption({
    id: 4,
    title: 'Something New',
    url: 'http://google.com'
  });
});

$('#button-additem').on('click', function() {
  control.addItem(2);
});

$('#button-maxitems2').on('click', function() {
  control.setMaxItems(2);
});

$('#button-maxitems100').on('click', function() {
  control.setMaxItems(100);
});

$('#button-setvalue').on('click', function() {
  control.setValue([2, 3]);
});
        `}
      </CodeBlock>
    </>
  );
}
