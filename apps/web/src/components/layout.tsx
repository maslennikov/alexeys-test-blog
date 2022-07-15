import {
  Avatar,
  Button,
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import {Link as RouterLink, Outlet} from 'react-router-dom'
import {AuthContext} from '../utils/authContext'
import {faceUrlById} from '../utils/mockUrls'
import Footer from './footer'

export function Layout() {
  const {user, setUser} = React.useContext(AuthContext)

  return (
    <Flex direction="column">
      <Container
        maxW={'7xl'}
        px={6}
        gap={10}
        display="flex"
        flexDirection="column"
      >
        <Flex h={20} align="center">
          <Link as={RouterLink} to="/" _hover={{textDecoration: 'none'}}>
            <Text
              as="b"
              fontSize="xl"
              bgGradient="linear(to-r, #f12711, #f5af19)"
              bgClip="text"
            >
              Welbex Test Blogging Hub
            </Text>
          </Link>
          <Flex grow={1} />
          {user ? (
            <Menu>
              <MenuButton
                as={Avatar}
                size="sm"
                src={faceUrlById(user.blogId)}
                _hover={{cursor: 'pointer'}}
              />
              <MenuList>
                <MenuItem onClick={() => setUser(null)}>Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex gap={8}>
              <Button
                as={RouterLink}
                to="/login"
                variant="link"
                fontSize={'sm'}
                fontWeight={400}
              >
                Log In
              </Button>
              <Button
                display={{base: 'none', md: 'inline-flex'}}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme="orange"
              >
                Sign Up
              </Button>
            </Flex>
          )}
        </Flex>
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  )
}
