import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Layout} from './components/layout'
import FeedPage from './pages/feed'
import PostPage from './pages/post'
import LoginPage from './pages/login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedPage />} />
          <Route path="posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
