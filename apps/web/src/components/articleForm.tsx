import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import {Post} from '../types'

type IFormProps = {
  data?: Post
  onSubmit: (
    fields: Pick<Post, 'title' | 'summary' | 'content'>
  ) => Promise<void>
}

export function ArticleForm({data, onSubmit}: IFormProps) {
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(e.target)
    const formProps: any = Object.fromEntries(formData.entries())

    try {
      await onSubmit(formProps)
    } catch (e) {
      console.log(e)
      setError('Failed to save data')
    } finally {
      setSubmitting(false)
    }
  }, [])

  const readonly = submitting

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4} pb={4}>
        <FormControl isReadOnly={readonly}>
          <FormLabel>Title</FormLabel>
          <Input name="title" isRequired defaultValue={data?.title} />
        </FormControl>
        <FormControl isReadOnly={readonly}>
          <FormLabel>Summary</FormLabel>
          <Textarea name="summary" isRequired defaultValue={data?.summary} />
        </FormControl>
        <FormControl isReadOnly={readonly}>
          <FormLabel>Content</FormLabel>
          <Textarea
            name="content"
            minH="100px"
            isRequired
            defaultValue={data?.content}
          />
        </FormControl>
        <FormControl isInvalid={!!error}>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Stack spacing={4} pt={4}>
          <Button isLoading={submitting} colorScheme="orange" type="submit">
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
