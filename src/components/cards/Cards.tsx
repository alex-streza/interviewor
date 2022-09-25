import { Button, Text, createStyles, Group, Stack } from '@mantine/core'
import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Question } from 'src/types/models/questions'
import QuestionCard from './QuestionCard'

interface CardsProps {
  questions: Question[]
  autoPlay?: boolean
  hasNavigation?: boolean
  shown?: boolean
  onNext?: () => void
  onPrevious?: () => void
  index?: number
  page?: number
  totalCount?: number
  showAnswer?: () => void
}

const useStyles = createStyles((theme) => ({
  container: {
    marginInline: '20px',
    height: '100%',
    maxWidth: 400,
    minHeight: 242,

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginInline: 'auto',
    },
  },
}))

const MotionStack = motion(Stack)
const MotionGroup = motion(Group)

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

const Cards = ({
  questions,
  autoPlay,
  hasNavigation,
  onNext,
  onPrevious,
  showAnswer,
  shown,
  totalCount,
  page = 0,
  index = 0,
}: CardsProps) => {
  const [paused, setPaused] = useState(false)

  const { classes } = useStyles()

  useEffect(() => {
    if (autoPlay && !paused && questions.length > 0) {
      const interval = setInterval(() => {
        if (!paused && onNext) {
          onNext()
        }
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [autoPlay, questions, paused, onNext])

  return (
    <MotionStack
      variants={container}
      initial="hidden"
      animate="show"
      className={classes.container}
    >
      <Group>
        {questions.length > 0 && (
          <>
            <QuestionCard
              index={0}
              title={questions[index]?.text}
              answer={questions[index]?.answer}
              onPause={() => setPaused(!paused)}
              onShowAnswer={showAnswer}
              shown={shown}
            />
            <QuestionCard index={1} />
            <QuestionCard index={2} />
          </>
        )}
      </Group>
      {hasNavigation && questions.length > 0 && (
        <MotionGroup variants={item} mx="auto" mt="auto">
          {(page > 0 || index > 0) && (
            <Button variant="light" onClick={onPrevious}>
              <ArrowLeftIcon />
              Previous
            </Button>
          )}
          {totalCount && (
            <Text size="sm" weight={900}>
              {(page - 1) * 25 + index + 1}/{totalCount}
            </Text>
          )}
          <Button onClick={onNext}>
            Next
            <ArrowRightIcon />
          </Button>
        </MotionGroup>
      )}
    </MotionStack>
  )
}

export default Cards
