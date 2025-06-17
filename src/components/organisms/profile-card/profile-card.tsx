import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';
import { 
  MapPin, 
  Users, 
  BookOpen, 
  Star, 
  CheckCircle, 
  Crown,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Globe,
  UserPlus,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/molecules/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Profile, SocialLink } from '@/types';

/**
 * Props for ProfileCard component - Organism level
 * 
 * ProfileCard displays chef and user profile information with social interaction functionality.
 * Supports multiple layout variants and cultural considerations for global users.
 * 
 * @example
 * <ProfileCard 
 *   profile={chefProfile} 
 *   variant="standard"
 *   showFollowButton={true}
 *   onFollow={(id) => handleFollow(id)}
 * />
 */
export interface ProfileCardProps {
  /** Profile data to display */
  profile: Profile;
  /** Visual layout variant */
  variant?: 'compact' | 'standard' | 'detailed';
  /** Whether to show follow/unfollow button */
  showFollowButton?: boolean;
  /** Whether user is currently following this profile */
  isFollowing?: boolean;
  /** Callback when follow button is clicked */
  onFollow?: (profileId: string) => void;
  /** Callback when profile card is clicked */
  onProfileClick?: (profileId: string) => void;
  /** Custom CSS class */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

const SOCIAL_ICONS = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
  website: Globe,
  tiktok: Globe, // Using Globe as fallback for TikTok
} as const;

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ 
    profile,
    variant = 'standard',
    showFollowButton = false,
    isFollowing = false,
    onFollow,
    onProfileClick,
    className,
    ...props 
  }, ref) => {
    const { t } = useTranslation('profile');
    const { formatNumber } = useLocale();

    const handleFollowClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onFollow?.(profile.id);
    };

    const handleCardClick = () => {
      onProfileClick?.(profile.id);
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const renderSocialLinks = (links: SocialLink[], limit?: number) => {
      const socialLinksToShow = limit ? links.slice(0, limit) : links;
      
      return (
        <div className="flex items-center gap-2">
          {socialLinksToShow.map((link, index) => {
            const IconComponent = SOCIAL_ICONS[link.platform];
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('socialLinks.ariaLabel', { platform: link.platform, handle: link.handle || profile.name })}
              >
                <IconComponent className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      );
    };

    const renderBadges = (badges: string[], limit?: number) => {
      const badgesToShow = limit ? badges.slice(0, limit) : badges;
      const remainingCount = badges.length - (limit || badges.length);
      
      return (
        <div className="flex flex-wrap gap-1">
          {badgesToShow.map((badge, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              size="sm"
              className="rtl:ml-1 ltr:mr-1"
            >
              {badge}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" size="sm">
              +{remainingCount}
            </Badge>
          )}
        </div>
      );
    };

    const renderStats = () => (
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{formatNumber(profile.stats.followers)}</span>
          <span className="sr-only">{t('stats.followers')}</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          <span>{formatNumber(profile.stats.recipes)}</span>
          <span className="sr-only">{t('stats.recipes')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span>{profile.stats.avgRating.toFixed(1)}</span>
          <span className="sr-only">{t('stats.rating')}</span>
        </div>
      </div>
    );

    const renderVerificationBadge = () => {
      if (!profile.isVerified) return null;
      
      return (
        <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
          <CheckCircle className="h-3 w-3 text-primary-foreground" />
          <span className="sr-only">{t('badges.verified')}</span>
        </div>
      );
    };

    const renderFollowButton = () => {
      if (!showFollowButton) return null;
      
      const FollowIcon = isFollowing ? UserCheck : UserPlus;
      
      return (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          onClick={handleFollowClick}
          className="rtl:ml-auto ltr:mr-auto"
          aria-label={isFollowing ? t('actions.unfollow') : t('actions.follow')}
        >
          <FollowIcon className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
          {isFollowing ? t('actions.following') : t('actions.follow')}
        </Button>
      );
    };

    if (variant === 'compact') {
      return (
        <Card
          ref={ref}
          className={cn(
            "p-3",
            onProfileClick && "cursor-pointer hover:shadow-md transition-shadow",
            className
          )}
          interactive={!!onProfileClick}
          onClick={onProfileClick ? handleCardClick : undefined}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar>
              {renderVerificationBadge()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 rtl:flex-row-reverse">
                <h3 className="font-medium text-sm truncate">{profile.name}</h3>
                {profile.title && (
                  <span className="text-xs text-muted-foreground truncate">
                    {profile.title}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span className="text-xs text-muted-foreground">
                  {profile.stats.avgRating.toFixed(1)} • {formatNumber(profile.stats.recipes)} {t('stats.recipesShort')}
                </span>
              </div>
            </div>
            
            {renderFollowButton()}
          </div>
        </Card>
      );
    }

    if (variant === 'detailed') {
      return (
        <Card
          ref={ref}
          className={cn(
            "p-6",
            onProfileClick && "cursor-pointer hover:shadow-md transition-shadow",
            className
          )}
          interactive={!!onProfileClick}
          onClick={onProfileClick ? handleCardClick : undefined}
          {...props}
        >
          <div className="space-y-4">
            {/* Header with avatar and basic info */}
            <div className="flex items-start gap-4 rtl:flex-row-reverse">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">{getInitials(profile.name)}</AvatarFallback>
                </Avatar>
                {renderVerificationBadge()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between rtl:flex-row-reverse">
                  <div>
                    <h2 className="text-xl font-semibold rtl:text-right">{profile.name}</h2>
                    {profile.title && (
                      <p className="text-muted-foreground rtl:text-right">{profile.title}</p>
                    )}
                  </div>
                  {renderFollowButton()}
                </div>
                
                {profile.location && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground rtl:flex-row-reverse">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground rtl:text-right">{profile.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-border">
              <div className="text-center">
                <div className="text-lg font-semibold">{formatNumber(profile.stats.followers)}</div>
                <div className="text-xs text-muted-foreground">{t('stats.followers')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{formatNumber(profile.stats.recipes)}</div>
                <div className="text-xs text-muted-foreground">{t('stats.recipes')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{profile.stats.avgRating.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">{t('stats.rating')}</div>
              </div>
            </div>

            {/* Specialties */}
            {profile.specialties.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 rtl:text-right">{t('sections.specialties')}</h4>
                {renderBadges(profile.specialties)}
              </div>
            )}

            {/* Badges */}
            {profile.badges.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 rtl:text-right">{t('sections.achievements')}</h4>
                {renderBadges(profile.badges)}
              </div>
            )}

            {/* Social Links */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 rtl:text-right">{t('sections.socialLinks')}</h4>
                {renderSocialLinks(profile.socialLinks)}
              </div>
            )}
          </div>
        </Card>
      );
    }

    // Standard variant (default)
    return (
      <Card
        ref={ref}
        className={cn(
          "p-4",
          onProfileClick && "cursor-pointer hover:shadow-md transition-shadow",
          className
        )}
        interactive={!!onProfileClick}
        onClick={onProfileClick ? handleCardClick : undefined}
        {...props}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3 rtl:flex-row-reverse">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
              </Avatar>
              {renderVerificationBadge()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between rtl:flex-row-reverse">
                <div>
                  <h3 className="font-semibold rtl:text-right">{profile.name}</h3>
                  {profile.title && (
                    <p className="text-sm text-muted-foreground rtl:text-right">{profile.title}</p>
                  )}
                </div>
                {renderFollowButton()}
              </div>
              
              {profile.location && (
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground rtl:flex-row-reverse">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground rtl:text-right">{profile.bio}</p>

          {/* Stats */}
          <div className="rtl:flex-row-reverse">
            {renderStats()}
          </div>

          {/* Specialties */}
          {profile.specialties.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1 rtl:text-right">{t('sections.specialties')}</h4>
              {renderBadges(profile.specialties, 3)}
            </div>
          )}

          {/* Social Links */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex items-center justify-between rtl:flex-row-reverse">
              <span className="text-sm font-medium">{t('sections.socialLinks')}</span>
              {renderSocialLinks(profile.socialLinks, 4)}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

ProfileCard.displayName = 'ProfileCard';

export { ProfileCard };