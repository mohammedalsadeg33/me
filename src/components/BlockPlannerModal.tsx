import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
  Layers,
  Award,
  Sparkles,
  Copy,
  Printer,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Brain,
  GraduationCap,
  Info,
  Check,
  Building2,
  BookmarkCheck,
  ListTodo
} from 'lucide-react';
import {
  MEDICAL_BLOCKS,
  MedicalBlock,
  BlockResource,
  DEFAULT_PLANNER_STORAGE_KEY,
  PlannerStoredState
} from '../data/medicalBlocksData';

interface BlockPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBlockId?: string;
}

export const BlockPlannerModal: React.FC<BlockPlannerModalProps> = ({
  isOpen,
  onClose,
  initialBlockId
}) => {
  // Load initial state from localStorage or defaults
  const [selectedBlockId, setSelectedBlockId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_PLANNER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlannerStoredState;
        if (parsed.selectedBlockId) return parsed.selectedBlockId;
      }
    } catch {
      // ignore
    }
    return initialBlockId || MEDICAL_BLOCKS[0].id;
  });

  // Calculate default exam date (4 weeks from today)
  const defaultExamDateString = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 28);
    return d.toISOString().split('T')[0];
  }, []);

  const [targetExamDate, setTargetExamDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_PLANNER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlannerStoredState;
        if (parsed.targetExamDate) return parsed.targetExamDate;
      }
    } catch {
      // ignore
    }
    return defaultExamDateString;
  });

  const [dailyHours, setDailyHours] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_PLANNER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlannerStoredState;
        if (parsed.dailyHours) return parsed.dailyHours;
      }
    } catch {
      // ignore
    }
    return 6;
  });

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DEFAULT_PLANNER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PlannerStoredState;
        if (Array.isArray(parsed.completedTaskIds)) return parsed.completedTaskIds;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState<'schedule' | 'egyptian-resources' | 'usmle-resources'>('schedule');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Sync initialBlockId if changed from parent
  useEffect(() => {
    if (initialBlockId) {
      setSelectedBlockId(initialBlockId);
    }
  }, [initialBlockId]);

  // Persist state to localStorage on changes
  useEffect(() => {
    try {
      const stateToStore: PlannerStoredState = {
        selectedBlockId,
        targetExamDate,
        dailyHours,
        completedTaskIds,
        activeTab,
        lastSavedAt: new Date().toISOString()
      };
      localStorage.setItem(DEFAULT_PLANNER_STORAGE_KEY, JSON.stringify(stateToStore));
    } catch {
      // localStorage might be unavailable in rare private contexts
    }
  }, [selectedBlockId, targetExamDate, dailyHours, completedTaskIds, activeTab]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const activeBlock: MedicalBlock = useMemo(() => {
    return MEDICAL_BLOCKS.find((b) => b.id === selectedBlockId) || MEDICAL_BLOCKS[0];
  }, [selectedBlockId]);

  // Date math and interval breakdown
  const dateCalculations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDate = new Date(targetExamDate);
    examDate.setHours(0, 0, 0, 0);

    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const totalStudyHours = diffDays * dailyHours;

    // Helper to format a date to concise string (e.g., 14 Nov)
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric'
      });
    };

    // Calculate phase boundaries based on diffDays
    const getPhaseDateRange = (startPct: number, endPct: number) => {
      const startDayOffset = Math.round((startPct / 100) * diffDays);
      const endDayOffset = Math.round((endPct / 100) * diffDays);

      const startDate = new Date(today);
      startDate.setDate(today.getDate() + startDayOffset);

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + endDayOffset);

      return {
        startDateStr: formatDate(startDate),
        endDateStr: formatDate(endDate),
        durationDays: Math.max(1, endDayOffset - startDayOffset)
      };
    };

    return {
      diffDays,
      totalStudyHours,
      examDateFormatted: examDate.toLocaleDateString('ar-EG', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      getPhaseDateRange
    };
  }, [targetExamDate, dailyHours]);

  // Task completion calculation
  const taskProgress = useMemo(() => {
    const currentBlockTaskIds = activeBlock.tasks.map((t) => t.id);
    const completedCount = currentBlockTaskIds.filter((id) => completedTaskIds.includes(id)).length;
    const totalCount = currentBlockTaskIds.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { completedCount, totalCount, percentage };
  }, [activeBlock, completedTaskIds]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين المهام المحددة لهذا البلوك؟')) {
      const currentBlockTaskIds = activeBlock.tasks.map((t) => t.id);
      setCompletedTaskIds((prev) => prev.filter((id) => !currentBlockTaskIds.includes(id)));
    }
  };

  const handleCopySummary = async () => {
    const text = `📋 خطة مراجعة البلوك الطبي: ${activeBlock.titleAr} (${activeBlock.code})
📅 تاريخ الامتحان: ${dateCalculations.examDateFormatted} (${dateCalculations.diffDays} يوم متبقي)
⏱️ ساعات المذاكرة المستهدفة: ${dailyHours} ساعات يومياً (إجمالي: ${dateCalculations.totalStudyHours} ساعة)
📊 نسبة الإنجاز الحالية: ${taskProgress.percentage}% (${taskProgress.completedCount}/${taskProgress.totalCount} مهام)

المراحل الأربعة للتكرار المتباعد:
1️⃣ الفهم والتأسيس (0-35%): تشريح وفسيولوجيا ورسم القلب/الميكانيكا
2️⃣ التكرار المتباعد وفلاش كاردز Anki (35-65%): باثولوجيا وأدوية البلوك
3️⃣ حل امتحانات الجامعات المصرية + USMLE (65-85%): أسئلة السنوات السابقة
4️⃣ كشكول الأخطاء والمحاكاة النهائية (85-100%): مراجعة سريعة وامتحان كامل

تم التوليد عبر MedRise: https://medrise.org`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="block-planner-title"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl my-auto rounded-2xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-right"
        dir="rtl"
      >
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-[#1E3D4F] bg-slate-50 dark:bg-[#0C1D27] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176B65] text-white flex items-center justify-center shadow-xs shrink-0">
              <Brain className="w-5 h-5 text-[#A8E6CF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="block-planner-title"
                  className="text-lg sm:text-xl font-bold text-[#102C3A] dark:text-white"
                >
                  منظم ومخطط مراجعة البلوكات الطبية
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EEF9F5] dark:bg-[#16363B] text-[#176B65] dark:text-[#A8E6CF] border border-[#176B65]/20 dark:border-[#A8E6CF]/20">
                  نظام 5+2 المصري
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                توليد آلي لدورات التكرار المتباعد (Spaced Repetition) مع تجميعة بنوك أسئلة الجامعات وملفات Anki
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          
          {/* STEP 1: SELECT ACTIVE BLOCK */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#102C3A] dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                <span>اختر البلوك الطبي الحالي (Module Selection):</span>
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                8 موديولات معتمدة
              </span>
            </div>

            {/* Block Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MEDICAL_BLOCKS.map((block) => {
                const isSelected = block.id === selectedBlockId;
                return (
                  <button
                    key={block.id}
                    type="button"
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                      isSelected
                        ? 'bg-[#EEF9F5] dark:bg-[#16363B] border-[#176B65] dark:border-[#A8E6CF] shadow-xs'
                        : 'bg-white dark:bg-[#122A38] border-slate-200 dark:border-[#1E3D4F] hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[11px] font-black tracking-wide ${
                        isSelected ? 'text-[#176B65] dark:text-[#A8E6CF]' : 'text-slate-400'
                      }`}>
                        {block.code}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                      )}
                    </div>
                    <span className={`text-xs font-bold leading-tight mt-1 ${
                      isSelected ? 'text-[#102C3A] dark:text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {block.titleAr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: EXAM DATE & STUDY CAPACITY INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0C1D27] border border-slate-200 dark:border-[#1E3D4F]">
            {/* Target Exam Date Input */}
            <div className="md:col-span-5 space-y-2">
              <label htmlFor="target-exam-date" className="text-xs font-bold text-[#102C3A] dark:text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                <span>تاريخ الامتحان النهائي للبلوك:</span>
              </label>
              <input
                id="target-exam-date"
                type="date"
                value={targetExamDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTargetExamDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-[#1E3D4F] bg-white dark:bg-[#102430] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176B65]"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                يتم حساب دورات التكرار المتباعد بناءً على الأيام المتبقية
              </span>
            </div>

            {/* Daily Hours Slider */}
            <div className="md:col-span-4 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="daily-hours-slider" className="text-xs font-bold text-[#102C3A] dark:text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                  <span>ساعات المذاكرة اليومية:</span>
                </label>
                <span className="text-xs font-black text-[#176B65] dark:text-[#A8E6CF] px-2 py-0.5 rounded bg-white dark:bg-[#102430] border border-slate-200 dark:border-slate-700">
                  {dailyHours} ساعات/يوم
                </span>
              </div>
              <input
                id="daily-hours-slider"
                type="range"
                min="2"
                max="10"
                step="1"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value, 10))}
                className="w-full accent-[#176B65] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>خفيف (2 س)</span>
                <span>متوازن (6 س)</span>
                <span>مكثف (10 س)</span>
              </div>
            </div>

            {/* Calculated Metrics Card */}
            <div className="md:col-span-3 p-3 rounded-lg bg-white dark:bg-[#122A38] border border-slate-200 dark:border-[#1E3D4F] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  الوقت المتاح
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-[#102C3A] dark:text-white">
                    {dateCalculations.diffDays}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">يوم</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-[#1E3D4F] flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">إجمالي الساعات:</span>
                <span className="font-bold text-[#176B65] dark:text-[#A8E6CF]">
                  {dateCalculations.totalStudyHours} ساعة
                </span>
              </div>
            </div>
          </div>

          {/* BLOCK SUMMARY & HIGH-YIELD TOPICS */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#122A38] border border-slate-200 dark:border-[#1E3D4F] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-[#1E3D4F]">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#102C3A] dark:text-white">
                  {activeBlock.titleAr}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({activeBlock.titleEn})
                </span>
              </div>
              <div className="text-xs text-[#176B65] dark:text-[#A8E6CF] font-medium">
                المدة النموذجية للبلوك: {activeBlock.typicalDurationWeeks} أسابيع
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeBlock.summaryAr}
            </p>

            {/* High-yield tags */}
            <div className="pt-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 ml-2">
                موضوعات الامتياز (High-Yield):
              </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {activeBlock.highYieldTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-[#183C4F] text-slate-700 dark:text-slate-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TAB NAVIGATION: Schedule vs Egyptian Q-Banks vs USMLE Decks */}
          <div className="border-b border-slate-200 dark:border-[#1E3D4F] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'schedule'
                    ? 'border-[#176B65] dark:border-[#A8E6CF] text-[#176B65] dark:text-[#A8E6CF]'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                <span>جدول التكرار المتباعد (4 مراحل)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono">
                  {taskProgress.completedCount}/{taskProgress.totalCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('egyptian-resources')}
                className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'egyptian-resources'
                    ? 'border-[#176B65] dark:border-[#A8E6CF] text-[#176B65] dark:text-[#A8E6CF]'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>أسئلة الجامعات المصرية ({activeBlock.egyptianResources.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('usmle-resources')}
                className={`py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  activeTab === 'usmle-resources'
                    ? 'border-[#176B65] dark:border-[#A8E6CF] text-[#176B65] dark:text-[#A8E6CF]'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>مصادر USMLE ودكات Anki ({activeBlock.usmleResources.length})</span>
              </button>
            </div>

            {/* Quick Completion Progress in tab bar */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">الإنجاز:</span>
              <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#176B65] dark:bg-[#A8E6CF] transition-all duration-300"
                  style={{ width: `${taskProgress.percentage}%` }}
                />
              </div>
              <span className="font-bold text-[#102C3A] dark:text-white font-mono">
                {taskProgress.percentage}%
              </span>
            </div>
          </div>

          {/* TAB 1: SPACED REPETITION SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Spaced repetition explanation alert */}
              <div className="p-3.5 rounded-xl bg-[#EEF9F5] dark:bg-[#123838] border border-[#176B65]/20 dark:border-[#A8E6CF]/20 text-xs text-[#102C3A] dark:text-slate-200 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>منهجية التكرار المتباعد الذكية:</strong> تم تقسيم الـ {dateCalculations.diffDays} يوم المتبقية إلى 4 مراحل تصاعدية: تبدأ بالفهم التأسيسي، تليها دورة الاسترجاع النشط وفلاش كاردز Anki، ثم حل أسئلة الجامعات، وتختم بالمحاكاة وكشكول الأخطاء.
                </p>
              </div>

              {/* Phase Checklist Cards */}
              <div className="space-y-3">
                {activeBlock.tasks.map((task, index) => {
                  const isChecked = completedTaskIds.includes(task.id);
                  const range = dateCalculations.getPhaseDateRange(
                    task.relativeStartPct,
                    task.relativeEndPct
                  );

                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                          : 'bg-white dark:bg-[#102430] border-slate-200 dark:border-[#1E3D4F] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                            isChecked
                              ? 'bg-[#176B65] border-[#176B65] text-white'
                              : 'bg-white dark:bg-[#122A38] border-slate-300 dark:border-slate-600 hover:border-[#176B65]'
                          }`}
                          aria-label={`تحديد المهمة ${task.titleAr}`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                المرحلة {task.phaseNumber}
                              </span>
                              <h3 className={`text-sm font-bold ${
                                isChecked ? 'line-through text-slate-500 dark:text-slate-400' : 'text-[#102C3A] dark:text-white'
                              }`}>
                                {task.titleAr}
                              </h3>
                            </div>

                            {/* Date Badge */}
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
                              <Calendar className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                              <span>{range.startDateStr} ← {range.endDateStr}</span>
                              <span className="text-[11px] text-slate-400">({range.durationDays} يوم)</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {task.descriptionAr}
                          </p>

                          {/* High Yield Tip */}
                          <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>نصيحة الامتحان:</strong> {task.highYieldTipAr}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: EGYPTIAN UNIVERSITY QUESTION BANKS */}
          {activeTab === 'egyptian-resources' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                تجميعة خاصة بأسئلة كليات الطب المصرية (قصر العيني، عين شمس، المنصورة، الإسكندرية، وأسيوط) مصنفة حسب البلوك.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeBlock.egyptianResources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                          {res.institutionOrPlatform}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {res.category.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#102C3A] dark:text-white leading-snug">
                        {res.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {res.descriptionAr}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-[#1E3D4F] space-y-2">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#0C1D27] text-[11px] text-slate-600 dark:text-slate-300">
                        <strong className="text-[#176B65] dark:text-[#A8E6CF]">ملاحظة هامة:</strong> {res.highYieldNotes}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {res.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#183C4F] text-slate-600 dark:text-slate-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        {res.externalUrl && (
                          <a
                            href={res.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] hover:underline flex items-center gap-1 shrink-0"
                          >
                            <span>فتح الرابط</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USMLE & ANKI DECKS */}
          {activeTab === 'usmle-resources' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                كروت فلاش كاردز مجهزة بالتكرار المتباعد (Spaced Repetition) من AnKing Step 1 وبنوك أسئلة UWorld/Amboss الخاصة بهذا البلوك.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeBlock.usmleResources.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                          {res.institutionOrPlatform}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">
                          {res.category.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#102C3A] dark:text-white leading-snug">
                        {res.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {res.descriptionAr}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-[#1E3D4F] space-y-2">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#0C1D27] text-[11px] text-slate-600 dark:text-slate-300">
                        <strong className="text-indigo-600 dark:text-indigo-400">نصيحة الاسترجاع:</strong> {res.highYieldNotes}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {res.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#183C4F] text-slate-600 dark:text-slate-300 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {res.externalUrl && (
                          <a
                            href={res.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#176B65] dark:text-[#A8E6CF] hover:underline flex items-center gap-1 shrink-0"
                          >
                            <span>فتح AnkiHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER & ACTION CONTROLS */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-[#1E3D4F] bg-slate-50 dark:bg-[#0C1D27] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#102430] hover:bg-slate-100 dark:hover:bg-[#153243] border border-slate-300 dark:border-[#1E3D4F] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>تم نسخ ملخص الجدول!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>نسخ ملخص الجدول</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#102430] hover:bg-slate-100 dark:hover:bg-[#153243] border border-slate-300 dark:border-[#1E3D4F] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
              title="إعادة ضبط مهام البلوك"
              aria-label="إعادة ضبط المهام"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              يتم حفظ التغييرات تلقائياً في متصفحك
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-[#176B65] hover:bg-[#11534E] active:bg-[#0D3E3A] rounded-xl transition-all shadow-xs cursor-pointer min-h-[38px] flex items-center justify-center"
            >
              تم وحفظ الخطة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
