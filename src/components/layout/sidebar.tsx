'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  LayoutDashboard,
  Link2,
  BadgePercent,
  BookOpen,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/integrations', label: 'Integrasi', icon: Link2 },
  { href: '/incentives', label: 'Insentif', icon: BadgePercent },
  { href: '/education', label: 'Edukasi', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-card md:block">
      <TooltipProvider>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="">DigiPajak UMKM</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                 <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          pathname === link.href
                            ? 'bg-muted text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{link.label}</p>
                    </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
