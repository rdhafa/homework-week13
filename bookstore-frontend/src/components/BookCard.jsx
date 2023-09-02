import { Card, CardBody, CardHeader, Heading, Image, Link, Text } from "@chakra-ui/react"

const BookCard = ({id, title, author, image, publisher, year}) => {

  const titleEllipsis = `${title} (${year})`

  return (
    <Link to={`books/${id}`}>
      <Card key={`${id}`} textAlign={'center'} borderRadius={'.3em'} overflow={'hidden'} width='17rem' height={'22rem'} boxShadow='xl' cursor='pointer'>
      <CardHeader py={3} bgColor={'teal.100'}>
        <Image w="auto" h="13rem" boxShadow='2xl' mx={'auto'}
        src={`http://localhost:8000/${image}`} 
        />
      </CardHeader>
      <CardBody py={'1rem'} bgColor='card'>
        <Heading size="md" noOfLines={1} title={titleEllipsis}>
          {title} ({year})
        </Heading>
        <Text>{author}</Text>
        <Text>
          <span>Publisher: </span>
          {publisher}
        </Text>
      </CardBody>
    </Card>
    </Link>
  )
}

export default BookCard