import type { TenseDeepTheory, TenseId } from '../types/english';

/**
 * Akademická teória „polopate“ pre Slovákov — zrozumiteľne, do hĺbky a bez zbytočnej suchopárnosti.
 */

export interface AspectMatrixRow {
  aspectEn: string;
  aspectSk: string;
  metaphorSk: string;
  past: { tenseId?: TenseId; name: string; example: string; noteSk: string };
  present: { tenseId?: TenseId; name: string; example: string; noteSk: string };
  future: { tenseId?: TenseId; name: string; example: string; noteSk: string };
}

export const ASPECT_MATRIX: AspectMatrixRow[] = [
  {
    aspectEn: 'Simple (Jednoduchý)',
    aspectSk: 'Fakt, zvyk, hotový bod',
    metaphorSk: '📸 Fotografia / fakt v kalendári — nezaujíma nás priebeh, len či sa dej stal, opakuje alebo stane.',
    past: {
      tenseId: 'past-simple',
      name: 'Past Simple',
      example: 'I wrote an email yesterday.',
      noteSk: 'Uzavretý bod v minulosti (V2).',
    },
    present: {
      tenseId: 'present-simple',
      name: 'Present Simple',
      example: 'I write emails every day.',
      noteSk: 'Pravidelná rutina alebo pravda (V1/-s).',
    },
    future: {
      tenseId: 'future-will',
      name: 'Future (will / going to)',
      example: 'I will write it tonight. / I am going to write it.',
      noteSk: 'Rozhodnutie teraz (will) alebo plán vopred (going to).',
    },
  },
  {
    aspectEn: 'Continuous (Priebehový)',
    aspectSk: 'Rozbehnutý dej / proces',
    metaphorSk: '🎬 Záber z filmu — dej beží pred očami, je uprostred procesu (slovenský nedokonavý vid: „práve píšem / písal som“).',
    past: {
      tenseId: 'past-continuous',
      name: 'Past Continuous',
      example: 'I was writing when you called.',
      noteSk: 'Rozbehnutý dej na pozadí v minulosti.',
    },
    present: {
      tenseId: 'present-continuous',
      name: 'Present Continuous',
      example: 'I am writing an email right now.',
      noteSk: 'Práve teraz alebo dočasne v tomto období.',
    },
    future: {
      name: '(Bonus: Future Continuous)',
      example: 'At 8 p.m. I will be writing.',
      noteSk: 'Zajtra o ôsmej budem práve uprostred písania.',
    },
  },
  {
    aspectEn: 'Perfect (Predčasový / Most)',
    aspectSk: 'Výsledok alebo „už predtým“',
    metaphorSk: '🌉 Most v čase — spája starší dej s novším bodom. Zaujíma nás VÝSLEDOK alebo PORADIE udalostí (vždy s 3. tvarom V3!).',
    past: {
      tenseId: 'past-perfect',
      name: 'Past Perfect',
      example: 'I had written it before he arrived.',
      noteSk: 'Stalo sa ešte skôr pred inou minulosťou (had + V3).',
    },
    present: {
      tenseId: 'present-perfect',
      name: 'Present Perfect',
      example: 'I have written three emails today.',
      noteSk: 'Skúsenosť alebo hotový výsledok platný TERAZ (have/has + V3).',
    },
    future: {
      name: '(Bonus: Future Perfect)',
      example: 'By Friday, I will have written it.',
      noteSk: 'Do piatka to už budem mať napísané.',
    },
  },
  {
    aspectEn: 'Perfect Continuous',
    aspectSk: 'Ako dlho dej už trvá',
    metaphorSk: '⏱️ Stopky na filme — spája most (odkedy) a film (proces). Odpovedá na otázku „Ako dlho už...?“',
    past: {
      name: '(Bonus: Past Perfect Cont.)',
      example: 'I had been writing for two hours before he arrived.',
      noteSk: 'Ako dlho prebiehal dej pred minulým bodom.',
    },
    present: {
      tenseId: 'present-perfect-continuous',
      name: 'Present Perfect Continuous',
      example: 'I have been writing for two hours.',
      noteSk: 'Začalo to v minulosti a stále to trvá až doteraz!',
    },
    future: {
      name: '(Bonus: Future Perfect Cont.)',
      example: 'By June, I will have been living here for 5 years.',
      noteSk: 'V júni tu budem bývať už 5 rokov.',
    },
  },
];

