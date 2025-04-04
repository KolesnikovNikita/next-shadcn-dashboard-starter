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
import { decodeBase64 } from '@/lib/base64Decoder';
import { Separator } from '@/components/ui/separator';

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const userDetails = useUserStore((state) => state.userDetails);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userDetails?.profileImage) {
      try {
        // Create a data URL directly from the base64 string
        const dataUrl = `data:image/jpeg;base64,${userDetails.profileImage}`;
        setProfileImageUrl(dataUrl);
      } catch (error) {
        console.error('Error processing profile image:', error);
        setProfileImageUrl(null);
      }
    }
  }, [userDetails?.profileImage]);

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

          <div className='ml-auto mr-auto flex items-center gap-2'>
            <span className=''>{userDetails?.userName || 'User'}</span>
          </div>

          {/* Right: User info and logout */}
          <div className='ml-auto flex items-center gap-4'>
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
            <div className='p-x flex items-center justify-center gap-4 pt-4'>
              <Avatar className='h-[125px] w-[125px] border-4 border-red-500'>
                <AvatarImage
                  src={profileImageUrl || ''}
                  alt={userDetails?.userName || 'User'}
                  className='object-cover'
                />
                <AvatarFallback>
                  {getInitials(userDetails?.userName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <p className='text-center font-semibold'>
              {userDetails?.userName || 'User'}
            </p>
            <Separator />
            <div></div>

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
