'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { StatusCard } from '@/components/dashboard/status-card';
import { 
  DollarSign, 
  LineChart, 
  Users, 
  Code, 
  Globe, 
  TrendingUp,
  BarChart,
  PieChart,
  Cell,
  Cpu,
  HardDrive,
  Wifi,
  Building2,
  Briefcase
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';

// Mock data for charts
const costData = [
  { month: 'Jan', actual: 35000, budget: 38000 },
  { month: 'Feb', actual: 38000, budget: 38000 },
  { month: 'Mar', actual: 42000, budget: 38000 },
  { month: 'Apr', actual: 40000, budget: 38000 },
  { month: 'May', actual: 45000, budget: 38000 },
  { month: 'Jun', actual: 48000, budget: 38000 },
];

const costByDepartment = [
  { name: 'Development', value: 180000 },
  { name: 'Design', value: 120000 },
  { name: 'Marketing', value: 90000 },
  { name: 'Operations', value: 60000 },
];

const resourceCosts = [
  { name: 'Infrastructure', value: 150000 },
  { name: 'Software', value: 100000 },
  { name: 'Services', value: 80000 },
  { name: 'Training', value: 70000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CostsPage() {
  return (
    <div className="space-y-6">
      {/* Key Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Costs"
          value="$450K"
          icon={DollarSign}
          trend={{ value: 12, isPositive: false }}
        />
        <MetricCard
          title="Cost Growth"
          value="12%"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: false }}
        />
        <MetricCard
          title="Budget Variance"
          value="+5%"
          icon={LineChart}
          trend={{ value: 2, isPositive: false }}
        />
        <MetricCard
          title="Cost per Project"
          value="$75K"
          icon={DollarSign}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Cost Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Cost Trend vs Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                <Line type="monotone" dataKey="budget" stroke="#82ca9d" name="Budget" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cost Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Costs by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={costByDepartment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costByDepartment.map((entry, index) => (
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
              Resource Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={resourceCosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Cost" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Infrastructure Costs"
          value="$150K"
          status="warning"
          icon={Cpu}
          description="Cloud: $80K, Hardware: $50K, Network: $20K"
        />
        <StatusCard
          title="Software Costs"
          value="$100K"
          status="warning"
          icon={Code}
          description="Licenses: $60K, Tools: $30K, Services: $10K"
        />
        <StatusCard
          title="Office Costs"
          value="$80K"
          status="success"
          icon={Building2}
          description="Rent: $50K, Utilities: $20K, Supplies: $10K"
        />
        <ProgressCard
          title="Cost Efficiency"
          value={85}
          max={100}
          icon={TrendingUp}
          unit="%"
          description="Resource utilization efficiency"
        />
        <ProgressCard
          title="Budget Utilization"
          value={95}
          max={100}
          icon={LineChart}
          unit="%"
          description="Current budget usage"
        />
        <ProgressCard
          title="Cost Optimization"
          value={75}
          max={100}
          icon={Globe}
          unit="%"
          description="Cost reduction opportunities"
        />
      </div>
    </div>
  );
} 