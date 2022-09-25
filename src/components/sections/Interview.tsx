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
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useOrigin } from '@utils/useOrigin'
import { container, item } from '@utils/variants'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getQuestionsByCategory } from 'src/api'
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

const MotionTitle = motion(Title)
const MotionContainer = motion(Container)
const MotionCol = motion(Grid.Col)

const Interview = ({ categories }: { categories: Category[] }) => {
  const { classes } = useStyles()

  const router = useRouter()

  const [tempSelectedCategory, setTempSelectedCategory] =
    useState<Maybe<number>>(null)
  const [page, setPage] = useState(1)

  const origin = useOrigin()

  const questions =
    useStorage((root) => {
      const questions = root.questions ?? []
      return questions
    }) ?? []
  const selectedCategory = useStorage((root) => root.category)
  const shown = useStorage((root) => root.shown) ?? false
  const index = useStorage((root) => root.index) ?? 0

  const selectCategory = useMutation(
    ({ storage }, category: number | null) => storage.set('category', category),
    [tempSelectedCategory],
  )
  const showAnswer = useMutation(
    ({ storage }) => storage.set('shown', !shown),
    [shown],
  )
  const setIndex = useMutation(
    ({ storage }, index: number) => storage.set('index', index),
    [],
  )
  const updateQuestions = useMutation(({ storage }, questions: Question[]) => {
    storage.set('questions', questions)
  }, [])

  const { isLoading } = useQuery(
    ['questionsByCategory', selectedCategory, page],
    () =>
      getQuestionsByCategory({
        category_id: selectedCategory ?? 1,
        page,
      }),
    {
      enabled: !!selectedCategory,
      onSuccess: (data) =>
        index === 0 && updateQuestions(data.questionsByCategory),
    },
  )

  return (
    <MotionContainer
      variants={container}
      initial="hidden"
      animate="show"
      m="none"
      px="xs"
      className={classes.container}
      fluid
    >
      <Container className={classes.innerContainer}>
        <Live />
        {!selectedCategory && (
          <>
            <MotionTitle
              variants={item}
              order={1}
              className={classes.title}
              mb="xs"
            >
              Pick topic
            </MotionTitle>
            <motion.span variants={item}>
              <Text className={classes.description}>
                Train on over 1000 React, Node.JS, Javascript, CSS, HTML
                questions and answers.
              </Text>
            </motion.span>
          </>
        )}
        {selectedCategory && (
          <motion.div variants={item}>
            <Group className={classes.shareContainer}>
              <Button
                variant="light"
                size="lg"
                className={classes.button}
                onClick={() => {
                  shown && showAnswer()
                  selectCategory(null)
                  setIndex(0)
                }}
              >
                <ArrowLeftIcon size={24} />
                {
                  categories.find((category) => category.id == selectedCategory)
                    ?.value
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
          </motion.div>
        )}
        {!selectedCategory && (
          <Grid my="xs">
            {categories.map((category) => (
              <MotionCol variants={item} key={category.id} span={6}>
                <CategoryCard
                  selected={category.id == tempSelectedCategory}
                  onSelect={() => setTempSelectedCategory(Number(category.id))}
                  inactive={!category.active}
                >
                  {categoryIcons[category.name as keyof typeof categoryIcons]}
                  {category.value} ({category.count})
                </CategoryCard>
              </MotionCol>
            ))}
          </Grid>
        )}
        {selectedCategory &&
          (isLoading ? (
            <CardsLoading />
          ) : questions.length > 0 ? (
            <Cards
              questions={questions}
              onNext={() => {
                if (index === questions.length - 1) {
                  setPage(page + 1)
                  setIndex(0)
                } else {
                  setIndex(index + 1)
                }
              }}
              onPrevious={() => {
                if (index == 0) {
                  setPage(page - 1)
                  setIndex(0)
                } else {
                  setIndex(index - 1)
                }
              }}
              shown={shown}
              showAnswer={showAnswer}
              index={index}
              page={page}
              totalCount={(page - 1) * 25 + questions.length}
              hasNavigation
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
            <motion.div variants={item}>
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
            </motion.div>
          </Center>
        )}
      </Container>
    </MotionContainer>
  )
}

export default Interview
