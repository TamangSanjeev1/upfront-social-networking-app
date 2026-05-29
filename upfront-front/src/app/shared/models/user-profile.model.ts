import {UserProfile} from "../../core/models/common-model";

export type ReactionType = 'LIKE' | 'DISLIKE' | null;

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

export interface TempUserProfile {
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
  id: number;
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
  downvotes: number;
  comments: number;
  isUpvoted: boolean;
  createdAt: string;
  isVerified: boolean;
  sentiment: string;
  likedByUser: boolean;
  disLikedByUser: boolean;
  user: UserProfile;
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

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
}

export interface ReactionRequest {
  type: 'LIKE' | 'DISLIKE';
}

export interface ReactionResponse {
  likeCount: number;
  dislikeCount: number;
  userReaction: ReactionType;
}

export interface CommentDto {
  id: number;
  body: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  userId: number;
  user: UserProfile;
}

export interface CommentRequest {
  body: string;
}