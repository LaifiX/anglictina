import type { IrregularVerb } from '../types/english';

export type VerbFormKey = 'v1' | 'v2' | 'v3' | 'thirdPerson' | 'ingForm';

export const VERB_FORM_LABELS_SK: Record<
  VerbFormKey,
  { short: string; title: string; hint: string }
> = {
  v1: {
    short: 'V1',
    title: '1. tvar (neurčitok / základ)',
    hint: 'napr. go, write, be',
  },
  v2: {
    short: 'V2',
    title: '2. tvar (minulý čas)',
    hint: 'napr. went, wrote, was / were',
  },
  v3: {
    short: 'V3',
    title: '3. tvar (minulé príčastie)',
    hint: 'napr. gone, written, been',
  },
  thirdPerson: {
    short: '3. os.',
    title: '3. osoba j.č. (he/she/it)',
    hint: 'napr. goes, writes, is',
  },
  ingForm: {
    short: '-ing',
    title: 'Priebehový tvar (-ing)',
    hint: 'napr. going, writing, being',
  },
};

export function normalizeVerbInput(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s*\/\s*/g, '/');
}

export function getAcceptedAnswers(verb: IrregularVerb, form: VerbFormKey): string[] {
  if (form === 'v1') {
    return [normalizeVerbInput(verb.v1)];
  }
  if (form === 'v2') {
    const raw = verb.v2Accepted ?? verb.v2.split('/').map((s) => s.trim());
    const combined = [verb.v2, ...raw];
    return Array.from(new Set(combined.map(normalizeVerbInput)));
  }
  if (form === 'v3') {
    const raw = verb.v3Accepted ?? verb.v3.split('/').map((s) => s.trim());
    const combined = [verb.v3, ...raw];
    return Array.from(new Set(combined.map(normalizeVerbInput)));
  }
  if (form === 'thirdPerson') {
    return [normalizeVerbInput(verb.thirdPerson)];
  }
  return [normalizeVerbInput(verb.ingForm)];
}

export function getDisplayForm(verb: IrregularVerb, form: VerbFormKey): string {
  return verb[form];
}

export function isVerbFormAnswerCorrect(
  verb: IrregularVerb,
  form: VerbFormKey,
  userInput: string
): boolean {
  const normalized = normalizeVerbInput(userInput);
  if (!normalized) return false;
  const accepted = getAcceptedAnswers(verb, form);
  return accepted.includes(normalized);
}

/**
 * Generates plausible multiple-choice options for a target verb form,
 * mixing other irregular forms and common over-regularization mistakes (e.g. "goed", "writed").
 */
export function generateVerbFormChoices(
  verb: IrregularVerb,
  targetForm: VerbFormKey,
  allVerbs: IrregularVerb[]
): string[] {
  const correctDisplay = getDisplayForm(verb, targetForm);
  const candidates = new Set<string>();

  const addIfDifferent = (val: string) => {
    if (!val) return;
    if (normalizeVerbInput(val) === normalizeVerbInput(correctDisplay)) return;
    const accepted = getAcceptedAnswers(verb, targetForm);
    if (accepted.includes(normalizeVerbInput(val))) return;
    candidates.add(val);
  };

  // Add other forms of the SAME verb first (classic learner confusion!)
  const allFormKeys: VerbFormKey[] = ['v1', 'v2', 'v3', 'thirdPerson', 'ingForm'];
  for (const key of allFormKeys) {
    if (key !== targetForm) {
      addIfDifferent(getDisplayForm(verb, key));
    }
  }

  // Common regular-trap distractors (e.g. "goed", "buyed", "writed")
  if (targetForm === 'v2' || targetForm === 'v3') {
    const base = verb.v1;
    if (base.endsWith('e')) {
      addIfDifferent(`${base}d`);
    } else {
      addIfDifferent(`${base}ed`);
    }
  } else if (targetForm === 'ingForm') {
    addIfDifferent(`${verb.v1}ing`);
    if (verb.v1.endsWith('e')) {
      addIfDifferent(`${verb.v1.slice(0, -1)}eing`);
    }
  } else if (targetForm === 'thirdPerson') {
    addIfDifferent(`${verb.v1}s`);
    addIfDifferent(`${verb.v1}es`);
  }

  // Add forms from other verbs in the same pattern or dataset
  const similarVerbs = allVerbs.filter((v) => v.id !== verb.id);
  for (let i = 0; i < similarVerbs.length && candidates.size < 8; i += 1) {
    const idx = (verb.id.charCodeAt(0) * 7 + i * 13) % similarVerbs.length;
    addIfDifferent(getDisplayForm(similarVerbs[idx], targetForm));
  }

  const distractors = Array.from(candidates).slice(0, 3);
  const result = [correctDisplay, ...distractors];

  // Deterministic-feeling shuffle using random
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
