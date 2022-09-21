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
import { dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import {
  getCategories,
  getNewRoomId,
  getQuestionsByCategory,
  pageSize,
  queryClient,
} from 'src/api'
import { RoomProvider } from 'src/api/liveblock.config'
import { Maybe } from 'type-graphql'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  await queryClient.prefetchQuery(['questionsByCategory'], () =>
    getQuestionsByCategory({
      category_id: 1,
    }),
  )
  await queryClient.prefetchQuery(['categories'], () => getCategories())
  await queryClient.prefetchQuery(['roomId'], () => getNewRoomId())

  const dehydratedState = dehydrate(queryClient)
  const roomId = dehydratedState.queries[2]?.state?.data?.roomId
  const options = query.roomId
    ? {}
    : {
        redirect: {
          permanent: false,
          destination: '?roomId=' + roomId,
        },
      }

  return {
    props: {
      dehydratedState,
    },
    ...options,
  }
}

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

  const [selectedCategory, setSelectedCategory] = useState<Maybe<number>>(null)
  const [tempSelectedCategory, setTempSelectedCategory] =
    useState<Maybe<number>>(null)
  const [page, setPage] = useState(1)
  const indexRef = useRef(0)

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

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

  const categories = categoriesData?.categories ?? []
  const questions = (data?.questionsByCategory ?? []).sort(
    () => 0.5 - Math.random(),
  )

  return (
    <Container m="none" px="xs" className={classes.container} fluid>
      <Container className={classes.innerContainer}>
        <RoomProvider id={router.query.roomId as string} initialPresence={{}}>
          <Live />
        </RoomProvider>
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
                setSelectedCategory(null)
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
                indexRef.current =
                  indexRef.current + (direction === 'next' ? 1 : -1)
                if (indexRef.current == pageSize - 1) {
                  setPage(page + 1)
                  indexRef.current = 0
                } else if (indexRef.current == -1) {
                  setPage(page - 1)
                  indexRef.current = 0
                }
              }}
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
            <Button
              disabled={!tempSelectedCategory}
              size="lg"
              onClick={() => {
                setSelectedCategory(tempSelectedCategory)
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
