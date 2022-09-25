import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return config
    },
  },
  viewportWidth: 1280,
  viewportHeight: 640,
  chromeWebSecurity: false,
  video: false,

  component: {
    specPattern: 'src/tests/**/*.spec.tsx',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
