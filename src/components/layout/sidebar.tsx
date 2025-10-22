'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  LayoutDashboard,
  Link2,
  BadgePercent,
  BookOpen,
  LogOut,
  Settings,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { useUmkm } from '@/context/UmkmContext';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/integrations', label: 'Integrasi', icon: Link2 },
  { href: '/incentives', label: 'Insentif', icon: BadgePercent },
  { href: '/education', label: 'Edukasi', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useUmkm();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari sesi Anda.",
    });
  };

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
          <div className="flex-1 overflow-auto py-2">
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
           <div className="mt-auto flex flex-col gap-2 p-2 lg:px-4">
             <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings"
                     className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          pathname === "/settings"
                            ? 'bg-muted text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                  >
                    <Settings className="h-4 w-4" />
                    Pengaturan
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Pengaturan</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-3 px-3 text-muted-foreground hover:text-primary" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        Keluar
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Keluar</p>
                </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
