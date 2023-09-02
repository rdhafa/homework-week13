import { useEffect, useState } from "react"
import { getAllBooks } from "../modules/fetch"
import { Box, Grid, Spinner} from '@chakra-ui/react'
import BookCard from "../components/BookCard"

const Library = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBook = async () => {
      const books = await getAllBooks()
      setBooks(books)
      setIsLoading(false)
    }
    fetchBook()

    const title = document.getElementsByTagName('title')[0]
    title.innerHTML = 'My Bookstore'
  },[])
  
  return (
    <>
      {isLoading && (
        <Spinner size={'xl'} my={'30vh'}/>
      )}
      <Box width={'80%'} mx={'auto'}>
        <Grid templateColumns={'repeat(3, 1fr)'} gap='1.5em' py='2rem' mx={'auto'} justifyItems={'center'}>
        {books?.books?.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
        </Grid>
      </Box>
    </>
  )
}

export default Library