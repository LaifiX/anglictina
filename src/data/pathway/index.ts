import type {
  CefrLevel,
  CourseExercise,
  PathwayProgressState,
  PracticalModule,
  TenseId,
} from '../../types/english';
import { A1_MODULES } from './a1Modules';
import { A2_MODULES } from './a2Modules';
import { B1_MODULES } from './b1Modules';
import {
  A1_PRACTICAL_SITUATIONS,
  A2_PRACTICAL_SITUATIONS,
} from './practicalSituationsModules';

const ALL_A1: PracticalModule[] = [...A1_MODULES, ...A1_PRACTICAL_SITUATIONS];
const ALL_A2: PracticalModule[] = [...A2_MODULES, ...A2_PRACTICAL_SITUATIONS];
const ALL_B1: PracticalModule[] = [...B1_MODULES];

// Ensure sequential 1..N global order after adding everyday travel scenarios
export const PRACTICAL_MODULES: PracticalModule[] = [
  ...ALL_A1,
  ...ALL_A2,
  ...ALL_B1,
].map((mod, idx) => ({
  ...mod,
  order: idx + 1,
}));

export const MODULES_BY_LEVEL: Record<CefrLevel, PracticalModule[]> = {
  A1: PRACTICAL_MODULES.filter((m) => m.level === 'A1'),
  A2: PRACTICAL_MODULES.filter((m) => m.level === 'A2'),
  B1: PRACTICAL_MODULES.filter((m) => m.level === 'B1'),
};

export const ALL_COURSE_EXERCISES: CourseExercise[] = PRACTICAL_MODULES.flatMap(
  (m) => m.exercises
);

/** Quick everyday travel & conversation shortcuts highlighted right at the top of PracticalCourse */
export const QUICK_TRAVEL_SCENARIOS: {
  moduleId: string;
  shortLabelSk: string;
  hintSk: string;
}[] = [
  {
    moduleId: 'a1-m5',
    shortLabelSk: 'Kupovanie lístkov',
    hintSk: 'MHD, vlak, bus, múzeá & zľavy',
  },
  {
    moduleId: 'a1-m6',
    shortLabelSk: 'Keď niečo hľadáš',
    hintSk: 'Na ulici, stanici aj v budove',
  },
  {
    moduleId: 'a1-m7',
    shortLabelSk: 'Nákup v potravinách & pekárni',
    hintSk: 'Pult, uličky, pokladňa & skener',
  },
  {
    moduleId: 'a2-m5',
    shortLabelSk: 'Jedlo zo stánku & reštaurácia',
    hintSk: 'Street food, omáčky, denné menu',
  },
  {
    moduleId: 'a1-m2',
    shortLabelSk: 'Letisko & batožina',
    hintSk: 'Check-in, kontrola, brána',
  },
  {
    moduleId: 'a1-m4',
    shortLabelSk: 'Hotel & ubytovanie',
    hintSk: 'Recepcia, raňajky, úschova kufrov',
  },
  {
    moduleId: 'a2-m3',
    shortLabelSk: 'Oblečenie & reklamácie',
    hintSk: 'Kabínky, veľkosti, vrátenie',
  },
  {
    moduleId: 'a2-m4',
    shortLabelSk: 'Lekáreň & núdza',
    hintSk: 'Lieky, úraz, stratené doklady',
  },
];

export const CEFR_LEVEL_META: {
  level: CefrLevel;
  titleSk: string;
  badgeSk: string;
  descriptionSk: string;
  recommendedTenses: TenseId[];
}[] = [
  {
    level: 'A1',
    titleSk: 'A1 · Prežitie na cestách a bežné situácie',
    badgeSk: 'Začiatočník',
    descriptionSk:
      'Zoznámenie, letisko, kupovanie lístkov, pýtanie sa keď niečo hľadáš, nákup v potravinách a pekárni, kaviareň a ubytovanie v hoteli.',
    recommendedTenses: ['present-simple', 'present-continuous'],
  },
  {
    level: 'A2',
    titleSk: 'A2 · Samostatný cestovateľ v praxi',
    badgeSk: 'Mierne pokročilý',
    descriptionSk:
      'Pouličný stánok (street food) a reštaurácia do detailu, zážitky v minulosti, rezervácie, obchody s oblečením, lekáreň a núdza.',
    recommendedTenses: ['past-simple', 'past-continuous', 'future-going-to', 'future-will'],
  },
  {
    level: 'B1',
    titleSk: 'B1 · Plynulá konverzácia a riešenie problémov',
    badgeSk: 'Stredne pokročilý',
    descriptionSk:
      'Životné skúsenosti, požičovňa áut a reklamácie na letisku či v hoteli, vyjadrenie názoru, podmienky a plynulé príbehy.',
    recommendedTenses: ['present-perfect', 'present-perfect-continuous', 'past-perfect'],
  },
];

export interface ModuleProgressSummary {
  vocabDone: number;
  vocabTotal: number;
  sentencesDone: number;
  sentencesTotal: number;
  exercisesMastered: number;
  exercisesTotal: number;
  itemsDone: number;
  itemsTotal: number;
  percent: number;
  isCompleted: boolean;
}

