
import React, { useEffect } from "react";
import clsx from "clsx";
import Head from '@docusaurus/Head';

export default function ThemeChanger() {
  const themes = [
    { src: "default", label: "Selectize", icon: "fak fa-selectize" },
    { src: "bootstrap2", label: "Bootstrap 2", icon: "fa-duotone fa-square-b" },
    { src: "bootstrap3", label: "Bootstrap 3", icon: "fa-duotone fa-square-b" },
    { src: "bootstrap4", label: "Bootstrap 4", icon: "fa-duotone fa-square-b" },
    { src: "bootstrap5", label: "Bootstrap 5", icon: "fa-duotone fa-square-b" },
  ];
  useEffect(() => {
    const $theme_links = $(".theme-changer button");

    $theme_links.off("click").on("click", function () {
      if ($(this).hasClass("active")) return;

      const theme = $(this).data("theme");

      $theme_links.removeClass("active");
      $(this).addClass("active");
      $("link[data-theme]").remove();

      const $linkTheme = $("link[data-theme=" + theme + "]");

      if ($linkTheme.length === 0) {
        $("head").append(
          `<link data-theme="${theme}" href="/css/selectize.${theme}.css" rel="stylesheet">`
        );
      }
    });
  });

  return (
    <>
      <Head>
        <link rel='stylesheet' href="/css/selectize.css" />
        <link rel='stylesheet' data-theme='default' href="/css/selectize.default.css" />
      </Head>
      <span className={clsx('theme-changer', 'isolate inline-flex rounded-md shadow-sm mb-6')}>
        {themes.map((theme, index) => {
          const active = index === 0 ? "active" : "";
          return (
            <button
              className={clsx(active, "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500")}
              key={index}
              type="button"
              data-theme={theme.src}
            >
              <span className={clsx(theme.icon, 'pr-2')}></span>{theme.label}
            </button>
          );
        })}
      </span>
    </>
  );
}
