export interface SocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
  website?: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  endorsements: number;
}

export interface ActivityStats {
  posts: number;
  comments: number;
  reviews: number;
  saved: number;
  solutions: number;
  upvotes: number;
}

export interface ActivityPost {
  id: string;
  type: 'post' | 'comment' | 'review' | 'saved';
  title: string;
  excerpt: string;
  tags: string[];
  upvotes: number;
  comments: number;
  timestamp: string;
  community?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  title: string;
  bio: string;
  location: string;
  company: string;
  avatarUrl: string;
  coverUrl: string;
  reputation: number;
  followers: number;
  following: number;
  joinedDate: string;
  isVerified: boolean;
  isFollowing: boolean;
  socialLinks: SocialLinks;
  skills: Skill[];
  stats: ActivityStats;
  activity: ActivityPost[];
}

export interface Post {
  id: string;
  type: string;
  author: string;
  timeAgo: string;
  company: string;
  role: string;
  title: string;
  body: string;
  tags: [];
  rating: number;
  salary: string;
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
  isVerified: boolean;
  sentiment: string;
}

export interface NotificationModel {
    id: number;
    unread: boolean;
    type: string;
    icon: string;
    iconBg: string;
    title: string;
    body: string;
    timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
