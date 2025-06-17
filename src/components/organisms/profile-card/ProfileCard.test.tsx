import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test-utils';
import { ProfileCard } from './profile-card';
import type { Profile } from '@/types';

// Mock profile data for testing
const mockProfile: Profile = {
  id: 'test-chef',
  name: 'Test Chef',
  avatar: 'https://example.com/avatar.jpg',
  title: 'Executive Chef',
  bio: 'A passionate chef with years of experience',
  stats: {
    followers: 1000,
    recipes: 50,
    avgRating: 4.5
  },
  badges: ['Verified', 'Top Chef'],
  specialties: ['Italian', 'Mediterranean'],
  location: 'New York, USA',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/testchef', handle: '@testchef' },
    { platform: 'twitter', url: 'https://twitter.com/testchef', handle: '@testchef' },
  ],
  isVerified: true,
  joinedDate: '2020-01-01'
};

describe('ProfileCard', () => {
  describe('Basic Rendering', () => {
    it('renders profile name correctly', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
    });

    it('renders profile title correctly', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('Executive Chef')).toBeInTheDocument();
    });

    it('renders profile bio correctly', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('A passionate chef with years of experience')).toBeInTheDocument();
    });

    it('renders profile location correctly', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('New York, USA')).toBeInTheDocument();
    });

    it('renders avatar with correct alt text', () => {
      render(<ProfileCard profile={mockProfile} />);
      const avatar = screen.getByRole('img', { name: 'Test Chef' });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
  });

  describe('Variants', () => {
    it('renders compact variant', () => {
      render(<ProfileCard profile={mockProfile} variant="compact" />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
    });

    it('renders standard variant', () => {
      render(<ProfileCard profile={mockProfile} variant="standard" />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
    });

    it('renders detailed variant', () => {
      render(<ProfileCard profile={mockProfile} variant="detailed" />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
    });
  });

  describe('Follow Functionality', () => {
    it('shows follow button when enabled', () => {
      const onFollow = vi.fn();
      render(
        <ProfileCard 
          profile={mockProfile} 
          showFollowButton={true}
          onFollow={onFollow}
        />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('hides follow button when disabled', () => {
      render(
        <ProfileCard 
          profile={mockProfile} 
          showFollowButton={false}
        />
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onFollow callback when follow button clicked', () => {
      const onFollow = vi.fn();
      render(
        <ProfileCard 
          profile={mockProfile} 
          showFollowButton={true}
          onFollow={onFollow}
          isFollowing={false}
        />
      );
      
      const followButton = screen.getByRole('button');
      fireEvent.click(followButton);
      expect(onFollow).toHaveBeenCalledWith('test-chef');
    });
  });

  describe('Statistics Display', () => {
    it('displays follower count', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('1,000')).toBeInTheDocument();
    });

    it('displays recipe count', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('displays rating', () => {
      render(<ProfileCard profile={mockProfile} />);
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles profile without location', () => {
      const profileWithoutLocation = { ...mockProfile, location: undefined };
      render(<ProfileCard profile={profileWithoutLocation} />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
      expect(screen.queryByText('New York, USA')).not.toBeInTheDocument();
    });

    it('handles profile without title', () => {
      const profileWithoutTitle = { ...mockProfile, title: undefined };
      render(<ProfileCard profile={profileWithoutTitle} />);
      expect(screen.getByText('Test Chef')).toBeInTheDocument();
      expect(screen.queryByText('Executive Chef')).not.toBeInTheDocument();
    });
  });
});