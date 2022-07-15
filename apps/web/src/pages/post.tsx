import {
  Container,
  Image,
  Box,
  useColorModeValue,
  Text,
  Stack,
  Heading,
  Flex,
} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'
import useSWR from 'swr'
import {PostMeta} from '../components/postAuthorMeta'
import {coverUrlById} from '../utils/mockUrls'

export default function PostPage() {
  const params = useParams()
  const {data, error} = useSWR(`/posts/${params.id}`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {post} = data

  return (
    <Container
      maxW={'2xl'}
      p="12"
      gap={6}
      display="flex"
      flexDirection="column"
    >
      <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
        <Image
          src={coverUrlById(post.id, 1200)}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>

      <Stack flexGrow="1">
        <Heading
          as="h1"
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {post.title}
        </Heading>
        <Text color={'gray.500'}>{post.summary}</Text>
      </Stack>

      <Flex direction="column" gap={4}>
        {post.content.split('\n').map((p, i) => (
          <Text key={i}>{p}</Text>
        ))}
      </Flex>

      <PostMeta //
        blog={post.blog}
        date={new Date(post.publishedAt)}
      />
    </Container>
  )
}
