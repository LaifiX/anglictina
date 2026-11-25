import type { SentencePolarity, TenseExercise, TenseId } from '../../types/english';

export type RawTenseExerciseRow = [
  polarity: SentencePolarity,
  sentenceWithBlank: string,
  verbCue: string,
  answer: string,
  distractors: [string, string, string],
  translationSk: string,
  explanationSk: string,
  acceptedExtras?: string[],
];

export function buildTenseExercises(
  tenseId: TenseId,
  prefix: string,
  rows: RawTenseExerciseRow[]
): TenseExercise[] {
  return rows.map((row, idx) => {
    const [
      polarity,
      sentenceWithBlank,
      verbCue,
      answer,
      distractors,
      translationSk,
      explanationSk,
      acceptedExtras,
    ] = row;
    return {
      id: `${prefix}-${String(idx + 1).padStart(3, '0')}`,
      tenseId,
      polarity,
      sentenceWithBlank,
      verbCue,
      answer,
      distractors,
      translationSk,
      explanationSk,
      ...(acceptedExtras ? { acceptedExtras } : {}),
    };
  });
}
