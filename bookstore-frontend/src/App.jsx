import './App.css'
import Navbar from './components/Navbar.jsx'
import { Box } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Library from './pages/Library'
import Register from './pages/Register'
import AddBook from './pages/AddBook'


function App() {

  return (
    <Box w={'100%'} h={'100vh'}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Library />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addbook' element={<AddBook />} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
