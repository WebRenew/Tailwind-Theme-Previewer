import { TailwindColorName } from './tailwind-colors'

// Theme name generators based on color hue/family
const themeNames: Record<string, string[]> = {
  // Blues
  blue: ['Arctic Cascade', 'Midnight Ocean', 'Cobalt Dream', 'Azure Horizon', 'Deep Sea Breeze'],
  sky: ['Cloud Nine', 'Morning Mist', 'Daybreak Sky', 'Celestial Blue', 'Powder Snow'],
  cyan: ['Tropical Reef', 'Ice Crystal', 'Neon Lagoon', 'Cyber Aqua', 'Electric Tide'],
  
  // Greens
  green: ['Forest Canopy', 'Emerald Isle', 'Jungle Pulse', 'Meadow Fresh', 'Moss Garden'],
  emerald: ['Jade Mountain', 'Tropical Oasis', 'Malachite Dream', 'Verdant Peak', 'Rainforest Mist'],
  teal: ['Ocean Depths', 'Peacock Feather', 'Aquamarine Glow', 'Lagoon Shimmer', 'Deep Teal Waters'],
  lime: ['Neon Jungle', 'Electric Garden', 'Citrus Burst', 'Lime Zest', 'Radioactive Spring'],
  
  // Purples & Pinks
  purple: ['Midnight Galaxy', 'Violet Storm', 'Royal Velvet', 'Cosmic Purple', 'Amethyst Night'],
  violet: ['Lavender Dusk', 'Purple Haze', 'Twilight Bloom', 'Orchid Mist', 'Violet Nebula'],
  fuchsia: ['Electric Rose', 'Neon Magenta', 'Hot Pink Fusion', 'Cyber Bloom', 'Magenta Pulse'],
  pink: ['Bubblegum Dreams', 'Rose Quartz', 'Cotton Candy Sky', 'Blush Hour', 'Flamingo Sunset'],
  
  // Reds & Oranges
  red: ['Crimson Flame', 'Ruby Sunset', 'Fire Storm', 'Cherry Bomb', 'Scarlet Fever'],
  rose: ['Desert Rose', 'Coral Reef', 'Dusty Pink', 'Terracotta Dream', 'Salmon Sunset'],
  orange: ['Tangerine Burst', 'Sunset Blaze', 'Amber Glow', 'Citrus Punch', 'Copper Fire'],
  amber: ['Golden Hour', 'Honey Drip', 'Autumn Harvest', 'Butterscotch', 'Caramel Swirl'],
  
  // Yellows
  yellow: ['Sunshine Burst', 'Lemon Drop', 'Golden Dawn', 'Electric Yellow', 'Mango Tango'],
  
  // Neutrals
  slate: ['Storm Cloud', 'Concrete Jungle', 'Steel Grey', 'Urban Fog', 'Graphite Mist'],
  gray: ['Metropolitan Grey', 'Ash Cloud', 'Silver Lining', 'Stone Garden', 'Charcoal Dreams'],
  zinc: ['Industrial Chic', 'Modern Minimalist', 'Platinum Edge', 'Urban Steel', 'Zinc Oxide'],
  neutral: ['Warm Taupe', 'Desert Sand', 'Beige Bliss', 'Natural Earth', 'Stone Comfort'],
  stone: ['Rocky Mountain', 'Pebble Beach', 'Boulder Grey', 'Granite Solid', 'Limestone'],
  
  // Geist (treated as modern/tech)
  geist: ['Silicon Valley', 'Neon Matrix', 'Digital Frontier', 'Tech Noir', 'Cyber Core'],
}

// Fallback generic names for colors not in the map
const genericNames = [
  'Midnight Fluorescent',
  'Electric Dreams',
  'Neon Sunset',
  'Cosmic Fusion',
  'Digital Paradise',
  'Retro Future',
  'Vibrant Pulse',
  'Modern Classic',
  'Bold Minimal',
  'Clean Energy',
]

export function generateThemeName(primaryColor: TailwindColorName): string {
  const colorFamily = primaryColor.toLowerCase()
  
  // Check if we have theme names for this color family
  if (themeNames[colorFamily]) {
    const names = themeNames[colorFamily]
    return names[Math.floor(Math.random() * names.length)]
  }
  
  // Fallback to generic names
  return genericNames[Math.floor(Math.random() * genericNames.length)]
}
