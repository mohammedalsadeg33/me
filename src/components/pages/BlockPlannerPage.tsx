import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Copy,
  Printer,
  RotateCcw,
  ExternalLink,
  Brain,
  GraduationCap,
  Info,
  Check,
  Building2,
  ListTodo,
  TrendingUp,
  Tag
} from 'lucide-react';
import {
  MEDICAL_BLOCKS,
  MedicalBlock,
  DEFAULT_PLANNER_STORAGE_KEY,
  PlannerStoredState
} from '../../data/medicalBlocksData';

interface BlockPlannerPageProps {
  initialBlockId?: string;
  onNavigate?: (tab: string) => void;
}

export const BlockPlannerPage: React.FC<BlockPlannerPageProps> = ({
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

  // Sync initialBlockId if changed
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

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('ar-EG', {
        month: 'short',
        day: 'numeric'
      });
    };

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
1️⃣ الفهم والتأسيس (0-40%): فسيولوجيا وتشريح وهستولوجيا
2️⃣ التكرار المتباعد وفلاش كاردز Anki (40-65%): باثولوجيا وفارما
3️⃣ حل امتحانات الجامعات المصرية + USMLE (65-85%): أسئلة السنوات السابقة
4️⃣ كشكول الأخطاء والمحاكاة النهائية (85-100%): مراجعة سريعة وامتحان كامل

تم التوليد عبر منصة MedRise: https://medrise.org`;

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

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] dark:bg-[#0B1922] dark:text-[#F1F5F9] pb-24">
      {/* Editorial Header Bar */}
      <section className="bg-gradient-to-b from-[#102C3A]/90 via-[#102C3A]/70 to-transparent dark:from-[#091720] border-b border-[#183C4F] pt-8 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold text-[#A8E6CF] bg-[#176B65]/40 border border-[#A8E6CF]/30">
                <Brain className="w-4 h-4 text-[#A8E6CF]" />
                <span>نظام البلوكات المتكامل · كليات الطب المصرية (نظام 5+2)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                مخطط ومنظم مراجعة البلوكات الطبية
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                أداة تفاعلية متقدمة لحساب دورات التكرار المتباعد (Spaced Repetition) آلياً، وربط مخرجات التعلم الأكاديمي ببنوك أسئلة الجامعات المصرية الرسمية ودكات AnKing Step 1.
              </p>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#183C4F] hover:bg-[#1f4c63] text-slate-100 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                title="نسخ ملخص جدول المذاكرة"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A8E6CF]" />
                    <span>نسخ الجدول</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#183C4F] hover:bg-[#1f4c63] text-slate-100 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                title="طباعة أو حفظ كملف PDF"
              >
                <Printer className="w-4 h-4 text-[#A8E6CF]" />
                <span className="hidden sm:inline">طباعة PDF</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-[#183C4F]/60 hover:bg-[#183C4F] border border-slate-700/60 transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
                title="إعادة تعيين مهام هذا البلوك"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Block Selector Ribbon (8 Modules) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
            <span>اختر البلوك الأكاديمي الحالي:</span>
            <span>8 موديولات رئيسية للمرحلة الأكاديمية</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {MEDICAL_BLOCKS.map((block) => {
              const isSelected = block.id === selectedBlockId;
              return (
                <button
                  key={block.id}
                  type="button"
                  onClick={() => setSelectedBlockId(block.id)}
                  className={`p-3 rounded-2xl text-right transition-all flex flex-col justify-between cursor-pointer border min-h-[82px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65] ${
                    isSelected
                      ? 'bg-[#176B65] text-white border-[#176B65] shadow-md -translate-y-0.5'
                      : 'bg-white dark:bg-[#102430] hover:bg-slate-50 dark:hover:bg-[#153243] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#1E3D4F] shadow-xs'
                  }`}
                  dir="rtl"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider font-mono ${
                      isSelected ? 'text-[#A8E6CF]' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {block.code}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {block.typicalDurationWeeks}W
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    {block.titleAr}
                  </div>
                  <div className={`text-[10px] truncate mt-1 ${
                    isSelected ? 'text-[#A8E6CF]' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {block.systemNameAr}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Calculation & Exam Configuration Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Active Block Identity */}
            <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-l border-slate-200/80 dark:border-slate-800 pb-5 lg:pb-0 lg:pl-6" dir="rtl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black font-mono bg-[#EEF9F5] dark:bg-[#16363B] text-[#176B65] dark:text-[#A8E6CF] border border-[#176B65]/30">
                  {activeBlock.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {activeBlock.systemNameAr} · {activeBlock.typicalDurationWeeks} أسابيع موديول
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#102C3A] dark:text-white">
                {activeBlock.titleAr}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {activeBlock.summaryAr}
              </p>
              {/* High-yield topics tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[10px] font-bold text-slate-400 ml-1">موضوعات التركيز:</span>
                {activeBlock.highYieldTopics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Center: Exam Inputs */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                  <span>تاريخ الامتحان:</span>
                </label>
                <input
                  type="date"
                  value={targetExamDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTargetExamDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[#102C3A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[40px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                  <span>ساعات المذاكرة اليومية:</span>
                </label>
                <select
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[#102C3A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[40px] cursor-pointer"
                >
                  <option value={4}>4 ساعات / يومياً (معدل هادئ)</option>
                  <option value={6}>6 ساعات / يومياً (موصى به)</option>
                  <option value={8}>8 ساعات / يومياً (مكثف)</option>
                  <option value={10}>10 ساعات / يومياً (طوارئ الامتحانات)</option>
                </select>
              </div>
            </div>

            {/* Right: Calculated Metrics */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#122A38] border border-slate-200/80 dark:border-[#1E3D4F]">
                <div className="text-xl sm:text-2xl font-black text-[#176B65] dark:text-[#A8E6CF]">
                  {dateCalculations.diffDays}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  يوماً متبقياً
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#122A38] border border-slate-200/80 dark:border-[#1E3D4F]">
                <div className="text-xl sm:text-2xl font-black text-[#102C3A] dark:text-white">
                  {dateCalculations.totalStudyHours}h
                </div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  إجمالي الساعات
                </div>
              </div>
            </div>

          </div>

          {/* Progress Bar Strip */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF]" />
                <span>مستوى إنجاز مهام البلوك:</span>
              </span>
              <span className="text-[#176B65] dark:text-[#A8E6CF] font-black">
                {taskProgress.percentage}% ({taskProgress.completedCount} من {taskProgress.totalCount} مهام مكتملة)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#176B65] to-[#2BA89E] rounded-full transition-all duration-300"
                style={{ width: `${taskProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* View Tabs Selector */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className={`pb-2 text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'schedule'
                  ? 'text-[#176B65] dark:text-[#A8E6CF]'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4" />
                <span>جدول التكرار المتباعد والمهام ({activeBlock.tasks.length} مهام)</span>
              </div>
              {activeTab === 'schedule' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#176B65] dark:bg-[#A8E6CF] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('egyptian-resources')}
              className={`pb-2 text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'egyptian-resources'
                  ? 'text-[#176B65] dark:text-[#A8E6CF]'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>بنوك أسئلة الجامعات المصرية ({activeBlock.egyptianResources.length})</span>
              </div>
              {activeTab === 'egyptian-resources' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#176B65] dark:bg-[#A8E6CF] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('usmle-resources')}
              className={`pb-2 text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'usmle-resources'
                  ? 'text-[#176B65] dark:text-[#A8E6CF]'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>دكات AnKing ومصادر USMLE ({activeBlock.usmleResources.length})</span>
              </div>
              {activeTab === 'usmle-resources' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#176B65] dark:bg-[#A8E6CF] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: Spaced Repetition Phases & Tasks */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#EEF9F5] dark:bg-[#123838] border border-[#176B65]/20 dark:border-[#A8E6CF]/20 text-xs text-[#102C3A] dark:text-slate-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>منهجية التكرار المتباعد الذكية:</strong> تم تقسيم الـ {dateCalculations.diffDays} يوم المتبقية حتى امتحان {activeBlock.titleAr} إلى 4 مراحل تصاعدية: تبدأ بالفهم التأسيسي السريري، تليها دورة الاسترجاع النشط وفلاش كاردز Anki، ثم حل أسئلة الجامعات المصرية، وتختم بالمحاكاة وكشكول الأخطاء.
              </p>
            </div>

            <div className="space-y-3">
              {activeBlock.tasks.map((task) => {
                const isChecked = completedTaskIds.includes(task.id);
                const range = dateCalculations.getPhaseDateRange(
                  task.relativeStartPct,
                  task.relativeEndPct
                );

                return (
                  <div
                    key={task.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isChecked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                        : 'bg-white dark:bg-[#102430] border-slate-200 dark:border-[#1E3D4F] hover:border-slate-300 shadow-xs'
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
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
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

                          {/* Date Range Badge */}
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
                            <Calendar className="w-3.5 h-3.5 text-[#176B65] dark:text-[#A8E6CF]" />
                            <span>{range.startDateStr} ← {range.endDateStr} ({range.durationDays} يوم)</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {task.descriptionAr}
                        </p>

                        {/* High-yield tip */}
                        {task.highYieldTipAr && (
                          <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-800/40">
                            <strong>نصيحة المذاكرة: </strong>
                            {task.highYieldTipAr}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Egyptian Universities Question Banks */}
        {activeTab === 'egyptian-resources' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-3">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                هذه الأسئلة مستخلصة ومحدثة وفق امتحانات السنوات السابقة لكليات الطب المصرية (قصر العيني، عين شمس، المنصورة، طنطا، الإسكندرية) لضمان تغطية أسئلة الـ MCQs والـ OSPE المحتملة.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBlock.egyptianResources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] flex flex-col justify-between space-y-4 hover:border-[#176B65] transition-all shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#EEF9F5] dark:bg-[#16363B] text-[#176B65] dark:text-[#A8E6CF]">
                        {res.institutionOrPlatform}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 capitalize">
                        {res.category.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#102C3A] dark:text-white">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {res.descriptionAr}
                    </p>

                    {/* High-yield notes */}
                    {res.highYieldNotes && (
                      <div className="text-[11px] text-teal-800 dark:text-[#A8E6CF] bg-teal-50 dark:bg-[#133038] p-2 rounded-lg">
                        {res.highYieldNotes}
                      </div>
                    )}

                    {/* Tags */}
                    {res.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {res.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {res.externalUrl && (
                    <a
                      href={res.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#176B65] hover:bg-[#11534E] transition-colors"
                    >
                      <span>فتح بنك الأسئلة والمصدر الرسمي</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: USMLE & AnKing Decks */}
        {activeTab === 'usmle-resources' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#EEF9F5] dark:bg-[#16363B]/40 border border-[#176B65]/30 text-xs text-[#176B65] dark:text-[#A8E6CF] flex items-center gap-3">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span>
                تجميعة دكات AnKing v12 ومصادر USMLE Step 1 المرتبطة ببلوك {activeBlock.titleAr}. مصممة للاسترجاع النشط الفوري ومطابقة لكتاب First Aid ومحاضرات Pathoma.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBlock.usmleResources.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-3xl bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] flex flex-col justify-between space-y-4 hover:border-[#176B65] transition-all shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {res.institutionOrPlatform}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 capitalize">
                        {res.category.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#102C3A] dark:text-white">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {res.descriptionAr}
                    </p>

                    {/* High-yield notes */}
                    {res.highYieldNotes && (
                      <div className="text-[11px] text-purple-900 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/30 p-2 rounded-lg">
                        {res.highYieldNotes}
                      </div>
                    )}

                    {/* Tags */}
                    {res.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {res.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {res.externalUrl && (
                    <a
                      href={res.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#102C3A] dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span>تحميل أو استعراض الدك / بنك الأسئلة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
