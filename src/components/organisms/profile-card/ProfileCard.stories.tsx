import type { Meta, StoryObj } from '@storybook/react-vite';
// Simple mock function for stories  
const fn = () => () => {};
import { ProfileCard } from './profile-card';
import { LocaleProvider } from '@/providers/LocaleProvider';
import type { Profile } from '@/types';

// Mock profile data
const mockChefProfile: Profile = {
  id: 'chef-maria-rossi',
  name: 'Chef Maria Rossi',
  avatar: 'https://picsum.photos/seed/chef-maria/200/200',
  title: 'Executive Chef & Culinary Director',
  bio: 'Award-winning chef specializing in authentic Italian cuisine with over 15 years of experience in Michelin-starred restaurants.',
  stats: {
    followers: 24500,
    recipes: 127,
    avgRating: 4.8
  },
  badges: ['Michelin Star', 'James Beard Award', 'Top Chef Winner'],
  specialties: ['Italian', 'Mediterranean', 'Pasta Expert', 'Sustainable Cooking'],
  location: 'Milan, Italy',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/chefmariarossi', handle: '@chefmariarossi' },
    { platform: 'twitter', url: 'https://twitter.com/chefmariarossi', handle: '@chefmariarossi' },
    { platform: 'youtube', url: 'https://youtube.com/@chefmariarossi', handle: 'Chef Maria Rossi' },
    { platform: 'website', url: 'https://mariarossi.chef', handle: 'mariarossi.chef' },
  ],
  isVerified: true,
  joinedDate: '2019-03-15'
};

const mockHomeBakerProfile: Profile = {
  id: 'home-baker-sarah',
  name: 'Sarah Johnson',
  avatar: 'https://picsum.photos/seed/baker-sarah/200/200',
  title: 'Home Baker & Recipe Developer',
  bio: 'Passionate home baker sharing family recipes and creative dessert ideas for everyday cooking.',
  stats: {
    followers: 8200,
    recipes: 89,
    avgRating: 4.6
  },
  badges: ['Community Favorite', 'Rising Star'],
  specialties: ['Baking', 'Desserts', 'American', 'Family-Friendly'],
  location: 'Austin, Texas, USA',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/sarahbakes', handle: '@sarahbakes' },
    { platform: 'facebook', url: 'https://facebook.com/sarahbakesaustin', handle: 'Sarah Bakes Austin' },
  ],
  isVerified: false,
  joinedDate: '2021-08-20'
};

const mockInternationalChefProfile: Profile = {
  id: 'chef-kenji-tanaka',
  name: 'Chef Kenji Tanaka',
  avatar: 'https://picsum.photos/seed/chef-kenji/200/200',
  title: 'Traditional Japanese Cuisine Master',
  bio: 'Third-generation sushi master bringing authentic Japanese flavors to modern kitchens worldwide.',
  stats: {
    followers: 156000,
    recipes: 203,
    avgRating: 4.9
  },
  badges: ['Master Sushi Chef', 'UNESCO Heritage Ambassador', 'Top 50 Chefs'],
  specialties: ['Japanese', 'Sushi', 'Kaiseki', 'Traditional', 'Seafood'],
  location: 'Tokyo, Japan',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/chefkenjitanaka', handle: '@chefkenjitanaka' },
    { platform: 'twitter', url: 'https://twitter.com/chefkenjitanaka', handle: '@chefkenjitanaka' },
    { platform: 'youtube', url: 'https://youtube.com/@chefkenjitanaka', handle: 'Chef Kenji Tanaka' },
    { platform: 'website', url: 'https://kenjitanaka.jp', handle: 'kenjitanaka.jp' },
  ],
  isVerified: true,
  joinedDate: '2018-01-10'
};

const meta: Meta<typeof ProfileCard> = {
  title: 'Organisms/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProfileCard displays chef and user profile information with social interaction functionality. Supports multiple layout variants for different contexts and includes full internationalization support.'
      }
    }
  },
  decorators: [
    (Story) => (
      <LocaleProvider defaultLocale="en-US">
        <div className="w-96">
          <Story />
        </div>
      </LocaleProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'standard', 'detailed'],
      description: 'Visual layout variant for different contexts',
    },
    showFollowButton: {
      control: 'boolean',
      description: 'Whether to show follow/unfollow button',
    },
    isFollowing: {
      control: 'boolean',
      description: 'Whether user is currently following this profile',
    },
    onFollow: {
      action: 'follow',
      description: 'Callback when follow button is clicked',
    },
    onProfileClick: {
      action: 'profileClick',
      description: 'Callback when profile card is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard variant with professional chef
export const Standard: Story = {
  args: {
    profile: mockChefProfile,
    variant: 'standard',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard layout showing professional chef profile with follow functionality, stats, and specialties. Ideal for recipe discovery and search results.'
      }
    }
  }
};

