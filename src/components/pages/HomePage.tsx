import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Award,
  Users,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  LogIn,
  UserPlus,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  Stethoscope,
  Microscope,
  BookCheck,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Resource, Opportunity, Article, CommunityStory } from '../../types';
import { ResourceCard } from '../ResourceCard';
import { OpportunityCard } from '../OpportunityCard';
import { IMAGES } from '../../assets/images';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  featuredResources: Resource[];
  spotlightOpportunities: Opportunity[];
  featuredArticles: Article[];
  communityStories: CommunityStory[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string, type: 'resource' | 'opportunity') => void;
  onSelectResource: (resource: Resource) => void;
  onSelectArticle: (article: Article) => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenBlockPlanner?: (blockId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  featuredResources,
  spotlightOpportunities,
  featuredArticles,
  communityStories,
  isBookmarked,
  onToggleBookmark,
  onSelectResource,
  onSelectArticle,
  onOpenAuth,
  onOpenBlockPlanner
}) => {
  const { user } = useAuth();

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* SECTION 1: EDITORIAL HERO */}
      <section className="relative pt-4 sm:pt-8 pb-4 overflow-hidden border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Composition: Prominent Top Image with Softly Fading Edges & Integrated Welcome Message */}
          <div className="relative">
            {/* Top Main Image with Softly Fading Portrait Edges */}
            <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={IMAGES.heroStudy}
                alt="Medical students collaborating and learning"
                loading="eager"
                className="w-full h-64 sm:h-80 md:h-[380px] lg:h-[440px] object-cover object-[center_28%]"
              />

              {/* Soft directional gradient overlays to gently fade the edges into the background */}
              {/* Bottom soft gradient fade */}
              <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-[var(--bg-app)] via-[var(--bg-app)]/85 to-transparent dark:from-[#0B1922] dark:via-[#0B1922]/85 pointer-events-none" />

              {/* Side soft gradient fades */}
              <div className="absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[var(--bg-app)] to-transparent dark:from-[#0B1922] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[var(--bg-app)] to-transparent dark:from-[#0B1922] pointer-events-none" />

              {/* Top subtle vignette */}
              <div className="absolute inset-x-0 top-0 h-10 sm:h-14 bg-gradient-to-b from-[var(--bg-app)]/60 to-transparent dark:from-[#0B1922]/70 pointer-events-none" />
            </div>

            {/* Elegant Welcome Text Composition - Integrated near the softly fading lower edge */}
            <div className="relative -mt-14 sm:-mt-20 md:-mt-24 z-10 text-center px-4 max-w-3xl mx-auto space-y-3.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#102C3A] dark:text-white tracking-tight leading-[1.14]">
                Your Journey in Medicine, Made Better.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                Explore trusted resources, discover opportunities, and grow throughout your medical journey.
              </p>
            </div>
          </div>

          {/* Student Portal Authentication Block (Preserved) */}
          <div className="max-w-2xl mx-auto w-full pt-7">
            {!user ? (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-xs space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-[#102C3A] dark:text-slate-200 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                    Join the MedRise Student Portal
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    100% Free · No subscription required
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenAuth?.('signup')}
                    className="flex-1 sm:flex-initial px-6 py-3 text-sm font-bold text-white bg-[#176B65] hover:bg-[#11534E] active:bg-[#0D3E3A] rounded-xl transition-all shadow-xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[46px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65]"
                    aria-label="Create your free student account"
                  >
                    <UserPlus className="w-4 h-4 text-[#A8E6CF]" />
                    <span>Create Student Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAuth?.('login')}
                    className="flex-1 sm:flex-initial px-6 py-3 text-sm font-semibold text-[#102C3A] dark:text-slate-200 hover:text-[#176B65] dark:hover:text-[#A8E6CF] bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65]"
                    aria-label="Sign in to your existing account"
                  >
                    <LogIn className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                    <span>Sign In</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Save resources, track modular course progress, and view verified hospital announcements.</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#176B65] text-[#A8E6CF] font-bold text-xs flex items-center justify-center shrink-0">
                    {user.email?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-[#102C3A] dark:text-white">
                      Welcome back, {user.user_metadata?.display_name || user.email?.split('@')[0]}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {user.user_metadata?.medical_school || 'Egyptian Medical Student'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('study-smarter')}
                  className="px-4 py-2 text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] hover:bg-[#EEF9F5] dark:hover:bg-[#16303E] rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Resume Learning →
                </button>
              </div>
            )}
          </div>

          {/* Direct Section Pathways */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#176B65] dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer min-h-[40px]"
            >
              <BookOpen className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
              <span>Curated Courses</span>
            </button>

            <button
              onClick={() => onNavigate('study-smarter')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#176B65] dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer min-h-[40px]"
            >
              <span>Study Strategies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('opportunities')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#176B65] dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer min-h-[40px]"
            >
              <Compass className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
              <span>Electives Directory</span>
            </button>
          </div>

          {/* Key Platform Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 pb-6 mt-10 border-t border-slate-200/70 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#102430] border border-slate-200/80 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#176B65] dark:text-[#A8E6CF] tracking-tight">19+</div>
              <div className="text-xs font-semibold text-[#102C3A] dark:text-slate-200 mt-1">Clinical Nutrition Modules</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Inpatient assessment & electrolytes</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#102430] border border-slate-200/80 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#176B65] dark:text-[#A8E6CF] tracking-tight">53</div>
              <div className="text-xs font-semibold text-[#102C3A] dark:text-slate-200 mt-1">Biostatistics Lectures</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">SPSS, hypothesis testing & regression</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#102430] border border-slate-200/80 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#176B65] dark:text-[#A8E6CF] tracking-tight">70+</div>
              <div className="text-xs font-semibold text-[#102C3A] dark:text-slate-200 mt-1">SCOPE / SCORE Electives</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">International exchange partners</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#102430] border border-slate-200/80 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#176B65] dark:text-[#A8E6CF] tracking-tight">100%</div>
              <div className="text-xs font-semibold text-[#102C3A] dark:text-slate-200 mt-1">Open Academic Access</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Peer-reviewed by senior scholars</div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 2: CURATED ACADEMIC TRACKS (Intentional Editorial Index) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Curriculum Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A] dark:text-white tracking-tight">
              Four Pillars of Medical Growth
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Structured domains designed to transition students from preclinical memorization to clinical mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Pillar 01: Study Smarter */}
          <div
            onClick={() => onNavigate('study-smarter')}
            className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 hover:border-[#176B65] dark:hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">01 / RETRIEVAL SCIENCE</span>
                <span className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Explore Hub <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C3A] dark:text-white mb-2 group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors">
                Study Smarter & Spaced Repetition
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Evidence-based methodologies adapted for high-volume Egyptian modular exams. Master Anki cloze deletions, Feynman distillation, and 2-pass question bank strategies.
              </p>

              {/* Specific Curriculum Links */}
              <div className="space-y-1.5 pt-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Key Modules:</div>
                <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Anki Cloze Deletions</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Active Recall vs Highlighting</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Modular Exam Pacing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 02: Career Development */}
          <div
            onClick={() => onNavigate('career-development')}
            className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 hover:border-[#176B65] dark:hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">02 / SCHOLARLY INQUIRY</span>
                <span className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Explore Tracks <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C3A] dark:text-white mb-2 group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors">
                Career Development & Research
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Practical frameworks for undergraduate clinical research. Build peer-reviewed systematic reviews, formulate PICO questions, register PROSPERO protocols, and draft an academic CV.
              </p>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Key Modules:</div>
                <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">PROSPERO Registration</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Rayyan Screening</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Residency CV Standards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 03: Opportunities Directory */}
          <div
            onClick={() => onNavigate('opportunities')}
            className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 hover:border-[#176B65] dark:hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">03 / CLINICAL PLACEMENTS</span>
                <span className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View Directory <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C3A] dark:text-white mb-2 group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors">
                Opportunities & Clinical Electives
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Curated directory of national congresses (KAIMC), international bilateral exchanges (SCOPE/SCORE), WHO technical internships, and clinical research fellowships.
              </p>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Key Listings:</div>
                <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Cairo University KAIMC</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">WHO EMRO Internships</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Chevening Scholarships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 04: Student Community */}
          <div
            onClick={() => onNavigate('community')}
            className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 hover:border-[#176B65] dark:hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider">04 / PEER KNOWLEDGE</span>
                <span className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Read Stories <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#102C3A] dark:text-white mb-2 group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors">
                Student Community & Hospital Reflections
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Candid lessons from senior Egyptian house officers and student researchers: surviving the first surgical clerkship, handling research rejection, and rural mobile clinics.
              </p>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Key Voices:</div>
                <div className="flex flex-wrap gap-2 text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Kasr Al-Ainy Surgery</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Mansoura Lancet Team</span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Minya Rural Care</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FEATURED LEARNING RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Curated Academic Repository
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A] dark:text-white tracking-tight">
              Featured Study Guides
            </h2>
          </div>
          <button
            onClick={() => onNavigate('study-smarter')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] hover:underline cursor-pointer shrink-0"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.slice(0, 3).map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              isBookmarked={isBookmarked(res.id)}
              onToggleBookmark={(id) => onToggleBookmark(id, 'resource')}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: OPPORTUNITIES SPOTLIGHT */}
      <section className="bg-slate-50 dark:bg-[#0D202B] py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
                Verified Programs & Callouts
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A] dark:text-white tracking-tight">
                Opportunities Spotlight
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Conferences, clinical electives, and research traineeships vetted for Egyptian medical students.
              </p>
            </div>
            <button
              onClick={() => onNavigate('opportunities')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] hover:underline cursor-pointer shrink-0"
            >
              <span>Explore All Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlightOpportunities.slice(0, 3).map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isBookmarked={isBookmarked(opp.id)}
                onToggleBookmark={(id) => onToggleBookmark(id, 'opportunity')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MEDRISE MAGAZINE (Authentic Photographic Editorial Column) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
            MedRise Magazine · Editorial Column
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102C3A] dark:text-white tracking-tight">
            Student-Focused Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Practical strategies authored by registrars, research mentors, and senior medical scholars in Egypt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white dark:bg-[#102430] rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:border-[#176B65] dark:hover:border-[#176B65] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {article.imagePath && (
                  <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                    <img
                      src={article.imagePath}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white bg-slate-950/70 backdrop-blur-xs">
                      {article.category}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                    {article.readTime} · {article.publishedDate}
                  </div>
                  <h3 className="text-sm font-bold text-[#102C3A] dark:text-white group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate mr-2 font-medium">{article.author.name}</span>
                  <span className="text-[#176B65] dark:text-[#A8E6CF] font-semibold shrink-0 group-hover:underline">
                    Read Story
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: STUDENT COMMUNITY & REFLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#102C3A] dark:bg-[#091720] text-white border border-[#183C4F]">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold text-[#A8E6CF] uppercase tracking-wider mb-2">
              Peer Mentorship & Voices
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
              Wisdom from Students Ahead of You
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Unvarnished reflections on navigating high-volume hospital rotations, conquering residency exams, and turning research rejections into publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityStories.slice(0, 2).map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-xl bg-[#183C4F]/50 dark:bg-[#102430]/60 border border-slate-700/60 flex flex-col justify-between"
              >
                <div>
                  <blockquote className="text-sm font-medium italic text-slate-100 mb-4 leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {story.storySnippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{story.authorName}</div>
                    <div className="text-slate-400 text-[11px]">{story.medicalSchool} · {story.authorYear}</div>
                  </div>
                  <button
                    onClick={() => onNavigate('community')}
                    className="text-xs font-semibold text-[#A8E6CF] hover:underline cursor-pointer"
                  >
                    Full story →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Have a medical school milestone or hard-learned clinical lesson to share?
            </span>
            <button
              onClick={() => onNavigate('community')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#102C3A] bg-[#A8E6CF] hover:bg-[#A8E6CF]/90 rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Student Knowledge Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: ACADEMIC ETHICS & DISCLAIMER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-xl bg-slate-100 dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="space-y-1">
            <span className="font-bold text-[#102C3A] dark:text-white text-sm block">Academic Standards & Supervision Notice</span>
            <p className="max-w-3xl leading-relaxed">
              Study strategies and research guides are designed to optimize independent learning workflows. MedRise makes no guarantee of specific examination outcomes. Always follow the official course syllabi and clinical supervision protocols of your university medical faculty.
            </p>
          </div>
          <button
            onClick={() => onNavigate('study-smarter')}
            className="shrink-0 px-4 py-2 text-xs font-semibold text-[#102C3A] dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 rounded-lg transition-colors cursor-pointer"
          >
            Review Study Strategies
          </button>
        </div>
      </section>
    </div>
  );
};
