import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function MaxItems() {
  useEffect(() => {
    $("select").selectize({
      maxItems: 3,
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
          This example only allows 3 items. Select one more item and the control
          will be disabled until one or more are deleted.
        </h4>

        <select multiple>
          <option value=""></option>
          <option value="1">Awesome</option>
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
<select multiple>
  <option value=""></option>
  <option value="1">Awesome</option>
  <option value="2">Beast</option>
  <option value="3">Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>
        `}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {"$('select').selectize({ maxItems: 3 })"}
      </CodeBlock>

    </div>
  );
}
