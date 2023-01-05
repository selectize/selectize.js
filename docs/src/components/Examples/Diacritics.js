import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Diacritics() {
  useEffect(() => {
    $("#diacritics").selectize({
      delimiter: ",",
      persist: false,
      maxItems: null,
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
        Selectize can handle diacritics. Try typing "côte d'ivoire" or "são
      </h4>

      <select id='diacritics'>
        <option>Åland Islands</option>
        <option>Helô</option>
        <option>déjà vu</option>
      </select>

      <CodeBlock className="language-html" title="Html">
        {`<select id='diacritics'>
  <option>Åland Islands</option>
  <option>Helô</option>
  <option>déjà vu</option>
</select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#diacritics").selectize({
  delimiter: ",",
  persist: false,
  maxItems: null,
  create: function (input) {
    return {
      value: input,
      text: input,
    };
  }
});`}
      </CodeBlock>
    </div>
  );
}
