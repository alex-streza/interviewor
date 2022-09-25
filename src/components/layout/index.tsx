import { AppShell, Global, useMantineTheme } from '@mantine/core'
import PlausibleProvider from 'next-plausible'
import Script from 'next/script'
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
    <PlausibleProvider domain="interviewor.com">
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

          '@keyframes shimmer': {
            '100%': {
              transform: 'translateX(100%)',
            },
          },

          html: {
            scrollBehavior: 'smooth',
          },

          '.skeleton': {
            display: 'inline-block',
            position: 'relative',
            overflow: 'hidden',

            '&::after': {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              transform: 'translateX(-100%)',

              background:
                'linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)',
              animation: 'shimmer 2s infinite',
              content: "''",
            },
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
      <Script async data-api="/_hive" src="/bee.js" />
    </PlausibleProvider>
  )
}

export default Layout
