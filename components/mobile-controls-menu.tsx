'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BrandControlsPanel } from '@/components/brand-controls-panel'
import { DesignTokensSheet } from '@/components/design-tokens-sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { BrandTokens, BrandColor, BorderRadius, FontSize, FontWeight, Shadow, TextTransform, LetterSpacing, LineHeight } from '@/types/brand'

interface MobileControlsMenuProps {
  tokens: BrandTokens
  onBrandColorsChange: (colors: BrandColor[]) => void
  onColorChange: (colorKey: string, value: string) => void
  onThemeColorChange: (mode: 'light' | 'dark', colorKey: 'background' | 'foreground' | 'border' | 'containerBg', value: string) => void
  onFontChange: (fontType: 'heading' | 'body', fontFamily: string) => void
  onBorderRadiusChange: (radius: BorderRadius) => void
  onTypographyChange: (element: 'h1' | 'h2' | 'h3' | 'paragraph', property: 'size' | 'weight' | 'transform' | 'spacing' | 'lineHeight', value: FontSize | FontWeight | TextTransform | LetterSpacing | LineHeight) => void
  onMaterialChange: (element: 'card' | 'button' | 'input', property: 'borderRadius' | 'shadow', value: BorderRadius | Shadow) => void
  onUtilityColorChange: (colorKey: 'success' | 'destructive' | 'warning' | 'info' | 'disabled', value: string) => void
  onPaletteChange?: (paletteName: string) => void
  onRandomize?: () => void
  onAccordionChange?: (direction: 'open' | 'close') => void
  onCrossEyedTrigger?: () => void
  onShockedTrigger?: () => void
}

export function MobileControlsMenu(props: MobileControlsMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open controls menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96 p-0 overflow-y-auto">
        <SheetHeader className="border-b border-border px-6 py-4 sticky top-0 bg-card z-10">
          <div className="flex items-center justify-between">
            <SheetTitle>Settings</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <DesignTokensSheet 
              tokens={props.tokens} 
              selectedPalette={props.tokens.selectedPalette} 
              onShockedTrigger={props.onShockedTrigger}
            />
            <ThemeToggle />
          </div>
        </SheetHeader>
        <BrandControlsPanel {...props} />
      </SheetContent>
    </Sheet>
  )
}
