import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addBook, editBook } from "../modules/fetch";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function BookForm( bookData ) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [titleValue, setTitleValue] = useState(bookData?.title)
  const [authorValue, setAuthorValue] = useState(bookData?.author)
  const [publisherValue, setPublisherValue] = useState(bookData?.publisher)
  const [yearValue, setYearValue] = useState(bookData?.year)
  const [pagesValue, setPagesValue] = useState(bookData?.pages)

  const Toast = Swal.mixin({
    toast: true,
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true
  })

  const titleInputValue = (e) => {
    e.preventDefault()
    setTitleValue(e.target.value)
  }

  const publisherInputValue = (e) => {
    e.preventDefault()
    setPublisherValue(e.target.value)
  }

  const regexLettersOnly = /[^a-zA-Z '-]+/g
  const authorValidation = (e) => {
    e.preventDefault()
    setAuthorValue(e.target.value.replace(regexLettersOnly, ''))
  }

  const regexNumbersOnly = /[^0-9]+/g
  const yearValidation = (e) => {
    e.preventDefault()
    setYearValue(e.target.value.replace(regexNumbersOnly, ''))
  }

  const pagesValidation = (e) => {
    e.preventDefault()
    setPagesValue(e.target.value.replace(regexNumbersOnly, ''))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      Toast.fire({
        icon: 'error',
        position: 'top',
        title: 'Form Error',
        text: 'Please Select an Image',
        color: 'red'
      })
    }
    const formData = new FormData(event.target);

    if (bookData.id) {
      const editedBook = {
        title: titleValue,
        author: authorValue,
        publisher: publisherValue,
        year: parseInt(yearValue),
        pages: parseInt(pagesValue)
      }
      try {
        await editBook(bookData.id, editedBook);
        Toast.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Book Edited Successfully!',
          color: 'green'
        })
        navigate('/')
      } catch (err) {
        Toast.fire({
          icon: 'error',
          position: 'top',
          title: 'Form Error',
          text: err.message || "Something went wrong",
          color: 'red'
        })
        setError(err?.message.toLowerCase() || "An error occurred");
      }
      return;
    }
    try {
      await addBook(formData);
      Toast.fire({
        icon: 'success',
        position: 'top-end',
        title: 'Book Created Successfully!',
        color: 'green'
      })
      navigate('/')
    } catch (err) {
      Toast.fire({
        icon: 'error',
        position: 'top',
        title: 'Form Error',
        text: err.message || "Something went wrong",
        color: 'red'
      })
      setError(err?.message.toLowerCase() || "An error occurred");
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box w="60vw" py={'0.5rem'} px={24} mx="auto" mt={'1rem'}>
      {bookData.id ? 
        (<Heading size="lg" mb={4}>Edit a Book</Heading>)
        : 
        (<Heading size="lg" mb={4}>Add a Book</Heading>)
      }
      <Box bgColor='teal.50' borderColor="teal.100" borderWidth="1px" borderRadius="lg" p={4}>
      {error && (
        <Text color="red.500" mb={4}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </Text>
      )}
        <form onSubmit={handleSubmit}>
          <VStack p={'1rem'}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input 
              name="title" 
              type='text'
              placeholder="The Lord of the Rings" 
              autoComplete='off'
              onChange={(e) => {titleInputValue(e)}}
              value={titleValue} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Author</FormLabel>
              <Input 
              name="author" 
              type='text'
              placeholder="John Ronald Reuel Tolkien" 
              autoComplete='off'
              onChange={(e) => {authorValidation(e)}}
              value={authorValue} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Publisher</FormLabel>
              <Input 
              name="publisher" 
              type='text'
              placeholder="George Allen and Unwin" 
              autoComplete='off'
              onChange={(e) => {publisherInputValue(e)}}
              value={publisherValue} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Year</FormLabel>
              <Input
                name="year"
                type="text"
                placeholder="1954"
                autoComplete='off'
                onChange={(e) => {yearValidation(e)}}
                value={yearValue} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Pages</FormLabel>
              <Input
                name="pages"
                type="text"
                placeholder="1137"
                autoComplete='off'
                onChange={(e) => {pagesValidation(e)}}
                value={pagesValue} 
              />
            </FormControl>
            
            {selectedImage && (
              <Image w={'10rem'} src={selectedImage} alt="Selected Image" />
            )}
            {!bookData?.image && (
              <FormControl isRequired mb={'1rem'}>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(file)
                    setSelectedImage(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
            )}

            <Button type="submit" colorScheme="teal" width={'full'}>
              {bookData.id ? "Edit Book" : "Add Book"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}