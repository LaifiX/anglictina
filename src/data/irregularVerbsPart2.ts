import type { IrregularVerb } from '../types/english';

export const IRREGULAR_VERBS_PART_2: IrregularVerb[] = [
  {
    id: 'sing',
    v1: 'sing',
    v2: 'sang',
    v3: 'sung',
    thirdPerson: 'sings',
    ingForm: 'singing',
    ipa: { v1: '/sɪŋ/', v2: '/sæŋ/', v3: '/sʌŋ/' },
    pronunciationSk: { v1: 'sing', v2: 'seng', v3: 'sang' },
    translationSk: 'spievať',
    otherMeaningsSk: 'zaspievať',
    level: 'A1',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Vzorový príklad skupiny „i – a – u“: sing – sang – sung. Všimnite si zmenu výslovnosti v jednotlivých tvaroch: [sing] -> [seng] -> [sang].',
      formsGuide: {
        v1: 'sing = spievam / spievať.',
        v2: 'sang [seng] = spieval som, zaspieval som.',
        v3: 'sung [sang] = zaspievaný / spieval (po have/has).',
      },
      tipSk:
        'Podstatné meno „pieseň“ je „song“, ale 3. tvar slovesa spievať sa píše s U: „sung“!',
    },
    examples: {
      v1: {
        en: 'Birds sing early in the morning.',
        sk: 'Vtáky spievajú skoro ráno.',
        note: 'Prítomný dej v množnom čísle -> 1. tvar „sing“.',
      },
      v2: {
        en: 'She sang our national anthem beautifully.',
        sk: 'Krásne zaspievala našu štátnu hymnu.',
        note: '2. tvar „sang“.',
      },
      v3: {
        en: 'Have you ever sung karaoke with friends?',
        sk: 'Spieval si niekedy s kamarátmi karaoke?',
        note: 'Have + ever + 3. tvar „sung“.',
      },
      questionNeg: {
        en: "Didn't he sing in a school choir?",
        sk: 'Nespieval v školskom zbore?',
        note: 'Záporná otázka s didn’t + 1. tvar „sing“.',
      },
    },
    sentenceGap: {
      sentence: 'That song has been ____ by millions of fans.',
      targetForm: 'v3',
      translationSk: 'Túto pieseň zaspievali milióny fanúšikov.',
      whySk: 'Trpný rod „has been + V3“ si vyžaduje 3. tvar „sung“.',
    },
  },
  {
    id: 'sink',
    v1: 'sink',
    v2: 'sank',
    v3: 'sunk',
    thirdPerson: 'sinks',
    ingForm: 'sinking',
    ipa: { v1: '/sɪŋk/', v2: '/sæŋk/', v3: '/sʌŋk/' },
    pronunciationSk: { v1: 'sink', v2: 'senk', v3: 'sank' },
    translationSk: 'potopiť (sa), klesnúť',
    otherMeaningsSk: 'ísť ku dnu (loď), poklesnúť (nálada)',
    level: 'B1',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Vzor „i – a – u“: sink – sank – sunk. Ako podstatné meno znamená „sink“ aj kuchynský drez alebo umývadlo!',
      formsGuide: {
        v1: 'sink = potápa sa / potopiť (loď sa potápa = The ship is sinking).',
        v2: 'sank = potopil sa, klesol.',
        v3: 'sunk = potopený / klesol (a sunk ship / has sunk).',
      },
      tipSk:
        'Dvojica na ľahké zapamätanie: drink – drank – drunk a sink – sank – sunk.',
    },
    examples: {
      v1: {
        en: 'Heavy stones sink quickly in water.',
        sk: 'Ťažké kamene vo vode rýchlo klesajú ku dnu.',
        note: 'Všeobecná vlastnosť -> 1. tvar „sink“.',
      },
      v2: {
        en: 'The Titanic sank in April 1912.',
        sk: 'Titanic sa potopil v apríli 1912.',
        note: 'Historická udalosť -> 2. tvar „sank“.',
      },
      v3: {
        en: 'The submarine has sunk deep below the surface.',
        sk: 'Ponorka klesla hlboko pod hladinu.',
        note: 'Has + 3. tvar „sunk“.',
      },
      questionNeg: {
        en: "Didn't the boat sink near the coast?",
        sk: 'Nepotopila sa tá loď blízko pobrežia?',
        note: 'Záporná otázka s didn’t + 1. tvar „sink“.',
      },
    },
    sentenceGap: {
      sentence: 'My heart ____ when I saw the bad news.',
      targetForm: 'v2',
      translationSk: 'Srdce mi kleslo (stislo sa), keď som videl tie zlé správy.',
      whySk: 'Dej v minulosti („when I saw“) -> 2. tvar „sank“.',
    },
  },
  {
    id: 'smell',
    v1: 'smell',
    v2: 'smelt / smelled',
    v3: 'smelt / smelled',
    v2Accepted: ['smelt', 'smelled', 'smelt/smelled', 'smelt / smelled'],
    v3Accepted: ['smelt', 'smelled', 'smelt/smelled', 'smelt / smelled'],
    thirdPerson: 'smells',
    ingForm: 'smelling',
    ipa: { v1: '/smel/', v2: '/smelt/ · /smeld/', v3: '/smelt/ · /smeld/' },
    pronunciationSk: { v1: 'smel', v2: 'smelt / smeld', v3: 'smelt / smeld' },
    translationSk: 'voňať, zapáchať, cítiť (čuchom)',
    otherMeaningsSk: 'ovoniať niečo',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Má britský nepravidelný tvar „smelt“ aj americký pravidelný „smelled“. Dôležité: po „smell“ vo význame „vonia to nejako“ ide prídavné meno, nie príslovka (It smells good, nie well!).',
      formsGuide: {
        v1: 'smell = vonia / zapácha / ovoňať.',
        v2: 'smelt / smelled = voňalo to, zacítil som.',
        v3: 'smelt / smelled = zacítil (po have/has).',
      },
      tipSk:
        'Pri hodnotení vône vždy používajte prídavné meno: „The soup smells delicious!“ (Polievka vonia vynikajúco!).',
    },
    examples: {
      v1: {
        en: 'Fresh coffee smells wonderful in the morning.',
        sk: 'Čerstvá káva ráno krásne vonia.',
        note: '3. osoba jednotného čísla -> smells + prídavné meno.',
      },
      v2: {
        en: 'We smelled smoke coming from the kitchen.',
        sk: 'Zacítili sme dym prichádzajúci z kuchyne.',
        note: '2. tvar „smelled“ (alebo „smelt“).',
      },
      v3: {
        en: 'Have you ever smelt such strong perfume?',
        sk: 'Cítil si niekedy taký silný parfum?',
        note: 'Have + ever + 3. tvar „smelt / smelled“.',
      },
      questionNeg: {
        en: "Doesn't this cheese smell strange?",
        sk: 'Nezapácha ten syr akosi čudne?',
        note: 'Záporná otázka s doesn’t + 1. tvar „smell“.',
      },
    },
    sentenceGap: {
      sentence: 'As soon as I opened the door, I ____ fresh bread.',
      targetForm: 'v2',
      translationSk: 'Hneď ako som otvoril dvere, zacítil som čerstvý chlieb.',
      whySk: 'Ukončená minulosť -> „smelt“ alebo „smelled“.',
    },
  },
  {
    id: 'spell',
    v1: 'spell',
    v2: 'spelt / spelled',
    v3: 'spelt / spelled',
    v2Accepted: ['spelt', 'spelled', 'spelt/spelled', 'spelt / spelled'],
    v3Accepted: ['spelt', 'spelled', 'spelt/spelled', 'spelt / spelled'],
    thirdPerson: 'spells',
    ingForm: 'spelling',
    ipa: { v1: '/spel/', v2: '/spelt/ · /speld/', v3: '/spelt/ · /speld/' },
    pronunciationSk: { v1: 'spel', v2: 'spelt / speld', v3: 'spelt / speld' },
    translationSk: 'hláskovať, napísať správne',
    otherMeaningsSk: 'písať sa po písmenách',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Rovnako ako smell a learn má britskú podobu „spelt“ a americkú „spelled“. Veľmi užitočné pri rezervácii hotela alebo diktovaní mena cez telefón: „How do you spell your surname?“',
      formsGuide: {
        v1: 'spell = hláskujem / písať.',
        v2: 'spelt / spelled = vyhláskoval, napísal.',
        v3: 'spelt / spelled = hláskovaný / napísaný (How is it spelt?).',
      },
      tipSk:
        'Otázka na pravopis slova: „How do you spell it?“ (Ako sa to píše po písmenách?) alebo „How is it spelt?“.',
    },
    examples: {
      v1: {
        en: 'Could you spell your last name, please?',
        sk: 'Mohli by ste prosím vyhláskovať svoje priezvisko?',
        note: '1. tvar „spell“ po modálnom could.',
      },
      v2: {
        en: 'He spelt my name wrong on the ticket.',
        sk: 'Na lístku napísal moje meno s chybou.',
        note: '2. tvar „spelt“ (alebo „spelled“).',
      },
      v3: {
        en: 'That word is often spelt incorrectly.',
        sk: 'To slovo sa často píše nesprávne.',
        note: 'Trpný rod s 3. tvarom „spelt / spelled“.',
      },
      questionNeg: {
        en: "Isn't „accommodation“ spelt with double M?",
        sk: 'Nepíše sa „accommodation“ s dvoma M?',
        note: 'Záporná trpná otázka s 3. tvarom „spelt“.',
      },
    },
    sentenceGap: {
      sentence: 'I am sorry, I ____ your email address wrong earlier.',
      targetForm: 'v2',
      translationSk: 'Prepáč, predtým som napísal tvoju e-mailovú adresu nesprávne.',
      whySk: '„Earlier“ označuje minulosť -> „spelt“ alebo „spelled“.',
    },
  },
  {
    id: 'spill',
    v1: 'spill',
    v2: 'spilt / spilled',
    v3: 'spilt / spilled',
    v2Accepted: ['spilt', 'spilled', 'spilt/spilled', 'spilt / spilled'],
    v3Accepted: ['spilt', 'spilled', 'spilt/spilled', 'spilt / spilled'],
    thirdPerson: 'spills',
    ingForm: 'spilling',
    ipa: { v1: '/spɪl/', v2: '/spɪlt/ · /spɪld/', v3: '/spɪlt/ · /spɪld/' },
    pronunciationSk: { v1: 'spil', v2: 'spilt / spild', v3: 'spilt / spild' },
    translationSk: 'rozliať, vysypať',
    otherMeaningsSk: 'vyliať (sa)',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Používa sa pri neúmyselnom vyliatí tekutiny alebo vysypaní niečoho (spill coffee, spill sugar). Má nepravidelný tvar „spilt“ aj pravidelný „spilled“.',
      formsGuide: {
        v1: 'spill = rozlejem / vyliať.',
        v2: 'spilt / spilled = rozlial som, vysypal som.',
        v3: 'spilt / spilled = rozliaty / vylial.',
      },
      tipSk:
        'Anglické príslovie: „Don’t cry over spilt milk“ = Neplač nad rozliatym mliekom (minulosť už nezmeníš)!',
    },
    examples: {
      v1: {
        en: 'Careful, do not spill your tea on the keyboard!',
        sk: 'Opatrne, nevylej si čaj na klávesnicu!',
        note: 'Záporný rozkaz -> 1. tvar „spill“.',
      },
      v2: {
        en: 'Oops, I spilt water on my notes.',
        sk: 'Ups, vylial som si vodu na poznámky.',
        note: '2. tvar „spilt“ (alebo „spilled“).',
      },
      v3: {
        en: 'Somebody has spilt juice on the carpet.',
        sk: 'Niekto vylial džús na koberec.',
        note: 'Has + 3. tvar „spilt / spilled“.',
      },
      questionNeg: {
        en: "Didn't you spill coffee on that shirt yesterday?",
        sk: 'Nevylial si si včera na tú košeľu kávu?',
        note: 'Záporná otázka s didn’t + 1. tvar „spill“.',
      },
    },
    sentenceGap: {
      sentence: 'There is no use crying over ____ milk.',
      targetForm: 'v3',
      translationSk: 'Nemá zmysel plakať nad rozliatym mliekom.',
      whySk: 'Ustálený idióm s prídavným tvarom V3: „spilt“ (alebo „spilled“).',
    },
  },
  {
    id: 'split',
    v1: 'split',
    v2: 'split',
    v3: 'split',
    thirdPerson: 'splits',
    ingForm: 'splitting',
    ipa: { v1: '/splɪt/', v2: '/splɪt/', v3: '/splɪt/' },
    pronunciationSk: { v1: 'split', v2: 'split', v3: 'split' },
    translationSk: 'rozdeliť (sa), rozštiepiť',
    otherMeaningsSk: 'rozdeliť si účet (split the bill), rozísť sa (split up)',
    level: 'B1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sú „split“. Veľmi užitočné v reštaurácii s priateľmi: „Shall we split the bill?“ (Rozdelíme si účet?).',
      formsGuide: {
        v1: 'split = rozdelím / rozštiepiť. V -ing tvare sa zdvojuje t: splitting.',
        v2: 'split = rozdelil som.',
        v3: 'split = rozdelený / rozdelil.',
      },
      tipSk:
        'Hovorová fráza „split up“ znamená rozísť sa ako pár alebo rozdeliť skupinu na menšie tímy.',
    },
    examples: {
      v1: {
        en: 'Let’s split the cost equally.',
        sk: 'Rozdeľme si náklady rovným dielom.',
        note: 'Po Let’s ide 1. tvar „split“.',
      },
      v2: {
        en: 'They split into two smaller groups.',
        sk: 'Rozdelili sa do dvoch menších skupín.',
        note: '2. tvar „split“ v minulosti.',
      },
      v3: {
        en: 'The prize money was split between three winners.',
        sk: 'Výhra bola rozdelená medzi troch víťazov.',
        note: 'Trpný rod „was + 3. tvar split“.',
      },
      questionNeg: {
        en: "Didn't you split the bill at dinner?",
        sk: 'Nerozdelili ste si na večeri účet?',
        note: 'Záporná otázka s didn’t + 1. tvar „split“.',
      },
    },
    sentenceGap: {
      sentence: 'We are ____ the work so we finish faster.',
      targetForm: 'ingForm',
      translationSk: 'Rozdeľujeme si prácu, aby sme skončili skôr.',
      whySk: 'Dej práve teraz po „are“ zdvojuje t: „splitting“.',
    },
  },
  {
    id: 'spread',
    v1: 'spread',
    v2: 'spread',
    v3: 'spread',
    thirdPerson: 'spreads',
    ingForm: 'spreading',
    ipa: { v1: '/spred/', v2: '/spred/', v3: '/spred/' },
    pronunciationSk: { v1: 'spred', v2: 'spred', v3: 'spred' },
    translationSk: 'šíriť (sa), natrieť (maslo)',
    otherMeaningsSk: 'rozprestrieť, rozložiť',
    level: 'B1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sa píšu „spread“ a čítajú krátko [spred] (ako bread!). Pozor — nedajte sa oklamať „ea“, nečítame [spríd]!',
      formsGuide: {
        v1: 'spread [spred] = šírim / natieram.',
        v2: 'spread [spred] = šíril sa, natrel som.',
        v3: 'spread [spred] = rozšírený / natretý.',
      },
      tipSk:
        'V kuchyni znamená „natrieť na chlieb“ (spread butter on bread), v správach zase „šíriť sa“ (spread quickly).',
    },
    examples: {
      v1: {
        en: 'News spreads fast in a small town.',
        sk: 'Správy sa v malom meste šíria rýchlo.',
        note: 'Podmet „News“ je jednotné číslo -> „spreads“.',
      },
      v2: {
        en: 'She spread jam on a slice of toast.',
        sk: 'Natiera / natrela džem na plátok toastu.',
        note: 'Bez -s po „she“ -> 2. tvar „spread“.',
      },
      v3: {
        en: 'The fire has spread to the nearby forest.',
        sk: 'Požiar sa rozšíril do blízkeho lesa.',
        note: 'Has + 3. tvar „spread“.',
      },
      questionNeg: {
        en: "Didn't the rumor spread across the whole school?",
        sk: 'Nerozšírila sa tá fáma po celej škole?',
        note: 'Záporná otázka s didn’t + 1. tvar „spread“.',
      },
    },
    sentenceGap: {
      sentence: 'The virus ____ rapidly last winter.',
      targetForm: 'v2',
      translationSk: 'Vírus sa minulú zimu šíril rýchlo.',
      whySk: '„Last winter“ je minulosť -> 2. tvar je stále „spread“.',
    },
  },
  {
    id: 'steal',
    v1: 'steal',
    v2: 'stole',
    v3: 'stolen',
    thirdPerson: 'steals',
    ingForm: 'stealing',
    ipa: { v1: '/stiːl/', v2: '/stəʊl/', v3: '/ˈstəʊlən/' },
    pronunciationSk: { v1: 'stíl', v2: 'stoul', v3: 'stouln' },
    translationSk: 'ukradnúť, kradnúť',
    otherMeaningsSk: 'vkradnúť sa',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor ako speak – spoke – spoken! Dôležitý rozdiel pre Slovákov: „steal“ sa spája s VECAMI (steal a bike, steal money), kým „rob“ (pravidelné) s ĽUĎMI alebo BANKOU (rob a bank)!',
      formsGuide: {
        v1: 'steal [stíl] = ukradnem / kradnúť.',
        v2: 'stole [stoul] = ukradol som.',
        v3: 'stolen [stouln] = ukradnutý / ukradol (My bike was stolen!).',
      },
      tipSk:
        'Nikdy nehovorte „They stole the bank“ — správne je „They stole money from the bank“ alebo „They robbed the bank“.',
    },
    examples: {
      v1: {
        en: 'Lock your bike so nobody can steal it.',
        sk: 'Zamkni si bicykel, aby ho nikto nemohol ukradnúť.',
        note: 'Po modálnom can ide 1. tvar „steal“.',
      },
      v2: {
        en: 'Someone stole my backpack on the train.',
        sk: 'Niekto mi vo vlaku ukradol batoh.',
        note: '2. tvar „stole“.',
      },
      v3: {
        en: 'My phone was stolen yesterday.',
        sk: 'Včera mi ukradli mobil.',
        note: 'Trpný rod „was + 3. tvar stolen“.',
      },
      questionNeg: {
        en: "Didn't they catch the man who stole your car?",
        sk: 'Nechytili muža, ktorý ukradol tvoje auto?',
        note: 'Záporná otázka v hlavnej vete + 2. tvar „stole“ vo vedľajšej.',
      },
    },
    sentenceGap: {
      sentence: 'Police found the ____ painting in an old garage.',
      targetForm: 'v3',
      translationSk: 'Polícia našla ukradnutý obraz v starej garáži.',
      whySk: 'Ako prívlastok „ukradnutý“ použijeme 3. tvar „stolen“.',
    },
  },
  {
    id: 'stick',
    v1: 'stick',
    v2: 'stuck',
    v3: 'stuck',
    thirdPerson: 'sticks',
    ingForm: 'sticking',
    ipa: { v1: '/stɪk/', v2: '/stʌk/', v3: '/stʌk/' },
    pronunciationSk: { v1: 'stik', v2: 'stak', v3: 'stak' },
    translationSk: 'prilepiť, strčiť, zaseknúť sa',
    otherMeaningsSk: 'držať sa niečoho (stick to the plan)',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. a 3. tvar sú zhodné: „stuck“ [stak]. Mimoriadne užitočné pri zaseknutí sa v zápche alebo pri probléme: „I am stuck in traffic!“ (Uviazol som v zápche!).',
      formsGuide: {
        v1: 'stick [stik] = prilepím / zapichnúť / držať sa plánu.',
        v2: 'stuck [stak] = prilepil som, uviazol som.',
        v3: 'stuck [stak] = zaseknutý / prilepený (stuck in traffic / stuck in the elevator).',
      },
      tipSk:
        'Skvelá fráza do práce aj učenia: „Stick to the plan!“ = Drž sa plánu!',
    },
    examples: {
      v1: {
        en: 'Stick the stamp in the top right corner.',
        sk: 'Nalepte známku do pravého horného rohu.',
        note: '1. tvar „stick“.',
      },
      v2: {
        en: 'She stuck a yellow note on the fridge.',
        sk: 'Prilepila na chladničku žltý lístok.',
        note: '2. tvar „stuck“.',
      },
      v3: {
        en: 'Sorry I am late, I got stuck in a traffic jam.',
        sk: 'Prepáč, že meškám, uviazol som v dopravnej zápche.',
        note: 'Väzba „get stuck“ s 3. tvarom „stuck“.',
      },
      questionNeg: {
        en: "Aren't we stuck on the same problem again?",
        sk: 'Nezasekli sme sa zase na tom istom probléme?',
        note: 'Záporná otázka s prídavným tvarom „stuck“.',
      },
    },
    sentenceGap: {
      sentence: 'The door is ____ and I cannot open it.',
      targetForm: 'v3',
      translationSk: 'Dvere sú zaseknuté a neviem ich otvoriť.',
      whySk: 'Stav „zaseknutý“ po „is“ vyjadruje 3. tvar „stuck“.',
    },
  },
  {
    id: 'strike',
    v1: 'strike',
    v2: 'struck',
    v3: 'struck',
    thirdPerson: 'strikes',
    ingForm: 'striking',
    ipa: { v1: '/straɪk/', v2: '/strʌk/', v3: '/strʌk/' },
    pronunciationSk: { v1: 'strajk', v2: 'strak', v3: 'strak' },
    translationSk: 'udrieť, zasiahnuť, štrajkovať',
    otherMeaningsSk: 'odbiť (hodiny), napadnúť niekoho (myšlienka)',
    level: 'B2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. a 3. tvar sú „struck“ [strak]. Používa sa pri blesku (lightning struck), pri odbíjaní hodín (the clock struck midnight), pri štrajku aj keď vám zrazu niečo napadne.',
      formsGuide: {
        v1: 'strike [strajk] = udrieť / zasiahnuť / štrajkovať. V -ing tvare odpadá -e: striking.',
        v2: 'struck [strak] = udrel, zasiahol, odbilo.',
        v3: 'struck [strak] = zasiahnutý / udrel.',
      },
      tipSk:
        'Idióm: „It struck me that...“ = Zrazu mi došlo / napadlo mi, že...',
    },
    examples: {
      v1: {
        en: 'Lightning rarely strikes the same place twice.',
        sk: 'Blesk zriedka udrie dvakrát na to isté miesto.',
        note: '3. osoba v prítomnosti -> strikes.',
      },
      v2: {
        en: 'The clock struck twelve at midnight.',
        sk: 'O polnoci odbili hodiny dvanástu.',
        note: '2. tvar „struck“.',
      },
      v3: {
        en: 'The region was struck by a strong earthquake.',
        sk: 'Región zasiahlo silné zemetrasenie.',
        note: 'Trpný rod „was + 3. tvar struck“.',
      },
      questionNeg: {
        en: "Didn't that idea strike you as strange?",
        sk: 'Nepripadal ti ten nápad zvláštny?',
        note: 'Záporná otázka s didn’t + 1. tvar „strike“.',
      },
    },
    sentenceGap: {
      sentence: 'Disaster ____ just moments before the landing.',
      targetForm: 'v2',
      translationSk: 'Katastrofa udrela len chvíľu pred pristátím.',
      whySk: 'Jednoduchý minulý čas -> 2. tvar „struck“.',
    },
  },
  {
    id: 'swear',
    v1: 'swear',
    v2: 'swore',
    v3: 'sworn',
    thirdPerson: 'swears',
    ingForm: 'swearing',
    ipa: { v1: '/sweə(r)/', v2: '/swɔː(r)/', v3: '/swɔːn/' },
    pronunciationSk: { v1: 'sweə(r)', v2: 'swó(r)', v3: 'swón' },
    translationSk: 'prisahať, nadávať',
    otherMeaningsSk: 'dušovať sa',
    level: 'B2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Správa sa úplne rovnako ako wear – wore – worn a tear – tore – torn! Má dva odlišné významy: 1) slávnostne prisahať (I swear it is true), 2) používať neslušné slová / nadávať.',
      formsGuide: {
        v1: 'swear [sweə] = prisahám / nadávať.',
        v2: 'swore [swó] = prisahal som, zanadával som.',
        v3: 'sworn [swón] = zaprisahaný / prisahal (sworn enemies = zaprisahaní nepriatelia).',
      },
      tipSk:
        'Trojica s rovnakým vzorom „-ear / -ore / -orn“: wear – wore – worn, tear – tore – torn, swear – swore – sworn!',
    },
    examples: {
      v1: {
        en: 'I swear I did not touch your laptop!',
        sk: 'Prisahám, že som sa nedotkol tvojho notebooku!',
        note: '1. tvar „swear“.',
      },
      v2: {
        en: 'He hit his toe and swore loudly.',
        sk: 'Udrel si palec a nahlas zanadával.',
        note: '2. tvar „swore“.',
      },
      v3: {
        en: 'The new president was sworn in today.',
        sk: 'Nový prezident dnes zložil prísahu.',
        note: 'Fráza „swear in“ v trpnom rode s 3. tvarom „sworn“.',
      },
      questionNeg: {
        en: "Didn't you swear to keep it a secret?",
        sk: 'Neprisahal si, že to udržíš v tajnosti?',
        note: 'Záporná otázka s didn’t + 1. tvar „swear“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ never to make the same mistake again.',
      targetForm: 'v2',
      translationSk: 'Prisahala, že tú istú chybu už nikdy neurobí.',
      whySk: 'Minulý čas v oznamovacej vete -> 2. tvar „swore“.',
    },
  },
  {
    id: 'sweep',
    v1: 'sweep',
    v2: 'swept',
    v3: 'swept',
    thirdPerson: 'sweeps',
    ingForm: 'sweeping',
    ipa: { v1: '/swiːp/', v2: '/swept/', v3: '/swept/' },
    pronunciationSk: { v1: 'swíp', v2: 'swept', v3: 'swept' },
    translationSk: 'zametať, pozametať',
    otherMeaningsSk: 'prehnať sa (búrka), zmietnuť',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Rovnako ako sleep -> slept a keep -> kept: dlhé „ee“ [swíp] sa v 2. a 3. tvare skracuje na [swept].',
      formsGuide: {
        v1: 'sweep [swíp] = zametám / zametať.',
        v2: 'swept = zamietol som, pozametal som.',
        v3: 'swept = pozametaný / zamietol (The floor has been swept).',
      },
      tipSk:
        'Trojica „-eep -> -ept“: keep – kept, sleep – slept, sweep – swept!',
    },
    examples: {
      v1: {
        en: 'We need to sweep the kitchen floor.',
        sk: 'Musíme pozametať kuchynskú podlahu.',
        note: 'Neurčitok po need to -> 1. tvar „sweep“.',
      },
      v2: {
        en: 'She swept the fallen leaves off the path.',
        sk: 'Pozametala opadané lístie z chodníka.',
        note: '2. tvar „swept“.',
      },
      v3: {
        en: 'Have you swept the stairs yet?',
        sk: 'Už si pozametal schody?',
        note: 'Have + podmet + 3. tvar „swept“.',
      },
      questionNeg: {
        en: "Didn't anyone sweep the balcony?",
        sk: 'Nikto nepozametal balkón?',
        note: 'Záporná otázka s didn’t + 1. tvar „sweep“.',
      },
    },
    sentenceGap: {
      sentence: 'Strong winds ____ across the country last night.',
      targetForm: 'v2',
      translationSk: 'Včera v noci sa cez krajinu prehnali silné vetry.',
      whySk: '„Last night“ vyžaduje 2. tvar „swept“.',
    },
  },
  {
    id: 'swim',
    v1: 'swim',
    v2: 'swam',
    v3: 'swum',
    thirdPerson: 'swims',
    ingForm: 'swimming',
    ipa: { v1: '/swɪm/', v2: '/swæm/', v3: '/swʌm/' },
    pronunciationSk: { v1: 'swim', v2: 'swem', v3: 'swam' },
    translationSk: 'plávať, zaplávať si',
    otherMeaningsSk: 'preplávať',
    level: 'A1',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Klasický vzor „i – a – u“: swim – swam – swum. V -ing tvare sa zdvojuje koncové m: „swimming“!',
      formsGuide: {
        v1: 'swim = plávam / plávať. V -ing tvare dve mm: swimming.',
        v2: 'swam [swem] = plával som.',
        v3: 'swum [swam] = plával (Have you ever swum in the ocean?).',
      },
      tipSk:
        'Pozor na pravopis: v minulom čase je „swam“ (jedno m), ale v „swimming“ sú DVE „mm“!',
    },
    examples: {
      v1: {
        en: 'I swim twice a week at the local pool.',
        sk: 'Dvakrát týždenne plávam na miestnej plavárni.',
        note: 'Pravidelný zvyk -> 1. tvar „swim“.',
      },
      v2: {
        en: 'They swam across the lake in twenty minutes.',
        sk: 'Preplávali jazero za dvadsať minút.',
        note: '2. tvar „swam“.',
      },
      v3: {
        en: 'Have you ever swum in cold mountain water?',
        sk: 'Plával si niekedy v studenej horskej vode?',
        note: 'Skúsenosť s Have + ever + 3. tvar „swum“.',
      },
      questionNeg: {
        en: "Didn't you swim in the sea when you were in Greece?",
        sk: 'Neplával si v mori, keď si bol v Grécku?',
        note: 'Záporná otázka s didn’t + 1. tvar „swim“.',
      },
    },
    sentenceGap: {
      sentence: 'Look! The kids are ____ happily in the pool.',
      targetForm: 'ingForm',
      translationSk: 'Pozri! Deti sa veselo kúpu (plávajú) v bazéne.',
      whySk: 'Dej práve teraz po „are“ zdvojuje m: „swimming“.',
    },
  },
  {
    id: 'teach',
    v1: 'teach',
    v2: 'taught',
    v3: 'taught',
    thirdPerson: 'teaches',
    ingForm: 'teaching',
    ipa: { v1: '/tiːtʃ/', v2: '/tɔːt/', v3: '/tɔːt/' },
    pronunciationSk: { v1: 'tíč', v2: 'tót', v3: 'tót' },
    translationSk: 'učiť (niekoho), vyučovať',
    otherMeaningsSk: 'naučiť niekoho niečo',
    level: 'A1',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Rovnako ako catch -> caught sa aj „teach“ píše s „-aught“: „taught“ [tót]. Používame ho vtedy, keď NIEKOHO INÉHO učíme (učiteľ, tréner, rodič).',
      formsGuide: {
        v1: 'teach [tíč] = učím niekoho / vyučovať (v 3. osobe pridáva -es: teaches).',
        v2: 'taught [tót] = učil som niekoho, naučil som ho.',
        v3: 'taught [tót] = vyučovaný / naučil (I was taught = Učili ma).',
      },
      tipSk:
        'Poradie osôb: „She taught ME English“ (= Naučila ma angličtinu), alebo „She taught me how to drive“ (= Naučila ma šoférovať).',
    },
    examples: {
      v1: {
        en: 'Mr. Kováč teaches history at our school.',
        sk: 'Pán Kováč vyučuje na našej škole dejepis.',
        note: '3. osoba končiaca na -ch pridáva -es: „teaches“.',
      },
      v2: {
        en: 'My dad taught me how to ride a bike.',
        sk: 'Môj otec ma naučil bicyklovať.',
        note: '2. tvar „taught“ [tót].',
      },
      v3: {
        en: 'She has taught English for fifteen years.',
        sk: 'Učí angličtinu už pätnásť rokov.',
        note: 'Has + 3. tvar „taught“.',
      },
      questionNeg: {
        en: "Didn't they teach you this rule at school?",
        sk: 'Neučili vás toto pravidlo v škole?',
        note: 'Záporná otázka s didn’t + 1. tvar „teach“.',
      },
    },
    sentenceGap: {
      sentence: 'Who ____ you how to play the guitar?',
      targetForm: 'v2',
      translationSk: 'Kto ťa naučil hrať na gitare?',
      whySk: 'Otázka na podmet (Who) v minulosti nepoužíva did -> priamo 2. tvar „taught“.',
    },
  },
  {
    id: 'tear',
    v1: 'tear',
    v2: 'tore',
    v3: 'torn',
    thirdPerson: 'tears',
    ingForm: 'tearing',
    ipa: { v1: '/teə(r)/', v2: '/tɔː(r)/', v3: '/tɔːn/' },
    pronunciationSk: { v1: 'teə(r)', v2: 'tó(r)', v3: 'tón' },
    translationSk: 'roztrhnúť, potrhať',
    otherMeaningsSk: 'natrhnúť (sval), vytrhnúť (stránku)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Pozor na dve rôzne výslovnosti rovnakého slova! Sloveso „tear“ (roztrhnúť) sa číta [teə], kým podstatné meno „tear“ (slza) sa číta [tíə]! Časuje sa ako wear – wore – worn.',
      formsGuide: {
        v1: 'tear [teə] = roztrhnem / trhať.',
        v2: 'tore [tó] = roztrhol som.',
        v3: 'torn [tón] = roztrhaný / roztrhol (a torn jacket = roztrhnutá bunda).',
      },
      tipSk:
        'Ak sa ti roztrhli nohavice alebo papier, použiješ „tear“ (nie break!). „I tore my jeans“ = Roztrhol som si rifle.',
    },
    examples: {
      v1: {
        en: 'Be careful not to tear the paper.',
        sk: 'Daj pozor, aby si neroztrhol ten papier.',
        note: 'Záporný neurčitok -> 1. tvar „tear“.',
      },
      v2: {
        en: 'He tore the letter into pieces.',
        sk: 'Roztrhal list na kúsky.',
        note: '2. tvar „tore“.',
      },
      v3: {
        en: 'The sleeve of my coat is torn.',
        sk: 'Rukáv môjho kabáta je roztrhnutý.',
        note: '3. tvar „torn“ ako prídavné meno po „is“.',
      },
      questionNeg: {
        en: "Didn't you tear your trousers on that fence?",
        sk: 'Neroztrhol si si na tom plote nohavice?',
        note: 'Záporná otázka s didn’t + 1. tvar „tear“.',
      },
    },
    sentenceGap: {
      sentence: 'Someone has ____ a page out of this library book.',
      targetForm: 'v3',
      translationSk: 'Niekto vytrhol z tejto knižničnej knihy stranu.',
      whySk: 'Po „has“ v predprítomnom čase nasleduje 3. tvar „torn“.',
    },
  },
  {
    id: 'throw',
    v1: 'throw',
    v2: 'threw',
    v3: 'thrown',
    thirdPerson: 'throws',
    ingForm: 'throwing',
    ipa: { v1: '/θrəʊ/', v2: '/θruː/', v3: '/θrəʊn/' },
    pronunciationSk: { v1: 'θrou', v2: 'θrú', v3: 'θroun' },
    translationSk: 'hodiť, vyhodiť',
    otherMeaningsSk: 'usporiadať večierok (throw a party)',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor „ow – ew – own“ (ako know/grow/blow)! Začiatočné „th“ vyslovujeme špičkou jazyka medzi zubami. „Throw away“ znamená vyhodiť do koša.',
      formsGuide: {
        v1: 'throw [θrou] = hodím / hádzať.',
        v2: 'threw [θrú] = hodil som (pozor na písanie — nie „through“!).',
        v3: 'thrown [θroun] = hodený / vyhodený (po have/has alebo be).',
      },
      tipSk:
        'Častý omyl vo výslovnosti aj písaní: „threw“ [θrú] je minulý čas slovesa hodiť, zatiaľ čo „through“ [θrú] je predložka „cez“!',
    },
    examples: {
      v1: {
        en: 'Do not throw plastic bottles into nature.',
        sk: 'Nehádžte plastové fľaše do prírody.',
        note: 'Záporný rozkaz -> 1. tvar „throw“.',
      },
      v2: {
        en: 'She threw the ball to her friend.',
        sk: 'Hodila loptu svojej kamarátke.',
        note: '2. tvar „threw“.',
      },
      v3: {
        en: 'Those old magazines have been thrown away.',
        sk: 'Tie staré časopisy už boli vyhodené.',
        note: 'Trpný rod s 3. tvarom „thrown“.',
      },
      questionNeg: {
        en: "Didn't you throw away that broken chair?",
        sk: 'Nevyhodil si tú pokazenú stoličku?',
        note: 'Záporná otázka s didn’t + 1. tvar „throw“.',
      },
    },
    sentenceGap: {
      sentence: 'I accidentally ____ the receipt in the bin this morning.',
      targetForm: 'v2',
      translationSk: 'Dnes ráno som omylom hodil účtenku do koša.',
      whySk: 'Ukončený dej ráno -> 2. tvar „threw“.',
    },
  },
  {
    id: 'wake',
    v1: 'wake',
    v2: 'woke',
    v3: 'woken',
    v2Accepted: ['woke', 'waked'],
    v3Accepted: ['woken', 'waked'],
    thirdPerson: 'wakes',
    ingForm: 'waking',
    ipa: { v1: '/weɪk/', v2: '/wəʊk/', v3: '/ˈwəʊkən/' },
    pronunciationSk: { v1: 'wejk', v2: 'wouk', v3: 'woukn' },
    translationSk: 'zobudiť (sa)',
    otherMeaningsSk: 'prebudiť sa (wake up)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Takmer vždy sa používa s časticou „up“: „wake up“ (zobudiť sa / zobudiť niekoho). Pozor na rozdiel „wake up“ (otvoriť oči po spánku) a „get up“ (vstať z postele)!',
      formsGuide: {
        v1: 'wake [wejk] = zobudím (sa). V -ing tvare odpadá -e: waking.',
        v2: 'woke [wouk] = zobudil som (sa).',
        v3: 'woken [woukn] = zobudený / zobudil (I have just woken up = Práve som sa zobudil).',
      },
      tipSk:
        'Ak niekto ešte leží v posteli, ale už nespí, je „awake“ (hore/bdelý) a práve sa „woke up“.',
    },
    examples: {
      v1: {
        en: 'What time do you wake up on weekdays?',
        sk: 'O koľkej sa zobúdzaš cez pracovné dni?',
        note: 'Prítomná otázka s do + 1. tvar „wake“.',
      },
      v2: {
        en: 'I woke up early because of the loud thunder.',
        sk: 'Zobudil som sa skoro kvôli hlasnému hromu.',
        note: '2. tvar „woke“.',
      },
      v3: {
        en: 'Have you woken up the kids yet?',
        sk: 'Už si zobudil deti?',
        note: 'Have + podmet + 3. tvar „woken“.',
      },
      questionNeg: {
        en: "Didn't the alarm wake you up?",
        sk: 'Nezobudil ťa budík?',
        note: 'Záporná otázka s didn’t + 1. tvar „wake“.',
      },
    },
    sentenceGap: {
      sentence: 'She has just ____ up and is making coffee.',
      targetForm: 'v3',
      translationSk: 'Práve sa zobudila a robí si kávu.',
      whySk: 'Po „has just“ ide 3. tvar „woken“.',
    },
  },
  {
    id: 'wear',
    v1: 'wear',
    v2: 'wore',
    v3: 'worn',
    thirdPerson: 'wears',
    ingForm: 'wearing',
    ipa: { v1: '/weə(r)/', v2: '/wɔː(r)/', v3: '/wɔːn/' },
    pronunciationSk: { v1: 'weə(r)', v2: 'wó(r)', v3: 'wón' },
    translationSk: 'nosiť (mať na sebe oblečenie)',
    otherMeaningsSk: 'nosiť okuliare/parfum, opotrebovať (wear out)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'V slovenčine povieme „mať na sebe“ alebo „nosiť“ — v angličtine je to vždy „wear“ (nie „carry“ ani „have on“ v bežnej vete). Časuje sa ako tear/swear: wear – wore – worn.',
      formsGuide: {
        v1: 'wear [weə] = nosím (na sebe) / mať oblečené.',
        v2: 'wore [wó] = mal som na sebe, nosil som.',
        v3: 'worn [wón] = obnosený / nosil (po have/has).',
      },
      tipSk:
        'Rozdiel „put on“ vs „wear“: „put on“ je samotný pohyb obliekania (I put on my coat), zatiaľ čo „wear“ je stav, že ho už máte na sebe (I am wearing a coat).',
    },
    examples: {
      v1: {
        en: 'Do you wear glasses for reading?',
        sk: 'Nosíš okuliare na čítanie?',
        note: 'Zvyk v prítomnosti -> 1. tvar „wear“.',
      },
      v2: {
        en: 'She wore a dark blue dress to the wedding.',
        sk: 'Na svadbe mala oblečené tmavomodré šaty.',
        note: '2. tvar „wore“.',
      },
      v3: {
        en: 'I have worn these boots for three winters.',
        sk: 'Tieto čižmy nosím už tri zimy.',
        note: 'Have + 3. tvar „worn“.',
      },
      questionNeg: {
        en: "Why aren't you wearing a scarf today?",
        sk: 'Prečo dnes nemáš na sebe šál?',
        note: 'Záporná otázka v prítomnom priebehovom čase.',
      },
    },
    sentenceGap: {
      sentence: 'These old trainers are completely ____ out.',
      targetForm: 'v3',
      translationSk: 'Tieto staré tenisky sú úplne zodraté (obnosené).',
      whySk: 'Stav opotrebovania po „are“ vyjadruje 3. tvar „worn“.',
    },
  },
  {
    id: 'beat',
    v1: 'beat',
    v2: 'beat',
    v3: 'beaten',
    thirdPerson: 'beats',
    ingForm: 'beating',
    ipa: { v1: '/biːt/', v2: '/biːt/', v3: '/ˈbiːtn/' },
    pronunciationSk: { v1: 'bít', v2: 'bít', v3: 'bítn' },
    translationSk: 'poraziť (súpera), biť, tĺcť',
    otherMeaningsSk: 'vyšľahať (vajcia), tĺcť (srdce)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Zaujímavý vzor A-A-B: 1. a 2. tvar sú rovnaké („beat“ [bít]), mení sa až 3. tvar na „beaten“ [bítn]! V športe znamená poraziť súpera alebo prekonať rekord.',
      formsGuide: {
        v1: 'beat [bít] = porážam / biť / vyšľahať.',
        v2: 'beat [bít] = porazil som (pozor, nie beated!).',
        v3: 'beaten [bítn] = porazený / porazil.',
      },
      tipSk:
        'Opakujeme si kľúčový rozdiel: „We won the match“ (Vyhrali sme zápas), ale „We beat the champions“ (Porazili sme šampiónov).',
    },
    examples: {
      v1: {
        en: 'My heart beats faster before an exam.',
        sk: 'Pred skúškou mi bije srdce rýchlejšie.',
        note: '3. osoba jednotného čísla -> beats.',
      },
      v2: {
        en: 'Slovakia beat Canada in a thrilling match.',
        sk: 'Slovensko porazilo Kanadu v napínavom zápase.',
        note: '2. tvar „beat“ bez -s.',
      },
      v3: {
        en: 'The world record has finally been beaten.',
        sk: 'Svetový rekord bol konečne prekonaný.',
        note: 'Trpný rod s 3. tvarom „beaten“.',
      },
      questionNeg: {
        en: "Didn't they beat us last season?",
        sk: 'Neporazili nás minulú sezónu?',
        note: 'Záporná otázka s didn’t + 1. tvar „beat“.',
      },
    },
    sentenceGap: {
      sentence: 'He has never been ____ in chess by his brother.',
      targetForm: 'v3',
      translationSk: 'Brat ho ešte nikdy neporazil v šachu.',
      whySk: 'Trpný rod po „has never been“ vyžaduje 3. tvar „beaten“.',
    },
  },
  {
    id: 'bite',
    v1: 'bite',
    v2: 'bit',
    v3: 'bitten',
    thirdPerson: 'bites',
    ingForm: 'biting',
    ipa: { v1: '/baɪt/', v2: '/bɪt/', v3: '/ˈbɪtn/' },
    pronunciationSk: { v1: 'bajt', v2: 'bit', v3: 'bitn' },
    translationSk: 'uhryznúť, pohrýzť, poštípať',
    otherMeaningsSk: 'hrýzť (si nechty)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Správa sa presne ako hide – hid – hidden: dlhé [aj] sa mení na krátke [i] a v 3. tvare sa zdvojuje spoluhláska: „bitten“ (dve tt)!',
      formsGuide: {
        v1: 'bite [bajt] = hryziem / uhryznúť. V -ing tvare odpadá -e: biting.',
        v2: 'bit [bit] = uhryzol, poštípal (komár).',
        v3: 'bitten [bitn] = pohryzený / poštípaný (dve tt!).',
      },
      tipSk:
        'Pri komároch a hmyze používame v angličtine tiež „bite“ (nie sting, to je žihadlo osy/včely): „A mosquito bit me!“.',
    },
    examples: {
      v1: {
        en: "Don't worry, our dog doesn't bite.",
        sk: 'Neboj sa, náš pes nehryzie.',
        note: 'Zápor v prítomnom čase: doesn’t + 1. tvar „bite“.',
      },
      v2: {
        en: 'A mosquito bit me on the arm last night.',
        sk: 'Včera v noci ma poštípal komár na ruku.',
        note: '2. tvar „bit“.',
      },
      v3: {
        en: 'I have been bitten by mosquitoes all evening.',
        sk: 'Celý večer ma štípali komáre.',
        note: 'Trpný rod s 3. tvarom „bitten“.',
      },
      questionNeg: {
        en: "Didn't that stray dog bite someone last week?",
        sk: 'Nepohrýzol ten túlavý pes minulý týždeň niekoho?',
        note: 'Záporná otázka s didn’t + 1. tvar „bite“.',
      },
    },
    sentenceGap: {
      sentence: 'Stop ____ your fingernails!',
      targetForm: 'ingForm',
      translationSk: 'Prestaň si obhrýzať nechty!',
      whySk: 'Po „stop“ (prestať s činnosťou) odpadá -e -> „biting“.',
    },
  },
  {
    id: 'blow',
    v1: 'blow',
    v2: 'blew',
    v3: 'blown',
    thirdPerson: 'blows',
    ingForm: 'blowing',
    ipa: { v1: '/bləʊ/', v2: '/bluː/', v3: '/bləʊn/' },
    pronunciationSk: { v1: 'blou', v2: 'blú', v3: 'bloun' },
    translationSk: 'fúkať, zafúkať',
    otherMeaningsSk: 'sfúknuť sviečky (blow out), nafúknuť (blow up)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor „ow – ew – own“ ako know/grow/throw! Vo význame „sfúknuť“ (narodeninové sviečky) sa spája s „out“: blow out the candles.',
      formsGuide: {
        v1: 'blow [blou] = fúkam / fúkať.',
        v2: 'blew [blú] = fúkal, sfúkol (výslovnosť ako farba „blue“!).',
        v3: 'blown [bloun] = odfúknutý / sfúkol.',
      },
      tipSk:
        'Štvorica na zapamätanie: know – knew – known, grow – grew – grown, throw – threw – thrown, blow – blew – blown!',
    },
    examples: {
      v1: {
        en: 'Make a wish and blow out the candles.',
        sk: 'Niečo si želaj a sfúkni sviečky.',
        note: '1. tvar „blow“.',
      },
      v2: {
        en: 'A cold wind blew from the north.',
        sk: 'Zo severu fúkal studený vietor.',
        note: '2. tvar „blew“.',
      },
      v3: {
        en: 'Our garden umbrella has blown away.',
        sk: 'Náš záhradný slnečník odfúklo preč.',
        note: 'Has + 3. tvar „blown“.',
      },
      questionNeg: {
        en: "Didn't the storm blow down several trees?",
        sk: 'Nevyvrátila tá búrka niekoľko stromov?',
        note: 'Záporná otázka s didn’t + 1. tvar „blow“.',
      },
    },
    sentenceGap: {
      sentence: 'The wind is ____ very hard tonight.',
      targetForm: 'ingForm',
      translationSk: 'Dnes v noci fúka veľmi silný vietor.',
      whySk: 'Dej prebiehajúci teraz po „is“ -> „blowing“.',
    },
  },
  {
    id: 'burn',
    v1: 'burn',
    v2: 'burnt / burned',
    v3: 'burnt / burned',
    v2Accepted: ['burnt', 'burned', 'burnt/burned', 'burnt / burned'],
    v3Accepted: ['burnt', 'burned', 'burnt/burned', 'burnt / burned'],
    thirdPerson: 'burns',
    ingForm: 'burning',
    ipa: { v1: '/bɜːn/', v2: '/bɜːnt/ · /bɜːnd/', v3: '/bɜːnt/ · /bɜːnd/' },
    pronunciationSk: { v1: 'bérn', v2: 'bérnt / bérnd', v3: 'bérnt / bérnd' },
    translationSk: 'horieť, spáliť (sa), pripáliť',
    otherMeaningsSk: 'popáliť si prst, spáliť kalórie',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Má britský tvar „burnt“ aj americký „burned“. Používa sa bez zvratného zámena, aj keď pripálite večeru („I burnt the toast“) alebo sa spálite na slnku („I got sunburnt“).',
      formsGuide: {
        v1: 'burn [bérn] = horí / spáliť.',
        v2: 'burnt / burned = zhorel, spálil som, pripálil.',
        v3: 'burnt / burned = spálený / pripálený.',
      },
      tipSk:
        'Na pripálené jedlo stačí povedať prídavným tvarom: „The meat is burnt!“ (Mäso je pripálené!).',
    },
    examples: {
      v1: {
        en: 'Dry wood burns very fast.',
        sk: 'Suché drevo horí veľmi rýchlo.',
        note: '3. osoba v prítomnosti -> burns.',
      },
      v2: {
        en: 'I burnt my tongue on the hot soup.',
        sk: 'Popálil som si jazyk horúcou polievkou.',
        note: '2. tvar „burnt“ (alebo „burned“).',
      },
      v3: {
        en: 'The pancakes are slightly burnt.',
        sk: 'Palacinky sú mierne pripálené.',
        note: '3. tvar „burnt“ ako prídavné meno.',
      },
      questionNeg: {
        en: "Didn't you burn your fingers on the pan?",
        sk: 'Nepopálil si si prsty o panvicu?',
        note: 'Záporná otázka s didn’t + 1. tvar „burn“.',
      },
    },
    sentenceGap: {
      sentence: 'Something smells like it is ____ in the oven!',
      targetForm: 'ingForm',
      translationSk: 'Niečo v rúre vonia, akoby sa to pálilo!',
      whySk: 'Prebiehajúci dej po „is“ -> „burning“.',
    },
  },
  {
    id: 'dig',
    v1: 'dig',
    v2: 'dug',
    v3: 'dug',
    thirdPerson: 'digs',
    ingForm: 'digging',
    ipa: { v1: '/dɪɡ/', v2: '/dʌɡ/', v3: '/dʌɡ/' },
    pronunciationSk: { v1: 'dig', v2: 'dag', v3: 'dag' },
    translationSk: 'kopať, vykopať',
    otherMeaningsSk: 'ryť (v záhrade), hrabať',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Krátke sloveso so zhodným 2. a 3. tvarom: dig [dig] – dug [dag] – dug [dag]. V -ing tvare sa zdvojuje koncové g: „digging“.',
      formsGuide: {
        v1: 'dig = kopem / kopať. V -ing tvare dve gg: digging.',
        v2: 'dug = kopal som, vykopal som.',
        v3: 'dug = vykopaný / kopal.',
      },
      tipSk:
        'Rovnaký vzor ako stick – stuck – stuck alebo win – won – won (zmena krátkej samohlásky na [a] v V2 a V3).',
    },
    examples: {
      v1: {
        en: 'Dogs love to dig holes in the yard.',
        sk: 'Psy rady kopú diery na dvore.',
        note: '1. tvar „dig“ po love to.',
      },
      v2: {
        en: 'Workers dug a deep trench along the road.',
        sk: 'Robotníci vykopali pozdĺž cesty hlbokú priekopu.',
        note: '2. tvar „dug“.',
      },
      v3: {
        en: 'Archaeologists have dug up ancient coins here.',
        sk: 'Archeológovia tu vykopali staroveké mince.',
        note: 'Have + 3. tvar „dug“.',
      },
      questionNeg: {
        en: "Didn't the dog dig under the fence again?",
        sk: 'Nepodhrabal sa ten pes zase popod plot?',
        note: 'Záporná otázka s didn’t + 1. tvar „dig“.',
      },
    },
    sentenceGap: {
      sentence: 'Why are they ____ up the street in front of our house?',
      targetForm: 'ingForm',
      translationSk: 'Prečo rozkopávajú ulicu pred naším domom?',
      whySk: 'Krátke jednoslabičné sloveso po „are“ zdvojuje g: „digging“.',
    },
  },
  {
    id: 'dream',
    v1: 'dream',
    v2: 'dreamt / dreamed',
    v3: 'dreamt / dreamed',
    v2Accepted: ['dreamt', 'dreamed', 'dreamt/dreamed', 'dreamt / dreamed'],
    v3Accepted: ['dreamt', 'dreamed', 'dreamt/dreamed', 'dreamt / dreamed'],
    thirdPerson: 'dreams',
    ingForm: 'dreaming',
    ipa: { v1: '/driːm/', v2: '/dremt/ · /driːmd/', v3: '/dremt/ · /driːmd/' },
    pronunciationSk: { v1: 'drím', v2: 'dremt / drímd', v3: 'dremt / drímd' },
    translationSk: 'snívať (sa), túžiť po niečom',
    otherMeaningsSk: 'mať sen',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Pozor na výslovnosť nepravidelného tvaru „dreamt“! Kým V1 „dream“ sa číta dlho [drím], nepravidelné „dreamt“ sa skracuje na krátke [dremt] — rovnako ako mean -> meant [ment]!',
      formsGuide: {
        v1: 'dream [drím] = snívam / snívať (dream about / dream of).',
        v2: 'dreamt [dremt] / dreamed [drímd] = snívalo sa mi, sníval som.',
        v3: 'dreamt [dremt] / dreamed [drímd] = sníval (I have always dreamt of visiting Japan).',
      },
      tipSk:
        'V slovenčine povieme „Snívalo sa mi o tebe“, ale v angličtine ste podmetom VY: „I dreamt about you“ (nie „It dreamt to me“!).',
    },
    examples: {
      v1: {
        en: 'Everybody dreams during REM sleep.',
        sk: 'Každý človek sníva počas REM spánku.',
        note: '3. osoba jednotného čísla -> dreams.',
      },
      v2: {
        en: 'I dreamt about my old school last night.',
        sk: 'Včera v noci sa mi snívalo o mojej starej škole.',
        note: '2. tvar „dreamt“ [dremt] (alebo „dreamed“).',
      },
      v3: {
        en: 'She has always dreamt of living by the sea.',
        sk: 'Vždy snívala o živote pri mori.',
        note: 'Has + always + 3. tvar „dreamt / dreamed“.',
      },
      questionNeg: {
        en: "Didn't you dream about becoming a pilot as a kid?",
        sk: 'Nesníval si ako dieťa o tom, že sa staneš pilotom?',
        note: 'Záporná otázka s didn’t + 1. tvar „dream“.',
      },
    },
    sentenceGap: {
      sentence: 'Wake up, you are ____!',
      targetForm: 'ingForm',
      translationSk: 'Zobuď sa, snívaš (blúzniš)!',
      whySk: 'Prebiehajúci dej po „are“ -> „dreaming“.',
    },
  },
  {
    id: 'feed',
    v1: 'feed',
    v2: 'fed',
    v3: 'fed',
    thirdPerson: 'feeds',
    ingForm: 'feeding',
    ipa: { v1: '/fiːd/', v2: '/fed/', v3: '/fed/' },
    pronunciationSk: { v1: 'fíd', v2: 'fed', v3: 'fed' },
    translationSk: 'kŕmiť, nakŕmiť',
    otherMeaningsSk: 'živiť, nasýtiť',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Rovnako ako meet -> met: dve „ee“ [fíd] sa v 2. a 3. tvare skracujú na jedno „e“ [fed]. Známy idióm „be fed up with something“ znamená „mať niečoho už plné zuby“!',
      formsGuide: {
        v1: 'feed [fíd] = kŕmim / nakŕmiť.',
        v2: 'fed [fed] = nakŕmil som.',
        v3: 'fed [fed] = nakŕmený / nakŕmil (The cat has already been fed).',
      },
      tipSk:
        'Užitočná každodenná fráza s 3. tvarom: „I am fed up with the rain!“ = Už mám toho dažďa plné zuby!',
    },
    examples: {
      v1: {
        en: 'Please do not feed the wild animals.',
        sk: 'Prosím, nekŕmte divé zvieratá.',
        note: 'Záporný rozkaz -> 1. tvar „feed“.',
      },
      v2: {
        en: 'I fed the dog before I left for work.',
        sk: 'Nakŕmil som psa predtým, než som odišiel do práce.',
        note: '2. tvar „fed“.',
      },
      v3: {
        en: 'Have you fed the cat yet?',
        sk: 'Už si nakŕmil mačku?',
        note: 'Have + podmet + 3. tvar „fed“.',
      },
      questionNeg: {
        en: "Didn't you feed the fish this morning?",
        sk: 'Nenakŕmil si dnes ráno rybičky?',
        note: 'Záporná otázka s didn’t + 1. tvar „feed“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ the birds every winter when she lived in the countryside.',
      targetForm: 'v2',
      translationSk: 'Keď bývala na vidieku, každú zimu kŕmila vtáky.',
      whySk: 'Pravidelný zvyk v minulosti („when she lived“) -> 2. tvar „fed“.',
    },
  },
  {
    id: 'fight',
    v1: 'fight',
    v2: 'fought',
    v3: 'fought',
    thirdPerson: 'fights',
    ingForm: 'fighting',
    ipa: { v1: '/faɪt/', v2: '/fɔːt/', v3: '/fɔːt/' },
    pronunciationSk: { v1: 'fajt', v2: 'fót', v3: 'fót' },
    translationSk: 'bojovať, biť sa, hádať sa',
    otherMeaningsSk: 'zápasiť za niečo (fight for freedom)',
    level: 'A2',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „-ought“ (ako think/buy/bring). Znamená nielen fyzický boj či vojnu, ale aj každodennú hádku detí („Stop fighting!“) alebo boj s chorobou/problémom.',
      formsGuide: {
        v1: 'fight [fajt] = bojujem / biť sa.',
        v2: 'fought [fót] = bojoval som, bil som sa.',
        v3: 'fought [fót] = bojoval (They have fought bravely).',
      },
      tipSk:
        'Bojovať ZA niečo = fight FOR; bojovať PROTI niečomu = fight AGAINST (alebo priamo fight + problém: fight poverty).',
    },
    examples: {
      v1: {
        en: 'We must fight for our rights.',
        sk: 'Musíme bojovať za svoje práva.',
        note: 'Po modálnom must ide 1. tvar „fight“.',
      },
      v2: {
        en: 'The two brothers fought over a toy.',
        sk: 'Dvaja bratia sa pobili (pohádali) kvôli hračke.',
        note: '2. tvar „fought“ [fót].',
      },
      v3: {
        en: 'Doctors have fought hard to save the patient.',
        sk: 'Lekári tvrdo bojovali o záchranu pacienta.',
        note: 'Have + 3. tvar „fought“.',
      },
      questionNeg: {
        en: "Didn't they fight on the same side?",
        sk: 'Nebojovali na tej istej strane?',
        note: 'Záporná otázka s didn’t + 1. tvar „fight“.',
      },
    },
    sentenceGap: {
      sentence: 'He ____ bravely until the very end of the match.',
      targetForm: 'v2',
      translationSk: 'Bojoval statočne až do samého konca zápasu.',
      whySk: 'Jednoduchý minulý čas -> 2. tvar „fought“.',
    },
  },
  {
    id: 'hang',
    v1: 'hang',
    v2: 'hung',
    v3: 'hung',
    thirdPerson: 'hangs',
    ingForm: 'hanging',
    ipa: { v1: '/hæŋ/', v2: '/hʌŋ/', v3: '/hʌŋ/' },
    pronunciationSk: { v1: 'heng', v2: 'hang', v3: 'hang' },
    translationSk: 'zavesiť, visieť',
    otherMeaningsSk: 'tráviť čas s priateľmi (hang out), zložiť telefón (hang up)',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Bežné sloveso s 2. a 3. tvarom „hung“ [hang]. Mimoriadne obľúbené v hovorových frázach: „hang out“ (tráviť voľný čas vonku/s kamarátmi) a „hang up“ (zložiť telefonát).',
      formsGuide: {
        v1: 'hang = zavesím / visieť.',
        v2: 'hung [hang] = zavesil som, viselo to, trávil som čas (hung out).',
        v3: 'hung [hang] = zavesený / visel.',
      },
      tipSk:
        'Zaujímavosť: v historickom význame „popraviť obesením“ je pravidelné (hanged), ale pre kabáty, obrazy aj frázu hang out je VŽDY nepravidelné „hung“!',
    },
    examples: {
      v1: {
        en: 'You can hang your coat in the hallway.',
        sk: 'Kabát si môžeš zavesiť na chodbe.',
        note: 'Po modálnom can ide 1. tvar „hang“.',
      },
      v2: {
        en: 'We hung out at the café all afternoon.',
        sk: 'Celé popoludnie sme trávili čas v kaviarni.',
        note: 'Hovorové hang out v 2. tvare „hung“.',
      },
      v3: {
        en: 'A large painting was hung above the sofa.',
        sk: 'Nad pohovkou bol zavesený veľký obraz.',
        note: 'Trpný rod s 3. tvarom „hung“.',
      },
      questionNeg: {
        en: "Didn't you hang up your wet jacket?",
        sk: 'Nezavesil si si mokrú bundu?',
        note: 'Záporná otázka s didn’t + 1. tvar „hang“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ up the phone before I could reply.',
      targetForm: 'v2',
      translationSk: 'Zložila telefón skôr, než som stihol odpovedať.',
      whySk: 'Dej v minulosti („before I could“) -> 2. tvar „hung“.',
    },
  },
  {
    id: 'shine',
    v1: 'shine',
    v2: 'shone',
    v3: 'shone',
    thirdPerson: 'shines',
    ingForm: 'shining',
    ipa: { v1: '/ʃaɪn/', v2: '/ʃɒn/', v3: '/ʃɒn/' },
    pronunciationSk: { v1: 'šajn', v2: 'šon', v3: 'šon' },
    translationSk: 'svietiť, žiariť',
    otherMeaningsSk: 'lesknúť sa, vynikať',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Zmena výslovnosti zo [šajn] na krátke [šon] v britskej angličtine (v americkej niekedy [šoun]). V -ing tvare odpadá nemé -e: „shining“.',
      formsGuide: {
        v1: 'shine [šajn] = svieti / žiariť. V -ing tvare: shining.',
        v2: 'shone [šon] = svietilo, žiarilo.',
        v3: 'shone [šon] = svietil (The sun has shone all week).',
      },
      tipSk:
        'Ak znamená „vyleštiť topánky“, býva v americkej angličtine pravidelné (shined his shoes), pri slnku a hviezdach je vždy „shone“.',
    },
    examples: {
      v1: {
        en: 'The sun shines brightly in July.',
        sk: 'V júli slnko jasne svieti.',
        note: '3. osoba jednotného čísla -> shines.',
      },
      v2: {
        en: 'The stars shone clearly in the mountain sky.',
        sk: 'Na horskej oblohe jasne žiarili hviezdy.',
        note: '2. tvar „shone“ [šon].',
      },
      v3: {
        en: 'The sun has shone every day of our holiday.',
        sk: 'Slnko svietilo každý deň našej dovolenky.',
        note: 'Has + 3. tvar „shone“.',
      },
      questionNeg: {
        en: "Isn't the sun shining beautifully today?",
        sk: 'Nesvieti dnes slnko nádherne?',
        note: 'Záporná otázka v priebehovom čase s „shining“.',
      },
    },
    sentenceGap: {
      sentence: 'Look outside, the sun is finally ____!',
      targetForm: 'ingForm',
      translationSk: 'Pozri von, konečne svieti slnko!',
      whySk: 'Dej práve teraz po „is“: odpadá nemé -e -> „shining“.',
    },
  },
];
