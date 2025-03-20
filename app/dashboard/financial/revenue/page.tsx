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
  Cell
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie } from 'recharts';
import { CHART_COLORS, CHART_HEIGHT, CHART_MARGIN } from '@/lib/constants';
import { monthlyData, revenueByType, clientSegments } from '@/lib/mock-data/financial';

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$450K"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard
          title="Revenue Growth"
          value="15%"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Forecast Accuracy"
          value="92%"
          icon={LineChart}
          trend={{ value: 2, isPositive: true }}
        />
        <MetricCard
          title="Average Deal Size"
          value="$85K"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Revenue Trend & Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] md:h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={monthlyData} margin={CHART_MARGIN}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS[0]} name="Actual" />
                <Line type="monotone" dataKey="forecast" stroke={CHART_COLORS[1]} name="Forecast" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Revenue by Project Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] md:h-[250px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={revenueByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill={CHART_COLORS[0]}
                    dataKey="value"
                  >
                    {revenueByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
              Revenue by Client Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] md:h-[250px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={clientSegments} margin={CHART_MARGIN}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={CHART_COLORS[0]} name="Revenue" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatusCard
          title="Revenue by Project Type"
          value="$450K"
          status="success"
          icon={Code}
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
          icon={Globe}
          description="Development: $300K, Maintenance: $100K, Consulting: $50K"
        />
        <ProgressCard
          title="Revenue Growth"
          value={15}
          max={100}
          icon={TrendingUp}
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
        <ProgressCard
          title="Market Share"
          value={12}
          max={100}
          icon={Globe}
          unit="%"
          description="Industry market share"
        />
      </div>
    </div>
  );
} 