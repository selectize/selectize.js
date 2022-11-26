import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import { Hero } from '../components/Hero';

export default function Home() {
  return (
    <Layout
      title={``}
      description="Documentation and demos for the selectize.js library">
      <Hero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
