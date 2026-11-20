import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Menu,
  X,
  Mail,
  LogOut,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  Brain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenSettings: () => void;
  onOpenBlockPlanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarksCount,
  onOpenAuth,
  onOpenSettings
}) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Extract student initials for the avatar badge
  const getInitials = () => {
    const displayName = user?.user_metadata?.display_name;
    if (displayName && displayName.trim()) {
      const parts = displayName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'MR';
  };

  // Close profile dropdown and more menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
      if (!target.closest('#more-menu-container')) {
        setMoreMenuOpen(false);
      }
    };
    if (profileDropdownOpen || moreMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [profileDropdownOpen, moreMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close menus on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (moreMenuOpen) setMoreMenuOpen(false);
        if (profileDropdownOpen) setProfileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, moreMenuOpen, profileDropdownOpen]);

  // Close mobile menu if viewport resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop center navigation links matching reference layout & order
  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'courses', label: 'Courses' },
    { id: 'community', label: 'Community' },
  ];

  // Remaining destinations cleanly contained in the "More" dropdown menu
  const secondaryNavItems = [
    { id: 'study-smarter', label: 'Study Smarter' },
    { id: 'block-planner', label: 'Block Planner (مخطط البلوكات)' },
    { id: 'career-development', label: 'Career Development' },
  ];

  // All navigation items combined for mobile drawer
  const allNavItems = [
    ...primaryNavItems,
    ...secondaryNavItems
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === currentTab);
  const isTransparentHeroBar = currentTab === 'home' && !scrolled && !mobileMenuOpen;

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isTransparentHeroBar
          ? 'bg-transparent border-b border-transparent'
          : 'bg-[#F7F5F3]/95 dark:bg-[#091720]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-[#142B38] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-[74px] gap-4">
          
          {/* Zone 1: Geometric MedRise Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF] rounded-lg py-1 cursor-pointer"
              aria-label="MedRise Home"
            >
              {/* Three-petal rising geometric emblem matching reference mark */}
              <svg
                viewBox="0 0 36 30"
                className="w-8 h-7 text-[#0E2539] dark:text-[#A8E6CF] shrink-0 transition-transform duration-200 group-hover:scale-105"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Top center rising leaf */}
                <path d="M18 1.5C19.6 3.5 21.8 6.3 21.8 8.6C21.8 10.9 19.8 12.8 18 14.2C16.2 12.8 14.2 10.9 14.2 8.6C14.2 6.3 16.4 3.5 18 1.5Z" />
                {/* Left wing petal */}
                <path d="M5.2 10.2C7.8 9.9 11.4 12.4 13.7 15.2C15.9 17.9 16.8 21.3 16.5 25.5C13.1 24.4 9.7 21.8 7.3 18.8C5.1 16.1 4.1 12.6 5.2 10.2Z" />
                {/* Right wing petal */}
                <path d="M30.8 10.2C28.2 9.9 24.6 12.4 22.3 15.2C20.1 17.9 19.2 21.3 19.5 25.5C22.9 24.4 26.3 21.8 28.7 18.8C30.9 16.1 31.9 12.6 30.8 10.2Z" />
              </svg>
              <span className="text-[22px] font-bold tracking-[-0.02em] text-[#0E2539] dark:text-white whitespace-nowrap">
                MedRise
              </span>
            </button>
          </div>

          {/* Zone 2: Center Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9 text-[14px]"
          >
            {primaryNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF] rounded cursor-pointer ${
                    isActive
                      ? 'text-[#0E2539] dark:text-white font-semibold'
                      : 'text-[#4E5E6E] dark:text-slate-300 hover:text-[#0E2539] dark:hover:text-white font-normal'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0E2539] dark:bg-[#A8E6CF] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* More Dropdown for Secondary Navigation Items */}
            <div id="more-menu-container" className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`relative py-2 whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF] rounded flex items-center gap-1 cursor-pointer ${
                  isSecondaryActive || moreMenuOpen
                    ? 'text-[#0E2539] dark:text-white font-semibold'
                    : 'text-[#4E5E6E] dark:text-slate-300 hover:text-[#0E2539] dark:hover:text-white font-normal'
                }`}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                aria-label="More navigation pages"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    moreMenuOpen ? 'rotate-180' : ''
                  }`}
                />
                {isSecondaryActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0E2539] dark:bg-[#A8E6CF] rounded-full" />
                )}
              </button>

              {moreMenuOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute left-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#0E202B] border border-slate-200/90 dark:border-[#1E3D4F] shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 dark:border-[#183C4F] mb-1">
                    Academic Tools & Guides
                  </div>
                  {secondaryNavItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        role="menuitem"
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-[#0E2539] dark:bg-[#176B65] text-white font-semibold'
                            : 'text-[#0E2539] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#183C4F]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Right Controls (Search, Utility Icons, Sign In Pill / Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-9 h-9 text-[#0E2539] dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF]"
              aria-label="Search resources and opportunities"
              title="Search (Ctrl+K)"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.8]" />
            </button>

            {/* Saved Bookmarks Icon (subtle outline icon preserving saved bookmarks) */}
            <button
              type="button"
              onClick={onOpenBookmarks}
              className="relative w-9 h-9 text-[#4E5E6E] hover:text-[#0E2539] dark:text-slate-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF]"
              aria-label="View saved bookmarks"
              title="Saved items"
            >
              <Bookmark className="w-[17px] h-[17px] stroke-[1.8]" />
              {bookmarksCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-[#176B65] rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 text-[#4E5E6E] hover:text-[#0E2539] dark:text-slate-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539] dark:focus-visible:ring-[#A8E6CF]"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-[17px] h-[17px] text-amber-300 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-[17px] h-[17px] stroke-[1.8] transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Authentication: Sign In Pill (when logged out) OR Profile Avatar (when logged in) */}
            {!user ? (
              <button
                type="button"
                onClick={() => onOpenAuth?.('login')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#0E2539] hover:bg-[#173854] dark:bg-[#176B65] dark:hover:bg-[#1E827B] text-white text-[13px] font-medium shadow-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539]"
              >
                Sign In
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 pl-1">
                <div id="profile-dropdown-container" className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white/80 dark:bg-[#102430] hover:bg-white dark:hover:bg-[#183C4F] transition-all cursor-pointer border border-slate-200/80 dark:border-[#1E3D4F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539]"
                    aria-expanded={profileDropdownOpen}
                    aria-haspopup="true"
                    aria-label="User profile and account settings"
                  >
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-[#0E2539] dark:bg-[#176B65] flex items-center justify-center text-white font-bold text-xs">
                        {getInitials()}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#102C3A]" />
                    </div>

                    <span className="text-xs font-semibold text-[#0E2539] dark:text-slate-200 max-w-[100px] truncate">
                      {user.user_metadata?.display_name || user.email?.split('@')[0]}
                    </span>

                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu Card */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="p-4 border-b border-slate-100 dark:border-[#1E3D4F] bg-slate-50/70 dark:bg-[#0D202B]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0E2539] dark:bg-[#176B65] flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {getInitials()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#102C3A] dark:text-white truncate">
                              {user.user_metadata?.display_name || 'Medical Student'}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {user.email}
                            </p>
                            {user.user_metadata?.medical_school && (
                              <p className="text-[10px] text-[#176B65] dark:text-[#A8E6CF] font-medium truncate mt-0.5">
                                {user.user_metadata.medical_school}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-1.5 space-y-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleNavClick('block-planner');
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#EEF9F5] dark:hover:bg-[#153243] hover:text-[#176B65] dark:hover:text-[#A8E6CF] transition-colors cursor-pointer text-left font-medium"
                        >
                          <div className="flex items-center gap-2.5">
                            <Brain className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                            <span>مخطط مراجعة البلوكات</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EEF9F5] dark:bg-[#16363B] text-[#176B65] dark:text-[#A8E6CF]">
                            5+2
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onOpenSettings();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#EEF9F5] dark:hover:bg-[#153243] hover:text-[#176B65] dark:hover:text-[#A8E6CF] transition-colors cursor-pointer text-left font-medium"
                        >
                          <Settings className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                          <span>Account Settings</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onOpenBookmarks();
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#EEF9F5] dark:hover:bg-[#153243] hover:text-[#176B65] dark:hover:text-[#A8E6CF] transition-colors cursor-pointer text-left font-medium"
                        >
                          <div className="flex items-center gap-2.5">
                            <Bookmark className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                            <span>Saved Bookmarks</span>
                          </div>
                          {bookmarksCount > 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#176B65] text-white">
                              {bookmarksCount}
                            </span>
                          )}
                        </button>
                      </div>

                      <div className="p-1.5 pt-0 border-t border-slate-100 dark:border-[#1E3D4F]">
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer text-left font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 text-[#0E2539] dark:text-slate-100 hover:bg-black/5 dark:hover:bg-[#183C4F] rounded-full transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2539]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for outside click to dismiss mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-[74px] bg-black/40 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Dropdown Drawer */}
      <div
        id="mobile-navigation-menu"
        role="navigation"
        aria-label="Mobile Navigation"
        className={`lg:hidden absolute top-full left-0 right-0 z-40 bg-[#F7F5F3] dark:bg-[#091720] border-b border-slate-200 dark:border-[#142B38] shadow-2xl transition-all duration-200 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100vh-4.5rem)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-4 pt-3 pb-5 space-y-3">
          {/* Menu Header Label */}
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-300 px-3 py-1.5 border-b border-slate-200/80 dark:border-[#183C4F]/70">
            <span>Navigation Menu</span>
            <span className="text-[11px] text-[#176B65] dark:text-[#A8E6CF] font-semibold tracking-normal capitalize">MedRise Egypt</span>
          </div>

          {/* All Nav Items */}
          <div className="space-y-1">
            {allNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65] cursor-pointer ${
                    isActive
                      ? 'bg-[#0E2539] dark:bg-[#176B65] text-white font-semibold shadow-xs'
                      : 'text-[#0E2539] dark:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-[#183C4F]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2">
                    {item.id === 'block-planner' && (
                      <Brain className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                    )}
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1.5 text-xs text-[#A8E6CF] font-semibold">
                      <span>Active</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Sign In Button when logged out */}
          {!user ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.('login');
                }}
                className="w-full py-3 rounded-full bg-[#0E2539] hover:bg-[#173854] text-white text-sm font-semibold cursor-pointer"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-200 dark:border-[#183C4F]/70">
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E2430] border border-slate-200 dark:border-[#183C4F] text-xs">
                  <div className="w-9 h-9 rounded-full bg-[#0E2539] dark:bg-[#176B65] flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {getInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0E2539] dark:text-white truncate text-xs">
                      {user.user_metadata?.display_name || 'Medical Student'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    {user.user_metadata?.medical_school && (
                      <p className="text-[10px] text-[#176B65] dark:text-[#A8E6CF] truncate mt-0.5">
                        {user.user_metadata.medical_school}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSettings();
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white dark:bg-[#183C4F] text-[#0E2539] dark:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 min-h-[44px] transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                    <span>Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800/40 text-xs font-semibold min-h-[44px] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Hub Shortcuts inside Mobile Menu */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-[#183C4F]/70 text-[#0E2539] dark:text-slate-100 text-xs font-medium border border-slate-200 dark:border-slate-700/70 min-h-[44px] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Hub</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-[#183C4F]/70 text-[#0E2539] dark:text-slate-100 text-xs font-medium border border-slate-200 dark:border-slate-700/70 min-h-[44px] transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
              <span>Saved Items ({bookmarksCount})</span>
            </button>
          </div>

          {/* Mobile Footer Info & Contact */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#183C4F] flex items-center justify-between px-3 text-xs text-slate-500 dark:text-slate-300">
            <span className="font-medium">Egypt Medical Student Hub</span>
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="text-[#176B65] dark:text-[#A8E6CF] hover:underline flex items-center gap-1.5 font-semibold py-1.5 px-2.5 rounded-md"
              aria-label="Contact official email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
