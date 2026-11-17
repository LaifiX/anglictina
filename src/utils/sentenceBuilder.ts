import type { SentencePolarity, TenseGuide } from '../types/english';

export type BuilderSubject = 'I' | 'you' | 'he' | 'she' | 'we' | 'they';
export type BuilderWhWord = '' | 'Why' | 'Where' | 'When';

export interface SentenceToken {
  text: string;
  role: 'wh' | 'aux' | 'neg' | 'subject' | 'verb' | 'rest' | 'punct';
  labelSk?: string;
}

export interface BuilderVerbPreset {
  id: string;
  v1: string;
  v2: string;
  v3: string;
  thirdPerson: string;
  ingForm: string;
  complementEn: string;
  complementSk: string;
  supportsContinuous: boolean;
  skForms: {
    presentPos: Record<BuilderSubject, string>;
    presentNeg: Record<BuilderSubject, string>;
    pastPos: Record<BuilderSubject, string>;
    pastNeg: Record<BuilderSubject, string>;
    pastContPos: Record<BuilderSubject, string>;
    pastContNeg: Record<BuilderSubject, string>;
    futurePos: Record<BuilderSubject, string>;
    futureNeg: Record<BuilderSubject, string>;
    infinitiveSk: string;
  };
}

export const BUILDER_SUBJECTS: { id: BuilderSubject; labelSk: string }[] = [
  { id: 'I', labelSk: 'I (ja)' },
  { id: 'you', labelSk: 'you (ty)' },
  { id: 'he', labelSk: 'he (on)' },
  { id: 'she', labelSk: 'she (ona)' },
  { id: 'we', labelSk: 'we (my)' },
  { id: 'they', labelSk: 'they (oni)' },
];

export const BUILDER_WH_WORDS: { id: BuilderWhWord; labelSk: string }[] = [
  { id: '', labelSk: 'Zisťovacia (Áno/Nie)' },
  { id: 'Why', labelSk: 'Why (Prečo)' },
  { id: 'Where', labelSk: 'Where (Kde / Kam)' },
  { id: 'When', labelSk: 'When (Kedy)' },
];

const WH_SK: Record<Exclude<BuilderWhWord, ''>, string> = {
  Why: 'Prečo',
  Where: 'Kde',
  When: 'Kedy',
};

