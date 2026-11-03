# Medical Block & Spaced Repetition Planner (مخطط ومنظم مراجعة البلوكات الطبية)

An interactive clinical and academic planning tool tailored specifically for Egyptian medical students operating under the 5+2 modular curriculum. Students select their active organ system block (CVS, Respiratory, CNS, GIT, Renal, Endocrine, Musculoskeletal, Hematology), specify their upcoming exam date, and generate an automated, scientifically structured spaced-repetition study schedule paired with vetted Egyptian university past papers and USMLE Step 1 Anki decks.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following requirements were confirmed during the interactive interview:
> - **Display Model**: Dedicated interactive modal dialog accessible via prominent quick-action buttons on the Home Hero and Study Smarter navigation hubs (`نافذة تفاعلية منبثقة عند الضغط على زر مخصص`).
> - **Algorithm**: Automated interval calculation based on the user's target exam date, breaking preparation into 4 evidence-based spaced-repetition phases (`إدخال تاريخ الامتحان لحساب دورات المراجعة آليا`).
> - **Curated Question Banks & Decks**: Dual-track recommendations uniting Egyptian faculty archives (Kasr Al-Ainy, Ain Shams, Mansoura, Alexandria past exams) with global high-yield USMLE Step 1 Anki decks (AnKing, Amboss concepts) (`تجميعة مشتركة بين أسئلة الجامعات المصرية ومصادر USMLE`).

---

## 1. Overview & Core Concept

- **What It Does**: Resolves the severe cognitive and time-management pressure Egyptian medical students face during dense modular blocks (which typically last only 4 to 8 weeks). It transforms an intimidating block syllabus into an actionable day-by-day and week-by-week spaced repetition roadmap with direct access to vetted question banks and flashcards.
- **Target Audience**: Undergraduate Egyptian medical students (Years 1–3 pre-clinical and Years 4–5 clinical modular blocks) and international students enrolled in Egyptian faculties.
- **Key Value**: Replaces chaotic cramming with structured retrieval practice (active recall + spaced repetition), preventing forgetting curves and ensuring equal mastery of Egyptian faculty past paper styles and USMLE clinical vignettes.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[Click "Plan My Block" / "منظم مراجعة البلوكات"]
                      │
                      ▼
 ┌──────────────────────────────────────────────────────────────┐
 │ Step 1: Block & Timeline Setup                               │
 │ - Select Organ System Block (CVS, CNS, Respiratory, GIT...)  │
 │ - Pick Exam Date (Auto-calculates days remaining)            │
 │ - Select Current Stage (First Pass vs. Pre-Exam Revision)    │
 └────────────────────────────┬─────────────────────────────────┘
                              │
                              ▼
 ┌──────────────────────────────────────────────────────────────┐
 │ Step 2: Generated Spaced-Repetition Roadmap                   │
 │ - Phase 1 (0–40%): Conceptual Mastery & System Anatomy/Phys  │
 │ - Phase 2 (40–65%): Pathology/Pharma & Anki Flashcard Recall │
 │ - Phase 3 (65–85%): Egyptian Past Papers & USMLE Vignettes   │
 │ - Phase 4 (85–100%): Mistake Log Review & High-Yield Mocks   │
 └────────────────────────────┬─────────────────────────────────┘
                              │
                              ▼
 ┌──────────────────────────────────────────────────────────────┐
 │ Step 3: Curated Resource Deck & Interactive Checklist        │
 │ - Egyptian Faculty Q-Bank Links (Kasr Al-Ainy, Ain Shams...) │
 │ - AnKing / USMLE Deck Tags & High-Yield Summary Sheets       │
 │ - Interactive checkbox progress saved to LocalStorage        │
 │ - Print / Export schedule action                             │
 └──────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme
