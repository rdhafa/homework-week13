import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Box, VStack } from '@chakra-ui/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {

  return (
    <Box w={'100%'} h={'100vh'}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </Box>
  )
}

export default App
