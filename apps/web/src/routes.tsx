import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import {RequireAuth} from './utils/authContext'
import {Layout} from './components/layout'
import FeedPage from './pages/feed'
import PostPage from './pages/post'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import AdminPostsPage from './pages/admin/posts'
import PostEditPage from './pages/admin/postEditModal'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPostsPage />
              </RequireAuth>
            }
          >
            <Route path="edit/:id" element={<PostEditPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}
