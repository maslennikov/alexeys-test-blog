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
import {Link as RouterLink, Outlet, useNavigate} from 'react-router-dom'
import {AuthContext} from '../utils/authContext'
import {faceUrlById} from '../utils/mockUrls'
import Footer from './footer'
import {MdAdd} from 'react-icons/md'

export function Layout() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100vw"
      maxW="100vw"
      minW="370px"
      overflowX="hidden"
    >
      <Container
        maxW={'1000px'}
        px={6}
        gap={10}
        display="flex"
        flexDirection="column"
      >
        <Flex
          align="center"
          gap={2}
          direction={{base: 'column', md: 'row'}}
          h={{base: '100px', md: '80px'}}
          pt={{base: 4, md: 0}}
        >
          <Link
            as={RouterLink}
            to="/"
            _hover={{textDecoration: 'none'}}
            minW="150px"
          >
            <Text
              as="b"
              fontSize="xl"
              bgGradient="linear(to-r, #f12711, #f5af19)"
              bgClip="text"
            >
              Alexey's Test Blogging Hub
            </Text>
          </Link>
          <Flex grow={1} />
          <Actions />
        </Flex>
        <Outlet />
      </Container>
      <Footer />
    </Flex>
  )
}

function Actions() {
  const {user, setUser} = React.useContext(AuthContext)
  const navigate = useNavigate()

  const onLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <Flex gap={8}>
      {user ? (
        <>
          <Button
            variant={'solid'}
            colorScheme={'green'}
            size={'sm'}
            leftIcon={<MdAdd />}
            onClick={() => navigate('/admin?newpost')}
          >
            Write a post
          </Button>
          <Menu>
            <MenuButton
              as={Avatar}
              size="sm"
              src={faceUrlById(user.blogId)}
              _hover={{cursor: 'pointer'}}
            />
            <MenuList>
              <MenuItem onClick={() => navigate('/admin')}>
                Manage my blog
              </MenuItem>
              <MenuItem color="red.600" onClick={onLogout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button
            as={RouterLink}
            // navigate to /admin instead of /login to land user to their admin page after logged in
            to="/admin"
            variant="link"
            fontSize={'sm'}
            fontWeight={400}
          >
            Log In
          </Button>
          <Button
            as={RouterLink}
            to="/signup"
            fontSize={'sm'}
            fontWeight={600}
            colorScheme="orange"
          >
            Sign Up
          </Button>
        </>
      )}
    </Flex>
  )
}
