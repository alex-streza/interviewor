import { Button, Collapse, createStyles, Group, Title } from '@mantine/core'
import useTimer from '@utils/useTimer'
import { item } from '@utils/variants'
import { darken } from 'color2k'
import { motion } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useState } from 'react'

interface QuestionCardProps {
  title?: ReactNode
  answer?: string
  shown?: boolean
  hideTimer?: boolean
  canHideAnswer?: boolean
  index?: number
  onPause?: () => void
  onShowAnswer?: () => void
}

const useStyles = createStyles((theme, { index }: { index: number }) => ({
  container: {
    backgroundColor: darken('#F5FEFF', index * 0.05),
    borderRadius: '12px',
    padding: '20px',
    scale: 100 - 10 * index + '%',
    zIndex: 3 - index,
    marginTop: index > 0 ? -150 : 0,
    width: '100%',
    minWidth: '300px',
    maxWidth: '400px',
    minHeight: '170px',
    border: `1px solid ${theme.colors.blue[5]}`,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
    cursor: 'pointer',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  answer: {
    maxWidth: '320px',
    overflowX: 'auto',
  },
  actionsContainer: {
    justifyContent: 'space-between',
  },
  button: {
    background: 'none',
    padding: '0px',
    width: 'fit-content',
  },
}))

const QuestionCard = ({
  title,
  answer,
  index = 0,
  onPause,
  onShowAnswer,
  canHideAnswer = true,
  shown: initialShown = false,
  hideTimer,
}: QuestionCardProps) => {
  const [shown, setShown] = useState(false)

  const { classes } = useStyles({ index })
  const { time } = useTimer({ pause: !title })

  const handleShowAnswer = useCallback(() => {
    if (canHideAnswer) {
      if (onShowAnswer) {
        onShowAnswer()
      } else {
        setShown(!shown)
      }
      onPause && onPause()
    }
  }, [onPause, canHideAnswer, onShowAnswer, shown])

  useEffect(() => {
    setShown(initialShown)
  }, [initialShown])

  return (
    <motion.div
      variants={item}
      className={classes.container}
      onClick={handleShowAnswer}
    >
      <Title order={3} className={classes.title}>
        {title}
      </Title>
      {canHideAnswer ? (
        <Collapse in={shown}>
          <div
            className={classes.answer}
            dangerouslySetInnerHTML={{ __html: answer ?? '' }}
          />
        </Collapse>
      ) : (
        <div
          className={classes.answer}
          dangerouslySetInnerHTML={{ __html: answer ?? '' }}
        />
      )}
      {index === 0 && !hideTimer && (
        <Group className={classes.actionsContainer}>
          <Button
            variant="white"
            className={classes.button}
            onClick={handleShowAnswer}
          >
            {shown ? 'Hide Answer' : 'Show Answer'}
          </Button>
          {time}
        </Group>
      )}
    </motion.div>
  )
}

export default QuestionCard
