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
  id: number;
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
  name: string;
  email: string;
  profileImage: string;
  createdAt: string;
  lastLogin: string;
  karma:number;
  postCount:number;
  reviewCount:number;
  commentCount:number;
  savedCount:number;
  likes:number;
  postViews:number;
  aliasName: string;
}