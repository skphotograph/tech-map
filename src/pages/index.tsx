import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const visual = useBaseUrl('/img/training.png');
  return (
    <header className={styles.hero}>
      <img className={styles.heroVisual} src={visual} alt="" />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.brand}>Training</p>
        <Heading as="h1" className={styles.headline}>
          技術を、体系的に。
        </Heading>
        <p className={styles.lead}>
          言語・クラウド・インフラから AI まで、IT 学習教材を一箇所にまとめるサイトです。
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryCta} to="/docs/intro">
            学習をはじめる
          </Link>
          <Link className={styles.secondaryCta} to="/docs/foundations/">
            分野を見る
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Training"
      description="IT技術に関する学習教材を包括的にまとめたサイト">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
