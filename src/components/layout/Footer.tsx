import Logo from '@components/logo'
import { createStyles, Footer, Group, Stack, Text } from '@mantine/core'
import { container, item } from '@utils/variants'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { NavigationLink } from './Navigation'

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '20px',
    backgroundColor: theme.colors.blue[0],
    border: 'none',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingInline: '180px',
    },
  },
  linksContainer: {
    alignItems: 'end',
    gap: 4,
    span: {
      fontSize: '12px',
    },
    button: {
      padding: 4,
    },
  },
}))

const links = [
  {
    label: 'Features',
    name: 'feature1',
  },
  {
    label: 'Examples',
    name: 'feature2',
  },
  {
    label: 'Testimonials',
    name: 'testimonials',
  },
]

const MotionFooter = motion(Footer)

const AppFooter = () => {
  const { classes } = useStyles()
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('show')
    }
  }, [controls, inView])

  return (
    <MotionFooter
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      className={classes.container}
      height="auto"
    >
      <Stack spacing={8}>
        <Link href="/" passHref>
          <motion.a variants={item}>
            <Logo />
          </motion.a>
        </Link>
        <motion.span variants={item}>
          <Text size="xs">Tech interviews were never easier</Text>
        </motion.span>
      </Stack>
      <Group position="left">
        <Stack spacing={8} className={classes.linksContainer}>
          {links.map((link, index) => (
            <motion.span key={index} variants={item}>
              <NavigationLink label={link.label} route={link.name} />
            </motion.span>
          ))}
        </Stack>
      </Group>
    </MotionFooter>
  )
}

export default AppFooter
