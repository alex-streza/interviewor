import Cards from '@components/cards/Cards'
import CategoryCard from '@components/cards/CategoryCard'
import FeatureCard from '@components/cards/FeatureCard'
import { categoryIcons } from '@components/icons/categoryIcons'
import CardsLoading from '@components/loading/CardsLoading'
import GetStarted from '@components/sections/GetStarted'
import Hero from '@components/sections/Hero'
import Section from '@components/sections/Section'
import Testimonials from '@components/sections/Testimonials'
import { Carousel } from '@mantine/carousel'
import {
  Button,
  Container,
  CopyButton,
  createStyles,
  Group,
  Popover,
  Text,
  useMantineTheme,
} from '@mantine/core'
import {
  BookIcon,
  CommandPaletteIcon,
  ShareAndroidIcon,
} from '@primer/octicons-react'
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
      category_id: 1,
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

const useStyles = createStyles(() => ({
  container: {
    padding: 0,
    margin: 'none',
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

  const [selectedCategory, setSelectedCategory] = useState(1)
  const [index, setIndex] = useState(0)

  const { data: dataCount } = useQuery(['totalCount'], () => {
    return getTotalCount()
  })
  const { data, isLoading } = useQuery(
    ['questionsByCategory', selectedCategory + ''],
    () =>
      getQuestionsByCategory({
        category_id: selectedCategory,
      }),
  )

  const questions = data?.questionsByCategory ?? []
  const totalCount = dataCount?.totalCount

  return (
    <Container className={classes.container} fluid>
      <NextSeo
        title="Interviewor | Tech interviews made easy"
        description={`Train & collaborate on over ${totalCount} web development, theory-based questions and answers.`}
        canonical="https://www.interviewor.com/"
        openGraph={{
          url: 'https://www.interviewor.com/',
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
      <Hero questions={questions} totalCount={totalCount} />
      <Section
        id="feature1"
        title={
          <>
            Single app, <br />
            Simple workflow
          </>
        }
        subtitle="For interviewees & interviewers alike"
        description="No need for multiple apps and years of video editing knowledge, content within clicks."
        fullWidth
      >
        <Carousel
          slideSize="248px"
          slideGap="sm"
          withControls={false}
          mt="sm"
          px="xs"
          align="start"
        >
          <Carousel.Slide>
            <FeatureCard
              title="Pick a topic & difficulty"
              icon={<BookIcon size={40} fill={theme.colors.blue[4]} />}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <FeatureCard
              title="Go through questions and answer"
              icon={
                <CommandPaletteIcon size={40} fill={theme.colors.blue[4]} />
              }
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <FeatureCard
              title="Share it with your interviewer"
              icon={<ShareAndroidIcon size={40} fill={theme.colors.blue[4]} />}
              hideSeparator
            />
          </Carousel.Slide>
        </Carousel>
      </Section>
      <Section
        id="feature2"
        title={`Over ${totalCount} questions`}
        subtitle="Never run out of questions"
        description={`Train on over ${totalCount} tech questions and answers.`}
      >
        {/* <Text mt={8}>Pick category:</Text> */}
        <Group mt="xs" mb="sm">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              selected={category.id == selectedCategory}
              onSelect={() => {
                setSelectedCategory(Number(category.id))
                setIndex(0)
              }}
              inactive={!category.active}
            >
              {categoryIcons[category.name as keyof typeof categoryIcons]}
            </CategoryCard>
          ))}
        </Group>
        {isLoading ? (
          <CardsLoading />
        ) : (
          <Cards
            questions={questions}
            index={index}
            onNext={() => setIndex(index + 1)}
            onPrevious={() => setIndex(index - 1)}
            hasNavigation
          />
        )}
      </Section>
      <Section
        id="feature3"
        title="Take your coding interviews to a new level"
        subtitle="Interviews are cool now"
        description="Share link with your interviewer and start explaining concepts you know in realtime & collaboratively."
      >
        <Group mt="xs">
          <CopyButton value={origin + router.asPath}>
            {({ copy }) => (
              <Popover position="bottom" withArrow onOpen={copy}>
                <Popover.Target>
                  <Button size="md" mb="xs" onClick={copy}>
                    <ShareAndroidIcon size={24} />
                    Share interview
                  </Button>
                </Popover.Target>
                <Popover.Dropdown className={classes.popover}>
                  <Text size="sm">Copied</Text>
                </Popover.Dropdown>
              </Popover>
            )}
          </CopyButton>
        </Group>
        {isLoading ? (
          <CardsLoading />
        ) : (
          <Cards
            questions={questions}
            index={index}
            onNext={() => setIndex(index + 1)}
            onPrevious={() => setIndex(index - 1)}
            hasNavigation
          />
        )}
      </Section>
      <Testimonials />
      <GetStarted />
    </Container>
  )
}

export default Home
