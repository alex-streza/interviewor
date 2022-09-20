import { Box, createStyles } from '@mantine/core'
import { ReactNode } from 'react'

interface CategoryCardProps {
  children: ReactNode
  selected: boolean
  onSelect: () => void
}

const useStyles = createStyles(
  (theme, { selected }: { selected: boolean }) => ({
    container: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      justifyContent: 'start',
      fontWeight: 'bold',
      backgroundColor: !selected ? theme.colors.white[0] : theme.colors.blue[0],
      border: '2px solid',
      borderColor: !selected ? theme.colors.blue[2] : theme.colors.blue[4],
      color: !selected ? theme.colors.gray[1] : theme.colors.blue[4],
      borderRadius: '12px',
      padding: '12px',
      cursor: 'pointer',
      height: '60px',
      minWidth: '60px',
      boxShadow: `4px 4px 12px 0px hsla(189, 75%, 75%, 0.25)`,
    },
  }),
)

const CategoryCard = ({ children, selected, onSelect }: CategoryCardProps) => {
  const { classes } = useStyles({ selected })

  return (
    <Box onClick={onSelect} className={classes.container}>
      {children}
    </Box>
  )
}

export default CategoryCard
