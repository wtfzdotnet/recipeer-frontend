import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps {
  /** Typography combination to use */
  combination?: 'classic-cozy' | 'modern-warmth' | 'rustic-charm';
  /** Whether to show example content or just style guide */
  showExample?: boolean;
  /** Custom className */
  className?: string;
}

const fontCombinations = {
  'classic-cozy': {
    heading: 'font-playfair',
    body: 'font-source-sans',
    accent: 'font-caveat',
    name: 'Classic & Cozy',
    description: 'Elegant serif headings with clean, readable body text and casual script accents'
  },
  'modern-warmth': {
    heading: 'font-poppins',
    body: 'font-open-sans',
    accent: 'font-merriweather',
    name: 'Modern Warmth',
    description: 'Friendly, rounded headings with highly readable body text and warm serif accents'
  },
  'rustic-charm': {
    heading: 'font-crimson',
    body: 'font-lato',
    accent: 'font-dancing-script',
    name: 'Rustic Charm',
    description: 'Traditional serif headings with approachable body text and elegant script elements'
  }
};

export const Typography: React.FC<TypographyProps> = ({
  combination = 'classic-cozy',
  showExample = true,
  className
}) => {
  const fonts = fontCombinations[combination];

  if (!showExample) {
    // Style guide view
    return (
      <div className={cn('max-w-4xl p-8 space-y-12', className)}>
        <div className="space-y-4">
          <h1 className={cn('text-4xl font-bold tracking-warm', fonts.heading)}>
            {fonts.name}
          </h1>
          <p className={cn('text-lg text-muted-foreground leading-relaxed-reading', fonts.body)}>
            {fonts.description}
          </p>
        </div>

        {/* Heading Hierarchy */}
        <section className="space-y-6">
          <h2 className={cn('text-2xl font-semibold border-b pb-2', fonts.heading)}>
            Heading Hierarchy
          </h2>
          
          <div className="space-y-4">
            <div>
              <h1 className={cn('text-4xl font-bold tracking-warm', fonts.heading)}>
                H1 - Main Recipe Title (36px)
              </h1>
              <p className={cn('text-sm text-muted-foreground mt-1', fonts.body)}>
                Used for recipe names and page titles
              </p>
            </div>
            
            <div>
              <h2 className={cn('text-3xl font-semibold tracking-warm', fonts.heading)}>
                H2 - Section Headers (28px)
              </h2>
              <p className={cn('text-sm text-muted-foreground mt-1', fonts.body)}>
                Used for Ingredients, Instructions, Notes
              </p>
            </div>
            
            <div>
              <h3 className={cn('text-2xl font-medium tracking-warm', fonts.heading)}>
                H3 - Subsection Headers (24px)
              </h3>
              <p className={cn('text-sm text-muted-foreground mt-1', fonts.body)}>
                Used for prep steps, cooking methods
              </p>
            </div>
            
            <div>
              <h4 className={cn('text-xl font-medium tracking-warm', fonts.heading)}>
                H4 - Minor Headers (20px)
              </h4>
              <p className={cn('text-sm text-muted-foreground mt-1', fonts.body)}>
                Used for tips, variations
              </p>
            </div>
          </div>
        </section>

        {/* Body Text Styles */}
        <section className="space-y-6">
          <h2 className={cn('text-2xl font-semibold border-b pb-2', fonts.heading)}>
            Body Text Styles
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className={cn('text-lg leading-relaxed-reading tracking-warm', fonts.body)}>
                Large Body Text (18px) - Used for ingredient lists and important instructions
              </p>
            </div>
            
            <div>
              <p className={cn('text-base leading-relaxed-reading tracking-warm', fonts.body)}>
                Regular Body Text (16px) - Used for cooking instructions and general content
              </p>
            </div>
            
            <div>
              <p className={cn('text-sm leading-relaxed-reading tracking-warm', fonts.body)}>
                Small Text (14px) - Used for cooking times, temperatures, and serving info
              </p>
            </div>
          </div>
        </section>

        {/* Accent & Special Styles */}
        <section className="space-y-6">
          <h2 className={cn('text-2xl font-semibold border-b pb-2', fonts.heading)}>
            Accent & Special Styles
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg border-l-4 border-primary">
              <p className={cn('text-lg italic text-secondary-foreground', fonts.accent)}>
                "Grandma's Secret" - Chef's notes and personal tips
              </p>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg border-l-4 border-warning">
              <p className={cn('text-base font-medium text-warning-foreground', fonts.body)}>
                <strong>Cooking Tip:</strong> High contrast text for important instructions
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Example recipe content
  return (
    <div className={cn('max-w-4xl p-8 space-y-8 bg-gradient-to-br from-secondary to-accent', className)}>
      <header className="text-center space-y-4 pb-8 border-b border-border">
        <h1 className={cn('text-4xl md:text-5xl font-bold text-foreground tracking-warm drop-shadow-sm', fonts.heading)}>
          Grandma's Apple Cinnamon Bread
        </h1>
        <p className={cn('text-lg text-foreground leading-comfortable tracking-warm', fonts.body)}>
          A warm, comforting recipe passed down through generations. Perfect for cozy autumn mornings 
          with a cup of coffee and good company.
        </p>
        <div className={cn('flex justify-center gap-8 text-sm text-muted-foreground', fonts.body)}>
          <span>⏱️ Prep: 15 min</span>
          <span>🔥 Cook: 60 min</span>
          <span>👥 Serves: 8</span>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className={cn('text-3xl font-semibold text-foreground tracking-warm', fonts.heading)}>
          Ingredients
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className={cn('text-xl font-medium text-foreground', fonts.heading)}>
              Dry Ingredients
            </h3>
            <ul className={cn('space-y-2 text-lg leading-relaxed-reading tracking-warm', fonts.body)}>
              {[
                '2 cups all-purpose flour',
                '1 tsp baking soda',
                '1 tsp ground cinnamon',
                '½ tsp salt',
                '¼ tsp nutmeg'
              ].map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className={cn('text-xl font-medium text-foreground', fonts.heading)}>
              Wet Ingredients
            </h3>
            <ul className={cn('space-y-2 text-lg leading-relaxed-reading tracking-warm', fonts.body)}>
              {[
                '3 ripe apples, peeled and diced',
                '⅓ cup melted butter',
                '¾ cup brown sugar',
                '1 large egg',
                '1 tsp vanilla extract'
              ].map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className={cn('text-3xl font-semibold text-foreground tracking-warm', fonts.heading)}>
          Instructions
        </h2>
        
        <ol className={cn('space-y-4 text-base leading-relaxed-reading tracking-warm', fonts.body)}>
          {[
            'Preheat your oven to 350°F (175°C). Grease a 9x5 inch loaf pan.',
            'In a large bowl, whisk together flour, baking soda, cinnamon, salt, and nutmeg.',
            'In another bowl, mix melted butter and brown sugar until well combined.',
            'Beat in the egg and vanilla extract until smooth.',
            'Gradually fold the wet ingredients into the dry ingredients. Don\'t overmix.',
            'Gently fold in the diced apples, ensuring they\'re evenly distributed.',
            'Pour batter into the prepared loaf pan and smooth the top.',
            'Bake for 55-60 minutes, or until a toothpick inserted in the center comes out clean.',
            'Cool in the pan for 10 minutes, then turn out onto a wire rack.'
          ].map((step, index) => (
            <li key={index} className="flex gap-4 text-orange-800">
              <span className={cn('flex-shrink-0 w-8 h-8 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center font-bold text-sm', fonts.body)}>
                {index + 1}
              </span>
              <span className="pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
        <h3 className={cn('text-xl font-medium text-orange-900 mb-3', fonts.heading)}>
          Chef's Notes
        </h3>
        <p className={cn('text-lg italic text-orange-800 leading-comfortable', fonts.accent)}>
          "The secret to extra moist bread is using really ripe apples and not overbaking. 
          I like to add a pinch of cardamom for a special warmth that reminds me of autumn mornings."
        </p>
        <p className={cn('text-sm text-orange-700 mt-3 leading-relaxed-reading', fonts.body)}>
          <strong>Storage:</strong> Wrap tightly and store at room temperature for up to 3 days, 
          or freeze for up to 3 months.
        </p>
      </div>
    </div>
  );
};

export default Typography;