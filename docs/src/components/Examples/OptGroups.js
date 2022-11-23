import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function OptGroups() {
  useEffect(() => {
    $("#select-gear").selectize({
      sortField: "text",
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
          Selectize provides the ability to group options together within the dropdown menu.
        </h4>
        <select id="select-gear" multiple placeholder="Select gear...">
          <option value="">Select gear...</option>
          <optgroup label="Climbing">
            <option value="pitons">Pitons</option>
            <option value="cams">Cams</option>
            <option value="nuts">Nuts</option>
            <option value="bolts">Bolts</option>
            <option value="stoppers">Stoppers</option>
            <option value="sling">Sling</option>
          </optgroup>
          <optgroup label="Skiing">
            <option value="skis">Skis</option>
            <option value="skins">Skins</option>
            <option value="poles">Poles</option>
          </optgroup>
        </select>
      </div>

      <CodeBlock className="language-html" title="Html">
        {`
<select id="select-gear" class="demo-default" multiple placeholder="Select gear...">
    <option value="">Select gear...</option>
    <optgroup label="Climbing">
        <option value="pitons">Pitons</option>
        <option value="cams">Cams</option>
        <option value="nuts">Nuts</option>
        <option value="bolts">Bolts</option>
        <option value="stoppers">Stoppers</option>
        <option value="sling">Sling</option>
    </optgroup>
    <optgroup label="Skiing">
        <option value="skis">Skis</option>
        <option value="skins">Skins</option>
        <option value="poles">Poles</option>
    </optgroup>
</select>
        `}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {"$('#select-gear').selectize({ sortField: 'text' })"}
      </CodeBlock>
    </div>
  );
}
