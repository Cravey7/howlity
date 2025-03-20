export interface SystemMetrics {
  health: {
    uptime: string;
    responseTime: string;
    errorRate: string;
    activeUsers: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    networkTraffic: string;
    apiRequests: string;
  };
  dependencies: {
    outdatedPackages: number;
    securityVulnerabilities: number;
    totalDependencies: number;
  };
  resources: {
    cpuTrend: number[];
    memoryTrend: number[];
    diskTrend: number[];
    networkTrend: number[];
  };
  services: {
    totalServices: number;
    healthyServices: number;
    degradedServices: number;
    downServices: number;
  };
  database: {
    queryTimes: {
      average: number;
      p95: number;
      p99: number;
    };
    connectionPool: {
      active: number;
      idle: number;
      waiting: number;
    };
  };
  containers: {
    totalPods: number;
    runningPods: number;
    failedPods: number;
    scalingEvents: number;
  };
  api: {
    endpoints: {
      total: number;
      healthy: number;
      degraded: number;
      down: number;
    };
    performance: {
      averageLatency: number;
      throughput: number;
      errorRate: number;
    };
  };
  security: {
    complianceScore: number;
    vulnerabilities: number;
    securityEvents: number;
  };
  backup: {
    lastBackup: string;
    backupSize: string;
    recoveryTime: string;
  };
}

export interface ApplicationMetrics {
  overview: {
    totalApplications: number;
    activeApplications: number;
    inDevelopment: number;
    totalUsers: number;
    dailyActiveUsers: number;
    apiCalls: number;
    storageUsed: string;
    bandwidth: string;
    responseTime: string;
  };
  performance: {
    averageLoadTime: number;
    timeToInteractive: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
  };
  sessions: {
    totalSessions: number;
    averageSessionDuration: number;
    bounceRate: number;
    returningUsers: number;
  };
  errors: {
    totalErrors: number;
    errorRate: number;
    crashRate: number;
    errorTypes: Record<string, number>;
  };
  dependencies: {
    totalDependencies: number;
    outdatedDependencies: number;
    securityIssues: number;
  };
  security: {
    vulnerabilities: number;
    securityScore: number;
    lastScan: string;
  };
  deployment: {
    deployments: number;
    successRate: number;
    rollbackRate: number;
    averageDeploymentTime: number;
  };
  optimization: {
    performanceScore: number;
    optimizationSuggestions: string[];
    resourceUtilization: number;
  };
  accessibility: {
    complianceScore: number;
    issues: number;
    lastAudit: string;
  };
  internationalization: {
    supportedLanguages: number;
    translationCoverage: number;
    missingTranslations: number;
  };
  documentation: {
    coverage: number;
    outdatedDocs: number;
    lastUpdate: string;
  };
}

export interface FeatureMetrics {
  overview: {
    totalFeatures: number;
    inDevelopment: number;
    planned: number;
    completed: number;
    inTesting: number;
    onHold: number;
    bugReports: number;
    featureRequests: number;
    completionRate: number;
  };
  usage: {
    activeUsers: number;
    adoptionRate: number;
    usageFrequency: number;
    userSatisfaction: number;
  };
  testing: {
    totalTests: number;
    passingTests: number;
    failingTests: number;
    skippedTests: number;
    coverage: number;
  };
  development: {
    velocity: number;
    storyPoints: number;
    cycleTime: number;
    leadTime: number;
  };
  quality: {
    bugDensity: number;
    technicalDebt: number;
    codeQuality: number;
    maintainability: number;
  };
  feedback: {
    positiveFeedback: number;
    negativeFeedback: number;
    suggestions: number;
    userRating: number;
  };
  performance: {
    impact: number;
    loadTime: number;
    resourceUsage: number;
    scalability: number;
  };
  documentation: {
    completeness: number;
    clarity: number;
    examples: number;
    lastUpdated: string;
  };
  accessibility: {
    compliance: number;
    issues: number;
    lastAudit: string;
  };
  security: {
    vulnerabilities: number;
    riskScore: number;
    lastAssessment: string;
  };
}