export const AUXILIARY_SECRET = {
  titleSk: 'Zlaté pravidlo pomocných slovies: Prečo vlastne existuje „do / does / did“?',
  leadSk:
    'Toto je najdôležitejšie „aha!“ pravidlo anglickej gramatiky. Keď ho pochopíš raz, prestaneš sa učiť vzorce naspamäť — všetko do seba zapadne ako skladačka.',
  steps: [
    {
      badge: '1. Princíp',
      title: 'Každá anglická veta potrebuje „nosič“ pre zápor a otázku',
      text: 'Angličtina nevie položiť otázku len tónom hlasu ako slovenčina („Ideš domov?“). Na vytvorenie záporu (pripojenie „not“) a otázky (presun pred podmet) MUSÍ mať vo vete pomocné sloveso — takzvaný operátor.',
    },
    {
      badge: '2. Silné časy',
      title: '7 z našich 9 časov už pomocné sloveso má priamo v kladnej vete',
      text: 'Present Continuous (am/is/are), Past Continuous (was/were), Future will (will), Going to (am/is/are), Present Perfect (have/has), Present Perfect Continuous (have/has) a Past Perfect (had). Všetky tieto časy tvoria zápor pridaním „not“ k pomocnému slovesu a otázku jeho presunom pred podmet. Nič si nemusia požičiavať!',
    },
    {
      badge: '3. Prečo do / does / did?',
      title: 'Iba dva jednoduché časy nemajú v kladnej vete pomocníka',
      text: 'Present Simple („She speaks“) a Past Simple („She spoke“) stoja v kladnej vete samy. Keď z nich chceme urobiť zápor alebo otázku, angličtina si narýchlo zavolá prázdneho pomocníka „do“ (ktorý sám o sebe nič neznamená!). A pretože nosičom času a 3. osoby je teraz pomocník (does / did), hlavné sloveso sa VŽDY uvoľní a vráti do základného 1. tvaru V1: Does she speak? / Did she speak?',
    },
    {
      badge: '4. Jediná výnimka',
      title: 'Sloveso „to be“ (byť) je kráľ — nikdy nepoužíva do / does / did',
      text: 'Sloveso „be“ (am/is/are, was/were) je natoľko silné, že si zápor aj otázku robí samo v každom čase: Are you ready? / Wasn’t he there? Nikdy nepovedz „Do you be?“ ani „Did you be?“!',
    },
  ],
};

export interface SlovakTrapItem {
  id: string;
  slovakSentence: string;
  wrongEn: string;
  rightEn: string;
  tenseId: TenseId;
  whySk: string;
}

export const SLOVAK_TRAPS: SlovakTrapItem[] = [
  {
    id: 'trap-1',
    slovakSentence: '„Učím sa angličtinu už tri roky.“',
    wrongEn: 'I am learning English for three years.',
    rightEn: 'I have been learning English for three years.',
    tenseId: 'present-perfect-continuous',
    whySk: 'Slovenčina použije prítomný čas so slovom „už“. Angličtina sa však pýta: začal ten dej v minulosti a stále trvá? ÁNO → Present Perfect Continuous (alebo Present Perfect pri stavových slovesách ako know/live).',
  },
  {
    id: 'trap-2',
    slovakSentence: '„Včera som ho videl v meste.“',
    wrongEn: 'I have seen him in town yesterday.',
    rightEn: 'I saw him in town yesterday.',
    tenseId: 'past-simple',
    whySk: 'Hoci Present Perfect aj Past Simple prekladáme rovnakým slovenským minulým časom, akonáhle vo vete povieš uzavretý minulý čas (yesterday, last week, ago, in 2020), Present Perfect je ZAKÁZANÝ — vždy ide Past Simple (V2).',
  },
  {
    id: 'trap-3',
    slovakSentence: '„Nešiel si tam? — Áno, nešiel.“',
    wrongEn: "Didn't you go there? — Yes, I didn't.",
    rightEn: "Didn't you go there? — No, I didn't.",
    tenseId: 'past-simple',
    whySk: 'V slovenčine slovom „áno“ potvrdzujeme zápornú otázku. V angličtine však „Yes“ VŽDY patrí ku kladnej vete (Yes, I did = Ale áno, išiel som) a „No“ VŽDY k zápornej (No, I didn’t = Nie, nešiel som).',
  },
  {
    id: 'trap-4',
    slovakSentence: '„Práve teraz poznám odpoveď / chcem kávu.“',
    wrongEn: 'I am knowing the answer. / I am wanting a coffee.',
    rightEn: 'I know the answer. / I want a coffee.',
    tenseId: 'present-simple',
    whySk: 'Slovesá stavu (know, want, like, understand, believe, own) nepoužívajú -ing ani vtedy, keď platia „práve teraz“. Vždy zostávajú v jednoduchom tvare (Present Simple).',
  },
  {
    id: 'trap-5',
    slovakSentence: '„Bol si včera v škole? / Nepovedal mi to.“',
    wrongEn: "Did you went to school? / He didn't told me.",
    rightEn: "Did you go to school? / He didn't tell me.",
    tenseId: 'past-simple',
    whySk: 'Minulosť je vo vete vždy iba RAZ. Ak je tam „did / didn’t“, hlavné sloveso sa musí vrátiť z V2 naspäť na základný 1. tvar (V1).',
  },
  {
    id: 'trap-6',
    slovakSentence: '„Otec išiel do obchodu“ (ešte tam je) vs. „Už bol v obchode“ (je späť)',
    wrongEn: 'He has gone to London twice in his life.',
    rightEn: 'He has been to London twice in his life.',
    tenseId: 'present-perfect',
    whySk: 'Obrovský rozdiel medzi „been“ a „gone“: „She has been to Paris“ = bola tam a už sa vrátila (skúsenosť). „She has gone to Paris“ = odišla tam a práve teraz tam stále je!',
  },
  {
    id: 'trap-7',
    slovakSentence: '„Keď prídem domov, zavolám ti.“ (budúcnosť po when / if)',
    wrongEn: 'When I will get home, I will call you.',
    rightEn: 'When I get home, I will call you.',
    tenseId: 'future-will',
    whySk: 'Po časových a podmienkových spojkách (when, if, before, after, until, as soon as) v angličtine NEDÁVAME „will“! Do vedľajšej vety dáme Present Simple („When I get home“) a „will“ ostáva len v hlavnej vete („I will call you“).',
  },
];

