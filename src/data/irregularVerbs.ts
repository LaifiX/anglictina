import type { IrregularVerb, VerbLevel, VerbPattern } from '../types/english';
import { IRREGULAR_VERBS_PART_1 } from './irregularVerbsPart1';
import { IRREGULAR_VERBS_PART_2 } from './irregularVerbsPart2';

export const IRREGULAR_VERBS: IrregularVerb[] = [
  ...IRREGULAR_VERBS_PART_1,
  ...IRREGULAR_VERBS_PART_2,
];

export const PATTERN_INFO: Record<
  VerbPattern,
  { label: string; short: string; descriptionSk: string }
> = {
  AAA: {
    label: 'A – A – A (Všetky rovnaké)',
    short: 'A-A-A',
    descriptionSk:
      'Všetky tri tvary sa píšu rovnako (napr. cut – cut – cut, put – put – put). Pozor len na kontext vety a -s v 3. osobe prítomného času!',
  },
  ABB: {
    label: 'A – B – B (2. a 3. tvar zhodné)',
    short: 'A-B-B',
    descriptionSk:
      'Najpočetnejšia skupina: stačí sa naučiť jeden zmenený tvar a použijete ho pre minulosť (V2) aj po have/has (V3), napr. make – made – made.',
  },
  ABA: {
    label: 'A – B – A (1. a 3. tvar zhodné)',
    short: 'A-B-A',
    descriptionSk:
      'Mení sa len stredný minulý tvar, 3. tvar sa vracia späť k základnému (come – came – come, run – ran – run).',
  },
  ABC: {
    label: 'A – B – C (Tri rôzne tvary)',
    short: 'A-B-C',
    descriptionSk:
      'Každý tvar má vlastnú podobu (go – went – gone, write – wrote – written). Často končia v 3. tvare na -n alebo -en.',
  },
  IAU: {
    label: 'Vzor i – a – u',
    short: 'i–a–u',
    descriptionSk:
      'Rytmická skupina, kde sa mení iba samohláska i → a → u (sing – sang – sung, drink – drank – drunk, swim – swam – swum).',
  },
  OUGHT: {
    label: 'Skupina -ought / -aught',
    short: '-ought/-aught',
    descriptionSk:
      '2. a 3. tvar končia na [-ót] (think – thought – thought, catch – caught – caught). Ak je v V1 písmeno a, píšeme -aught.',
  },
  SPECIAL: {
    label: 'Špeciálne výnimky',
    short: 'Špeciálne',
    descriptionSk:
      'Slovesá so špecifickým správaním: „be“ (am/is/are, was/were, been) a „read“ (píše sa rovnako, ale V2/V3 sa čítajú [red]!).',
  },
};

export const LEVEL_INFO: Record<VerbLevel, { label: string; badgeSk: string }> = {
  A1: { label: 'A1 · Základy', badgeSk: 'Začiatočník A1' },
  A2: { label: 'A2 · Mierne pokročilý', badgeSk: 'Mierne pokročilý A2' },
  B1: { label: 'B1 · Stredne pokročilý', badgeSk: 'Stredne pokročilý B1' },
  B2: { label: 'B2 · Vyššia úroveň', badgeSk: 'Pokročilý B2' },
};
