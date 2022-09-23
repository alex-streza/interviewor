import TestimonialCard from '@components/cards/TestimonialCard'
import TwitterIcon from '@components/icons/twitter.svg'
import { Carousel } from '@mantine/carousel'
import { Button, Group } from '@mantine/core'
import { MarkGithubIcon } from '@primer/octicons-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Section from './Section'

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
        <motion.a
          variants={item}
          href="https://github.com/alex-streza/interviewor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="md" variant="light">
            <MarkGithubIcon size={24} />
            GitHub
          </Button>
        </motion.a>
        <motion.a
          variants={item}
          href="https://twitter.com/alex_streza"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="md" variant="light">
            <TwitterIcon />
            Twitter
          </Button>
        </motion.a>
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
