'use client'

import { DesignTokensSheet } from '@/components/design-tokens-sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { BrandTokens, BrandColor, BorderRadius, FontSize, FontWeight, Shadow, TextTransform, LetterSpacing, LineHeight } from '@/types/brand'
import { AnimatedEyes } from '@/components/animated-eyes'
import { MobileControlsMenu } from '@/components/mobile-controls-menu'
import { Github } from 'lucide-react'

interface AppNavbarProps {
  tokens: BrandTokens
  eyeAnimationTrigger?: number
  eyeDirection?: 'open' | 'close'
  crossEyedTrigger?: number
  shockedTrigger?: number
  onBrandColorsChange?: (colors: BrandColor[]) => void
  onColorChange?: (colorKey: string, value: string) => void
  onThemeColorChange?: (mode: 'light' | 'dark', colorKey: 'background' | 'foreground' | 'border' | 'containerBg', value: string) => void
  onFontChange?: (fontType: 'heading' | 'body', fontFamily: string) => void
  onBorderRadiusChange?: (radius: BorderRadius) => void
  onTypographyChange?: (element: 'h1' | 'h2' | 'h3' | 'paragraph', property: 'size' | 'weight' | 'transform' | 'spacing' | 'lineHeight', value: FontSize | FontWeight | TextTransform | LetterSpacing | LineHeight) => void
  onMaterialChange?: (element: 'card' | 'button' | 'input', property: 'borderRadius' | 'shadow', value: BorderRadius | Shadow) => void
  onUtilityColorChange?: (colorKey: 'success' | 'destructive' | 'warning' | 'info' | 'disabled', value: string) => void
  onPaletteChange?: (paletteName: string) => void
  onRandomize?: () => void
  onAccordionChange?: (direction: 'open' | 'close') => void
  onCrossEyedTrigger?: () => void
  onShockedTrigger?: () => void
}

export function AppNavbar({ 
  tokens, 
  eyeAnimationTrigger = 0, 
  eyeDirection, 
  crossEyedTrigger = 0,
  shockedTrigger = 0,
  onBrandColorsChange,
  onColorChange,
  onThemeColorChange,
  onFontChange,
  onBorderRadiusChange,
  onTypographyChange,
  onMaterialChange,
  onUtilityColorChange,
  onPaletteChange,
  onRandomize,
  onAccordionChange,
  onCrossEyedTrigger,
  onShockedTrigger
}: AppNavbarProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {onBrandColorsChange && onColorChange && onThemeColorChange && onFontChange && 
           onBorderRadiusChange && onTypographyChange && onMaterialChange && onUtilityColorChange && (
            <MobileControlsMenu
              tokens={tokens}
              onBrandColorsChange={onBrandColorsChange}
              onColorChange={onColorChange}
              onThemeColorChange={onThemeColorChange}
              onFontChange={onFontChange}
              onBorderRadiusChange={onBorderRadiusChange}
              onTypographyChange={onTypographyChange}
              onMaterialChange={onMaterialChange}
              onUtilityColorChange={onUtilityColorChange}
              onPaletteChange={onPaletteChange}
              onRandomize={onRandomize}
              onAccordionChange={onAccordionChange}
              onCrossEyedTrigger={onCrossEyedTrigger}
              onShockedTrigger={onShockedTrigger}
            />
          )}
          <AnimatedEyes 
            animationTrigger={eyeAnimationTrigger} 
            direction={eyeDirection}
            crossEyedTrigger={crossEyedTrigger}
            shockedTrigger={shockedTrigger}
          />
          <h1 className="font-mono text-xs font-light uppercase tracking-tight text-foreground sm:text-base">
            Tailwind Theme Previewer
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <DesignTokensSheet tokens={tokens} selectedPalette={tokens.selectedPalette} onShockedTrigger={onShockedTrigger} />
          <a
            href="https://github.com/WebRenew/Tailwind-Theme-Previewer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
