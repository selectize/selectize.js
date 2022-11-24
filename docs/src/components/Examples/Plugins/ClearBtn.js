
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function ClearButton() {
  useEffect(() => {
    $("#clearButton").selectize({
      plugins: ["clear_button"],
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
          A plugin by <a target="_blank" href="https://github.com/fabienwnklr">Fabien Winkler</a> that adds a clear button to single or multiple
          select.
        </h4>

        <select id="clearButton">
          <option value=""></option>
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
        {`<select id="clearButton">
  <option value=''></option>
  <option value='1'>Awosome</option>
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
        {`$("#clearButton").selectize({
  plugins: ["clear_button"],
});`}
      </CodeBlock>
    </div>
  );
}
