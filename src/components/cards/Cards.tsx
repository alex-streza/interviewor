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
  controlled?: boolean
  shown?: boolean
  index?: number
  totalCount?: number
  showAnswer?: () => void
  onNavigate?: (direction: 'previous' | 'next') => void
}

const useStyles = createStyles((theme) => ({
  container: {
    marginInline: '20px',
    height: '100%',
    maxWidth: 400,

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
  questions: initialQuestions,
  autoPlay,
  hasNavigation,
  onNavigate,
  controlled,
  showAnswer,
  shown,
  totalCount,
  index = 0,
}: CardsProps) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [paused, setPaused] = useState(false)

  const { classes } = useStyles()

  useEffect(() => {
    if (controlled) setQuestions(initialQuestions)
  }, [initialQuestions, controlled])

  useEffect(() => {
    if (autoPlay && !paused && questions.length > 0) {
      const interval = setInterval(() => {
        if (!paused) {
          const [first, ...rest] = questions
          setQuestions([...rest, first] as any[])
        }
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [autoPlay, questions, paused])

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
              title={questions[0]?.text}
              answer={questions[0]?.answer}
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
          {index > 0 && (
            <Button
              variant="light"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('previous')
                } else {
                  const [first, ...rest] = questions
                  setQuestions([...rest, first] as any[])
                }
                setPaused(false)
              }}
            >
              <ArrowLeftIcon />
              Previous
            </Button>
          )}
          {totalCount && (
            <Text weight={900}>
              {index + 1}/{totalCount}
            </Text>
          )}
          <Button
            onClick={() => {
              if (onNavigate) {
                onNavigate('next')
              } else {
                const last = questions.pop()
                setQuestions([last, ...questions] as any[])
              }
            }}
          >
            Next
            <ArrowRightIcon />
          </Button>
        </MotionGroup>
      )}
    </MotionStack>
  )
}

export default Cards
