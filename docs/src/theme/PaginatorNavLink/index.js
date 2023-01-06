import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { GridPattern } from '../../components/GridPattern';

export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props;

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  let pattern = {
    y: 48,
    squares: isNext ? [
      [-1, 0],
      [0, -1],
      [-2, -1],
    ] : [
      [2, 0],
      [0, 1],
      [-1, 0],
    ],
  };

  return (
    <Link
      onMouseMove={onMouseMove}
      className={clsx(
        'pagination-nav__link',
        'group relative',
        'bg-zinc-50',
        'transition-shadow shadow-lg hover:shadow-lg hover:shadow-zinc-900/5',
        'display-inline',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      <FeaturePattern {...pattern} mouseX={mouseX} mouseY={mouseY} />
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
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