export const BUILDER_VERBS: BuilderVerbPreset[] = [
  {
    id: 'go',
    v1: 'go',
    v2: 'went',
    v3: 'gone',
    thirdPerson: 'goes',
    ingForm: 'going',
    complementEn: 'to work',
    complementSk: 'do práce',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'idem', you: 'ideš', he: 'ide', she: 'ide', we: 'ideme', they: 'idú' },
      presentNeg: { I: 'nejdem', you: 'nejdeš', he: 'nejde', she: 'nejde', we: 'nejdeme', they: 'nejdú' },
      pastPos: { I: 'išiel som', you: 'išiel si', he: 'išiel', she: 'išla', we: 'išli sme', they: 'išli' },
      pastNeg: { I: 'nešiel som', you: 'nešiel si', he: 'nešiel', she: 'nešla', we: 'nešli sme', they: 'nešli' },
      pastContPos: { I: 'išiel som', you: 'išiel si', he: 'išiel', she: 'išla', we: 'išli sme', they: 'išli' },
      pastContNeg: { I: 'nešiel som', you: 'nešiel si', he: 'nešiel', she: 'nešla', we: 'nešli sme', they: 'nešli' },
      futurePos: { I: 'pôjdem', you: 'pôjdeš', he: 'pôjde', she: 'pôjde', we: 'pôjdeme', they: 'pôjdu' },
      futureNeg: { I: 'nepôjdem', you: 'nepôjdeš', he: 'nepôjde', she: 'nepôjde', we: 'nepôjdeme', they: 'nepôjdu' },
      infinitiveSk: 'ísť',
    },
  },
  {
    id: 'write',
    v1: 'write',
    v2: 'wrote',
    v3: 'written',
    thirdPerson: 'writes',
    ingForm: 'writing',
    complementEn: 'an email',
    complementSk: 'e-mail',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'píšem', you: 'píšeš', he: 'píše', she: 'píše', we: 'píšeme', they: 'píšu' },
      presentNeg: { I: 'nepíšem', you: 'nepíšeš', he: 'nepíše', she: 'nepíše', we: 'nepíšeme', they: 'nepíšu' },
      pastPos: { I: 'napísal som', you: 'napísal si', he: 'napísal', she: 'napísala', we: 'napísali sme', they: 'napísali' },
      pastNeg: { I: 'nenapísal som', you: 'nenapísal si', he: 'nenapísal', she: 'nenapísala', we: 'nenapísali sme', they: 'nenapísali' },
      pastContPos: { I: 'písal som', you: 'písal si', he: 'písal', she: 'písala', we: 'písali sme', they: 'písali' },
      pastContNeg: { I: 'nepísal som', you: 'nepísal si', he: 'nepísal', she: 'nepísala', we: 'nepísali sme', they: 'nepísali' },
      futurePos: { I: 'napíšem', you: 'napíšeš', he: 'napíše', she: 'napíše', we: 'napíšeme', they: 'napíšu' },
      futureNeg: { I: 'nenapíšem', you: 'nenapíšeš', he: 'nenapíše', she: 'nenapíše', we: 'nenapíšeme', they: 'nenapíšu' },
      infinitiveSk: 'napísať',
    },
  },
  {
    id: 'buy',
    v1: 'buy',
    v2: 'bought',
    v3: 'bought',
    thirdPerson: 'buys',
    ingForm: 'buying',
    complementEn: 'the tickets',
    complementSk: 'lístky',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'kupujem', you: 'kupuješ', he: 'kupuje', she: 'kupuje', we: 'kupujeme', they: 'kupujú' },
      presentNeg: { I: 'nekupujem', you: 'nekupuješ', he: 'nekupuje', she: 'nekupuje', we: 'nekupujeme', they: 'nekupujú' },
      pastPos: { I: 'kúpil som', you: 'kúpil si', he: 'kúpil', she: 'kúpila', we: 'kúpili sme', they: 'kúpili' },
      pastNeg: { I: 'nekúpil som', you: 'nekúpil si', he: 'nekúpil', she: 'nekúpila', we: 'nekúpili sme', they: 'nekúpili' },
      pastContPos: { I: 'kupoval som', you: 'kupoval si', he: 'kupoval', she: 'kupovala', we: 'kupovali sme', they: 'kupovali' },
      pastContNeg: { I: 'nekupoval som', you: 'nekupoval si', he: 'nekupoval', she: 'nekupovala', we: 'nekupovali sme', they: 'nekupovali' },
      futurePos: { I: 'kúpim', you: 'kúpiš', he: 'kúpi', she: 'kúpi', we: 'kúpime', they: 'kúpia' },
      futureNeg: { I: 'nekúpim', you: 'nekúpiš', he: 'nekúpi', she: 'nekúpi', we: 'nekúpime', they: 'nekúpia' },
      infinitiveSk: 'kúpiť',
    },
  },
  {
    id: 'eat',
    v1: 'eat',
    v2: 'ate',
    v3: 'eaten',
    thirdPerson: 'eats',
    ingForm: 'eating',
    complementEn: 'dinner',
    complementSk: 'večeru',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'jem', you: 'ješ', he: 'je', she: 'je', we: 'jeme', they: 'jedia' },
      presentNeg: { I: 'nejem', you: 'neješ', he: 'neje', she: 'neje', we: 'nejeme', they: 'nejedia' },
      pastPos: { I: 'zjedol som', you: 'zjedol si', he: 'zjedol', she: 'zjedla', we: 'zjedli sme', they: 'zjedli' },
      pastNeg: { I: 'nezjedol som', you: 'nezjedol si', he: 'nezjedol', she: 'nezjedla', we: 'nezjedli sme', they: 'nezjedli' },
      pastContPos: { I: 'jedol som', you: 'jedol si', he: 'jedol', she: 'jedla', we: 'jedli sme', they: 'jedli' },
      pastContNeg: { I: 'nejedol som', you: 'nejedol si', he: 'nejedol', she: 'nejedla', we: 'nejedli sme', they: 'nejedli' },
      futurePos: { I: 'zjem', you: 'zješ', he: 'zje', she: 'zje', we: 'zjeme', they: 'zjedia' },
      futureNeg: { I: 'nezjem', you: 'nezješ', he: 'nezje', she: 'nezje', we: 'nezjeme', they: 'nezjedia' },
      infinitiveSk: 'zjesť',
    },
  },
  {
    id: 'speak',
    v1: 'speak',
    v2: 'spoke',
    v3: 'spoken',
    thirdPerson: 'speaks',
    ingForm: 'speaking',
    complementEn: 'English',
    complementSk: 'po anglicky',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'hovorím', you: 'hovoríš', he: 'hovorí', she: 'hovorí', we: 'hovoríme', they: 'hovoria' },
      presentNeg: { I: 'nehovorím', you: 'nehovoríš', he: 'nehovorí', she: 'nehovorí', we: 'nehovoríme', they: 'nehovoria' },
      pastPos: { I: 'hovoril som', you: 'hovoril si', he: 'hovoril', she: 'hovorila', we: 'hovorili sme', they: 'hovorili' },
      pastNeg: { I: 'nehovoril som', you: 'nehovoril si', he: 'nehovoril', she: 'nehovorila', we: 'nehovorili sme', they: 'nehovorili' },
      pastContPos: { I: 'hovoril som', you: 'hovoril si', he: 'hovoril', she: 'hovorila', we: 'hovorili sme', they: 'hovorili' },
      pastContNeg: { I: 'nehovoril som', you: 'nehovoril si', he: 'nehovoril', she: 'nehovorila', we: 'nehovorili sme', they: 'nehovorili' },
      futurePos: { I: 'budem hovoriť', you: 'budeš hovoriť', he: 'bude hovoriť', she: 'bude hovoriť', we: 'budeme hovoriť', they: 'budú hovoriť' },
      futureNeg: { I: 'nebudem hovoriť', you: 'nebudeš hovoriť', he: 'nebude hovoriť', she: 'nebude hovoriť', we: 'nebudeme hovoriť', they: 'nebudú hovoriť' },
      infinitiveSk: 'hovoriť',
    },
  },
  {
    id: 'read',
    v1: 'read',
    v2: 'read',
    v3: 'read',
    thirdPerson: 'reads',
    ingForm: 'reading',
    complementEn: 'that book',
    complementSk: 'tú knihu',
    supportsContinuous: true,
    skForms: {
      presentPos: { I: 'čítam', you: 'čítaš', he: 'číta', she: 'číta', we: 'čítame', they: 'čítajú' },
      presentNeg: { I: 'nečítam', you: 'nečítaš', he: 'nečíta', she: 'nečíta', we: 'nečítame', they: 'nečítajú' },
      pastPos: { I: 'prečítal som', you: 'prečítal si', he: 'prečítal', she: 'prečítala', we: 'prečítali sme', they: 'prečítali' },
      pastNeg: { I: 'neprečítal som', you: 'neprečítal si', he: 'neprečítal', she: 'neprečítala', we: 'neprečítali sme', they: 'neprečítali' },
      pastContPos: { I: 'čítal som', you: 'čítal si', he: 'čítal', she: 'čítala', we: 'čítali sme', they: 'čítali' },
      pastContNeg: { I: 'nečítal som', you: 'nečítal si', he: 'nečítal', she: 'nečítala', we: 'nečítali sme', they: 'nečítali' },
      futurePos: { I: 'prečítam', you: 'prečítaš', he: 'prečíta', she: 'prečíta', we: 'prečítame', they: 'prečítajú' },
      futureNeg: { I: 'neprečítam', you: 'neprečítaš', he: 'neprečíta', she: 'neprečíta', we: 'neprečítame', they: 'neprečítajú' },
      infinitiveSk: 'čítať',
    },
  },
  {
    id: 'be',
    v1: 'be',
    v2: 'was / were',
    v3: 'been',
    thirdPerson: 'is',
    ingForm: 'being',
    complementEn: 'at home',
    complementSk: 'doma',
    supportsContinuous: false,
    skForms: {
      presentPos: { I: 'som', you: 'si', he: 'je', she: 'je', we: 'sme', they: 'sú' },
      presentNeg: { I: 'nie som', you: 'nie si', he: 'nie je', she: 'nie je', we: 'nie sme', they: 'nie sú' },
      pastPos: { I: 'bol som', you: 'bol si', he: 'bol', she: 'bola', we: 'boli sme', they: 'boli' },
      pastNeg: { I: 'nebol som', you: 'nebol si', he: 'nebol', she: 'nebola', we: 'neboli sme', they: 'neboli' },
      pastContPos: { I: 'bol som', you: 'bol si', he: 'bol', she: 'bola', we: 'boli sme', they: 'boli' },
      pastContNeg: { I: 'nebol som', you: 'nebol si', he: 'nebol', she: 'nebola', we: 'neboli sme', they: 'neboli' },
      futurePos: { I: 'budem', you: 'budeš', he: 'bude', she: 'bude', we: 'budeme', they: 'budú' },
      futureNeg: { I: 'nebudem', you: 'nebudeš', he: 'nebude', she: 'nebude', we: 'nebudeme', they: 'nebudú' },
      infinitiveSk: 'byť',
    },
  },
];

