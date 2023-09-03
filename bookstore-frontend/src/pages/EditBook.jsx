import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getABook } from "../modules/fetch"
import { Spinner } from "@chakra-ui/react"
import BookForm from "../components/BookForm"

const EditBook = () => {
  const {id} = useParams()
  const [aBook, setABook] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchABook = async (id) => {
      const book = await getABook(id)
      setABook(book.book)
      setIsLoading(false)
      const title = document.getElementsByTagName('title')[0]
      title.innerHTML = `My Bookstore - Edit ${book.book.title}`
    }
    fetchABook(id)
  }, [id])

  return (
    <>
      {isLoading && (
        <Spinner size={'xl'} my={'30vh'}/>
      )}
        <BookForm key={aBook.id} {...aBook}/>
    </>
  )
}

export default EditBook