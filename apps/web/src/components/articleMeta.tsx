import {Text, Avatar, Stack} from '@chakra-ui/react'
import {faceUrlById} from '../utils/mockUrls'

interface IProps {
  blog: {id: number; name: string}
  publishedAt: number | Date
}

export const ArticleMeta = ({blog, publishedAt}: IProps) => {
  const metaText = publishedAt ? (
    `${new Date(publishedAt).toLocaleDateString('ru-RU')} · 6min read`
  ) : (
    <i>Unpublished</i>
  )

  return (
    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
      <Avatar src={faceUrlById(blog.id)} />
      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
        <Text fontWeight={600}>{blog.name}</Text>
        <Text color={'gray.500'}> {metaText} </Text>
      </Stack>
    </Stack>
  )
}