// Compact variant for sidebars
export const Compact: Story = {
  args: {
    profile: mockHomeBakerProfile,
    variant: 'compact',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout for sidebar placement or recipe attribution. Shows essential information in minimal space.'
      }
    }
  }
};

// Detailed variant for featured showcases
export const Detailed: Story = {
  args: {
    profile: mockInternationalChefProfile,
    variant: 'detailed',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed layout for featured chef showcases with complete profile information, achievements, and social links.'
      }
    }
  }
};

// Following state
export const Following: Story = {
  args: {
    profile: mockChefProfile,
    variant: 'standard',
    showFollowButton: true,
    isFollowing: true,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the following state with updated button styling and text.'
      }
    }
  }
};

// Without follow button
export const ReadOnly: Story = {
  args: {
    profile: mockHomeBakerProfile,
    variant: 'standard',
    showFollowButton: false,
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only profile card without follow functionality, suitable for display contexts.'
      }
    }
  }
};

// Verified chef with achievements
export const VerifiedChef: Story = {
  args: {
    profile: {
      ...mockInternationalChefProfile,
      badges: ['Master Sushi Chef', 'UNESCO Heritage Ambassador', 'Top 50 Chefs', 'Verified Professional', 'Excellence Award'],
    },
    variant: 'detailed',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Verified chef profile showcasing multiple achievements and professional credentials.'
      }
    }
  }
};

// Minimal social presence
export const MinimalSocial: Story = {
  args: {
    profile: {
      ...mockHomeBakerProfile,
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/sarahbakes', handle: '@sarahbakes' },
      ],
      specialties: ['Baking', 'Desserts'],
      badges: ['Community Favorite'],
    },
    variant: 'standard',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile with minimal social media presence and fewer specialties/badges.'
      }
    }
  }
};

// Without location
export const NoLocation: Story = {
  args: {
    profile: {
      ...mockChefProfile,
      location: undefined,
    },
    variant: 'standard',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile card without location information.'
      }
    }
  }
};

// RTL Layout Test
export const RTLTest: Story = {
  args: {
    profile: {
      id: 'chef-ahmed-hassan',
      name: 'Chef Ahmed Hassan',
      avatar: 'https://picsum.photos/seed/chef-ahmed/200/200',
      title: 'Traditional Middle Eastern Cuisine Expert',
      bio: 'خبير في الطبخ التقليدي الشرق أوسطي مع خبرة أكثر من 20 عامًا في المطاعم الفاخرة.',
      stats: {
        followers: 45300,
        recipes: 184,
        avgRating: 4.7
      },
      badges: ['Master Chef', 'Heritage Cooking Expert', 'Award Winner'],
      specialties: ['Middle Eastern', 'Lebanese', 'Traditional', 'Halal'],
      location: 'Dubai, UAE',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/chefahmadhassan', handle: '@chefahmadhassan' },
        { platform: 'twitter', url: 'https://twitter.com/chefahmadhassan', handle: '@chefahmadhassan' },
      ],
      isVerified: true,
      joinedDate: '2017-11-05'
    },
    variant: 'standard',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="rtl">
        <LocaleProvider defaultLocale="ar-SA">
          <div className="w-96">
            <Story />
          </div>
        </LocaleProvider>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Profile card in RTL layout for Arabic locale with proper text direction and layout adjustments.'
      }
    }
  }
};

// Large follower count formatting
export const HighStats: Story = {
  args: {
    profile: {
      ...mockInternationalChefProfile,
      stats: {
        followers: 1250000,
        recipes: 847,
        avgRating: 4.95
      },
    },
    variant: 'detailed',
    showFollowButton: true,
    isFollowing: false,
    onFollow: fn(),
    onProfileClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile with high statistics demonstrating number formatting for large follower counts.'
      }
    }
  }
};

// Grid Layout Example
export const GridExample: Story = {
  render: () => (
    <LocaleProvider defaultLocale="en-US">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        <ProfileCard
          profile={mockChefProfile}
          variant="compact"
          showFollowButton={true}
          isFollowing={false}
          onFollow={fn()}
          onProfileClick={fn()}
        />
        <ProfileCard
          profile={mockHomeBakerProfile}
          variant="compact"
          showFollowButton={true}
          isFollowing={true}
          onFollow={fn()}
          onProfileClick={fn()}
        />
        <ProfileCard
          profile={mockInternationalChefProfile}
          variant="compact"
          showFollowButton={true}
          isFollowing={false}
          onFollow={fn()}
          onProfileClick={fn()}
        />
      </div>
    </LocaleProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple profile cards in a responsive grid layout showing compact variant usage.'
      }
    }
  }
};