export const STATIVE_VERBS_GUIDE = {
  introSk:
    'Angličtina delí slovesá na DEJOVÉ (akcie, ktoré vidíš ako pohyb alebo proces: run, cook, write, study — môžu mať -ing) a STAVOVÉ (vnútorný stav, vlastníctvo, vedomosť — zvyčajne NESMÚ mať -ing, aj keď platia práve teraz!).',
  groups: [
    {
      title: 'Myseľ a poznanie',
      verbs: 'know (vedieť), understand (rozumieť), believe (veriť), remember (pamätať si), forget (zabudnúť), mean (znamenať), realize (uvedomiť si)',
    },
    {
      title: 'Pocity a postoje',
      verbs: 'like (mať rád), love (milovať), hate (nenávidieť), prefer (uprednostňovať), want (chcieť), need (potrebovať), wish (želať si)',
    },
    {
      title: 'Vlastníctvo a stav',
      verbs: 'have (vlastniť), own (vlastniť), belong (patriť), cost (stáť peniaze), contain (obsahovať), seem (zdať sa), be (byť)',
    },
    {
      title: 'Zmysly (samovoľné vnímanie)',
      verbs: 'hear (počuť), see (vidieť), smell (voňať), taste (chutiť)',
    },
  ],
  chameleons: [
    {
      verb: 'think',
      simpleEn: 'I think this film is brilliant.',
      simpleSk: 'Myslím si (mám názor), že je skvelý → stav.',
      contEn: 'I am thinking about buying a bike.',
      contSk: 'Práve premýšľam (rozmýšľam v hlave) o kúpe bicykla → dej!',
    },
    {
      verb: 'have',
      simpleEn: 'She has two brothers and a dog.',
      simpleSk: 'Má / vlastní dvoch bratov → stav (žiadne -ing).',
      contEn: 'She is having dinner / a shower / a great time.',
      contSk: 'Práve večeria / sprchuje sa / skvele sa baví → dej!',
    },
    {
      verb: 'see',
      simpleEn: 'I see a deer behind the trees.',
      simpleSk: 'Vidím (očami vnímam) jeleňa → stav.',
      contEn: 'I am seeing my dentist tomorrow at ten.',
      contSk: 'Zajtra o desiatej mám stretnutie so zubárom → dej / plán!',
    },
  ],
};

export const WORD_ORDER_GUIDE = {
  formula: 'S · V · O · M · P · T',
  legend: [
    { code: 'S', en: 'Subject', sk: 'Podmet (Kto?)', ex: 'She' },
    { code: 'V', en: 'Verb', sk: 'Sloveso (Čo robí?)', ex: 'speaks' },
    { code: 'O', en: 'Object', sk: 'Predmet (Koho / čo?)', ex: 'English' },
    { code: 'M', en: 'Manner', sk: 'Spôsob (Ako?)', ex: 'fluently' },
    { code: 'P', en: 'Place', sk: 'Miesto (Kde?)', ex: 'at work' },
    { code: 'T', en: 'Time', sk: 'Čas (Kedy?)', ex: 'every day.' },
  ],
  slovakComparisonSk:
    'V slovenčine môžeme povedať „Včera som v kine videl Petra“ aj „Petra som videl včera v kine“. V angličtine by „Yesterday in the cinema I saw Peter“ znelo kostrbato — predmet (Peter) MUSÍ byť hneď pri slovese (I saw Peter), potom miesto (at the cinema) a čas ide na koniec (yesterday) alebo úplne na začiatok pre dôraz.',
  adverbPlacement: [
    {
      words: 'always, usually, often, sometimes, rarely, never',
      ruleSk: 'PRED hlavné sloveso, ale ZA sloveso „be“ alebo prvé pomocné sloveso!',
      examples: [
        'I always drink tea. (pred drink)',
        'She is always on time. (za is)',
        'I have never been to Japan. (medzi have a been)',
      ],
    },
    {
      words: 'already, just',
      ruleSk: 'Medzi pomocné sloveso (have/has/had) a 3. tvar (V3). („Already“ môže byť aj na konci vety.)',
      examples: ['She has just arrived.', 'The train had already left.'],
    },
    {
      words: 'yet',
      ruleSk: 'Takmer vždy úplne na KONCI zápornej vety alebo otázky (v Present Perfect).',
      examples: ["I haven't finished yet.", 'Have you called him yet?'],
    },
  ],
};

