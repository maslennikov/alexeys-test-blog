import {
  Heading,
  Text,
  Divider,
  Wrap,
  WrapItem,
  Container,
  VStack,
  Flex,
} from '@chakra-ui/react'
import {AtricleCard} from '../components/articleCard'
import {FeaturedArticle} from '../components/featuredArticle'
import {getPosts} from '../utils/mockData'
import {Post} from '../types'

// FIXME MOCKED RESULTS
const posts = getPosts()

export default function FeedPage() {
  return (
    <Container
      maxW={'7xl'}
      p="12"
      gap={10}
      display="flex"
      flexDirection="column"
    >
      <Heading
        as="h1"
        bgGradient="linear(to-r, #f12711, #f5af19)"
        bgClip="text"
      >
        Welbex Test Blogging Hub
      </Heading>

      <FeaturedArticle post={posts[0]} />

      <Feed posts={posts.slice(1)} />

      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
  )
}

function Feed({posts}: {posts: Post[]}) {
  return (
    <Flex direction="column">
      <Heading as="h2">Latest articles</Heading>

      <Divider marginTop="5" />

      <Wrap spacing="30px" marginTop="5" overflow="unset">
        {posts.map((post) => (
          <WrapItem
            flexGrow={1}
            alignItems="stretch"
            maxW={{base: '100%', sm: '45%', lg: '30%'}}
            key={post.id}
          >
            <AtricleCard post={post} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
