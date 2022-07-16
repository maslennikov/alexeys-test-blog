export type Post = {
  id: number
  title: string
  summary: string
  content?: string
  publishedAt: number
  blog: {
    id: number
    name: string
  }
}
