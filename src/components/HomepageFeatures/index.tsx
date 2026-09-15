import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type PathItem = {
  title: string;
  description: string;
  to: string;
};

const PathList: PathItem[] = [
  {
    title: '共通基盤',
    description: 'Linux、Git、ネットワーク、HTTP',
    to: '/docs/foundations/',
  },
  {
    title: '言語',
    description: 'Java、JavaScript / TypeScript、Rust',
    to: '/docs/languages/',
  },
  {
    title: 'データ',
    description: 'SQL / RDB、NoSQL、メッセージング',
    to: '/docs/data/',
  },
  {
    title: 'クラウド',
    description: 'GCP、AWS、Azure',
    to: '/docs/cloud/',
  },
  {
    title: 'DevOps / コンテナ',
    description: 'Docker、Kubernetes、OpenShift、CI/CD',
    to: '/docs/platform/',
  },
  {
    title: 'セキュリティ',
    description: '認証・認可、クラウドセキュリティ、OWASP',
    to: '/docs/security/',
  },
  {
    title: 'AI',
    description: 'LLM、RAG、エージェント、MLOps',
    to: '/docs/ai/',
  },
  {
    title: '設計 / アーキテクチャ',
    description: 'API 設計、マイクロサービス、テスト',
    to: '/docs/architecture/',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.paths}>
      <div className="container">
        <div className={styles.intro}>
          <Heading as="h2" className={styles.heading}>
            学習分野
          </Heading>
          <p className={styles.subheading}>
            基礎から応用まで、分野ごとに教材を整理しています。
          </p>
        </div>
        <ul className={styles.list}>
          {PathList.map((item) => (
            <li key={item.to} className={styles.item}>
              <Link className={styles.link} to={item.to}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.description}>{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
