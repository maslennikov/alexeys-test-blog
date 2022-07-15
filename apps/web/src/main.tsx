import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {fetcher} from './utils/fetcher'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher,
      }}
    >
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>
)
