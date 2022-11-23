import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Tagging() {
  useEffect(() => {
    $("#input-tags").selectize({
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
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <ThemeChanger />
        <h4 style={{ textAlign: "left", marginBottom: "4rem" }}>
          Add and remove items in any order without touching your mouse. Use
          your left/right arrow keys to move the caret (ibeam) between items.
          This example is instantiated from a <code>{'<input type="text">'}</code> rendering (as of v0.5.0). element (note that the value is represented as a string).
        </h4>

        <input
          type="text"
          id="input-tags"
          defaultValue="awesome,neasted,beast"
        />
      </div>

      <CodeBlock className="language-html" title="Html">
        {`<input type="text" id="input-tags" value="awesome,neasted,beast" />`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`
$("#input-tags").selectize({
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
