import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar', () => {
  it('renders avatar container', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('relative', 'flex', 'overflow-hidden', 'rounded-full');
  });

  it('shows fallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('applies custom className to avatar root', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('custom-avatar');
  });

  it('renders avatar image component structure', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage 
          src="https://example.com/avatar.jpg" 
          alt="Test User"
          className="custom-image"
        />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    // Check that the avatar structure is correct
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('relative', 'flex', 'overflow-hidden', 'rounded-full');
  });

  it('applies custom className to avatar fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" alt="Test User" />
        <AvatarFallback className="custom-fallback">TU</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('TU');
    expect(fallback).toHaveClass('custom-fallback');
  });

  it('supports different sizes through className', () => {
    const { container } = render(
      <Avatar className="h-16 w-16">
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    );

    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveClass('h-16', 'w-16');
  });
});