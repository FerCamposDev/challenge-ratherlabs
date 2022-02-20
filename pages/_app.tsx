/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import { ContractProvider } from '../contexts/ContractContext';
import { SurveyProvider } from '../contexts/SurveyContext';

import moralisConfig from '../config/moralisConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={moralisConfig.appId} serverUrl={moralisConfig.serverUrl}>
      <ContractProvider>
        <SurveyProvider>
          <Component {...pageProps} />
        </SurveyProvider>
      </ContractProvider>
    </MoralisProvider>
  );
}

export default MyApp;
