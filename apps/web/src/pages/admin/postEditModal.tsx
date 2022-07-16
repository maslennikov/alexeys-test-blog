import React from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {AuthContext} from '../../utils/authContext'
import useSWR from 'swr'
import {ArticleForm} from '../../components/articleForm'
import {fetcher} from '../../api/fetcher'

export default function PostEditModal() {
  const params = useParams()
  const navigate = useNavigate()
  const {user} = React.useContext(AuthContext)
  const [dataStamp, setDataStamp] = React.useState(0)

  const {data, error} = useSWR(`/admin/blog/${user?.blogId}/posts/${params.id}`)

  React.useEffect(() => {
    // force rerender form because it's unmanaged
    setDataStamp(Date.now())
  }, [data])

  const onSubmit = React.useCallback(
    async (data) => {
      await fetcher(`/admin/blog/${user?.blogId}/posts/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      navigate(`/posts/${params.id}`)
    },
    [params]
  )

  const onPublish = async () => {}

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {post} = data

  return (
    <Modal isOpen onClose={() => navigate('/admin')}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Article</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ArticleForm
            // force form rerender to reset state
            key={dataStamp}
            data={post}
            onSubmit={onSubmit}
            onPublishToggle={onPublish}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
