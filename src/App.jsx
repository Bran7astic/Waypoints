import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Post from './pages/Post'
import ConfirmEmail from './pages/Register/ConfirmEmail'
import PostDetails from './pages/PostDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/> }/>
        <Route path="/confirm" element={<ConfirmEmail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="post" element={<Post/>} />
          <Route path=":id" element={<PostDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
