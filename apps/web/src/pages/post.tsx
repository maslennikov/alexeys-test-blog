import {
  Container,
  Image,
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import {Outlet, useNavigate, useParams} from 'react-router-dom'
import useSWR from 'swr'
import {fetcher, NotFoundError} from '../api/fetcher'
import {ArticleMeta} from '../components/articleMeta'
import {AuthContext} from '../utils/authContext'
import {coverUrlById} from '../utils/mockUrls'

export default function PostPage({preview}: {preview?: boolean}) {
  const params = useParams()
  const navigate = useNavigate()

  const {user} = React.useContext(AuthContext)
  const url = preview
    ? `/admin/blog/${user?.blogId}/posts/${params.id}`
    : `/posts/${params.id}`

  const {data, error, mutate} = useSWR(url)
  const post = data?.post

  const onTogglePublish = React.useCallback(async () => {
    await fetcher(`/admin/blog/${user?.blogId}/posts/publish/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({published: !post.publishedAt}),
    })
    mutate()
    navigate(`/admin/posts/${params.id}`)
  }, [post, mutate])

  if (error)
    return error instanceof NotFoundError ? (
      <div>Article not found</div>
    ) : (
      <div>failed to load</div>
    )
  if (!data) return <div>loading...</div>

  return (
    <>
      <Container
        maxW={'2xl'}
        p={{base: 0, md: 12}}
        gap={6}
        display="flex"
        flexDirection="column"
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

        <Flex gap={6} align="top" justify="space-between">
          <ArticleMeta {...post} />
          {user?.blogId == post.blog.id && (
            <Flex gap={6}>
              <Button variant="outline" onClick={() => navigate(`edit`)}>
                Edit
              </Button>
              <Button
                variant="outline"
                colorScheme={post.publishedAt ? 'red' : 'green'}
                onClick={onTogglePublish}
              >
                {post.publishedAt ? 'Unpublish' : 'Publish'}
              </Button>
            </Flex>
          )}
        </Flex>

        <Stack flexGrow="1">
          <Heading
            as="h1"
            color="gray.700"
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {post.title}
          </Heading>
          <Text color={'gray.500'}>{post.summary}</Text>
        </Stack>

        <Flex direction="column" gap={4}>
          {post.content.split('\n\n').map((p, i) => (
            <Text key={i}>{p}</Text>
          ))}
        </Flex>
      </Container>

      {/* outlet for nested modals triggered by router */}
      <Outlet />
    </>
  )
}
