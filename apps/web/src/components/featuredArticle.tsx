import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
  Tag,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import {Post} from '../types'
import {coverUrlById} from '../utils/mockUrls'
import {ArticleMeta} from './articleMeta'
import {Link as RouterLink} from 'react-router-dom'

type FeaturedArticleProps = {
  post: Post
}

export function FeaturedArticle({post}: FeaturedArticleProps) {
  return (
    <LinkBox
      display="flex"
      flexDirection={{base: 'column', sm: 'row'}}
      justifyContent="space-between"
      mb={6}
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              'radial(orange.600 1px, transparent 1px)',
              'radial(orange.300 1px, transparent 1px)'
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>

        <Box
          position="relative"
          marginLeft={{base: '0', sm: 6}}
          w="100%"
          h="100%"
          minH="240px"
        >
          <Box position="absolute" width={{base: '100%', sm: '85%'}} h="100%">
            <Image
              borderRadius="lg"
              src={coverUrlById(post.id)}
              alt="some good alt text"
              objectFit="cover"
              h="100%"
              w="100%"
            />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        marginTop={{base: '3', sm: '0'}}
      >
        <Flex>
          <Tag size={'md'} variant="solid" colorScheme="orange">
            new in blogs
          </Tag>
        </Flex>
        <Heading marginTop="1">
          <LinkOverlay as={RouterLink} to={`/posts/${post.id}`}>
            {post.title}
          </LinkOverlay>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="lg"
        >
          {post.summary}
        </Text>
        <ArticleMeta {...post} />
      </Box>
    </LinkBox>
  )
}
