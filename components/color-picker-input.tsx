'use client'

interface ColorPickerInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPickerInput({ label, value, onChange }: ColorPickerInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg focus:outline-none focus:ring-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-0"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
