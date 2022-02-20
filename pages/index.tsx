import Head from 'next/head';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { Grid } from '@mui/material';
import { DEFAULT_CHAIN_HEX } from '../config/chainsConfig';

import Survey from './components/survey';
import MetaMaskCard from './components/metamask/MetaMaskCard';

import styles from '../styles/Home.module.css';

function Home() {
  const { isAuthenticated, chainId } = useMoralis();

  return (
    <div>
      <Head>
        <title>Challenge - Rather Labs</title>
        <meta name="description" content="Challenge for Rather-Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <MetaMaskCard />

        {isAuthenticated && chainId === DEFAULT_CHAIN_HEX && (
          <Grid container justifyContent="center">
            <Survey />
          </Grid>
        )}
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