export const SPELLING_AND_SOUND_GUIDE = {
  spellingRules: [
    {
      title: 'Koncovka -s / -es / -ies (Present Simple 3. os. j.č.)',
      points: [
        'Bežné slovesá: + -s (work → works, play → plays — pozor, samohláska + y sa nemení!).',
        'Po sykavkách -ch, -sh, -s, -x, -z a po -o: + -es (watch → watches, wash → washes, go → goes, do → does).',
        'Po spoluhláske + y: -y sa mení na -ies (study → studies, fly → flies, try → tries).',
      ],
    },
    {
      title: 'Koncovka -ing (Continuous časy)',
      points: [
        'Nemé -e na konci odpadá: write → writing, make → making, drive → driving (výnimka: be → being, see → seeing).',
        'Krátke sloveso končiace na 1 samohlásku + 1 spoluhlásku (CVC) zdvojuje posledné písmeno: sit → sitting, run → running, swim → swimming, stop → stopping, put → putting.',
        'Dvojslabičné slovesá zdvojujú iba ak je prízvuk na poslednej slabike: beGIN → beginning, preFER → preferring, ALE Open → opening, LISten → listening!',
        'Koncovka -ie sa mení na -y: lie → lying, die → dying, tie → tying.',
      ],
    },
    {
      title: 'Koncovka -ed (pravidelné slovesá v Past Simple & V3)',
      points: [
        'Po -e pridáme len -d: live → lived, arrive → arrived.',
        'Po spoluhláske + y: -y → -ied (study → studied, carry → carried), ale po samohláske + y ostáva (play → played).',
        'Krátke CVC sloveso zdvojuje koncovú spoluhlásku: stop → stopped, plan → planned, drop → dropped.',
      ],
    },
  ],
  pronunciationEd: [
    {
      sound: '[t]',
      whenSk: 'Po neznelých hláskach (p, k, f, s, sh, ch)',
      examples: 'worked, stopped, watched, washed, laughed',
      audioSample: 'worked, stopped, watched, washed',
    },
    {
      sound: '[d]',
      whenSk: 'Po znelých spoluhláskach a samohláskach (l, n, r, v, g, b, m, samohlásky)',
      examples: 'played, lived, called, cleaned, opened',
      audioSample: 'played, lived, called, cleaned',
    },
    {
      sound: '[ɪd]',
      whenSk: 'IBA po koncových písmenách -t alebo -d (pridá sa celá slabika navyše!)',
      examples: 'wanted, needed, started, waited, decided',
      audioSample: 'wanted, needed, started, waited',
    },
  ],
};

export interface DecisionNode {
  id: string;
  timeGroup: 'present' | 'past' | 'future';
  questionSk: string;
  answerSk: string;
  tenseId: TenseId;
  exampleEn: string;
  exampleSk: string;
}

export const TENSE_DECISION_NODES: DecisionNode[] = [
  {
    id: 'dec-ps',
    timeGroup: 'present',
    questionSk: 'Deje sa to pravidelne, je to zvyk, fakt, rozvrh alebo stavové sloveso (know, like, want)?',
    answerSk: 'Použi Present Simple — čistý 1. tvar (pre he/she/it + -s).',
    tenseId: 'present-simple',
    exampleEn: 'She drinks green tea every morning.',
    exampleSk: 'Každé ráno pije zelený čaj.',
  },
  {
    id: 'dec-pc',
    timeGroup: 'present',
    questionSk: 'Prebieha to práve teraz v tejto sekunde, alebo len dočasne tento týždeň/mesiac?',
    answerSk: 'Použi Present Continuous (am/is/are + V-ing).',
    tenseId: 'present-continuous',
    exampleEn: 'Listen! Someone is knocking on the door.',
    exampleSk: 'Počúvaj! Niekto práve klope na dvere.',
  },
  {
    id: 'dec-ppc',
    timeGroup: 'present',
    questionSk: 'Začalo to v minulosti a po slovensky by si povedal „UŽ [dve hodiny / od rána] to robím“?',
    answerSk: 'Použi Present Perfect Continuous (have/has been + V-ing) — nie Present Continuous!',
    tenseId: 'present-perfect-continuous',
    exampleEn: 'I have been waiting here for forty minutes.',
    exampleSk: 'Čakám tu už štyridsať minút.',
  },
  {
    id: 'dec-past',
    timeGroup: 'past',
    questionSk: 'Je to uzavretá minulosť a vieš KEDY (včera, pred týždňom, v roku 2020, pri rozprávaní príbehu)?',
    answerSk: 'Použi Past Simple (V2 / -ed; v otázke a zápore did/didn’t + V1).',
    tenseId: 'past-simple',
    exampleEn: 'We went to Košice last weekend.',
    exampleSk: 'Minulý víkend sme išli do Košíc.',
  },
  {
    id: 'dec-pastc',
    timeGroup: 'past',
    questionSk: 'Bol to dlhší rozbehnutý dej na pozadí v konkrétnu hodinu alebo keď ho niečo prerušilo?',
    answerSk: 'Použi Past Continuous (was/were + V-ing).',
    tenseId: 'past-continuous',
    exampleEn: 'I was cooking dinner when the phone rang.',
    exampleSk: 'Varil som večeru, keď zazvonil telefón.',
  },
  {
    id: 'dec-pp',
    timeGroup: 'past',
    questionSk: 'Stalo sa to kedykoľvek doteraz (bez uzavretého dátumu), je to skúsenosť alebo výsledok vidno TERAZ?',
    answerSk: 'Použi Present Perfect (have/has + V3).',
    tenseId: 'present-perfect',
    exampleEn: 'I have lost my keys, so I cannot get in.',
    exampleSk: 'Stratil som kľúče, takže sa neviem dostať dnu.',
  },
  {
    id: 'dec-pap',
    timeGroup: 'past',
    questionSk: 'Hovoríš o dvoch minulých udalostiach a chceš zdôrazniť, ktorá sa stala EŠTE SKÔR?',
    answerSk: 'Pre tú staršiu udalosť použi Past Perfect (had + V3).',
    tenseId: 'past-perfect',
    exampleEn: 'When we arrived, the train had already left.',
    exampleSk: 'Keď sme prišli, vlak už predtým odišiel.',
  },
  {
    id: 'dec-will',
    timeGroup: 'future',
    questionSk: 'Rozhodol si sa práve teraz v rozhovore, niečo sľubuješ, ponúkaš pomoc alebo len tipuješ (I think)?',
    answerSk: 'Použi Future Simple s „will / won’t + V1“.',
    tenseId: 'future-will',
    exampleEn: 'Don’t worry, I will help you carry those bags.',
    exampleSk: 'Neboj sa, pomôžem ti odniesť tie tašky.',
  },
  {
    id: 'dec-going',
    timeGroup: 'future',
    questionSk: 'Už to máš premyslené/naplánované vopred alebo vidíš priamy dôkaz pred očami (čierne mraky)?',
    answerSk: 'Použi Future „am/is/are going to + V1“.',
    tenseId: 'future-going-to',
    exampleEn: 'Look at those dark clouds — it is going to rain!',
    exampleSk: 'Pozri na tie tmavé mraky — bude pršať!',
  },
];

