'use client'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BrandTokens, BORDER_RADIUS_MAP, BrandColor, FONT_SIZE_MAP, FONT_WEIGHT_MAP, SHADOW_MAP, TEXT_TRANSFORM_MAP, LETTER_SPACING_MAP, LINE_HEIGHT_MAP } from '@/types/brand'
import { Sparkles, Zap, TrendingUp, Check, ArrowRight, Users, Target, Award, Clock, ShoppingCart, Heart, Star, ChevronRight, Home, Package, Plane, DollarSign, Coffee, Printer, FileText, Calendar, Mail, Phone, Briefcase, Monitor } from 'lucide-react'
import { GoogleFontLoader } from '@/components/google-font-loader'
import { parseTailwindColor, getTailwindColor } from '@/lib/tailwind-colors'
import { getContrastTextColor } from '@/lib/color-utils'
import { TAILWIND_COLORS, TailwindColorName } from '@/lib/tailwind-colors'

interface BrandPreviewProps {
  tokens: BrandTokens
}

export function BrandPreview({ tokens }: BrandPreviewProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const { borderRadius, themeColors, fonts, brandColors, materials } = tokens
  const borderRadiusValue = BORDER_RADIUS_MAP[borderRadius]
  
  const neutralBorder = isDark ? '#52525b' : '#d4d4d8'
  const neutralText = isDark ? '#a1a1aa' : '#71717a'
  
  const currentThemeColors = isDark ? themeColors.dark : themeColors.light
  const borderColor = currentThemeColors.border || tokens.colors.border
  const containerBgColor = currentThemeColors.containerBg || tokens.colors.containerBg

  const getBrandColorShade = (brandColor: BrandColor, shade: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950') => {
    if (brandColor.isTailwindColor) {
      return TAILWIND_COLORS[brandColor.value as TailwindColorName][shade]
    }
    // For custom colors, generate shade based on base color
    const opacity = {
      '50': 0.05, '100': 0.1, '200': 0.2, '300': 0.3, '400': 0.5,
      '500': 1, '600': 0.9, '700': 0.8, '800': 0.7, '900': 0.6, '950': 0.5
    }[shade]
    if (isDark && shade !== '500') {
      // In dark mode, lighter shades should be more opaque
      return brandColor.value + Math.round((opacity || 1) * 255).toString(16).padStart(2, '0')
    }
    return brandColor.value
  }

  const primaryColor = brandColors[0] 
    ? getBrandColorShade(brandColors[0], '600')
    : currentThemeColors.foreground
  const primaryTextColor = brandColors[0]
    ? '#ffffff'
    : currentThemeColors.background
  
  const primaryShade50 = brandColors[0] ? getBrandColorShade(brandColors[0], '50') : undefined
  const primaryShade100 = brandColors[0] ? getBrandColorShade(brandColors[0], '100') : undefined
  const primaryShade200 = brandColors[0] ? getBrandColorShade(brandColors[0], '200') : undefined
  const primaryShade300 = brandColors[0] ? getBrandColorShade(brandColors[0], '300') : undefined
  const primaryShade400 = brandColors[0] ? getBrandColorShade(brandColors[0], '400') : undefined
  const primaryShade500 = brandColors[0] ? getBrandColorShade(brandColors[0], '500') : undefined
  const primaryShade600 = brandColors[0] ? getBrandColorShade(brandColors[0], '600') : undefined
  const primaryShade700 = brandColors[0] ? getBrandColorShade(brandColors[0], '700') : undefined
  const primaryShade800 = brandColors[0] ? getBrandColorShade(brandColors[0], '800') : undefined
  
  const secondaryColor = brandColors[1] ? getBrandColorShade(brandColors[1], '600') : neutralBorder
  const secondaryShade50 = brandColors[1] ? getBrandColorShade(brandColors[1], '50') : undefined
  const secondaryShade100 = brandColors[1] ? getBrandColorShade(brandColors[1], '100') : undefined
  
  const tertiaryColor = brandColors[2] ? getBrandColorShade(brandColors[2], '600') : primaryColor
  const tertiaryShade50 = brandColors[2] ? getBrandColorShade(brandColors[2], '50') : undefined
  const tertiaryShade100 = brandColors[2] ? getBrandColorShade(brandColors[2], '100') : undefined
  const tertiaryShade200 = brandColors[2] ? getBrandColorShade(brandColors[2], '200') : undefined
  const tertiaryShade300 = brandColors[2] ? getBrandColorShade(brandColors[2], '300') : undefined
  const tertiaryShade400 = brandColors[2] ? getBrandColorShade(brandColors[2], '400') : undefined
  const tertiaryShade500 = brandColors[2] ? getBrandColorShade(brandColors[2], '500') : undefined
  const tertiaryShade600 = brandColors[2] ? getBrandColorShade(brandColors[2], '600') : undefined
  const tertiaryShade700 = brandColors[2] ? getBrandColorShade(brandColors[2], '700') : undefined
  const tertiaryShade800 = brandColors[2] ? getBrandColorShade(brandColors[2], '800') : undefined

  const accentColor = brandColors[2] ? getBrandColorShade(brandColors[2], '600') : primaryColor

  const ctaBgColor = brandColors[0] ? getBrandColorShade(brandColors[0], '600') : currentThemeColors.foreground
  const ctaTextColor = brandColors[0] ? getContrastTextColor(getBrandColorShade(brandColors[0], '600')) : currentThemeColors.background

  const navbarBgColor = brandColors[0] 
    ? (isDark ? getBrandColorShade(brandColors[0], '800') : getBrandColorShade(brandColors[0], '100'))
    : containerBgColor

  const navbarTextColor = brandColors[0]
    ? (isDark ? '#ffffff' : getBrandColorShade(brandColors[0], '900'))
    : currentThemeColors.foreground

  const navbarButtonBg = brandColors[0]
    ? (isDark ? '#ffffff' : getBrandColorShade(brandColors[0], '900'))
    : currentThemeColors.foreground
  
  const navbarButtonText = brandColors[0]
    ? (isDark ? navbarBgColor : '#ffffff')
    : currentThemeColors.background

  return (
    <>
      <GoogleFontLoader fonts={[fonts.heading, fonts.body]} />
      
      <div
        className="h-full overflow-y-auto bg-background text-foreground"
        style={{
          fontFamily: fonts.body,
        }}
      >
        <div className="mx-auto max-w-7xl p-8 space-y-16">
          <nav className="flex items-center justify-between py-4 px-6 bg-card rounded-lg border"
            style={{
              borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
              borderColor: borderColor,
              boxShadow: SHADOW_MAP[materials.card.shadow],
              backgroundColor: navbarBgColor,
            }}
          >
            <div className="flex items-center gap-8">
              <span className="font-semibold text-lg" style={{ fontFamily: fonts.heading, color: navbarTextColor }}>
                Cubicloud
              </span>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" style={{ color: navbarTextColor, opacity: 0.9 }} className="hover:opacity-100 transition-opacity">
                  Features
                </a>
                <a href="#" style={{ color: navbarTextColor, opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                  Pricing
                </a>
                <a href="#" style={{ color: navbarTextColor, opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                  About
                </a>
                <a href="#" style={{ color: navbarTextColor, opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                style={{ color: navbarTextColor }}
                className="hover:bg-black/5 dark:hover:bg-white/10"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                style={{
                  backgroundColor: navbarButtonBg,
                  color: navbarButtonText,
                  borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                }}
              >
                Get Started
              </Button>
            </div>
          </nav>

          <section
            className="relative overflow-hidden grid md:grid-cols-2 gap-8 items-center px-8 py-12"
          >
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${primaryShade500}, transparent 50%)`,
              }}
            />
            <div className="relative z-10 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: primaryShade100,
                  borderColor: primaryShade300,
                  color: primaryShade800,
                }}
              >
                <Sparkles className="w-3 h-3" />
                Workspaces as a Service (WaaS)
              </div>
              
              <h1
                className="text-balance text-foreground"
                style={{
                  fontFamily: fonts.heading,
                  fontSize: FONT_SIZE_MAP[tokens.fonts.h1Size],
                  fontWeight: FONT_WEIGHT_MAP[tokens.fonts.h1Weight],
                  textTransform: TEXT_TRANSFORM_MAP[tokens.fonts.h1Transform],
                  letterSpacing: LETTER_SPACING_MAP[tokens.fonts.h1Spacing],
                  lineHeight: LINE_HEIGHT_MAP[tokens.fonts.h1LineHeight],
                }}
              >
                Reimagining the Box You Think Outside Of
              </h1>
              <p
                className="text-pretty text-muted-foreground"
                style={{
                  fontSize: FONT_SIZE_MAP[tokens.fonts.paragraphSize],
                  fontWeight: FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight],
                  lineHeight: LINE_HEIGHT_MAP[tokens.fonts.paragraphLineHeight],
                }}
              >
                Ergonomic enclosures optimized for email refreshes and quiet existential crises.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="gap-2"
                  style={{
                    backgroundColor: primaryShade600,
                    color: primaryTextColor,
                    borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                    boxShadow: SHADOW_MAP[materials.button.shadow],
                  }}
                >
                  Shop Enclosures
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{
                    borderColor: brandColors[2] ? tertiaryShade300 : brandColors[1] ? secondaryShade100 : primaryShade300,
                    color: brandColors[2] ? tertiaryColor : brandColors[1] ? secondaryColor : primaryShade700,
                    borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                    boxShadow: SHADOW_MAP[materials.button.shadow],
                  }}
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                }}
              >
                <img
                  src="/cubicloud-hero.png"
                  alt="Design workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            {/* Full-width header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-4 border-b" style={{ borderColor: borderColor }}>
              <div className="space-y-2">
                <h2
                  className="text-foreground"
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: FONT_SIZE_MAP[tokens.fonts.h2Size],
                    fontWeight: FONT_WEIGHT_MAP[tokens.fonts.h2Weight],
                    textTransform: TEXT_TRANSFORM_MAP[tokens.fonts.h2Transform],
                    letterSpacing: LETTER_SPACING_MAP[tokens.fonts.h2Spacing],
                    lineHeight: LINE_HEIGHT_MAP[tokens.fonts.h2LineHeight],
                  }}
                >
                  Meaningless Metrics That Make Everything Feel Better
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{
                    fontSize: FONT_SIZE_MAP[tokens.fonts.paragraphSize],
                    fontWeight: FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight],
                    lineHeight: LINE_HEIGHT_MAP[tokens.fonts.paragraphLineHeight],
                  }}
                >
                  Theme preview for Cubicle Metrics Co. — data-driven cubicle dashboards.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: primaryShade100,
                    borderColor: primaryShade300,
                    color: primaryShade800,
                  }}
                >
                  Theme: {tokens.themeName || 'Midnight Fluorescent'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN - Cubicle Activity Feed (rows 1-2, 4 columns) */}
              <Card
                className="lg:col-span-4 lg:row-span-2 bg-card border transition-all duration-200 hover:shadow-lg group"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                  boxShadow: SHADOW_MAP[materials.card.shadow],
                  borderColor: borderColor,
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground whitespace-nowrap" style={{ fontFamily: fonts.heading }}>
                    Cubicle Activity Feed
                  </h3>
                  <div className="space-y-1">
                    {[
                      { icon: Coffee, name: 'Coffee Breaks', count: 47, colorIndex: 0 },
                      { icon: Printer, name: 'Paper Jams Fixed', count: 23, colorIndex: 1 },
                      { icon: FileText, name: 'TPS Reports Filed', count: 156, colorIndex: 2 },
                      { icon: Calendar, name: 'Meetings Survived', count: 89, colorIndex: 0 },
                      { icon: Mail, name: 'Reply-All Incidents', count: 12, colorIndex: 1 },
                      { icon: Phone, name: 'Conference Calls', count: 34, colorIndex: 2 },
                      { icon: Briefcase, name: 'Desk Lunches', count: 67, colorIndex: 0 },
                      { icon: Monitor, name: 'Screen Time Hours', count: 2840, colorIndex: 1 },
                    ].map((category, i) => {
                      const colorIndex = category.colorIndex
                      const Icon = category.icon
                      
                      let iconBg, iconBorder, iconColor
                      if (colorIndex === 0) {
                        iconBg = primaryShade300
                        iconBorder = primaryShade700
                        iconColor = primaryShade800
                      } else if (colorIndex === 1 && brandColors[1]) {
                        iconBg = getBrandColorShade(brandColors[1], '300')
                        iconBorder = getBrandColorShade(brandColors[1], '700')
                        iconColor = getBrandColorShade(brandColors[1], '800')
                      } else if (colorIndex === 2 && brandColors[2]) {
                        iconBg = tertiaryShade300
                        iconBorder = tertiaryShade700
                        iconColor = tertiaryShade800
                      } else {
                        iconBg = primaryShade300
                        iconBorder = primaryShade700
                        iconColor = primaryShade800
                      }
                      
                      return (
                        <div key={i} className="flex items-center gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer group/item">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform group-hover/item:scale-110"
                            style={{
                              backgroundColor: iconBg,
                              borderColor: iconBorder,
                            }}
                          >
                            <Icon className="w-5 h-5" style={{ color: iconColor }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm">{category.name}</div>
                            <div className="text-xs text-muted-foreground">{category.count} recorded</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      )
                    })}
                  </div>
                  <div className="pt-2 text-xs text-muted-foreground italic">
                    * Scientifically justified workplace vibes
                  </div>
                </CardContent>
              </Card>

              {/* MIDDLE-RIGHT COLUMN - Cubicle Satisfaction Score (rows 1-2, 8 columns) */}
              <Card
                className="lg:col-span-8 lg:row-span-2 bg-card border transition-all duration-200 hover:shadow-lg"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                  boxShadow: SHADOW_MAP[materials.card.shadow],
                  borderColor: borderColor,
                }}
              >
                <CardContent className="p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: fonts.heading }}>
                      Cubicle Satisfaction Score
                    </h3>
                    <span className="text-xs text-muted-foreground">Q2 2024</span>
                  </div>
                  <div className="text-4xl font-bold text-foreground" style={{ fontFamily: fonts.heading }}>
                    94.2%
                  </div>
                  <p className="text-xs text-muted-foreground">vs last period 92.8%</p>
                  
                  <div className="flex-1 flex items-end justify-center min-h-[200px] relative">
                    {/* Vertical grid lines behind bars */}
                    <div className="absolute inset-0 flex items-stretch justify-center w-full max-w-2xl mx-auto">
                      <div className="flex gap-3 w-full h-full">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 border-l border-dotted h-full"
                            style={{
                              borderColor: `${primaryShade600}4D`, // 30% opacity (hex 4D)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Bar chart */}
                    <div className="flex items-end justify-center gap-3 w-full max-w-2xl h-48 relative z-10">
                      {[
                        { height: 96, month: 'Jan' },
                        { height: 125, month: 'Feb' },
                        { height: 86, month: 'Mar' },
                        { height: 144, month: 'Apr' },
                        { height: 106, month: 'May' },
                        { height: 163, month: 'Jun' },
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer"
                            style={{
                              height: `${bar.height}px`,
                              backgroundColor: i % 3 === 0 
                                ? primaryShade600 
                                : i % 3 === 1 && brandColors[1]
                                  ? getBrandColorShade(brandColors[1], '600')
                                  : brandColors[2]
                                    ? tertiaryShade600
                                    : primaryShade500,
                              minHeight: '60px',
                            }}
                          />
                          <span className="text-xs text-muted-foreground">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* </CHANGE> */}
                  
                  <div className="pt-2 text-xs text-muted-foreground italic">
                    Metrics not evaluated by HR
                  </div>
                </CardContent>
              </Card>

              {/* ROW 3 - Buttons Primary (4 columns) */}
              <Card
                className="lg:col-span-4 bg-card border transition-all duration-200 hover:shadow-md"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                  boxShadow: SHADOW_MAP[materials.card.shadow],
                  borderColor: borderColor,
                }}
              >
                <CardContent className="p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Buttons · Primary</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Default', bg: primaryShade600, text: '#ffffff' },
                      { label: 'Hover', bg: primaryShade700, text: '#ffffff' },
                      { label: 'Active', bg: primaryShade800, text: '#ffffff' },
                      { label: 'Disabled', bg: containerBgColor, text: neutralText },
                    ].map((state, i) => (
                      <button
                        key={i}
                        disabled={state.label === 'Disabled'}
                        className="w-full py-2.5 px-4 font-medium text-sm transition-all"
                        style={{
                          backgroundColor: state.bg,
                          color: state.text,
                          borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                          opacity: state.label === 'Disabled' ? 0.5 : 1,
                          boxShadow: state.label === 'Default' ? '0 1px 3px rgba(0,0,0,0.1)' : state.label === 'Hover' ? '0 2px 4px rgba(0,0,0,0.15)' : 'none',
                        }}
                      >
                        {state.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ROW 3 - Buttons Soft (4 columns) */}
              <Card
                className="lg:col-span-4 bg-card border transition-all duration-200 hover:shadow-md"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                  boxShadow: SHADOW_MAP[materials.card.shadow],
                  borderColor: borderColor,
                }}
              >
                <CardContent className="p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Buttons · Soft</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Default', bg: primaryShade200, text: primaryShade800 },
                      { label: 'Hover', bg: primaryShade300, text: primaryShade800 },
                      { label: 'Active', bg: primaryShade400, text: '#ffffff' },
                      { label: 'Disabled', bg: containerBgColor, text: primaryShade300 },
                    ].map((state, i) => (
                      <button
                        key={i}
                        disabled={state.label === 'Disabled'}
                        className="w-full py-2.5 px-4 font-medium text-sm transition-all"
                        style={{
                          backgroundColor: state.bg,
                          color: state.text,
                          borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                          opacity: state.label === 'Disabled' ? 0.5 : 1,
                        }}
                      >
                        {state.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ROW 3 - Theme Tokens (4 columns) */}
              <Card
                className="lg:col-span-4 bg-card border"
                style={{
                  borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                  boxShadow: SHADOW_MAP[materials.card.shadow],
                  borderColor: borderColor,
                }}
              >
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Theme Tokens</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      `radius-${materials.card.borderRadius}`,
                      `font: ${fonts.heading.split(',')[0]}`,
                      `body: ${fonts.body.split(',')[0]}`,
                      'border: subtle',
                      `shadow: ${materials.card.shadow}`,
                      `btn-${materials.button.borderRadius}`,
                      `h1: ${tokens.fonts.h1Size}`,
                      `h2: ${tokens.fonts.h2Size}`,
                      `weight: ${tokens.fonts.h1Weight}`,
                      `spacing: ${tokens.fonts.h1Spacing}`,
                      `input-${materials.input.borderRadius}`,
                    ].map((token, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono border"
                        style={{
                          backgroundColor: primaryShade100,
                          borderColor: primaryShade300,
                          color: primaryShade800,
                        }}
                      >
                        {token}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ROW 4 - Stats Cards (3 cards spanning 12 columns) */}
              <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Income', amount: '$15,989', change: '$18,871 last period', colorIndex: 0 },
                  { label: 'Expenses', amount: '$12,543', change: '$10,221 last period', colorIndex: 1 },
                  { label: 'Savings', amount: '$5,210', change: '10,221 last period', colorIndex: 2 },
                ].map((stat, i) => {
                  const colorIndex = stat.colorIndex
                  
                  let fillColor, strokeColor
                  if (colorIndex === 0) {
                    fillColor = primaryShade400
                    strokeColor = primaryShade600
                  } else if (colorIndex === 1 && brandColors[1]) {
                    fillColor = getBrandColorShade(brandColors[1], '400')
                    strokeColor = getBrandColorShade(brandColors[1], '600')
                  } else if (colorIndex === 2 && brandColors[2]) {
                    fillColor = tertiaryShade400
                    strokeColor = tertiaryShade600
                  } else {
                    fillColor = primaryShade400
                    strokeColor = primaryShade600
                  }

                  return (
                    <Card
                      key={i}
                      className="bg-card border transition-all duration-200 hover:shadow-md"
                      style={{
                        borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                        boxShadow: SHADOW_MAP[materials.card.shadow],
                        borderColor: borderColor,
                      }}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                        <div className="text-2xl font-bold text-foreground" style={{ fontFamily: fonts.heading }}>
                          {stat.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.change}</div>
                        <div className="h-12 w-full pt-2">
                          <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop 
                                  offset="0%" 
                                  style={{ 
                                    stopColor: fillColor, 
                                    stopOpacity: 0.3 
                                  }} 
                                />
                                <stop 
                                  offset="100%" 
                                  style={{ 
                                    stopColor: strokeColor, 
                                    stopOpacity: 0 
                                  }} 
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 0 25 Q 50 15 100 20 T 200 12 L 200 40 L 0 40 Z"
                              fill={`url(#gradient-${i})`}
                            />
                            <path
                              d="M 0 25 Q 50 15 100 20 T 200 12"
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth="3"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="text-center space-y-3">
              <h2
                className="text-foreground"
                style={{
                  fontFamily: fonts.heading,
                  fontSize: FONT_SIZE_MAP[tokens.fonts.h2Size],
                  fontWeight: FONT_WEIGHT_MAP[tokens.fonts.h2Weight],
                  textTransform: TEXT_TRANSFORM_MAP[tokens.fonts.h2Transform],
                  letterSpacing: LETTER_SPACING_MAP[tokens.fonts.h2Spacing],
                  lineHeight: LINE_HEIGHT_MAP[tokens.fonts.h2LineHeight],
                }}
              >
                Choose Your Plan
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: 'The Intern', price: '$299', features: ['Recycled cubicle walls', 'Motivational poster (1)', 'Complimentary fluorescent lighting', 'Email access', 'Fruit Snacks (limited 1 per week)'] },
                { name: 'The Middle Manager', price: '$799', features: ['Corner cubicle (near window)', 'Ergonomic desk chair (refurbished)', 'White noise machine', 'Coffee maker access', 'Passive-aggressive sticky notes'], popular: true },
                { name: 'The C-Suite', price: '$1,999', features: ['Premium particle board desk', 'Two monitors (both working)', 'Door with frosted glass', 'Unlimited meeting room bookings', 'Personalized nameplate'] },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground relative"
                  style={{
                    borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
                    boxShadow: plan.popular ? `0 0 0 2px ${primaryColor}` : SHADOW_MAP[materials.card.shadow],
                    borderColor: plan.popular ? primaryColor : borderColor,
                  }}
                >
                  {plan.popular && (
                    <div 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: primaryColor, color: primaryTextColor }}
                    >
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg" style={{ fontFamily: fonts.heading }}>{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold" style={{ color: primaryShade600, fontFamily: fonts.heading }}>{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/per trapped employee</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" 
                            style={{ backgroundColor: primaryShade100 }}>
                            <Check className="w-3 h-3" style={{ color: primaryShade600 }} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      style={plan.popular ? {
                        backgroundColor: primaryShade600,
                        color: primaryTextColor,
                        borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                      } : {
                        borderColor: primaryShade300,
                        color: primaryShade600,
                        backgroundColor: 'transparent',
                        borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section
            className="p-12 text-center space-y-4"
            style={{
              borderRadius: BORDER_RADIUS_MAP[materials.card.borderRadius],
              boxShadow: SHADOW_MAP[materials.card.shadow],
              backgroundColor: ctaBgColor,
              color: ctaTextColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="mb-3"
              style={{
                fontFamily: fonts.heading,
                fontSize: FONT_SIZE_MAP[tokens.fonts.h2Size],
                fontWeight: FONT_WEIGHT_MAP[tokens.fonts.h2Weight],
                color: ctaTextColor,
                textTransform: TEXT_TRANSFORM_MAP[tokens.fonts.h2Transform],
                letterSpacing: LETTER_SPACING_MAP[tokens.fonts.h2Spacing],
                lineHeight: LINE_HEIGHT_MAP[tokens.fonts.h2LineHeight],
              }}
            >
              Ready to Transform Your Office?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ 
              color: ctaTextColor, 
              opacity: 0.9,
              fontSize: FONT_SIZE_MAP[tokens.fonts.paragraphSize],
              fontWeight: FONT_WEIGHT_MAP[tokens.fonts.paragraphWeight],
              lineHeight: LINE_HEIGHT_MAP[tokens.fonts.paragraphLineHeight],
            }}>
              Join the few managers who have forced TPS reports to get done correctly the first time.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: ctaTextColor,
                  color: ctaTextColor,
                  backgroundColor: 'transparent',
                  borderRadius: BORDER_RADIUS_MAP[materials.button.borderRadius],
                }}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
