import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, AlertCircle, CheckCircle2, ShieldCheck, Sparkles, Video } from 'lucide-react';
import { CourseCategory } from '../../types';
import { IMAGES } from '../../assets/images';

interface CourseCategoryCardProps {
  category: CourseCategory;
  isSelected: boolean;
  onSelect: (categoryId: CourseCategory['id']) => void;
  onExplore: (categoryId: CourseCategory['id']) => void;
}

export const CourseCategoryCard: React.FC<CourseCategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
  onExplore,
}) => {
  const [imgError, setImgError] = useState(false);
  const imageSrc = IMAGES[category.imageKey] || '';

  const getStatusBadge = () => {
    switch (category.statusType) {
      case 'verified':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
          classes: 'text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800'
        };
      case 'provisional':
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />,
          classes: 'text-[#176B65] dark:text-[#A8E6CF] bg-[#EEF9F5] dark:bg-[#123838] border-[#A8E6CF] dark:border-[#176B65]'
        };
      case 'verification-required':
      default:
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
          classes: 'text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800'
        };
    }
  };

  const badgeInfo = getStatusBadge();

  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`group flex flex-col justify-between bg-white dark:bg-[#102430] rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-[#176B65] dark:border-[#A8E6CF] ring-2 ring-[#176B65]/20 dark:ring-[#A8E6CF]/20 shadow-md'
          : 'border-slate-200/90 dark:border-slate-800 hover:border-[#176B65]/50 dark:hover:border-[#A8E6CF]/50'
      }`}
    >
      <div>
        {/* Category Image with zero-pill status overlay */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
          {!imgError && imageSrc ? (
            <img
              src={imageSrc}
              alt={category.imageAlt}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#102C3A] to-[#183C4F] flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-2">
                <BookOpen className="w-10 h-10 mx-auto text-[#A8E6CF]" />
                <span className="text-sm font-semibold block">{category.title}</span>
              </div>
            </div>
          )}

          {/* Dark gradient shadow at bottom of image for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Optional Top Status Badge */}
          {category.statusBadge && (
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border backdrop-blur-xs ${badgeInfo.classes}`}>
                {badgeInfo.icon}
                <span>{category.statusBadge}</span>
              </span>
            </div>
          )}

          {/* Category Label at bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A8E6CF] mb-0.5">
              Course Track
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-xs">
              {category.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            “{category.description}”
          </p>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Curriculum Focus:</span>
            <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {category.intendedFor}
            </p>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-5 sm:p-6 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExplore(category.id);
          }}
          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            isSelected
              ? 'bg-[#176B65] text-white hover:bg-[#102C3A]'
              : 'bg-slate-100 dark:bg-slate-800 text-[#102C3A] dark:text-slate-200 hover:bg-[#EEF9F5] dark:hover:bg-[#153243] hover:text-[#176B65] dark:hover:text-[#A8E6CF]'
          }`}
        >
          <span>Explore Courses</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
