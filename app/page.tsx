'use client'

import { usePersistentBrandConfig } from '@/hooks/use-persistent-brand-config'
import { useBrandTokens } from '@/hooks/use-brand-tokens'
import { BrandControlsPanel } from '@/components/brand-controls-panel'
import { BrandPreview } from '@/components/brand-preview'
import { AppNavbar } from '@/components/app-navbar'
import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'

export default function BrandBoardPage() {
  const { tokens: persistedTokens, setTokens, isHydrated } = usePersistentBrandConfig()
  const { resolvedTheme } = useTheme()
  const [eyeAnimationTrigger, setEyeAnimationTrigger] = useState(0)
  const [eyeDirection, setEyeDirection] = useState<'open' | 'close'>('open')
  const [crossEyedTrigger, setCrossEyedTrigger] = useState(0)
  const [shockedTrigger, setShockedTrigger] = useState(0)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  const {
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
    randomize,
  } = useBrandTokens(persistedTokens)

  useEffect(() => {
    const isDark = resolvedTheme === 'dark'
    const currentThemeColors = isDark ? tokens.themeColors.dark : tokens.themeColors.light
    
    document.documentElement.style.setProperty('--background', currentThemeColors.background)
    document.documentElement.style.setProperty('--foreground', currentThemeColors.foreground)
    document.documentElement.style.setProperty('--card', currentThemeColors.containerBg)
    document.documentElement.style.setProperty('--card-foreground', currentThemeColors.foreground)
    document.documentElement.style.setProperty('--border', currentThemeColors.border)
    document.documentElement.style.setProperty('--input', currentThemeColors.border)
    document.documentElement.style.setProperty('--popover', currentThemeColors.containerBg)
    document.documentElement.style.setProperty('--popover-foreground', currentThemeColors.foreground)
  }, [resolvedTheme, tokens.themeColors])

  if (isHydrated && tokens !== persistedTokens) {
    setTokens(tokens)
  }

  const handleColorChange = (colorKey: string, value: string) => {
    updateColors({ [colorKey]: value })
  }

  const handleAccordionChange = (direction: 'open' | 'close') => {
    setEyeDirection(direction)
    setEyeAnimationTrigger(prev => prev + 1)
  }

  const handleCrossEyedTrigger = () => {
    setCrossEyedTrigger(prev => prev + 1)
  }

  const handleShockedTrigger = () => {
    setShockedTrigger(prev => prev + 1)
  }

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <AppNavbar 
        tokens={tokens} 
        eyeAnimationTrigger={eyeAnimationTrigger} 
        eyeDirection={eyeDirection}
        crossEyedTrigger={crossEyedTrigger}
        shockedTrigger={shockedTrigger}
        onBrandColorsChange={updateBrandColors}
        onColorChange={handleColorChange}
        onThemeColorChange={updateThemeColors}
        onFontChange={updateFonts}
        onBorderRadiusChange={updateBorderRadius}
        onTypographyChange={updateTypography}
        onMaterialChange={updateMaterial}
        onUtilityColorChange={updateUtilityColor}
        onPaletteChange={updateSelectedPalette}
        onRandomize={randomize}
        onAccordionChange={handleAccordionChange}
        onCrossEyedTrigger={handleCrossEyedTrigger}
        onShockedTrigger={handleShockedTrigger}
      />
      
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 size-6 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-all duration-300 items-center justify-center ${
            isSidebarCollapsed ? 'left-3' : 'left-[21rem]'
          }`}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`size-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>

        <div 
          className={`hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-0' : 'w-96'
          }`}
        >
          <div className={`h-full overflow-hidden ${isSidebarCollapsed ? 'invisible' : 'visible'}`}>
            <BrandControlsPanel
              tokens={tokens}
              onBrandColorsChange={updateBrandColors}
              onColorChange={handleColorChange}
              onThemeColorChange={updateThemeColors}
              onFontChange={updateFonts}
              onBorderRadiusChange={updateBorderRadius}
              onTypographyChange={updateTypography}
              onMaterialChange={updateMaterial}
              onUtilityColorChange={updateUtilityColor}
              onPaletteChange={updateSelectedPalette}
              onRandomize={randomize}
              onAccordionChange={handleAccordionChange}
              onCrossEyedTrigger={handleCrossEyedTrigger}
              onShockedTrigger={handleShockedTrigger}
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <BrandPreview tokens={tokens} />
        </div>
      </div>
    </div>
  )
}
