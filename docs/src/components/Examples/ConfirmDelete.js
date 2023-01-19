
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function ConfirmDelete() {
  useEffect(() => {
    $('#input-tags').selectize({
      delimiter: ',',
      persist: false,
      onDelete: function (values) {
        return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
      }
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Using the Confirm Delete dialog</h4>
      <div className="control-group">
        <label htmlFor="input-tags">Tags:</label>
        <input type="text" id="input-tags" className="demo-default" defaultValue="awesome,neat,yeah" />
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group">
  <label for="input-tags">Tags:</label>
  <input type="text" id="input-tags" class="demo-default" value="awesome,neat,yeah">
</div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$('#input-tags').selectize({
  delimiter: ',',
  persist: false,
  onDelete: function(values) {
    return confirm(values.length > 1 ? 'Are you sure you want to remove these ' + values.length + ' items?' : 'Are you sure you want to remove "' + values[0] + '"?');
  }
});`}
      </CodeBlock>
    </>
  );
}
