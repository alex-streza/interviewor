import {
  Button,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import Separator from '@components/icons/separator.svg'

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.blue[0],
    paddingBlock: '40px',
    paddingInline: '0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingBlock: '100px',
      overflow: 'visible',
    },
  },
  title: {
    fontSize: 28,
    lineHeight: 1.2,
    paddingInline: '20px',
    position: 'relative',
    maxWidth: 420,

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 40,
    },
  },
  separator: {
    width: '100%',
    marginBottom: '-20px',

    path: {
      strokeWidth: 15,
    },

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      height: '60px',
      marginBottom: '-30px',

      path: {
        strokeWidth: 5,
      },
    },
  },

  text: {
    maxWidth: 570,
  },
}))

const GetStarted = () => {
  const { classes } = useStyles()

  return (
    <section id="get_started">
      <div className={classes.separator}>
        <Separator />
      </div>
      <Container className={classes.container} fluid>
        <Title order={2} align="center" className={classes.title}>
          Train for your next interview now
        </Title>
        <Text align="center" mt="xs" px="xs" className={classes.text}>
          {/* Train on over 1000 React, Node.JS, Javascript, CSS, HTML theory-based questions and answers. Share link with
					your interviewer and start explaining concepts know. */}
          Train on over 200 React theory-based questions and answers. Share link
          with your interviewer and start explaining concepts know.
        </Text>
        <Stack mt="sm" align="center" spacing="xxs">
          <Link href="/interview" passHref>
            <Button size="lg">Get started</Button>
          </Link>
          <Text align="center" color="blue" size="sm">
            No account required
          </Text>
        </Stack>
      </Container>
    </section>
  )
}

export default GetStarted
