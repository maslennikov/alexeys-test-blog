import S from 'fluent-json-schema'

export const blogResponse = S.object() //
  .prop('id', S.number())
  .prop('name', S.string())

export const userResponse = S.object() //
  .prop('id', S.number())
  .prop('email', S.string())
  .prop('blog', blogResponse)

export const postResponse = S.object() //
  .prop('id', S.number())
  .prop('title', S.string())
  .prop('summary', S.string())
  .prop('content', S.string())
  .prop('blog', blogResponse)
  .prop('createdAt', S.number())
  .prop('publishedAt', S.number())
