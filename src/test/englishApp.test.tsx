import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import {
  GRAMMAR_QUIZ,
  TENSE_COMBO_PRESETS,
  TENSE_GUIDES,
  TENSE_ORDER,
} from '../data/grammarData';
import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { ALL_TENSE_EXERCISES, EXERCISES_BY_TENSE } from '../data/tenses';
import {
  DEEP_THEORY_BY_TENSE,
  SLOVAK_TRAPS,
  TENSE_DECISION_NODES,
} from '../data/theoryAcademy';
import { BUILDER_VERBS, buildInteractiveSentence } from '../utils/sentenceBuilder';
import {
  buildChoiceOptions,
  fillSentenceBlank,
  getTenseMastery,
  isTenseAnswerCorrect,
  selectTenseRound,
} from '../utils/tenseCheck';
import {
  generateVerbFormChoices,
  isVerbFormAnswerCorrect,
  normalizeVerbInput,
} from '../utils/verbCheck';

describe('Irregular Verbs Dataset Integrity', () => {
  it('contains 100 unique irregular verbs with complete Slovak explanations and all forms', () => {
    expect(IRREGULAR_VERBS.length).toBe(100);
    const ids = new Set<string>();
    for (const verb of IRREGULAR_VERBS) {
      expect(ids.has(verb.id)).toBe(false);
      ids.add(verb.id);

      expect(verb.v1.trim().length).toBeGreaterThan(0);
      expect(verb.v2.trim().length).toBeGreaterThan(0);
      expect(verb.v3.trim().length).toBeGreaterThan(0);
      expect(verb.thirdPerson.trim().length).toBeGreaterThan(0);
      expect(verb.ingForm.trim().length).toBeGreaterThan(0);
      expect(verb.translationSk.trim().length).toBeGreaterThan(0);
      expect(verb.slovakExplanation.summary.trim().length).toBeGreaterThan(15);
      expect(verb.slovakExplanation.tipSk.trim().length).toBeGreaterThan(10);
      expect(verb.examples.v1.en.length).toBeGreaterThan(5);
      expect(verb.examples.v2.en.length).toBeGreaterThan(5);
      expect(verb.examples.v3.en.length).toBeGreaterThan(5);
      expect(verb.examples.questionNeg.en.length).toBeGreaterThan(5);
      if (verb.sentenceGap) {
        expect(verb.sentenceGap.sentence).toContain('____');
      }
    }
  });

  it('includes 9 ordered tense guides, deep Slovak theory, decision compass, and combos', () => {
    expect(TENSE_GUIDES.length).toBe(9);
    expect(TENSE_GUIDES.map((g) => g.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(TENSE_GUIDES.map((g) => g.id)).toEqual(TENSE_ORDER);
    for (const guide of TENSE_GUIDES) {
      expect(guide.matrix).toHaveLength(4);
      expect(guide.matrix.map((m) => m.polarity)).toEqual(['aff', 'neg', 'qPos', 'qNeg']);
      expect(guide.formulaQuick.length).toBeGreaterThan(3);
      expect(guide.timelineCaptionSk.length).toBeGreaterThan(10);

      const deep = DEEP_THEORY_BY_TENSE[guide.id];
      expect(deep.mentalModelSk.length).toBeGreaterThan(30);
      expect(deep.nuancesSk.length).toBeGreaterThanOrEqual(3);
      expect(deep.slovakTranslationTraps.length).toBeGreaterThanOrEqual(3);
    }
    expect(TENSE_COMBO_PRESETS.length).toBeGreaterThanOrEqual(8);
    expect(SLOVAK_TRAPS.length).toBe(7);
    expect(TENSE_DECISION_NODES.length).toBe(9);
    expect(GRAMMAR_QUIZ.length).toBeGreaterThanOrEqual(16);
  });
});

describe('2250 Tense Exercises Bank Integrity', () => {
  it('contains exactly 250 valid unique exercises per tense (2250 total) with all 4 polarities', () => {
    expect(ALL_TENSE_EXERCISES.length).toBe(2250);

    const seenIds = new Set<string>();
    const seenSentences = new Set<string>();

    for (const tenseId of TENSE_ORDER) {
      const bank = EXERCISES_BY_TENSE[tenseId];
      expect(bank.length, `Expected 250 exercises for ${tenseId}`).toBe(250);

      const polarityCounts = { aff: 0, neg: 0, qPos: 0, qNeg: 0 };

      for (const ex of bank) {
        expect(ex.tenseId).toBe(tenseId);
        expect(seenIds.has(ex.id), `Duplicate ID: ${ex.id}`).toBe(false);
        seenIds.add(ex.id);

        const sentenceKey = `${ex.tenseId}||${ex.sentenceWithBlank.toLowerCase()}||${ex.verbCue.toLowerCase()}`;
        expect(
          seenSentences.has(sentenceKey),
          `Duplicate sentence: ${ex.id} -> ${ex.sentenceWithBlank}`
        ).toBe(false);
        seenSentences.add(sentenceKey);

        // Exactly one ____ blank
        const blankMatches = ex.sentenceWithBlank.match(/____/g) ?? [];
        expect(blankMatches.length, `Bad blank count in ${ex.id}`).toBe(1);

        // Clean fields, no draft notes
        expect(ex.verbCue.trim().length).toBeGreaterThan(0);
        expect(ex.answer.trim().length).toBeGreaterThan(0);
        expect(ex.translationSk.trim().length).toBeGreaterThan(5);
        expect(ex.explanationSk.trim().length).toBeGreaterThan(10);
        expect(ex.explanationSk).not.toMatch(/Opravíme|Upravíme|Počkaj —|zmeníme cue/i);
        expect(ex.sentenceWithBlank).not.toMatch(/wait:/i);

        // 4 unique options (answer + 3 distractors)
        const allOptions = [ex.answer, ...ex.distractors];
        expect(allOptions).toHaveLength(4);
        const normOptions = new Set(allOptions.map((o) => o.trim().toLowerCase()));
        expect(normOptions.size, `Duplicate options in ${ex.id}: ${allOptions.join(', ')}`).toBe(4);

        // Filled sentence has no leftover blank
        const filled = fillSentenceBlank(ex.sentenceWithBlank, ex.answer);
        expect(filled).not.toContain('____');

        // Choice builder returns all 4 options
        const shuffled = buildChoiceOptions(ex, 1);
        expect(shuffled).toHaveLength(4);
        expect(shuffled).toContain(ex.answer);

        polarityCounts[ex.polarity] += 1;
      }

      expect(polarityCounts.aff).toBeGreaterThanOrEqual(80);
      expect(polarityCounts.neg).toBeGreaterThanOrEqual(55);
      expect(polarityCounts.qPos).toBeGreaterThanOrEqual(55);
      expect(polarityCounts.qNeg).toBeGreaterThanOrEqual(35);
    }
  });
});

describe('Tense Answer Checker & Adaptive Selection', () => {
  it('accepts contractions, expanded forms, curly apostrophes, and formal negative questions', () => {
    const pastNeg = EXERCISES_BY_TENSE['past-simple'].find((e) => e.polarity === 'neg')!;
    expect(isTenseAnswerCorrect(pastNeg, pastNeg.answer)).toBe(true);
    expect(isTenseAnswerCorrect(pastNeg, pastNeg.answer.replace("didn't", 'did not'))).toBe(true);
    expect(isTenseAnswerCorrect(pastNeg, pastNeg.answer.replace("'", '’').toUpperCase())).toBe(true);

    const pastNegQ = EXERCISES_BY_TENSE['past-simple'].find((e) => e.answer === "Didn't you get")!;
    expect(isTenseAnswerCorrect(pastNegQ, "didn't you get")).toBe(true);
    expect(isTenseAnswerCorrect(pastNegQ, 'Did you not get')).toBe(true);
    expect(isTenseAnswerCorrect(pastNegQ, "Didn't you got")).toBe(false);

    const futNeg = EXERCISES_BY_TENSE['future-will'].find((e) => e.answer === "won't tell")!;
    expect(isTenseAnswerCorrect(futNeg, 'will not tell')).toBe(true);
    expect(isTenseAnswerCorrect(futNeg, "won't tell")).toBe(true);

    const ppAff = EXERCISES_BY_TENSE['present-perfect'].find((e) => e.answer === 'have lost')!;
    expect(isTenseAnswerCorrect(ppAff, "'ve lost")).toBe(true);
    expect(isTenseAnswerCorrect(ppAff, 'have lost')).toBe(true);
  });

  it('stratifies multi-tense selection across all 9 tenses and reports mastery out of 250', () => {
    const mix = selectTenseRound({
      pool: ALL_TENSE_EXERCISES,
      count: 27,
      progress: {},
      prioritizeSmart: true,
      selectedTenses: TENSE_ORDER,
    });
    expect(mix).toHaveLength(27);
    const countsByTense = new Map<string, number>();
    for (const ex of mix) {
      countsByTense.set(ex.tenseId, (countsByTense.get(ex.tenseId) ?? 0) + 1);
    }
    for (const tid of TENSE_ORDER) {
      expect(countsByTense.get(tid)).toBe(3);
    }

    const mastery = getTenseMastery('present-simple', ALL_TENSE_EXERCISES, {
      'ps-001': { attempts: 1, correct: 1, lastCorrect: true, lastPracticedAt: Date.now() },
      'ps-002': { attempts: 1, correct: 0, lastCorrect: false, lastPracticedAt: Date.now() },
    });
    expect(mastery.total).toBe(250);
    expect(mastery.mastered).toBe(1);
    expect(mastery.mistakes).toBe(1);
    expect(mastery.status).toBe('in-progress');
  });
});

describe('Verb Answer Validation Helpers', () => {
  it('normalizes whitespace, casing, and slash variants cleanly', () => {
    expect(normalizeVerbInput('  Was / Were  ')).toBe('was/were');

    const beVerb = IRREGULAR_VERBS.find((v) => v.id === 'be')!;
    expect(isVerbFormAnswerCorrect(beVerb, 'v2', 'was/were')).toBe(true);
    expect(isVerbFormAnswerCorrect(beVerb, 'v2', 'was / were')).toBe(true);
    expect(isVerbFormAnswerCorrect(beVerb, 'v2', 'was')).toBe(true);
    expect(isVerbFormAnswerCorrect(beVerb, 'v2', 'were')).toBe(true);
    expect(isVerbFormAnswerCorrect(beVerb, 'v2', 'beed')).toBe(false);

    const learnVerb = IRREGULAR_VERBS.find((v) => v.id === 'learn')!;
    expect(isVerbFormAnswerCorrect(learnVerb, 'v2', 'learnt')).toBe(true);
    expect(isVerbFormAnswerCorrect(learnVerb, 'v2', 'learned')).toBe(true);

    const goVerb = IRREGULAR_VERBS.find((v) => v.id === 'go')!;
    expect(isVerbFormAnswerCorrect(goVerb, 'thirdPerson', 'goes')).toBe(true);
    expect(isVerbFormAnswerCorrect(goVerb, 'ingForm', 'going')).toBe(true);

    const choices = generateVerbFormChoices(goVerb, 'v2', IRREGULAR_VERBS);
    expect(choices).toHaveLength(4);
    expect(choices).toContain('went');
  });
});

describe('Interactive Sentence & Question Builder (All 9 Tenses)', () => {
  const goPreset = BUILDER_VERBS.find((v) => v.id === 'go')!;
  const bePreset = BUILDER_VERBS.find((v) => v.id === 'be')!;
  const writePreset = BUILDER_VERBS.find((v) => v.id === 'write')!;

  it('builds positive and negative questions in Past Simple returning V2 back to V1', () => {
    const aff = buildInteractiveSentence({
      tenseId: 'past-simple',
      subject: 'she',
      verb: goPreset,
      polarity: 'aff',
    });
    expect(aff.english).toBe('She went to work.');

    const qPos = buildInteractiveSentence({
      tenseId: 'past-simple',
      subject: 'she',
      verb: goPreset,
      polarity: 'qPos',
    });
    expect(qPos.english).toBe('Did she go to work?');

    const qNeg = buildInteractiveSentence({
      tenseId: 'past-simple',
      subject: 'you',
      verb: goPreset,
      polarity: 'qNeg',
      whWord: 'Why',
    });
    expect(qNeg.english).toBe("Why didn't you go to work?");
    expect(qNeg.formalEnglish).toBe('Why did you not go to work?');
    expect(qNeg.slovak).toContain('Prečo');
  });

  it('handles special "to be" rules and continuous fallback cleanly', () => {
    const presentNegI = buildInteractiveSentence({
      tenseId: 'present-simple',
      subject: 'I',
      verb: bePreset,
      polarity: 'qNeg',
    });
    expect(presentNegI.english).toBe("Aren't I at home?");
    expect(presentNegI.formalEnglish).toBe('Am I not at home?');

    const pastNegYou = buildInteractiveSentence({
      tenseId: 'past-simple',
      subject: 'you',
      verb: bePreset,
      polarity: 'qNeg',
    });
    expect(pastNegYou.english).toBe("Weren't you at home?");

    const ppcBe = buildInteractiveSentence({
      tenseId: 'present-perfect-continuous',
      subject: 'he',
      verb: bePreset,
      polarity: 'aff',
    });
    expect(ppcBe.english).toBe('He has been at home.');
    expect(ppcBe.noteSk).toBeTruthy();
  });

  it('builds Present Perfect, Present Perfect Continuous, Past Perfect, and Future will', () => {
    const perfectQNeg = buildInteractiveSentence({
      tenseId: 'present-perfect',
      subject: 'he',
      verb: writePreset,
      polarity: 'qNeg',
    });
    expect(perfectQNeg.english).toBe("Hasn't he written an email?");

    const ppcQPos = buildInteractiveSentence({
      tenseId: 'present-perfect-continuous',
      subject: 'she',
      verb: writePreset,
      polarity: 'qPos',
    });
    expect(ppcQPos.english).toBe('Has she been writing an email?');

    const pastPerfNeg = buildInteractiveSentence({
      tenseId: 'past-perfect',
      subject: 'they',
      verb: writePreset,
      polarity: 'neg',
    });
    expect(pastPerfNeg.english).toBe("They hadn't written an email.");

    const pastPerfQNeg = buildInteractiveSentence({
      tenseId: 'past-perfect',
      subject: 'you',
      verb: writePreset,
      polarity: 'qNeg',
    });
    expect(pastPerfQNeg.english).toBe("Hadn't you written an email?");
    expect(pastPerfQNeg.formalEnglish).toBe('Had you not written an email?');

    const futureQNeg = buildInteractiveSentence({
      tenseId: 'future-will',
      subject: 'they',
      verb: writePreset,
      polarity: 'qNeg',
    });
    expect(futureQNeg.english).toBe("Won't they write an email?");
  });
});

describe('App UI Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('filters verbs in Slovak and opens detailed Slovak explanation modal', () => {
    render(<App />);
    const searchInput = screen.getByLabelText('Hľadať sloveso');
    fireEvent.change(searchInput, { target: { value: 'write' } });

    expect(screen.getByText('write')).toBeInTheDocument();
    expect(screen.getByText('wrote')).toBeInTheDocument();
    expect(screen.getByText('written')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: /Vysvetlenie a vety/i })[0]);
    expect(
      screen.getByText(/Ako sa toto sloveso vysvetľuje a používa v slovenčine/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Ukážky použitia vo vetách/i)).toBeInTheDocument();
  });

  it('switches to Practice tab, supports all 5 verb forms, and shows Slovak explanation on check', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: /Precvičovanie slovies/i }));
    fireEvent.click(screen.getByRole('button', { name: /Úplne všetky tvary \(5 tvarov\)/i }));

    expect(screen.getByLabelText(/1\. tvar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/2\. tvar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/3\. tvar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/3\. osoba/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priebehový tvar/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Skontrolovať odpoveď/i }));
    expect(screen.getByText(/Vysvetlenie po slovensky:/i)).toBeInTheDocument();
  });

  it('navigates 9-step Course, Polopate Theory Academy, Sentence Lab, and 2250-example Test Studio', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: /Kurz časov/i }));
    expect(screen.getByText(/Kurz anglických časov krok za krokom/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Akademická teória polopate: Ako tento čas cíti Angličan/i)
    ).toBeInTheDocument();

    // Open Polopate Theory Academy sub-tab
    fireEvent.click(screen.getByRole('tab', { name: /Teória polopate/i }));
    expect(
      screen.getByText(/Rozhodovací kompas: Ktorý z 9 časov mám použiť\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/7 najčastejších pascí, do ktorých padajú Slováci/i)
    ).toBeInTheDocument();

    // Test Decision Compass switching to Future
    fireEvent.click(screen.getByRole('button', { name: /^Budúcnosť$/i }));
    expect(screen.getByText(/Budúci čas s „will“/i)).toBeInTheDocument();

    // Open Sentence Lab
    fireEvent.click(screen.getByRole('tab', { name: /Laboratórium viet/i }));
    expect(
      screen.getByText(/Vyskúšaj si tvorbu času, kladnej aj zápornej otázky naživo/i)
    ).toBeInTheDocument();

    // Switch to Test Studio (2250 exercises) and run a 250-example single tense or 10-example final mix
    fireEvent.click(screen.getByRole('tab', { name: /Testy z časov/i }));
    expect(screen.getByText(/Testy z anglických časov \(2250 príkladov\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^250$/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /4\. Finálny mix/i }));
    fireEvent.click(screen.getByRole('button', { name: /^10$/ }));
    fireEvent.click(screen.getByRole('button', { name: /Spustiť test \(10 úloh\)/i }));

    expect(screen.getByText(/Úloha 1 z 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Zmiešané časy/i)).toBeInTheDocument();

    const choiceBtns = document.querySelectorAll('.choice-btn');
    expect(choiceBtns.length).toBe(4);
    fireEvent.click(choiceBtns[0]);

    expect(screen.getByText(/Vysvetlenie:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ďalšia úloha/i })).toBeInTheDocument();
  });
});
