
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";

export default function Events() {
  const defaultVal = ['WY'];

  useEffect(() => {
    var eventHandler = function (name) {
      return function () {
        console.log(name, arguments);
        $('#log').append('<div><span class="name">' + name + '</span></div>');
      };
    };
    $('#select-state').selectize({
      create: true,
      onChange: eventHandler('onChange'),
      onItemAdd: eventHandler('onItemAdd'),
      onItemRemove: eventHandler('onItemRemove'),
      onOptionAdd: eventHandler('onOptionAdd'),
      onOptionRemove: eventHandler('onOptionRemove'),
      onDropdownOpen: eventHandler('onDropdownOpen'),
      onDropdownClose: eventHandler('onDropdownClose'),
      onFocus: eventHandler('onFocus'),
      onBlur: eventHandler('onBlur'),
      onInitialize: eventHandler('onInitialize'),
    });
  });

  return (
    <>
      <ThemeChanger />
      <h4>Using Events</h4>
      <p>Check out the console for more details about each event.</p>
      <div className="control-group">
        <label htmlFor="select-state">States:</label>
        <select id="select-state" multiple name="state" defaultValue={defaultVal}>
          <option value="">Select a state...</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
      <h4 className='mt-4'>Event Log</h4>
      <pre id="log"></pre>

      <CodeBlock className="language-html" title="Html">
        {`<div class="control-group">
  <label for="select-state">States:</label>
  <select id="select-state" multiple name="state[]" class="demo-default">
    <option value="">Select a state...</option>
    <option value="AL">Alabama</option>
    ***
    <option value="WY" selected>Wyoming</option>
  </select>
</div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`var eventHandler = function(name) {
  return function() {
    console.log(name, arguments);
    $('#log').append('<div><span class="name">' + name + '</span></div>');
  };
};
var $select = $('#select-state').selectize({
  create          : true,
  onChange        : eventHandler('onChange'),
  onItemAdd       : eventHandler('onItemAdd'),
  onItemRemove    : eventHandler('onItemRemove'),
  onOptionAdd     : eventHandler('onOptionAdd'),
  onOptionRemove  : eventHandler('onOptionRemove'),
  onDropdownOpen  : eventHandler('onDropdownOpen'),
  onDropdownClose : eventHandler('onDropdownClose'),
  onFocus         : eventHandler('onFocus'),
  onBlur          : eventHandler('onBlur'),
  onInitialize    : eventHandler('onInitialize'),
});`}
      </CodeBlock>
    </>
  );
}