- **Aesthetic Direction**: High-trust, editorial academic medicine with crisp typographic contrast, honoring MedRise's deep petrol blue (`#102C3A`), clinical teal (`#176B65`), and soft mint accents (`#A8E6CF`).
- **Typography & Structure**: Clean Latin display headers paired with legible Arabic typography (`Cairo`/`Tajawal` font-friendly layout with right-to-left contextual support). Tabular figures (`tabular-nums`) for dates, countdown days, and question counts.
- **Anti-Slop Restraint**: Zero decorative glowing badges, zero generic pills. Milestones are organized via quiet, unboxed timelines with thin hairline dividers (`border-slate-200 dark:border-slate-800`), clean progress indicators, and actionable buttons.
- **Theme Support**: Flawless light and dark mode integration using established project CSS variables and Tailwind dark variants (`dark:bg-[#102430]`, `dark:border-[#1E3D4F]`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Algorithmic Calculation vs. Static Tables**
  - *Chosen Approach*: Dynamic date math in React calculating exact milestone dates based on `(ExamDate - Today)`. If a student has 24 days left, it automatically allocates: Phase 1 (Days 1–10), Phase 2 (Days 11–16), Phase 3 (Days 17–21), Phase 4 (Days 22–24).
  - *Why*: Medical students don't take exams on identical dates; a static calendar table is useless. Dynamic scheduling adapts immediately to any exam date.
  - *Alternative Considered*: Fixed 4-week template (rejected as rigid and impractical for modular students with midterms or shortened summer blocks).

- **Decision 2: Dual Local Persistence & Reset Capability**
  - *Chosen Approach*: Save the user's active block selection, target exam date, and task completion checkboxes to `localStorage` under `medrise_block_planner_state`.
  - *Why*: Students revisit their plan daily to check off completed modules; losing state on modal close or page refresh causes frustration.
  - *Alternative Considered*: Supabase backend sync only (rejected because students should be able to plan immediately without mandatory sign-in, though logged-in metadata can sync smoothly).

- **Decision 3: Dual Faculty + USMLE Resource Matrix**
  - *Chosen Approach*: Group study assets into two distinct, clear tabs per block:
    1. **Egyptian Faculty Collections**: Department notes, university past paper banks (Kasr Al-Ainy, Ain Shams, Mansoura, Alexandria, Assiut), and MCQ file compilations.
    2. **USMLE Step 1 & Anki Systems**: Specific AnKing subdecks, First Aid system chapters, and Amboss/UWorld high-yield topic checklists.

---

## 4. Technical Architecture & Data Strategy

### System Component Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        App.tsx                             │
│  - isBlockPlannerOpen state                                │
│  - Global trigger binding                                  │
└─────────────────────────────┬──────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌───────────────────────┐               ┌────────────────────┐
│     Navbar.tsx        │               │    HomePage.tsx    │
│  - "منظم البلوكات"    │               │  - Hero CTA card   │
│    quick action       │               │  - Quick tools bar │
└───────────────────────┘               └────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│                   BlockPlannerModal.tsx                    │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Header: Title, Active Block Selector, Exam Countdown   │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Config Bar: Target Date Picker & Pace Selector         │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Phase Schedule Visualizer: 4 Spaced Repetition Stages  │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Tabbed Resource Explorer: Egyptian Q-Banks | USMLE/Anki│ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Action Footer: Copy Summary, Print/PDF, Reset Plan     │ │
│ └────────────────────────────────────────────────────────┘ │
└─────────────────────────────┬──────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────┐
│            src/data/medicalBlocksData.ts                   │
│ - 8 Comprehensive Egyptian 5+2 Organ System Blocks         │
│ - Detailed subject breakdown (Anatomy, Phys, Patho, Pharma)│
│ - Faculty Q-Bank references & verified Anki deck links     │
│ - High-yield clinical key points per block                 │
└────────────────────────────────────────────────────────────┘
```

### Modular Blocks Covered
1. **Cardiovascular System (CVS / جهاز القلب والأوعية الدموية)**: Heart failure, arrhythmias, valvular lesions, ECG analysis, antihypertensives.
2. **Respiratory System (الجهاز التنفسي)**: COPD, asthma, pneumonia, tuberculosis, pulmonary embolism, arterial blood gases (ABG).
3. **Gastrointestinal System & Nutrition (GIT / الجهاز الهضمي والتغذية)**: Liver cirrhosis, hepatitis, IBD, peptic ulcers, GI pharmacology.
4. **Central Nervous System & Special Senses (CNS / الجهاز العصبي)**: Stroke syndromes, cranial nerves, spinal cord tracts, neuropharmacology.
5. **Renal & Urinary System (الجهاز البولي والكلى)**: Acute & chronic kidney injury, glomerulonephritis, nephrotic vs. nephritic, diuretics.
6. **Endocrine & Reproductive System (الغدد الصماء والتناسل)**: Diabetes mellitus, thyroid disorders, adrenal pathology, obstetric physiology.
7. **Musculoskeletal & Integumentary System (الجهاز العضلي والجلد)**: Rheumatology, bone fractures, autoimmune dermatology, soft tissue pathology.
8. **Hematology & Immunology (الدم والمناعة)**: Anemias, leukemia/lymphoma, bleeding disorders, hypersensitivity reactions.

---

## 5. Verification & Testing Steps

1. **Date & Spaced Repetition Validation**:
   - Verify calculation with varying dates (e.g., 7 days, 21 days, 45 days) to ensure phase day ranges round logically without fractional days or negative values.
2. **Persistence Validation**:
   - Check off several tasks, close the modal, reload the page, and confirm checkboxes and dates remain preserved in `localStorage`.
3. **Responsive & Theme Testing**:
   - Test full-screen responsiveness across mobile viewports ($375\text{px}$) and desktop viewports ($1440\text{px}$).
   - Verify seamless contrast across light and dark theme modes.
4. **Build & Type Checking**:
   - Run `compile_applet` and `lint_applet` to confirm error-free TypeScript compilation.
