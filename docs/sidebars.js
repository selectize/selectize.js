/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: ["intro",
    "usage",
    "events",
    "contribute",
    "plugins",
  ],
  demoSidebar: [
    {
      type: "category",
      label: "Selectize demos",
      link: {
        type: "generated-index",
        title: "Examples",
        description: "Example how we can use Selectize.js",
        slug: "/demos",
        keywords: ["demos"],
        image: "/img/docusaurus.png"
      },
      items: [
        "demos/api",
        "demos/confirm",
        "demos/diacritics",
        "demos/dynamic-option-groups",
        "demos/dynamic-options",
        "demos/email-contact",
        "demos/events",
        "demos/lock",
        "demos/max-items",
        "demos/normalize",
        "demos/opt-groups",
        "demos/performance",
        "demos/required",
        "demos/rtl",
        "demos/single-item-select",
        "demos/tagging",
      ]
    },
    {
      type: "category",
      label: "Selectize plugin demos",
      link: {
        type: "generated-index",
        title: "Examples using plugins",
        description: "Example how we can use Selectize.js with plugins",
        slug: "/demos/plugins",
        keywords: ["demos", "plugins"],
        image: "/img/logo.svg"
      },
      items: [
        "plugins/autofill-disable",
        "plugins/auto-position",
        "plugins/auto-select-on-type",
        "plugins/clear-button",
        "plugins/drag-drop",
        "plugins/dropdown-header",
        "plugins/opt-group-col",
        "plugins/remove-button",
        "plugins/restore-backspace",
        "plugins/select-on-focus",
      ]
    }
  ],
  apiSidebar: [
    "api",
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      link: {
        type: "generated-index",
        title: "Selectize Api Guides",
        description: "Check all api documentation that you can use with Selectize.js",
        slug: "/category/api-documentation",
        keywords: ["api"],
        image: "/img/logo.svg"
      },
      items: [
        "API/constants",
        "API/selectize",
        "API/highlight",
        "API/utils",
        "API/microevent",
        "API/microplugin",
        "API/sifter",
        "API/autofill_disable Plugin",
        "API/optgroup_columns Plugin",
        "API/remove_button Plugin",
        "API/restore_on_backspace Plugin",
        "API/clear_button Plugin",
        "API/dropdown_header Plugin",
        "API/tag_limit Plugin",
      ]
    }
  ]
};

module.exports = sidebars;
