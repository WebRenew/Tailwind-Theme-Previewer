'use client'

import { useEffect } from 'react'

interface GoogleFontLoaderProps {
  fonts: string[]
}

export function GoogleFontLoader({ fonts }: GoogleFontLoaderProps) {
  useEffect(() => {
    // Remove duplicates
    const uniqueFonts = [...new Set(fonts)]
    
    // Check if fonts are already loaded
    const existingLink = document.querySelector('link[data-font-loader="brand-fonts"]')
    
    if (uniqueFonts.length === 0) {
      if (existingLink) {
        existingLink.remove()
      }
      return
    }

    // Build Google Fonts URL
    const fontFamilies = uniqueFonts.map(font => font.replace(/ /g, '+')).join('&family=')
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`
    
    if (existingLink) {
      // Update existing link
      existingLink.setAttribute('href', fontUrl)
    } else {
      // Create new link element
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = fontUrl
      link.setAttribute('data-font-loader', 'brand-fonts')
      document.head.appendChild(link)
    }
    
    return () => {
      // Cleanup on unmount
      const linkToRemove = document.querySelector('link[data-font-loader="brand-fonts"]')
      if (linkToRemove) {
        linkToRemove.remove()
      }
    }
  }, [fonts])

  return null
}
