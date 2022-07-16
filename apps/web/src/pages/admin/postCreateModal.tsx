import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import {AuthContext} from '../../utils/authContext'
import {ArticleForm} from '../../components/articleForm'
import {fetcher} from '../../api/fetcher'

export default function PostCreateModal() {
  const navigate = useNavigate()
  const {user} = React.useContext(AuthContext)

  const onSubmit = React.useCallback(
    async (data) => {
      const {post} = await fetcher(`/admin/blog/${user?.blogId}/posts`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      navigate(`/admin/posts/${post.id}`)
    },
    [navigate]
  )

  return (
    <Modal isOpen onClose={() => navigate('/admin')}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Article</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ArticleForm onSubmit={onSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
