'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  AlertTriangle,
  LineChart, 
  Shield,
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
  AlertCircle,
  CheckCircle,
  XCircle,
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
  Brain as BrainIcon
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const riskData = [
  { month: 'Jan', financial: 25, operational: 15, market: 20 },
  { month: 'Feb', financial: 22, operational: 12, market: 18 },
  { month: 'Mar', financial: 20, operational: 10, market: 15 },
  { month: 'Apr', financial: 18, operational: 8, market: 12 },
  { month: 'May', financial: 15, operational: 5, market: 10 },
  { month: 'Jun', financial: 12, operational: 3, market: 8 },
];

const riskCategories = [
  { name: 'Financial', value: 35 },
  { name: 'Operational', value: 25 },
  { name: 'Market', value: 20 },
  { name: 'Regulatory', value: 15 },
  { name: 'Strategic', value: 5 },
];

const mitigationMetrics = [
  { name: 'Risk Mitigation', value: 85 },
  { name: 'Compliance Rate', value: 92 },
  { name: 'Risk Assessment', value: 88 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export default function RiskPage() {
  return (
    <div className="space-y-6">
      {/* Key Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Risk Score"
          value="12%"
          icon={AlertTriangle}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Risk Mitigation"
          value="85%"
          icon={Shield}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Compliance Rate"
          value="92%"
          icon={CheckCircle}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Risk Assessment"
          value="88%"
          icon={Activity}
          trend={{ value: 6, isPositive: true }}
        />
      </div>

      {/* Risk Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Risk Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="financial" stroke="#FF6B6B" name="Financial Risk" />
                <Line type="monotone" dataKey="operational" stroke="#4ECDC4" name="Operational Risk" />
                <Line type="monotone" dataKey="market" stroke="#45B7D1" name="Market Risk" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Risk Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={riskCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskCategories.map((entry, index) => (
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
              Mitigation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={mitigationMetrics}>
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

      {/* Risk Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Financial Risk"
          value="35%"
          status="warning"
          icon={Wallet}
          description="Highest risk category"
        />
        <StatusCard
          title="Operational Risk"
          value="25%"
          status="warning"
          icon={Briefcase}
          description="Medium risk category"
        />
        <StatusCard
          title="Market Risk"
          value="20%"
          status="warning"
          icon={Globe}
          description="Moderate risk category"
        />
        <ProgressCard
          title="Risk Mitigation"
          value={85}
          max={100}
          icon={Shield}
          unit="%"
          description="Overall risk mitigation rate"
        />
        <ProgressCard
          title="Compliance Rate"
          value={92}
          max={100}
          icon={CheckCircle}
          unit="%"
          description="Regulatory compliance score"
        />
        <ProgressCard
          title="Risk Assessment"
          value={88}
          max={100}
          icon={Activity}
          unit="%"
          description="Risk assessment completion"
        />
      </div>
    </div>
  );
} 