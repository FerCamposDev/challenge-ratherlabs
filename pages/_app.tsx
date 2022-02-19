import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ContractProvider } from '../contexts/ContractContext'
import { MoralisProvider } from 'react-moralis'
import { moralisConfig } from '../config/moralisConfig'
import { SurveyProvider } from '../contexts/SurveyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={moralisConfig.appId} serverUrl={moralisConfig.serverUrl}>
      <ContractProvider>
        <SurveyProvider>
          <Component {...pageProps} />
        </SurveyProvider>
      </ContractProvider>
    </MoralisProvider>
  )
}

export default MyApp
