import Logo from '@components/logo'
import {
  Burger,
  Button,
  Center,
  createStyles,
  Drawer,
  Group,
  Header,
  MediaQuery,
  NavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { container } from '@utils/variants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const useStyles = createStyles(
  (theme, { centered }: { centered?: boolean }) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: theme.colors.blue[0],
      border: 'none',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        paddingInline: 180,
      },

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        paddingInline: 300,
      },
    },
    desktopItems: {
      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    drawer: {
      top: '70px',
      backgroundColor: theme.colors.blue[0],
    },
    link: {
      background: 'none',
      fontWeight: 700,
      alignItems: centered ? 'center' : 'right',
      textAlign: centered ? 'center' : 'right',
      width: 'fit-content',

      span: {
        fontSize: 18,

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
          fontSize: 14,
        },
      },

      '&:hover': {
        background: 'none',
        color: theme.colors.blue[6],
      },
    },
    cta: {
      marginTop: '20px',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        marginTop: 0,
      },
    },
  }),
)

interface NavigationLinkProps {
  label: string
  route: string
  centered?: boolean
  onClick?: () => void
}

export const NavigationLink = ({
  label,
  route,
  centered,
  onClick,
}: NavigationLinkProps) => {
  const { classes } = useStyles({
    centered,
  })

  return (
    <Link href={`/${route}`} passHref>
      <NavLink
        className={classes.link}
        label={label}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      />
    </Link>
  )
}

const links = [
  {
    label: 'Features',
    name: '#feature1',
  },
  {
    label: 'Examples',
    name: '#feature2',
  },
  {
    label: 'Testimonials',
    name: '#testimonials',
  },
]

const NavigationItems = ({
  onClick,
  centered,
}: {
  onClick: () => void
  centered?: boolean
}) => {
  const { classes } = useStyles({
    centered,
  })

  return (
    <>
      {links.map((link, index) => (
        <motion.span key={index} variants={item}>
          <NavigationLink
            label={link.label}
            route={link.name}
            onClick={onClick}
            centered={centered}
          />
        </motion.span>
      ))}
      <NavigationLink label="Questions" route="questions" centered={centered} />
      <Link href="/interview">
        <motion.a variants={item}>
          <Button size="md">Get started</Button>
        </motion.a>
      </Link>
    </>
  )
}

const MotionHeader = motion(Header)
const MotionBurger = motion(Burger)

const item = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  show: {
    opacity: 1,
    x: 0,
  },
}

const Navigation = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles({})

  const [opened, setOpened] = useState(false)

  return (
    <MotionHeader
      initial="hidden"
      variants={container}
      animate="show"
      height="auto"
      className={classes.container}
    >
      <Link href="/" passHref>
        <motion.a variants={item}>
          <Logo />
        </motion.a>
      </Link>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Group className={classes.desktopItems}>
          <NavigationItems onClick={() => setOpened(false)} />
        </Group>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Group>
          <MotionBurger
            variants={item}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            aria-label="search"
          />
          <Drawer
            className={classes.drawer}
            position="right"
            opened={opened}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            padding="xl"
            size="full"
          >
            <Center>
              <Stack align="center" spacing={32} pt={80}>
                <NavigationItems onClick={() => setOpened(false)} centered />
              </Stack>
            </Center>
          </Drawer>
        </Group>
      </MediaQuery>
    </MotionHeader>
  )
}

export default Navigation
