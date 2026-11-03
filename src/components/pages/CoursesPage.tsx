import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Search,
  RotateCcw,
  BookOpen,
  Play,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ListOrdered,
  Sparkles,
  Send,
  Video,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CourseCategory, Course, CourseCategoryId } from '../../types';
import { COURSE_CATEGORIES, COURSES } from '../../data/courses';
import { CourseCategoryCard } from '../courses/CourseCategoryCard';
import { CoursePlayerModal } from '../courses/CoursePlayerModal';

interface CoursesPageProps {
  onOpenSubmit?: () => void;
  onNavigate?: (tab: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onOpenSubmit,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Filter courses based on category selection and search query
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return COURSES.filter((course) => {
      if (selectedCategory !== 'all' && course.categoryId !== selectedCategory) {
        return false;
      }

      if (q) {
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        const matchProvider = course.provider.toLowerCase().includes(q);
        const matchTopics = course.keyTopics.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchProvider && !matchTopics) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (catId: CourseCategoryId) => {
    setSelectedCategory((prev) => (prev === catId ? 'all' : catId));
    const el = document.getElementById('available-courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCategory = (catId: CourseCategoryId) => {
    setSelectedCategory(catId);
    const el = document.getElementById('available-courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF]">
          <GraduationCap className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
          <span className="uppercase tracking-wider">Curated Academic & Clinical Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102C3A] dark:text-white tracking-tight">
          Courses & Video Learning Tracks
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore educational courses, clinical examination tutorials, and structured video learning tracks curated from trusted external medical educators. Designed for medical undergraduates, interns, and junior researchers in Egypt and abroad.
        </p>

        {/* Verification & Transparency Alert */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF] shrink-0" />
            <span>
              <strong>Editorial Transparency:</strong> MedRise links to verified external educators and official YouTube playlists. We do not manufacture playlist IDs or retain broken links; unverified resources are clearly designated.
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-teal-800 dark:text-teal-200 font-semibold bg-teal-50 dark:bg-teal-950/70 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
              <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              Verified Playlist Embeds
            </span>
          </div>
        </div>
      </div>

      {/* THREE DISTINCT CATEGORIES SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Curriculum Tracks
            </div>
            <h2 className="text-2xl font-bold text-[#102C3A] dark:text-white tracking-tight">
              Learning Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select a track to browse verified video playlists and study modules
          </p>
        </div>

        {/* 3 Visually Distinct Category Cards Grid with authentic photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COURSE_CATEGORIES.map((category) => (
            <CourseCategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={handleCategorySelect}
              onExplore={handleExploreCategory}
            />
          ))}
        </div>
      </section>

      {/* FILTER & SEARCH HUB */}
      <section id="available-courses-section" className="scroll-mt-24 space-y-6">
        <div className="bg-white dark:bg-[#102430] p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by topic (biostatistics, Dr. Mohamed Elsherif, medical English, ANOVA...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#176B65] text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 font-medium mr-1">Filter Track:</span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#102C3A] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                }`}
              >
                All Tracks
              </button>
              {COURSE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#176B65] text-white shadow-xs font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                );
              })}
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* COURSES DIRECTORY */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing{' '}
              <strong className="text-slate-800 dark:text-slate-200">
                {filteredCourses.length}
              </strong>{' '}
              active course track{filteredCourses.length === 1 ? '' : 's'}
            </span>
            <span className="text-slate-400">External verified medical educators</span>
          </div>

          {/* Active Courses Grid */}
          {filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white dark:bg-[#102430] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#176B65] dark:hover:border-[#176B65] transition-all duration-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Header: Category & Status */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#176B65] dark:text-[#A8E6CF]">
                          {course.categoryLabel}
                        </span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {course.provider}
                        </span>
                      </div>

                      {course.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Verified Playlist
                        </span>
                      ) : course.status === 'provisional' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-2.5 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                          <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                          Provisional Playlist
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          <Video className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                          Single Video Lecture
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#102C3A] dark:text-white group-hover:text-[#176B65] dark:group-hover:text-[#A8E6CF] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Features / Topics */}
                    <div className="space-y-2 pt-2 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                        <span>Curriculum Highlights:</span>
                        {course.lessons && (
                          <span className="text-[#176B65] dark:text-[#A8E6CF] font-semibold">
                            {course.lessons.length} Modules Included
                          </span>
                        )}
                      </div>
                      <ul className="space-y-1.5 pt-1 text-slate-700 dark:text-slate-300">
                        {course.keyTopics.slice(0, 4).map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#176B65] dark:text-[#A8E6CF] font-bold">›</span>
                            <span className="line-clamp-1">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Status Notice */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      <strong>Verification Note:</strong> {course.verificationDetails}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveCourse(course)}
                      className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#176B65] text-white hover:bg-[#11534E] active:bg-[#0D3E3A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{course.type === 'playlist' ? 'Watch Full Playlist' : 'Watch Video Lecture'}</span>
                    </button>

                    <a
                      href={course.youtubePlaylistUrl || course.youtubeVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                      title="Open source on YouTube"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty search results */}
          {filteredCourses.length === 0 && (
            <div className="py-16 text-center bg-white dark:bg-[#102430] rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                No courses match your search
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for "biostatistics", "English", or resetting filters to browse all tracks.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] bg-[#EEF9F5] dark:bg-[#123838] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Suggest a Course Callout Banner (Clean human editorial framing) */}
      <section className="p-8 rounded-2xl bg-[#102C3A] dark:bg-[#091720] border border-[#183C4F] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="text-xs font-bold text-[#A8E6CF] uppercase tracking-wider">
            Community-Driven Quality
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Know a High-Yield Medical Lecture Series?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            MedRise continuously reviews and indexes structured educational playlists from trusted university professors and medical educators across Egypt and globally.
          </p>
        </div>

        {onOpenSubmit && (
          <button
            type="button"
            onClick={onOpenSubmit}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#A8E6CF] hover:bg-[#A8E6CF]/90 text-[#102C3A] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Suggest a Course Playlist</span>
          </button>
        )}
      </section>

      {/* Course Player / Detail Modal */}
      {activeCourse && (
        <CoursePlayerModal
          course={activeCourse}
          onClose={() => setActiveCourse(null)}
          onOpenSubmit={onOpenSubmit}
        />
      )}
    </div>
  );
};