export function getModuleProgress(
  mod: PracticalModule,
  state: PathwayProgressState
): ModuleProgressSummary {
  const vocabTotal = mod.vocab.length;
  const vocabDone = mod.vocab.filter((v) => Boolean(state.learnedVocab[v.id])).length;

  const sentencesTotal = mod.sentences.length;
  const sentencesDone = mod.sentences.filter((s) => Boolean(state.learnedSentences[s.id])).length;

  const exercisesTotal = mod.exercises.length;
  const exercisesMastered = mod.exercises.filter(
    (q) => Boolean(state.exerciseRecords[q.id]?.lastCorrect)
  ).length;

  const itemsTotal = vocabTotal + sentencesTotal + exercisesTotal;
  const itemsDone = vocabDone + sentencesDone + exercisesMastered;
  const percent = itemsTotal > 0 ? Math.round((itemsDone / itemsTotal) * 100) : 0;
  const isCompleted = exercisesMastered >= Math.ceil(exercisesTotal * 0.8) && vocabDone >= 10;

  return {
    vocabDone,
    vocabTotal,
    sentencesDone,
    sentencesTotal,
    exercisesMastered,
    exercisesTotal,
    itemsDone,
    itemsTotal,
    percent,
    isCompleted,
  };
}

export interface PathwayOverallSummary {
  vocabDone: number;
  vocabTotal: number;
  sentencesDone: number;
  sentencesTotal: number;
  exercisesMastered: number;
  exercisesTotal: number;
  mistakesCount: number;
  modulesCompleted: number;
  modulesTotal: number;
  itemsDone: number;
  itemsTotal: number;
  percent: number;
  byLevel: Record<
    CefrLevel,
    {
      itemsDone: number;
      itemsTotal: number;
      percent: number;
      modulesCompleted: number;
      modulesTotal: number;
      exercisesMastered: number;
      exercisesTotal: number;
    }
  >;
}

export function getPathwayOverallSummary(state: PathwayProgressState): PathwayOverallSummary {
  let vocabDone = 0;
  let vocabTotal = 0;
  let sentencesDone = 0;
  let sentencesTotal = 0;
  let exercisesMastered = 0;
  let exercisesTotal = 0;
  let mistakesCount = 0;
  let modulesCompleted = 0;

  const byLevel: PathwayOverallSummary['byLevel'] = {
    A1: {
      itemsDone: 0,
      itemsTotal: 0,
      percent: 0,
      modulesCompleted: 0,
      modulesTotal: 0,
      exercisesMastered: 0,
      exercisesTotal: 0,
    },
    A2: {
      itemsDone: 0,
      itemsTotal: 0,
      percent: 0,
      modulesCompleted: 0,
      modulesTotal: 0,
      exercisesMastered: 0,
      exercisesTotal: 0,
    },
    B1: {
      itemsDone: 0,
      itemsTotal: 0,
      percent: 0,
      modulesCompleted: 0,
      modulesTotal: 0,
      exercisesMastered: 0,
      exercisesTotal: 0,
    },
  };

  for (const mod of PRACTICAL_MODULES) {
    const mp = getModuleProgress(mod, state);
    vocabDone += mp.vocabDone;
    vocabTotal += mp.vocabTotal;
    sentencesDone += mp.sentencesDone;
    sentencesTotal += mp.sentencesTotal;
    exercisesMastered += mp.exercisesMastered;
    exercisesTotal += mp.exercisesTotal;
    if (mp.isCompleted) modulesCompleted += 1;

    for (const q of mod.exercises) {
      const rec = state.exerciseRecords[q.id];
      if (rec && !rec.lastCorrect) mistakesCount += 1;
    }

    const lvl = byLevel[mod.level];
    lvl.itemsDone += mp.itemsDone;
    lvl.itemsTotal += mp.itemsTotal;
    lvl.exercisesMastered += mp.exercisesMastered;
    lvl.exercisesTotal += mp.exercisesTotal;
    lvl.modulesTotal += 1;
    if (mp.isCompleted) lvl.modulesCompleted += 1;
  }

  for (const lvlKey of ['A1', 'A2', 'B1'] as CefrLevel[]) {
    const l = byLevel[lvlKey];
    l.percent = l.itemsTotal > 0 ? Math.round((l.itemsDone / l.itemsTotal) * 100) : 0;
  }

  const itemsTotal = vocabTotal + sentencesTotal + exercisesTotal;
  const itemsDone = vocabDone + sentencesDone + exercisesMastered;
  const percent = itemsTotal > 0 ? Math.round((itemsDone / itemsTotal) * 100) : 0;

  return {
    vocabDone,
    vocabTotal,
    sentencesDone,
    sentencesTotal,
    exercisesMastered,
    exercisesTotal,
    mistakesCount,
    modulesCompleted,
    modulesTotal: PRACTICAL_MODULES.length,
    itemsDone,
    itemsTotal,
    percent,
    byLevel,
  };
}
