export function faceUrlById(id: number) {
  return `https://avatars.githubusercontent.com/u/${id}`
}
export function coverUrlById(id: number, width = 1000) {
  return `https://picsum.photos/id/${id * 10}/${width}`
}
