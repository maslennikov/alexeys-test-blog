import {Container, Flex, Text} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'

export function Layout() {
  return (
    <Container
      maxW={'7xl'}
      px={6}
      gap={10}
      display="flex"
      flexDirection="column"
    >
      <Flex h={10} align="center">
        <Text
          as="b"
          size="lg"
          bgGradient="linear(to-r, #f12711, #f5af19)"
          bgClip="text"
        >
          Welbex Test Blogging Hub
        </Text>
      </Flex>
      <Outlet />
    </Container>
  )
}
