import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { GRAMMAR_QUIZ, TENSE_GUIDES } from '../data/grammarData';
import { IRREGULAR_VERBS } from '../data/irregularVerbs';
import { BUILDER_VERBS, buildInteractiveSentence } from '../utils/sentenceBuilder';
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

  it('includes complete tense guides and grammar quiz questions', () => {
    expect(TENSE_GUIDES.length).toBe(7);
    for (const guide of TENSE_GUIDES) {
      expect(guide.matrix).toHaveLength(4);
      expect(guide.matrix.map((m) => m.polarity)).toEqual(['aff', 'neg', 'qPos', 'qNeg']);
    }
    expect(GRAMMAR_QUIZ.length).toBeGreaterThanOrEqual(16);
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

describe('Interactive Sentence & Question Builder', () => {
  const goPreset = BUILDER_VERBS.find((v) => v.id === 'go')!;
  const bePreset = BUILDER_VERBS.find((v) => v.id === 'be')!;

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

  it('handles special "to be" rules in Present and Past negative questions', () => {
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
  });

  it('uses V3 in Present Perfect and V1 in Future will', () => {
    const writePreset = BUILDER_VERBS.find((v) => v.id === 'write')!;
    const perfectQNeg = buildInteractiveSentence({
      tenseId: 'present-perfect',
      subject: 'he',
      verb: writePreset,
      polarity: 'qNeg',
    });
    expect(perfectQNeg.english).toBe("Hasn't he written an email?");

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
    expect(screen.getByText(/Ako sa toto sloveso vysvetľuje a používa v slovenčine/i)).toBeInTheDocument();
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

  it('renders Grammar & Questions Lab and Grammar Quiz cleanly', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: /Časy a otázky/i }));
    expect(screen.getByText(/Vyskúšaj si tvorbu času, kladnej aj zápornej otázky naživo/i)).toBeInTheDocument();
    expect(screen.getAllByText("Didn't you go to work?").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('tab', { name: /Kvíz z časov/i }));
    expect(screen.getByText(/Kvíz: Tvorba časov a opytovanie/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Did you go home' }));
    expect(screen.getByText('Did you go home yesterday evening?')).toBeInTheDocument();
  });
});
