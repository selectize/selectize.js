import React from 'react';
import clsx from 'clsx'

import { Button } from './Button'
import { HeroBackground } from './HeroBackground'
import blurCyanImage from '/img/blur-cyan.png'
import blurIndigoImage from '/img/blur-indigo.png'

const code = `npm install @selectize/selectize
--
<script>
$(function () {
  $("select").selectize(options);
});
</script>`

const tabs = [
  { name: 'selectize.js', isActive: true },
  { name: 'package.json', isActive: false },
  { name: 'application.js', isActive: false },
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="grid items-center grid-cols-1 px-4 mx-auto gap-y-16 gap-x-8 lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <img
              className="absolute -mb-56 opacity-50 bottom-full right-full -mr-72"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
            />
            <div className="relative">
              <p className="inline text-5xl tracking-tight text-transparent bg-gradient-to-r from-indigo-200 via-cyan-400 to-indigo-200 bg-clip-text font-display">
                Selectize
              </p>
              <p className="mt-3 font-sans text-2xl tracking-tight text-slate-400">
                Selectize is the hybrid of a textbox and &lt;select&gt; box. It's jQuery-based and it's useful for tagging, contact lists, country selectors, and so on.
              </p>
              <div className="flex gap-4 mt-8 md:justify-center lg:justify-start">
                <Button href="/docs/intro">Get started</Button>
                <Button href="https://github.com/selectize/selectize.js" variant="secondary">View on GitHub</Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <img
                className="absolute -top-64 -right-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
              />
              <img
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-300 via-cyan-300/70 to-indigo-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-300 via-cyan-300/70 to-indigo-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute h-px -top-px left-20 right-11 bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-cyan-300/0" />
                <div className="absolute h-px -bottom-px left-11 right-20 bg-gradient-to-r from-indigo-400/0 via-indigo-400 to-indigo-400/0" />
                <div className="pt-4 pl-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="flex mt-4 space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          'flex h-6 rounded-full',
                          tab.isActive
                            ? 'bg-gradient-to-r from-cyan-400/30 via-cyan-400 to-indigo-400/30 p-px font-medium text-indigo-300'
                            : 'text-slate-500'
                        )}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tab.isActive && 'bg-slate-800'
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start px-1 mt-6 text-sm">
                    <div
                      aria-hidden="true"
                      className="pr-4 font-mono border-r select-none border-slate-300/5 text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <React.Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                    <pre className={clsx(
                      'hero-code flex overflow-x-auto p-0 m-0 pb-b-4 w-full'
                    )}>
                      <code>
                        {code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
