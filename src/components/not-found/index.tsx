import NotFoundIllustration from '@components/icons/404.svg'
import { Button, createStyles, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    marginInline: 'auto',
    marginTop: '60px',
  },
  title: {
    fontSize: '32px',
    lineHeight: '28px',
    marginTop: '20px',
    marginBottom: '4px',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: '12px',
  },
}))

interface NotFoundProps {
  title?: string
  description?: string
  hideButton?: boolean
}

const NotFound = ({
  title = 'Page not found',
  description = 'Sorry, we couldn’t find what you were looking for.',
  hideButton,
}: NotFoundProps) => {
  const { classes } = useStyles()

  return (
    <Stack className={classes.container}>
      <NotFoundIllustration />
      <Title order={1} className={classes.title}>
        {title}
      </Title>
      <Text className={classes.description}>{description}</Text>
      {!hideButton && (
        <Link href="/">
          <Button size="md">Back to home page</Button>
        </Link>
      )}
    </Stack>
  )
}

export default NotFound
