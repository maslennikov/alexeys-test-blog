import {Heading, Divider, WrapItem, Flex} from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'
import {AtricleCard} from '../../components/articleCard'
import {ArticlesFeed} from '../../components/articlesFeed'
import {AuthContext} from '../../utils/authContext'

export default function AdminPostsPage() {
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
      </Flex>
    </>
  )
}
