import S from 'fluent-json-schema'

export const profileResponse = S.object() //
  .prop('id', S.number())
  .prop('name', S.string())

export const postResponse = S.object() //
  .prop('id', S.number())
  .prop('title', S.string())
  .prop('content', S.string())
  .prop('author', profileResponse)
  .prop('createdAt', S.number())
  .prop('published', S.boolean())
