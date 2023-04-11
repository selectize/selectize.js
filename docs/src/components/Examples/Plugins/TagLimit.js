import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function SelectOnFocus() {
  useEffect(() => {
    $("#tag-limit").selectize({
      plugins: ["tag_limit"],
      hideSelected: false, // For show selected value on click in select
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        Doesn't show all item when selected item passed limit conf (default = 5)
      </h4>

      <select id="tag-limit" multiple defaultValue={[1,2,3,4,5,6,7,8,9,10,11]}>
        <option value="1">Awesome</option>
        <option value="2">Beast</option>
        <option value="3">Compatible</option>
        <option value="4">Thomas Edison</option>
        <option value="5">Nikola</option>
        <option value="6">Selectize</option>
        <option value="7">Javascript</option>
        <option value="8">Typescript</option>
        <option value="9">Cordova</option>
        <option value="10">Flutter</option>
        <option value="11">Dart</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`
<select id="tag-limit" mutliple>
  <option value="1" selected>Awesome</option>
  <option value="2" selected>Beast</option>
  <option value="3" selected>Compatible</option>
  <option value="4" selected>Thomas Edison</option>
  <option value="5" selected>Nikola</option>
  <option value="6" selected>Selectize</option>
  <option value="7" selected>Javascript</option>
  <option value="8" selected>Typescript</option>
  <option value="9" selected>Cordova</option>
  <option value="10" selected>Flutter</option>
  <option value="11" selected>Dart</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#tag-limit").selectize({
  plugins: ["tag_limit"],
  hideSelected: false, // For show selected value on click in select
});`}
      </CodeBlock>
    </div>
  );
}
