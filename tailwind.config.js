/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Trust-building blue - blue-600
        'primary-50': '#EFF6FF', // Light blue tint - blue-50
        'primary-100': '#DBEAFE', // Lighter blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-700': '#1D4ED8', // Darker blue - blue-700
        'primary-900': '#1E3A8A', // Darkest blue - blue-900
        
        // Secondary Colors
        'secondary': '#059669', // Success-oriented green - emerald-600
        'secondary-50': '#ECFDF5', // Light green tint - emerald-50
        'secondary-100': '#D1FAE5', // Lighter green - emerald-100
        'secondary-500': '#10B981', // Medium green - emerald-500
        'secondary-700': '#047857', // Darker green - emerald-700
        'secondary-900': '#064E3B', // Darkest green - emerald-900
        
        // Accent Colors
        'accent': '#DC2626', // Strategic red - red-600
        'accent-50': '#FEF2F2', // Light red tint - red-50
        'accent-100': '#FEE2E2', // Lighter red - red-100
        'accent-500': '#EF4444', // Medium red - red-500
        'accent-700': '#B91C1C', // Darker red - red-700
        'accent-900': '#7F1D1D', // Darkest red - red-900
        
        // Background Colors
        'background': '#FAFAFA', // Warm off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white
        
        // Text Colors
        'text-primary': '#111827', // Near-black - gray-900
        'text-secondary': '#6B7280', // Medium gray - gray-500
        'text-muted': '#9CA3AF', // Light gray - gray-400
        
        // Status Colors
        'success': '#10B981', // Vibrant green - emerald-500
        'warning': '#F59E0B', // Amber warning - amber-500
        'error': '#EF4444', // Clear red error - red-500
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}