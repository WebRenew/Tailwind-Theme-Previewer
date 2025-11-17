'use client'

import { useState, useCallback, useEffect } from 'react'
import { BrandTokens, BrandColors, BorderRadius, BrandColor, FontSize, FontWeight, Shadow, TextTransform, LetterSpacing, LineHeight, POPULAR_GOOGLE_FONTS, SANS_SERIF_FONTS, SERIF_FONTS } from '@/types/brand'
import { generateColorScale, parseTailwindColor, TAILWIND_COLORS } from '@/lib/color-utils'
import { TailwindColorName } from '@/lib/tailwind-colors'
import { applyPaletteToTheme, TailwindPaletteName } from '@/lib/tailwind-palettes'
import { generateThemeName } from '@/lib/theme-name-generator'

export function useBrandTokens(initialTokens: BrandTokens) {
  const [tokens, setTokens] = useState<BrandTokens>(initialTokens)

  useEffect(() => {
    const palettes: Record<string, Record<string, string>> = {}

    tokens.brandColors.forEach((brandColor) => {
      if (brandColor.isTailwindColor) {
        const fullPalette = TAILWIND_COLORS[brandColor.value as keyof typeof TAILWIND_COLORS]
        palettes[brandColor.id] = fullPalette
      } else {
        // For custom colors, generate a scale with the color as 500
        palettes[brandColor.id] = generateColorScale(brandColor.value)
      }
    })

    setTokens((prev) => ({ ...prev, colorPalettes: palettes }))
  }, [tokens.brandColors])

  const updateBrandName = useCallback((brandName: string) => {
    setTokens((prev) => ({ ...prev, brandName }))
  }, [])

  const updateLogo = useCallback((logo: string | null) => {
    setTokens((prev) => ({ ...prev, logo }))
  }, [])

  const updateColors = useCallback((colors: Partial<BrandColors>) => {
    setTokens((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }))
  }, [])

  const updateFonts = useCallback((fontType: 'heading' | 'body', fontFamily: string) => {
    setTokens((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontType]: fontFamily,
      },
    }))
  }, [])

  const updateBorderStyle = useCallback((borderStyle: string) => {
    setTokens((prev) => ({ ...prev, borderStyle }))
  }, [])

  const updateBrandColors = useCallback((brandColors: BrandColor[]) => {
    setTokens((prev) => ({ ...prev, brandColors }))
  }, [])

  const updateThemeColors = useCallback((mode: 'light' | 'dark', colorKey: 'background' | 'foreground' | 'border' | 'containerBg', value: string) => {
    setTokens((prev) => ({
      ...prev,
      themeColors: {
        ...prev.themeColors,
        [mode]: {
          ...prev.themeColors[mode],
          [colorKey]: value,
        },
      },
    }))
  }, [])

  const updateBorderRadius = useCallback((borderRadius: BorderRadius) => {
    setTokens((prev) => ({ ...prev, borderRadius }))
  }, [])

  const updateTypography = useCallback((element: 'h1' | 'h2' | 'h3' | 'paragraph', property: 'size' | 'weight' | 'transform' | 'spacing' | 'lineHeight', value: FontSize | FontWeight | TextTransform | LetterSpacing | LineHeight) => {
    setTokens((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [`${element}${property.charAt(0).toUpperCase() + property.slice(1)}`]: value,
      },
    }))
  }, [])

  const updateMaterial = useCallback((element: 'card' | 'button' | 'input', property: 'borderRadius' | 'shadow', value: BorderRadius | Shadow) => {
    setTokens((prev) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [element]: {
          ...prev.materials[element],
          [property]: value,
        },
      },
    }))
  }, [])

  const updateUtilityColor = useCallback((colorKey: 'success' | 'destructive' | 'warning' | 'info' | 'disabled', value: string) => {
    setTokens((prev) => ({
      ...prev,
      utilityColors: {
        ...prev.utilityColors,
        [colorKey]: value,
      },
    }))
  }, [])

  const updateSelectedPalette = useCallback((paletteName: string) => {
    setTokens((prev) => ({
      ...prev,
      selectedPalette: paletteName,
    }))
  }, [])

  const randomize = useCallback(() => {
    const colorNames = Object.keys(TAILWIND_COLORS) as TailwindColorName[]
    const borderRadiusOptions: BorderRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full']
    const cardBorderRadiusOptions: BorderRadius[] = ['none', 'sm', 'md', 'lg', 'xl']
    const shadowOptions: Shadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl']
    const fontSizeOptions: FontSize[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
    const h1FontSizeOptions: FontSize[] = ['3xl', '4xl', '5xl', '6xl', '7xl']
    const fontWeightOptions: FontWeight[] = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    const textTransformOptions: TextTransform[] = ['none', 'uppercase', 'capitalize']
    const letterSpacingOptions: LetterSpacing[] = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
    const lineHeightOptions: LineHeight[] = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose']
    const h1LineHeightOptions: LineHeight[] = ['none', 'tight']
    const neutralPaletteOptions: TailwindPaletteName[] = ['zinc', 'neutral', 'gray', 'slate', 'geist']

    // Random utility function
    const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    // Randomize 1-3 brand colors
    const numColors = Math.floor(Math.random() * 3) + 1
    const selectedColors = new Set<TailwindColorName>()
    while (selectedColors.size < numColors) {
      selectedColors.add(random(colorNames))
    }

    const newBrandColors: BrandColor[] = Array.from(selectedColors).map((colorName, index) => ({
      id: `brand-${index + 1}`,
      name: colorName.charAt(0).toUpperCase() + colorName.slice(1),
      value: colorName,
      isTailwindColor: true,
      palette: TAILWIND_COLORS[colorName],
    }))

    const primaryColorName = Array.from(selectedColors)[0] as TailwindColorName
    const newThemeName = generateThemeName(primaryColorName)

    const useSerif = Math.random() > 0.5
    const fontCategory = useSerif ? SERIF_FONTS : SANS_SERIF_FONTS
    const newHeadingFont = random(fontCategory)
    const newBodyFont = random(fontCategory)

    // Randomize utility colors (pick random colors from Tailwind)
    const utilityColorNames = ['green', 'red', 'amber', 'blue', 'gray'] as TailwindColorName[]
    const newUtilityColors = {
      success: TAILWIND_COLORS[random(utilityColorNames)][500],
      destructive: TAILWIND_COLORS[random(utilityColorNames)][500],
      warning: TAILWIND_COLORS[random(utilityColorNames)][500],
      info: TAILWIND_COLORS[random(utilityColorNames)][500],
      disabled: TAILWIND_COLORS[random(utilityColorNames)][400],
    }

    const newPalette = random(neutralPaletteOptions)
    const newThemeColors = applyPaletteToTheme(newPalette)

    setTokens((prev) => ({
      ...prev,
      brandColors: newBrandColors,
      themeName: newThemeName, // Set the generated theme name
      selectedPalette: newPalette,
      themeColors: newThemeColors,
      fonts: {
        ...prev.fonts,
        heading: newHeadingFont,
        body: newBodyFont,
        h1Size: random(h1FontSizeOptions),
        h1Weight: random(fontWeightOptions),
        h1Transform: random(textTransformOptions),
        h1Spacing: random(letterSpacingOptions),
        h1LineHeight: random(h1LineHeightOptions),
        h2Size: random(fontSizeOptions.slice(4, 9)),
        h2Weight: random(fontWeightOptions),
        h2Transform: random(textTransformOptions),
        h2Spacing: random(letterSpacingOptions),
        h2LineHeight: random(lineHeightOptions),
        h3Size: random(fontSizeOptions.slice(3, 7)),
        h3Weight: random(fontWeightOptions),
        h3Transform: random(textTransformOptions),
        h3Spacing: random(letterSpacingOptions),
        h3LineHeight: random(lineHeightOptions),
        paragraphSize: random(fontSizeOptions.slice(0, 5)),
        paragraphWeight: random(fontWeightOptions.slice(0, 5)),
        paragraphLineHeight: random(lineHeightOptions.slice(2)),
      },
      materials: {
        card: {
          borderRadius: random(cardBorderRadiusOptions),
          shadow: random(shadowOptions),
        },
        button: {
          borderRadius: random(borderRadiusOptions),
          shadow: random(shadowOptions),
        },
        input: {
          borderRadius: random(borderRadiusOptions),
          shadow: random(shadowOptions),
        },
      },
      utilityColors: newUtilityColors,
    }))
  }, [])

  return {
    tokens,
    updateBrandName,
    updateLogo,
    updateColors,
    updateThemeColors,
    updateFonts,
    updateBorderRadius,
    updateBrandColors,
    updateTypography,
    updateMaterial,
    updateUtilityColor,
    updateSelectedPalette,
    randomize, // Export randomize function
  }
}
