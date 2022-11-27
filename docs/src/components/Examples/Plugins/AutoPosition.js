import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function AutoPosition() {
  useEffect(() => {
    $("#autoPositionBottom").selectize({
      plugins: ["auto_position"],
    });

    $("#autoPositionTop").selectize({
      plugins: ["auto_position"],
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
          A plugin by for auto manage position of dropdown
        </h4>

        <p>This select expected to open on bottom</p>
        <select id="autoPositionBottom">
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
        {`<select id="autoPositionBottom">
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
        {`$("#autoPositionBottom").selectize({
  plugins: ["auto_position"],
});`}
      </CodeBlock>

      <div style={{ marginTop: "10rem" }}>
        <p>This select expected to open on top</p>
          <pre className="margin-bottom--md">Scroll to auto update dropdown positionning</pre>
        <select id="autoPositionTop">
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
        {`<select id="autoPositionTop">
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
        {`$("#autoPositionTop").selectize({
  plugins: ["auto_position"],
});`}
      </CodeBlock>
    </div>
  );
}
