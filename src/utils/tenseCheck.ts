import type { TenseExercise, TenseId, TenseProgressMap } from '../types/english';

const CONTRACTION_PAIRS: [string, string][] = [
  ["don't", 'do not'],
  ["doesn't", 'does not'],
  ["didn't", 'did not'],
  ["isn't", 'is not'],
  ["aren't", 'are not'],
  ["wasn't", 'was not'],
  ["weren't", 'were not'],
  ["won't", 'will not'],
  ["haven't", 'have not'],
  ["hasn't", 'has not'],
  ["hadn't", 'had not'],
  ["can't", 'cannot'],
  ["i'm", 'i am'],
  ["you're", 'you are'],
  ["we're", 'we are'],
  ["they're", 'they are'],
  ["i've", 'i have'],
  ["you've", 'you have'],
  ["we've", 'we have'],
  ["they've", 'they have'],
  ["i'll", 'i will'],
  ["you'll", 'you will'],
  ["he'll", 'he will'],
  ["she'll", 'she will'],
  ["it'll", 'it will'],
  ["we'll", 'we will'],
  ["they'll", 'they will'],
  ["i'd", 'i had'],
  ["you'd", 'you had'],
  ["he'd", 'he had'],
  ["she'd", 'she had'],
  ["we'd", 'we had'],
  ["they'd", 'they had'],
];

const AMBIGUOUS_S_CONTRACTIONS: [string, string[]][] = [
  ["he's", ['he is', 'he has']],
  ["she's", ['she is', 'she has']],
  ["it's", ['it is', 'it has']],
];

/**
 * Normalizes English learner input: lowercases, unifies curly apostrophes,
 * strips trailing punctuation and collapses whitespace.
 */
export function normalizeTenseAnswer(raw: string): string {
  return raw
    .trim()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.?!]+$/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceWholePhrase(input: string, from: string, to: string): string {
  const re = new RegExp(`(^|\\s)${escapeRegExp(from)}(?=\\s|$)`, 'g');
  return input.replace(re, `$1${to}`);
}

/**
 * Produces a set of normalized accepted answers for a tense exercise,
 * automatically accepting standard contractions and their full uncontracted forms,
 * as well as formal negative question word order (e.g. "Didn't you go" <-> "Did you not go").
 */
