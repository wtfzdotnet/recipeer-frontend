import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <span className="font-bold text-xl">Recipeer</span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/recipes" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Recipes
              </Link>
              <Link 
                to="/categories" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Categories
              </Link>
              <Link 
                to="/chefs" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Chefs
              </Link>
              <Link 
                to="/community" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Community
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🍳</span>
                <span className="font-bold">Recipeer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your ultimate recipe authority platform for discovering, creating, and sharing amazing recipes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Discover</h3>
              <div className="space-y-2 text-sm">
                <Link to="/recipes" className="block text-muted-foreground hover:text-primary">
                  All Recipes
                </Link>
                <Link to="/categories" className="block text-muted-foreground hover:text-primary">
                  Categories
                </Link>
                <Link to="/search" className="block text-muted-foreground hover:text-primary">
                  Search
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <div className="space-y-2 text-sm">
                <Link to="/chefs" className="block text-muted-foreground hover:text-primary">
                  Featured Chefs
                </Link>
                <Link to="/community" className="block text-muted-foreground hover:text-primary">
                  Community
                </Link>
                <Link to="/reviews" className="block text-muted-foreground hover:text-primary">
                  Reviews
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-muted-foreground hover:text-primary">
                  About
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">
                  Contact
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary">
                  Privacy
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-primary">
                  Terms
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Recipeer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;