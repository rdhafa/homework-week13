import { useEffect, useState } from "react"
import { registerUser, validateToken } from '../modules/fetch'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react'

const Register = () => {
  const navigate = useNavigate()
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [error, setError] = useState(false)
  const [render, setRender] = useState(false)

  const Toast = Swal.mixin({
    toast: true,
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      const checkToken = await validateToken()
      if (checkToken) {
        navigate("/")
        return
      } else {
        setRender(true)
        const title = document.getElementsByTagName('title')[0]
        title.innerHTML = 'My Bookstore - Register'
      }
    }
    checkLoginStatus()
  },[])

  const emailRegex = /[^a-zA-Z0-9.@]+/g
  const emailInputValue = (e) => {
    e.preventDefault()
    setEmailValue(e.target.value.replace(emailRegex, ''))
  }

  const passwordInputValue = (e) => {
    e.preventDefault()
    setPasswordValue(e.target.value)
  }

  const confirmPasswordInputValue = (e) => {
    e.preventDefault()
    const confirmPassword = e.target.value
    setConfirmPasswordValue(confirmPassword)
    console.log(confirmPassword, passwordValue)
    if (passwordValue !== confirmPassword) {
      setPasswordMatch(false)
    } else if (passwordValue === confirmPassword) {
      setPasswordMatch(true)
    }
  }
  
  const regexLettersOnly = /[^a-zA-Z '-]+/g
  const nameInputValidation = (e) => {
    e.preventDefault()
    setNameValue(e.target.value.replace(regexLettersOnly, ''))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (passwordValue !== confirmPasswordValue) {
        throw new Error('Password does not Match!')
      }
      const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    }
    const register = await registerUser(user)
    Toast.fire({
      icon: 'success',
      position: "top-end",
      title: 'Register Success!',
      text: 'Thank you for registering!',
      color: 'green',
    })
    setError(false)
    navigate('/')
    } catch (err) {
      Toast.fire({
        icon: 'error',
        position: 'top',
        title: 'Register Error',
        text: err.message || error,
        color: 'red',
      })
      setError(err?.message.toLowerCase() || "An error occurred")
    }
  }

  return (
    <>
    {render && (
      <Box w={'45vw'} mx={'auto'} mt={'1.5rem'} pb={'2rem'}>
        <Heading size={'lg'} mb={'1rem'}>Register an Account</Heading>

        <Box bgColor={'teal.50'} borderColor={'teal.100'} borderWidth={'1px'} borderRadius={'lg'} p={4}>
          <form onSubmit={handleSubmit}>
            <VStack p={'1rem'}>
              {error && (
                <Text color={'red'} fontSize={'0.8rem'} mt={'-1rem'}>{error.charAt(0).toUpperCase() + error.slice(1)}</Text>
              )}
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                name="name"
                type="text" 
                placeholder="Leon Kennedy"
                autoComplete='off'
                onChange={(e) => {nameInputValidation(e)}}
                value={nameValue}/>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                name="email"
                type="email" 
                placeholder="leonkennedy@mail.com"
                autoComplete='off'
                onChange={(e) => {emailInputValue(e)}}
                value={emailValue}/>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                name="password"
                type="password"
                autoComplete='off'
                onChange={(e) => {passwordInputValue(e)}}
                value={passwordValue}/>
              </FormControl>

              <FormControl isRequired mb={'1rem'}>
                <FormLabel>Confirm Password</FormLabel>
                <Input 
                name="confirmPassword"
                type="password"
                autoComplete='off'
                onChange={(e) => {confirmPasswordInputValue(e)}}
                value={confirmPasswordValue}/>
              </FormControl>

              {!passwordMatch && (
                <Box w={'full'} mt={'-0.5rem'} mb={'0.5rem'} textAlign={'left'}>
                  <Text color={'red'} fontSize={'0.8rem'} >Password doesn't match</Text>
                </Box>
              )}

              <Button type="submit" width={'full'} colorScheme={'teal'}>Register</Button>
            </VStack>
          </form>
        </Box>
      </Box>
    )}
    </>
  )
}

export default Register