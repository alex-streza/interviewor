import { createStyles, Center, Group, Container } from '@mantine/core'
import { darken } from 'color2k'

const useStyles = createStyles((theme, { index = 0 }: { index?: number }) => ({
  container: {
    maxWidth: 400,
  },
  card: {
    backgroundColor: `${darken('#F2F2F2', index * 0.05)} !important`,
    borderRadius: '12px',
    padding: '20px',
    scale: 100 - 10 * index + '%',
    marginTop: index > 0 ? '-80px' : 0,
    zIndex: 3 - index,
    width: '100%',
    maxWidth: '400px',
    minHeight: '180px',
    position: 'relative',
  },
  button: {
    backgroundColor: '#E9E9E9',
    height: '48px',
    width: '120px',
    borderRadius: '12px',
  },
}))

export const LoadingCard = ({ index }: { index: number }) => {
  const { classes } = useStyles({ index })

  return <div className={`${classes.card} skeleton`} />
}

const CardsLoading = () => {
  const { classes } = useStyles({})

  return (
    <Container className={classes.container}>
      <LoadingCard index={0} />
      <LoadingCard index={1} />
      <LoadingCard index={2} />
      <Center>
        <Group>
          <div className={`${classes.button} skeleton`} />
          <div className={`${classes.button} skeleton`} />
        </Group>
      </Center>
    </Container>
  )
}

export default CardsLoading
