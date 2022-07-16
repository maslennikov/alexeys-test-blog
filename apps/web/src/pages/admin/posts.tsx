import {
  Heading,
  Divider,
  WrapItem,
  Flex,
  Container,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import {Link as RouterLink, useSearchParams} from 'react-router-dom'
import useSWR from 'swr'
import {ArticlesFeed} from '../../components/articlesFeed'
import {CTA} from '../../components/cta'
import {AuthContext} from '../../utils/authContext'
import PostCreateModal from './postCreateModal'

export default function AdminPostsPage() {
  const [search] = useSearchParams()
  const {user} = React.useContext(AuthContext)
  const {data, error} = useSWR(`/admin/blog/${user?.blogId}/posts?take=30`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {posts} = data

  return (
    <>
      <Flex direction="column">
        <Heading as="h2">Articles in my blog</Heading>
        <Divider my="2" />

        <ArticlesFeed posts={posts} admin />
        {!posts?.length && (
          <CTA //
            label="Create your first article"
            link="/admin?newpost"
          />
        )}
      </Flex>

      {search.has('newpost') && <PostCreateModal />}
    </>
  )
}
