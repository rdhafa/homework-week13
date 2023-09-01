import axios, {axiosPrivate} from "../axios/index.js";

const handleLogin = async (user) => {
  try {
    const response = await axios.post('/login', user)
    return response.data
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

export { handleLogin, validateToken }