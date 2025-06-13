/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Classic & Cozy combination
        'playfair': ['Playfair Display', 'serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'caveat': ['Caveat', 'cursive'],
        
        // Modern Warmth combination
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        
        // Rustic Charm combination
        'crimson': ['Crimson Text', 'serif'],
        'lato': ['Lato', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      letterSpacing: {
        'warm': '0.02em',
      },
      lineHeight: {
        'relaxed-reading': '1.6',
        'comfortable': '1.8',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        chart: {
          "1": "oklch(var(--chart-1))",
          "2": "oklch(var(--chart-2))",
          "3": "oklch(var(--chart-3))",
          "4": "oklch(var(--chart-4))",
          "5": "oklch(var(--chart-5))",
        },
      },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        md: "0px 2px 4px -1px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0px 4px 6px -2px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0px 10px 10px -5px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};