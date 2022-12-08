import React from 'react';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <>
    <React.StrictMode>
      {children}
    </React.StrictMode>
  </>;
}
