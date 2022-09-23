import { Container, createStyles, Text, Title } from '@mantine/core'
import { motion, useAnimation } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const useStyles = createStyles(
  (theme, { fullWidth }: { fullWidth?: boolean }) => ({
    container: {
      marginBlock: '60px',
      paddingInline: fullWidth ? 0 : 20,
      overflow: 'hidden',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        marginBlock: '120px',
      },
    },
    textContainer: {
      paddingInline: !fullWidth ? 0 : 20,
    },
    title: {
      fontSize: 28,
      lineHeight: 1.2,
      marginBottom: 12,
      maxWidth: '550px',

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        fontSize: 40,
      },
    },
    button: {
      position: 'relative',
    },
    text: {
      maxWidth: '500px',
      marginTop: '8px',
      marginBottom: '20px',
    },
  }),
)

interface SectionProps {
  id: string
  title: ReactNode
  subtitle: string
  description?: string
  fullWidth?: boolean
  children?: ReactNode
}

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}
const item = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

const MotionTitle = motion(Title)

const Section = ({
  id,
  title,
  subtitle,
  description,
  fullWidth,
  children,
}: SectionProps) => {
  const { classes } = useStyles({ fullWidth })
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
      id={id}
    >
      <Container className={classes.container}>
        <Container className={classes.textContainer}>
          <motion.span variants={item}>
            <Text color="blue" weight={600} size="sm">
              {subtitle}
            </Text>
          </motion.span>
          <MotionTitle variants={item} order={2} className={classes.title}>
            {title}
          </MotionTitle>
          <motion.span variants={item}>
            <Text align="left" color="dimmed" className={classes.text}>
              {description}
            </Text>
          </motion.span>
        </Container>
        <motion.div variants={item}>{children}</motion.div>
      </Container>
    </motion.section>
  )
}

export default Section
