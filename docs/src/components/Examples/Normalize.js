import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Normalize() {
  useEffect(() => {
    $("#normalize").selectize({ normalize: true });
  });

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <ThemeChanger />
        <h4>Normalize string sent for search with any accent:</h4>
        <pre>
          "à", "è", "ì", "ò", "ù", "À", "È", "Ì", "Ò", "Ù", "á", "é", "í", "ó",
          <br />"ú", "ý", "Á", "É", "Í", "Ó", "Ú", "Ý", "â", "ê", "î", "ô", "û", "Â",
          <br />"Ê", "Î", "Ô", "Û", "ã", "ñ", "õ", "Õ", "Ã", "Ñ", "ä", "ë", "ï", "ö",
          <br />"ü", "ÿ", "Ä", "Ë", "Ï", "Ö", "Ü", "Ÿ", "ç", "Ç", "å", "Å"
        </pre>
        <select id="normalize">
          <option value=""></option>
          <option value="1">Awsome</option>
          <option value="2">Beast</option>
          <option value="3">Compatible</option>
          <option value="4">Thomas Edison</option>
          <option value="5">Nikola</option>
          <option value="6">Selectize</option>
          <option value="7">Javascript</option>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<select id="normalize">
  <option value=""></option>
  <option value="1">Awesome</option>
  <option value="2">Beast</option>
  <option value="3">Compatible</option>
  <option value="4">Thomas Edison</option>
  <option value="5">Nikola</option>
  <option value="6">Selectize</option>
  <option value="7">Javascript</option>
</select>
        `}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="javascript">
        {"$('#normalize').selectize({ normalize: true });"}
      </CodeBlock>
    </div>
  );
}
