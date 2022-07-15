import React from 'react'
import {Text, Avatar, Stack} from '@chakra-ui/react'
import {faceUrlById} from '../utils/mockUrls'

interface BlogAuthorProps {
  blog: {id: number; name: string}
  date: Date
}

export const PostMeta: React.FC<BlogAuthorProps> = ({blog, date}) => {
  return (
    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
      <Avatar src={faceUrlById(blog.id)} />
      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
        <Text fontWeight={600}>{blog.name}</Text>
        <Text color={'gray.500'}>{`${date.toLocaleDateString(
          'ru-RU'
        )} · 6min read`}</Text>
      </Stack>
    </Stack>
  )
}
