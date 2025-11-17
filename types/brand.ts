export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type TextTransform = 'none' | 'uppercase' | 'capitalize'
export type LetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
export type LineHeight = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

export interface BrandColor {
  id: string
  name: string
  value: string // Either a hex color or a Tailwind color name like 'blue' (no shade)
  isTailwindColor: boolean
}

export interface BrandColors {
  border: string
  containerBg: string
}

export interface ThemeColors {
  light: {
    background: string
    foreground: string
    border: string
    containerBg: string
  }
  dark: {
    background: string
    foreground: string
    border: string
    containerBg: string
  }
}

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface BrandFonts {
  heading: string
  body: string
  h1Size: FontSize
  h1Weight: FontWeight
  h1Transform: TextTransform
  h1Spacing: LetterSpacing
  h1LineHeight: LineHeight
  h2Size: FontSize
  h2Weight: FontWeight
  h2Transform: TextTransform
  h2Spacing: LetterSpacing
  h2LineHeight: LineHeight
  h3Size: FontSize
  h3Weight: FontWeight
  h3Transform: TextTransform
  h3Spacing: LetterSpacing
  h3LineHeight: LineHeight
  paragraphSize: FontSize
  paragraphWeight: FontWeight
  paragraphLineHeight: LineHeight
}

export interface MaterialStyles {
  card: {
    borderRadius: BorderRadius
    shadow: Shadow
  }
  button: {
    borderRadius: BorderRadius
    shadow: Shadow
  }
  input: {
    borderRadius: BorderRadius
    shadow: Shadow
  }
}

export interface UtilityColors {
  success: string
  destructive: string
  warning: string
  info: string
  disabled: string
}

export interface BrandTokens {
  brandName: string
  logo: string | null
  brandColors: BrandColor[]
  colors: BrandColors
  themeColors: ThemeColors
  fonts: BrandFonts
  borderRadius: BorderRadius
  materials: MaterialStyles
  utilityColors: UtilityColors // Added utility colors to brand tokens
  selectedPalette?: string
  colorPalettes?: Record<string, Record<string, string>>
  themeName?: string // Added themeName field to store generated theme names
}

export const POPULAR_GOOGLE_FONTS = [
  'Geist',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Oswald',
  'Source Sans Pro',
  'Nunito',
  'Ubuntu',
  'PT Sans',
  'Work Sans',
  'Rubik',
  'DM Sans',
  'Space Grotesk',
  'Manrope',
]

export const SANS_SERIF_FONTS = [
  'Geist',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Oswald',
  'Source Sans Pro',
  'Nunito',
  'Ubuntu',
  'PT Sans',
  'Work Sans',
  'Rubik',
  'DM Sans',
  'Space Grotesk',
  'Manrope',
]

export const SERIF_FONTS = [
  'Playfair Display',
  'Merriweather',
  'Lora',
  'PT Serif',
  'Crimson Text',
  'EB Garamond',
]

export const DEFAULT_BRAND_TOKENS: BrandTokens = {
  brandName: 'Brand Board',
  logo: null,
  brandColors: [
    {
      id: 'primary-color',
      name: 'Blue',
      value: 'blue',
      isTailwindColor: true,
    }
  ],
  colors: {
    border: '#27272a',
    containerBg: '#18181b',
  },
  themeColors: {
    light: {
      background: '#ffffff',
      foreground: '#000000',
      border: '#e5e5e5',
      containerBg: '#ffffff',
    },
    dark: {
      background: '#000000',
      foreground: '#ffffff',
      border: '#262626',
      containerBg: '#000000',
    },
  },
  fonts: {
    heading: 'Geist',
    body: 'Geist',
    h1Size: '5xl',
    h1Weight: '700',
    h1Transform: 'none',
    h1Spacing: 'normal',
    h1LineHeight: 'tight',
    h2Size: '2xl',
    h2Weight: '600',
    h2Transform: 'none',
    h2Spacing: 'normal',
    h2LineHeight: 'snug',
    h3Size: 'lg',
    h3Weight: '600',
    h3Transform: 'none',
    h3Spacing: 'normal',
    h3LineHeight: 'normal',
    paragraphSize: 'base',
    paragraphWeight: '400',
    paragraphLineHeight: 'relaxed',
  },
  borderRadius: 'md',
  materials: {
    card: {
      borderRadius: 'lg',
      shadow: 'md',
    },
    button: {
      borderRadius: 'md',
      shadow: 'sm',
    },
    input: {
      borderRadius: 'md',
      shadow: 'none',
    },
  },
  utilityColors: {
    success: '#22c55e',
    destructive: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    disabled: '#9ca3af',
  },
  selectedPalette: 'geist',
  themeName: 'Midnight Fluorescent', // Added default theme name
}

export const BORDER_RADIUS_MAP: Record<BorderRadius, string> = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
}

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

export const FONT_WEIGHT_MAP: Record<FontWeight, string> = {
  '100': '100',
  '200': '200',
  '300': '300',
  '400': '400',
  '500': '500',
  '600': '600',
  '700': '700',
  '800': '800',
  '900': '900',
}

export const SHADOW_MAP: Record<Shadow, string> = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}

export const TEXT_TRANSFORM_MAP: Record<TextTransform, string> = {
  none: 'none',
  uppercase: 'uppercase',
  capitalize: 'capitalize',
}

export const LETTER_SPACING_MAP: Record<LetterSpacing, string> = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const LINE_HEIGHT_MAP: Record<LineHeight, string> = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}
