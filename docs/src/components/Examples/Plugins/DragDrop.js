import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function DragNDrop() {
  const defaultValue = [1, 2, 3];

  useEffect(() => {
    $("#DragNDrop").selectize({
      plugins: ["drag_drop"],
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        Adds drag-and-drop support for easily rearranging selected items.
        Requires jQuery UI (sortable).
      </h4>

      <select id="DragNDrop" multiple defaultValue={defaultValue}>
        <option value="1">Awesome</option>
        <option value="2">Beast</option>
        <option value="3">Compatible</option>
        <option value="4">Thomas Edison</option>
        <option value="5">Nikola</option>
        <option value="6">Selectize</option>
        <option value="7">Javascript</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`<select id="DragNDrop" multiple>
  <option value="1" selected>Awesome</option>
  <option value="2" selected>Beast</option>
  <option value="3" selected>Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#DragNDrop").selectize({
  plugins: ["drag_drop"],
});`}
      </CodeBlock>
    </div>
  );
}
