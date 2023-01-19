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

      <ThemeChanger />
      <h4>
        A plugin for auto manage position of dropdown
      </h4>

      <p>This select is expected to open on bottom</p>
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

      <p>
        This select is expected to open on top.
        <br />
        <strong className="mb-2 text-red-600">You may need to scroll or adjust your browser window</strong>
      </p>
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
