'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from '@/components/ui/sheet';
import { Menu, LogOut, User, Settings, HelpCircle } from 'lucide-react';
import logo from '@/assets/img/logo-2.png';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const userDetails = useUserStore((state) => state.userDetails);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const navigationItems = [
    { name: 'Profile', icon: User, href: '#' },
    { name: 'Settings', icon: Settings, href: '#' },
    { name: 'Help', icon: HelpCircle, href: '#' }
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.slice(0, 2).toUpperCase();
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Navbar */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 items-center'>
          {/* Left: Toggle button */}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className='h-5 w-5' />
          </Button>

          {/* Center: Logo */}
          <div className='flex items-center gap-2 pl-1'>
            <Avatar className='h-14 w-14'>
              <AvatarImage src={logo.src} alt='747 Agents Logo' />
              <AvatarFallback>747</AvatarFallback>
            </Avatar>
          </div>

          {/* Right: User info and logout */}
          <div className='ml-auto flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={userDetails?.profileImage}
                  alt={userDetails?.userName || 'User'}
                />
                <AvatarFallback>
                  {getInitials(userDetails?.userName)}
                </AvatarFallback>
              </Avatar>
              <span className='hidden md:block'>
                {userDetails?.userName || 'User'}
              </span>
            </div>
            <Button variant='ghost' size='icon' onClick={handleLogout}>
              <LogOut className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side='left' className='w-64'>
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Sidebar menu</SheetTitle>
              <SheetDescription>Choose link for redirect</SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <div className='flex flex-col gap-4'>
            {/* User profile */}
            <div className='flex items-center gap-4 p-4'>
              <Avatar className='h-12 w-12'>
                <AvatarImage
                  src={userDetails?.profileImage}
                  alt={userDetails?.userName || 'User'}
                />
                <AvatarFallback>
                  {getInitials(userDetails?.userName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='font-semibold'>
                  {userDetails?.userName || 'User'}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {userDetails?.email || 'No email provided'}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className='flex flex-col gap-2'>
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent'
                >
                  <item.icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className='container py-6'>{children}</main>
    </div>
  );
}
