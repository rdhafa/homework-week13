import axios, {axiosPrivate} from "../axios/index.js";

const handleLogin = async (user) => {
  try {
    const response = await axios.post('/login', user)
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong')
  }
}

const getAllBooks = async () => {
  try {
    const response = await axios.get('/books')
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong')
  }
}

const addBook = async (book) => {
  try {
    const response = await axiosPrivate.post('/books', book, {
      headers: {"Content-Type": 'multipart/form-data'}
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong')
  }
}

const editBook = async (book) => {
  const {id} = book
  try {
    const response = await axiosPrivate.put(`/books/${id}`, book, {
      headers: {"Content-Type": 'multipart/form-data'}
    })
    return response
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong')
  }
}

const validateToken = async () => {
  try {
    const response = await axiosPrivate.get('/verify')
    if (response.data.message === "NoToken" || response.data.message === "TokenError" || response.data.message === "InternalServerError") {
      return false
    } else if (response.data.message === "Valid") {
      return true
    }
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong')
  }
}

export { handleLogin, getAllBooks, addBook, editBook, validateToken }