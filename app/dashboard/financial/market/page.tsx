'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  DollarSign, 
  LineChart, 
  Globe,
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
  Search,
  BarChart2,
  PieChart as PieChartIcon,
  Globe2,
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
const marketData = [
  { month: 'Jan', marketShare: 15, growth: 12, competition: 8 },
  { month: 'Feb', marketShare: 16, growth: 14, competition: 7 },
  { month: 'Mar', marketShare: 17, growth: 15, competition: 6 },
  { month: 'Apr', marketShare: 18, growth: 16, competition: 5 },
  { month: 'May', marketShare: 19, growth: 18, competition: 4 },
  { month: 'Jun', marketShare: 20, growth: 20, competition: 3 },
];

const marketSegments = [
  { name: 'Enterprise', value: 45 },
  { name: 'SMB', value: 30 },
  { name: 'Startup', value: 15 },
  { name: 'Government', value: 10 },
];

const competitiveMetrics = [
  { name: 'Market Share', value: 20 },
  { name: 'Growth Rate', value: 25 },
  { name: 'Brand Recognition', value: 85 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MarketPage() {
  return (
    <div className="space-y-6">
      {/* Key Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Market Share"
          value="20%"
          icon={Target}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Market Growth"
          value="25%"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Competition Index"
          value="3.5"
          icon={Users}
          trend={{ value: 2, isPositive: true }}
        />
        <MetricCard
          title="Brand Recognition"
          value="85%"
          icon={Globe}
          trend={{ value: 10, isPositive: true }}
        />
      </div>

      {/* Market Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Market Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="marketShare" stroke="#8884d8" name="Market Share" />
                <Line type="monotone" dataKey="growth" stroke="#82ca9d" name="Growth" />
                <Line type="monotone" dataKey="competition" stroke="#ffc658" name="Competition" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Market Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={marketSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {marketSegments.map((entry, index) => (
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
              Competitive Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={competitiveMetrics}>
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

      {/* Market Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Enterprise Segment"
          value="45%"
          status="success"
          icon={Building2}
          description="Largest market segment"
        />
        <StatusCard
          title="SMB Segment"
          value="30%"
          status="success"
          icon={Briefcase}
          description="Growing segment"
        />
        <StatusCard
          title="Startup Segment"
          value="15%"
          status="success"
          icon={GraduationCap}
          description="Emerging market"
        />
        <ProgressCard
          title="Market Penetration"
          value={75}
          max={100}
          icon={Target}
          unit="%"
          description="Market penetration rate"
        />
        <ProgressCard
          title="Customer Loyalty"
          value={90}
          max={100}
          icon={Trophy}
          unit="%"
          description="Customer retention rate"
        />
        <ProgressCard
          title="Brand Recognition"
          value={85}
          max={100}
          icon={Award}
          unit="%"
          description="Brand awareness score"
        />
      </div>
    </div>
  );
} 