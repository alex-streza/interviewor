import { AppShell, Global, useMantineTheme } from '@mantine/core'
import NextNProgress from 'nextjs-progressbar'
import { ReactNode } from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useMantineTheme()

  return (
    <>
      <NextNProgress color="#48CAE4" startPosition={0.3} height={4} />
      <Global
        styles={(theme) => ({
          '.mantine-Button-label': {
            display: 'inline-flex',
            gap: '8px',
            alignItems: 'center',
          },

          '::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '::-webkit-scrollbar-track': {
            background: theme.colors.blue[1],
          },
          '::-webkit-scrollbar-thumb': {
            background: theme.colors.blue[3],
          },

          '::selection': {
            background: theme.colors.blue[3],
            color: theme.colors.white[0],
          },
        })}
      />
      <AppShell
        className="app-shell"
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.gray[1]
                : theme.colors.white[0],
            paddingInline: '0',
            marginInline: '0',
            paddingTop: '70px',
          },
        }}
        footer={<Footer />}
        header={<Navigation />}
      >
        {children}
      </AppShell>
    </>
  )
}

export default Layout
