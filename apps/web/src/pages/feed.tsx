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
import useSWR from 'swr'
import {AtricleCard} from '../components/articleCard'
import {FeaturedArticle} from '../components/featuredArticle'
import {Post} from '../types'

export default function FeedPage() {
  const {data, error} = useSWR('/posts')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {posts} = data

  return (
    <>
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
    </>
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
