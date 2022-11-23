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
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <ThemeChanger />
        <h4 style={{ textAlign: "left", marginBottom: "4rem" }}>
          Adds drag-and-drop support for easily rearranging selected items.
          Requires jQuery UI (sortable).
        </h4>

        <select id="DragNDrop" multiple defaultValue={defaultValue}>
          <option value="1">Awosome</option>
          <option value="2">Beast</option>
          <option value="3">Compatible</option>
          <option value="4">Thomas Edison</option>
          <option value="5">Nikola</option>
          <option value="6">Selectize</option>
          <option value="7">Javascript</option>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`
<select id="DragNDrop" multiple>
  <option value="1" selected>Awosome</option>
  <option value="2" selected>Beast</option>
  <option value="3" selected>Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`
$("#DragNDrop").selectize({
  plugins: ["drag_drop"],
});`}
      </CodeBlock>
    </div>
  );
}