export interface WebsiteMetrics {
  overview: {
    totalWebsites: number;
    activeSites: number;
    inDevelopment: number;
    monthlyVisitors: number;
    pageViews: number;
    avgSessionTime: string;
    bounceRate: number;
    conversionRate: number;
    sslCertificates: number;
  };
  performance: {
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    loadTime: number;
    timeToFirstByte: number;
    domInteractive: number;
  };
  seo: {
    score: number;
    keywords: number;
    backlinks: number;
    organicTraffic: number;
  };
  accessibility: {
    compliance: number;
    issues: number;
    lastAudit: string;
  };
  optimization: {
    suggestions: string[];
    implemented: number;
    pending: number;
  };
  security: {
    vulnerabilities: number;
    securityScore: number;
    lastScan: string;
  };
  content: {
    freshness: number;
    totalPages: number;
    updatedPages: number;
  };
  analytics: {
    userJourneys: number;
    conversionFunnels: number;
    heatmaps: number;
  };
  mobile: {
    responsiveness: number;
    mobileUsers: number;
    mobileConversion: number;
  };
  uptime: {
    availability: number;
    incidents: number;
    responseTime: number;
  };
  integration: {
    analytics: boolean;
    crm: boolean;
    payment: boolean;
    social: boolean;
  };
}

export interface MarketingMetrics {
  overview: {
    activeCampaigns: number;
    totalReach: number;
    engagementRate: number;
    emailSubscribers: number;
    socialFollowers: number;
    leadGeneration: number;
    contentPieces: number;
    roi: number;
    costPerLead: number;
  };
  campaigns: {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    averageROI: number;
  };
  customerJourney: {
    stages: number;
    conversionRate: number;
    dropOffRate: number;
    averageTime: number;
  };
  content: {
    totalContent: number;
    performingContent: number;
    engagementRate: number;
    conversionRate: number;
  };
  social: {
    followers: number;
    engagement: number;
    reach: number;
    sentiment: number;
  };
  email: {
    subscribers: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
  leads: {
    totalLeads: number;
    qualifiedLeads: number;
    conversionRate: number;
    costPerLead: number;
  };
  automation: {
    workflows: number;
    activeWorkflows: number;
    successRate: number;
    efficiency: number;
  };
  budget: {
    totalBudget: number;
    spent: number;
    allocation: Record<string, number>;
    roi: number;
  };
  attribution: {
    channels: number;
    modelAccuracy: number;
    conversionPaths: number;
  };
}

export interface SalesMetrics {
  overview: {
    monthlyRevenue: number;
    activeDeals: number;
    conversionRate: number;
    pipelineValue: number;
    avgDealSize: number;
    salesCycle: number;
    winRate: number;
    customerLifetimeValue: number;
    churnRate: number;
  };
  pipeline: {
    totalDeals: number;
    activeDeals: number;
    velocity: number;
    forecastAccuracy: number;
  };
  forecasting: {
    accuracy: number;
    variance: number;
    confidence: number;
  };
  team: {
    totalSalespeople: number;
    quotaAchievement: number;
    averageDealSize: number;
    productivity: number;
  };
  acquisition: {
    cost: number;
    lifetimeValue: number;
    paybackPeriod: number;
    roi: number;
  };
  territory: {
    coverage: number;
    performance: number;
    opportunities: number;
  };
  process: {
    efficiency: number;
    bottlenecks: number;
    automation: number;
  };
  training: {
    completionRate: number;
    effectiveness: number;
    knowledgeRetention: number;
  };
  tools: {
    adoption: number;
    utilization: number;
    integration: number;
  };
  satisfaction: {
    customerNPS: number;
    salesRepNPS: number;
    supportScore: number;
  };
  data: {
    quality: number;
    completeness: number;
    accuracy: number;
  };
} 