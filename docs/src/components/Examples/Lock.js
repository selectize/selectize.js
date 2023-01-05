
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Lock() {
  useEffect(() => {
    $('select').selectize({ create: true });
    $('#select-locked-empty')[0].selectize.lock();
    $('#select-locked-single')[0].selectize.lock();
    $('#select-locked')[0].selectize.lock();
  });

  return (
    <>
      <ThemeChanger />
      <h4>Control Locking.</h4>
      <p>Selectize controls can be locked to prevent user interaction.</p>
      <div className="control-group">
        <label htmlFor="select-locked-empty">Locked (empty):</label>
        <select id="select-locked-empty" multiple placeholder="No input allowed...">
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="select-locked-single">Locked (single):</label>
        <select id="select-locked-single" placeholder="No input allowed..." defaultValue={'B'}>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="select-locked">Locked:</label>
        <select id="select-locked" multiple placeholder="No input allowed..." defaultValue={['B', 'C']}>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
        </select>
      </div>
      <div className="control-group">
        <label htmlFor="select-unlocked">Unlocked:</label>
        <select id="select-unlocked" multiple placeholder="Input allowed...">
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group">
  <label for="select-locked-empty">Locked (empty):</label>
  <select id="select-locked-empty" multiple placeholder="No input allowed...">
    <option value="A">Option A</option>
    <option value="B">Option B</option>
    <option value="C">Option C</option>
  </select>
</div>
<div class="control-group">
  <label for="select-locked-single">Locked (single):</label>
  <select id="select-locked-single" placeholder="No input allowed...">
    <option value="A">Option A</option>
    <option value="B" selected>Option B</option>
    <option value="C">Option C</option>
  </select>
</div>
<div class="control-group">
  <label for="select-locked">Locked:</label>
  <select id="select-locked" multiple placeholder="No input allowed...">
    <option value="A">Option A</option>
    <option value="B" selected>Option B</option>
    <option value="C" selected>Option C</option>
  </select>
</div>
<div class="control-group">
  <label for="select-unlocked">Unlocked:</label>
  <select id="select-unlocked" multiple placeholder="Input allowed...">
    <option value="A">Option A</option>
    <option value="B">Option B</option>
    <option value="C">Option C</option>
  </select>
</div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$('select').selectize({create: true});
$('#select-locked-empty')[0].selectize.lock();
$('#select-locked-single')[0].selectize.lock();
$('#select-locked')[0].selectize.lock();`}
      </CodeBlock>
    </>
  );
}
