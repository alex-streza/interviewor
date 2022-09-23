import TestimonialCard from '@components/cards/TestimonialCard'
import { Carousel } from '@mantine/carousel'
import { Group, Button } from '@mantine/core'
import { MarkGithubIcon } from '@primer/octicons-react'
import React, { useRef } from 'react'
import Section from './Section'
import Autoplay from 'embla-carousel-autoplay'
import TwitterIcon from '@components/icons/twitter.svg'

const Testimonials = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <Section
      id="testimonials"
      title="Testimonials"
      subtitle="Join the community"
      fullWidth
    >
      <Group mb="sm" px="xs">
        <a
          href="https://github.com/alex-streza/interviewor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="md" variant="light">
            <MarkGithubIcon size={24} />
            GitHub
          </Button>
        </a>
        <a
          href="https://twitter.com/alex_streza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="md" variant="light">
            <TwitterIcon />
            Twitter
          </Button>
        </a>
      </Group>
      <Carousel
        slideSize="300px"
        slideGap="sm"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        withControls={false}
        align="start"
        px="sm"
        loop
      >
        <Carousel.Slide>
          <TestimonialCard
            name="Betty Blue"
            avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
            tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
            username="@betty_xyz"
            tweet="Interviewor is such a great idea! It makes theory based interviews so easy it’s unbelievable."
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <TestimonialCard
            name="Jim Halpert"
            avatar="https://avatars.githubusercontent.com/u/1143320?v=5"
            tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
            username="@jim_office"
            tweet="This is amazing! I was able to get a job at Google with the help of this app. Thank you so much!"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <TestimonialCard
            name="Jon Snow"
            avatar="https://avatars.githubusercontent.com/u/1243320?v=4"
            tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
            username="@jon_got"
            tweet="Losing the love of my life to unbridled and ilogical madness spree led me to tech. Interviewor stood by my side when I needed a job."
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <TestimonialCard
            name="Saul Goodman"
            avatar="https://avatars.githubusercontent.com/u/143320?v=4"
            tweet_url="https://twitter.com/JohnDoe/status/1361234567890"
            username="@real_goodman"
            tweet="@interviewor being completely free is simply marvelous. Love what you’re building @alex_streza."
          />
        </Carousel.Slide>
      </Carousel>
    </Section>
  )
}

export default Testimonials
