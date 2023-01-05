import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function AutoSelectOnType() {
  useEffect(() => {
    $("#autoSelectOnType").selectize({
      plugins: ["auto_select_on_type"],
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        A plugin by <a href="https://github.com/risadams">Ris Adams</a> for
        auto select value on <code>blur</code> if exact value available. Try
        with tipping 'beast' and click outside of input.
      </h4>

      <select id="autoSelectOnType">
        <option value=""></option>
        <option value="1">Awesome</option>
        <option value="2">Beast</option>
        <option value="3">Compatible</option>
        <option value="4">Thomas Edison</option>
        <option value="5">Nikola</option>
        <option value="6">Selectize</option>
        <option value="7">Javascript</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`<select id="autoSelectOnType">
  <option value=''></option>
  <option value='1'>Awesome</option>
  <option value='2'>Beast</option>
  <option value='3'>Compatible</option>
  <option value='4'>Thomas Edison</option>
  <option value='5'>Nikola</option>
  <option value='6'>Selectize</option>
  <option value='7'>Javascript</option>
</select>
              `}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#autoSelectOnType").selectize({
  plugins: ["auto_select_on_type"],
});`}
      </CodeBlock>
    </div>
  );
}
