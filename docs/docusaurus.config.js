// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Selectize',
  tagline: 'Dinosaurs are cool',
  url: 'https://selectize.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'selectize', // Usually your GitHub org/user name.
  projectName: 'selectize', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    async function loadTailwindCss(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'Selectize',
        logo: {
          alt: 'Selectize Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Get Started',
          },
          { href: 'https://github.com/selectize/selectize.js/discussions', label: 'Community', position: 'right' },
          { href: 'https://github.com/selectize/selectize.js', label: 'GitHub', position: 'right', },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs",
              },
            ],
          },
          {
            title: "Demos",
            items: [
              {
                label: "Examples",
                to: "/docs/demos",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/selectize/selectize.js',
              },
              {
                label: "Keybase",
                href: "https://keybase.io/team/selectize",
              },
              {
                label: "Stackoverflow",
                href: "https://stackoverflow.com/questions/tagged/selectize.js",
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'License',
                href: 'https://github.com/selectize/selectize.js',
              },
              {
                label: 'Privacy',
                href: 'https://github.com/selectize/selectize.js',
              },
              {
                label: 'Data Policy',
                href: 'https://github.com/selectize/selectize.js',
              },
              {
                label: 'Cookie Policy',
                href: 'https://github.com/selectize/selectize.js',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Selectize team.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
