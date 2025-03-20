// Chart Colors
export const CHART_COLORS = [
  '#2563eb', // Blue
  '#16a34a', // Green
  '#dc2626', // Red
  '#f59e0b', // Yellow
  '#7c3aed', // Purple
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#84cc16', // Lime
  '#ef4444', // Rose
  '#8b5cf6', // Violet
];

// Chart Heights
export const CHART_HEIGHT = {
  mobile: 200,
  tablet: 250,
  desktop: 300,
};

// Chart Margins
export const CHART_MARGIN = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

// Navigation Structure
export const MAIN_NAVIGATION = [
  { 
    name: 'Systems',
    href: '/dashboard',
    icon: 'Monitor',
    tabs: [
      { name: 'Overview', href: '/dashboard' },
      { name: 'Performance', href: '/dashboard/performance' },
      { name: 'Analytics', href: '/dashboard/analytics' },
      { name: 'Settings', href: '/dashboard/settings' },
    ]
  },
  { 
    name: 'Financial',
    href: '/dashboard/financial',
    icon: 'LineChart',
    tabs: [
      { name: 'Overview', href: '/dashboard/financial' },
      { name: 'Revenue', href: '/dashboard/financial/revenue' },
      { name: 'Costs', href: '/dashboard/financial/costs' },
      { name: 'Budget', href: '/dashboard/financial/budget' },
      { name: 'Health', href: '/dashboard/financial/health' },
      { name: 'Investments', href: '/dashboard/financial/investments' },
      { name: 'Clients', href: '/dashboard/financial/clients' },
      { name: 'Team', href: '/dashboard/financial/team' },
      { name: 'Market', href: '/dashboard/financial/market' },
      { name: 'Risk', href: '/dashboard/financial/risk' },
      { name: 'Tax', href: '/dashboard/financial/tax' },
      { name: 'Compliance', href: '/dashboard/financial/compliance' },
    ]
  },
  { 
    name: 'Business',
    href: '/dashboard/business',
    icon: 'Building2',
    tabs: [
      { name: 'Overview', href: '/dashboard/business' },
      { name: 'Strategy', href: '/dashboard/business/strategy' },
      { name: 'Operations', href: '/dashboard/business/operations' },
      { name: 'Growth', href: '/dashboard/business/growth' },
      { name: 'Partners', href: '/dashboard/business/partners' },
    ]
  },
  { 
    name: 'Team',
    href: '/dashboard/team',
    icon: 'Users',
    tabs: [
      { name: 'Overview', href: '/dashboard/team' },
      { name: 'Members', href: '/dashboard/team/members' },
      { name: 'Projects', href: '/dashboard/team/projects' },
      { name: 'Performance', href: '/dashboard/team/performance' },
      { name: 'Resources', href: '/dashboard/team/resources' },
    ]
  },
]; 