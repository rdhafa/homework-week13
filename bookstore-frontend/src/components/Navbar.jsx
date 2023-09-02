import { useEffect, useState } from "react";
import { handleLogin, validateToken } from "../modules/fetch";
import { Button, Flex, FormControl, FormLabel, HStack, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)
  const [inAddBook, setInAddBook] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const Toast = Swal.mixin({
    toast: true,
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const checkToken = await validateToken()
        if (checkToken) {
          setIsAuthenticated(true)
        } else if (!checkToken) {
          setIsAuthenticated(false)
        }
      } catch (e) {
        return
      }
    }
    checkLoginStatus()
  }, [Cookies.get('jwt_token')]);

  useEffect(() => {
    if (pathname === "/addbook") {
      setInAddBook(true)
    } else {
      setInAddBook(false)
    }
  },[pathname])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = {
        email: event.target.email.value,
        password: event.target.password.value
      }
      const token = await handleLogin(user)
      Cookies.set('jwt_token', token.token)
      setIsLoginError(false)
      navigate('/')
      onClose()
      Toast.fire({
        icon: 'success',
        position: "top-end",
        title: 'Login Success!',
        color: 'green',
      })
    } catch (err) {
      setIsLoginError(err.message)
      Toast.fire({
        icon: 'error',
        position: 'top',
        title: 'Login Error',
        text: err.message,
        color: 'red',
      })
    }
  }

  const handleLogout = async () => {
    Cookies.remove('jwt_token')
    setIsAuthenticated(false)
    navigate('/')
    Toast.fire({
      icon: 'success',
      position: "top-end",
      title: 'Logout Success!',
      color: 'green',
    })
  }
  
  return (
    <>
    <Flex 
      as="nav" 
      bgGradient={'linear(to-r, green.400, teal.400)'} 
      w={'full'} 
      h={'3rem'}
      px={'3rem'}
      justify={'space-between'}
      align={'center'}
      >
      <Link to={'/'}>
        <Text fontSize={'lg'} color={"#FFF"} _hover={{color: "#C66599"}}>
          <Icon boxSize={5} mr={1} mb={1}>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z" fill="#1C274D"/>
            <path d="M8.68965 17.1351H7.47341C6.39395 17.1351 6.01657 17.1421 5.72738 17.218C4.93365 17.4264 4.30088 18.0044 4.02952 18.7558C4.0463 19.1382 4.07259 19.4746 4.11382 19.775C4.22268 20.5683 4.42179 20.9884 4.72718 21.2876C5.03258 21.5868 5.46135 21.7818 6.27103 21.8885C7.10452 21.9983 8.2092 22 9.7931 22H14.2069C15.7908 22 16.8955 21.9983 17.729 21.8885C18.5387 21.7818 18.9674 21.5868 19.2728 21.2876C19.5782 20.9884 19.7773 20.5683 19.8862 19.775C19.9776 19.1088 19.9956 18.2657 19.9991 17.1351H13.1034V20.1417C13.1034 20.4397 13.1034 20.5886 12.9988 20.6488C12.8941 20.709 12.751 20.6424 12.4647 20.5092L11.0939 19.8713C10.9971 19.8262 10.9486 19.8037 10.8966 19.8037C10.8445 19.8037 10.796 19.8262 10.6992 19.8713L9.32842 20.5092C9.04213 20.6424 8.89899 20.709 8.79432 20.6488C8.68965 20.5886 8.68965 20.4397 8.68965 20.1417V17.1351Z" fill="#1C274D"/>
          </Icon>
          My Bookstore
        </Text>
      </Link>
      <HStack>
        {(isAuthenticated && !inAddBook) && (
          <Link to={'/addbook'}>
            <Button height={'2.2rem'} colorScheme="green" mr={'0.7rem'}>
              Add Book
            </Button>
          </Link>
        )}
        {!isAuthenticated ? (
            <Button height={'2.2rem'} colorScheme="blue"
              onClick={onOpen}>
              Login
            </Button>
          ) : (
            <Popover colorScheme="red">
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button colorScheme="red" height={'2.2rem'}>Logout</Button>
                  </PopoverTrigger>
                  <PopoverContent bgColor="red.100">
                  <PopoverArrow bgColor="red.100"/>
                  <PopoverCloseButton/>
                  <PopoverBody>
                    You sure want to logout?
                    <Flex mt={'1rem'} justify={'center'}>
                      <Button mr={'1em'} height={'2.2rem'} bgColor={'bg'} colorScheme="gray" onClick={onClose}>Cancel</Button>
                      <Button height={'2.2rem'} colorScheme="red" variant={'outline'}
                      onClick={handleLogout}>
                      Logout
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </>
              )}
            </Popover>
          )}
      </HStack>
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <form onSubmit={handleSubmit}>
        <ModalContent borderRadius={'0.5em'} overflow={'hidden'}>
          <ModalHeader textAlign={'center'} color={'#FFF'} bgGradient={'linear(to-r, green.400, teal.400)'}>
            Login to My Bookstore
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <VStack px={'3rem'} pt={'0.5rem'}>
              {isLoginError && (
                <Text color={'red'} fontSize={'0.8em'}>{isLoginError}</Text>
              )}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" autoComplete="off" placeholder="example@example.com"/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password"/>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack px={'3rem'} width={'full'}>
              <Button type="submit" colorScheme="blue" width={'full'} height={'2.2rem'}>
                <Text mb={'0.1em'}>
                  Login
                </Text>
              </Button>
              <Link to={'/register'} onClick={onClose}>
                <Text fontSize={'0.8rem'}>
                  Don't have an account? Click here!
                </Text>
              </Link>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
    </>
  )
}

export default Navbar