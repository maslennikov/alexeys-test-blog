import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {AuthContext} from '../utils/authContext'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import {UserRecord} from '../api/session'
import {authenticate, AuthError} from '../api'

export default function LoginPage() {
  const {user, setUser} = React.useContext(AuthContext)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const navigate = useNavigate()
  const location = useLocation() as any
  const redirectTo = location.state?.from?.pathname || '/'

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
      user = await authenticate(formProps.email, formProps.password)
    } catch (e) {
      console.log(e)
      if (e instanceof AuthError) {
        setError('Could not authenticate')
        return
      }
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
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
              <FormControl isInvalid={!!error}>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={4}>
                {/* <Stack
                  direction={{base: 'column', sm: 'row'}}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                <Button
                  isLoading={submitting}
                  colorScheme="orange"
                  type="submit"
                >
                  Log in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
