import type { Meta } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Recipeer Design System</h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive collection of reusable components, design tokens, and guidelines for building consistent, accessible, and delightful recipe experiences.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Overview</h2>
            <p className="text-lg leading-relaxed">
              This design system is built with <strong>Component-Driven Development</strong> principles, leveraging modern web technologies:
            </p>
            
            <ul className="space-y-2 text-lg pl-6">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>React 19</strong> with TypeScript</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Tailwind CSS</strong> for styling with custom design tokens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>shadcn/ui</strong> as the foundation component library</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Lucide React</strong> for icons</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>Storybook</strong> for component documentation and testing</span>
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Design Philosophy</h2>
            <p className="text-lg leading-relaxed">
              Our design system is crafted specifically for recipe applications with these core principles:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  🎨 <span>Recipe-Focused Aesthetics</span>
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Warm, inviting color palettes that evoke comfort and appetite</li>
                  <li>• Typography combinations that enhance readability for cooking instructions</li>
                  <li>• Visual hierarchy that guides users through recipe steps naturally</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  📱 <span>Accessibility First</span>
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• WCAG 2.1 AA compliance across all components</li>
                  <li>• High contrast ratios for readability in kitchen environments</li>
                  <li>• Keyboard navigation support for hands-free cooking</li>
                  <li>• Screen reader optimization for inclusive cooking experiences</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  🔧 <span>Developer Experience</span>
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Type-safe component APIs with comprehensive prop documentation</li>
                  <li>• Consistent naming conventions and predictable behavior</li>
                  <li>• Minimal bundle size with tree-shaking support</li>
                  <li>• Easy customization through Tailwind CSS utilities</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  📐 <span>Scalable Architecture</span>
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Modular component design following single responsibility principle</li>
                  <li>• Design tokens system for consistent spacing, colors, and typography</li>
                  <li>• Theme support for different recipe site personalities</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Getting Started</h2>
            <p className="text-lg leading-relaxed">
              Explore the design system through these sections:
            </p>
            
            <div className="grid gap-4">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">1. Foundation</h3>
                <p className="text-muted-foreground">Colors, typography, spacing, and other design tokens</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">2. Components</h3>
                <p className="text-muted-foreground">Reusable UI building blocks with comprehensive examples</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">3. Patterns</h3>
                <p className="text-muted-foreground">Common component combinations and layouts for recipe sites</p>
              </div>
            </div>
            
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-lg">
                Each component includes:
              </p>
              <ul className="mt-3 space-y-1 text-muted-foreground pl-6">
                <li>• Live examples with interactive controls</li>
                <li>• Usage guidelines and best practices</li>
                <li>• Accessibility considerations</li>
                <li>• Code snippets for implementation</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Typography Themes</h2>
            <p className="text-lg leading-relaxed">
              Choose from three carefully crafted typography combinations:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg space-y-3">
                <h3 className="text-xl font-semibold">Classic & Cozy</h3>
                <p className="text-muted-foreground">Elegant serif headings with clean body text</p>
              </div>
              <div className="p-6 border rounded-lg space-y-3">
                <h3 className="text-xl font-semibold">Modern Warmth</h3>
                <p className="text-muted-foreground">Friendly rounded fonts with high readability</p>
              </div>
              <div className="p-6 border rounded-lg space-y-3">
                <h3 className="text-xl font-semibold">Rustic Charm</h3>
                <p className="text-muted-foreground">Traditional serifs with handwritten accents</p>
              </div>
            </div>
          </section>

          <div className="text-center py-8 border-t">
            <p className="text-xl">
              <em>Happy cooking, happy coding!</em> 👩‍🍳👨‍💻
            </p>
          </div>
        </div>
      ),
    },
  },
};

export default meta;

export const Introduction = {};