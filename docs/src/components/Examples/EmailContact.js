
import React, { useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import ThemeChanger from "../Theming/ThemeChanger";
import './EmailContact.css'

export default function EmailContact() {
  useEffect(() => {
    const REGEX_EMAIL =
      "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
      "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";

    $("#select-to").selectize({
      persist: false,
      maxItems: null,
      valueField: "email",
      labelField: "name",
      searchField: ["name", "email"],
      options: [
        { email: "selectize@risadams.com", name: "Ris Adams" },
        { email: "brian@thirdroute.com", name: "Brian Reavis" },
        { email: "nikola@tesla.com", name: "Nikola Tesla" },
        { email: "someone@gmail.com" },
      ],
      render: {
        item: function (item, escape) {
          return (
            "<div>" +
            (item.name
              ? '<span class="name">' + escape(item.name) + "</span>"
              : "") +
            (item.email
              ? '<span class="email">' + escape(item.email) + "</span>"
              : "") +
            "</div>"
          );
        },
        option: function (item, escape) {
          var label = item.name || item.email;
          var caption = item.name ? item.email : null;
          return (
            "<div>" +
            '<span class="label">' +
            escape(label) +
            "</span>" +
            (caption
              ? '<span class="caption">' + escape(caption) + "</span>"
              : "") +
            "</div>"
          );
        },
      },
      createFilter: function (input) {
        var match, regex;

        // email@address.com
        regex = new RegExp("^" + REGEX_EMAIL + "$", "i");
        match = input.match(regex);
        if (match) return !this.options.hasOwnProperty(match[0]);

        // name <email@address.com>
        regex = new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i");
        match = input.match(regex);
        if (match) return !this.options.hasOwnProperty(match[2]);

        return false;
      },
      create: function (input) {
        if (new RegExp("^" + REGEX_EMAIL + "$", "i").test(input)) {
          return { email: input };
        }
        var match = input.match(
          new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i")
        );
        if (match) {
          return {
            email: match[2],
            name: $.trim(match[1]),
          };
        }
        alert("Invalid email address.");
        return false;
      },
    });
  });

  return (
    <div>
      <ThemeChanger />
      <h4>
        This demonstrates two main things: (1) custom item and option rendering,
        and (2) item creation on-the-fly. Try typing a valid and invalid email
        address.
      </h4>
      <select
        id="select-to"
        className="contacts"
        placeholder="Pick some people..."
      ></select>

      <CodeBlock className="language-html" title="Html">
        {`<select id="select-to" class="contacts" placeholder="Pick some people..."></select>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`const REGEX_EMAIL = "([a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@" + "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";

$("#select-to").selectize({
  persist: false,
  maxItems: null,
  valueField: "email",
  labelField: "name",
  searchField: ["name", "email"],
  options: [
    { email: "brian@thirdroute.com", name: "Brian Reavis" },
    { email: "nikola@tesla.com", name: "Nikola Tesla" },
    { email: "someone@gmail.com" },
  ],
  render: {
    item: function (item, escape) {
        return (
        "<div>" +
        (item.name
            ? '<span class="name">' + escape(item.name) + "</span>"
            : "") +
        (item.email
            ? '<span class="email">' + escape(item.email) + "</span>"
            : "") +
        "</div>"
        );
    },
    option: function (item, escape) {
        var label = item.name || item.email;
        var caption = item.name ? item.email : null;
        return (
        "<div>" +
        '<span class="label">' +
        escape(label) +
        "</span>" +
        (caption
            ? '<span class="caption">' + escape(caption) + "</span>"
            : "") +
        "</div>"
        );
    },
  },
  createFilter: function (input) {
    var match, regex;

    // email@address.com
    regex = new RegExp("^" + REGEX_EMAIL + "$", "i");
    match = input.match(regex);
    if (match) return !this.options.hasOwnProperty(match[0]);

    // name <email@address.com>
    regex = new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i");
    match = input.match(regex);
    if (match) return !this.options.hasOwnProperty(match[2]);

    return false;
  },
  create: function (input) {
    if (new RegExp("^" + REGEX_EMAIL + "$", "i").test(input)) {
        return { email: input };
    }
    var match = input.match(
        new RegExp("^([^<]*)<" + REGEX_EMAIL + ">$", "i")
    );
    if (match) {
        return {
        email: match[2],
        name: $.trim(match[1]),
        };
    }
    alert("Invalid email address.");
    return false;
  },
});
        `}
      </CodeBlock>
      <CodeBlock className="language-css" title="CSS">
        {`.selectize-control.contacts .selectize-input > div .email {
  opacity: 0.8;
}
.selectize-control.contacts .selectize-input > div .name + .email {
  margin-left: 5px;
}
.selectize-control.contacts .selectize-input > div .email:before {
  content: "<";
}
.selectize-control.contacts .selectize-input > div .email:after {
  content: ">";
}
.selectize-control.contacts .selectize-dropdown .caption {
  font-size: 12px;
  display: block;
  color: #a0a0a0;
}

        `}
      </CodeBlock>
    </div>
  );
}
