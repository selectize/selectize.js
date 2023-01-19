import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function RestoreBackspace() {
  useEffect(() => {
    $("#restore-backspace").selectize({
      plugins: ["restore_on_backspace"],
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
        Press the [backspace] key and go back to editing the item without it being fully removed.
      </h4>

      <select id="restore-backspace" multiple defaultValue={['1', '2', '3']}>
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
<select id="restore-backspace" multiple>
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
        {`$("#restore-backspace").selectize({
  plugins: ["restore_on_backspace"],
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
