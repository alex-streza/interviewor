import { Title } from '@mantine/core'
import { motion } from 'framer-motion'

export const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}

export const item = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

export const MotionTitle = motion(Title)
