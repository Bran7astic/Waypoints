import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/> }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/feed" element={<Feed/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
