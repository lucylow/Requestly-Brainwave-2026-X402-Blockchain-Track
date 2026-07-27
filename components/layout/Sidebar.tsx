'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  ChartBar,
  Activity,
  Settings,
  Search,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 || ChartBar },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card/50 border-r border-border">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-input bg-background/50 px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4 border border-cyan-500/20">
          <p className="text-xs text-muted-foreground">Balance</p>
          <p className="text-lg font-bold text-green-400">$4.998 USDC</p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Daily: $0.001 / $10</span>
            <span>45%</span>
          </div>
        </div>
      </div>
    </div>
  );
}