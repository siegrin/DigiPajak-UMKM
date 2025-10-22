'use client';

import Link from 'next/link';
import {
  Menu,
  ShieldCheck,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
  Link2,
  BadgePercent,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useUmkm } from '@/context/UmkmContext';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/integrations', label: 'Integrasi', icon: Link2 },
  { href: '/incentives', label: 'Insentif', icon: BadgePercent },
  { href: '/education', label: 'Edukasi', icon: BookOpen },
];

function getPathBreadcrumb(path: string) {
    if (path === '/') return 'Dashboard';
    const parts = path.split('/').filter(p => p);
    if (parts.length > 0) {
        const pageName = parts[parts.length -1];
        // Capitalize first letter and handle slugs like 'id-card'
        return pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return 'Dashboard';
}

export default function Header() {
  const pathname = usePathname();
  const pageTitle = getPathBreadcrumb(pathname);
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const { logout } = useUmkm();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari sesi Anda.",
    });
  };

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
             <SheetHeader>
                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-2 text-base font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span>DigiPajak UMKM</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`-mx-2 flex items-center gap-4 rounded-xl px-4 py-2 ${
                    pathname === link.href
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`-mx-2 flex items-center gap-4 rounded-xl px-4 py-2 ${
                    pathname === "/settings"
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  Pengaturan
                </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="w-full flex-1">
          <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                  </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ganti Tema</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu Pengguna</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </TooltipProvider>
  );
}
