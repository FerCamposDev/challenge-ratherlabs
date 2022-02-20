/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import { ContractProvider } from '../contexts/ContractContext';
import { SurveyProvider } from '../contexts/SurveyContext';

import moralisConfig from '../config/moralisConfig';
import NavigationBar from '../components/navigation/NavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={moralisConfig.appId} serverUrl={moralisConfig.serverUrl}>
      <ContractProvider>
        <SurveyProvider>
          <NavigationBar>
            <Component {...pageProps} />
          </NavigationBar>
        </SurveyProvider>
      </ContractProvider>
    </MoralisProvider>
  );
}

export default MyApp;
