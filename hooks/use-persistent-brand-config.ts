'use client'

import { useEffect, useState } from 'react'
import { BrandTokens, DEFAULT_BRAND_TOKENS } from '@/types/brand'
import { applyPaletteToTheme } from '@/lib/tailwind-palettes'

const STORAGE_KEY = 'brand-board-config'

export function usePersistentBrandConfig() {
  const [tokens, setTokens] = useState<BrandTokens>(DEFAULT_BRAND_TOKENS)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setTokens(parsed)
      } else {
        const geistColors = applyPaletteToTheme('geist')
        setTokens({
          ...DEFAULT_BRAND_TOKENS,
          themeColors: {
            light: geistColors.light,
            dark: geistColors.dark,
          }
        })
      }
    } catch (error) {
      console.error('Failed to load brand config from localStorage:', error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Persist to localStorage when tokens change
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
    } catch (error) {
      console.error('Failed to save brand config to localStorage:', error)
    }
  }, [tokens, isHydrated])

  return { tokens, setTokens, isHydrated }
}
