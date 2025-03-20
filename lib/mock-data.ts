import {
  SystemMetrics,
  ApplicationMetrics,
  FeatureMetrics,
  WebsiteMetrics,
  MarketingMetrics,
  SalesMetrics,
} from "@/types/dashboard";

export const mockSystemMetrics: SystemMetrics = {
  health: {
    uptime: "99.99%",
    responseTime: "120ms",
    errorRate: "0.01%",
    activeUsers: 15000,
    cpuUsage: 45,
    memoryUsage: 60,
    diskUsage: 75,
    networkTraffic: "2.4GB/s",
    apiRequests: "2.4K/s",
  },
  dependencies: {
    outdatedPackages: 12,
    securityVulnerabilities: 3,
    totalDependencies: 156,
  },
  resources: {
    cpuTrend: [45, 42, 48, 43, 46, 44, 45],
    memoryTrend: [60, 58, 62, 59, 61, 60, 60],
    diskTrend: [75, 74, 76, 75, 75, 75, 75],
    networkTrend: [2.4, 2.2, 2.6, 2.3, 2.5, 2.4, 2.4],
  },
  services: {
    totalServices: 25,
    healthyServices: 23,
    degradedServices: 1,
    downServices: 1,
  },
  database: {
    queryTimes: {
      average: 45,
      p95: 120,
      p99: 250,
    },
    connectionPool: {
      active: 150,
      idle: 50,
      waiting: 5,
    },
  },
  containers: {
    totalPods: 45,
    runningPods: 43,
    failedPods: 2,
    scalingEvents: 8,
  },
  api: {
    endpoints: {
      total: 120,
      healthy: 118,
      degraded: 1,
      down: 1,
    },
    performance: {
      averageLatency: 120,
      throughput: 2400,
      errorRate: 0.01,
    },
  },
  security: {
    complianceScore: 95,
    vulnerabilities: 3,
    securityEvents: 12,
  },
  backup: {
    lastBackup: "2024-02-20T03:00:00Z",
    backupSize: "2.4TB",
    recoveryTime: "45min",
  },
};

export const mockApplicationMetrics: ApplicationMetrics = {
  overview: {
    totalApplications: 12,
    activeApplications: 8,
    inDevelopment: 4,
    totalUsers: 45000,
    dailyActiveUsers: 12000,
    apiCalls: 1200000,
    storageUsed: "2.4TB",
    bandwidth: "450GB",
    responseTime: "120ms",
  },
  performance: {
    averageLoadTime: 2.4,
    timeToInteractive: 3.2,
    firstContentfulPaint: 1.8,
    largestContentfulPaint: 2.5,
    cumulativeLayoutShift: 0.1,
  },
  sessions: {
    totalSessions: 25000,
    averageSessionDuration: 450,
    bounceRate: 32,
    returningUsers: 8500,
  },
  errors: {
    totalErrors: 45,
    errorRate: 0.01,
    crashRate: 0.001,
    errorTypes: {
      "404": 12,
      "500": 8,
      "400": 15,
      "Other": 10,
    },
  },
  dependencies: {
    totalDependencies: 156,
    outdatedDependencies: 12,
    securityIssues: 3,
  },
  security: {
    vulnerabilities: 3,
    securityScore: 95,
    lastScan: "2024-02-20T03:00:00Z",
  },
  deployment: {
    deployments: 45,
    successRate: 98,
    rollbackRate: 2,
    averageDeploymentTime: 5,
  },
  optimization: {
    performanceScore: 92,
    optimizationSuggestions: [
      "Optimize image loading",
      "Implement code splitting",
      "Enable caching",
    ],
    resourceUtilization: 85,
  },
  accessibility: {
    complianceScore: 95,
    issues: 8,
    lastAudit: "2024-02-15T00:00:00Z",
  },
  internationalization: {
    supportedLanguages: 12,
    translationCoverage: 98,
    missingTranslations: 45,
  },
  documentation: {
    coverage: 95,
    outdatedDocs: 12,
    lastUpdate: "2024-02-18T00:00:00Z",
  },
};

export const mockFeatureMetrics: FeatureMetrics = {
  overview: {
    totalFeatures: 45,
    inDevelopment: 12,
    planned: 8,
    completed: 25,
    inTesting: 5,
    onHold: 3,
    bugReports: 18,
    featureRequests: 32,
    completionRate: 85,
  },
  usage: {
    activeUsers: 12000,
    adoptionRate: 85,
    usageFrequency: 4.5,
    userSatisfaction: 4.2,
  },
  testing: {
    totalTests: 450,
    passingTests: 435,
    failingTests: 10,
    skippedTests: 5,
    coverage: 92,
  },
  development: {
    velocity: 8,
    storyPoints: 45,
    cycleTime: 3,
    leadTime: 5,
  },
  quality: {
    bugDensity: 0.4,
    technicalDebt: 15,
    codeQuality: 92,
    maintainability: 88,
  },
  feedback: {
    positiveFeedback: 85,
    negativeFeedback: 12,
    suggestions: 45,
    userRating: 4.2,
  },
  performance: {
    impact: 92,
    loadTime: 120,
    resourceUsage: 45,
    scalability: 90,
  },
  documentation: {
    completeness: 95,
    clarity: 90,
    examples: 85,
    lastUpdated: "2024-02-20T00:00:00Z",
  },
  accessibility: {
    compliance: 95,
    issues: 8,
    lastAudit: "2024-02-15T00:00:00Z",
  },
  security: {
    vulnerabilities: 2,
    riskScore: 95,
    lastAssessment: "2024-02-18T00:00:00Z",
  },
};

