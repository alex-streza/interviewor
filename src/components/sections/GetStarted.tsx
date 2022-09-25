import Separator from '@components/icons/separator.svg'
import {
  Button,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { container, item, MotionTitle } from '@utils/variants'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

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
  textButton: {
    color: theme.colors.blue[4],
    fontWeight: 600,
  },
}))

const GetStarted = () => {
  const { classes } = useStyles()
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('show')
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      id="get_started"
    >
      <motion.div variants={item} className={classes.separator}>
        <Separator />
      </motion.div>
      <Container className={classes.container} fluid>
        <MotionTitle
          variants={item}
          order={2}
          align="center"
          className={classes.title}
        >
          Train for your next interview now
        </MotionTitle>
        <motion.span variants={item}>
          <Text align="center" mt="xs" px="xs" className={classes.text}>
            Train on over 200 React theory-based questions and answers. Share
            link with your interviewer and start explaining concepts know.
          </Text>
        </motion.span>
        <Stack mt="sm" align="center" spacing="xxs">
          <motion.div variants={item}>
            <Link href="/interview" passHref>
              <Button size="lg">Get started</Button>
            </Link>
          </motion.div>
          <motion.span variants={item}>
            <Text
              align="center"
              color="blue"
              size="sm"
              className={classes.textButton}
            >
              No account required
            </Text>
          </motion.span>
        </Stack>
      </Container>
    </motion.section>
  )
}

export default GetStarted
