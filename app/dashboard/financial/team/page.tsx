'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  DollarSign, 
  LineChart, 
  Users,
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  UserPlus,
  UserMinus,
  Clock,
  Target,
  Star,
  Building2,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Brain
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const teamData = [
  { month: 'Jan', revenue: 40000, utilization: 0.85, productivity: 0.92 },
  { month: 'Feb', revenue: 45000, utilization: 0.88, productivity: 0.94 },
  { month: 'Mar', revenue: 42000, utilization: 0.86, productivity: 0.93 },
  { month: 'Apr', revenue: 48000, utilization: 0.90, productivity: 0.95 },
  { month: 'May', revenue: 50000, utilization: 0.92, productivity: 0.96 },
  { month: 'Jun', revenue: 55000, utilization: 0.95, productivity: 0.97 },
];

const teamAllocation = [
  { name: 'Development', value: 180000 },
  { name: 'Design', value: 120000 },
  { name: 'Marketing', value: 90000 },
  { name: 'Operations', value: 60000 },
];

const performanceMetrics = [
  { name: 'Billable Hours', value: 85 },
  { name: 'Project Delivery', value: 92 },
  { name: 'Client Satisfaction', value: 95 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Key Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Team Revenue"
          value="$450K"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Team Size"
          value="45"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Utilization Rate"
          value="95%"
          icon={Target}
          trend={{ value: 3, isPositive: true }}
        />
        <MetricCard
          title="Productivity"
          value="97%"
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Team Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Team Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={teamData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                <Line type="monotone" dataKey="utilization" stroke="#82ca9d" name="Utilization" />
                <Line type="monotone" dataKey="productivity" stroke="#ffc658" name="Productivity" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Team Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={teamAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {teamAllocation.map((entry, index) => (
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
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={performanceMetrics}>
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

      {/* Team Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Development Team"
          value="$180K"
          status="success"
          icon={Code}
          description="15 members, 40% of revenue"
        />
        <StatusCard
          title="Design Team"
          value="$120K"
          status="success"
          icon={Palette}
          description="10 members, 27% of revenue"
        />
        <StatusCard
          title="Marketing Team"
          value="$90K"
          status="success"
          icon={Globe}
          description="8 members, 20% of revenue"
        />
        <ProgressCard
          title="Billable Hours"
          value={85}
          max={100}
          icon={Clock}
          unit="%"
          description="Team utilization rate"
        />
        <ProgressCard
          title="Project Delivery"
          value={92}
          max={100}
          icon={Trophy}
          unit="%"
          description="On-time project delivery"
        />
        <ProgressCard
          title="Client Satisfaction"
          value={95}
          max={100}
          icon={Star}
          unit="%"
          description="Client satisfaction score"
        />
      </div>
    </div>
  );
} 