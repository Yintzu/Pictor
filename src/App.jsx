import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Album from './pages/Album'
import RequireAuth from './components/RequireAuth'
import Review from './pages/Review'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="album/:id" element={<RequireAuth><Album /></RequireAuth>} />
        <Route path="review/:userId/:albumId" element={<Review />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
