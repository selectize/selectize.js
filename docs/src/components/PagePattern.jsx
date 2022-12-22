import React from 'react';
import { GridPattern } from './GridPattern'

export function PagePattern() {
  return (
    <div className="absolute inset-0 mx-0 overflow-hidden -z-10 max-w-none">
      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#366bb4] to-[#8eb6f1] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={72}
            height={64}
            x="-12"
            y="4"
            squares={[
              [4, 3],
              [2, 1],
              [7, 3],
              [10, 6],
              [14, 6],
            ]}
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay"
          />
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute top-0 left-1/2 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px]"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </svg>
      </div>
    </div>
  )
}
