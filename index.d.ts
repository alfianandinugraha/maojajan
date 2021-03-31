import React from 'react'
import {} from 'styled-components'

interface ThemeProps {
  color: {
    primary: string
    secondary: string
    danger: string
    success: string
    dark: string
    gray: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps {}
}

declare module 'Types' {
  export type { ThemeProps }
}
