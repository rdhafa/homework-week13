import { useParams } from "react-router-dom"

const EditBook = () => {
  const {id} = useParams()

  return (
    <h1>editbook {id}</h1>
  )
}

export default EditBook