export function getAcceptedTenseAnswers(exercise: TenseExercise): Set<string> {
  const seeds = [exercise.answer, ...(exercise.acceptedExtras ?? [])].map(normalizeTenseAnswer);
  const accepted = new Set<string>(seeds);

  const expandOne = (candidate: string) => {
    for (const [shortForm, fullForm] of CONTRACTION_PAIRS) {
      const toFull = replaceWholePhrase(candidate, shortForm, fullForm);
      if (toFull !== candidate) accepted.add(toFull);
      const toShort = replaceWholePhrase(candidate, fullForm, shortForm);
      if (toShort !== candidate) accepted.add(toShort);
    }

    // Handle he's / she's / it's depending on whether 'is' or 'has' appears in the canonical form
    for (const [shortForm, fullForms] of AMBIGUOUS_S_CONTRACTIONS) {
      for (const fullForm of fullForms) {
        const toShort = replaceWholePhrase(candidate, fullForm, shortForm);
        if (toShort !== candidate) accepted.add(toShort);
      }
      if (candidate.includes(shortForm)) {
        const looksPerfect =
          exercise.tenseId === 'present-perfect' || exercise.tenseId === 'present-perfect-continuous';
        const targetFull = looksPerfect ? fullForms[1] : fullForms[0];
        const toFull = replaceWholePhrase(candidate, shortForm, targetFull);
        if (toFull !== candidate) accepted.add(toFull);
      }
    }

    // Support "'m not" <-> "am not" and "am not" -> "i'm not" when subject is outside blank
    if (candidate.startsWith('am not ')) {
      accepted.add(`'m not ${candidate.slice('am not '.length)}`);
    } else if (candidate === 'am not') {
      accepted.add("'m not");
    }

    // Formal negative question pattern: "didn't you go" <-> "did you not go"
    const negQMatch = candidate.match(
      /^(don't|doesn't|didn't|isn't|aren't|wasn't|weren't|won't|haven't|hasn't|hadn't)\s+([a-z]+(?:\s+[a-z]+)?)\s+(.+)$/
    );
    if (negQMatch) {
      const [, negAux, subj, rest] = negQMatch;
      const posAuxMap: Record<string, string> = {
        "don't": 'do',
        "doesn't": 'does',
        "didn't": 'did',
        "isn't": 'is',
        "aren't": 'are',
        "wasn't": 'was',
        "weren't": 'were',
        "won't": 'will',
        "haven't": 'have',
        "hasn't": 'has',
        "hadn't": 'had',
      };
      const posAux = posAuxMap[negAux];
      if (posAux) {
        if (negAux === "aren't" && subj === 'i') {
          accepted.add(`am i not ${rest}`);
        } else {
          accepted.add(`${posAux} ${subj} not ${rest}`);
        }
      }
    }
  };

  // Run two passes so chained transformations (e.g. auxiliary + contraction) settle
  for (let pass = 0; pass < 2; pass += 1) {
    for (const item of Array.from(accepted)) {
      expandOne(item);
    }
  }

  return accepted;
}

export function isTenseAnswerCorrect(exercise: TenseExercise, userInput: string): boolean {
  const normalized = normalizeTenseAnswer(userInput);
  if (!normalized) return false;
  return getAcceptedTenseAnswers(exercise).has(normalized);
}

/**
 * Fills the ____ blank in a sentence cleanly, adjusting capitalization if blank starts the sentence.
 */
export function fillSentenceBlank(sentenceWithBlank: string, answer: string): string {
  const trimmedBlank = sentenceWithBlank.trimStart();
  const startsWithBlank = trimmedBlank.startsWith('____');
  const formattedAnswer =
    startsWithBlank && answer.length > 0 ? answer[0].toUpperCase() + answer.slice(1) : answer;
  return sentenceWithBlank.replace('____', formattedAnswer);
}

/**
 * Returns a shuffled 4-element options array for multiple-choice display.
 * Uses a seed string so options don't jump on re-render within the same round.
 */
export function buildChoiceOptions(exercise: TenseExercise, seedSalt = 0): string[] {
  const items = [exercise.answer, ...exercise.distractors];
  // Deterministic Fisher-Yates hash shuffle per (id + seedSalt)
  let seed = seedSalt * 2654435761;
  for (let i = 0; i < exercise.id.length; i += 1) {
    seed = (seed * 31 + exercise.id.charCodeAt(i)) >>> 0;
  }
  const nextRand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(nextRand() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selects a balanced round of exercises from the candidate pool:
 * - When prioritizeSmart is true, orders unseen and previously missed exercises first.
 * - When multiple tenses are included, stratifies fairly across selected tenses so
 *   every chosen tense gets proportional representation before shuffling the final round.
 */
export function selectTenseRound(params: {
  pool: TenseExercise[];
  count: number;
  progress: TenseProgressMap;
  prioritizeSmart: boolean;
  selectedTenses: TenseId[];
}): TenseExercise[] {
  const { pool, count, progress, prioritizeSmart, selectedTenses } = params;
  if (pool.length === 0) return [];
  const limit = Math.min(count, pool.length);

  const rankWithinBucket = (items: TenseExercise[]): TenseExercise[] => {
    if (!prioritizeSmart) return shuffleArray(items);
    const missed: TenseExercise[] = [];
    const unseen: TenseExercise[] = [];
    const mastered: TenseExercise[] = [];

    for (const ex of items) {
      const rec = progress[ex.id];
      if (!rec) {
        unseen.push(ex);
      } else if (!rec.lastCorrect) {
        missed.push(ex);
      } else {
        mastered.push(ex);
      }
    }

    // Prioritize previously missed + fresh unseen exercises, then review mastered ones
    return [...shuffleArray(missed), ...shuffleArray(unseen), ...shuffleArray(mastered)];
  };

  const activeTenses = selectedTenses.filter((t) => pool.some((ex) => ex.tenseId === t));
  if (activeTenses.length <= 1) {
    return shuffleArray(rankWithinBucket(pool).slice(0, limit));
  }

  // Stratified round-robin across tenses so combinations & full mix are balanced
  const buckets = new Map<TenseId, TenseExercise[]>();
  for (const t of shuffleArray(activeTenses)) {
    buckets.set(
      t,
      rankWithinBucket(pool.filter((ex) => ex.tenseId === t))
    );
  }

  const picked: TenseExercise[] = [];
  let madeProgress = true;
  while (picked.length < limit && madeProgress) {
    madeProgress = false;
    for (const [, list] of buckets) {
      if (picked.length >= limit) break;
      const next = list.shift();
      if (next) {
        picked.push(next);
        madeProgress = true;
      }
    }
  }

  return shuffleArray(picked);
}

export interface TenseMasterySummary {
  total: number;
  attempted: number;
  mastered: number;
  mistakes: number;
  accuracyPercent: number | null;
  status: 'new' | 'in-progress' | 'mastered';
}

export function getTenseMastery(
  tenseId: TenseId,
  allExercises: TenseExercise[],
  progress: TenseProgressMap
): TenseMasterySummary {
  const items = allExercises.filter((ex) => ex.tenseId === tenseId);
  let attempted = 0;
  let mastered = 0;
  let mistakes = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;

  for (const ex of items) {
    const rec = progress[ex.id];
    if (!rec) continue;
    attempted += 1;
    totalAttempts += rec.attempts;
    totalCorrect += rec.correct;
    if (rec.lastCorrect) mastered += 1;
    else mistakes += 1;
  }

  const accuracyPercent =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  const status: TenseMasterySummary['status'] =
    mastered >= 20 && (accuracyPercent ?? 0) >= 80
      ? 'mastered'
      : attempted > 0
        ? 'in-progress'
        : 'new';

  return {
    total: items.length,
    attempted,
    mastered,
    mistakes,
    accuracyPercent,
    status,
  };
}
