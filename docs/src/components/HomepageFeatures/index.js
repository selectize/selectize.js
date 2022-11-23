import React from 'react';
import clsx from 'clsx';

const FeatureList = [
  {
    title: 'Easy to use and customize',
    icon: 'fa-pencil-paintbrush',
    description: (
      <>
        Selectize Includes default styles as well as packaged LESS and SCSS sources available for all Bootstrap versions.
      </>
    ),
  },
  {
    title: 'Smart Ranking / Multi-Property Searching & Sorting',
    icon: 'fa-rocket',
    description: (
      <>
        Want to search an item's title <em>and</em> description? No problem. You can even override the scoring function used for sorting if you want to get crazy.
      </>
    ),
  },
  {
    title: 'Clean API & Extensible code',
    icon: 'fa-laptop-code',
    description: (
      <>
        Interface & make addons like a boss with a powerfull plugin system.
      </>
    ),
  },
  {
    title: 'Remote Data Loading',
    icon: 'fa-cloud-upload',
    description: (
      <>
        For when you have thousands of options and want them provided by the server as the user types.
      </>
    ),
  },
  {
    title: 'Keyboard Navigation',
    icon: 'fa-keyboard',
    description: (
      <>
        Order matters sometimes. Use the <kbd>left</kbd> and <kbd>right</kbd> arrow keys to move between items.
      </>
    ),
  },
  {
    title: 'Right-to-Left + Díåcritîçs supported',
    icon: 'fa-language',
    description: (
      <>
        Great for international environments.
      </>
    ),
  },
  {
    title: 'Item Creation',
    icon: 'fa-octagon-plus',
    description: (
      <>
        Allow users to create items on the fly (and it's async friendly; the control locks until you invoke a callback)
      </>
    ),
  },
  {
    title: 'Select & Delete multiple items at once',
    icon: 'fa-hand-pointer',
    description: (
      <>
        Hold down <kbd>option</kbd> on Mac or <kbd>ctrl</kbd> on Windows to select more than one item to delete.
      </>
    ),
  },
];

function Feature({ icon, title, description }) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center pb-4">
        <span className={clsx('fa-duotone', icon, 'fa-3x', 'text-cyan-500')}></span>
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className='text-xl font-display'>{title}</h3>
        <p className='font-sans'>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={clsx('')}>
      <div className="container">
        <div className="text-center w-full">
          <h2 className='text-4xl pt-2 pb-2 font-display bg-gradient-to-t from-cyan-500 to-indigo-800 bg-clip-text text-transparent'>Features</h2>
        </div>
        <div className="row pt-4">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
