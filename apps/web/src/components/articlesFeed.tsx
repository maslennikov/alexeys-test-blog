import {Wrap, WrapItem, Flex} from '@chakra-ui/react'
import {AtricleCard} from './articleCard'
import {Post} from '../types'

type IProps = {
  posts: Post[]
  admin?: boolean
}

export function ArticlesFeed({posts, admin}: IProps) {
  return (
    <Flex direction="column">
      <Wrap spacing="30px" marginTop="5" overflow="unset">
        {posts.map((post) => (
          <WrapItem
            flexGrow={1}
            alignItems="stretch"
            maxW={{base: '100%', sm: '45%', lg: '30%'}}
            key={post.id}
          >
            <AtricleCard post={post} admin={admin} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
