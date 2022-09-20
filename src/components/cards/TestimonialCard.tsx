import {
  Box,
  createStyles,
  Group,
  Avatar,
  Stack,
  Text,
  Title,
  Button,
} from '@mantine/core'
import TwitterIcon from '@components/icons/twitter.svg'

interface TestimonialCardProps {
  name: string
  username: string
  tweet: string
  tweet_url: string
  avatar: string
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.white[0],
    boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
    borderRadius: '12px',
    padding: '20px',
    border: `1px ${theme.colors.blue[4]} solid`,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  avatarContainer: {
    marginBottom: '12px',
  },
}))

const TestimonialCard = ({
  name,
  username,
  tweet,
  avatar,
}: TestimonialCardProps) => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Group className={classes.avatarContainer}>
        <Avatar src={avatar} size={48} radius="xl" alt={name} />
        <Stack className={classes.nameContainer}>
          <Title order={5}>{name}</Title>
          <Text weight={700} size="sm" color="blue">
            {username}
          </Text>
        </Stack>
        <Button size="md" variant="white" ml="auto" p="none">
          <TwitterIcon />
        </Button>
      </Group>
      <Text>{tweet}</Text>
    </Box>
  )
}

export default TestimonialCard
