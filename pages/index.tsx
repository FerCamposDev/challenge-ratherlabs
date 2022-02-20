import Head from 'next/head';
import Image from 'next/image';
import { Grid } from '@mui/material';

import useConnectionStatus from '../hooks/useConnectionsStatus';
import Survey from '../components/survey';

import styles from '../styles/Home.module.css';
import StatusCard from '../components/navigation/StatusCard';

function Home() {
  const { isCorrectConnection } = useConnectionStatus();

  return (
    <div>
      <Head>
        <title>Challenge - Rather Labs</title>
        <meta name="description" content="Challenge for Rather-Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container justifyContent="center">
          {isCorrectConnection ? <Survey /> : <StatusCard />}
        </Grid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://ratherlabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Challenge for
          {' '}
          <span className={styles.logo}>
            <Image src="/rather-labs.svg" alt="Rather Logo" width={20} height={16} />
          </span>
          Rather Labs
        </a>
      </footer>
    </div>
  );
}

export default Home;
