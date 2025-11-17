'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandTokens } from '@/types/brand'
import { Copy, Check } from 'lucide-react'

interface TokenExportPanelProps {
  tokens: BrandTokens
}

export function TokenExportPanel({ tokens }: TokenExportPanelProps) {
  const [copied, setCopied] = useState(false)

  const generateCSSVariables = () => {
    const borderRadius = tokens.borderStyle === 'rounded' ? '0.75rem' : '0.25rem'
    
    return `:root {
  --brand-primary: ${tokens.colors.primary};
  --brand-secondary: ${tokens.colors.secondary};
  --brand-accent: ${tokens.colors.accent};
  --brand-background: ${tokens.colors.background};
  --brand-surface: ${tokens.colors.surface};
  --brand-radius: ${borderRadius};
  --brand-font-heading: ${tokens.fontPairing.heading};
  --brand-font-body: ${tokens.fontPairing.body};
}`
  }

  const generateTailwindConfig = () => {
    const borderRadius = tokens.borderStyle === 'rounded' ? '0.75rem' : '0.25rem'
    
    return `// tailwind.config.js theme extension
theme: {
  extend: {
    colors: {
      brand: {
        primary: '${tokens.colors.primary}',
        secondary: '${tokens.colors.secondary}',
        accent: '${tokens.colors.accent}',
        background: '${tokens.colors.background}',
        surface: '${tokens.colors.surface}',
      },
    },
    borderRadius: {
      brand: '${borderRadius}',
    },
    fontFamily: {
      heading: [${tokens.fontPairing.heading.split(',').map(f => `'${f.trim()}'`).join(', ')}],
      body: [${tokens.fontPairing.body.split(',').map(f => `'${f.trim()}'`).join(', ')}],
    },
  },
}`
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const cssVariables = generateCSSVariables()
  const tailwindConfig = generateTailwindConfig()

  return (
    <div className="border-t border-border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Design Tokens</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Export your brand tokens for use in your projects
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">CSS Variables</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopy(cssVariables)}
            className="h-8 gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            <code>{cssVariables}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base">Tailwind Config</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopy(tailwindConfig)}
            className="h-8 gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            <code>{tailwindConfig}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
