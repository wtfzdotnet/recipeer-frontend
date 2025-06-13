import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card/card';

const meta: Meta = {
  title: 'Design System/Patterns/Login Form',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Login Form Pattern

A complete login form pattern that combines multiple design system components for user authentication.

## Components Used

- **Card** - Container for the form
- **Input** - Email and password fields with icons
- **Button** - Primary and secondary actions
- **Typography** - Consistent text styling

## Features

- **Accessible** - Proper form labels and validation
- **Responsive** - Works on all device sizes  
- **Icon Integration** - Visual cues for input types
- **Error Handling** - Clear error state presentation
- **Loading States** - Feedback during form submission

## Usage

This pattern can be used as a starting point for:
- User login pages
- Modal login forms
- Registration forms (with modifications)
- Account access flows
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;

export const BasicLogin = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your Recipeer account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          startIcon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          startIcon={<Lock className="h-4 w-4" />}
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">Sign In</Button>
        <div className="text-center">
          <Button variant="link" className="text-sm">
            Forgot your password?
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic login form with email and password fields.'
      }
    }
  }
};

export const LoginWithValidation = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your Recipeer account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          startIcon={<Mail className="h-4 w-4" />}
          value="invalid-email"
          error="Please enter a valid email address"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          startIcon={<Lock className="h-4 w-4" />}
          endIcon={<Eye className="h-4 w-4" />}
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">Sign In</Button>
        <div className="text-center">
          <Button variant="link" className="text-sm">
            Forgot your password?
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Login form showing validation error state.'
      }
    }
  }
};

export const LoginWithLoading = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your Recipeer account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          startIcon={<Mail className="h-4 w-4" />}
          value="user@example.com"
          disabled
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          startIcon={<Lock className="h-4 w-4" />}
          value="••••••••"
          disabled
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" loading>
          Signing In...
        </Button>
        <div className="text-center">
          <Button variant="link" className="text-sm" disabled>
            Forgot your password?
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Login form in loading state during authentication.'
      }
    }
  }
};

export const SignUpForm = {
  render: () => (
    <Card className="w-96">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join the Recipeer community</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Your full name"
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          startIcon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          startIcon={<Lock className="h-4 w-4" />}
          helperText="Must be at least 8 characters with uppercase, lowercase, and number"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          startIcon={<Lock className="h-4 w-4" />}
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">Create Account</Button>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" className="text-sm p-0">
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sign up form variant with additional fields for account creation.'
      }
    }
  }
};

export const CompactLogin = {
  render: () => (
    <div className="w-80 p-6 border rounded-lg">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Quick Sign In</h2>
        </div>
        <Input
          type="email"
          placeholder="Email"
          startIcon={<Mail className="h-4 w-4" />}
        />
        <Input
          type="password"
          placeholder="Password"
          startIcon={<Lock className="h-4 w-4" />}
        />
        <div className="flex space-x-2">
          <Button className="flex-1">Sign In</Button>
          <Button variant="outline" className="flex-1">Sign Up</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact login form for modals or sidebar use.'
      }
    }
  }
};