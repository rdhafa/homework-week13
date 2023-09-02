import './App.css'
import Navbar from './components/Navbar.jsx'
import { Box } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Library from './pages/Library'
import Register from './pages/Register'
import AddBook from './pages/AddBook'
import BookDetail from './pages/BookDetail'
import PrivateRoute from './components/PrivateRoute'
import EditBook from './pages/EditBook'


function App() {

  return (
    <Box w={'100%'} h={'100vh'}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Library />} />
          <Route path='/book/:id' element={<BookDetail />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/addbook' element={
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
          } />
          <Route path='/editbook/:id' element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
          } />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
