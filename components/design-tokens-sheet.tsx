'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BrandTokens, FONT_SIZE_MAP, FONT_WEIGHT_MAP, BORDER_RADIUS_MAP, SHADOW_MAP } from '@/types/brand'
import { Copy, Check, Code2, Download } from 'lucide-react'
import { convertColor, ColorFormat } from '@/lib/color-utils'
import { SyntaxHighlighter } from '@/components/syntax-highlighter'
import JSZip from 'jszip'
import { EmojiConfetti } from '@/components/emoji-confetti'

interface DesignTokensSheetProps {
  tokens: BrandTokens
  selectedPalette?: string
  onShockedTrigger?: () => void
}

export function DesignTokensSheet({ tokens, selectedPalette = 'geist', onShockedTrigger }: DesignTokensSheetProps) {
  const [copied, setCopied] = useState(false)
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')
  const [showConfetti, setShowConfetti] = useState(false)

  const generateCSSVariables = () => {
    const primaryColor = tokens.brandColors[0]?.value || '#3b82f6'
    const secondaryColor = tokens.brandColors[1]?.value || primaryColor
    const accentColor = tokens.brandColors[2]?.value || primaryColor
    
    return `:root {
  /* Brand Colors */
  --brand-primary: ${primaryColor};
  --brand-secondary: ${secondaryColor};
  --brand-accent: ${accentColor};
  
  /* Surface Colors */
  --brand-border: ${tokens.colors.border};
  --brand-container: ${tokens.colors.containerBg};
  
  /* Theme Colors - Light Mode */
  --light-background: ${tokens.themeColors.light.background};
  --light-foreground: ${tokens.themeColors.light.foreground};
  --light-border: ${tokens.themeColors.light.border};
  --light-container: ${tokens.themeColors.light.containerBg};
  
  /* Theme Colors - Dark Mode */
  --dark-background: ${tokens.themeColors.dark.background};
  --dark-foreground: ${tokens.themeColors.dark.foreground};
  --dark-border: ${tokens.themeColors.dark.border};
  --dark-container: ${tokens.themeColors.dark.containerBg};
  
  /* Typography */
  --font-heading: ${tokens.fonts.heading};
  --font-body: ${tokens.fonts.body};
  --h1-size: ${FONT_SIZE_MAP[tokens.fonts.h1Size]};
  --h1-weight: ${FONT_WEIGHT_MAP[tokens.fonts.h1Weight]};
  --h2-size: ${FONT_SIZE_MAP[tokens.fonts.h2Size]};
  --h2-weight: ${FONT_WEIGHT_MAP[tokens.fonts.h2Weight]};
  --h3-size: ${FONT_SIZE_MAP[tokens.fonts.h3Size]};
  --h3-weight: ${FONT_WEIGHT_MAP[tokens.fonts.h3Weight]};
  --paragraph-size: ${FONT_SIZE_MAP[tokens.fonts.paragraphSize]};
  --paragraph-weight: ${FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight]};
  
  /* Material Styles - Cards */
  --card-radius: ${BORDER_RADIUS_MAP[tokens.materials.card.borderRadius]};
  --card-shadow: ${SHADOW_MAP[tokens.materials.card.shadow]};
  
  /* Material Styles - Buttons */
  --button-radius: ${BORDER_RADIUS_MAP[tokens.materials.button.borderRadius]};
  --button-shadow: ${SHADOW_MAP[tokens.materials.button.shadow]};
  
  /* Material Styles - Inputs */
  --input-radius: ${BORDER_RADIUS_MAP[tokens.materials.input.borderRadius]};
  --input-shadow: ${SHADOW_MAP[tokens.materials.input.shadow]};
  
  /* Utility Colors */
  --color-success: ${tokens.utilityColors.success};
  --color-destructive: ${tokens.utilityColors.destructive};
  --color-warning: ${tokens.utilityColors.warning};
  --color-info: ${tokens.utilityColors.info};
  --color-disabled: ${tokens.utilityColors.disabled};
}`
  }

  const generateTailwindConfig = () => {
    const colorConfig: Record<string, any> = {}

    const neutralPalette = {
      50: tokens.themeColors.light.background,
      100: tokens.themeColors.light.containerBg,
      200: tokens.themeColors.light.border,
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: tokens.themeColors.dark.border,
      800: tokens.themeColors.dark.containerBg,
      900: '#171717',
      950: tokens.themeColors.dark.background,
    }
    
    colorConfig[selectedPalette] = neutralPalette

    if (tokens.colorPalettes) {
      Object.entries(tokens.colorPalettes).forEach(([colorId, palette]) => {
        const brandColor = tokens.brandColors.find((c) => c.id === colorId)
        if (brandColor) {
          colorConfig[brandColor.name.toLowerCase().replace(/\s+/g, '-')] = palette
        }
      })
    }

    const colorConfigString = Object.entries(colorConfig)
      .map(([name, shades]) => {
        const shadesString = Object.entries(shades as Record<string, string>)
          .map(([shade, color]) => `          ${shade}: '${convertColor(color, colorFormat)}',`)
          .join('\n')
        return `        ${name}: {\n${shadesString}\n        },`
      })
      .join('\n')

    const versionComment = colorFormat === 'oklch' 
      ? '// Tailwind CSS v4 (OKLCH format)' 
      : colorFormat === 'hsla'
      ? '// Tailwind CSS v3 (HSLA format)'
      : '// Tailwind CSS v3 (HEX format)'

    const primaryColorName = tokens.brandColors[0]?.name.toLowerCase().replace(/\s+/g, '-') || 'primary'
    const buttonExamples = `
// Button Style Examples
// Primary Button: 
// className="bg-${primaryColorName}-600 hover:bg-${primaryColorName}-700 text-white rounded-\${BORDER_RADIUS_MAP[tokens.materials.button.borderRadius]} px-4 py-2"

// Soft Button: 
// className="bg-${primaryColorName}-100 dark:bg-${primaryColorName}-900 text-${primaryColorName}-700 dark:text-${primaryColorName}-300 hover:bg-${primaryColorName}-200 dark:hover:bg-${primaryColorName}-800 rounded-\${BORDER_RADIUS_MAP[tokens.materials.button.borderRadius]} px-4 py-2"`

    return `${versionComment}
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
${colorConfigString}
        // Surface colors
        border: '${convertColor(tokens.colors.border, colorFormat)}',
        container: '${convertColor(tokens.colors.containerBg, colorFormat)}',
        
        // Utility colors
        success: '${convertColor(tokens.utilityColors.success, colorFormat)}',
        destructive: '${convertColor(tokens.utilityColors.destructive, colorFormat)}',
        warning: '${convertColor(tokens.utilityColors.warning, colorFormat)}',
        info: '${convertColor(tokens.utilityColors.info, colorFormat)}',
        disabled: '${convertColor(tokens.utilityColors.disabled, colorFormat)}',
      },
      
      fontFamily: {
        heading: ['${tokens.fonts.heading}', 'sans-serif'],
        body: ['${tokens.fonts.body}', 'sans-serif'],
      },
      
      fontSize: {
        'h1': ['${FONT_SIZE_MAP[tokens.fonts.h1Size]}', { fontWeight: '${FONT_WEIGHT_MAP[tokens.fonts.h1Weight]}' }],
        'h2': ['${FONT_SIZE_MAP[tokens.fonts.h2Size]}', { fontWeight: '${FONT_WEIGHT_MAP[tokens.fonts.h2Weight]}' }],
        'h3': ['${FONT_SIZE_MAP[tokens.fonts.h3Size]}', { fontWeight: '${FONT_WEIGHT_MAP[tokens.fonts.h3Weight]}' }],
        'body': ['${FONT_SIZE_MAP[tokens.fonts.paragraphSize]}', { fontWeight: '${FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight]}' }],
      },
      
      borderRadius: {
        card: '${BORDER_RADIUS_MAP[tokens.materials.card.borderRadius]}',
        button: '${BORDER_RADIUS_MAP[tokens.materials.button.borderRadius]}',
        input: '${BORDER_RADIUS_MAP[tokens.materials.input.borderRadius]}',
      },
      
      boxShadow: {
        card: '${SHADOW_MAP[tokens.materials.card.shadow]}',
        button: '${SHADOW_MAP[tokens.materials.button.shadow]}',
        input: '${SHADOW_MAP[tokens.materials.input.shadow]}',
      },
    },
  },
}
${buttonExamples}`
  }

  const generateTailwindV4Config = () => {
    const primaryColor = tokens.brandColors[0]?.value || '#3b82f6'
    const secondaryColor = tokens.brandColors[1]?.value || primaryColor
    const accentColor = tokens.brandColors[2]?.value || primaryColor

    let colorVars = `  --color-primary: ${convertColor(primaryColor, colorFormat)};
  --color-secondary: ${convertColor(secondaryColor, colorFormat)};
  --color-accent: ${convertColor(accentColor, colorFormat)};
  
  --color-border: ${convertColor(tokens.colors.border, colorFormat)};
  --color-container: ${convertColor(tokens.colors.containerBg, colorFormat)};
  
  --color-success: ${convertColor(tokens.utilityColors.success, colorFormat)};
  --color-destructive: ${convertColor(tokens.utilityColors.destructive, colorFormat)};
  --color-warning: ${convertColor(tokens.utilityColors.warning, colorFormat)};
  --color-info: ${convertColor(tokens.utilityColors.info, colorFormat)};
  --color-disabled: ${convertColor(tokens.utilityColors.disabled, colorFormat)};`

    // Add brand color palettes
    if (tokens.colorPalettes) {
      Object.entries(tokens.colorPalettes).forEach(([colorId, palette]) => {
        const brandColor = tokens.brandColors.find((c) => c.id === colorId)
        if (brandColor) {
          const colorName = brandColor.name.toLowerCase().replace(/\s+/g, '-')
          Object.entries(palette as Record<string, string>).forEach(([shade, color]) => {
            colorVars += `\n  --color-${colorName}-${shade}: ${convertColor(color, colorFormat)};`
          })
        }
      })
    }

    return `/* Tailwind CSS v4 globals.css */
@import 'tailwindcss';

@theme inline {
${colorVars}
  
  --font-heading: '${tokens.fonts.heading}', sans-serif;
  --font-body: '${tokens.fonts.body}', sans-serif;
  
  --font-size-h1: ${FONT_SIZE_MAP[tokens.fonts.h1Size]};
  --font-weight-h1: ${FONT_WEIGHT_MAP[tokens.fonts.h1Weight]};
  --font-size-h2: ${FONT_SIZE_MAP[tokens.fonts.h2Size]};
  --font-weight-h2: ${FONT_WEIGHT_MAP[tokens.fonts.h2Weight]};
  --font-size-h3: ${FONT_SIZE_MAP[tokens.fonts.h3Size]};
  --font-weight-h3: ${FONT_WEIGHT_MAP[tokens.fonts.h3Weight]};
  --font-size-body: ${FONT_SIZE_MAP[tokens.fonts.paragraphSize]};
  --font-weight-body: ${FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight]};
  
  --radius-card: ${BORDER_RADIUS_MAP[tokens.materials.card.borderRadius]};
  --radius-button: ${BORDER_RADIUS_MAP[tokens.materials.button.borderRadius]};
  --radius-input: ${BORDER_RADIUS_MAP[tokens.materials.input.borderRadius]};
  
  --shadow-card: ${SHADOW_MAP[tokens.materials.card.shadow]};
  --shadow-button: ${SHADOW_MAP[tokens.materials.button.shadow]};
  --shadow-input: ${SHADOW_MAP[tokens.materials.input.shadow]};
}`
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const handleDownload = async () => {
    try {
      const zip = new JSZip()
      
      zip.file('tailwind.config.js', generateTailwindConfig())
      zip.file('globals.css', generateCSSVariables())
      zip.file('tailwind-v4-globals.css', generateTailwindV4Config())
      
      const blob = await zip.generateAsync({ type: 'blob' })
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'brand-tokens.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to create ZIP file:', error)
    }
  }

  const cssVariables = generateCSSVariables()
  const tailwindConfig = generateTailwindConfig()
  const tailwindV4Config = generateTailwindV4Config()

  return (
    <>
      {showConfetti && <EmojiConfetti emoji="🔥" duration={6500} count={90} />}
      
      <Sheet onOpenChange={(open) => {
        if (open) {
          setShowConfetti(true)
          onShockedTrigger?.()
          setTimeout(() => setShowConfetti(false), 6500)
        }
      }}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Code2 className="h-4 w-4" />
            Export Tokens
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto px-2">
          <SheetHeader>
            <SheetTitle>Design Tokens</SheetTitle>
            <SheetDescription>
              Export your brand tokens for use in your projects
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Download All</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleDownload} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download ZIP (v3 Config + v4 Config + CSS)
                </Button>
              </CardContent>
            </Card>

            {tokens.colorPalettes && Object.keys(tokens.colorPalettes).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Color Palettes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tokens.brandColors.map((brandColor) => {
                    const palette = tokens.colorPalettes?.[brandColor.id]
                    if (!palette) return null

                    return (
                      <div key={brandColor.id}>
                        <h4 className="text-sm font-medium mb-2 capitalize">{brandColor.name}</h4>
                        <div className="flex gap-1">
                          {Object.entries(palette).map(([shade, color]) => (
                            <div key={shade} className="flex-1 min-w-0">
                              <div
                                className="h-12 rounded"
                                style={{ backgroundColor: color }}
                              />
                              <div className="text-xs text-center mt-1 text-muted-foreground">
                                {shade}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">CSS Variables</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(cssVariables)}
                  className="h-8 gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <SyntaxHighlighter code={cssVariables} language="css" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-base">Tailwind Config</CardTitle>
                  <Select value={colorFormat} onValueChange={(value) => setColorFormat(value as ColorFormat)}>
                    <SelectTrigger className="w-[200px] h-8">
                      <SelectValue placeholder="Color format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hex">HEX (v3)</SelectItem>
                      <SelectItem value="hsla">HSLA (v3)</SelectItem>
                      <SelectItem value="oklch">OKLCH (v4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(tailwindConfig)}
                  className="h-8 gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <SyntaxHighlighter code={tailwindConfig} language="javascript" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">Tailwind v4 Config</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(tailwindV4Config)}
                  className="h-8 gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <SyntaxHighlighter code={tailwindV4Config} language="css" />
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
