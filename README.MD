# Tailwind Theme Previewer

A powerful, interactive tool for designing, previewing, and exporting custom Tailwind CSS themes in real-time. Test your color schemes, typography, and design tokens across realistic UI components before implementing them in your projects.

![Tailwind Theme Previewer](# Tailwind Theme Previewer

A powerful, interactive tool for designing, previewing, and exporting custom Tailwind CSS themes in real-time. Test your color schemes, typography, and design tokens across realistic UI components before implementing them in your projects.

![Tailwind Theme Previewer](preview.png)

## ✨ Features

### Real-Time Preview
- **Live Component Rendering**: See your theme changes instantly across multiple UI components including navigation bars, hero sections, cards, and data visualizations
- **Interactive Controls**: Adjust colors, typography, and material properties with instant visual feedback
- **Multiple Preview Modes**: Test your themes across different layouts and component combinations

### Theme Customization
- **Colors**: Full control over your color palette including primary, secondary, accent, and semantic colors
- **Typography**: Configure font families, sizes, weights, and line heights
- **Materials**: Adjust spacing, borders, shadows, and other design tokens
- **YOLO Mode**: Randomize theme settings for creative exploration and inspiration

### Export Functionality
- **Token Export**: Export your complete theme as Tailwind configuration tokens
- **Multiple Formats**: Support for various export formats compatible with Tailwind CSS config files
- **Ready to Use**: Generated tokens are production-ready and can be dropped directly into your `tailwind.config.js`

### Built-in Themes
- **Curated Presets**: Start with professionally designed themes like "Midnight Fluorescent"
- **Theme Library**: Browse and apply pre-built themes as starting points
- **Save & Load**: Persist your custom themes for future use

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tailwind-theme-previewer.git

# Navigate to the project directory
cd tailwind-theme-previewer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage

### Basic Workflow

1. **Start with a Base Theme**: Choose a preset theme or start from scratch
2. **Customize Colors**: Expand the "Colors" section in the sidebar to adjust your palette
3. **Configure Typography**: Set your font preferences in the "Typography" section
4. **Adjust Materials**: Fine-tune spacing, shadows, and other design tokens
5. **Preview in Real-Time**: Watch your changes apply instantly to the preview components
6. **Export Tokens**: Click "Export Tokens" to generate your Tailwind config

### YOLO Mode 🎲

Enable YOLO Mode for random theme generation:
- Toggle the YOLO MODE switch in the sidebar
- Get instant creative inspiration with randomized color palettes
- Use as a starting point for your custom theme

### Exporting Themes

1. Click the **"Export Tokens"** button in the top-right corner
2. Choose your export format (JavaScript, JSON, or TypeScript)
3. Copy the generated configuration
4. Paste into your `tailwind.config.js` or `tailwind.config.ts`

Example export:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          // ... your custom colors
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // ... your fonts
      }
    }
  }
}
```

## 🎨 Configuration

### Customizing Preview Components

Edit the preview components in `/src/components/preview/` to match your typical UI patterns:

- `NavigationBar.tsx` - Header/navigation patterns
- `HeroSection.tsx` - Landing page hero sections
- `MetricsCard.tsx` - Dashboard and data visualization components
- `ActivityFeed.tsx` - List and feed components

### Adding Custom Themes

Create new theme presets in `/src/themes/`:

```typescript
export const myCustomTheme = {
  name: 'My Custom Theme',
  colors: {
    primary: '#your-color',
    // ... more colors
  },
  typography: {
    // ... typography settings
  }
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3.4
- **UI Components**: React 18
- **State Management**: React Hooks
- **Type Safety**: TypeScript
- **Build Tool**: Turbopack

## 📁 Project Structure

```
tailwind-theme-previewer/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── preview/      # Preview components
│   │   ├── controls/     # Theme control panels
│   │   └── ui/           # Shared UI components
│   ├── themes/           # Theme presets
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Known Issues

- Large custom fonts may cause initial load delays
- Export feature requires clipboard permissions in some browsers

## 📝 Roadmap

- [ ] Dark/Light mode toggle for preview
- [ ] Animation and transition previews
- [ ] Responsive breakpoint testing
- [ ] Theme versioning and history
- [ ] Collaborative theme editing
- [ ] Integration with design tools (Figma, Sketch)
- [ ] Component library integration
- [ ] CSS variable export option

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tailwind CSS team for the amazing framework
- The open-source community for inspiration and contributions
- All contributors who have helped improve this tool

## 📧 Contact

For questions, suggestions, or issues:
- Open an issue on GitHub
- Email: your-email@example.com
- Twitter: @yourusername

---

**Built with ❤️ by developers, for developers**

⭐ Star this repo if you find it helpful!)

## ✨ Features

### Real-Time Preview
- **Live Component Rendering**: See your theme changes instantly across multiple UI components including navigation bars, hero sections, cards, and data visualizations
- **Interactive Controls**: Adjust colors, typography, and material properties with instant visual feedback
- **Multiple Preview Modes**: Test your themes across different layouts and component combinations

### Theme Customization
- **Colors**: Full control over your color palette including primary, secondary, accent, and semantic colors
- **Typography**: Configure font families, sizes, weights, and line heights
- **Materials**: Adjust spacing, borders, shadows, and other design tokens
- **YOLO Mode**: Randomize theme settings for creative exploration and inspiration

### Export Functionality
- **Token Export**: Export your complete theme as Tailwind configuration tokens
- **Multiple Formats**: Support for various export formats compatible with Tailwind CSS config files
- **Ready to Use**: Generated tokens are production-ready and can be dropped directly into your `tailwind.config.js`

### Built-in Themes
- **Curated Presets**: Start with professionally designed themes like "Midnight Fluorescent"
- **Theme Library**: Browse and apply pre-built themes as starting points
- **Save & Load**: Persist your custom themes for future use

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tailwind-theme-previewer.git

# Navigate to the project directory
cd tailwind-theme-previewer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage

### Basic Workflow

1. **Start with a Base Theme**: Choose a preset theme or start from scratch
2. **Customize Colors**: Expand the "Colors" section in the sidebar to adjust your palette
3. **Configure Typography**: Set your font preferences in the "Typography" section
4. **Adjust Materials**: Fine-tune spacing, shadows, and other design tokens
5. **Preview in Real-Time**: Watch your changes apply instantly to the preview components
6. **Export Tokens**: Click "Export Tokens" to generate your Tailwind config

### YOLO Mode 🎲

Enable YOLO Mode for random theme generation:
- Toggle the YOLO MODE switch in the sidebar
- Get instant creative inspiration with randomized color palettes
- Use as a starting point for your custom theme

### Exporting Themes

1. Click the **"Export Tokens"** button in the top-right corner
2. Choose your export format (JavaScript, JSON, or TypeScript)
3. Copy the generated configuration
4. Paste into your `tailwind.config.js` or `tailwind.config.ts`

Example export:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          // ... your custom colors
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // ... your fonts
      }
    }
  }
}
```

## 🎨 Configuration

### Customizing Preview Components

Edit the preview components in `/src/components/preview/` to match your typical UI patterns:

- `NavigationBar.tsx` - Header/navigation patterns
- `HeroSection.tsx` - Landing page hero sections
- `MetricsCard.tsx` - Dashboard and data visualization components
- `ActivityFeed.tsx` - List and feed components

### Adding Custom Themes

Create new theme presets in `/src/themes/`:

```typescript
export const myCustomTheme = {
  name: 'My Custom Theme',
  colors: {
    primary: '#your-color',
    // ... more colors
  },
  typography: {
    // ... typography settings
  }
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3.4
- **UI Components**: React 18
- **State Management**: React Hooks
- **Type Safety**: TypeScript
- **Build Tool**: Turbopack

## 📁 Project Structure

```
tailwind-theme-previewer/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── preview/      # Preview components
│   │   ├── controls/     # Theme control panels
│   │   └── ui/           # Shared UI components
│   ├── themes/           # Theme presets
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Known Issues

- Large custom fonts may cause initial load delays
- Export feature requires clipboard permissions in some browsers

## 📝 Roadmap

- [ ] Dark/Light mode toggle for preview
- [ ] Animation and transition previews
- [ ] Responsive breakpoint testing
- [ ] Theme versioning and history
- [ ] Collaborative theme editing
- [ ] Integration with design tools (Figma, Sketch)
- [ ] Component library integration
- [ ] CSS variable export option

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tailwind CSS team for the amazing framework
- The open-source community for inspiration and contributions
- All contributors who have helped improve this tool

## 📧 Contact

For questions, suggestions, or issues:
- Open an issue on GitHub
- Email: your-email@example.com
- Twitter: @yourusername

---

**Built with ❤️ by developers, for developers**

⭐ Star this repo if you find it helpful!




Made by

██╗    ██╗███████╗██████╗ ██████╗ ███████╗███╗   ██╗███████╗██╗    ██╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔════╝██║    ██║
██║ █╗ ██║█████╗  ██████╔╝██████╔╝█████╗  ██╔██╗ ██║█████╗  ██║ █╗ ██║
██║███╗██║██╔══╝  ██╔══██╗██╔══██╗██╔══╝  ██║╚██╗██║██╔══╝  ██║███╗██║
╚███╔███╔╝███████╗██████╔╝██║  ██║███████╗██║ ╚████║███████╗╚███╔███╔╝
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝ 

on

             /$$$$$$ 
            /$$$_  $$
 /$$    /$$| $$$$\ $$
|  $$  /$$/| $$ $$ $$
 \  $$/$$/ | $$\ $$$$
  \  $$$/  | $$ \ $$$
   \  $/   |  $$$$$$/
    \_/     \______/
