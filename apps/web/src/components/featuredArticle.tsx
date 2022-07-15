import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
  Tag,
  Flex,
} from '@chakra-ui/react'
import {Post} from '../types'
import {coverUrlById} from '../utils/mockUrls'
import {PostMeta} from './postAuthorMeta'

export function FeaturedArticle({post}: {post: Post}) {
  return (
    <Box
      display="flex"
      flexDirection={{base: 'column', sm: 'row'}}
      justifyContent="space-between"
      mb={4}
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box
          width={{base: '100%', sm: '85%'}}
          zIndex="2"
          marginLeft={{base: '0', sm: '5%'}}
          marginTop="5%"
        >
          <Link textDecoration="none" _hover={{textDecoration: 'none'}}>
            <Image
              borderRadius="lg"
              src={coverUrlById(post.id)}
              alt="some good alt text"
              objectFit="cover"
              // h="210px"
              // w="100%"
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
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
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{base: '3', sm: '0'}}
      >
        <Flex>
          <Tag size={'md'} variant="solid" colorScheme="orange">
            new in blogs
          </Tag>
        </Flex>
        <Heading marginTop="1">
          <Link textDecoration="none" _hover={{textDecoration: 'none'}}>
            {post.title}
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue('gray.700', 'gray.200')}
          fontSize="lg"
        >
          {post.summary}
        </Text>
        <PostMeta
          blog={post.blog} //
          date={new Date(post.publishedAt)}
        />
      </Box>
    </Box>
  )
}
