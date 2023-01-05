import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../../Theming/ThemeChanger";

export default function AutofillDisable() {
  useEffect(() => {
    $("#disabledAutoFill").selectize({
      plugins: ["autofill_disable"],
    });

  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        A plugin for disabling the autofill feature of the browser.
      </h4>

      <p>This select expected to open on bottom</p>
      <input id="disabledAutoFill" />

      <CodeBlock className="language-html" title="Html">
        {`<input id="disabledAutoFill" />`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$("#disabledAutoFill").selectize({
  plugins: ["autofill_disable"],
});`}
      </CodeBlock>
    </div>
  );
}
