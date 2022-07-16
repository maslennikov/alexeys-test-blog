import {Heading, Text, Divider, VStack, Flex} from '@chakra-ui/react'
import useSWR from 'swr'
import {FeaturedArticle} from '../components/featuredArticle'
import {ArticlesFeed} from '../components/articlesFeed'
import {CTA} from '../components/cta'

export default function FeedPage() {
  const {data, error} = useSWR('/posts')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {posts} = data

  return posts?.length ? (
    <>
      <FeaturedArticle post={posts[0]} />

      <Flex direction="column">
        <Heading as="h2">Latest articles</Heading>
        <Divider my="2" />
        <ArticlesFeed posts={posts.slice(1)} />
      </Flex>

      <CTA
        label="Create more amazing content and connect with your audience"
        link="/admin?newpost"
      />

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
  ) : (
    <CTA
      label="Create your first article on this platform"
      link="/admin?newpost"
    />
  )
}
