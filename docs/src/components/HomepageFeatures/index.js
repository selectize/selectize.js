import React from 'react';
import clsx from 'clsx';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { GridPattern } from '../GridPattern'
import { PagePattern } from '../PagePattern'
import { Prose } from '../Prose'

const FeatureList = [
  {
    href: '',
    name: 'Easy to use and customize',
    description:
      'Selectize Includes default styles as well as packaged LESS and SCSS sources available for all Bootstrap versions.',
    icon: 'fa-pencil-paintbrush',
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '',
    name: 'Smart Ranking / Multi-Property Searching & Sorting',
    description:
      'Want to search an item\'s title <em>and</em> description? No problem. You can even override the scoring function used for sorting if you want to get crazy.',
    icon: 'fa-rocket',
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '',
    name: 'Clean API & Extensible code',
    description:
      'Interface & make addons like a boss with a powerfull plugin system.',
    icon: 'fa-laptop-code',
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    href: '',
    name: 'Remote Data Loading',
    description:
      'For when you have thousands of options and want them provided by the server as the user types.',
    icon: 'fa-cloud-upload',
    pattern: {
      y: 120,
      squares: [
        [0, 1],
        [1, 2],
        [3, 1]
      ],
    },
  },
  {
    href: '',
    name: 'Keyboard Navigation',
    description:
      'Order matters sometimes. Use the <kbd>left</kbd> and <kbd>right</kbd> arrow keys to move between items.',
    icon: 'fa-keyboard',
    pattern: {
      y: 6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '',
    name: 'Right-to-Left + Díåcritîçs supported',
    description:
      'Great for international environments.',
    icon: 'fa-language',
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '',
    name: 'Item Creation',
    description:
      'Allow users to create items on the fly (and it\'s async friendly; the control locks until you invoke a callback)',
    icon: 'fa-octagon-plus',
    pattern: {
      y: 8,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '',
    name: 'Select & Delete multiple items at once',
    description:
      'Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.',
    icon: 'fa-hand-pointer',
    pattern: {
      y: 12,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  }
];

function Feature({ feature }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={clsx('group relative flex',
        'rounded-2xl',
        'bg-zinc-50',
        'transition-shadow shadow-lg hover:shadow-lg hover:shadow-zinc-900/5'
      )}>
      <FeaturePattern {...feature.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset" />
      <div className="relative px-4 pt-16 pb-4 rounded-2xl">
        <div className="float-left px-4 pb-4 text--center">
          <FeatureIcon icon={feature.icon} />
        </div>
        <Prose>
          <h3 className='text-xl text-transparent font-display bg-gradient-to-r from-cyan-500 to-indigo-800 bg-clip-text'>{feature.name}</h3>
          <p className='pt-5 font-sans'>{feature.description}</p>
        </Prose>
      </div>
    </div>
  );
}

function FeatureIcon({ icon }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/5 backdrop-blur-[2px] transition duration-300">
      <span className={clsx('icon', icon,
        'fa-duotone',
        'w-7 h-7 transition-colors duration-300 fill-zinc-700/10 stroke-zinc-700 group-hover:stroke-zinc-900',
        'text-sky-500/75')}></span>
    </div>
  )
}

function FeaturePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d7e6ed] to-[#e0e8f6] opacity-0 transition duration-300 group-hover:opacity-100"
        style={style}
      />
      <motion.div
        className="absolute inset-0 transition duration-300 opacity-0 rounded-2xl mix-blend-overlay group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={clsx('my-0 p-8 w-full max-w-none relative')}>
      <PagePattern />
      <div className="w-full text-center">
        <h2 className='text-4xl text-transparent font-display bg-gradient-to-t from-cyan-500 to-indigo-800 bg-clip-text'>
          Features
        </h2>
      </div>
      <div className={clsx('not-prose grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4')}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} feature={props} />
        ))}
      </div>
    </section>
  );
}
