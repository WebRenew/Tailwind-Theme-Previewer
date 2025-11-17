'use client'

import { useState, useEffect } from 'react'

interface AnimatedEyesProps {
  animationTrigger?: number
  direction?: 'open' | 'close'
  crossEyedTrigger?: number
  shockedTrigger?: number
}

export function AnimatedEyes({ animationTrigger = 0, direction, crossEyedTrigger = 0, shockedTrigger = 0 }: AnimatedEyesProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [lookingRight, setLookingRight] = useState(false)
  const [isCrossEyed, setIsCrossEyed] = useState(false)
  const [isShocked, setIsShocked] = useState(false)

  useEffect(() => {
    if (animationTrigger > 0) {
      setLookingRight(direction === 'open')
    }
  }, [animationTrigger, direction])

  useEffect(() => {
    if (crossEyedTrigger > 0) {
      setIsCrossEyed(true)
      setTimeout(() => {
        setIsCrossEyed(false)
      }, 1200)
    }
  }, [crossEyedTrigger])

  useEffect(() => {
    if (shockedTrigger > 0) {
      // Delay 800ms before starting the shocked animation
      setTimeout(() => {
        setIsShocked(true)
      }, 800)
      
      // Return to normal when fire completes (6500ms total)
      setTimeout(() => {
        setIsShocked(false)
      }, 6500)
    }
  }, [shockedTrigger])

  const getLeftEyeTransform = () => {
    if (isCrossEyed) {
      return 'translate-x-[1px]'
    } else if (isHovered) {
      return 'translate-x-[1.5px]'
    } else if (lookingRight) {
      return 'translate-x-[1.5px]'
    } else {
      return '-translate-x-1/2'
    }
  }

  const getRightEyeTransform = () => {
    if (isCrossEyed) {
      return '-translate-x-[calc(50%+4px)]'
    } else if (isHovered) {
      return 'translate-x-[1.5px]'
    } else if (lookingRight) {
      return 'translate-x-[1.5px]'
    } else {
      return '-translate-x-1/2'
    }
  }

  const getPupilScale = () => {
    return isShocked ? 'scale-y-[2] scale-x-[1.5]' : 'scale-y-100 scale-x-100'
  }

  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Eye */}
      <div className="relative h-6 w-4 rounded-full bg-white border border-foreground/20">
        <div
          className={`absolute top-[70%] left-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-black origin-bottom ${getLeftEyeTransform()} ${getPupilScale()}`}
          style={{
            transition: isShocked 
              ? 'transform 600ms ease-in-out' 
              : 'all 500ms ease-out'
          }}
        />
      </div>

      {/* Right Eye */}
      <div className="relative h-6 w-4 rounded-full bg-white border border-foreground/20">
        <div
          className={`absolute top-[70%] left-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-black origin-bottom ${getRightEyeTransform()} ${getPupilScale()}`}
          style={{
            transition: isShocked 
              ? 'transform 600ms ease-in-out' 
              : 'all 500ms ease-out'
          }}
        />
      </div>
    </div>
  )
}
