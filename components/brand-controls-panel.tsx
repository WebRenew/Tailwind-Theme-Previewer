'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ColorPickerInput } from '@/components/color-picker-input'
import { LogoUploader } from '@/components/logo-uploader'
import { PalettePresetSelector } from '@/components/palette-preset-selector'
import { BrandColorManager } from '@/components/brand-color-manager'
import { BrandTokens, POPULAR_GOOGLE_FONTS, BorderRadius, BrandColor, FontSize, FontWeight, Shadow, TextTransform, LetterSpacing, LineHeight } from '@/types/brand'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dices } from 'lucide-react'
import { useState } from 'react'

interface BrandControlsPanelProps {
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
  onRandomize?: () => void // Added randomize handler prop
  onAccordionChange?: (direction: 'open' | 'close') => void
  onCrossEyedTrigger?: () => void // Added cross-eyed trigger callback
}

const BORDER_RADIUS_OPTIONS: { value: BorderRadius; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: 'full', label: 'Full' },
]

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'SM' },
  { value: 'base', label: 'Base' },
  { value: 'lg', label: 'LG' },
  { value: 'xl', label: 'XL' },
  { value: '2xl', label: '2XL' },
  { value: '3xl', label: '3XL' },
  { value: '4xl', label: '4XL' },
  { value: '5xl', label: '5XL' },
  { value: '6xl', label: '6XL' },
  { value: '7xl', label: '7XL' },
  { value: '8xl', label: '8XL' },
  { value: '9xl', label: '9XL' },
]

const FONT_WEIGHT_OPTIONS: { value: FontWeight; label: string }[] = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Normal' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' },
]

const SHADOW_OPTIONS: { value: Shadow; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: '2xl', label: '2X Large' },
]

const TEXT_TRANSFORM_OPTIONS: { value: TextTransform; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'capitalize', label: 'Title Case' },
]

const LETTER_SPACING_OPTIONS: { value: LetterSpacing; label: string }[] = [
  { value: 'tighter', label: 'Tighter' },
  { value: 'tight', label: 'Tight' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
  { value: 'wider', label: 'Wider' },
  { value: 'widest', label: 'Widest' },
]

const LINE_HEIGHT_OPTIONS: { value: LineHeight; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'tight', label: 'Tight' },
  { value: 'snug', label: 'Snug' },
  { value: 'normal', label: 'Normal' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'loose', label: 'Loose' },
]

