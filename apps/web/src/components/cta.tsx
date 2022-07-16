import {Container, Link} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'

export function CTA({label, link}) {
  return (
    <Container
      rounded="md"
      centerContent
      p={10}
      bgGradient="linear(to-tr, gray.50, gray.100, gray.50)"
    >
      <Link
        as={RouterLink}
        to={link}
        fontWeight="semibold"
        color="gray.500"
        textAlign="center"
        _hover={{textDecoration: 'none'}}
      >
        {label}
      </Link>
    </Container>
  )
}
