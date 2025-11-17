'use client'

import { useState, useEffect } from 'react'
import { TAILWIND_NEUTRAL_PALETTES, TailwindPaletteName, applyPaletteToTheme } from '@/lib/tailwind-palettes'
import { Check } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface PalettePresetSelectorProps {
  onPaletteSelect: (colors: {
    light: { background: string; foreground: string; border: string; containerBg: string }
    dark: { background: string; foreground: string; border: string; containerBg: string }
  }, paletteName: string) => void // Added paletteName parameter
}

export function PalettePresetSelector({ onPaletteSelect }: PalettePresetSelectorProps) {
  const [selectedPalette, setSelectedPalette] = useState<TailwindPaletteName | null>('geist')

  useEffect(() => {
    if (selectedPalette === 'geist') {
      const paletteColors = applyPaletteToTheme('geist')
      onPaletteSelect({
        light: paletteColors.light,
        dark: paletteColors.dark,
      }, 'geist')
    }
  }, [])

  const handlePaletteClick = (paletteName: TailwindPaletteName) => {
    setSelectedPalette(paletteName)
    const paletteColors = applyPaletteToTheme(paletteName)
    
    onPaletteSelect({
      light: paletteColors.light,
      dark: paletteColors.dark,
    }, paletteName)
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="palette-presets" className="border-border">
        <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
          Neutral Base Palettes
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-2">
            {(Object.keys(TAILWIND_NEUTRAL_PALETTES) as TailwindPaletteName[]).map((paletteName) => {
              const palette = TAILWIND_NEUTRAL_PALETTES[paletteName]
              const isSelected = selectedPalette === paletteName

              return (
                <button
                  key={paletteName}
                  onClick={() => handlePaletteClick(paletteName)}
                  className="w-full text-left"
                >
                  <div className={`rounded-lg border-2 p-3 transition-all hover:border-primary ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize text-foreground">
                        {paletteName}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex gap-1">
                      {Object.entries(palette).map(([shade, color]) => (
                        <div
                          key={shade}
                          className="h-8 flex-1 rounded-sm first:rounded-l-md last:rounded-r-md"
                          style={{ backgroundColor: color }}
                          title={`${shade}: ${color}`}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>50</span>
                      <span>950</span>
                    </div>
                  </div>
                </button>
              )
            })}
            <p className="text-xs text-muted-foreground pt-2">
              Select a neutral base palette to populate background, foreground, border, and container colors. You can override any color after selection.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
