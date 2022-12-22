import React from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';
import { PagePattern } from '../../../../components/PagePattern'

export default function DocPageLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}>

      <div
        className={clsx(
          'container',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}>
        <PagePattern />
        {children}
      </div>
    </main>
  );
}
