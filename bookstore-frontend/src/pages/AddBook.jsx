import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import BookForm from "../components/BookForm"

const AddBook = () => {

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0]
    title.innerHTML = 'My Bookstore - Add Book'
  },[])

  return (
    <Box>
      <BookForm />
    </Box>
  )
}

export default AddBook