'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  Shield,
  LineChart, 
  CheckCircle,
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Target,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Brain,
  FileText,
  AlertCircle,
  Activity,
  Gauge,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Target as TargetIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Wallet as WalletIcon,
  Briefcase as BriefcaseIcon,
  GraduationCap as GraduationCapIcon,
  Trophy as TrophyIcon,
  Award as AwardIcon,
  Brain as BrainIcon,
  ClipboardCheck,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const complianceData = [
  { month: 'Jan', regulatory: 85, internal: 90, audit: 88 },
  { month: 'Feb', regulatory: 87, internal: 92, audit: 90 },
  { month: 'Mar', regulatory: 89, internal: 94, audit: 92 },
  { month: 'Apr', regulatory: 91, internal: 95, audit: 94 },
  { month: 'May', regulatory: 93, internal: 96, audit: 95 },
  { month: 'Jun', regulatory: 95, internal: 98, audit: 97 },
];

const complianceCategories = [
  { name: 'Regulatory', value: 35 },
  { name: 'Internal', value: 30 },
  { name: 'Audit', value: 25 },
  { name: 'Documentation', value: 10 },
];

const adherenceMetrics = [
  { name: 'Policy Adherence', value: 95 },
  { name: 'Documentation', value: 92 },
  { name: 'Training', value: 88 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      {/* Key Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Compliance"
          value="95%"
          icon={Shield}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Policy Adherence"
          value="98%"
          icon={CheckCircle}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Audit Score"
          value="97%"
          icon={ClipboardCheck}
          trend={{ value: 4, isPositive: true }}
        />
        <MetricCard
          title="Risk Level"
          value="Low"
          icon={AlertTriangle}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Compliance Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Compliance Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="regulatory" stroke="#8884d8" name="Regulatory" />
                <Line type="monotone" dataKey="internal" stroke="#82ca9d" name="Internal" />
                <Line type="monotone" dataKey="audit" stroke="#ffc658" name="Audit" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Compliance Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={complianceCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {complianceCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Adherence Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={adherenceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Value" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Regulatory Compliance"
          value="95%"
          status="success"
          icon={Shield}
          description="Regulatory requirements met"
        />
        <StatusCard
          title="Internal Policies"
          value="98%"
          status="success"
          icon={FileCheck}
          description="Internal policy adherence"
        />
        <StatusCard
          title="Audit Results"
          value="97%"
          status="success"
          icon={ClipboardCheck}
          description="Latest audit score"
        />
        <ProgressCard
          title="Policy Adherence"
          value={95}
          max={100}
          icon={CheckCircle}
          unit="%"
          description="Overall policy compliance"
        />
        <ProgressCard
          title="Documentation"
          value={92}
          max={100}
          icon={FileText}
          unit="%"
          description="Documentation completeness"
        />
        <ProgressCard
          title="Training"
          value={88}
          max={100}
          icon={GraduationCap}
          unit="%"
          description="Compliance training completion"
        />
      </div>
    </div>
  );
} 