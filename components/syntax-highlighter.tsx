'use client'

interface SyntaxHighlighterProps {
  code: string
  language: 'css' | 'javascript'
}

export function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  const highlightCSS = (text: string) => {
    return text
      .replace(/(\/\*[^*]*\*\/)/g, '<span class="text-zinc-500">$1</span>')
      .replace(/(:root|\.[a-zA-Z-]+|#[a-zA-Z-]+)/g, '<span class="text-teal-400">$1</span>')
      .replace(/(--[a-zA-Z-]+):/g, '<span class="text-indigo-400">$1</span>:')
      .replace(/:\s*([^;]+);/g, ': <span class="text-cyan-400">$1</span>;')
      .replace(/({|})/g, '<span class="text-zinc-400">$1</span>')
  }

  const highlightJavaScript = (text: string) => {
    return text
      .replace(/(\/\/[^\n]*)/g, '<span class="text-zinc-500">$1</span>')
      .replace(/(module\.exports|theme|extend|colors|fontFamily|fontSize|borderRadius|boxShadow)/g, '<span class="text-indigo-400">$1</span>')
      .replace(/([a-zA-Z-]+):/g, '<span class="text-teal-400">$1</span>:')
      .replace(/'([^']*)'/g, "'<span class=\"text-cyan-400\">$1</span>'")
      .replace(/({|}|\[|\])/g, '<span class="text-zinc-400">$1</span>')
  }

  const highlightedCode = language === 'css' ? highlightCSS(code) : highlightJavaScript(code)

  return (
    <pre className="overflow-x-auto rounded-lg p-4 text-xs text-zinc-100" style={{ backgroundColor: 'hsl(0, 0%, 6%)' }}>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  )
}
