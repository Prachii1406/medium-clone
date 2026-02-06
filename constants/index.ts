export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
};

import { Article, Profile } from '@/types';

export const DUMMY_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The End of Dashboards and Design Systems',
    subtitle: 'Design is becoming quietly human again.',
    author: {
      name: 'Michal Malewicz',
      avatar: 'https://i.pravatar.cc/150?img=33',
      verified: true,
    },
    collection: {
      name: 'Design',
      icon: '📐',
    },
    thumbnail: 'https://picsum.photos/seed/design1/400/400',
    date: 'Nov 26, 2025',
    claps: 5200,
    comments: 185,
    featured: true,
  },
  {
    id: '2',
    title: 'AI Agents: Complete Course',
    subtitle: 'From beginner to intermediate to production.',
    author: {
      name: 'Marina Wyss',
      avatar: 'https://i.pravatar.cc/150?img=45',
      verified: true,
    },
    collection: {
      name: 'Data Science Collective',
      icon: 'DSC',
    },
    thumbnail: 'https://picsum.photos/seed/ai1/400/400',
    date: 'Dec 6, 2025',
    claps: 3100,
    comments: 92,
    featured: false,
  },
  {
    id: '3',
    title: 'Building Scalable React Applications',
    subtitle: 'Best practices for enterprise-level React apps with TypeScript.',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=20',
      verified: true,
    },
    thumbnail: 'https://picsum.photos/seed/react1/400/400',
    date: 'Dec 10, 2025',
    claps: 2800,
    comments: 156,
    featured: true,
  },
  {
    id: '4',
    title: 'The Future of Web Development',
    subtitle: 'Exploring the latest trends in modern web development.',
    author: {
      name: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: false,
    },
    collection: {
      name: 'Programming',
      icon: '💻',
    },
    thumbnail: 'https://picsum.photos/seed/web1/400/400',
    date: 'Dec 8, 2025',
    claps: 4500,
    comments: 234,
    featured: true,
  },
  {
    id: '5',
    title: 'Mastering TypeScript Generics',
    subtitle: 'A deep dive into advanced TypeScript patterns.',
    author: {
      name: 'David Park',
      avatar: 'https://i.pravatar.cc/150?img=52',
      verified: true,
    },
    thumbnail: 'https://picsum.photos/seed/typescript1/400/400',
    date: 'Dec 5, 2025',
    claps: 1900,
    comments: 78,
    featured: false,
  },
  {
    id: '6',
    title: 'CSS Grid vs Flexbox: When to Use What',
    subtitle: 'Understanding the differences and use cases for modern CSS layouts.',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=27',
      verified: true,
    },
    collection: {
      name: 'CSS Tricks',
      icon: '🎨',
    },
    thumbnail: 'https://picsum.photos/seed/css1/400/400',
    date: 'Dec 3, 2025',
    claps: 3400,
    comments: 167,
    featured: false,
  },
  {
    id: '7',
    title: 'Introduction to Machine Learning',
    subtitle: 'Getting started with ML in Python: A beginner-friendly guide.',
    author: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=68',
      verified: false,
    },
    collection: {
      name: 'Machine Learning',
      icon: '🤖',
    },
    thumbnail: 'https://picsum.photos/seed/ml1/400/400',
    date: 'Dec 1, 2025',
    claps: 6200,
    comments: 412,
    featured: true,
  },
  {
    id: '8',
    title: 'Microservices Architecture Explained',
    subtitle: 'How to design and implement scalable microservices.',
    author: {
      name: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=38',
      verified: true,
    },
    thumbnail: 'https://picsum.photos/seed/microservices1/400/400',
    date: 'Nov 28, 2025',
    claps: 2100,
    comments: 93,
    featured: false,
  },
  {
    id: '9',
    title: 'GraphQL Best Practices',
    subtitle: 'Building efficient and maintainable GraphQL APIs.',
    author: {
      name: 'Ryan Martinez',
      avatar: 'https://i.pravatar.cc/150?img=15',
      verified: true,
    },
    collection: {
      name: 'Backend Development',
      icon: '⚙️',
    },
    thumbnail: 'https://picsum.photos/seed/graphql1/400/400',
    date: 'Nov 25, 2025',
    claps: 1500,
    comments: 64,
    featured: false,
  },
  {
    id: '10',
    title: 'Mobile-First Design Principles',
    subtitle: 'Creating responsive designs that work on any device.',
    author: {
      name: 'Sophie Turner',
      avatar: 'https://i.pravatar.cc/150?img=49',
      verified: true,
    },
    collection: {
      name: 'UX Design',
      icon: '📱',
    },
    thumbnail: 'https://picsum.photos/seed/mobile1/400/400',
    date: 'Nov 22, 2025',
    claps: 4100,
    comments: 198,
    featured: true,
  },
];

export const DUMMY_PROFILE: Profile = {
  name: 'Rohan',
  avatar: 'https://i.pravatar.cc/150?img=60',
  followers: 0,
  following: 1,
};