
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function DynamicOpt() {
  useEffect(() => {
    $('#select-tools').selectize({
      maxItems: null,
      valueField: 'id',
      labelField: 'title',
      searchField: 'title',
      options: [
        { id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers' },
        { id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart' },
        { id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape' }
      ],
      create: false
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Using Dynamic Options.</h4>
      <p>The options are created straight from an array.</p>
      <select id="select-tools" placeholder="Pick a tool..."></select>

      <CodeBlock className="language-html" title="Html">
        {`<select id="select-tools" placeholder="Pick a tool..."></select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`$('#select-tools').selectize({
  maxItems: null,
  valueField: 'id',
  labelField: 'title',
  searchField: 'title',
  options: [
    {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
    {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
    {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
  ],
  create: false
});`}
      </CodeBlock>
    </>
  );
}
