import CategoryCard from '@components/cards/CategoryCard'
import QuestionCard from '@components/cards/QuestionCard'
import { categoryIcons } from '@components/icons/categoryIcons'
import { LoadingCard } from '@components/loading/CardsLoading'
import {
  Button,
  Center,
  Col,
  Container,
  createStyles,
  Drawer,
  Grid,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { FilterIcon, XIcon } from '@primer/octicons-react'
import { dehydrate, useQuery } from '@tanstack/react-query'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import {
  getCategories,
  getQuestionsByCategory,
  getTotalCount,
  queryClient,
} from 'src/api'
import { Category } from 'src/types/generated/graphql'

export async function getServerSideProps() {
  await queryClient.prefetchQuery(['questionsByCategory'], () =>
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
  drawer: {
    '& .mantine-Drawer-header': {
      display: 'none',
    },
  },
  filterButton: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
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
  closeButton: {
    color: theme.colors.gray[0],
    padding: '0px',
  },
}))

const Home = ({ categories }: { categories: Category[] }) => {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)

  const [page, setPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((c) => c.id),
  )
  const { data: dataCount } = useQuery(
    ['totalCount', selectedCategories],
    () => {
      return getTotalCount({ category_ids: selectedCategories })
    },
  )
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
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        className={classes.drawer}
        size="xl"
      >
        <Group position="apart" mb={32}>
          <Title order={2}>Filters</Title>
          <Button
            variant="subtle"
            onClick={() => setOpened(false)}
            className={classes.closeButton}
          >
            <XIcon size={40} />
          </Button>
        </Group>
        <Grid my="xs">
          {categories.map((category) => (
            <Col key={category.id} span={6}>
              <CategoryCard
                selected={selectedCategories.includes(category.id)}
                onSelect={() => {
                  setSelectedCategories(
                    selectedCategories.includes(category.id)
                      ? selectedCategories.filter((c) => c !== category.id)
                      : [...selectedCategories, category.id],
                  )

                  setOpened(false)
                }}
                inactive={!category.active}
              >
                {categoryIcons[category.name as keyof typeof categoryIcons]}
                {category.value} ({category.count})
              </CategoryCard>
            </Col>
          ))}
        </Grid>
      </Drawer>
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
              onClick={() => setOpened(true)}
              className={classes.filterButton}
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
                title={
                  <Group align="center" spacing={12}>
                    {
                      categoryIcons[
                        categories.filter(
                          (c) => c.id === question.category_id,
                        )[0]?.name as keyof typeof categoryIcons
                      ]
                    }
                    <span
                      style={{
                        maxWidth: 'calc(100% - 50px)',
                      }}
                    >
                      {question.text}
                    </span>
                  </Group>
                }
                answer={question.answer}
                canHideAnswer={false}
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