const GOING_TO_AUX_SK: Record<BuilderSubject, { pos: string; neg: string }> = {
  I: { pos: 'chystám sa', neg: 'nechystám sa' },
  you: { pos: 'chystáš sa', neg: 'nechystáš sa' },
  he: { pos: 'chystá sa', neg: 'nechystá sa' },
  she: { pos: 'chystá sa', neg: 'nechystá sa' },
  we: { pos: 'chystáme sa', neg: 'nechystáme sa' },
  they: { pos: 'chystajú sa', neg: 'nechystajú sa' },
};

function capFirst(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function subjDisplay(subject: BuilderSubject, isSentenceStart: boolean): string {
  if (subject === 'I') return 'I';
  return isSentenceStart ? capFirst(subject) : subject;
}

export interface BuiltSentenceResult {
  tokens: SentenceToken[];
  english: string;
  formalEnglish?: string;
  slovak: string;
  explanationSk: string;
  noteSk?: string;
}

export function buildInteractiveSentence(params: {
  tenseId: TenseGuide['id'];
  subject: BuilderSubject;
  verb: BuilderVerbPreset;
  polarity: SentencePolarity;
  whWord?: BuilderWhWord;
}): BuiltSentenceResult {
  const { tenseId, subject, verb, polarity, whWord = '' } = params;
  const isQuestion = polarity === 'qPos' || polarity === 'qNeg';
  const isNegative = polarity === 'neg' || polarity === 'qNeg';
  const effectiveWh = isQuestion ? whWord : '';

  const isThirdSg = subject === 'he' || subject === 'she';
  const tokens: SentenceToken[] = [];
  let formalEnglish: string | undefined;
  let explanationSk = '';
  let noteSk: string | undefined;

  // Handle "be" in continuous tenses gracefully (English avoids "am being at home")
  const effectiveTense: TenseGuide['id'] =
    verb.id === 'be' && (tenseId === 'present-continuous' || tenseId === 'past-continuous')
      ? tenseId === 'present-continuous'
        ? 'present-simple'
        : 'past-simple'
      : tenseId;

  if (verb.id === 'be' && effectiveTense !== tenseId) {
    noteSk =
      'Sloveso „to be“ vo význame miesta alebo stavu („byť doma“) v angličtine netvorí priebehový čas (-ing), preto tu ukazujeme jednoduchý tvar.';
  }

  const pushWh = () => {
    if (effectiveWh) {
      tokens.push({ text: effectiveWh, role: 'wh', labelSk: 'Opytovacie slovo' });
    }
  };

  const pushPunct = () => {
    tokens.push({ text: isQuestion ? '?' : '.', role: 'punct' });
  };

  // --- SPECIAL CASE: "to be" in Present Simple & Past Simple ---
  if (verb.id === 'be' && (effectiveTense === 'present-simple' || effectiveTense === 'past-simple')) {
    const isPast = effectiveTense === 'past-simple';
    const beForm = isPast
      ? subject === 'I' || isThirdSg
        ? 'was'
        : 'were'
      : subject === 'I'
        ? 'am'
        : isThirdSg
          ? 'is'
          : 'are';
    const beNegShort = isPast
      ? beForm === 'was'
        ? "wasn't"
        : "weren't"
      : subject === 'I'
        ? "aren't" // used for Aren't I?
        : beForm === 'is'
          ? "isn't"
          : "aren't";

    if (polarity === 'aff') {
      tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
      tokens.push({ text: beForm, role: 'verb', labelSk: isPast ? 'Minulý tvar V2 (be)' : 'Prítomný tvar (be)' });
      tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Doplnok' });
      explanationSk = isPast
        ? `Sloveso „be“ v minulosti nepoužíva „did“ — pre „${subject}“ použijeme priamo tvar „${beForm}“.`
        : `Sloveso „be“ má vlastný prítomný tvar „${beForm}“ pre „${subject}“.`;
    } else if (polarity === 'neg') {
      tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
      if (!isPast && subject === 'I') {
        tokens.push({ text: 'am', role: 'verb', labelSk: 'Sloveso be' });
        tokens.push({ text: 'not', role: 'neg', labelSk: 'Zápor' });
      } else {
        tokens.push({ text: beNegShort, role: 'neg', labelSk: 'Záporný tvar be' });
      }
      tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Doplnok' });
      explanationSk = `Pri slovese „be“ pridávame zápor „not“ priamo k nemu — nikdy nepoužívame don’t/doesn’t/didn’t!`;
    } else if (polarity === 'qPos') {
      pushWh();
      tokens.push({
        text: effectiveWh ? beForm : capFirst(beForm),
        role: 'verb',
        labelSk: 'Sloveso be (inverzia)',
      });
      tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
      tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Doplnok' });
      explanationSk = `V otázke so slovesom „be“ ho len prehodíme pred podmet „${subject}“ (žiadne do/did!).`;
    } else {
      pushWh();
      tokens.push({
        text: effectiveWh ? beNegShort : capFirst(beNegShort),
        role: 'neg',
        labelSk: 'Záporné be (inverzia)',
      });
      tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
      tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Doplnok' });
      const formalLead = effectiveWh ? `${effectiveWh} ${beForm}` : capFirst(beForm);
      formalEnglish = `${formalLead} ${subjDisplay(subject, false)} not ${verb.complementEn}?`;
      explanationSk =
        !isPast && subject === 'I'
          ? 'Špeciálne pravidlo: v zápornej otázke pre „I“ nehovoríme „amn’t I“, ale „Aren’t I...?“ (formálne: „Am I not...?“).'
          : `V zápornej otázke presunieme „${beNegShort}“ pred podmet „${subject}“.`;
    }
    pushPunct();
  } else {
    // --- STANDARD VERBS ACROSS ALL 7 TENSES ---
    switch (effectiveTense) {
      case 'present-simple': {
        const auxPos = isThirdSg ? 'does' : 'do';
        const auxNeg = isThirdSg ? "doesn't" : "don't";
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({
            text: isThirdSg ? verb.thirdPerson : verb.v1,
            role: 'verb',
            labelSk: isThirdSg ? 'V1 + koncovka -s/-es' : '1. tvar (V1)',
          });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = isThirdSg
            ? `V prítomnom jednoduchom čase pridáme pre „${subject}“ (3. os. j.č.) k 1. tvaru koncovku → „${verb.thirdPerson}“.`
            : `V prítomnom jednoduchom čase použijeme pre „${subject}“ čistý 1. tvar (V1) „${verb.v1}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: auxNeg, role: 'neg', labelSk: 'Pomocné + zápor' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V zápore použijeme pomocné „${auxNeg}“ a hlavné sloveso ostane v čistom 1. tvare „${verb.v1}“${isThirdSg ? ' (už bez -s!)' : ''}.`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({
            text: effectiveWh ? auxPos : capFirst(auxPos),
            role: 'aux',
            labelSk: 'Pomocné sloveso',
          });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V prítomnej otázke dáme pred podmet „${auxPos}“ a hlavné sloveso je v 1. tvare „${verb.v1}“.`;
        } else {
          pushWh();
          tokens.push({
            text: effectiveWh ? auxNeg : capFirst(auxNeg),
            role: 'neg',
            labelSk: 'Pomocné so záporom',
          });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} ${auxPos}` : capFirst(auxPos);
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.v1} ${verb.complementEn}?`;
          explanationSk = `V zápornej prítomnej otázke dáme „${auxNeg}“ pred podmet „${subject}“ a sloveso ostáva v V1 („${verb.v1}“).`;
        }
        break;
      }

      case 'present-continuous': {
        const aux = subject === 'I' ? 'am' : isThirdSg ? 'is' : 'are';
        const auxNeg = subject === 'I' ? "aren't" : isThirdSg ? "isn't" : "aren't";
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: aux, role: 'aux', labelSk: 'Pomocné be' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Práve teraz prebiehajúci dej tvoríme pomocou „${aux}“ + „${verb.ingForm}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          if (subject === 'I') {
            tokens.push({ text: 'am', role: 'aux', labelSk: 'Pomocné be' });
            tokens.push({ text: 'not', role: 'neg', labelSk: 'Zápor' });
          } else {
            tokens.push({ text: auxNeg, role: 'neg', labelSk: 'Záporné be' });
          }
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Zápor priebehového času tvoríme pridaním „not“ k pomocnému be + „${verb.ingForm}“.`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? aux : capFirst(aux), role: 'aux', labelSk: 'Pomocné be' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V otázke prehodíme „${aux}“ pred podmet „${subject}“ a sloveso ostáva v tvare „${verb.ingForm}“.`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? auxNeg : capFirst(auxNeg), role: 'neg', labelSk: 'Záporné be' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} ${aux}` : capFirst(aux);
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.ingForm} ${verb.complementEn}?`;
          explanationSk =
            subject === 'I'
              ? `V zápornej otázke pre „I“ používame „Aren’t I ${verb.ingForm}...?“ (formálne: „Am I not...?“).`
              : `V zápornej otázke prehodíme „${auxNeg}“ pred podmet „${subject}“ + „${verb.ingForm}“.`;
        }
        break;
      }

      case 'past-simple': {
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v2, role: 'verb', labelSk: '2. tvar (V2)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V kladnej oznamovacej vete v minulosti použijeme 2. tvar nepravidelného slovesa: „${verb.v2}“ (rovnaký pre všetky osoby!).`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: "didn't", role: 'neg', labelSk: 'Minulé pomocné + zápor' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: 'Návrat na 1. tvar (V1)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Pozor! Po „didn’t“ sa 2. tvar „${verb.v2}“ vracia späť do základného 1. tvaru „${verb.v1}“!`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? 'did' : 'Did', role: 'aux', labelSk: 'Minulé pomocné' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: 'Návrat na 1. tvar (V1)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V minulej otázke stojí na začiatku „Did“, ktoré už nesie minulosť — sloveso je preto v 1. tvare „${verb.v1}“ (nie „${verb.v2}“!).`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? "didn't" : "Didn't", role: 'neg', labelSk: 'Záporné minulé pomocné' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: 'Návrat na 1. tvar (V1)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} did` : 'Did';
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.v1} ${verb.complementEn}?`;
          explanationSk = `V zápornej minulej otázke dáme „Didn’t“ pred podmet „${subject}“ a hlavné sloveso je vždy v 1. tvare „${verb.v1}“!`;
        }
        break;
      }

      case 'past-continuous': {
        const aux = subject === 'I' || isThirdSg ? 'was' : 'were';
        const auxNeg = aux === 'was' ? "wasn't" : "weren't";
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: aux, role: 'aux', labelSk: 'Minulý tvar be' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Rozpracovaný minulý dej pre „${subject}“ tvoríme pomocou „${aux}“ + „${verb.ingForm}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: auxNeg, role: 'neg', labelSk: 'Záporné was/were' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V zápore pripojíme not k ${aux} → „${auxNeg}“ + „${verb.ingForm}“.`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? aux : capFirst(aux), role: 'aux', labelSk: 'Minulý tvar be' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Otázku tvoríme prehodením „${aux}“ pred podmet „${subject}“ + „${verb.ingForm}“.`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? auxNeg : capFirst(auxNeg), role: 'neg', labelSk: 'Záporné was/were' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.ingForm, role: 'verb', labelSk: 'Tvar s -ing' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} ${aux}` : capFirst(aux);
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.ingForm} ${verb.complementEn}?`;
          explanationSk = `V zápornej otázke presunieme „${auxNeg}“ pred podmet „${subject}“ + „${verb.ingForm}“.`;
        }
        break;
      }

      case 'present-perfect': {
        const aux = isThirdSg ? 'has' : 'have';
        const auxNeg = isThirdSg ? "hasn't" : "haven't";
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: aux, role: 'aux', labelSk: 'Pomocné have/has' });
          tokens.push({ text: verb.v3, role: 'verb', labelSk: '3. tvar (V3)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V predprítomnom čase použijeme pomocné „${aux}“ a k nemu VŽDY 3. tvar nepravidelného slovesa: „${verb.v3}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: auxNeg, role: 'neg', labelSk: 'Záporné have/has' });
          tokens.push({ text: verb.v3, role: 'verb', labelSk: '3. tvar (V3)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Po „${auxNeg}“ zostáva 3. tvar „${verb.v3}“ (nikdy nepoužívame didn’t ani V2!).`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? aux : capFirst(aux), role: 'aux', labelSk: 'Pomocné have/has' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v3, role: 'verb', labelSk: '3. tvar (V3)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Prehodíme „${aux}“ pred podmet „${subject}“ a pridáme 3. tvar „${verb.v3}“.`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? auxNeg : capFirst(auxNeg), role: 'neg', labelSk: 'Záporné have/has' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v3, role: 'verb', labelSk: '3. tvar (V3)!' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} ${aux}` : capFirst(aux);
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.v3} ${verb.complementEn}?`;
          explanationSk = `Záporná predprítomná otázka začína na „${auxNeg}“ + podmet + 3. tvar „${verb.v3}“.`;
        }
        break;
      }

      case 'future-will': {
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: 'will', role: 'aux', labelSk: 'Budúce pomocné' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Budúci čas tvoríme pomocou „will“ (rovnaké pre všetky osoby) + základný 1. tvar „${verb.v1}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: "won't", role: 'neg', labelSk: 'will + not' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Zápor od „will“ je „won’t“ [wount] + 1. tvar „${verb.v1}“.`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? 'will' : 'Will', role: 'aux', labelSk: 'Budúce pomocné' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V budúcej otázke presunieme „Will“ pred podmet „${subject}“ a pridáme 1. tvar „${verb.v1}“.`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? "won't" : "Won't", role: 'neg', labelSk: 'Záporné will' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} will` : 'Will';
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not ${verb.v1} ${verb.complementEn}?`;
          explanationSk = `V zápornej budúcej otázke dáme „Won’t“ pred podmet „${subject}“ + 1. tvar „${verb.v1}“.`;
        }
        break;
      }

      case 'future-going-to': {
        const aux = subject === 'I' ? 'am' : isThirdSg ? 'is' : 'are';
        const auxNeg = subject === 'I' ? "aren't" : isThirdSg ? "isn't" : "aren't";
        if (polarity === 'aff') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: aux, role: 'aux', labelSk: 'Pomocné be' });
          tokens.push({ text: 'going to', role: 'aux', labelSk: 'Plán (going to)' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Plánovanú budúcnosť tvoríme pomocou „${aux} going to“ + 1. tvar „${verb.v1}“.`;
        } else if (polarity === 'neg') {
          tokens.push({ text: subjDisplay(subject, true), role: 'subject', labelSk: 'Podmet' });
          if (subject === 'I') {
            tokens.push({ text: 'am', role: 'aux', labelSk: 'Pomocné be' });
            tokens.push({ text: 'not', role: 'neg', labelSk: 'Zápor' });
          } else {
            tokens.push({ text: auxNeg, role: 'neg', labelSk: 'Záporné be' });
          }
          tokens.push({ text: 'going to', role: 'aux', labelSk: 'Plán (going to)' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `Zápor tvoríme na pomocnom be (${subject === 'I' ? 'am not' : auxNeg}) + „going to ${verb.v1}“.`;
        } else if (polarity === 'qPos') {
          pushWh();
          tokens.push({ text: effectiveWh ? aux : capFirst(aux), role: 'aux', labelSk: 'Pomocné be' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: 'going to', role: 'aux', labelSk: 'Plán (going to)' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          explanationSk = `V otázke s „going to“ presunieme „${aux}“ pred podmet „${subject}“.`;
        } else {
          pushWh();
          tokens.push({ text: effectiveWh ? auxNeg : capFirst(auxNeg), role: 'neg', labelSk: 'Záporné be' });
          tokens.push({ text: subjDisplay(subject, false), role: 'subject', labelSk: 'Podmet' });
          tokens.push({ text: 'going to', role: 'aux', labelSk: 'Plán (going to)' });
          tokens.push({ text: verb.v1, role: 'verb', labelSk: '1. tvar (V1)' });
          tokens.push({ text: verb.complementEn, role: 'rest', labelSk: 'Predmet / doplnok' });
          const fLead = effectiveWh ? `${effectiveWh} ${aux}` : capFirst(aux);
          formalEnglish = `${fLead} ${subjDisplay(subject, false)} not going to ${verb.v1} ${verb.complementEn}?`;
          explanationSk = `Zápornú otázku tvoríme pomocou „${auxNeg}“ pred podmetom + „going to ${verb.v1}“.`;
        }
        break;
      }
    }

    pushPunct();
  }

  // Build full English string cleanly (attach final punctuation without space)
  const english = tokens
    .map((t, idx) => (idx > 0 && t.role !== 'punct' ? ` ${t.text}` : t.text))
    .join('');

  // Build natural Slovak translation
  let skCore = '';
  if (effectiveTense === 'present-simple' || effectiveTense === 'present-continuous') {
    const baseVerbSk = isNegative ? verb.skForms.presentNeg[subject] : verb.skForms.presentPos[subject];
    skCore = `${baseVerbSk} ${verb.complementSk}`;
    if (effectiveTense === 'present-continuous') {
      skCore += ' (práve teraz)';
    }
  } else if (effectiveTense === 'past-simple' || effectiveTense === 'present-perfect') {
    const baseVerbSk = isNegative ? verb.skForms.pastNeg[subject] : verb.skForms.pastPos[subject];
    skCore = `${baseVerbSk} ${verb.complementSk}`;
    if (effectiveTense === 'present-perfect') {
      skCore += isNegative ? ' (zatiaľ)' : ' (už / skúsenosť)';
    }
  } else if (effectiveTense === 'past-continuous') {
    const baseVerbSk = isNegative ? verb.skForms.pastContNeg[subject] : verb.skForms.pastContPos[subject];
    skCore = `${baseVerbSk} ${verb.complementSk} (práve vtedy)`;
  } else if (effectiveTense === 'future-will') {
    const baseVerbSk = isNegative ? verb.skForms.futureNeg[subject] : verb.skForms.futurePos[subject];
    skCore = `${baseVerbSk} ${verb.complementSk}`;
  } else {
    // future-going-to
    const auxSk = isNegative ? GOING_TO_AUX_SK[subject].neg : GOING_TO_AUX_SK[subject].pos;
    skCore = `${auxSk} ${verb.skForms.infinitiveSk} ${verb.complementSk}`;
  }

  let slovak = '';
  if (isQuestion) {
    if (effectiveWh) {
      slovak = `${WH_SK[effectiveWh]} ${skCore}?`;
    } else {
      slovak = `${capFirst(skCore)}?`;
    }
  } else {
    slovak = `${capFirst(skCore)}.`;
  }

  return {
    tokens,
    english,
    formalEnglish,
    slovak,
    explanationSk,
    noteSk,
  };
}
