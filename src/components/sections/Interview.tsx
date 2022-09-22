import { useMutation, useStorage } from '@api/liveblock.config'
import Cards from '@components/cards/Cards'
import CategoryCard from '@components/cards/CategoryCard'
import { categoryIcons } from '@components/icons/categoryIcons'
import Live from '@components/live'
import CardsLoading from '@components/loading/CardsLoading'
import NotFound from '@components/not-found'
import {
  Button,
  Center,
  Container,
  CopyButton,
  createStyles,
  Grid,
  Group,
  Popover,
  Text,
  Title,
} from '@mantine/core'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareAndroidIcon,
} from '@primer/octicons-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getCategories, getQuestionsByCategory, pageSize } from 'src/api'
import { Question } from 'src/types/models/questions'
import { Maybe } from 'type-graphql'

const useStyles = createStyles((theme) => ({
  container: {
    paddingBlock: '40px',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingBlock: '100px',
    },
  },
  innerContainer: {
    maxWidth: '551px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  shareContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    lineHeight: 1.2,
    textAlign: 'center',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 40,
    },
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    border: '2px solid',
    fontSize: 16,
    borderColor: theme.colors.blue[4],
    color: theme.colors.blue[4],

    '&:disabled': {
      backgroundColor: theme.colors.gray[2],
    },
  },
  popover: {
    padding: '8px',
    width: 'fit-content',
  },
}))

const Interview = () => {
  const { classes } = useStyles()

  const router = useRouter()

  const [tempSelectedCategory, setTempSelectedCategory] =
    useState<Maybe<number>>(null)
  const [page, setPage] = useState(1)
  const [index, setIndex] = useState(0)

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  const questions = useStorage((root) => root.questions) ?? []
  const selectedCategory = useStorage((root) => root.category)
  const shown = useStorage((root) => root.shown) ?? false

  const { data: categoriesData } = useQuery(['categories'], () =>
    getCategories(),
  )

  const { data, isLoading } = useQuery(
    ['questionsByCategory', selectedCategory, page],
    () =>
      getQuestionsByCategory({
        category_id: selectedCategory ?? 1,
        page,
      }),
    {
      enabled: !!selectedCategory,
    },
  )

  const selectCategory = useMutation(
    ({ storage }, category: number | null) => {
      storage.set('category', category)
    },
    [tempSelectedCategory],
  )
  const showAnswer = useMutation(
    ({ storage }) => {
      storage.set('shown', !shown)
    },
    [shown],
  )
  const navigateQuestions = useMutation(
    ({ storage }, direction: 'next' | 'previous') => {
      if (direction === 'next') {
        const [first, ...rest] = questions
        storage.set('questions', [...rest, first as Question])
      } else {
        const last = questions.pop()
        storage.set('questions', [last as Question, ...questions])
      }
    },
    [questions],
  )
  const updateQuestions = useMutation(
    ({ storage }) => {
      const questions = data?.questionsByCategory ?? []
      storage.set('questions', questions)
    },
    [data],
  )

  useEffect(() => {
    if (selectedCategory) {
      updateQuestions()
    }
  }, [selectedCategory, page, isLoading, data, updateQuestions])

  const categories = categoriesData?.categories ?? []

  return (
    <Container m="none" px="xs" className={classes.container} fluid>
      <Container className={classes.innerContainer}>
        <Live />
        {!selectedCategory && (
          <>
            <Title order={1} className={classes.title} mb="xs">
              Pick topic
            </Title>
            <Text className={classes.description}>
              Train on over 1000 React, Node.JS, Javascript, CSS, HTML questions
              and answers.
            </Text>
          </>
        )}
        {selectedCategory && (
          <Group className={classes.shareContainer}>
            <Button
              variant="light"
              size="lg"
              className={classes.button}
              onClick={() => {
                selectCategory(null)
              }}
            >
              <ArrowLeftIcon size={24} />
              {
                categories.find(
                  (category) => category.id === selectedCategory + '',
                )?.value
              }
            </Button>
            <CopyButton value={origin + router.asPath}>
              {({ copy }) => (
                <Popover position="bottom" withArrow onOpen={copy}>
                  <Popover.Target>
                    <Button size="lg" onClick={copy}>
                      <ShareAndroidIcon size={24} />
                      Share
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown className={classes.popover}>
                    <Text size="sm">Copied</Text>
                  </Popover.Dropdown>
                </Popover>
              )}
            </CopyButton>
          </Group>
        )}
        {!selectedCategory && (
          <Grid my="xs">
            {categories.map((category) => (
              <Grid.Col key={category.name} span={6}>
                <CategoryCard
                  selected={category.id == tempSelectedCategory + ''}
                  onSelect={() => setTempSelectedCategory(Number(category.id))}
                >
                  {categoryIcons[category.name as keyof typeof categoryIcons]}
                  {category.value}
                </CategoryCard>
              </Grid.Col>
            ))}
          </Grid>
        )}
        {selectedCategory &&
          (isLoading ? (
            <CardsLoading />
          ) : questions.length > 0 ? (
            <Cards
              questions={questions}
              onNavigate={(direction) => {
                const idx = index + (direction === 'next' ? 1 : -1)
                if (index == pageSize - 1) {
                  setPage(page + 1)
                  setIndex(0)
                } else if (index == -1) {
                  setPage(page - 1)
                  setIndex(0)
                } else {
                  setIndex(idx)
                }
                navigateQuestions(direction)
              }}
              shown={shown}
              showAnswer={showAnswer}
              index={page == 1 && index == 0 ? 0 : 1}
              hasNavigation
              controlled
            />
          ) : (
            <NotFound
              title="No questions found"
              description="We are working on adding more questions to this category. Please check back later."
              hideButton
            />
          ))}
        {!selectedCategory && (
          <Center>
            <Button
              disabled={!tempSelectedCategory}
              size="lg"
              onClick={() => {
                selectCategory(tempSelectedCategory ?? 1)
              }}
            >
              Next
              <ArrowRightIcon size={24} />
            </Button>
          </Center>
        )}
      </Container>
    </Container>
  )
}

export default Interview
