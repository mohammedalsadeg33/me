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
  Brain,
  MoreHorizontal
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
  onOpenSettings,
  onOpenBlockPlanner
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

  // Primary navigation links visible directly on the desktop bar
  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'study-smarter', label: 'Study Smarter' },
    { id: 'block-planner', label: 'Block Planner' },
  ];

  // Secondary navigation links cleanly contained in the three-dot navigation menu
  const secondaryNavItems = [
    { id: 'career-development', label: 'Career Development' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'community', label: 'Student Community' },
  ];

  // All navigation items combined for mobile menu
  const allNavItems = [
    ...primaryNavItems,
    ...secondaryNavItems
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === currentTab);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#102C3A]/95 dark:bg-[#091720]/95 backdrop-blur-md border-b border-[#183C4F] dark:border-[#142B38] shadow-sm'
          : 'bg-[#102C3A] dark:bg-[#091720] border-b border-[#183C4F] dark:border-[#142B38]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 lg:gap-6">
          
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] rounded-lg py-1"
              aria-label="MedRise Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#176B65] border border-[#A8E6CF]/30 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-[#1F8880] transition-colors">
                <span className="text-[#A8E6CF] text-lg font-black tracking-tighter">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#A8E6CF] transition-colors whitespace-nowrap">
                  MedRise
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#A8E6CF] font-medium -mt-1 hidden sm:block">
                  Learn · Connect · Rise
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links & Three-Dot Navigation Menu (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-medium"
          >
            {primaryNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 px-2 text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] rounded cursor-pointer ${
                    isActive
                      ? 'text-[#A8E6CF] font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.id === 'block-planner' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#176B65] text-[#A8E6CF] border border-[#A8E6CF]/30">
                        مخطط
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A8E6CF] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Three-Dot Navigation Menu for Secondary Pages - Strictly Positioned within Layout */}
            <div id="more-menu-container" className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`relative py-1.5 px-2.5 text-sm whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] rounded-lg flex items-center gap-1.5 cursor-pointer border ${
                  isSecondaryActive || moreMenuOpen
                    ? 'text-[#A8E6CF] bg-[#183C4F] border-[#A8E6CF]/30 font-semibold'
                    : 'text-slate-200 hover:text-white hover:bg-[#183C4F]/60 border-transparent'
                }`}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                aria-label="More navigation pages"
                title="More navigation pages"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="text-xs">More</span>
                {isSecondaryActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
                )}
              </button>

              {/* Three-Dot Dropdown Card - Positioned strictly within container without clipping */}
              {moreMenuOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute left-0 mt-2 w-56 rounded-2xl bg-[#102C3A] dark:bg-[#0E202B] border border-[#183C4F] dark:border-[#1E3D4F] shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-[#183C4F]/70 mb-1">
                    Secondary Pages
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
                            ? 'bg-[#176B65] text-white font-semibold'
                            : 'text-slate-200 hover:bg-[#183C4F] hover:text-white'
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

          {/* Zone 3: Actions & Utility Controls (Unified Toolbar Alignment) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 sm:gap-2 h-9 px-2.5 sm:px-3 text-xs font-medium text-slate-200 bg-[#183C4F]/80 hover:bg-[#183C4F] hover:text-white rounded-lg border border-slate-700/70 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label="Search resources and opportunities"
              title="Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-200" />
              <span className="hidden sm:inline text-xs">Search</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] text-slate-300 bg-[#102C3A] rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks Trigger */}
            <button
              type="button"
              onClick={onOpenBookmarks}
              className="relative w-9 h-9 sm:w-10 sm:h-10 text-slate-200 hover:text-white hover:bg-[#183C4F] rounded-lg border border-transparent hover:border-slate-700/60 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label="View saved bookmarks"
              title="Saved items"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-[#102C3A] bg-[#A8E6CF] rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Contact Email Trigger (Desktop & Tablet) */}
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 text-slate-200 hover:text-white hover:bg-[#183C4F] rounded-lg border border-transparent hover:border-slate-700/60 transition-colors cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label="Contact official email"
              title="Email: mohammedalsadeg33@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Dark Mode Toggle - Perfectly dimensioned and aligned with utility controls */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 text-slate-200 hover:text-white hover:bg-[#183C4F] rounded-lg border border-transparent hover:border-slate-700/60 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-200 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Authentication / Profile Avatar (Desktop) - Only rendered when logged in */}
            {user && (
              <div className="hidden md:flex items-center gap-2 border-l border-[#183C4F] pl-2 ml-0.5">
                <div id="profile-dropdown-container" className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-[#183C4F] transition-all cursor-pointer border border-[#183C4F] hover:border-[#A8E6CF]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                    aria-expanded={profileDropdownOpen}
                    aria-haspopup="true"
                    aria-label="User profile and account settings"
                  >
                    {/* Gradient Initials Avatar */}
                    <div className="relative">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#176B65] to-[#11534E] border border-[#A8E6CF]/40 flex items-center justify-center text-[#A8E6CF] font-bold text-xs shadow-xs">
                        {getInitials()}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#102C3A]" />
                    </div>

                    <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                      {user.user_metadata?.display_name || user.email?.split('@')[0]}
                    </span>

                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-[#A8E6CF]' : ''}`} />
                  </button>

                  {/* Dropdown Menu Card */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Identity Header */}
                      <div className="p-4 border-b border-slate-100 dark:border-[#1E3D4F] bg-slate-50/70 dark:bg-[#0D202B]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#176B65] to-[#11534E] border border-[#A8E6CF]/30 flex items-center justify-center text-[#A8E6CF] font-bold text-sm shadow-xs shrink-0">
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

                      {/* Dropdown Menu Items */}
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

                      {/* Divider & Log Out */}
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

            {/* Mobile Menu Button - Accurately positioned within navigation bounds */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 text-slate-100 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
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
          className="fixed inset-0 top-16 sm:top-18 bg-black/50 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Dropdown Drawer */}
      <div
        id="mobile-navigation-menu"
        role="navigation"
        aria-label="Mobile Navigation"
        className={`lg:hidden absolute top-full left-0 right-0 z-40 bg-[#102C3A] dark:bg-[#091720] border-b border-[#183C4F] dark:border-[#142B38] shadow-2xl transition-all duration-200 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100vh-4.5rem)] max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain px-4 pt-3 pb-5 space-y-3">
          {/* Menu Header Label */}
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-slate-200 px-3 py-1.5 border-b border-[#183C4F]/70">
            <span>Navigation Menu</span>
            <span className="text-[11px] text-[#A8E6CF] font-medium tracking-normal capitalize">MedRise Egypt</span>
          </div>

          {/* All Nav Items (Preserving all existing links + dedicated Block Planner) */}
          <div className="space-y-1">
            {allNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF] cursor-pointer ${
                    isActive
                      ? 'bg-[#176B65] text-white font-semibold shadow-xs'
                      : 'text-slate-100 hover:bg-[#183C4F] hover:text-white active:bg-[#183C4F]/90'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2">
                    {item.id === 'block-planner' && (
                      <Brain className="w-4 h-4 text-[#A8E6CF]" />
                    )}
                    <span className="text-sm tracking-wide">{item.label}</span>
                    {item.id === 'block-planner' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#0E2430] text-[#A8E6CF] border border-[#A8E6CF]/30">
                        مخطط البلوكات
                      </span>
                    )}
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

          {/* Mobile Authentication Section - Only rendered when logged in */}
          {user && (
            <div className="pt-2 border-t border-[#183C4F]/70">
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#0E2430] border border-[#183C4F] text-xs text-slate-200">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#176B65] to-[#11534E] border border-[#A8E6CF]/30 flex items-center justify-center text-[#A8E6CF] font-bold text-xs shrink-0">
                    {getInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate text-xs">
                      {user.user_metadata?.display_name || 'Medical Student'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    {user.user_metadata?.medical_school && (
                      <p className="text-[10px] text-[#A8E6CF] truncate mt-0.5">
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
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#183C4F] hover:bg-[#1f4c63] text-white text-xs font-semibold border border-slate-700 min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                  >
                    <Settings className="w-4 h-4 text-[#A8E6CF]" />
                    <span>Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/70 text-red-200 border border-red-800/40 text-xs font-semibold min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#183C4F]/70 hover:bg-[#183C4F] text-slate-100 text-xs font-medium border border-slate-700/70 min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            >
              <Search className="w-3.5 h-3.5 text-slate-200" />
              <span>Search Hub</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#183C4F]/70 hover:bg-[#183C4F] text-slate-100 text-xs font-medium border border-slate-700/70 min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#A8E6CF]" />
              <span>Saved Items ({bookmarksCount})</span>
            </button>
          </div>

          {/* Theme Toggle inside Mobile Menu */}
          <div className="pt-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#183C4F]/70 hover:bg-[#183C4F] text-slate-100 text-xs font-medium border border-slate-700/70 min-h-[44px] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-200" />
                )}
                <span>Theme Mode</span>
              </span>
              <span className="text-[#A8E6CF] font-semibold text-xs capitalize flex items-center gap-1.5">
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8E6CF]" />
              </span>
            </button>
          </div>

          {/* Mobile Footer Info & Contact */}
          <div className="pt-3 border-t border-[#183C4F] flex items-center justify-between px-3 text-xs text-slate-300">
            <span className="text-slate-300 font-medium">Egypt Medical Student Hub</span>
            <a
              href="mailto:mohammedalsadeg33@gmail.com"
              className="text-[#A8E6CF] hover:text-white hover:underline flex items-center gap-1.5 font-semibold py-1.5 px-2.5 rounded-md hover:bg-[#183C4F]/60 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8E6CF]"
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
