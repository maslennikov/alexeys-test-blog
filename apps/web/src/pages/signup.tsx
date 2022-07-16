import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {AuthContext} from '../utils/authContext'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import {UserRecord} from '../api/session'
import {signup} from '../api/auth'

export default function SignupPage() {
  const {user, setUser} = React.useContext(AuthContext)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const navigate = useNavigate()
  const redirectTo = '/admin'

  React.useEffect(() => {
    if (user) navigate(redirectTo, {replace: true})
  }, [user, redirectTo, navigate])

  const onSubmit = React.useCallback(async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.target)
    const formProps: any = Object.fromEntries(formData.entries())

    let user: UserRecord | undefined
    try {
      user = await signup(formProps.email, formProps.password, formProps.name)
    } catch (e: any) {
      console.log(e)
      setError(`Could not sign up: ${e.message}`)
    } finally {
      setSubmitting(false)
    }
    // redirect will happen in useEffect() hook above
    setUser(user ?? null)
  }, [])

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'md'} w="100%" py={12} px={6}>
        <Stack align={'center'}>
          <Heading textAlign="center" fontSize={'4xl'}>
            Create account
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to start publishing with blogger ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" isRequired />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" isRequired />
              </FormControl>
              <FormControl>
                <FormLabel>Blog name</FormLabel>
                <Input name="name" isRequired />
              </FormControl>
              <FormControl isInvalid={!!error}>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={4}>
                <Button
                  isLoading={submitting}
                  colorScheme="orange"
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