export const mockWebsiteMetrics: WebsiteMetrics = {
  overview: {
    totalWebsites: 6,
    activeSites: 4,
    inDevelopment: 2,
    monthlyVisitors: 250000,
    pageViews: 1200000,
    avgSessionTime: "4m 30s",
    bounceRate: 32,
    conversionRate: 2.8,
    sslCertificates: 6,
  },
  performance: {
    coreWebVitals: {
      lcp: 2.5,
      fid: 45,
      cls: 0.1,
    },
    loadTime: 1.8,
    timeToFirstByte: 120,
    domInteractive: 2.2,
  },
  seo: {
    score: 92,
    keywords: 450,
    backlinks: 1200,
    organicTraffic: 85000,
  },
  accessibility: {
    compliance: 95,
    issues: 8,
    lastAudit: "2024-02-15T00:00:00Z",
  },
  optimization: {
    suggestions: [
      "Optimize images",
      "Enable caching",
      "Minify CSS/JS",
    ],
    implemented: 85,
    pending: 15,
  },
  security: {
    vulnerabilities: 3,
    securityScore: 95,
    lastScan: "2024-02-20T03:00:00Z",
  },
  content: {
    freshness: 95,
    totalPages: 450,
    updatedPages: 420,
  },
  analytics: {
    userJourneys: 12,
    conversionFunnels: 8,
    heatmaps: 6,
  },
  mobile: {
    responsiveness: 98,
    mobileUsers: 150000,
    mobileConversion: 2.5,
  },
  uptime: {
    availability: 99.99,
    incidents: 2,
    responseTime: 120,
  },
  integration: {
    analytics: true,
    crm: true,
    payment: true,
    social: true,
  },
};

export const mockMarketingMetrics: MarketingMetrics = {
  overview: {
    activeCampaigns: 5,
    totalReach: 1200000,
    engagementRate: 4.5,
    emailSubscribers: 45000,
    socialFollowers: 28000,
    leadGeneration: 850,
    contentPieces: 120,
    roi: 280,
    costPerLead: 24,
  },
  campaigns: {
    totalCampaigns: 12,
    activeCampaigns: 5,
    completedCampaigns: 7,
    averageROI: 280,
  },
  customerJourney: {
    stages: 6,
    conversionRate: 3.2,
    dropOffRate: 45,
    averageTime: 45,
  },
  content: {
    totalContent: 120,
    performingContent: 85,
    engagementRate: 4.5,
    conversionRate: 3.2,
  },
  social: {
    followers: 28000,
    engagement: 4.5,
    reach: 120000,
    sentiment: 85,
  },
  email: {
    subscribers: 45000,
    openRate: 32,
    clickRate: 4.5,
    unsubscribeRate: 0.8,
  },
  leads: {
    totalLeads: 850,
    qualifiedLeads: 450,
    conversionRate: 3.2,
    costPerLead: 24,
  },
  automation: {
    workflows: 8,
    activeWorkflows: 6,
    successRate: 95,
    efficiency: 85,
  },
  budget: {
    totalBudget: 120000,
    spent: 85000,
    allocation: {
      "Social Media": 30,
      "Email Marketing": 25,
      "Content Creation": 20,
      "Events": 15,
      "Other": 10,
    },
    roi: 280,
  },
  attribution: {
    channels: 8,
    modelAccuracy: 85,
    conversionPaths: 12,
  },
};

export const mockSalesMetrics: SalesMetrics = {
  overview: {
    monthlyRevenue: 45000,
    activeDeals: 12,
    conversionRate: 3.2,
    pipelineValue: 120000,
    avgDealSize: 8500,
    salesCycle: 45,
    winRate: 68,
    customerLifetimeValue: 25000,
    churnRate: 2.4,
  },
  pipeline: {
    totalDeals: 35,
    activeDeals: 12,
    velocity: 8500,
    forecastAccuracy: 92,
  },
  forecasting: {
    accuracy: 92,
    variance: 8,
    confidence: 85,
  },
  team: {
    totalSalespeople: 8,
    quotaAchievement: 85,
    averageDealSize: 8500,
    productivity: 92,
  },
  acquisition: {
    cost: 1200,
    lifetimeValue: 25000,
    paybackPeriod: 6,
    roi: 2083,
  },
  territory: {
    coverage: 95,
    performance: 92,
    opportunities: 45,
  },
  process: {
    efficiency: 85,
    bottlenecks: 3,
    automation: 75,
  },
  training: {
    completionRate: 95,
    effectiveness: 90,
    knowledgeRetention: 85,
  },
  tools: {
    adoption: 92,
    utilization: 85,
    integration: 90,
  },
  satisfaction: {
    customerNPS: 45,
    salesRepNPS: 42,
    supportScore: 92,
  },
  data: {
    quality: 95,
    completeness: 92,
    accuracy: 90,
  },
}; 