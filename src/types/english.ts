export type Accent = 'en-GB' | 'en-US';
export type SpeechRate = 0.75 | 0.95;
export type ThemeMode = 'light' | 'dark';

export type VerbLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type VerbPattern =
  | 'AAA'
  | 'ABB'
  | 'ABA'
  | 'ABC'
  | 'IAU'
  | 'OUGHT'
  | 'SPECIAL';

export interface VerbExample {
  en: string;
  sk: string;
  note: string;
}

export interface IrregularVerb {
  id: string;
  v1: string;
  v2: string;
  v2Accepted?: string[];
  v3: string;
  v3Accepted?: string[];
  thirdPerson: string;
  ingForm: string;
  ipa: {
    v1: string;
    v2: string;
    v3: string;
  };
  pronunciationSk: {
    v1: string;
    v2: string;
    v3: string;
  };
  translationSk: string;
  otherMeaningsSk?: string;
  level: VerbLevel;
  pattern: VerbPattern;
  slovakExplanation: {
    summary: string;
    formsGuide: {
      v1: string;
      v2: string;
      v3: string;
    };
    tipSk: string;
  };
  examples: {
    v1: VerbExample;
    v2: VerbExample;
    v3: VerbExample;
    questionNeg: VerbExample;
  };
  /** Optional contextual sentence exercises for practicing forms inside real sentences */
  sentenceGap?: {
    sentence: string;
    targetForm: 'v1' | 'v2' | 'v3' | 'thirdPerson' | 'ingForm';
    translationSk: string;
    whySk: string;
  };
}

export type AppTab = 'verbs' | 'practice' | 'grammar' | 'quiz';

export type PracticeMode =
  | 'all-3'       // Type V1, V2, V3 from Slovak meaning + explanation
  | 'v2-v3'       // Given V1 + translation, type V2 and V3
  | 'all-5'       // Type V1, V2, V3, 3rd person (-s), and -ing form
  | 'random-gap'  // One form shown randomly, type the missing ones
  | 'flashcards'  // Flip cards with audio & Slovak explanations
  | 'choice'      // Touch-friendly multiple choice (great on mobile)
  | 'context';    // Fill the right verb form inside a full sentence

export interface VerbProgressRecord {
  attempts: number;
  correct: number;
  streak: number;
  lastPracticedAt: number;
}

export type ProgressMap = Record<string, VerbProgressRecord>;

export type TenseCategory = 'present' | 'past' | 'future' | 'questions';

export type SentencePolarity = 'aff' | 'neg' | 'qPos' | 'qNeg';

export interface TenseSentenceRow {
  polarity: SentencePolarity;
  labelSk: string;
  badge: string;
  formula: string;
  en: string;
  enFormal?: string;
  sk: string;
  whySk: string;
}

export interface TenseGuide {
  id:
    | 'present-simple'
    | 'present-continuous'
    | 'past-simple'
    | 'past-continuous'
    | 'present-perfect'
    | 'future-will'
    | 'future-going-to';
  category: 'present' | 'past' | 'future';
  titleSk: string;
  titleEn: string;
  subtitleSk: string;
  whenToUseSk: string[];
  slovakBridgeSk: string;
  signalWords: { en: string; sk: string }[];
  formingRulesSk: {
    title: string;
    points: string[];
  }[];
  commonMistakeSk: {
    wrong: string;
    right: string;
    explanationSk: string;
  };
  matrix: TenseSentenceRow[];
  shortAnswers: {
    positiveQ: string;
    yes: string;
    no: string;
    negativeQ: string;
    negAnswerNoteSk: string;
  };
}

export interface GrammarQuizQuestion {
  id: string;
  category: 'present' | 'past' | 'future' | 'questions-pos-neg';
  promptSk: string;
  sentenceWithBlank: string;
  options: string[];
  correctIndex: number;
  fullCorrectSentence: string;
  translationSk: string;
  explanationSk: string;
}
