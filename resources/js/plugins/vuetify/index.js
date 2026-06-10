import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#cfa60d', 
          black: '#000000',
          white: '#ffffff',
          gray: '#dbdbdb',
        }
      },
    }
  },
});

// Export CSS variables for the light theme so theme colors are available globally
if (typeof document !== 'undefined') {
  const colors = {
    primary: '#cfa60d',
    black: '#000000',
    white: '#ffffff',
    gray: '#dbdbdb',
  }
  const root = document.documentElement
  Object.entries(colors).forEach(([name, value]) => {
    root.style.setProperty(`--v-theme-${name}`, value)
    root.style.setProperty(`--${name}`, value)
  })
}

export default vuetify;