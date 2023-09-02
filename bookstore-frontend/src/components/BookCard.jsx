import { Box, Card, CardBody, CardHeader, Heading, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const BookCard = ({id, title, author, image, publisher, year}) => {
  const titleEllipsis = `${title} (${year})`

  return (
    <Link to={`/book/${id}`} >
      <Card textAlign={'center'} borderRadius={'.3em'} overflow={'hidden'} width='17rem' height={'22rem'} boxShadow='xl' cursor='pointer'>
      <CardHeader py={3} bgColor={'teal.100'}>
        <Image w="auto" h="13rem" boxShadow='2xl' mx={'auto'}
        src={`http://localhost:8000/${image}`} 
        />
      </CardHeader>
      <CardBody py={'1rem'} bgColor='card'>
        <Heading size="md" noOfLines={1} title={titleEllipsis} py={'0.2em'}>
          {title} ({year})
        </Heading>
        <Box mt={'0.3em'}>
          <Text mb={'-0.3em'} noOfLines={1} title={`by: ${author}`}>by: {author}</Text>
          <Text noOfLines={1} title={`Publisher: ${publisher}`}>Publisher: {publisher}</Text>
        </Box>
      </CardBody>
    </Card>
    </Link>
  )
}

export default BookCard