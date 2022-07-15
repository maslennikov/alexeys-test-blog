export type Post = {
  id: number
  title: string
  summary: string
  publishedAt: number
  blog: {
    id: number
    name: string
  }
}
