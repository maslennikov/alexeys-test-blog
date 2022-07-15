import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import {Post} from '../types'
import {coverUrlById} from '../utils/mockUrls'
import {PostMeta} from './postAuthorMeta'

type PostCardProps = {
  post: Post
}
export function AtricleCard({post}: PostCardProps) {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={coverUrlById(post.id, 1200)}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {post.title}
          </Heading>
          <Text color={'gray.500'}>{post.summary}</Text>
        </Stack>
        <PostMeta //
          blog={post.blog}
          date={new Date(post.publishedAt)}
        />
      </Box>
    </Center>
  )
}
