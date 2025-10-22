'use client';

import { useUmkm } from '@/context/UmkmContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import Loading from '@/components/layout/loading';

const protectedRoutes = ['/', '/integrations', '/incentives', '/education', '/settings'];
const publicRoutes = ['/login', '/onboarding'];

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated, isOnboarded, isLoading } = useUmkm();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return; 

        const isProtectedRoute = protectedRoutes.includes(pathname);

        if (!isAuthenticated && isProtectedRoute) {
            router.push('/login');
        } else if (isAuthenticated) {
            if (!isOnboarded && pathname !== '/onboarding') {
                router.push('/onboarding');
            } else if (isOnboarded && (pathname === '/onboarding' || pathname === '/login')) {
                router.push('/');
            }
        }

    }, [isAuthenticated, isOnboarded, isLoading, pathname, router]);

    if (isLoading) {
        return <Loading />;
    }
    
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
        return <Loading />;
    }
    
    if (isAuthenticated && !isOnboarded && pathname !== '/onboarding') {
         return <Loading />;
    }

    if (publicRoutes.includes(pathname)) {
      return <>{children}</>;
    }

    if (isAuthenticated && isOnboarded && protectedRoutes.includes(pathname)) {
      return (
          <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
                {children}
              </main>
            </div>
          </div>
      );
    }
    
    return <Loading />;
}
