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
      spacing: {
        'recipe-card': 'var(--space-recipe-card)',
        'content-gap': 'var(--space-content-gap)',
        'ingredient-gap': 'var(--space-ingredient-gap)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      boxShadow: {
        xs: "0px 1px 2px 0px hsl(0 0% 0% / 0.05)",
        sm: "0px 1px 2px 0px hsl(0 0% 0% / 0.05), 0px 0px 0px 1px hsl(0 0% 0% / 0.05)",
        md: "0px 2px 4px -1px hsl(0 0% 0% / 0.1), 0px 4px 6px -1px hsl(0 0% 0% / 0.1)",
        lg: "0px 4px 6px -2px hsl(0 0% 0% / 0.1), 0px 10px 15px -3px hsl(0 0% 0% / 0.1)",
        xl: "0px 10px 10px -5px hsl(0 0% 0% / 0.1), 0px 20px 25px -5px hsl(0 0% 0% / 0.1)",
        "2xl": "0px 25px 50px -12px hsl(0 0% 0% / 0.25)",
        inner: "inset 0px 2px 4px 0px hsl(0 0% 0% / 0.05)",
        // Enhanced recipe-specific shadows
        'recipe-card': "0px 2px 8px -2px hsl(0 0% 0% / 0.1), 0px 4px 12px -4px hsl(0 0% 0% / 0.08)",
        'recipe-card-hover': "0px 4px 12px -3px hsl(0 0% 0% / 0.15), 0px 8px 20px -6px hsl(0 0% 0% / 0.12)",
        'food-image': "0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 1px 2px -1px hsl(0 0% 0% / 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};