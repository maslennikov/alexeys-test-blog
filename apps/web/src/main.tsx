import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes'
import {ChakraProvider} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>
)
