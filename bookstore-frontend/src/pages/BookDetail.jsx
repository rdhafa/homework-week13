import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteBook, getABook, validateToken } from "../modules/fetch"
import { Box, Button, Flex, Grid, HStack, Heading, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import Cookies from "js-cookie"
import Swal from "sweetalert2"

const BookDetail = () => {
  const {id} = useParams()
  const [aBook, setABook] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

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
        console.log(e)
        return
      }
    }
    checkLoginStatus()
  }, [Cookies.get('jwt_token')]);

  useEffect(() => {
    const fetchABook = async (id) => {
      const book = await getABook(id)
      setABook(book.book)
      setIsLoading(false)
      const title = document.getElementsByTagName('title')[0]
      title.innerHTML = `My Bookstore - ${book.book.title}`
    }
    fetchABook(id)
  }, [id])

  const handleDelete = async () => {
    try {
      const deleteABook = await deleteBook(aBook.id)
      Toast.fire({
        icon: 'success',
        position: 'top-end',
        title: 'Book Deleted Successfully!',
        color: 'green'
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isLoading && (
        <Spinner size={'xl'} my={'30vh'}/>
      )}
      {aBook.id && (
        <Box width={'60vw'} mx={'auto'} my={'2.5rem'} bgColor={'teal.100'} py={'2rem'} borderRadius={'1em'}>
          <Grid templateColumns={'repeat(2, 1fr)'} justifyItems={'center'}>
          <Image src={`http://localhost:8000/${aBook.image}`} width={'15rem'}/>
          <Flex direction={'column'} align={'start'} width={'19rem'} ml={'-10rem'} mt={'1rem'}>
            <div>
              <Text fontWeight={'bold'} display={'inline-block'} wordBreak={'normal'}>{aBook.author}</Text>'s
            </div>
            <Heading size={'lg'} noOfLines={1} title={aBook.title}>{aBook.title}</Heading>

            <Text mt={'1rem'} fontSize={'0.9rem'}>Publisher</Text>
            <Text fontWeight={'bold'} mt={'-0.3rem'} mb={'1rem'}>{aBook.publisher}</Text>

            <Text fontSize={'0.9rem'}>Pages </Text>
            <Text fontWeight={'bold'} mt={'-0.3rem'} mb={'1rem'}>{aBook.pages}</Text>

            <Text fontSize={'0.9rem'}>Year Released</Text>
            <Text fontWeight={'bold'} mt={'-0.3rem'} mb={'1rem'}>{aBook.year}</Text>

            {isAuthenticated && (
              <HStack mt={'0.7rem'}>
                <Link to={`/editbook/${id}`}>
                  <Button height={'2.3rem'} fontSize={'0.9rem'} colorScheme="blue">Edit</Button>
                </Link>
                <Popover colorScheme="red" placement="right">
                {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button height={'2.3rem'} fontSize={'0.9rem'} colorScheme="red">Delete</Button>
                  </PopoverTrigger>
                  <PopoverContent bgColor="red.100">
                  <PopoverArrow bgColor="red.100"/>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text>You sure want to delete</Text>
                    <div>
                      <Text fontWeight={'bold'} display={'inline'} mr={'0.1rem'}>{aBook.title}</Text>?
                    </div>
                    <Flex mt={'1rem'} justify={'center'}>
                      <Button mr={'1em'} fontSize={'0.9rem'} height={'2.3rem'} bgColor={'bg'} colorScheme="gray" onClick={onClose}>Cancel</Button>
                      <Button fontSize={'0.9rem'} height={'2.3rem'} colorScheme="red" variant={'outline'}
                      onClick={handleDelete}>
                      Delete
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </>
              )}
              
            </Popover>
              </HStack>
            )}
          </Flex>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default BookDetail