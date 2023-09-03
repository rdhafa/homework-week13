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

const getABook = async (id) => {
  try {
    const response = await axios.get(`/books/${id}`)
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

const editBook = async (id, editedBook) => {
  try {
    const response = await axiosPrivate.put(`/books/${id}`, editedBook)
    return response
  } catch (err) {
    throw new Error(err.response.data.message || 'Something Went Wrong'
    )
  }
}

const deleteBook = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/books/${id}`)
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

export { handleLogin, getAllBooks, getABook, addBook, editBook, deleteBook, validateToken }