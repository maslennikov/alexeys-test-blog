import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {fetcher} from './api/fetcher'
import {AuthProvider} from './utils/authContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher,
      }}
    >
      <ChakraProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>
)
