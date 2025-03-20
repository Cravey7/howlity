'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Monitor,
  LineChart,
  Users,
  Settings,
  Server,
  Building2,
  Globe,
  Shield,
  Activity,
  Target,
  Briefcase,
  Scale
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MAIN_NAVIGATION } from '@/lib/constants';

// Icon mapping
const iconMap = {
  Monitor,
  LineChart,
  Users,
  Settings,
  Server,
  Building2,
  Globe,
  Shield,
  Activity,
  Target,
  Briefcase,
  Scale,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Find the current section and its tabs
  const currentSection = MAIN_NAVIGATION.find(section => 
    pathname.startsWith(section.href)
  );

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r bg-background p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <nav className="space-y-1">
          {MAIN_NAVIGATION.map((section) => {
            const isActive = pathname.startsWith(section.href);
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            return (
              <Link
                key={section.name}
                href={section.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {section.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8">
          {/* Contextual Tabs */}
          {currentSection && (
            <div className="mb-8">
              <Tabs defaultValue={pathname} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  {currentSection.tabs.map((tab) => (
                    <Link key={tab.name} href={tab.href}>
                      <TabsTrigger
                        value={tab.href}
                        className={cn(
                          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                        )}
                      >
                        {tab.name}
                      </TabsTrigger>
                    </Link>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  );
} 