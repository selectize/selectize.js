import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function SelectOnFocus() {
  useEffect(() => {
    $("#select-on-focus").selectize({
      plugins: ["select_on_focus"],
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        Select input value when input is focused
      </h4>

      <select id="select-on-focus">
        <option value="1">
          Awesome
        </option>
        <option value="2">
          Beast
        </option>
        <option value="3">
          Compatible
        </option>
        <option value="4">Thomas Edison</option>
        <option value="5">Nikola</option>
        <option value="6">Selectize</option>
        <option value="7">Javascript</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`
<select id="select-on-focus">
  <option value="1">Awesome</option>
  <option value="2">Beast</option>
  <option value="3">Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#select-on-focus").selectize({
  plugins: ["select_on_focus"]
});`}
      </CodeBlock>
    </div>
  );
}
