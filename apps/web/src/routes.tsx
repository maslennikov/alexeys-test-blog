import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Layout} from './components/layout'
import FeedPage from './pages/feed'
import PostPage from './pages/post'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FeedPage />} />
          <Route element={<Layout />}>
            <Route path="posts/:id" element={<PostPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
