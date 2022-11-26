
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
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <ThemeChanger />
        <h4>Control Locking.</h4>
        <p>Selectize controls can be locked to prevent user interaction.</p>
        <div class="control-group">
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
        </div>
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