export function BrandControlsPanel({
  tokens,
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
  onCrossEyedTrigger, // Added prop
}: BrandControlsPanelProps) {
  const [openAccordions, setOpenAccordions] = useState<string[]>([])
  const [isDiceClicked, setIsDiceClicked] = useState(false)
  
  const handleAccordionChange = (values: string[]) => {
    setOpenAccordions(values)
    
    // Pass whether any accordion is open to parent
    if (onAccordionChange) {
      onAccordionChange(values.length > 0 ? 'open' : 'close')
    }
  }

  const handleSliderChange = (value: number[]) => {
    const selectedRadius = BORDER_RADIUS_OPTIONS[value[0]]
    if (selectedRadius) {
      onBorderRadiusChange(selectedRadius.value)
    }
  }

  const handlePaletteSelect = (colors: {
    light: { background: string; foreground: string; border: string; containerBg: string }
    dark: { background: string; foreground: string; border: string; containerBg: string }
  }, paletteName: string) => {
    onThemeColorChange('light', 'background', colors.light.background)
    onThemeColorChange('light', 'foreground', colors.light.foreground)
    onThemeColorChange('light', 'border', colors.light.border)
    onThemeColorChange('light', 'containerBg', colors.light.containerBg)
    onThemeColorChange('dark', 'background', colors.dark.background)
    onThemeColorChange('dark', 'foreground', colors.dark.foreground)
    onThemeColorChange('dark', 'border', colors.dark.border)
    onThemeColorChange('dark', 'containerBg', colors.dark.containerBg)
    
    if (onPaletteChange) {
      onPaletteChange(paletteName)
    }
  }

  const handleDiceClick = () => {
    setIsDiceClicked(true)
    if (onRandomize) {
      onRandomize()
    }
    if (onCrossEyedTrigger) {
      onCrossEyedTrigger()
    }
    setTimeout(() => {
      setIsDiceClicked(false)
    }, 1200)
  }

  const primaryColor = tokens.brandColors[0]?.palette?.[500] || '#3b82f6'

  return (
    <div className="h-full overflow-y-auto border-r border-border bg-card p-6">
      <button 
        onClick={handleDiceClick}
        className="w-full mb-6 px-4 py-3 bg-background text-foreground font-mono font-light text-sm uppercase tracking-tight rounded-lg transition-all flex items-center justify-start gap-2 group"
      >
        <Dices className={`size-4 transition-transform ${isDiceClicked ? 'animate-diceClickSpin' : 'group-hover:animate-diceHoverRoll'}`} />
        <span>YOLO MODE</span>
      </button>

      <Accordion 
        type="multiple" 
        defaultValue={[]} 
        className="space-y-2"
        value={openAccordions}
        onValueChange={handleAccordionChange}
      >
        
        {/* Colors Section */}
        <AccordionItem value="colors" className="border-b border-border">
          <AccordionTrigger className="text-base font-semibold">Colors</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            {/* Brand Color Manager */}
            <BrandColorManager
              colors={tokens.brandColors}
              onColorsChange={onBrandColorsChange}
            />

            {/* Palette Preset Selector */}
            <PalettePresetSelector onPaletteSelect={handlePaletteSelect} />

            {/* Surface Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Surface Colors</h3>
              <ColorPickerInput
                label="Border"
                value={tokens.colors.border}
                onChange={(value) => onColorChange('border', value)}
              />
              <ColorPickerInput
                label="Container Background"
                value={tokens.colors.containerBg}
                onChange={(value) => onColorChange('containerBg', value)}
              />
            </div>

            {/* Theme Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Theme Colors</h3>
              
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">Light Mode</p>
                <ColorPickerInput
                  label="Background"
                  value={tokens.themeColors.light.background}
                  onChange={(value) => onThemeColorChange('light', 'background', value)}
                />
                <ColorPickerInput
                  label="Foreground"
                  value={tokens.themeColors.light.foreground}
                  onChange={(value) => onThemeColorChange('light', 'foreground', value)}
                />
                <ColorPickerInput
                  label="Border"
                  value={tokens.themeColors.light.border}
                  onChange={(value) => onThemeColorChange('light', 'border', value)}
                />
                <ColorPickerInput
                  label="Container Background"
                  value={tokens.themeColors.light.containerBg}
                  onChange={(value) => onThemeColorChange('light', 'containerBg', value)}
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium">Dark Mode</p>
                <ColorPickerInput
                  label="Background"
                  value={tokens.themeColors.dark.background}
                  onChange={(value) => onThemeColorChange('dark', 'background', value)}
                />
                <ColorPickerInput
                  label="Foreground"
                  value={tokens.themeColors.dark.foreground}
                  onChange={(value) => onThemeColorChange('dark', 'foreground', value)}
                />
                <ColorPickerInput
                  label="Border"
                  value={tokens.themeColors.dark.border}
                  onChange={(value) => onThemeColorChange('dark', 'border', value)}
                />
                <ColorPickerInput
                  label="Container Background"
                  value={tokens.themeColors.dark.containerBg}
                  onChange={(value) => onThemeColorChange('dark', 'containerBg', value)}
                />
              </div>
            </div>

            {/* Utility Colors */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Utility Colors</h3>
              
              <ColorPickerInput
                label="Success"
                value={tokens.utilityColors.success}
                onChange={(value) => onUtilityColorChange('success', value)}
              />
              
              <ColorPickerInput
                label="Destructive"
                value={tokens.utilityColors.destructive}
                onChange={(value) => onUtilityColorChange('destructive', value)}
              />
              
              <ColorPickerInput
                label="Warning"
                value={tokens.utilityColors.warning}
                onChange={(value) => onUtilityColorChange('warning', value)}
              />
              
              <ColorPickerInput
                label="Info"
                value={tokens.utilityColors.info}
                onChange={(value) => onUtilityColorChange('info', value)}
              />
              
              <ColorPickerInput
                label="Disabled"
                value={tokens.utilityColors.disabled}
                onChange={(value) => onUtilityColorChange('disabled', value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Typography Section */}
        <AccordionItem value="typography" className="border-b border-border">
          <AccordionTrigger className="text-base font-semibold">Typography</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="heading-font" className="text-sm font-semibold">Headers</Label>
              <Select
                value={tokens.fonts.heading}
                onValueChange={(value) => onFontChange('heading', value)}
              >
                <SelectTrigger id="heading-font">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_GOOGLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="body-font" className="text-sm font-semibold">Body</Label>
              <Select
                value={tokens.fonts.body}
                onValueChange={(value) => onFontChange('body', value)}
              >
                <SelectTrigger id="body-font">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_GOOGLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* H1 font size and weight controls */}
            <div className="space-y-3 pt-2 border-t border-border">
              <Label className="text-sm font-semibold">H1 Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h1-size-slider" className="text-xs">Font Size</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_SIZE_OPTIONS.find((opt) => opt.value === tokens.fonts.h1Size)?.label}
                  </span>
                </div>
                <Slider
                  id="h1-size-slider"
                  min={0}
                  max={FONT_SIZE_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h1Size)]}
                  onValueChange={(value) => {
                    const selected = FONT_SIZE_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h1', 'size', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h1-weight-slider" className="text-xs">Font Weight</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_WEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h1Weight)?.label}
                  </span>
                </div>
                <Slider
                  id="h1-weight-slider"
                  min={0}
                  max={FONT_WEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_WEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h1Weight)]}
                  onValueChange={(value) => {
                    const selected = FONT_WEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h1', 'weight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Text Transform</Label>
                <RadioGroup
                  value={tokens.fonts.h1Transform}
                  onValueChange={(value) => onTypographyChange('h1', 'transform', value as TextTransform)}
                  className="flex gap-4"
                >
                  {TEXT_TRANSFORM_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`h1-transform-${option.value}`} />
                      <Label htmlFor={`h1-transform-${option.value}`} className="text-xs font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h1-spacing-slider" className="text-xs">Letter Spacing</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LETTER_SPACING_OPTIONS.find((opt) => opt.value === tokens.fonts.h1Spacing)?.label}
                  </span>
                </div>
                <Slider
                  id="h1-spacing-slider"
                  min={0}
                  max={LETTER_SPACING_OPTIONS.length - 1}
                  step={1}
                  value={[LETTER_SPACING_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h1Spacing)]}
                  onValueChange={(value) => {
                    const selected = LETTER_SPACING_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h1', 'spacing', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h1-lineheight-slider" className="text-xs">Line Height</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LINE_HEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h1LineHeight)?.label}
                  </span>
                </div>
                <Slider
                  id="h1-lineheight-slider"
                  min={0}
                  max={LINE_HEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[LINE_HEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h1LineHeight)]}
                  onValueChange={(value) => {
                    const selected = LINE_HEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h1', 'lineHeight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* H2 font size and weight controls */}
            <div className="space-y-3 pt-2 border-t border-border">
              <Label className="text-sm font-semibold">H2 Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h2-size-slider" className="text-xs">Font Size</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_SIZE_OPTIONS.find((opt) => opt.value === tokens.fonts.h2Size)?.label}
                  </span>
                </div>
                <Slider
                  id="h2-size-slider"
                  min={0}
                  max={FONT_SIZE_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h2Size)]}
                  onValueChange={(value) => {
                    const selected = FONT_SIZE_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h2', 'size', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h2-weight-slider" className="text-xs">Font Weight</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_WEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h2Weight)?.label}
                  </span>
                </div>
                <Slider
                  id="h2-weight-slider"
                  min={0}
                  max={FONT_WEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_WEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h2Weight)]}
                  onValueChange={(value) => {
                    const selected = FONT_WEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h2', 'weight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Text Transform</Label>
                <RadioGroup
                  value={tokens.fonts.h2Transform}
                  onValueChange={(value) => onTypographyChange('h2', 'transform', value as TextTransform)}
                  className="flex gap-4"
                >
                  {TEXT_TRANSFORM_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`h2-transform-${option.value}`} />
                      <Label htmlFor={`h2-transform-${option.value}`} className="text-xs font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h2-spacing-slider" className="text-xs">Letter Spacing</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LETTER_SPACING_OPTIONS.find((opt) => opt.value === tokens.fonts.h2Spacing)?.label}
                  </span>
                </div>
                <Slider
                  id="h2-spacing-slider"
                  min={0}
                  max={LETTER_SPACING_OPTIONS.length - 1}
                  step={1}
                  value={[LETTER_SPACING_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h2Spacing)]}
                  onValueChange={(value) => {
                    const selected = LETTER_SPACING_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h2', 'spacing', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h2-lineheight-slider" className="text-xs">Line Height</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LINE_HEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h2LineHeight)?.label}
                  </span>
                </div>
                <Slider
                  id="h2-lineheight-slider"
                  min={0}
                  max={LINE_HEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[LINE_HEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h2LineHeight)]}
                  onValueChange={(value) => {
                    const selected = LINE_HEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h2', 'lineHeight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* H3 font size and weight controls */}
            <div className="space-y-3 pt-2 border-t border-border">
              <Label className="text-sm font-semibold">H3 Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h3-size-slider" className="text-xs">Font Size</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_SIZE_OPTIONS.find((opt) => opt.value === tokens.fonts.h3Size)?.label}
                  </span>
                </div>
                <Slider
                  id="h3-size-slider"
                  min={0}
                  max={FONT_SIZE_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h3Size)]}
                  onValueChange={(value) => {
                    const selected = FONT_SIZE_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h3', 'size', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h3-weight-slider" className="text-xs">Font Weight</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_WEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h3Weight)?.label}
                  </span>
                </div>
                <Slider
                  id="h3-weight-slider"
                  min={0}
                  max={FONT_WEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_WEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h3Weight)]}
                  onValueChange={(value) => {
                    const selected = FONT_WEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h3', 'weight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Text Transform</Label>
                <RadioGroup
                  value={tokens.fonts.h3Transform}
                  onValueChange={(value) => onTypographyChange('h3', 'transform', value as TextTransform)}
                  className="flex gap-4"
                >
                  {TEXT_TRANSFORM_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`h3-transform-${option.value}`} />
                      <Label htmlFor={`h3-transform-${option.value}`} className="text-xs font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h3-spacing-slider" className="text-xs">Letter Spacing</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LETTER_SPACING_OPTIONS.find((opt) => opt.value === tokens.fonts.h3Spacing)?.label}
                  </span>
                </div>
                <Slider
                  id="h3-spacing-slider"
                  min={0}
                  max={LETTER_SPACING_OPTIONS.length - 1}
                  step={1}
                  value={[LETTER_SPACING_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h3Spacing)]}
                  onValueChange={(value) => {
                    const selected = LETTER_SPACING_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h3', 'spacing', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="h3-lineheight-slider" className="text-xs">Line Height</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LINE_HEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.h3LineHeight)?.label}
                  </span>
                </div>
                <Slider
                  id="h3-lineheight-slider"
                  min={0}
                  max={LINE_HEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[LINE_HEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.h3LineHeight)]}
                  onValueChange={(value) => {
                    const selected = LINE_HEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('h3', 'lineHeight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Paragraph font size and weight controls */}
            <div className="space-y-3 pt-2 border-t border-border">
              <Label className="text-sm font-semibold">Paragraph Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="paragraph-size-slider" className="text-xs">Font Size</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_SIZE_OPTIONS.find((opt) => opt.value === tokens.fonts.paragraphSize)?.label}
                  </span>
                </div>
                <Slider
                  id="paragraph-size-slider"
                  min={0}
                  max={FONT_SIZE_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.paragraphSize)]}
                  onValueChange={(value) => {
                    const selected = FONT_SIZE_OPTIONS[value[0]]
                    if (selected) onTypographyChange('paragraph', 'size', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="paragraph-weight-slider" className="text-xs">Font Weight</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {FONT_WEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.paragraphWeight)?.label}
                  </span>
                </div>
                <Slider
                  id="paragraph-weight-slider"
                  min={0}
                  max={FONT_WEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[FONT_WEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.paragraphWeight)]}
                  onValueChange={(value) => {
                    const selected = FONT_WEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('paragraph', 'weight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="paragraph-lineheight-slider" className="text-xs">Line Height</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {LINE_HEIGHT_OPTIONS.find((opt) => opt.value === tokens.fonts.paragraphLineHeight)?.label}
                  </span>
                </div>
                <Slider
                  id="paragraph-lineheight-slider"
                  min={0}
                  max={LINE_HEIGHT_OPTIONS.length - 1}
                  step={1}
                  value={[LINE_HEIGHT_OPTIONS.findIndex((opt) => opt.value === tokens.fonts.paragraphLineHeight)]}
                  onValueChange={(value) => {
                    const selected = LINE_HEIGHT_OPTIONS[value[0]]
                    if (selected) onTypographyChange('paragraph', 'lineHeight', selected.value)
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Materials Section */}
        <AccordionItem value="materials" className="border-b border-border">
          <AccordionTrigger className="text-base font-semibold">Materials</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            {/* Card Materials */}
            <div className="space-y-4 pb-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Cards</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="card-radius-slider" className="text-xs">Border Radius</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {BORDER_RADIUS_OPTIONS[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.card.borderRadius)]?.label}
                  </span>
                </div>
                <Slider
                  id="card-radius-slider"
                  min={0}
                  max={BORDER_RADIUS_OPTIONS.length - 1}
                  step={1}
                  value={[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.card.borderRadius)]}
                  onValueChange={(value) => {
                    const selected = BORDER_RADIUS_OPTIONS[value[0]]
                    if (selected) onMaterialChange('card', 'borderRadius', selected.value)
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Button Materials */}
            <div className="space-y-4 pb-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Buttons</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="button-radius-slider" className="text-xs">Border Radius</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {BORDER_RADIUS_OPTIONS[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.button.borderRadius)]?.label}
                  </span>
                </div>
                <Slider
                  id="button-radius-slider"
                  min={0}
                  max={BORDER_RADIUS_OPTIONS.length - 1}
                  step={1}
                  value={[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.button.borderRadius)]}
                  onValueChange={(value) => {
                    const selected = BORDER_RADIUS_OPTIONS[value[0]]
                    if (selected) onMaterialChange('button', 'borderRadius', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="button-shadow-select" className="text-xs">Shadow</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {SHADOW_OPTIONS.find((opt) => opt.value === tokens.materials.button.shadow)?.label}
                  </span>
                </div>
                <Select
                  id="button-shadow-select"
                  value={tokens.materials.button.shadow}
                  onValueChange={(value) => onMaterialChange('button', 'shadow', value as Shadow)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SHADOW_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input Materials */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Inputs</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="input-radius-slider" className="text-xs">Border Radius</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {BORDER_RADIUS_OPTIONS[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.input.borderRadius)]?.label}
                  </span>
                </div>
                <Slider
                  id="input-radius-slider"
                  min={0}
                  max={BORDER_RADIUS_OPTIONS.length - 1}
                  step={1}
                  value={[BORDER_RADIUS_OPTIONS.findIndex((opt) => opt.value === tokens.materials.input.borderRadius)]}
                  onValueChange={(value) => {
                    const selected = BORDER_RADIUS_OPTIONS[value[0]]
                    if (selected) onMaterialChange('input', 'borderRadius', selected.value)
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="input-shadow-select" className="text-xs">Shadow</Label>
                  <span className="text-xs text-muted-foreground font-medium">
                    {SHADOW_OPTIONS.find((opt) => opt.value === tokens.materials.input.shadow)?.label}
                  </span>
                </div>
                <Select
                  id="input-shadow-select"
                  value={tokens.materials.input.shadow}
                  onValueChange={(value) => onMaterialChange('input', 'shadow', value as Shadow)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SHADOW_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
