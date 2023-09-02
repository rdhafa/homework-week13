import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addBook, editBook } from "../modules/fetch";
import Swal from 'sweetalert2'

export default function BookForm({ bookData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [authorValue, setAuthorValue] = useState('')

  const Toast = Swal.mixin({
    toast: true,
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true
  })

  const regexLettersOnly = /[^a-zA-Z]+/g
  const validation = (e) => {
  e.preventDefault()
  setAuthorValue(e.target.value.replace(regexLettersOnly, ''))
  // console.log(e.target.value.replace(regexLettersOnly, ''))
  // e.target.value.replace()
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
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        Toast.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Book Edited Successfully!',
          color: 'green'
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          position: 'top',
          title: 'Form Error',
          text: err.response.data.message || "Something went wrong",
          color: 'red'
        })
        setError(err?.message.toLowerCase() || "An error occurred");
      }
      return;
    }
    try {
      await addBook(formData);
      event.target.reset();
      Toast.fire({
        icon: 'success',
        position: 'top-end',
        title: 'Book Created Successfully!',
        color: 'green'
      })
      setSelectedImage("");
    } catch (err) {
      Toast.fire({
        icon: 'error',
        position: 'top',
        title: 'Form Error',
        text: err.response.data.message || "Something went wrong",
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
    <Box w="60vw" py={4} px={24} mx="auto" mt={8}>
      {bookData ? 
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
          <VStack >

            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input 
              name="title" 
              required 
              placeholder="The Lord of the Rings" 
              autoComplete='off'
              defaultValue={bookData?.title} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Author</FormLabel>
              <Input 
              name="author" 
              required 
              placeholder="John Ronald Reuel Tolkien" 
              autoComplete='off'
              onChange={(e) => {validation(e)}}
              value={authorValue}
              // onChange={(e) => {console.log(e.target.value)}}
              defaultValue={bookData?.author} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Publisher</FormLabel>
              <Input 
              name="publisher" 
              required 
              placeholder="George Allen and Unwin" 
              autoComplete='off'
              defaultValue={bookData?.publisher} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Year</FormLabel>
              <Input
                name="year"
                type="number"
                required
                placeholder="1954"
                autoComplete='off'
                defaultValue={bookData?.year} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Pages</FormLabel>
              <Input
                name="pages"
                type="number"
                required
                placeholder="1137"
                autoComplete='off'
                defaultValue={bookData?.pages} 
              />
            </FormControl>
            
            {selectedImage && (
              <Image w={64} src={selectedImage} alt="Selected Image" />
            )}
            {!bookData?.image && (
              <FormControl isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
            )}

            <Button type="submit" colorScheme="teal" width={'full'}>
              {bookData ? "Edit Book" : "Create Book"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>

  );
}
