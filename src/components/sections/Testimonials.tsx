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
            name="Your Name"
            tweet_url="https://twitter.com/alex_streza"
            username="@your_handle"
            tweet="Interviews are simple now with interviewor."
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <TestimonialCard
            name="Your Name"
            tweet_url="https://twitter.com/alex_streza"
            username="@your_handle"
            tweet="Interviewor is cool tbh."
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <TestimonialCard
            name="Your Name"
            tweet_url="https://twitter.com/alex_streza"
            username="@your_handle"
            tweet="Tech concepts you can learn in seconds."
          />
        </Carousel.Slide>
      </Carousel>
    </Section>
  )
}

export default Testimonials
