import React from 'react';
import clsx from 'clsx'

export function Prose({ as: Component = 'div', className, ...props }) {
  return (
    <Component
      className={clsx(className, 'content-trap')}
      {...props}
    />
  )
}
