import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../contexts/UserContext'
import { ContractProvider } from '../contexts/ContractContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ContractProvider>
        <Component {...pageProps} />
      </ContractProvider>
    </UserProvider>
  )
}

export default MyApp
