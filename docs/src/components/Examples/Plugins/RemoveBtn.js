import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function RemoveButton() {
  useEffect(() => {
    $("#remove-button").selectize({
      plugins: ["remove_button"],
      delimiter: ",",
      persist: false,
      create: function (input) {
        return {
          value: input,
          text: input,
        };
      },
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        This plugin adds classic a classic remove button to each item for
        behavior that mimics Select2 and Chosen.
      </h4>

      <select id="remove-button" multiple defaultValue={['1', '2', '3']}>
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
        {`<select id="remove-button">
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
        {`$("#remove-button").selectize({
  plugins: ["remove_button"],
  delimiter: ",",
  persist: false,
  create: function (input) {
    return {
        value: input,
        text: input,
    };
  },
});`}
      </CodeBlock>
    </div>
  );
}
