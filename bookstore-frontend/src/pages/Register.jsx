import { useEffect } from "react"

const Register = () => {

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0]
    title.innerHTML = 'My Bookstore - Register'
  },[])
  return (
    <h1>Register</h1>
  )
}

export default Register