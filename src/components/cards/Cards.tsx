import { Button, createStyles, Group, Stack } from '@mantine/core'
import { ArrowLeftIcon, ArrowRightIcon } from '@primer/octicons-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Question } from 'src/types/models/questions'
import QuestionCard from './QuestionCard'

interface CardsProps {
  questions: Question[]
  autoPlay?: boolean
  hasNavigation?: boolean
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

const MotionGroup = motion(Group)

const Cards = ({
  questions: initialQuestions,
  autoPlay,
  hasNavigation,
  onNavigate,
}: CardsProps) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [paused, setPaused] = useState(false)

  const { classes } = useStyles()

  useEffect(() => {
    setQuestions(initialQuestions)
  }, [initialQuestions])

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
    <Stack className={classes.container}>
      <MotionGroup>
        {questions.length > 0 && (
          <>
            <QuestionCard
              index={0}
              title={questions[0]?.text}
              answer={questions[0]?.answer}
              onPause={() => setPaused(!paused)}
            />
            <QuestionCard index={1} />
            <QuestionCard index={2} />
          </>
        )}
      </MotionGroup>
      {hasNavigation && questions.length > 0 && (
        <Group mx="auto" mt="auto">
          <Button
            variant="light"
            onClick={() => {
              const [first, ...rest] = questions
              setQuestions([...rest, first] as any[])
              setPaused(false)
              onNavigate && onNavigate('previous')
            }}
          >
            <ArrowLeftIcon />
            Previous
          </Button>
          <Button
            onClick={() => {
              const last = questions.pop()
              setQuestions([last, ...questions] as any[])
              setPaused(false)
              onNavigate && onNavigate('next')
            }}
          >
            Next
            <ArrowRightIcon />
          </Button>
        </Group>
      )}
    </Stack>
  )
}

export default Cards
