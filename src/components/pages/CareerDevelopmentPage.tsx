import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Award, Stethoscope, GraduationCap, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { Resource, AcademicLevel } from '../../types';
import { ResourceCard } from '../ResourceCard';

interface CareerDevelopmentPageProps {
  resources: Resource[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string, type: 'resource' | 'opportunity') => void;
  onSelectResource: (resource: Resource) => void;
}

const TOPICS = [
  { id: 'all', label: 'All Career Topics' },
  { id: 'methodology-ebm', label: 'Research & EBM' },
  { id: 'academic-cv', label: 'Academic CV Writing' },
  { id: 'mentors-collaborators', label: 'Mentors & Outreach' },
  { id: 'communication-presentation', label: 'Clinical Presentations' },
  { id: 'personal-statements', label: 'Personal Statements' },
  { id: 'conferences-networking', label: 'Conferences & Posters' },
  { id: 'professionalism-leadership', label: 'Leadership & Ethics' }
];

export const CareerDevelopmentPage: React.FC<CareerDevelopmentPageProps> = ({
  resources,
  isBookmarked,
  onToggleBookmark,
  onSelectResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel | 'all'>('all');

  const careerResources = useMemo(() => {
    return resources.filter((r) => r.pillar === 'career-development');
  }, [resources]);

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return careerResources.filter((res) => {
      if (selectedTopic !== 'all' && res.category !== selectedTopic) {
        return false;
      }

      if (selectedLevel !== 'all' && res.level !== selectedLevel && res.level !== 'all') {
        return false;
      }

      if (q) {
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchSummary = res.summary.toLowerCase().includes(q);
        const matchDesc = res.fullDescription.toLowerCase().includes(q);
        const matchPublisher = res.publisher.toLowerCase().includes(q);
        const matchTakeaways = res.keyTakeaways.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSummary && !matchDesc && !matchPublisher && !matchTakeaways) {
          return false;
        }
      }

      return true;
    });
  }, [careerResources, searchQuery, selectedTopic, selectedLevel]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('all');
    setSelectedLevel('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF]">
          <Award className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
          <span className="uppercase tracking-wider">Professional Trajectory & Scholarship</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#102C3A] dark:text-white tracking-tight">
          Career Development & Research
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          From publishing your first systematic review to crafting a peer-reviewed academic CV and presenting cases in morning consultant rounds. Structured guides for medical students in Egypt.
        </p>
      </div>

      {/* Progressive Stage Roadmap Strip */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#102430] border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Layers className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
          <span>The Academic Growth Pathway</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Stage 1: Preclinical Foundation
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Methodology & Cold Outreach
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Learn PubMed MeSH search syntax, PICO criteria, and approach active hospital faculty with structured data extraction offers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Stage 2: Clinical Clerkship
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Bedside SBAR & Poster Defense
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Condense patient workups into 3-minute oral presentations, submit abstracts to national congresses, and draft your core academic CV.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold text-[#176B65] dark:text-[#A8E6CF] uppercase tracking-wider mb-1">
              Stage 3: House Officer & Fellow
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Leadership, Audits & Electives
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Lead clinical department audits, apply for international clinical observerships, and assemble residency personal statements.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-[#102430] p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Cochrane systematic reviews, CV templates, mentor email scripts..."
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

        {/* Level Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-1 font-medium">Stage:</span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'preclinical', label: 'Preclinical (Y1-Y2)' },
              { id: 'clinical', label: 'Clinical (Y3-Y5)' },
              { id: 'intern', label: 'House Officer / Intern' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLevel(lvl.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-[#102C3A] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#176B65]"
            >
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            {(searchQuery || selectedTopic !== 'all' || selectedLevel !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Career & Research Resources */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredResources.length}</strong> professional development resource{filteredResources.length === 1 ? '' : 's'}
          </span>
          <span className="text-slate-400">Attributed to verified university faculty & societies</span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-[#102430] rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">No career resources match your filter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your stage or topic filter to explore research methodologies, CV templates, and presentation guides.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] bg-[#EEF9F5] dark:bg-[#123838] rounded-lg hover:bg-[#A8E6CF]/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                isBookmarked={isBookmarked(res.id)}
                onToggleBookmark={(id) => onToggleBookmark(id, 'resource')}
                onSelectResource={onSelectResource}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
