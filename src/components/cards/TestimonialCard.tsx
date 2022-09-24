import TwitterIcon from '@components/icons/twitter.svg'
import {
  Avatar,
  Button,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { item } from '@utils/variants'
import { motion } from 'framer-motion'

interface TestimonialCardProps {
  name: string
  username: string
  tweet: string
  tweet_url: string
  avatar?: string
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
  avatar: {
    div: {
      backgroundColor: theme.colors.blue[2],
      color: theme.colors.blue[6],
    },
  },
}))

const TestimonialCard = ({
  name,
  username,
  tweet,
  avatar,
  tweet_url,
}: TestimonialCardProps) => {
  const { classes } = useStyles()

  return (
    <motion.div variants={item} className={classes.container}>
      <Group className={classes.avatarContainer}>
        <Avatar
          src={avatar}
          size={48}
          radius="xl"
          className={classes.avatar}
          alt={name}
        >
          {name[0]}
        </Avatar>
        <Stack className={classes.nameContainer}>
          <Title order={5}>{name}</Title>
          <Text weight={700} size="sm" color="blue">
            {username}
          </Text>
        </Stack>
        <a
          href={tweet_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 'auto' }}
        >
          <Button size="md" variant="white" p="none">
            <TwitterIcon />
          </Button>
        </a>
      </Group>
      <Text>{tweet}</Text>
    </motion.div>
  )
}

export default TestimonialCard
