'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  Activity, 
  Server, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  GitBranch, 
  Bug, 
  TestTube2, 
  FileCode, 
  GitCommit, 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown,
  Timer,
  Network,
  Package,
  Shield,
  Database,
  Monitor,
  Globe,
  Layout,
  Sparkles,
  Megaphone,
  LineChart,
  Boxes,
  Wallet,
  FolderKanban,
  Rocket,
  Code,
  Globe2,
  Webhook,
  Cpu,
  HardDrive
} from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { StatusCard } from "@/components/dashboard/status-card";
import { mockSystemMetrics } from "@/lib/mock-data";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Scale
} from 'lucide-react';

// Mock directory structure
const mockDirectoryStructure = {
  name: 'devflow',
  type: 'directory',
  children: [
    {
      name: 'app',
      type: 'directory',
      children: [
        {
          name: 'api',
          type: 'directory',
          children: [
            { name: 'auth', type: 'directory' },
            { name: 'users', type: 'directory' },
          ],
        },
        {
          name: 'dashboard',
          type: 'directory',
          children: [
            { name: 'page.tsx', type: 'file' },
            { name: 'settings', type: 'directory' },
          ],
        },
        {
          name: 'auth',
          type: 'directory',
          children: [
            { name: 'login', type: 'directory' },
            { name: 'register', type: 'directory' },
            { name: 'forgot-password', type: 'directory' },
          ],
        },
      ],
    },
    {
      name: 'components',
      type: 'directory',
      children: [
        {
          name: 'ui',
          type: 'directory',
          children: [
            { name: 'button.tsx', type: 'file' },
            { name: 'card.tsx', type: 'file' },
            { name: 'input.tsx', type: 'file' },
          ],
        },
        {
          name: 'auth',
          type: 'directory',
          children: [
            { name: 'auth-form.tsx', type: 'file' },
            { name: 'forgot-password-form.tsx', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'lib',
      type: 'directory',
      children: [
        { name: 'utils.ts', type: 'file' },
        { name: 'supabase.ts', type: 'file' },
      ],
    },
    {
      name: 'hooks',
      type: 'directory',
      children: [
        { name: 'use-profile.ts', type: 'file' },
        { name: 'use-auth.ts', type: 'file' },
      ],
    },
    {
      name: 'types',
      type: 'directory',
      children: [
        { name: 'api.ts', type: 'file' },
        { name: 'user.ts', type: 'file' },
      ],
    },
  ],
};

// Directory Tree Component
const DirectoryTree = ({ data, level = 0 }: { data: any; level?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = data.type === 'directory';
  const hasChildren = isDirectory && data.children && data.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1 px-2 rounded-md hover:bg-muted cursor-pointer ${
          level > 0 ? 'ml-4' : ''
        }`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {isDirectory ? (
          <>
            {hasChildren ? (
              isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <Folder className="h-4 w-4 text-yellow-500" />
            )}
            <Folder className="h-4 w-4 text-yellow-500" />
          </>
        ) : (
          <File className="h-4 w-4 text-blue-500" />
        )}
        <span className="text-sm">{data.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-2">
          {data.children.map((child: any, index: number) => (
            <DirectoryTree key={index} data={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Mock analytics data
const mockAnalytics = {
  systemHealth: {
    uptime: '99.9%',
    responseTime: '120ms',
    errorRate: '0.1%',
    activeUsers: 1250,
  },
  systemMetrics: {
    cpuUsage: 45,
    memoryUsage: 60,
    diskUsage: 75,
    networkTraffic: '2.5 GB/s',
  },
  deploymentStatus: {
    total: 12,
    successful: 10,
    failed: 1,
    inProgress: 1,
  },
  codebaseMetrics: {
    totalFiles: 156,
    totalLines: 12500,
    languages: {
      typescript: 85,
      javascript: 15,
    },
    complexity: {
      average: 12.5,
      max: 45,
    },
    dependencies: {
      total: 42,
      outdated: 3,
    },
  },
  developmentMetrics: {
    activeBranches: 8,
    openPRs: 5,
    openIssues: 12,
    recentCommits: 24,
    codeReviewTime: '2.5h',
  },
  testMetrics: {
    coverage: 85,
    totalTests: 245,
    passing: 238,
    failing: 7,
    skipped: 0,
  },
  recentActivity: [
    {
      id: 1,
      type: 'deployment',
      system: 'Frontend Service',
      status: 'success',
      timestamp: '5 minutes ago',
    },
    {
      id: 2,
      type: 'alert',
      system: 'Database',
      status: 'warning',
      timestamp: '15 minutes ago',
    },
    {
      id: 3,
      type: 'update',
      system: 'API Gateway',
      status: 'success',
      timestamp: '1 hour ago',
    },
  ],
  resourceUtilization: {
    systems: [
      { name: 'Frontend', usage: 65, status: 'healthy' },
      { name: 'Backend', usage: 45, status: 'healthy' },
      { name: 'Database', usage: 80, status: 'warning' },
      { name: 'Cache', usage: 30, status: 'healthy' },
    ],
  },
};

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Monitor },
  { name: 'Financial', href: '/dashboard/financial', icon: LineChart },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardPage() {
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r bg-background p-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link href="/dashboard/settings">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="systems" className="space-y-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="systems" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Systems
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="components" className="flex items-center gap-2">
                <Boxes className="h-4 w-4" />
                Components
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="websites" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Websites
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Marketing
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Sales
              </TabsTrigger>
            </TabsList>

            <TabsContent value="systems" className="space-y-6">
              {/* System Health Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      title="Uptime"
                      value={mockSystemMetrics.health.uptime}
                      icon={Timer}
                      trend={{ value: 0.1, isPositive: true }}
                    />
                    <MetricCard
                      title="Response Time"
                      value={mockSystemMetrics.health.responseTime}
                      icon={Network}
                      trend={{ value: 5, isPositive: false }}
                    />
                    <MetricCard
                      title="Error Rate"
                      value={mockSystemMetrics.health.errorRate}
                      icon={AlertCircle}
                      trend={{ value: 0.5, isPositive: true }}
                    />
                    <MetricCard
                      title="Active Users"
                      value={mockSystemMetrics.health.activeUsers}
                      icon={Users}
                      trend={{ value: 12, isPositive: true }}
                    />
                    <MetricCard
                      title="API Requests"
                      value={mockSystemMetrics.health.apiRequests}
                      icon={Network}
                      trend={{ value: 8, isPositive: true }}
                    />
                    <MetricCard
                      title="Network Traffic"
                      value={mockSystemMetrics.health.networkTraffic}
                      icon={Network}
                      trend={{ value: 15, isPositive: true }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProgressCard
                      title="CPU Usage"
                      value={mockSystemMetrics.health.cpuUsage}
                      max={100}
                      icon={Cpu}
                      unit="%"
                    />
                    <ProgressCard
                      title="Memory Usage"
                      value={mockSystemMetrics.health.memoryUsage}
                      max={100}
                      icon={HardDrive}
                      unit="%"
                    />
                    <ProgressCard
                      title="Disk Usage"
                      value={mockSystemMetrics.health.diskUsage}
                      max={100}
                      icon={HardDrive}
                      unit="%"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dependencies & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Dependencies & Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Outdated Packages"
                      value={mockSystemMetrics.dependencies.outdatedPackages}
                      status="warning"
                      icon={Package}
                      description={`${mockSystemMetrics.dependencies.outdatedPackages} of ${mockSystemMetrics.dependencies.totalDependencies} packages need updates`}
                    />
                    <StatusCard
                      title="Security Vulnerabilities"
                      value={mockSystemMetrics.dependencies.securityVulnerabilities}
                      status="error"
                      icon={Shield}
                      description="Critical security issues detected"
                    />
                    <StatusCard
                      title="Compliance Score"
                      value={`${mockSystemMetrics.security.complianceScore}%`}
                      status="success"
                      icon={Shield}
                      description="Overall system compliance"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Services & API Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Services & API Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Services Health"
                      value={`${mockSystemMetrics.services.healthyServices}/${mockSystemMetrics.services.totalServices}`}
                      status="success"
                      icon={Server}
                      description="Active services"
                    />
                    <StatusCard
                      title="API Endpoints"
                      value={`${mockSystemMetrics.api.endpoints.healthy}/${mockSystemMetrics.api.endpoints.total}`}
                      status="success"
                      icon={Network}
                      description="Healthy endpoints"
                    />
                    <StatusCard
                      title="Database Health"
                      value={`${mockSystemMetrics.database.connectionPool.active}/${mockSystemMetrics.database.connectionPool.active + mockSystemMetrics.database.connectionPool.idle}`}
                      status="success"
                      icon={Database}
                      description="Active connections"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Codebase Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    System Codebase Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-sm font-medium mb-2">Directory Tree</h3>
                        <div className="p-4 rounded-lg border bg-card">
                          <DirectoryTree data={mockDirectoryStructure} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Total Directories</div>
                            <div className="text-xl font-bold">12</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Total Files</div>
                            <div className="text-xl font-bold">8</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Components</div>
                            <div className="text-xl font-bold">5</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Pages</div>
                            <div className="text-xl font-bold">3</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {/* Applications Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Applications Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Total Applications</div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Active Applications</div>
                      <div className="text-2xl font-bold">8</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">In Development</div>
                      <div className="text-2xl font-bold">4</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Total Users</div>
                      <div className="text-2xl font-bold">45K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Daily Active Users</div>
                      <div className="text-2xl font-bold">12K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">API Calls</div>
                      <div className="text-2xl font-bold">1.2M</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Storage Used</div>
                      <div className="text-2xl font-bold">2.4TB</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Bandwidth</div>
                      <div className="text-2xl font-bold">450GB</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Response Time</div>
                      <div className="text-2xl font-bold">120ms</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Codebase Structure for Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    Application Codebase Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h3 className="text-sm font-medium mb-2">Directory Tree</h3>
                        <div className="p-4 rounded-lg border bg-card">
                          <DirectoryTree data={mockDirectoryStructure} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Total Directories</div>
                            <div className="text-xl font-bold">12</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Total Files</div>
                            <div className="text-xl font-bold">8</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Components</div>
                            <div className="text-xl font-bold">5</div>
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="text-sm font-medium text-muted-foreground">Pages</div>
                            <div className="text-xl font-bold">3</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="space-y-6">
              {/* Components Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Boxes className="h-5 w-5" />
                    Components Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      title="Total Components"
                      value="156"
                      icon={Boxes}
                      trend={{ value: 12, isPositive: true }}
                    />
                    <MetricCard
                      title="Reusable Components"
                      value="89"
                      icon={Code}
                      trend={{ value: 8, isPositive: true }}
                    />
                    <MetricCard
                      title="Custom Components"
                      value="67"
                      icon={FileCode}
                      trend={{ value: 5, isPositive: true }}
                    />
                    <MetricCard
                      title="Component Usage"
                      value="2.4K"
                      icon={Webhook}
                      trend={{ value: 15, isPositive: true }}
                    />
                    <MetricCard
                      title="Documentation"
                      value="95%"
                      icon={File}
                      trend={{ value: 5, isPositive: true }}
                    />
                    <MetricCard
                      title="Test Coverage"
                      value="92%"
                      icon={TestTube2}
                      trend={{ value: 3, isPositive: true }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Component Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Component Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="UI Components"
                      value="45"
                      status="success"
                      icon={Layout}
                      description="Buttons, inputs, cards, etc."
                    />
                    <StatusCard
                      title="Layout Components"
                      value="32"
                      status="success"
                      icon={Folder}
                      description="Grids, containers, sections"
                    />
                    <StatusCard
                      title="Data Components"
                      value="28"
                      status="success"
                      icon={Database}
                      description="Tables, lists, charts"
                    />
                    <StatusCard
                      title="Navigation Components"
                      value="24"
                      status="success"
                      icon={Globe}
                      description="Menus, breadcrumbs, tabs"
                    />
                    <StatusCard
                      title="Form Components"
                      value="18"
                      status="success"
                      icon={FileCode}
                      description="Inputs, selects, checkboxes"
                    />
                    <StatusCard
                      title="Feedback Components"
                      value="15"
                      status="success"
                      icon={AlertCircle}
                      description="Alerts, toasts, modals"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {/* Projects Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="h-5 w-5" />
                    Projects Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      title="Total Projects"
                      value="24"
                      icon={FolderKanban}
                      trend={{ value: 3, isPositive: true }}
                    />
                    <MetricCard
                      title="Active Projects"
                      value="12"
                      icon={Rocket}
                      trend={{ value: 2, isPositive: true }}
                    />
                    <MetricCard
                      title="Completed Projects"
                      value="8"
                      icon={CheckCircle2}
                      trend={{ value: 1, isPositive: true }}
                    />
                    <MetricCard
                      title="On Hold"
                      value="4"
                      icon={Clock}
                      trend={{ value: 0, isPositive: true }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Project Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Project Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Website Projects"
                      value="8"
                      status="success"
                      icon={Globe2}
                      description="Static and dynamic websites"
                    />
                    <StatusCard
                      title="Software Projects"
                      value="6"
                      status="success"
                      icon={Code}
                      description="Desktop and mobile applications"
                    />
                    <StatusCard
                      title="Web App Projects"
                      value="10"
                      status="success"
                      icon={Webhook}
                      description="Full-stack web applications"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Project Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProgressCard
                      title="Development Progress"
                      value={75}
                      max={100}
                      icon={Code}
                      unit="%"
                      description="Overall project completion"
                    />
                    <ProgressCard
                      title="Testing Progress"
                      value={85}
                      max={100}
                      icon={TestTube2}
                      unit="%"
                      description="Test coverage and quality"
                    />
                    <ProgressCard
                      title="Deployment Progress"
                      value={90}
                      max={100}
                      icon={Rocket}
                      unit="%"
                      description="Deployment readiness"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              {/* Financial Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      title="Total Revenue"
                      value="$450K"
                      icon={Wallet}
                      trend={{ value: 15, isPositive: true }}
                    />
                    <MetricCard
                      title="Project Budget"
                      value="$120K"
                      icon={Folder}
                      trend={{ value: 8, isPositive: true }}
                    />
                    <MetricCard
                      title="Operating Costs"
                      value="$85K"
                      icon={Server}
                      trend={{ value: 5, isPositive: false }}
                    />
                    <MetricCard
                      title="Profit Margin"
                      value="32%"
                      icon={LineChart}
                      trend={{ value: 3, isPositive: true }}
                    />
                    <MetricCard
                      title="Cash Flow"
                      value="$245K"
                      icon={Wallet}
                      trend={{ value: 12, isPositive: true }}
                    />
                    <MetricCard
                      title="ROI"
                      value="280%"
                      icon={LineChart}
                      trend={{ value: 25, isPositive: true }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Revenue by Project Type"
                      value="$450K"
                      status="success"
                      icon={Folder}
                      description="Websites: $180K, Software: $150K, Web Apps: $120K"
                    />
                    <StatusCard
                      title="Client Segments"
                      value="$450K"
                      status="success"
                      icon={Users}
                      description="Enterprise: $250K, SMB: $150K, Startups: $50K"
                    />
                    <StatusCard
                      title="Service Types"
                      value="$450K"
                      status="success"
                      icon={Code}
                      description="Development: $300K, Maintenance: $100K, Consulting: $50K"
                    />
                    <ProgressCard
                      title="Revenue Growth"
                      value={15}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Year-over-year growth"
                    />
                    <ProgressCard
                      title="Forecast Accuracy"
                      value={92}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="AI-powered prediction accuracy"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Cost Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Cost Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Department Costs"
                      value="$85K"
                      status="warning"
                      icon={Users}
                      description="Dev: $40K, Design: $20K, Marketing: $25K"
                    />
                    <StatusCard
                      title="Resource Costs"
                      value="$60K"
                      status="warning"
                      icon={HardDrive}
                      description="Infrastructure: $30K, Tools: $20K, Services: $10K"
                    />
                    <StatusCard
                      title="Cost per Project"
                      value="$35K"
                      status="warning"
                      icon={Folder}
                      description="Average project cost"
                    />
                    <ProgressCard
                      title="Cost Optimization"
                      value={75}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Cost reduction target"
                    />
                    <ProgressCard
                      title="Resource Utilization"
                      value={85}
                      max={100}
                      icon={Server}
                      unit="%"
                      description="Resource efficiency"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Budget Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Budget Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Budget vs Actual"
                      value="$120K"
                      status="success"
                      icon={Folder}
                      description="Actual: $115K, Variance: +$5K"
                    />
                    <StatusCard
                      title="Budget Allocation"
                      value="$120K"
                      status="success"
                      icon={Layout}
                      description="Development: 60%, Design: 20%, Marketing: 20%"
                    />
                    <StatusCard
                      title="Budget Forecast"
                      value="$130K"
                      status="success"
                      icon={LineChart}
                      description="Next quarter projection"
                    />
                    <ProgressCard
                      title="Budget Utilization"
                      value={75}
                      max={100}
                      icon={Wallet}
                      unit="%"
                      description="Current budget usage"
                    />
                    <ProgressCard
                      title="Budget Variance"
                      value={4}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Budget accuracy"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financial Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Financial Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Cash Flow"
                      value="$245K"
                      status="success"
                      icon={Wallet}
                      description="Net cash position"
                    />
                    <StatusCard
                      title="Working Capital"
                      value="$180K"
                      status="success"
                      icon={Activity}
                      description="Available working capital"
                    />
                    <StatusCard
                      title="Debt Ratio"
                      value="0.25"
                      status="success"
                      icon={LineChart}
                      description="Debt-to-equity ratio"
                    />
                    <ProgressCard
                      title="Gross Profit"
                      value={65}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Gross profit margin"
                    />
                    <ProgressCard
                      title="Net Profit"
                      value={32}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Net profit margin"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Investment & ROI */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Investment & ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Technology ROI"
                      value="280%"
                      status="success"
                      icon={Code}
                      description="Return on tech investments"
                    />
                    <StatusCard
                      title="Marketing ROI"
                      value="320%"
                      status="success"
                      icon={Megaphone}
                      description="Return on marketing spend"
                    />
                    <StatusCard
                      title="Training ROI"
                      value="250%"
                      status="success"
                      icon={Users}
                      description="Return on training investments"
                    />
                    <ProgressCard
                      title="Infrastructure ROI"
                      value={280}
                      max={100}
                      icon={Server}
                      unit="%"
                      description="Infrastructure investment return"
                    />
                    <ProgressCard
                      title="Client Acquisition"
                      value={85}
                      max={100}
                      icon={Users}
                      unit="%"
                      description="CAC efficiency"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Client Financial Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Client Financial Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Client Lifetime Value"
                      value="$85K"
                      status="success"
                      icon={Users}
                      description="Average client value"
                    />
                    <StatusCard
                      title="Payment History"
                      value="98%"
                      status="success"
                      icon={Wallet}
                      description="On-time payment rate"
                    />
                    <StatusCard
                      title="Client Profitability"
                      value="45%"
                      status="success"
                      icon={LineChart}
                      description="Average client profit margin"
                    />
                    <ProgressCard
                      title="Client Churn Rate"
                      value={5}
                      max={100}
                      icon={Users}
                      unit="%"
                      description="Annual client retention"
                    />
                    <ProgressCard
                      title="Payment Terms"
                      value={95}
                      max={100}
                      icon={Clock}
                      unit="%"
                      description="Terms compliance rate"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Team Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Revenue per Employee"
                      value="$150K"
                      status="success"
                      icon={Users}
                      description="Average revenue per team member"
                    />
                    <StatusCard
                      title="Billable Hours"
                      value="85%"
                      status="success"
                      icon={Clock}
                      description="Utilization rate"
                    />
                    <StatusCard
                      title="Team Profitability"
                      value="40%"
                      status="success"
                      icon={LineChart}
                      description="Team contribution margin"
                    />
                    <ProgressCard
                      title="Resource Efficiency"
                      value={85}
                      max={100}
                      icon={Server}
                      unit="%"
                      description="Resource utilization rate"
                    />
                    <ProgressCard
                      title="Project Delivery"
                      value={92}
                      max={100}
                      icon={Rocket}
                      unit="%"
                      description="On-time delivery rate"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Market Share"
                      value="12%"
                      status="success"
                      icon={Globe}
                      description="Industry market share"
                    />
                    <StatusCard
                      title="Competitor Pricing"
                      value="+5%"
                      status="success"
                      icon={LineChart}
                      description="Price premium vs. competitors"
                    />
                    <StatusCard
                      title="Industry Growth"
                      value="15%"
                      status="success"
                      icon={LineChart}
                      description="Market growth rate"
                    />
                    <ProgressCard
                      title="Market Opportunity"
                      value={85}
                      max={100}
                      icon={Globe}
                      unit="%"
                      description="Market potential capture"
                    />
                    <ProgressCard
                      title="Competitive Edge"
                      value={75}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Competitive advantage score"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Risk Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Risk Assessment"
                      value="Low"
                      status="success"
                      icon={Shield}
                      description="Overall risk level"
                    />
                    <StatusCard
                      title="Project Risk"
                      value="Medium"
                      status="warning"
                      icon={Folder}
                      description="Active project risk level"
                    />
                    <StatusCard
                      title="Insurance Coverage"
                      value="95%"
                      status="success"
                      icon={Shield}
                      description="Risk coverage"
                    />
                    <ProgressCard
                      title="Risk Mitigation"
                      value={85}
                      max={100}
                      icon={Shield}
                      unit="%"
                      description="Risk reduction effectiveness"
                    />
                    <ProgressCard
                      title="Compliance Score"
                      value={92}
                      max={100}
                      icon={Shield}
                      unit="%"
                      description="Regulatory compliance"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tax & Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="h-5 w-5" />
                    Tax & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatusCard
                      title="Tax Liability"
                      value="$45K"
                      status="warning"
                      icon={File}
                      description="Projected tax liability"
                    />
                    <StatusCard
                      title="Tax Deductions"
                      value="$25K"
                      status="success"
                      icon={File}
                      description="Available deductions"
                    />
                    <StatusCard
                      title="Compliance Status"
                      value="98%"
                      status="success"
                      icon={Shield}
                      description="Regulatory compliance"
                    />
                    <ProgressCard
                      title="Tax Optimization"
                      value={85}
                      max={100}
                      icon={LineChart}
                      unit="%"
                      description="Tax efficiency"
                    />
                    <ProgressCard
                      title="Compliance Cost"
                      value={15}
                      max={100}
                      icon={File}
                      unit="%"
                      description="Compliance cost ratio"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              {/* Features Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Features Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Total Features</div>
                      <div className="text-2xl font-bold">45</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">In Development</div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Planned</div>
                      <div className="text-2xl font-bold">8</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Completed</div>
                      <div className="text-2xl font-bold">25</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">In Testing</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">On Hold</div>
                      <div className="text-2xl font-bold">3</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Bug Reports</div>
                      <div className="text-2xl font-bold">18</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Feature Requests</div>
                      <div className="text-2xl font-bold">32</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
                      <div className="text-2xl font-bold">85%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="websites" className="space-y-6">
              {/* Websites Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Websites Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Total Websites</div>
                      <div className="text-2xl font-bold">6</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Active Sites</div>
                      <div className="text-2xl font-bold">4</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">In Development</div>
                      <div className="text-2xl font-bold">2</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Monthly Visitors</div>
                      <div className="text-2xl font-bold">250K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Page Views</div>
                      <div className="text-2xl font-bold">1.2M</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Avg. Session Time</div>
                      <div className="text-2xl font-bold">4m 30s</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Bounce Rate</div>
                      <div className="text-2xl font-bold">32%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
                      <div className="text-2xl font-bold">2.8%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">SSL Certificates</div>
                      <div className="text-2xl font-bold">6</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-6">
              {/* Marketing Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    Marketing Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Active Campaigns</div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Total Reach</div>
                      <div className="text-2xl font-bold">1.2M</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Engagement Rate</div>
                      <div className="text-2xl font-bold">4.5%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Email Subscribers</div>
                      <div className="text-2xl font-bold">45K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Social Followers</div>
                      <div className="text-2xl font-bold">28K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Lead Generation</div>
                      <div className="text-2xl font-bold">850</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Content Pieces</div>
                      <div className="text-2xl font-bold">120</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">ROI</div>
                      <div className="text-2xl font-bold">280%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Cost per Lead</div>
                      <div className="text-2xl font-bold">$24</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              {/* Sales Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Sales Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Monthly Revenue</div>
                      <div className="text-2xl font-bold">$45K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Active Deals</div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
                      <div className="text-2xl font-bold">3.2%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Pipeline Value</div>
                      <div className="text-2xl font-bold">$120K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Avg. Deal Size</div>
                      <div className="text-2xl font-bold">$8.5K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Sales Cycle</div>
                      <div className="text-2xl font-bold">45 days</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Win Rate</div>
                      <div className="text-2xl font-bold">68%</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Customer Lifetime Value</div>
                      <div className="text-2xl font-bold">$25K</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <div className="text-sm font-medium text-muted-foreground">Churn Rate</div>
                      <div className="text-2xl font-bold">2.4%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 
