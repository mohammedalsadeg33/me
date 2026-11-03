import React from 'react';
import { X, Clock, Calendar, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#102430] rounded-2xl border border-slate-200 dark:border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#102430]/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Magazine</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Header Image if available */}
        {article.imagePath && (
          <div className="w-full h-56 sm:h-72 overflow-hidden bg-slate-100 dark:bg-slate-900">
            <img
              src={article.imagePath}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
            <span className="font-semibold text-[#176B65] dark:text-[#A8E6CF]">{article.category}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#102C3A] dark:text-white leading-tight">
            {article.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs">
            <div className="w-10 h-10 rounded-full bg-[#176B65] text-[#A8E6CF] font-bold flex items-center justify-center text-sm shrink-0">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white text-sm">{article.author.name}</div>
              <div className="text-slate-600 dark:text-slate-300">{article.author.role}</div>
              <div className="text-slate-400 dark:text-slate-500">{article.author.institution}</div>
            </div>
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-xl bg-[#EEF9F5] dark:bg-[#123838] border border-[#A8E6CF]/50 dark:border-[#176B65] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#11534E] dark:text-[#A8E6CF]">
                High-Yield Principles
              </h4>
              <ul className="space-y-2">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Paragraphs */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            {article.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
            Published in the MedRise Medical Student Magazine editorial column. Written by peer doctors and student leaders in Egypt.
          </div>
        </div>
      </div>
    </div>
  );
};
