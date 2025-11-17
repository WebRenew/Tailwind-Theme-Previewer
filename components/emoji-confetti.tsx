'use client'

import { useEffect } from 'react'

interface EmojiConfettiProps {
  emoji?: string
  duration?: number
  count?: number
}

export function EmojiConfetti({ emoji = '🔥', duration = 6500, count = 90 }: EmojiConfettiProps) {
  useEffect(() => {
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.top = '0'
    container.style.left = '0'
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'
    container.style.overflow = 'hidden'
    document.body.appendChild(container)

    const emojis: HTMLDivElement[] = []
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    for (let i = 0; i < count; i++) {
      const emojiEl = document.createElement('div')
      emojiEl.textContent = emoji
      emojiEl.style.position = 'fixed'
      emojiEl.style.pointerEvents = 'none'
      
      // Random size between 15-65px
      const size = Math.random() * 50 + 15
      emojiEl.style.fontSize = `${size}px`
      
      const spawnRoll = Math.random()
      let startX: number, startY: number, driftX: number, driftY: number
      
      if (spawnRoll < 0.25) {
        // 25% from top-left corner - explode toward center
        startX = 0
        startY = 0
        driftX = Math.random() * 400 + 200 // 200-600px right drift
        driftY = Math.random() * 400 + 200 // 200-600px downward drift
      } else if (spawnRoll < 0.5) {
        // 25% from top-right corner - explode toward center
        startX = viewportWidth
        startY = 0
        driftX = -(Math.random() * 400 + 200) // 200-600px left drift
        driftY = Math.random() * 400 + 200 // 200-600px downward drift
      } else if (spawnRoll < 0.75) {
        // 25% from bottom-left corner - explode upward toward center
        startX = 0
        startY = viewportHeight
        driftX = Math.random() * 400 + 200 // 200-600px right drift
        driftY = -(Math.random() * 400 + 200) // 200-600px upward drift
      } else {
        // 25% from bottom-right corner - explode upward toward center
        startX = viewportWidth
        startY = viewportHeight
        driftX = -(Math.random() * 400 + 200) // 200-600px left drift
        driftY = -(Math.random() * 400 + 200) // 200-600px upward drift
      }
      
      emojiEl.style.left = `${startX}px`
      emojiEl.style.top = `${startY}px`
      emojiEl.style.opacity = '1'
      
      container.appendChild(emojiEl)
      emojis.push(emojiEl)

      // Random delay up to 0.6s for staggered effect
      const delay = Math.random() * 600
      
      setTimeout(() => {
        const fallDuration = Math.random() * 4200 + 800
        
        // Random rotation (up to 2 full spins in either direction)
        const rotation = (Math.random() * 720 - 360) * 2
        
        const finalY = startY + driftY
        const finalX = startX + driftX
        
        // Ease-in animation for realistic motion
        emojiEl.style.transition = `all ${fallDuration}ms ease-in`
        emojiEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
        emojiEl.style.left = `${finalX}px`
        emojiEl.style.top = `${finalY}px`
        emojiEl.style.opacity = '0'
      }, delay)
    }

    // Clean up after animation completes
    const cleanupTimer = setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }, duration)

    return () => {
      clearTimeout(cleanupTimer)
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }
  }, [emoji, duration, count])

  return null
}
