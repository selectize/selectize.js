
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Rtl() {
  useEffect(() => {
    $('#input-tags').selectize({
      persist: false,
      create: true
    });
    $('#select-beast').selectize({});
  });

  return (
    <>
      <ThemeChanger />
      <h4>Right-to-left Support (RTL)</h4>
      <div className="control-group" dir="rtl">
        <label htmlFor="input-tags">Multiple: </label>
        <input type="text" id="input-tags" className="demo-default" defaultValue="awesome,neat" />
      </div>

      <div className="control-group" dir="rtl">
        <label htmlFor="select-beast">Single: </label>
        <select id="select-beast" className="demo-default" placeholder="Select a person...">
          <option value="">Select a person...</option>
          <option value="4">Thomas Edison</option>
          <option value="1">Nikola</option>
          <option value="3">Nikola Tesla</option>
          <option value="5">Arnold Schwarzenegger</option>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group" dir="rtl">
  <label for="input-tags">Multiple: </label>
  <input type="text" id="input-tags" class="demo-default" value="awesome,neat">
</div>

<div class="control-group" dir="rtl">
  <label for="select-beast">Single: </label>
  <select id="select-beast" class="demo-default" placeholder="Select a person...">
    <option value="">Select a person...</option>
    <option value="4">Thomas Edison</option>
    <option value="1">Nikola</option>
    <option value="3">Nikola Tesla</option>
    <option value="5">Arnold Schwarzenegger</option>
  </select>
</div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$('#input-tags').selectize({
  persist: false,
  create: true
});

$('#select-beast').selectize({});`}
      </CodeBlock>
    </>
  );
}
