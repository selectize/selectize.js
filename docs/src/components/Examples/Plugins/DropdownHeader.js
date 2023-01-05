import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function DropdownHeader() {
  useEffect(() => {
    $("#dropdownHeader").selectize({
      plugins: {
        dropdown_header: {
          title: 'Dropdown Header'
        }
      },
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        A plugin by <a href="https://github.com/brianreavis">Brian Reavis</a> for add dropdown header to native dropdown with a close button.
      </h4>

      <select id="dropdownHeader">
        <option value="1">Awesome</option>
        <option value="2">Beast</option>
        <option value="3">Compatible</option>
        <option value="4">Thomas Edison</option>
        <option value="5">Nikola</option>
        <option value="6">Selectize</option>
        <option value="7">Javascript</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`<select id="dropdownHeader">
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
        {`    $("#dropdownHeader").selectize({
  plugins: {
    dropdown_header: {
        title: 'Dropdown Header'
    }
  },
});`}
      </CodeBlock>
    </div>
  );
}