/**
 * Hlbšie „polopate“ akademické vysvetlenie ku každému z 9 časov — zobrazuje sa priamo v každej lekcii.
 */
export const DEEP_THEORY_BY_TENSE: Record<TenseId, TenseDeepTheory> = {
  'present-simple': {
    mentalModelSk:
      'Predstav si Present Simple ako vizitku alebo kalendár, nie ako živú kameru. Nehovorí „pozri, čo sa deje v tejto sekunde“, ale „takto svet funguje, takto žijem, toto sa opakuje“.',
    nuancesSk: [
      {
        title: 'Cestovné poriadky a programy aj pre budúcnosť',
        text: 'Hoci vlak odchádza až zajtra, pre pevné harmonogramy (vlaky, lietadlá, filmy, vyučovanie) angličtina používa Present Simple.',
        exampleEn: 'Our flight leaves tomorrow at 6:15 a.m.',
        exampleSk: 'Náš let odlieta zajtra o 6:15 ráno.',
      },
      {
        title: 'Stavové slovesá v prítomnosti',
        text: 'Slovesá ako know, understand, want, belong, cost, remember sú v Present Simple aj vtedy, keď platia práve v tejto sekunde.',
        exampleEn: 'Now I understand what you mean!',
        exampleSk: 'Teraz rozumiem, čo tým myslíš!',
      },
      {
        title: 'Podmetová otázka bez do/does',
        text: 'Keď sa pýtame na podmet slovom „Who“ alebo „What“ (Kto tu býva?), pomocné do/does NEPOUŽÍVAME a sloveso má koncovku -s.',
        exampleEn: 'Who lives in that blue house?',
        exampleSk: 'Kto býva v tom modrom dome?',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Pijem čaj každé ráno.',
        en: 'I drink tea every morning.',
        noteSk: 'Zvyk → Present Simple.',
      },
      {
        sk: 'Pijem čaj (práve teraz ho držím v ruke).',
        en: 'I am drinking tea.',
        noteSk: 'Slovenčina má rovnaké „pijem“, ale angličtina prepne na Continuous!',
      },
      {
        sk: 'Čakám tu už hodinu.',
        en: 'I have been waiting here for an hour.',
        noteSk: 'Slovenské „čakám už...“ NIE JE Present Simple, ale Present Perfect Continuous!',
      },
    ],
  },
  'present-continuous': {
    mentalModelSk:
      'Present Continuous je ako zapnutá kamera, ktorá práve natáča živú scénu — alebo ako dočasná nálepka „momentálne / len toto obdobie“. Ak dej vidíš uprostred pohybu a nie je to večný stav, siahni po ňom.',
    nuancesSk: [
      {
        title: 'Dočasnosť nemusí znamenať práve túto sekundu',
        text: 'Môžeš povedať „I am reading a great book“ aj keď tú knihu práve nedržíš v ruke — znamená to, že si uprostred nej tento týždeň.',
        exampleEn: 'She is staying with her aunt while her flat is renovated.',
        exampleSk: 'Býva u tety, kým jej rekonštruujú byt.',
      },
      {
        title: 'Pevne dohodnuté blízke plány (diár)',
        text: 'Keď máš kúpenú letenku alebo dohodnutý presný čas s druhou osobou, Present Continuous je najprirodzenejší budúci čas.',
        exampleEn: 'We are meeting Marek at 7 p.m. tonight.',
        exampleSk: 'Dnes večer o siedmej sa stretávame s Marekom.',
      },
      {
        title: 'Postupné zmeny a trendy',
        text: 'Na popis toho, čo sa mení pred očami (ceny, počasie, tvoja angličtina), používame Continuous.',
        exampleEn: 'Your English is getting better every week!',
        exampleSk: 'Tvoja angličtina sa každý týždeň zlepšuje!',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Zajtra letím do Ríma.',
        en: 'I am flying to Rome tomorrow.',
        noteSk: 'Dohodnutý termín v budúcnosti → Present Continuous.',
      },
      {
        sk: 'Lietadlo odlieta zajtra o ôsmej.',
        en: 'The plane leaves tomorrow at eight.',
        noteSk: 'Pevný letový poriadok (nie tvoj osobný diár) → Present Simple.',
      },
      {
        sk: 'Práve teraz chcem ísť domov.',
        en: 'I want to go home right now.',
        noteSk: '„Want“ je stavové sloveso → bez -ing aj so slovom „right now“!',
      },
    ],
  },
  'past-simple': {
    mentalModelSk:
      'Past Simple je uzavretá kapitola v denníku s dátumom. Ten čas už odrezali nožnice — stalo sa to včera, pred hodinou alebo v roku 2019 a tá časová škatuľka je už zatvorená.',
    nuancesSk: [
      {
        title: 'Jedna minulosť na vetu (najdôležitejšia brzda)',
        text: 'V kladnej vete nesie minulosť 2. tvar (V2: went, bought). V zápore a otázke preberá minulosť „did / didn’t“ a sloveso MUSÍ spadnúť späť na V1 (go, buy).',
        exampleEn: "Did you buy the tickets? — No, I didn't buy them.",
        exampleSk: 'Kúpil si lístky? — Nie, nekúpil som ich.',
      },
      {
        title: 'Reťaz udalostí v príbehu',
        text: 'Keď deje nasledujú jeden po druhom ako koráliky na šnúrke, všetky sú v Past Simple.',
        exampleEn: 'He unlocked the door, stepped inside and turned on the light.',
        exampleSk: 'Odomkol dvere, vošiel dnu a zažal svetlo.',
      },
      {
        title: 'Otázky s „When“ a „What time“ v minulosti',
        text: 'Pretože „When?“ pýta presný minulý bod, takmer vždy po ňom nasleduje Past Simple (nikdy nie Present Perfect!).',
        exampleEn: 'When did you move to Bratislava?',
        exampleSk: 'Kedy si sa presťahoval do Bratislavy?',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Stratil som kľúče včera.',
        en: 'I lost my keys yesterday.',
        noteSk: 'Je tam „yesterday“ (uzavretý čas) → povinne Past Simple.',
      },
      {
        sk: 'Stratil som kľúče (a teraz sa neviem dostať dnu!).',
        en: 'I have lost my keys!',
        noteSk: 'Nezaujíma nás kedy, ale dôsledok TERAZ → Present Perfect.',
      },
      {
        sk: 'Nebol si tam? — Nie, nebol.',
        en: "Weren't you there? — No, I wasn't.",
        noteSk: 'Sloveso „be“ nikdy nepoužíva „didn’t“!',
      },
    ],
  },
  'past-continuous': {
    mentalModelSk:
      'Predstav si divadelné javisko v minulosti: Past Continuous sú KULISY a pozadie, ktoré už bežia (pršalo, hrala hudba, ľudia sa rozprávali). A Past Simple je HEREC, ktorý zrazu vbehne na scénu a preruší ich.',
    nuancesSk: [
      {
        title: 'Zlatá dvojica: While + Past Continuous, When + Past Simple',
        text: 'Za „while“ (zatiaľ čo) prirodzene stojí dlhší rozbehnutý dej (was/were + -ing). Za „when“ často príde krátke prerušenie (V2).',
        exampleEn: 'While I was walking to work, I met my old teacher.',
        exampleSk: 'Zatiaľ čo som kráčal do práce, stretol som starého učiteľa.',
      },
      {
        title: 'Dva paralelné deje naraz',
        text: 'Ak dva dlhšie deje bežali súbežne bez toho, aby jeden prerušil druhý, oba sú v Past Continuous.',
        exampleEn: 'I was cooking while my sister was setting the table.',
        exampleSk: 'Ja som varil, zatiaľ čo sestra prestierala stôl.',
      },
      {
        title: 'Rozdiel v poradí deja po „When“',
        text: '„When he arrived, we ate“ = najprv prišiel, až potom sme jedli. „When he arrived, we were eating“ = jedli sme už v čase jeho príchodu!',
        exampleEn: 'When the lights went out, we were watching a film.',
        exampleSk: 'Keď zhasli svetlá, práve sme pozerali film.',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Včera o ôsmej som čítal knihu (bol som uprostred čítania).',
        en: 'At 8 p.m. yesterday, I was reading a book.',
        noteSk: 'Konkrétna hodina v minulosti uprostred procesu → Past Continuous.',
      },
      {
        sk: 'Včera som prečítal celú knihu (dokončil som ju).',
        en: 'Yesterday I read the whole book.',
        noteSk: 'Slovenský dokonavý vid („prečítal som“) → Past Simple!',
      },
      {
        sk: 'Keď som spal, zazvonil telefón.',
        en: 'While I was sleeping, the phone rang.',
        noteSk: 'Spánok je kulisa (Continuous), zvonenie je bod (Simple).',
      },
    ],
  },
  'future-will': {
    mentalModelSk:
      '„Will“ znamená vôľu, spontánnu reakciu a osobný odhad. V hlave sa ti zapne v tej sekunde, keď počuješ problém („Zvoní telefón → zdvihnem!“), dávaš sľub („Nikomu to nepoviem“) alebo tipuješ budúcnosť („Myslím, že vyhráme“).',
    nuancesSk: [
      {
        title: 'Will = okamžité rozhodnutie, ponuka, sľub, hrozba',
        text: 'V reálnej angličtine sa „will“ najčastejšie skracuje na ’ll: I’ll open it, I’ll call you, We’ll see.',
        exampleEn: "It's heavy — I'll carry that bag for you.",
        exampleSk: 'Je to ťažké — odnesiem ti tú tašku.',
      },
      {
        title: 'Zápor „won’t“ vyjadruje aj odmietnutie (aj pri veciach!)',
        text: 'Keď sa niečo „vzprieči“ (auto nechce naštartovať, okno nejde otvoriť), Angličania povedia „won’t“.',
        exampleEn: "My car won't start this morning!",
        exampleSk: 'Moje auto dnes ráno nechce naštartovať!',
      },
      {
        title: 'Pozor na 1. podmienkovú vetu (If / When)',
        text: 'V časti za „if“ alebo „when“ NIKDY nedávame „will“, iba Present Simple; „will“ patrí do druhej polovice vety.',
        exampleEn: 'If it rains tomorrow, we will stay at home.',
        exampleSk: 'Ak bude zajtra pršať, zostaneme doma.',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Počkaj, otvorím ti dvere!',
        en: "Wait, I'll open the door for you!",
        noteSk: 'Spontánne rozhodnutie teraz → will (nie going to).',
      },
      {
        sk: 'Ak prídeš včas, stihneme vlak.',
        en: 'If you arrive on time, we will catch the train.',
        noteSk: 'Za „if“ nedávaj „will“!',
      },
      {
        sk: 'Nezostaneš ešte chvíľu? (milé pozvanie)',
        en: "Won't you stay a little longer?",
        noteSk: '„Won’t“ sa vyslovuje [wount], nepleť si ho so slovesom „want“ [wont]!',
      },
    ],
  },
  'future-going-to': {
    mentalModelSk:
      '„Be going to“ má v sebe koreň v PRÍTOMNOSTI. Buď už máš plán v hlave predtým, než otvoríš ústa, alebo práve teraz pred sebou vidíš fyzický dôkaz, z ktorého je budúcnosť neodvratná (čierne mraky, naklonená šálka).',
    nuancesSk: [
      {
        title: 'Going to vs. Present Continuous pri plánoch',
        text: '„I am going to visit Rome“ = mám to v úmysle (možno ešte nemám dátum). „I am flying to Rome on Tuesday at 9“ = už mám letenku a pevný termín v diári.',
        exampleEn: 'I am going to learn Italian next year.',
        exampleSk: 'Budúci rok sa chystám učiť taliančinu (zámer).',
      },
      {
        title: 'Predpoveď s dôkazom pred očami',
        text: 'Keď počuješ „Look!“, „Watch out!“, „Be careful!“, ide takmer vždy o „be going to“.',
        exampleEn: 'Watch out! You are going to drop that plate!',
        exampleSk: 'Pozor! Pustíš ten tanier!',
      },
      {
        title: 'Hovorové „gonna“ — počuj ho, ale nepíš ho v testoch',
        text: 'Rodeným hovoriacim v rýchlej reči splýva „going to“ do „gonna“ (I’m gonna go). V písomnej angličtine však vždy píš plné „am/is/are going to“.',
        exampleEn: 'We are going to paint the kitchen this weekend.',
        exampleSk: 'Tento víkend ideme vymaľovať kuchyňu.',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Chystám sa kúpiť nové auto.',
        en: 'I am going to buy a new car.',
        noteSk: 'Nezabudni na „am/is/are“ — nikdy nie „I going to buy“!',
      },
      {
        sk: 'Pozri na tie mraky, bude pršať!',
        en: 'Look at those clouds, it is going to rain!',
        noteSk: 'Vidíš dôkaz → going to (pri čistom tipe bez dôkazu by bolo „I think it will rain“).',
      },
      {
        sk: 'Ona sa chystá študovať medicínu.',
        en: 'She is going to study medicine.',
        noteSk: 'Za „to“ je vždy čistý 1. tvar bez -s (nie „to studies“!).',
      },
    ],
  },
  'present-perfect': {
    mentalModelSk:
      'Present Perfect nie je „ďalší minulý čas“ — je to PRÍTOMNÝ pohľad na minulosť. Predstav si ho ako batoh, ktorý si nesieš na chrbte TERAZ: sú v ňom tvoje doterajšie skúsenosti („bol som v Londýne“) aj výsledky („stratil som kľúče, tak stojím pred dverami“).',
    nuancesSk: [
      {
        title: 'Neuzavreté vs. uzavreté časové obdobie',
        text: '„Today“, „this week“, „this year“ ešte stále trvajú → Present Perfect („I have drunk three coffees today“). „Yesterday“, „last week“, „in 2022“ sú uzavreté → Past Simple!',
        exampleEn: 'She has written four emails this morning (stále je ráno).',
        exampleSk: 'Dnes ráno napísala štyri e-maily.',
      },
      {
        title: 'Have been to vs. Have gone to',
        text: '„Marek has been to Spain“ = bol tam a je späť doma. „Marek has gone to Spain“ = odišiel tam a teraz je v Španielsku.',
        exampleEn: 'Where is Anna? — She has gone to the bakery.',
        exampleSk: 'Kde je Anna? — Odišla do pekárne (teraz tam je).',
      },
      {
        title: 'For (dĺžka obdobia) vs. Since (začiatočný bod)',
        text: '„For“ + číslo/trvanie (for 5 years, for two hours, for a long time). „Since“ + presný štart (since Monday, since 2018, since I was a child).',
        exampleEn: 'I have known him for ten years / since 2016.',
        exampleSk: 'Poznám ho už desať rokov / od roku 2016.',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Už som to urobil.',
        en: 'I have already done it.',
        noteSk: 'Slovo „already“ + výsledok teraz + 3. tvar V3 „done“.',
      },
      {
        sk: 'Ešte som to neurobil.',
        en: "I haven't done it yet.",
        noteSk: '„Yet“ stojí na konci zápornej vety a otázky!',
      },
      {
        sk: 'Poznám ho už päť rokov.',
        en: 'I have known him for five years.',
        noteSk: 'Stavové „know“ + „for“ → Present Perfect Simple (nikdy nie „I know him for 5 years“!).',
      },
    ],
  },
  'present-perfect-continuous': {
    mentalModelSk:
      'Ak Present Perfect ukazuje HOTOVÝ VÝSLEDOK („Už som namaľoval 3 steny“), tak Present Perfect Continuous ukazuje STOPKY A ZABLATENÉ RUKY („Maľujem už štyri hodiny a som celý od farby“).',
    nuancesSk: [
      {
        title: 'Simple (koľko / hotovo) vs. Continuous (ako dlho / proces)',
        text: 'Otázka „How many / How much?“ chce Present Perfect Simple (počet). Otázka „How long?“ pri dejových slovesách chce Present Perfect Continuous (trvanie).',
        exampleEn: 'I have been reading all evening. I have read 40 pages.',
        exampleSk: 'Celý večer čítam (proces). Prečítal som 40 strán (výsledok).',
      },
      {
        title: 'Viditeľná stopa práve skončenej činnosti',
        text: 'Dej už mohol pred minútou skončiť, ale jeho telesná alebo viditeľná stopa je práve teraz pred tebou (mokré ulice, červené oči, zadýchaný človek).',
        exampleEn: 'You look out of breath — have you been running?',
        exampleSk: 'Vyzeráš zadýchane — behal si?',
      },
      {
        title: 'Kde narazí na stopku: stavové slovesá!',
        text: 'Ani keď sa pýtaš „How long...?“, nemôžeš dať stavové sloveso (know, own, have, be, like) do -ing. Vtedy sa vráť k Present Perfect Simple.',
        exampleEn: 'How long have you known Peter? (nie: have you been knowing)',
        exampleSk: 'Ako dlho už poznáš Petra?',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Učím sa angličtinu už dva roky.',
        en: 'I have been learning English for two years.',
        noteSk: 'Slovenský prítomný čas + „už“ = anglický Present Perfect Continuous!',
      },
      {
        sk: 'Ako dlho tu už čakáš?',
        en: 'How long have you been waiting here?',
        noteSk: 'Pozor na slovosled: „have YOU been waiting“ (nikdy nie „have been you“!).',
      },
      {
        sk: 'V poslednom čase nespím dobre.',
        en: "I haven't been sleeping well lately.",
        noteSk: 'Nedávny opakovaný trend („lately / recently“) → Present Perfect Continuous.',
      },
    ],
  },
  'past-perfect': {
    mentalModelSk:
      'Past Perfect je „minulosť v minulosti“ — ako filmový FLASHBACK. Keď rozprávaš príbeh v minulosti (Past Simple) a potrebuješ odskočiť ešte o krok dozadu, aby bolo jasné, čo sa stalo SKÔR, zapneš „had + V3“.',
    nuancesSk: [
      {
        title: 'Vždy potrebuje oporný bod v minulosti',
        text: 'Past Perfect takmer nikdy nestojí sám od seba bez kontextu. Vždy sa vzťahuje k inej minulej udalosti (zvyčajne v Past Simple), ktorá prišla až PO ňom.',
        exampleEn: 'By the time we got to the airport, the plane had taken off.',
        exampleSk: 'Kým sme sa dostali na letisko, lietadlo už vzlietlo.',
      },
      {
        title: 'Nepriama reč v minulosti (posun časov)',
        text: 'Keď v minulosti prerozprávaš, čo niekto povedal o ešte staršom deji („She told me...“, „He realized...“), Past Simple aj Present Perfect sa posunú do Past Perfect.',
        exampleEn: 'He realized he had left his wallet at home.',
        exampleSk: 'Uvedomil si, že si doma nechal peňaženku.',
      },
      {
        title: 'Kedy ho NEPOTREBUJEŠ',
        text: 'Ak sú udalosti v presnom chronologickom poradí za sebou („Prišiel som, otvoril dvere a sadol si“), stačí obyčajný Past Simple. Past Perfect vytiahni vtedy, keď ideš v čase späť alebo zdôrazňuješ „už predtým“.',
        exampleEn: 'She was happy because she had passed the exam.',
        exampleSk: 'Bola šťastná, pretože (predtým) zložila skúšku.',
      },
    ],
    slovakTranslationTraps: [
      {
        sk: 'Keď som prišiel, vlak už odišiel.',
        en: 'When I arrived, the train had already left.',
        noteSk: '1. vlak odišiel (had left), 2. prišiel som (arrived).',
      },
      {
        sk: 'Predtým som nikdy neletel (pred rokom 2020).',
        en: 'Before 2020, I had never flown.',
        noteSk: 'Skúsenosť pred minulým bodom = had + V3 (nie have!).',
      },
      {
        sk: 'Nebol som hladný, lebo som už predtým jedol obed.',
        en: "I wasn't hungry because I had already had lunch.",
        noteSk: 'Áno, „had had“ je úplne správne! Prvé „had“ je pomocné, druhé je V3 od „have“.',
      },
    ],
  },
};
