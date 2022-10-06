import QuestionCard from '@components/cards/QuestionCard'
import { LoadingCard } from '@components/loading/CardsLoading'
import {
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { FilterIcon } from '@primer/octicons-react'
import { dehydrate, useQuery } from '@tanstack/react-query'
import { useOrigin } from '@utils/useOrigin'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  getCategories,
  getQuestionsByCategory,
  getTotalCount,
  queryClient,
} from 'src/api'
import { Category } from 'src/types/generated/graphql'

export async function getStaticProps() {
  await queryClient.prefetchQuery(['questionsByCategory', 1], () =>
    getQuestionsByCategory({
      category_ids: [1],
    }),
  )
  await queryClient.prefetchQuery(['categories'], () => getCategories())
  await queryClient.prefetchQuery(['totalCount'], () => getTotalCount())

  const dehydratedState = dehydrate(queryClient)
  const categories = dehydratedState.queries
    .map((query) => {
      const data = query.state?.data as any
      return data?.categories
    })
    .filter((data) => data)[0]
    .sort((a: Category) => (!a.active ? 1 : -1))

  return {
    props: {
      categories: categories ?? [],
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 28,
    lineHeight: 1.2,

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      fontSize: 40,
    },
  },
  container: {
    paddingBlock: '40px',

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      paddingBlock: '100px',
    },
  },
  headerContainer: {
    width: '100%',
  },
  popover: {
    padding: '8px',
    width: 'fit-content',
  },
}))

const Home = ({ categories }: { categories: Category[] }) => {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  const router = useRouter()

  const origin = useOrigin()

  const [page, setPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((c) => c.id),
  )
  const [index, setIndex] = useState(0)

  const { data: dataCount } = useQuery(['totalCount'], () => {
    return getTotalCount()
  })
  const { data, isLoading } = useQuery(
    ['questionsByCategory', selectedCategories, page],
    () =>
      getQuestionsByCategory({
        category_ids: selectedCategories,
        page_size: 5,
        page,
      }),
  )

  const questions = data?.questionsByCategory ?? []
  const totalCount = dataCount?.totalCount ?? 0

  return (
    <Container className={classes.container} fluid>
      <NextSeo
        title="Interviewor | Questions"
        description={`Train & collaborate on over ${totalCount} web development, theory-based questions and answers.`}
        canonical="https://www.interviewor.com/questions"
        openGraph={{
          url: 'https://www.interviewor.com/questions',
          title: 'Interviewor | Tech interviews made easy',
          description: `Train & collaborate on over ${totalCount} web development theory-based questions and answers.`,
          images: [
            {
              url: 'https://www.interviewor.com/assets/images/og.png',
              alt: 'Tech interviews made easy | OG image',
              type: 'image/jpeg',
            },
          ],
          site_name: 'Interviewor',
        }}
        twitter={{
          handle: '@interviewor',
          site: '@interviewor',
          cardType: 'summary_large_image',
        }}
      />
      <Container px={0}>
        <Stack>
          <Group position="apart" className={classes.headerContainer}>
            <Stack spacing={5}>
              <Title order={1} className={classes.title}>
                Questions
              </Title>
              <Text>found {totalCount} questions</Text>
            </Stack>
            <Button
              variant="light"
              size="lg"
              // className={classes.button}
              // onClick={() => {}}
            >
              <FilterIcon size={20} />
              Filters
            </Button>
          </Group>
        </Stack>
        <Stack mt={32}>
          {!isLoading &&
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                title={question.text}
                answer={question.answer}
                hideTimer
                shown
              />
            ))}
          {isLoading &&
            [...Array(5)].map((_, i) => <LoadingCard key={i} index={0} />)}
        </Stack>
        <Center>
          <Pagination
            mt={32}
            total={Math.floor(totalCount / 5)}
            size="sm"
            onChange={setPage}
            styles={(theme) => ({
              item: {
                color: theme.colors.gray[5],
                borderColor: 'transparent',
                backgroundColor: theme.colors.blue[0],
              },
            })}
          />
        </Center>
      </Container>
    </Container>
  )
}

export default Home