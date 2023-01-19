import React from 'react';
import clsx from 'clsx';

import { HeroBackground } from '../../../components/HeroBackground'

import blurCyanImage from '/img/blur-cyan.png'
import blurIndigoImage from '/img/blur-indigo.png'

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark'
      },
        'sm:mt-0 md:mt-4 xl:mt-8',
        'overflow-hidden bg-slate-900'
      )}>
      <div className='relative'>
        <img
          className="absolute opacity-50 -mb-72 bottom-full right-full -mr-72"
          src={blurCyanImage}
          alt=""
          width={530}
          height={530}
        />
        <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] ">
          <HeroBackground className="absolute top-0 right-0 rotate-90 translate-x-1/2 opacity-25 -translate-y-1/3" />
        </div>
        <img
          className="absolute -bottom-40 -right-44"
          src={blurIndigoImage}
          alt=""
          width={567}
          height={567}
        />
      </div>
      <div className='relative px-8 md:px-4 lg:px-2 md:text-center lg:text-left'>
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
