import type {
  CefrLevel,
  CourseExercise,
  CourseExerciseKind,
  PracticalSentence,
  VocabItem,
} from '../../types/english';

export type RawVocabRow = [
  en: string,
  sk: string,
  pronunciationSk: string,
  exampleEn: string,
  exampleSk: string,
  noteSk?: string,
];

export type RawSentenceRow = [
  en: string,
  sk: string,
  situationSk: string,
  politeTipSk?: string,
];

export type RawCourseExerciseRow = [
  kind: CourseExerciseKind,
  promptSk: string,
  sentenceEn: string | undefined,
  answer: string,
  distractors: [string, string, string],
  explanationSk: string,
];

export function buildVocab(moduleId: string, rows: RawVocabRow[]): VocabItem[] {
  return rows.map(([en, sk, pronunciationSk, exampleEn, exampleSk, noteSk], idx) => ({
    id: `${moduleId}-v${String(idx + 1).padStart(2, '0')}`,
    en,
    sk,
    pronunciationSk,
    exampleEn,
    exampleSk,
    ...(noteSk ? { noteSk } : {}),
  }));
}

export function buildSentences(moduleId: string, rows: RawSentenceRow[]): PracticalSentence[] {
  return rows.map(([en, sk, situationSk, politeTipSk], idx) => ({
    id: `${moduleId}-s${String(idx + 1).padStart(2, '0')}`,
    en,
    sk,
    situationSk,
    ...(politeTipSk ? { politeTipSk } : {}),
  }));
}

export function buildCourseExercises(
  moduleId: string,
  level: CefrLevel,
  rows: RawCourseExerciseRow[]
): CourseExercise[] {
  return rows.map(([kind, promptSk, sentenceEn, answer, distractors, explanationSk], idx) => {
    const baseOptions: [string, string, string, string] = [
      answer,
      distractors[0],
      distractors[1],
      distractors[2],
    ];
    // Deterministic rotation per index so the right answer isn't always first
    const shift = idx % 4;
    const rotated = [
      ...baseOptions.slice(shift),
      ...baseOptions.slice(0, shift),
    ] as [string, string, string, string];

    return {
      id: `${moduleId}-q${String(idx + 1).padStart(2, '0')}`,
      moduleId,
      level,
      kind,
      promptSk,
      ...(sentenceEn ? { sentenceEn } : {}),
      options: rotated,
      answer,
      explanationSk,
    };
  });
}
