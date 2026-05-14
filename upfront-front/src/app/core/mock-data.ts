export const AVATARS = {
  colors: [
    'linear-gradient(135deg,#4460ed,#818cf8)',
    'linear-gradient(135deg,#f59e0b,#ef4444)',
    'linear-gradient(135deg,#10b981,#0d9488)',
    'linear-gradient(135deg,#8b5cf6,#ec4899)',
    'linear-gradient(135deg,#f43f5e,#fb923c)',
    'linear-gradient(135deg,#06b6d4,#3b82f6)',
  ]
};

export const POSTS = [
  {
    id: 1,
    type: 'review',
    author: 'Sarah K.',
    initials: 'SK',
    avatarColor: 0,
    timeAgo: '2 hours ago',
    company: 'Google',
    companyColor: '#4460ed',
    role: 'Senior SWE',
    title: 'Google L6 SWE — Honest 3-Year Review After Layoffs',
    body: 'After 3 years at Google and surviving two rounds of layoffs, here\'s my brutally honest take. The perks are real, the pay is great, but the culture has changed significantly since 2022. PIP culture is now real, manager quality varies wildly, and the bureaucracy for launching anything is painful.',
    tags: ['Culture', 'Career Growth', 'Work-Life Balance'],
    rating: 4.1,
    salary: '$320K TC',
    upvotes: 1847,
    comments: 234,
    isUpvoted: false,
    isVerified: true,
    sentiment: 'mixed'
  },
  {
    id: 2,
    type: 'post',
    author: 'Marcus T.',
    initials: 'MT',
    avatarColor: 2,
    timeAgo: '4 hours ago',
    company: 'Meta',
    companyColor: '#1877f2',
    role: 'Staff Eng',
    title: 'Meta\'s new E6 promo bar is basically impossible — data from 50 engineers',
    body: 'I\'ve collected promo data from 50 engineers who attempted E6 in the past 18 months. The rejection rate is 78% on first attempt, up from ~40% in 2021. Here\'s the breakdown by org, manager tier, and interview panel composition...',
    tags: ['Promotions', 'Career', 'Meta'],
    upvotes: 3291,
    comments: 567,
    isUpvoted: true,
    isVerified: true,
    sentiment: 'negative'
  },
  {
    id: 3,
    type: 'salary',
    author: 'Anonymous',
    initials: '?',
    avatarColor: 3,
    timeAgo: '6 hours ago',
    company: 'Stripe',
    companyColor: '#635bff',
    role: 'Senior PM',
    title: 'Stripe Sr PM TC breakdown — refreshingly transparent offer',
    body: 'Just accepted an offer at Stripe. Sharing full comp breakdown: Base $215K + Target Bonus $40K + RSUs $320K over 4yr vesting + $30K signing. Total Year 1 ~$330K. Recruiter was very transparent, no lowballing. AMA.',
    tags: ['Salary', 'PM', 'Offer'],
    salary: '$330K TC',
    upvotes: 2104,
    comments: 188,
    isUpvoted: false,
    isVerified: false,
    sentiment: 'positive'
  },
  {
    id: 4,
    type: 'question',
    author: 'Devon W.',
    initials: 'DW',
    avatarColor: 4,
    timeAgo: '8 hours ago',
    company: null,
    role: 'ML Engineer',
    title: 'Is Anthropic\'s interview process as weird as people say? Preparing for final round',
    body: 'I have my final round next week for an ML Research Eng role at Anthropic. I\'ve heard the coding rounds are straightforward but they go DEEP on ML concepts and your research background. Anyone gone through this recently?',
    tags: ['Interview Prep', 'AI Companies', 'ML'],
    upvotes: 834,
    comments: 97,
    isUpvoted: false,
    isVerified: false,
    sentiment: 'neutral'
  },
  {
    id: 5,
    type: 'review',
    author: 'Priya N.',
    initials: 'PN',
    avatarColor: 5,
    timeAgo: '12 hours ago',
    company: 'Airbnb',
    companyColor: '#ff5a5f',
    role: 'Design Lead',
    title: 'Airbnb Post-IPO Culture: What nobody tells you about the remote-first pivot',
    body: 'Three years after going fully remote, Airbnb\'s design culture has transformed. Collaboration is intentional, synchronous time is precious, and async communication is an art form the team has genuinely mastered. Work-life balance is the best I\'ve had at any tech company. Downsides? Slower career growth and compensation trails FAANG by ~20%.',
    tags: ['Remote Work', 'Design', 'Culture'],
    rating: 4.4,
    salary: '$195K TC',
    upvotes: 1203,
    comments: 156,
    isUpvoted: false,
    isVerified: true,
    sentiment: 'positive'
  }
];

export const NOTIFICATIONS = [
  {
    id: 1, unread: true, type: 'upvote',
    icon: '👍', iconBg: '#4460ed',
    title: 'Your post got 500 upvotes',
    body: '"Google L6 Review" is trending on the dashboard',
    time: '2m ago'
  },
  {
    id: 2, unread: true, type: 'comment',
    icon: '💬', iconBg: '#10b981',
    title: 'Marcus replied to your comment',
    body: '"Totally agree about the promo bar, same happened to my team..."',
    time: '15m ago'
  },
  {
    id: 3, unread: true, type: 'award',
    icon: '🏆', iconBg: '#f59e0b',
    title: 'Your review was awarded "Most Helpful"',
    body: 'Stripe review earned a community award',
    time: '1h ago'
  },
  {
    id: 4, unread: false, type: 'follow',
    icon: '👤', iconBg: '#8b5cf6',
    title: 'Priya N. started following you',
    body: 'Connect and share experiences together',
    time: '3h ago'
  },
  {
    id: 5, unread: false, type: 'trending',
    icon: '🔥', iconBg: '#ef4444',
    title: 'Your company "Meta" is trending',
    body: '1.2K new posts about Meta this week',
    time: '5h ago'
  }
];

export const TRENDING_COMPANIES = [
  { name: 'OpenAI', abbr: 'OA', color: 'linear-gradient(135deg,#10a37f,#134e4a)', rating: 4.3, trend: '+12%', posts: '2.4K' },
  { name: 'Anthropic', abbr: 'AN', color: 'linear-gradient(135deg,#d97706,#92400e)', rating: 4.5, trend: '+28%', posts: '1.8K' },
  { name: 'Apple', abbr: 'AP', color: 'linear-gradient(135deg,#64748b,#1e293b)', rating: 3.9, trend: '+5%', posts: '3.1K' },
  { name: 'Netflix', abbr: 'NF', color: 'linear-gradient(135deg,#ef4444,#991b1b)', rating: 4.0, trend: '+8%', posts: '1.5K' },
  { name: 'Figma', abbr: 'FI', color: 'linear-gradient(135deg,#a855f7,#7c3aed)', rating: 4.6, trend: '+41%', posts: '892' },
];
