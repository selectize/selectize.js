
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Required() {
  useEffect(() => {
    $('#select-beast').selectize({
      create: true,
      sortField: {
        field: 'text',
        direction: 'asc'
      }
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Required element</h4>
      <div className="control-group">
        <form>
          <label htmlFor="select-beast">Beast:</label>
          <select id="select-beast" required className="demo-default"
            placeholder="Select a person..." name="beast">
            <option value="">Select a person...</option>
            <option value="4">Thomas Edison</option>
            <option value="1">Nikola</option>
            <option value="3">Nikola Tesla</option>
            <option value="5">Arnold Schwarzenegger</option>
          </select>
          <button style={{ marginTop: '2em' }} type="submit">Submit</button>
        </form>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group">
<form>
  <label for="select-beast">Beast:</label>
  <select id="select-beast" required class="demo-default"
    placeholder="Select a person..." name="beast">
    <option value="">Select a person...</option>
    <option value="4">Thomas Edison</option>
    <option value="1">Nikola</option>
    <option value="3">Nikola Tesla</option>
    <option value="5">Arnold Schwarzenegger</option>
  </select>
    <button type="submit">Submit</button>
</form>
</div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$('#select-beast').selectize({
  create: true,
  sortField: {
    field: 'text',
    direction: 'asc'
  }
});
        `}
      </CodeBlock>
    </>
  );
}
