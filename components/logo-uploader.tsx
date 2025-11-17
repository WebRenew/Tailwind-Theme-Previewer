'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LogoUploaderProps {
  logo: string | null
  onLogoChange: (logo: string | null) => void
}

export function LogoUploader({ logo, onLogoChange }: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (event) => {
      onLogoChange(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    onLogoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Logo</label>
      <div className="flex items-start gap-3">
        {logo ? (
          <div className="relative flex-shrink-0">
            <img
              src={logo || "/placeholder.svg"}
              alt="Brand logo"
              className="h-16 w-16 rounded-lg border border-border object-contain bg-muted"
            />
            <button
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
              aria-label="Remove logo"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-border bg-muted">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="logo-upload"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            {logo ? 'Change Logo' : 'Upload Logo'}
          </Button>
          {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
      </div>
    </div>
  )
}
