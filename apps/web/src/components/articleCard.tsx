import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  LinkBox,
  LinkOverlay,
  Flex,
} from '@chakra-ui/react'
import {Post} from '../types'
import {coverUrlById} from '../utils/mockUrls'
import {PostMeta} from './postAuthorMeta'
import {Link as RouterLink} from 'react-router-dom'

type PostCardProps = {
  post: Post
}
export function AtricleCard({post}: PostCardProps) {
  return (
    <Center>
      <LinkBox
        as={Flex}
        direction="column"
        maxW={'445px'}
        w={'full'}
        h="full"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="base"
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        _hover={{
          boxShadow: '2xl',
        }}
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
        <Stack flexGrow="1">
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
            <LinkOverlay as={RouterLink} to={`/posts/${post.id}`}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <Text color={'gray.500'}>{post.summary}</Text>
        </Stack>
        <PostMeta //
          blog={post.blog}
          date={new Date(post.publishedAt)}
        />
      </LinkBox>
    </Center>
  )
}
