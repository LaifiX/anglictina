import type { IrregularVerb } from '../types/english';

export const IRREGULAR_VERBS_PART_1: IrregularVerb[] = [
  {
    id: 'be',
    v1: 'be',
    v2: 'was / were',
    v2Accepted: ['was/were', 'was / were', 'was were', 'was', 'were'],
    v3: 'been',
    thirdPerson: 'is',
    ingForm: 'being',
    ipa: { v1: '/biː/', v2: '/wɒz/ · /wɜː(r)/', v3: '/biːn/' },
    pronunciationSk: { v1: 'bí', v2: 'woz / wér', v3: 'bín' },
    translationSk: 'byť',
    otherMeaningsSk: 'existovať, nachádzať sa',
    level: 'A1',
    pattern: 'SPECIAL',
    slovakExplanation: {
      summary:
        'Najdôležitejšie anglické sloveso. V prítomnom čase má 3 tvary (am, is, are), v minulom 2 tvary (was pre I/he/she/it a were pre you/we/they). Nepoužíva pomocné slovesá do/does/did!',
      formsGuide: {
        v1: 'be = základný tvar po will, can, must alebo to (napr. I will be late = Budem meškať). V prítomnosti sa mení na am / is / are.',
        v2: 'was / were = minulý čas „bol som, bola som, boli sme“. Otázka sa tvorí prehodením: Were you at home?',
        v3: 'been = „bol“ v predprítomnom čase po have/has (I have been to London = Bol som v Londýne a vrátil som sa).',
      },
      tipSk:
        'Veľký pozor na otázky a zápory: nehovoríme „Did you be?“, ale „Were you?“ alebo „Weren’t you?“!',
    },
    examples: {
      v1: {
        en: 'It will be sunny tomorrow.',
        sk: 'Zajtra bude slnečno.',
        note: 'Po will ide vždy základný tvar „be“.',
      },
      v2: {
        en: 'She was very tired yesterday.',
        sk: 'Včera bola veľmi unavená.',
        note: 'Pre she/he/it/I používame tvar „was“.',
      },
      v3: {
        en: 'Have you ever been to Prague?',
        sk: 'Bol si niekedy v Prahe?',
        note: 'Po have/has používame 3. tvar „been“ (skúsenosť).',
      },
      questionNeg: {
        en: "Weren't they at the meeting?",
        sk: 'Neboli na tom stretnutí?',
        note: 'Záporná otázka v minulosti so slovesom „be“ bez did.',
      },
    },
    sentenceGap: {
      sentence: 'We ____ in Košice last weekend.',
      targetForm: 'v2',
      translationSk: 'Minulý víkend sme boli v Košiciach.',
      whySk: 'Pre „we“ v minulom jednoduchom čase použijeme „were“ (alebo všeobecne „was / were“).',
    },
  },
  {
    id: 'have',
    v1: 'have',
    v2: 'had',
    v3: 'had',
    thirdPerson: 'has',
    ingForm: 'having',
    ipa: { v1: '/hæv/', v2: '/hæd/', v3: '/hæd/' },
    pronunciationSk: { v1: 'hev', v2: 'hed', v3: 'hed' },
    translationSk: 'mať',
    otherMeaningsSk: 'dať si (jedlo/nápoj), zažiť, musieť (have to)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Sloveso „have“ znamená vlastniť alebo si niečo dať (have breakfast = raňajkovať). V 3. osobe jednotného čísla sa mení na „has“ (nie „haves“). Zároveň slúži ako pomocné sloveso v predprítomnom čase.',
      formsGuide: {
        v1: 'have = mám, máš, máme... (pre he/she/it tvar „has“). Po didn’t/will sa vracia vždy „have“.',
        v2: 'had = mal som, mala som, mali sme. Jednoduchý minulý čas pre všetky osoby rovnako.',
        v3: 'had = 3. tvar používaný po have/has (napr. I have had a busy day = Mal som dnes rušný deň).',
      },
      tipSk:
        'V zápore a otázke v minulosti hovoríme „I didn’t have time“ / „Did you have time?“ — nikdy nie „Did you had?“!',
    },
    examples: {
      v1: {
        en: 'Do you have a minute?',
        sk: 'Máš chvíľku?',
        note: 'Bežná otázka v prítomnom čase s pomocným „do“.',
      },
      v2: {
        en: 'We had dinner at seven.',
        sk: 'Večerali sme o siedmej.',
        note: '2. tvar „had“ v oznamovacej vete v minulosti.',
      },
      v3: {
        en: 'She has had this car for five years.',
        sk: 'Toto auto má už päť rokov.',
        note: 'Kombinácia pomocného „has“ a 3. tvaru „had“.',
      },
      questionNeg: {
        en: "Didn't you have my phone number?",
        sk: 'Nemal si moje telefónne číslo?',
        note: 'V zápornej otázke sa po didn’t používa 1. tvar „have“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ a lot of homework yesterday.',
      targetForm: 'v2',
      translationSk: 'Včera mala veľa domácich úloh.',
      whySk: 'Časový údaj „yesterday“ vyžaduje 2. tvar minulého času: „had“.',
    },
  },
  {
    id: 'do',
    v1: 'do',
    v2: 'did',
    v3: 'done',
    thirdPerson: 'does',
    ingForm: 'doing',
    ipa: { v1: '/duː/', v2: '/dɪd/', v3: '/dʌn/' },
    pronunciationSk: { v1: 'dú', v2: 'did', v3: 'dan' },
    translationSk: 'robiť, urobiť',
    otherMeaningsSk: 'pomocné sloveso pre otázky a zápory',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Má dve úlohy: 1) plnovýznamové sloveso „robiť“ (do homework, do sport), 2) neprekladateľné pomocné sloveso na tvorbu otázok a záporov v prítomnom (do/does) a minulom (did) čase.',
      formsGuide: {
        v1: 'do = robím / robiť (pre he/she/it „does“ [daz]).',
        v2: 'did = robil som / urobil som (rovnaké pre všetky osoby).',
        v3: 'done = urobený / urobil (napr. Well done! = Dobrá práca! / I have done it = Urobil som to).',
      },
      tipSk:
        'Neľakajte sa dvoch „do“ v jednej vete: „What do you do?“ (Čo robíš ako povolanie?) alebo „Did you do it?“ (Urobil si to?). Prvé je pomocné, druhé znamená „robiť“.',
    },
    examples: {
      v1: {
        en: 'I always do my best.',
        sk: 'Vždy robím, čo je v mojich silách.',
        note: 'Prítomný jednoduchý čas, 1. tvar „do“.',
      },
      v2: {
        en: 'He did a great job yesterday.',
        sk: 'Včera odviedol skvelú prácu.',
        note: 'Minulý čas, 2. tvar „did“.',
      },
      v3: {
        en: 'Have you done your homework yet?',
        sk: 'Už si si urobil domáce úlohy?',
        note: 'Predprítomný čas: Have + podmet + 3. tvar „done“.',
      },
      questionNeg: {
        en: "Why didn't you do it earlier?",
        sk: 'Prečo si to neurobil skôr?',
        note: 'Prvé „didn’t“ tvorí zápornú otázku, druhé „do“ znamená urobiť.',
      },
    },
    sentenceGap: {
      sentence: 'Everything is ____ and ready.',
      targetForm: 'v3',
      translationSk: 'Všetko je hotové (urobené) a pripravené.',
      whySk: 'Po „is“ vo význame „je urobené“ (trpný stav) ide 3. tvar „done“.',
    },
  },
  {
    id: 'go',
    v1: 'go',
    v2: 'went',
    v3: 'gone',
    thirdPerson: 'goes',
    ingForm: 'going',
    ipa: { v1: '/ɡəʊ/', v2: '/went/', v3: '/ɡɒn/' },
    pronunciationSk: { v1: 'gou', v2: 'went', v3: 'gon' },
    translationSk: 'ísť, chodiť',
    otherMeaningsSk: 'odísť, cestovať',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Klasické nepravidelné sloveso, pri ktorom sa minulý tvar „went“ vôbec nepodobá na základné „go“. V 3. osobe prítomného času priberá -es („goes“).',
      formsGuide: {
        v1: 'go = idem / chodím / ísť. Používa sa v prítomnosti, po will (I will go) aj po did/didn’t (Did you go?).',
        v2: 'went = išiel som, šiel som, išli sme (minulý dej, ktorý už skončil).',
        v3: 'gone = odišiel / preč (po have/has: She has gone = Odišla a ešte nie je späť).',
      },
      tipSk:
        'Rozdiel „has gone“ vs „has been“: „Tom has gone to Italy“ = Tom odišiel do Talianska a práve tam je. „Tom has been to Italy“ = Tom bol v Taliansku a už je doma.',
    },
    examples: {
      v1: {
        en: 'We go to school by bus.',
        sk: 'Chodíme do školy autobusom.',
        note: 'Pravidelný zvyk v prítomnosti = 1. tvar „go“.',
      },
      v2: {
        en: 'I went to the cinema last night.',
        sk: 'Včera večer som išiel do kina.',
        note: 'Ukončený dej v minulosti = 2. tvar „went“.',
      },
      v3: {
        en: 'Where has everybody gone?',
        sk: 'Kam všetci odišli?',
        note: 'Po „has“ v predprítomnom čase nasleduje 3. tvar „gone“.',
      },
      questionNeg: {
        en: "Didn't she go with you?",
        sk: 'Nešla s tebou?',
        note: 'V zápornej otázke použijeme „didn’t“ + podmet + 1. tvar „go“!',
      },
    },
    sentenceGap: {
      sentence: 'They ____ to Croatia every summer, but last year they stayed home.',
      targetForm: 'v1',
      translationSk: 'Každé leto chodia do Chorvátska, ale minulý rok zostali doma.',
      whySk: '„Every summer“ označuje opakovaný dej v prítomnosti -> „go“.',
    },
  },
  {
    id: 'say',
    v1: 'say',
    v2: 'said',
    v3: 'said',
    thirdPerson: 'says',
    ingForm: 'saying',
    ipa: { v1: '/seɪ/', v2: '/sed/', v3: '/sed/' },
    pronunciationSk: { v1: 'sej', v2: 'sed', v3: 'sed' },
    translationSk: 'povedať',
    otherMeaningsSk: 'uvádzať, hovoriť (niečo)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Sloveso „say“ zameriava pozornosť na samotné slová, ktoré niekto povedal. Pozor na výslovnosť: „says“ sa číta [sez], nie [sejz], a „said“ sa číta krátko [sed], nie [sejd].',
      formsGuide: {
        v1: 'say = poviem / hovorím / povedať (he/she says [sez]).',
        v2: 'said = povedal som / povedala (minulý tvar).',
        v3: 'said = povedal (po have/has, napr. What have you said?).',
      },
      tipSk:
        'Rozdiel „say“ vs „tell“: po „say“ nedávame priamo osobu bez „to“ (Správne: He said to me / He said hello). Po „tell“ osobu dávame priamo (He told me).',
    },
    examples: {
      v1: {
        en: 'What does this sign say?',
        sk: 'Čo píše / hovorí táto tabuľa?',
        note: 'Prítomná otázka s does + 1. tvar „say“.',
      },
      v2: {
        en: 'She said goodbye and left.',
        sk: 'Povedala dovidenia a odišla.',
        note: 'Minulý čas = 2. tvar „said“ [sed].',
      },
      v3: {
        en: 'I have never said that.',
        sk: 'Nikdy som to nepovedal.',
        note: 'Predprítomný čas = have + never + 3. tvar „said“.',
      },
      questionNeg: {
        en: "Didn't he say he would call?",
        sk: 'Nepovedal náhodou, že zavolá?',
        note: 'Záporná otázka s didn’t + 1. tvar „say“.',
      },
    },
    sentenceGap: {
      sentence: 'My teacher ____ that my pronunciation is getting better.',
      targetForm: 'thirdPerson',
      translationSk: 'Moja učiteľka hovorí, že moja výslovnosť sa zlepšuje.',
      whySk: 'Podmet „My teacher“ je 3. osoba j.č. v prítomnosti -> „says“.',
    },
  },
  {
    id: 'get',
    v1: 'get',
    v2: 'got',
    v3: 'got',
    v3Accepted: ['got', 'gotten'],
    thirdPerson: 'gets',
    ingForm: 'getting',
    ipa: { v1: '/ɡet/', v2: '/ɡɒt/', v3: '/ɡɒt/' },
    pronunciationSk: { v1: 'get', v2: 'got', v3: 'got (US: gotn)' },
    translationSk: 'dostať, získať, stať sa',
    otherMeaningsSk: 'doraziť (get home), pochopiť (I get it)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Jedno z najuniverzálnejších slovies v angličtine. Podľa kontextu znamená dostať, kúpiť, doraziť niekam alebo zmenu stavu (get cold = ochladiť sa, get tired = unaviť sa).',
      formsGuide: {
        v1: 'get = dostať / dostanem. V -ing tvare sa zdvojuje t: getting.',
        v2: 'got = dostal som, dorazil som, stalo sa.',
        v3: 'got (v britskej) alebo gotten (v americkej angličtine pri význame „dostať“).',
      },
      tipSk:
        'Pozor na rozdiel „have got“ (= mám, prítomnosť!) a „got“ (= dostal som, minulosť): „I have got a dog“ = Mám psa.',
    },
    examples: {
      v1: {
        en: 'I usually get up at six.',
        sk: 'Zvyčajne vstávam o šiestej.',
        note: 'Frázové sloveso get up = vstať z postele.',
      },
      v2: {
        en: 'We got a great gift from Marek.',
        sk: 'Dostali sme od Mareka skvelý darček.',
        note: '2. tvar „got“ v minulom čase.',
      },
      v3: {
        en: 'It has got much colder today.',
        sk: 'Dnes sa oveľa viac ochladilo.',
        note: 'Has + 3. tvar „got“ vyjadruje zmenu až do prítomnosti.',
      },
      questionNeg: {
        en: "Didn't you get my email?",
        sk: 'Nedostal si môj e-mail?',
        note: 'Záporná otázka s očakávaním potvrdenia: didn’t + get.',
      },
    },
    sentenceGap: {
      sentence: 'It is ____ dark outside, let’s turn on the light.',
      targetForm: 'ingForm',
      translationSk: 'Vonku sa stmieva, zapnime svetlo.',
      whySk: 'Po „is“ pre dej práve teraz použijeme priebehový tvar so zdvojeným t: „getting“.',
    },
  },
  {
    id: 'make',
    v1: 'make',
    v2: 'made',
    v3: 'made',
    thirdPerson: 'makes',
    ingForm: 'making',
    ipa: { v1: '/meɪk/', v2: '/meɪd/', v3: '/meɪd/' },
    pronunciationSk: { v1: 'mejk', v2: 'mejd', v3: 'mejd' },
    translationSk: 'vyrobiť, urobiť',
    otherMeaningsSk: 'pripraviť (kávu), prinútiť, urobiť chybu',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '„Make“ sa používa najmä vtedy, keď niečo tvoríme, vyrábame rukami, varíme alebo spôsobujeme (make coffee, make a mistake, make a decision).',
      formsGuide: {
        v1: 'make = urobiť / vyrobiť. V -ing tvare odpadá nemé -e: making.',
        v2: 'made = vyrobil som, urobil som.',
        v3: 'made = vyrobený (známe „Made in Slovakia“) alebo v predprítomnom čase po have/has.',
      },
      tipSk:
        'Kedy „make“ a kedy „do“? Tvorba/výsledok = make (make a cake, make money, make a mistake). Činnosť/práca = do (do homework, do the shopping).',
    },
    examples: {
      v1: {
        en: 'Can you make some tea?',
        sk: 'Môžeš urobiť čaj?',
        note: 'Po modálnom can ide základný tvar „make“.',
      },
      v2: {
        en: 'He made a silly mistake in the test.',
        sk: 'Urobil v teste hlúpu chybu.',
        note: 'Ustálené spojenie „make a mistake“ v 2. tvare „made“.',
      },
      v3: {
        en: 'This table is made of oak wood.',
        sk: 'Tento stôl je vyrobený z dubového dreva.',
        note: 'Trpný rod „is + 3. tvar made“.',
      },
      questionNeg: {
        en: "Won't you make breakfast for us?",
        sk: 'Nepripravíš nám raňajky?',
        note: 'Záporná otázka v budúcom čase s won’t + 1. tvar „make“.',
      },
    },
    sentenceGap: {
      sentence: 'Who ____ this delicious cake?',
      targetForm: 'v2',
      translationSk: 'Kto upiekol / urobil tento chutný koláč?',
      whySk: 'Otázka na podmet (Who) v minulosti nepoužíva did, preto dáme priamo 2. tvar „made“.',
    },
  },
  {
    id: 'know',
    v1: 'know',
    v2: 'knew',
    v3: 'known',
    thirdPerson: 'knows',
    ingForm: 'knowing',
    ipa: { v1: '/nəʊ/', v2: '/njuː/', v3: '/nəʊn/' },
    pronunciationSk: { v1: 'nou', v2: 'njú', v3: 'noun' },
    translationSk: 'vedieť, poznať',
    otherMeaningsSk: 'ovládať (jazyk), poznať človeka',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Prvé písmeno „k“ je úplne nemé — vyslovujeme ho tak, akoby tam ani nebolo! V angličtine spája slovenské „vedieť“ (fakty) aj „poznať“ (ľudí/miesta).',
      formsGuide: {
        v1: 'know [nou] = viem, poznám. Zvyčajne sa nepoužíva v priebehovom čase (-ing).',
        v2: 'knew [njú] = vedel som, poznal som.',
        v3: 'known [noun] = známy / poznal som (napr. well-known = dobre známy).',
      },
      tipSk:
        'Nezabudni: na začiatku slova sa kombinácia „kn-“ vždy číta len ako [n] — rovnako ako pri „knife“ alebo „knee“.',
    },
    examples: {
      v1: {
        en: 'I know the answer!',
        sk: 'Viem odpoveď!',
        note: 'Prítomný jednoduchý čas = 1. tvar „know“.',
      },
      v2: {
        en: 'She knew everyone at the party.',
        sk: 'Poznala na oslave každého.',
        note: 'Minulý čas = 2. tvar „knew“.',
      },
      v3: {
        en: 'I have known Peter since childhood.',
        sk: 'Petra poznám už od detstva.',
        note: 'Stav trvajúci dodnes -> have + 3. tvar „known“.',
      },
      questionNeg: {
        en: "Don't you know where he lives?",
        sk: 'Ty nevieš, kde býva?',
        note: 'Záporná otázka s prekvapením v prítomnom čase.',
      },
    },
    sentenceGap: {
      sentence: 'He has ____ about the problem for weeks.',
      targetForm: 'v3',
      translationSk: 'O tom probléme vie už celé týždne.',
      whySk: 'Po „has“ v predprítomnom čase nasleduje 3. tvar „known“.',
    },
  },
  {
    id: 'think',
    v1: 'think',
    v2: 'thought',
    v3: 'thought',
    thirdPerson: 'thinks',
    ingForm: 'thinking',
    ipa: { v1: '/θɪŋk/', v2: '/θɔːt/', v3: '/θɔːt/' },
    pronunciationSk: { v1: 'θink', v2: 'θót', v3: 'θót' },
    translationSk: 'myslieť, premýšľať',
    otherMeaningsSk: 'domnievať sa, mať názor',
    level: 'A1',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „-ought“, kde sa koniec slova píše „-ought“, ale vyslovuje sa len dlhé [ót] (písmená gh sú nemé). Začiatočné „th“ vyslovujeme so špičkou jazyka medzi zubami.',
      formsGuide: {
        v1: 'think = myslím / premýšľam (ako názor bez -ing: I think so; ako proces premýšľania môže mať -ing: I am thinking).',
        v2: 'thought [θót] = myslel som si, premýšľal som.',
        v3: 'thought [θót] = rovnaký tvar ako V2 (po have/has: Have you thought about it?).',
      },
      tipSk:
        'Slová s „-ought“ (think -> thought, buy -> bought, bring -> brought) majú rovnakú výslovnosť koncovky [-ót] a rovnaký 2. aj 3. tvar!',
    },
    examples: {
      v1: {
        en: 'What do you think about this plan?',
        sk: 'Čo si myslíš o tomto pláne?',
        note: 'Vyjadrenie názoru v prítomnom čase.',
      },
      v2: {
        en: 'I thought the exam was easy.',
        sk: 'Myslel som si, že skúška bola ľahká.',
        note: 'Minulý čas = 2. tvar „thought“.',
      },
      v3: {
        en: 'Have you thought about your future?',
        sk: 'Premýšľal si už o svojej budúcnosti?',
        note: 'Have + podmet + 3. tvar „thought“.',
      },
      questionNeg: {
        en: "Didn't you think about calling me?",
        sk: 'Nenapadlo ti / nemyslel si na to, že by si mi zavolal?',
        note: 'Záporná otázka v minulosti: didn’t + 1. tvar „think“.',
      },
    },
    sentenceGap: {
      sentence: 'I ____ it was going to rain, so I took an umbrella.',
      targetForm: 'v2',
      translationSk: 'Myslel som si, že bude pršať, tak som si vzal dáždnik.',
      whySk: 'Dej sa stal v minulosti („took“), preto použijeme 2. tvar „thought“.',
    },
  },
  {
    id: 'take',
    v1: 'take',
    v2: 'took',
    v3: 'taken',
    thirdPerson: 'takes',
    ingForm: 'taking',
    ipa: { v1: '/teɪk/', v2: '/tʊk/', v3: '/ˈteɪkən/' },
    pronunciationSk: { v1: 'tejk', v2: 'tuk', v3: 'tejkn' },
    translationSk: 'vziať, zobrať, trvať',
    otherMeaningsSk: 'odfotiť (take a photo), ísť dopravou (take a bus)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Všetky tri tvary sú odlišné (vzor A-B-C). Používa sa nielen pre „zobrať do ruky“, ale aj pre trvanie času (It takes 10 minutes), fotenie či cestovanie autobusom.',
      formsGuide: {
        v1: 'take = vziať / beriem. V priebehovom čase odpadá -e -> taking.',
        v2: 'took [tuk] = vzal som, zobral som, trvalo to.',
        v3: 'taken [tejkn] = vzatý / zobraný (po have/has alebo v trpnom rode: This seat is taken = Toto miesto je obsadené).',
      },
      tipSk:
        'Pozor na predložku času: „How long did it take?“ = Ako dlho to trvalo? (Po did vždy 1. tvar „take“).',
    },
    examples: {
      v1: {
        en: 'It takes twenty minutes by train.',
        sk: 'Vlakom to trvá dvadsať minút.',
        note: 'Všeobecný fakt v 3. osobe „It takes“.',
      },
      v2: {
        en: 'She took a lot of photos in Rome.',
        sk: 'V Ríme urobila veľa fotiek.',
        note: 'Ustálené spojenie „take photos“ v 2. tvare „took“.',
      },
      v3: {
        en: 'Someone has taken my umbrella.',
        sk: 'Niekto si vzal môj dáždnik.',
        note: 'Výsledok v prítomnosti: has + 3. tvar „taken“.',
      },
      questionNeg: {
        en: "Didn't he take his medicine this morning?",
        sk: 'Nevzal si dnes ráno lieky?',
        note: 'Záporná otázka s didn’t + 1. tvar „take“.',
      },
    },
    sentenceGap: {
      sentence: 'All the tickets have already been ____.',
      targetForm: 'v3',
      translationSk: 'Všetky lístky už boli rozobraté.',
      whySk: 'Trpný rod v predprítomnom čase (have been + V3) vyžaduje „taken“.',
    },
  },
  {
    id: 'see',
    v1: 'see',
    v2: 'saw',
    v3: 'seen',
    thirdPerson: 'sees',
    ingForm: 'seeing',
    ipa: { v1: '/siː/', v2: '/sɔː/', v3: '/siːn/' },
    pronunciationSk: { v1: 'sí', v2: 'só', v3: 'sín' },
    translationSk: 'vidieť',
    otherMeaningsSk: 'stretnúť sa s niekým, chápať (I see)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Všetky tri tvary sa líšia: see – saw – seen. Zaujímavé je, že „saw“ ako podstatné meno znamená „píla“, ale ako sloveso je to minulý čas od „vidieť“ a číta sa dlhé [só].',
      formsGuide: {
        v1: 'see [sí] = vidím / vidieť. Ako schopnosť zraku sa nedáva do -ing (nie „I am seeing a bird“).',
        v2: 'saw [só] = videl som.',
        v3: 'seen [sín] = videl (v skúsenosti: I have never seen that = Nikdy som to nevidel).',
      },
      tipSk:
        'Rozdiel „see“ vs „watch“ vs „look at“: see = prirodzene vidieť očami; look at = cielene sa pozrieť; watch = sledovať pohyb (film, zápas).',
    },
    examples: {
      v1: {
        en: 'I can see the mountains from my window.',
        sk: 'Z okna vidím hory.',
        note: 'Po modálnom can nasleduje 1. tvar „see“.',
      },
      v2: {
        en: 'We saw a great film yesterday.',
        sk: 'Včera sme videli skvelý film.',
        note: 'Minulý čas = 2. tvar „saw“.',
      },
      v3: {
        en: 'Have you seen my keys anywhere?',
        sk: 'Nevidel si niekde moje kľúče?',
        note: 'Predprítomná otázka s Have + podmet + 3. tvar „seen“.',
      },
      questionNeg: {
        en: "Didn't you see the red light?",
        sk: 'Nevidel si červené svetlo?',
        note: 'Záporná otázka s didn’t + 1. tvar „see“.',
      },
    },
    sentenceGap: {
      sentence: 'That is the best movie I have ever ____.',
      targetForm: 'v3',
      translationSk: 'To je najlepší film, aký som kedy videl.',
      whySk: 'Po „have ever“ dávame vždy 3. tvar „seen“.',
    },
  },
  {
    id: 'come',
    v1: 'come',
    v2: 'came',
    v3: 'come',
    thirdPerson: 'comes',
    ingForm: 'coming',
    ipa: { v1: '/kʌm/', v2: '/keɪm/', v3: '/kʌm/' },
    pronunciationSk: { v1: 'kam', v2: 'kejm', v3: 'kam' },
    translationSk: 'prísť',
    otherMeaningsSk: 'pochádzať (come from)',
    level: 'A1',
    pattern: 'ABA',
    slovakExplanation: {
      summary:
        'Klasický vzor A-B-A: 1. a 3. tvar sú úplne rovnaké („come“), mení sa len stredný minulý tvar na „came“!',
      formsGuide: {
        v1: 'come [kam] = prídem / prichádzam. V -ing tvare odpadá nemé -e: coming.',
        v2: 'came [kejm] = prišiel som.',
        v3: 'come [kam] = rovnaké ako V1! Používa sa po have/has (Spring has come = Prišla jar).',
      },
      tipSk:
        'Pozor na chybu Slovákov: do predprítomného času po „has/have“ nepatrí „came“, ale 3. tvar „come“ („She has just come“ = Práve prišla).',
    },
    examples: {
      v1: {
        en: 'Come here for a second, please.',
        sk: 'Poď sem na chvíľku, prosím.',
        note: 'Rozkazovací spôsob používa 1. tvar „come“.',
      },
      v2: {
        en: 'He came home late last night.',
        sk: 'Včera večer prišiel domov neskoro.',
        note: '2. tvar „came“ v minulom jednoduchom čase.',
      },
      v3: {
        en: 'Has the mailman come yet?',
        sk: 'Už prišiel poštár?',
        note: 'Po Has nasleduje 3. tvar „come“ (nie came!).',
      },
      questionNeg: {
        en: "Aren't you coming to the party tonight?",
        sk: 'Nejdeš / neprídeš dnes večer na oslavu?',
        note: 'Záporná otázka v priebehovom čase pre plány do budúcnosti.',
      },
    },
    sentenceGap: {
      sentence: 'All my friends ____ to my birthday party last Saturday.',
      targetForm: 'v2',
      translationSk: 'Minulú sobotu prišli na moju narodeninovú oslavu všetci kamaráti.',
      whySk: '„Last Saturday“ znamená ukončenú minulosť -> 2. tvar „came“.',
    },
  },
  {
    id: 'give',
    v1: 'give',
    v2: 'gave',
    v3: 'given',
    thirdPerson: 'gives',
    ingForm: 'giving',
    ipa: { v1: '/ɡɪv/', v2: '/ɡeɪv/', v3: '/ˈɡɪvn/' },
    pronunciationSk: { v1: 'giv', v2: 'gejv', v3: 'givn' },
    translationSk: 'dať, darovať',
    otherMeaningsSk: 'odovzdať, poskytnúť (give advice)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor A-B-C so zmenou samohlásky i -> a -> i+en. Vo význame „dať niekomu niečo“ má poradie: give + komu + čo (Give me the book).',
      formsGuide: {
        v1: 'give = dám / dávať. V -ing tvare odpadá koncové -e -> giving.',
        v2: 'gave = dal som.',
        v3: 'given = daný / dal (po have/has alebo v trpnom rode: I was given a prize = Dostal som cenu).',
      },
      tipSk:
        'Väzba „I was given...“ sa do slovenčiny prekladá aktívne ako „Dostal som...“ alebo „Dali mi...“ (doslova: bol som obdarovaný).',
    },
    examples: {
      v1: {
        en: 'Please give me your pen.',
        sk: 'Prosím, daj mi svoje pero.',
        note: '1. tvar „give“ + komu (me) + čo (your pen).',
      },
      v2: {
        en: 'They gave us a warm welcome.',
        sk: 'Srdečne nás privítali (dali nám vrúcne privítanie).',
        note: '2. tvar „gave“ v minulom čase.',
      },
      v3: {
        en: 'She has given me good advice.',
        sk: 'Dala mi dobrú radu.',
        note: 'Has + 3. tvar „given“ (advice je nepočítateľné, bez „an“).',
      },
      questionNeg: {
        en: "Didn't they give you a receipt?",
        sk: 'Nedali ti pokladničný blok?',
        note: 'Záporná otázka: didn’t + podmet + 1. tvar „give“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ up smoking two years ago.',
      targetForm: 'v2',
      translationSk: 'Pred dvoma rokmi prestala fajčiť.',
      whySk: '„Two years ago“ označuje minulosť, použijeme 2. tvar „gave“ (frázové sloveso give up).',
    },
  },
  {
    id: 'find',
    v1: 'find',
    v2: 'found',
    v3: 'found',
    thirdPerson: 'finds',
    ingForm: 'finding',
    ipa: { v1: '/faɪnd/', v2: '/faʊnd/', v3: '/faʊnd/' },
    pronunciationSk: { v1: 'fajnd', v2: 'faund', v3: 'faund' },
    translationSk: 'nájsť',
    otherMeaningsSk: 'zistiť, považovať niečo za (I find it easy)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. a 3. tvar sú zhodné („found“). Pozor: existuje aj samostatné pravidelné sloveso „found – founded“ s významom „založiť firmu/mesto“!',
      formsGuide: {
        v1: 'find [fajnd] = nájdem / hľadám výsledok (nie samotné hľadanie — to je look for).',
        v2: 'found [faund] = našiel som.',
        v3: 'found [faund] = nájdený / našiel (po have/has).',
      },
      tipSk:
        'Nezamieňaj „look for“ (hľadať) a „find“ (nájsť): „I looked for my keys and finally found them.“',
    },
    examples: {
      v1: {
        en: 'I find English grammar logical.',
        sk: 'Anglická gramatika sa mi zdá logická.',
        note: 'Význam „považovať za“ v prítomnom čase.',
      },
      v2: {
        en: 'We found a wallet on the street.',
        sk: 'Našli sme na ulici peňaženku.',
        note: 'Minulý čas = 2. tvar „found“.',
      },
      v3: {
        en: 'Have you found a new job yet?',
        sk: 'Už si si našiel novú prácu?',
        note: 'Have + podmet + 3. tvar „found“.',
      },
      questionNeg: {
        en: "Didn't you find the information you needed?",
        sk: 'Nenašiel si informácie, ktoré si potreboval?',
        note: 'Záporná otázka s didn’t + 1. tvar „find“.',
      },
    },
    sentenceGap: {
      sentence: 'Scientists have ____ a solution to the problem.',
      targetForm: 'v3',
      translationSk: 'Vedci našli riešenie tohto problému.',
      whySk: 'Po pomocnom „have“ nasleduje 3. tvar „found“.',
    },
  },
  {
    id: 'tell',
    v1: 'tell',
    v2: 'told',
    v3: 'told',
    thirdPerson: 'tells',
    ingForm: 'telling',
    ipa: { v1: '/tel/', v2: '/təʊld/', v3: '/təʊld/' },
    pronunciationSk: { v1: 'tel', v2: 'tould', v3: 'tould' },
    translationSk: 'povedať (niekomu), rozprávať',
    otherMeaningsSk: 'rozlíšiť (tell the difference), povedať pravdu',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Na rozdiel od „say“ sa po „tell“ takmer vždy uvádza osoba, ktorej niečo hovoríme (bez predložky „to“!): tell me, tell her, tell the children.',
      formsGuide: {
        v1: 'tell = povedať niekomu / rozprávať (tell a story, tell the truth).',
        v2: 'told [tould] = povedal som niekomu.',
        v3: 'told [tould] = povedaný / povedal (I was told = Bolo mi povedané).',
      },
      tipSk:
        'Výnimky bez osoby pri „tell“: tell the truth (povedať pravdu), tell a lie (klamať), tell a story (rozprávať príbeh), tell the time (povedať, koľko je hodín).',
    },
    examples: {
      v1: {
        en: 'Can you tell me the time?',
        sk: 'Môžeš mi povedať, koľko je hodín?',
        note: 'Po tell ide hneď osoba „me“ bez „to“.',
      },
      v2: {
        en: 'He told me the whole story.',
        sk: 'Povedal mi celý príbeh.',
        note: 'Minulý čas = 2. tvar „told“.',
      },
      v3: {
        en: 'I have told you many times!',
        sk: 'Povedal som ti to už veľakrát!',
        note: 'Predprítomný čas = have + 3. tvar „told“.',
      },
      questionNeg: {
        en: "Didn't she tell you about the change?",
        sk: 'Nepovedala ti o tej zmene?',
        note: 'Záporná otázka s didn’t + 1. tvar „tell“.',
      },
    },
    sentenceGap: {
      sentence: 'Wait, I was never ____ about this meeting.',
      targetForm: 'v3',
      translationSk: 'Počkaj, o tomto stretnutí mi nikdy nepovedali.',
      whySk: 'Trpný rod „was + V3“ si vyžaduje 3. tvar „told“.',
    },
  },
  {
    id: 'become',
    v1: 'become',
    v2: 'became',
    v3: 'become',
    thirdPerson: 'becomes',
    ingForm: 'becoming',
    ipa: { v1: '/bɪˈkʌm/', v2: '/bɪˈkeɪm/', v3: '/bɪˈkʌm/' },
    pronunciationSk: { v1: 'bikam', v2: 'bikejm', v3: 'bikam' },
    translationSk: 'stať sa',
    otherMeaningsSk: 'premeniť sa na, začať byť',
    level: 'A2',
    pattern: 'ABA',
    slovakExplanation: {
      summary:
        'Správa sa presne ako sloveso „come“, len má predponu be-. Vzor A-B-A: 1. a 3. tvar sú zhodné („become“).',
      formsGuide: {
        v1: 'become = stanem sa / stávať sa. V -ing tvare bez -e: becoming.',
        v2: 'became = stal som sa.',
        v3: 'become = stal sa (po have/has, napr. It has become popular).',
      },
      tipSk:
        'Pozor na falošného priateľa! „Become“ neznamená „dostať“, ale „stať sa“ (povolaním, vlastnosťou). Dostať je „get“ alebo „receive“.',
    },
    examples: {
      v1: {
        en: 'She wants to become a doctor.',
        sk: 'Chce sa stať lekárkou.',
        note: 'Po wants to ide neurčitok „become“.',
      },
      v2: {
        en: 'They became best friends in high school.',
        sk: 'Na strednej škole sa stali najlepšími priateľmi.',
        note: '2. tvar „became“ pre ukončený dej v minulosti.',
      },
      v3: {
        en: 'Electric cars have become much more common.',
        sk: 'Elektromobily sa stali oveľa bežnejšími.',
        note: 'Have + 3. tvar „become“ (rovnako ako V1).',
      },
      questionNeg: {
        en: "Hasn't it become too expensive?",
        sk: 'Nestalo sa to už príliš drahým?',
        note: 'Záporná predprítomná otázka s Hasn’t + 3. tvar „become“.',
      },
    },
    sentenceGap: {
      sentence: 'In 2004, Slovakia ____ a member of the European Union.',
      targetForm: 'v2',
      translationSk: 'V roku 2004 sa Slovensko stalo členom Európskej únie.',
      whySk: 'Konkrétny rok v minulosti -> 2. tvar „became“.',
    },
  },
  {
    id: 'leave',
    v1: 'leave',
    v2: 'left',
    v3: 'left',
    thirdPerson: 'leaves',
    ingForm: 'leaving',
    ipa: { v1: '/liːv/', v2: '/left/', v3: '/left/' },
    pronunciationSk: { v1: 'lív', v2: 'left', v3: 'left' },
    translationSk: 'odísť, nechať',
    otherMeaningsSk: 'opustiť, zabudnúť niečo niekde (leave keys at home)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Má dva hlavné významy: 1) odísť z miesta (leave home, leave Bratislava), 2) nechať alebo zabudnúť niečo na mieste (leave a bag on the train).',
      formsGuide: {
        v1: 'leave [lív] = odchádzam / odísť. Pozor: „live“ [liv] znamená žiť/bývať, „leave“ [lív] má dlhé í!',
        v2: 'left = odišiel som, nechal som.',
        v3: 'left = odídený / zostávajúci (There is no milk left = Nezostalo žiadne mlieko).',
      },
      tipSk:
        'Ak chceš povedať, že si si niečo niekde zabudol (a vieš kde), v angličtine použi „I left my phone at home“ (nie forget!).',
    },
    examples: {
      v1: {
        en: 'The train leaves at 8:15.',
        sk: 'Vlak odchádza o 8:15.',
        note: 'Cestovný poriadok v prítomnom jednoduchom čase.',
      },
      v2: {
        en: 'I left my jacket in the office.',
        sk: 'Nechal som si bundu v kancelárii.',
        note: '2. tvar „left“ v minulosti.',
      },
      v3: {
        en: 'She has already left the building.',
        sk: 'Už opustila budovu.',
        note: 'Has + already + 3. tvar „left“.',
      },
      questionNeg: {
        en: "Didn't you leave a message for him?",
        sk: 'Nenechal si mu odkaz?',
        note: 'Záporná otázka s didn’t + 1. tvar „leave“.',
      },
    },
    sentenceGap: {
      sentence: 'Hurry up, our bus is ____ in five minutes!',
      targetForm: 'ingForm',
      translationSk: 'Ponáhľaj sa, náš autobus odchádza o päť minút!',
      whySk: 'Blízky naplánovaný odchod po „is“ tvorí „leaving“ (odpadá nemé -e).',
    },
  },
  {
    id: 'feel',
    v1: 'feel',
    v2: 'felt',
    v3: 'felt',
    thirdPerson: 'feels',
    ingForm: 'feeling',
    ipa: { v1: '/fiːl/', v2: '/felt/', v3: '/felt/' },
    pronunciationSk: { v1: 'fíl', v2: 'felt', v3: 'felt' },
    translationSk: 'cítiť, cítiť sa',
    otherMeaningsSk: 'dotýkať sa, mať pocit',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'V slovenčine pridávame „sa“ (cítim sa dobre), ale v angličtine sa „myself/yourself“ NEPOUŽÍVA! Stačí „I feel good“ alebo „How do you feel?“.',
      formsGuide: {
        v1: 'feel [fíl] = cítim (sa). S prídavným menom bez príslovky: feel bad (nie feel badly).',
        v2: 'felt = cítil som (sa).',
        v3: 'felt = cítil (po have/has: I have never felt happier).',
      },
      tipSk:
        'Pri otázkach o pocite môžete použiť obyčajný aj priebehový čas: „How do you feel?“ aj „How are you feeling?“ sú správne.',
    },
    examples: {
      v1: {
        en: 'I feel much better today.',
        sk: 'Dnes sa cítim oveľa lepšie.',
        note: 'Bez zvratného „myself“ — len I feel + prídavné meno.',
      },
      v2: {
        en: 'She felt nervous before the interview.',
        sk: 'Pred pohovorom sa cítila nervózna.',
        note: 'Minulý čas = 2. tvar „felt“.',
      },
      v3: {
        en: 'Have you ever felt completely lost?',
        sk: 'Cítil si sa niekedy úplne stratený?',
        note: 'Predprítomný čas = Have + ever + 3. tvar „felt“.',
      },
      questionNeg: {
        en: "Don't you feel cold without a coat?",
        sk: 'Nie je ti zima bez kabáta?',
        note: 'Záporná otázka v prítomnosti s don’t + feel.',
      },
    },
    sentenceGap: {
      sentence: 'After the long walk, everyone ____ exhausted.',
      targetForm: 'v2',
      translationSk: 'Po dlhej prechádzke sa všetci cítili vyčerpaní.',
      whySk: 'Ukončená udalosť v minulosti -> 2. tvar „felt“.',
    },
  },
  {
    id: 'put',
    v1: 'put',
    v2: 'put',
    v3: 'put',
    thirdPerson: 'puts',
    ingForm: 'putting',
    ipa: { v1: '/pʊt/', v2: '/pʊt/', v3: '/pʊt/' },
    pronunciationSk: { v1: 'put', v2: 'put', v3: 'put' },
    translationSk: 'položiť, dať',
    otherMeaningsSk: 'obliecť si (put on), odložiť (put off)',
    level: 'A1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Patrí do príjemnej skupiny A-A-A, kde sa všetky tri tvary píšu aj vyslovujú rovnako! Či ide o prítomnosť alebo minulosť, rozpoznáme podľa času vety alebo pomocného slovesa.',
      formsGuide: {
        v1: 'put = položím / položiť. V -ing tvare zdvojujeme t: putting.',
        v2: 'put = položil som (napr. Yesterday I put it on the desk).',
        v3: 'put = položený / položil (po have/has).',
      },
      tipSk:
        'Pozor: ak má podmet „he/she/it“ tvar „put“ BEZ -s (napr. „He put the book there“), je to jasný signál, že veta je v MINULOM čase!',
    },
    examples: {
      v1: {
        en: 'Where do you usually put your keys?',
        sk: 'Kam si zvyčajne kladieš kľúče?',
        note: 'Zvyk v prítomnom čase.',
      },
      v2: {
        en: 'He put his phone in his pocket.',
        sk: 'Dal si telefón do vrecka.',
        note: 'Bez -s pri „he“ -> ide o 2. tvar „put“ (minulý čas)!',
      },
      v3: {
        en: 'Someone has put salt in my coffee!',
        sk: 'Niekto mi dal do kávy soľ!',
        note: 'Has + 3. tvar „put“.',
      },
      questionNeg: {
        en: "Didn't you put the milk back in the fridge?",
        sk: 'Nedala si mlieko späť do chladničky?',
        note: 'Záporná otázka v minulosti: didn’t + put.',
      },
    },
    sentenceGap: {
      sentence: 'She is ____ on her jacket because we are leaving.',
      targetForm: 'ingForm',
      translationSk: 'Oblieka si bundu, pretože odchádzame.',
      whySk: 'Krátka slabika spoluhláska-samohláska-spoluhláska zdvojuje t: „putting“.',
    },
  },
  {
    id: 'bring',
    v1: 'bring',
    v2: 'brought',
    v3: 'brought',
    thirdPerson: 'brings',
    ingForm: 'bringing',
    ipa: { v1: '/brɪŋ/', v2: '/brɔːt/', v3: '/brɔːt/' },
    pronunciationSk: { v1: 'bring', v2: 'brót', v3: 'brót' },
    translationSk: 'priniesť, priviesť',
    otherMeaningsSk: 'spôsobiť',
    level: 'A1',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Rovnako ako think -> thought, aj „bring“ tvorí 2. a 3. tvar pomocou koncovky -ought [brót]. Znamená niesť niečo SMEROM K hovoriacemu (priniesť sem).',
      formsGuide: {
        v1: 'bring = prinesiem / priniesť (smer sem).',
        v2: 'brought [brót] = priniesol som (2. tvar).',
        v3: 'brought [brót] = prinesený / priniesol (3. tvar po have/has).',
      },
      tipSk:
        'Nepleťte si „brought“ (od bring = priniesť, s r) a „bought“ (od buy = kúpiť, bez r)!',
    },
    examples: {
      v1: {
        en: 'Please bring your ID card tomorrow.',
        sk: 'Prosím, prines si zajtra občiansky preukaz.',
        note: '1. tvar „bring“ v rozkazovacom spôsobe.',
      },
      v2: {
        en: 'They brought flowers to their teacher.',
        sk: 'Priniesli svojej učiteľke kvety.',
        note: '2. tvar „brought“ v minulosti.',
      },
      v3: {
        en: 'Look what the cat has brought in!',
        sk: 'Pozri, čo mačka priniesla dnu!',
        note: 'Has + 3. tvar „brought“.',
      },
      questionNeg: {
        en: "Didn't you bring an umbrella with you?",
        sk: 'Nepriniesol si si so sebou dáždnik?',
        note: 'Záporná otázka s didn’t + 1. tvar „bring“.',
      },
    },
    sentenceGap: {
      sentence: 'Thank you for the gift you ____ me yesterday.',
      targetForm: 'v2',
      translationSk: 'Ďakujem za darček, ktorý si mi včera priniesol.',
      whySk: '„Yesterday“ ukazuje na minulý čas -> 2. tvar „brought“.',
    },
  },
  {
    id: 'begin',
    v1: 'begin',
    v2: 'began',
    v3: 'begun',
    thirdPerson: 'begins',
    ingForm: 'beginning',
    ipa: { v1: '/bɪˈɡɪn/', v2: '/bɪˈɡæn/', v3: '/bɪˈɡʌn/' },
    pronunciationSk: { v1: 'bigin', v2: 'bigen', v3: 'bigan' },
    translationSk: 'začať',
    otherMeaningsSk: 'pustiť sa do niečoho',
    level: 'A2',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Krásny vzor „i – a – u“ (ako sing-sang-sung alebo drink-drank-drunk). Je trochu formálnejšie než synonymum „start“ (ktoré je pravidelné: start-started).',
      formsGuide: {
        v1: 'begin = začnem / začínať. V -ing tvare sa zdvojuje koncové n: beginning.',
        v2: 'began = začal som (2. tvar s „a“).',
        v3: 'begun = začal / začatý (3. tvar s „u“ po have/has).',
      },
      tipSk:
        'Zapamätaj si trojzvuk „i – a – u“: begin [i] – began [e] – begun [a]. Po „begin“ môže ísť „to do“ aj „doing“.',
    },
    examples: {
      v1: {
        en: 'The concert begins at eight.',
        sk: 'Koncert sa začína o ôsmej.',
        note: '3. osoba jednotného čísla s -s: begins.',
      },
      v2: {
        en: 'It suddenly began to rain.',
        sk: 'Zrazu začalo pršať.',
        note: 'Minulý čas = 2. tvar „began“.',
      },
      v3: {
        en: 'The new school year has already begun.',
        sk: 'Nový školský rok sa už začal.',
        note: 'Has + already + 3. tvar „begun“.',
      },
      questionNeg: {
        en: "Hasn't the film begun yet?",
        sk: 'Ešte sa ten film nezačal?',
        note: 'Záporná predprítomná otázka s Hasn’t + 3. tvar „begun“.',
      },
    },
    sentenceGap: {
      sentence: 'We ____ our trip early in the morning.',
      targetForm: 'v2',
      translationSk: 'Našu cestu sme začali skoro ráno.',
      whySk: 'Rozprávanie o minulom výlete -> 2. tvar „began“.',
    },
  },
  {
    id: 'keep',
    v1: 'keep',
    v2: 'kept',
    v3: 'kept',
    thirdPerson: 'keeps',
    ingForm: 'keeping',
    ipa: { v1: '/kiːp/', v2: '/kept/', v3: '/kept/' },
    pronunciationSk: { v1: 'kíp', v2: 'kept', v3: 'kept' },
    translationSk: 'nechať si, držať, dodržať',
    otherMeaningsSk: 'udržiavať, pokračovať v niečom (keep going)',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Dlhá samohláska „ee“ [í] sa v 2. a 3. tvare skracuje na krátke „e“ a pridáva sa -t („kept“). Rovnaký vzor má aj sleep-slept a feel-felt.',
      formsGuide: {
        v1: 'keep [kíp] = nechať si / udržiavať (keep a promise = dodržať sľub; keep + -ing = robiť niečo ďalej).',
        v2: 'kept = nechal som si, dodržal som.',
        v3: 'kept = udržaný / nechal si (po have/has).',
      },
      tipSk:
        'Skvelá fráza do života: „Keep the change!“ = Zvyšok si nechajte! (v reštaurácii/taxíku).',
    },
    examples: {
      v1: {
        en: 'Keep practicing every day!',
        sk: 'Pokračuj v precvičovaní každý deň!',
        note: 'Po „keep“ ide vždy tvar s -ing (keep + -ing = robiť ďalej).',
      },
      v2: {
        en: 'She kept her promise and helped us.',
        sk: 'Dodržala svoj sľub a pomohla nám.',
        note: 'Minulý čas = 2. tvar „kept“.',
      },
      v3: {
        en: 'He has kept all her letters.',
        sk: 'Odložil / nechal si všetky jej listy.',
        note: 'Has + 3. tvar „kept“.',
      },
      questionNeg: {
        en: "Didn't you keep the receipt?",
        sk: 'Nenechal si si účtenku?',
        note: 'Záporná otázka s didn’t + 1. tvar „keep“.',
      },
    },
    sentenceGap: {
      sentence: 'These apples should be ____ in a cool place.',
      targetForm: 'v3',
      translationSk: 'Tieto jablká by sa mali skladovať na chladnom mieste.',
      whySk: 'Trpný rod po „should be“ vyžaduje 3. tvar „kept“.',
    },
  },
  {
    id: 'write',
    v1: 'write',
    v2: 'wrote',
    v3: 'written',
    thirdPerson: 'writes',
    ingForm: 'writing',
    ipa: { v1: '/raɪt/', v2: '/rəʊt/', v3: '/ˈrɪtn/' },
    pronunciationSk: { v1: 'rajt', v2: 'rout', v3: 'ritn' },
    translationSk: 'písať, napísať',
    otherMeaningsSk: 'napísať správu, zložiť (pieseň)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Začiatočné „w“ v skupine „wr-“ sa NIKDY nevyslovuje! Pozor na pravopis: v 1. a 2. tvare je jedno „t“, ale v 3. tvare „written“ sú DVE „tt“ a číta sa krátke [ritn].',
      formsGuide: {
        v1: 'write [rajt] = píšem / písať. V -ing tvare odpadá -e a je jedno t: writing (nie writting!).',
        v2: 'wrote [rout] = napísal som.',
        v3: 'written [ritn] = napísaný / napísal (dvojité tt!).',
      },
      tipSk:
        'Pozor na častý omyl: writing (jedno t), ale written (dve t)! Rovnako to funguje pri drive-drove-driven (jedno v) vs write-wrote-written (dve t).',
    },
    examples: {
      v1: {
        en: 'I write notes in my notebook.',
        sk: 'Píšem si poznámky do zošita.',
        note: 'Prítomný jednoduchý čas = 1. tvar „write“.',
      },
      v2: {
        en: 'She wrote a long email to her boss.',
        sk: 'Napísala svojmu šéfovi dlhý e-mail.',
        note: '2. tvar „wrote“ v minulosti.',
      },
      v3: {
        en: 'This book was written in 1998.',
        sk: 'Táto kniha bola napísaná v roku 1998.',
        note: 'Trpný rod „was + 3. tvar written“.',
      },
      questionNeg: {
        en: "Haven't you written the report yet?",
        sk: 'Ešte si nenapísal tú správu?',
        note: 'Záporná otázka v predprítomnom čase: Haven’t + podmet + 3. tvar „written“.',
      },
    },
    sentenceGap: {
      sentence: 'How many pages have you ____ so far?',
      targetForm: 'v3',
      translationSk: 'Koľko strán si zatiaľ napísal?',
      whySk: 'V otázke s „have“ potrebujeme 3. tvar „written“.',
    },
  },
  {
    id: 'stand',
    v1: 'stand',
    v2: 'stood',
    v3: 'stood',
    thirdPerson: 'stands',
    ingForm: 'standing',
    ipa: { v1: '/stænd/', v2: '/stʊd/', v3: '/stʊd/' },
    pronunciationSk: { v1: 'stend', v2: 'stud', v3: 'stud' },
    translationSk: 'stáť',
    otherMeaningsSk: 'zniesť / vystáť (can’t stand), stáť si za niečím',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Sloveso „stand“ má rovnaký 2. a 3. tvar („stood“ [stud]). Rovnako sa časuje aj „understand -> understood“!',
      formsGuide: {
        v1: 'stand = stojím / stáť (stand up = postaviť sa).',
        v2: 'stood = stál som.',
        v3: 'stood = stál (po have/has).',
      },
      tipSk:
        'Keď si zapamätáš stand – stood – stood, automaticky vieš aj understand – understood – understood!',
    },
    examples: {
      v1: {
        en: 'Please stand up when the judge enters.',
        sk: 'Prosím, postavte sa, keď vstúpi sudca.',
        note: '1. tvar „stand“.',
      },
      v2: {
        en: 'We stood in line for an hour.',
        sk: 'Stáli sme v rade hodinu.',
        note: 'Minulý čas = 2. tvar „stood“.',
      },
      v3: {
        en: 'This castle has stood here for centuries.',
        sk: 'Tento hrad tu stojí už stáročia.',
        note: 'Has + 3. tvar „stood“ pre dej od minulosti dodnes.',
      },
      questionNeg: {
        en: "Why didn't you stand closer to the stage?",
        sk: 'Prečo si nestál bližšie k pódiu?',
        note: 'Záporná otázka s didn’t + 1. tvar „stand“.',
      },
    },
    sentenceGap: {
      sentence: 'Nobody ____ up when the alarm went off.',
      targetForm: 'v2',
      translationSk: 'Nikto sa nepostavil, keď sa spustil alarm.',
      whySk: 'Minulý dej („went off“) vyžaduje 2. tvar „stood“.',
    },
  },
  {
    id: 'hear',
    v1: 'hear',
    v2: 'heard',
    v3: 'heard',
    thirdPerson: 'hears',
    ingForm: 'hearing',
    ipa: { v1: '/hɪə(r)/', v2: '/hɜːd/', v3: '/hɜːd/' },
    pronunciationSk: { v1: 'híə(r)', v2: 'hérd', v3: 'hérd' },
    translationSk: 'počuť',
    otherMeaningsSk: 'dozvedieť sa o niekom (hear from)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Pozor na výslovnosť: V1 „hear“ sa číta [híə], ale v V2 a V3 sa pridá len „-d“ („heard“) a výslovnosť sa úplne zmení na dlhé [hérd] — nikdy nie [hírd]!',
      formsGuide: {
        v1: 'hear [híə] = počujem / počuť (zmyslové vnímanie, zvyčajne bez -ing).',
        v2: 'heard [hérd] = počul som.',
        v3: 'heard [hérd] = počutý / počul (Have you heard the news? = Počul si tie správy?).',
      },
      tipSk:
        'Rozdiel „hear“ vs „listen to“: hear = počuť pasívne ušami; listen to = vedome počúvať (hudbu, podcast).',
    },
    examples: {
      v1: {
        en: 'Can you hear me clearly?',
        sk: 'Počuješ ma zreteľne?',
        note: 'Po modálnom can ide 1. tvar „hear“.',
      },
      v2: {
        en: 'I heard a strange noise outside.',
        sk: 'Počul som vonku zvláštny zvuk.',
        note: '2. tvar „heard“ [hérd].',
      },
      v3: {
        en: 'Have you heard from Jana recently?',
        sk: 'Ozvala sa ti v poslednej dobe Jana? (Počul si o nej?)',
        note: 'Predprítomná otázka s Have + 3. tvar „heard“.',
      },
      questionNeg: {
        en: "Didn't you hear the doorbell ring?",
        sk: 'Nepočul si zvoniť zvonček?',
        note: 'Záporná otázka s didn’t + 1. tvar „hear“.',
      },
    },
    sentenceGap: {
      sentence: 'I have never ____ such a funny joke.',
      targetForm: 'v3',
      translationSk: 'Nikdy som nepočul taký vtipný vtip.',
      whySk: 'Po „have never“ patrí 3. tvar „heard“.',
    },
  },
  {
    id: 'let',
    v1: 'let',
    v2: 'let',
    v3: 'let',
    thirdPerson: 'lets',
    ingForm: 'letting',
    ipa: { v1: '/let/', v2: '/let/', v3: '/let/' },
    pronunciationSk: { v1: 'let', v2: 'let', v3: 'let' },
    translationSk: 'dovoliť, nechať',
    otherMeaningsSk: 'prenajať byt (to let)',
    level: 'A1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sú „let“. Za „let“ nasleduje osoba a sloveso BEZ „to“: Let me go (nie Let me to go!).',
      formsGuide: {
        v1: 'let = dovolím / nechať. V -ing tvare sa zdvojuje t: letting.',
        v2: 'let = dovolil som, nechal som.',
        v3: 'let = dovolený / nechal (po have/has).',
      },
      tipSk:
        'Známe „Let’s go!“ je skratka z „Let us go!“ (= Poďme!). A po „let“ nikdy nepíšeme „to“ pred ďalším slovesom.',
    },
    examples: {
      v1: {
        en: 'Let me help you with those bags.',
        sk: 'Nechaj ma pomôcť ti s tými taškami.',
        note: 'Bez „to“ medzi me a help!',
      },
      v2: {
        en: 'My parents let me stay out until midnight.',
        sk: 'Rodičia mi dovolili zostať vonku do polnoci.',
        note: '2. tvar „let“ v minulosti.',
      },
      v3: {
        en: 'She has never let me down.',
        sk: 'Nikdy ma nesklamala.',
        note: 'Frázové sloveso let down (sklamať) v 3. tvare „let“.',
      },
      questionNeg: {
        en: "Won't they let us enter without tickets?",
        sk: 'Nepustia nás dnu bez lístkov?',
        note: 'Záporná otázka v budúcnosti s won’t + 1. tvar „let“.',
      },
    },
    sentenceGap: {
      sentence: 'Yesterday, the teacher ____ us leave ten minutes early.',
      targetForm: 'v2',
      translationSk: 'Včera nám učiteľ dovolil odísť o desať minút skôr.',
      whySk: '„Yesterday“ znamená minulý čas — 2. tvar od let je stále „let“.',
    },
  },
  {
    id: 'mean',
    v1: 'mean',
    v2: 'meant',
    v3: 'meant',
    thirdPerson: 'means',
    ingForm: 'meaning',
    ipa: { v1: '/miːn/', v2: '/ment/', v3: '/ment/' },
    pronunciationSk: { v1: 'mín', v2: 'ment', v3: 'ment' },
    translationSk: 'znamenať, myslieť (vážne)',
    otherMeaningsSk: 'mať v úmysle',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Dlhé [mín] v 1. tvare sa v 2. a 3. tvare mení na krátke [ment] a píše sa „meant“. Veľmi časté vo fráze „What do you mean?“ (Ako to myslíš?).',
      formsGuide: {
        v1: 'mean [mín] = znamená / myslím to tak.',
        v2: 'meant [ment] = znamenalo to / myslel som to tak.',
        v3: 'meant [ment] = myslený / zamýšľaný (po have/has alebo be).',
      },
      tipSk:
        'Fráza na ospravedlnenie nedorozumenia: „I didn’t mean to hurt you“ = Nechcel som ti ublížiť / Nemyslel som to zle.',
    },
    examples: {
      v1: {
        en: 'What does this word mean?',
        sk: 'Čo znamená toto slovo?',
        note: 'Otázka na význam v prítomnom čase.',
      },
      v2: {
        en: 'I meant to call you, sorry!',
        sk: 'Mal som v úmysle ti zavolať, prepáč!',
        note: '2. tvar „meant“ [ment].',
      },
      v3: {
        en: 'We were meant to meet at five.',
        sk: 'Mali sme sa stretnúť o piatej (tak to bolo myslené).',
        note: 'Were + 3. tvar „meant“.',
      },
      questionNeg: {
        en: "Didn't you mean the other street?",
        sk: 'Nemyslel si náhodou tú druhú ulicu?',
        note: 'Záporná otázka s didn’t + 1. tvar „mean“.',
      },
    },
    sentenceGap: {
      sentence: 'I am sorry, I really ____ to help, not to complicate things.',
      targetForm: 'v2',
      translationSk: 'Prepáč, naozaj som chcel pomôcť, nie veci skomplikovať.',
      whySk: 'Vyjadrenie minulého úmyslu -> 2. tvar „meant“.',
    },
  },
  {
    id: 'meet',
    v1: 'meet',
    v2: 'met',
    v3: 'met',
    thirdPerson: 'meets',
    ingForm: 'meeting',
    ipa: { v1: '/miːt/', v2: '/met/', v3: '/met/' },
    pronunciationSk: { v1: 'mít', v2: 'met', v3: 'met' },
    translationSk: 'stretnúť (sa), spoznať',
    otherMeaningsSk: 'splniť (požiadavku)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Z dvoch „ee“ [mít] sa v minulosti stáva jedno „e“ [met]. Používa sa bez „with“, keď ide o náhodné stretnutie alebo prvé zoznámenie (Nice to meet you!).',
      formsGuide: {
        v1: 'meet [mít] = stretnem / stretávam (sa).',
        v2: 'met [met] = stretol som (sa).',
        v3: 'met [met] = stretol (Have we met before? = Už sme sa niekedy stretli?).',
      },
      tipSk:
        'Pozor na pravopis: „meet“ (stretnúť) vs „meat“ (mäso) — vyslovujú sa rovnako [mít], ale píšu sa inak!',
    },
    examples: {
      v1: {
        en: 'We meet for coffee every Friday.',
        sk: 'Každý piatok sa stretávame na kávu.',
        note: 'Pravidelná činnosť v prítomnosti -> 1. tvar „meet“.',
      },
      v2: {
        en: 'I met my wife in Bratislava.',
        sk: 'Svoju manželku som spoznal v Bratislave.',
        note: '2. tvar „met“ v minulosti.',
      },
      v3: {
        en: 'Have you ever met a famous person?',
        sk: 'Stretol si niekedy známu osobnosť?',
        note: 'Skúsenosť v predprítomnom čase -> 3. tvar „met“.',
      },
      questionNeg: {
        en: "Haven't we met somewhere before?",
        sk: 'Nestretli sme sa už niekde predtým?',
        note: 'Záporná predprítomná otázka s Haven’t + 3. tvar „met“.',
      },
    },
    sentenceGap: {
      sentence: 'Let’s ____ in front of the train station at 3 p.m.',
      targetForm: 'v1',
      translationSk: 'Stretnime sa pred železničnou stanicou o tretej popoludní.',
      whySk: 'Po návrhu „Let’s“ ide vždy základný 1. tvar „meet“.',
    },
  },
  {
    id: 'run',
    v1: 'run',
    v2: 'ran',
    v3: 'run',
    thirdPerson: 'runs',
    ingForm: 'running',
    ipa: { v1: '/rʌn/', v2: '/ræn/', v3: '/rʌn/' },
    pronunciationSk: { v1: 'ran', v2: 'ren', v3: 'ran' },
    translationSk: 'bežať, riadiť',
    otherMeaningsSk: 'prevádzkovať (firmu), tiecť (voda)',
    level: 'A1',
    pattern: 'ABA',
    slovakExplanation: {
      summary:
        'Vzor A-B-A ako pri „come“: 1. a 3. tvar sú „run“ [ran], iba 2. tvar je „ran“ [ren]. Okrem behania znamená aj „viesť/prevádzkovať“ (run a company).',
      formsGuide: {
        v1: 'run = bežím / bežať. V -ing tvare sa zdvojuje n: running.',
        v2: 'ran = bežal som, viedol som.',
        v3: 'run = rovnaké ako V1! Používa sa po have/has (I have run 5 km today).',
      },
      tipSk:
        'Nezabudni na zdvojenie pri -ing: running (dve n). A v minulom čase je len „ran“, nikdy nie „runned“!',
    },
    examples: {
      v1: {
        en: 'She runs five kilometers every morning.',
        sk: 'Každé ráno behá päť kilometrov.',
        note: '3. osoba v prítomnosti = runs.',
      },
      v2: {
        en: 'He ran to catch the last bus.',
        sk: 'Bežal, aby stihol posledný autobus.',
        note: 'Minulý čas = 2. tvar „ran“.',
      },
      v3: {
        en: 'We have run out of coffee.',
        sk: 'Minula sa nám káva (došla nám).',
        note: 'Frázové sloveso „run out of“ v 3. tvare „run“.',
      },
      questionNeg: {
        en: "Didn't he run a marathon last year?",
        sk: 'Nebehal minulý rok maratón?',
        note: 'Záporná otázka s didn’t + 1. tvar „run“.',
      },
    },
    sentenceGap: {
      sentence: 'Look! The dog is ____ across the garden.',
      targetForm: 'ingForm',
      translationSk: 'Pozri! Pes beží cez záhradu.',
      whySk: 'Priebehový dej po „is“ vyžaduje tvar so zdvojeným n: „running“.',
    },
  },
  {
    id: 'pay',
    v1: 'pay',
    v2: 'paid',
    v3: 'paid',
    thirdPerson: 'pays',
    ingForm: 'paying',
    ipa: { v1: '/peɪ/', v2: '/peɪd/', v3: '/peɪd/' },
    pronunciationSk: { v1: 'pej', v2: 'pejd', v3: 'pejd' },
    translationSk: 'zaplatiť, platiť',
    otherMeaningsSk: 'venovať pozornosť (pay attention)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Pravopisná finta! Nepíšeme „payed“, ale „y“ sa zmení na „-id“ -> „paid“ (v 2. aj 3. tvare). Rovnako funguje aj say -> said (len výslovnosť je iná: paid [pejd], said [sed]).',
      formsGuide: {
        v1: 'pay [pej] = platím / zaplatiť (pay for something = zaplatiť za niečo!).',
        v2: 'paid [pejd] = zaplatil som.',
        v3: 'paid [pejd] = zaplatený / zaplatil (It is paid = Je to zaplatené).',
      },
      tipSk:
        'Slováci často zabúdajú na predložku „for“ pri veciach, za ktoré platíme: „I paid for the coffee“ (nie „I paid the coffee“!).',
    },
    examples: {
      v1: {
        en: 'Can I pay by card?',
        sk: 'Môžem zaplatiť kartou?',
        note: 'Platobná metóda má predložku „by“ (by card / in cash).',
      },
      v2: {
        en: 'I paid twenty euros for this book.',
        sk: 'Za túto knihu som zaplatil dvadsať eur.',
        note: '2. tvar „paid“ + predložka „for“ pred vecou.',
      },
      v3: {
        en: 'All the bills have been paid.',
        sk: 'Všetky účty už boli zaplatené.',
        note: 'Trpný rod v predprítomnom čase = have been + 3. tvar „paid“.',
      },
      questionNeg: {
        en: "Didn't you pay for the parking ticket?",
        sk: 'Nezaplatil si za parkovací lístok?',
        note: 'Záporná otázka s didn’t + 1. tvar „pay“.',
      },
    },
    sentenceGap: {
      sentence: 'Make sure you ____ attention during the presentation.',
      targetForm: 'v1',
      translationSk: 'Daj pozor, aby si počas prezentácie dával pozor.',
      whySk: 'Po podmete „you“ v prítomnom význame nasleduje 1. tvar „pay“.',
    },
  },
  {
    id: 'sit',
    v1: 'sit',
    v2: 'sat',
    v3: 'sat',
    thirdPerson: 'sits',
    ingForm: 'sitting',
    ipa: { v1: '/sɪt/', v2: '/sæt/', v3: '/sæt/' },
    pronunciationSk: { v1: 'sit', v2: 'set', v3: 'set' },
    translationSk: 'sedieť, sadnúť si',
    otherMeaningsSk: 'usadiť sa (sit down)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. a 3. tvar sú zhodné: „sat“ [set]. Ak si chcete sadnúť (pohyb), pridajte „down“ (sit down). Ak už sedíte (poloha), stačí samotné „sit“.',
      formsGuide: {
        v1: 'sit = sedím / sadnúť si. V -ing tvare zdvojujeme t: sitting.',
        v2: 'sat = sedel som, sadol som si.',
        v3: 'sat = sedel (po have/has).',
      },
      tipSk:
        'Pozor na zdvojenie spoluhlásky t pri priebehovom čase: „I am sitting on the sofa“ (nie siting!).',
    },
    examples: {
      v1: {
        en: 'Please sit down and relax.',
        sk: 'Prosím, sadni si a oddýchni si.',
        note: 'Rozkazovací spôsob s 1. tvarom „sit“.',
      },
      v2: {
        en: 'We sat near the window.',
        sk: 'Sedeli sme pri okne.',
        note: 'Minulý čas = 2. tvar „sat“.',
      },
      v3: {
        en: 'I have sat at my desk all morning.',
        sk: 'Celé ráno som sedel za stolom.',
        note: 'Have + 3. tvar „sat“.',
      },
      questionNeg: {
        en: "Why don't you sit here with us?",
        sk: 'Prečo si nesadneš sem k nám?',
        note: 'Záporná otázka použitá ako priateľské pozvanie.',
      },
    },
    sentenceGap: {
      sentence: 'Who is ____ in my chair?',
      targetForm: 'ingForm',
      translationSk: 'Kto sedí na mojej stoličke?',
      whySk: 'Dej práve teraz po „is“ vyžaduje tvar „sitting“ (s dvoma t).',
    },
  },
  {
    id: 'speak',
    v1: 'speak',
    v2: 'spoke',
    v3: 'spoken',
    thirdPerson: 'speaks',
    ingForm: 'speaking',
    ipa: { v1: '/spiːk/', v2: '/spəʊk/', v3: '/ˈspəʊkən/' },
    pronunciationSk: { v1: 'spík', v2: 'spouk', v3: 'spoukn' },
    translationSk: 'hovoriť, rozprávať',
    otherMeaningsSk: 'ovládať jazyk (speak English), prehovoriť',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor A-B-C: speak – spoke – spoken. Používa sa pri ovládaní cudzích jazykov (speak Slovak/English) a pri oficiálnejšej komunikácii.',
      formsGuide: {
        v1: 'speak [spík] = hovorím / rozprávať.',
        v2: 'spoke [spouk] = hovoril som, rozprával som.',
        v3: 'spoken [spoukn] = hovorený / rozprával (English is spoken here = Tu sa hovorí po anglicky).',
      },
      tipSk:
        'Keď sa pýtame na jazyk: „Do you speak English?“ — nikdy nepoužívame „talk“ pri jazykoch, vždy „speak“.',
    },
    examples: {
      v1: {
        en: 'Do you speak Slovak?',
        sk: 'Hovoríte po slovensky?',
        note: 'Prítomná otázka s Do + 1. tvar „speak“.',
      },
      v2: {
        en: 'I spoke with the manager yesterday.',
        sk: 'Včera som hovoril s manažérom.',
        note: '2. tvar „spoke“ v minulom čase.',
      },
      v3: {
        en: 'Have you spoken to your parents yet?',
        sk: 'Už si sa rozprával s rodičmi?',
        note: 'Have + podmet + 3. tvar „spoken“.',
      },
      questionNeg: {
        en: "Didn't she speak at the conference?",
        sk: 'Nevystúpila / nehovorila na tej konferencii?',
        note: 'Záporná otázka s didn’t + 1. tvar „speak“.',
      },
    },
    sentenceGap: {
      sentence: 'Spanish is ____ in most of South America.',
      targetForm: 'v3',
      translationSk: 'Španielčinou sa hovorí vo väčšine Južnej Ameriky.',
      whySk: 'Trpný rod „is + V3“ si vyžaduje 3. tvar „spoken“.',
    },
  },
  {
    id: 'read',
    v1: 'read',
    v2: 'read',
    v3: 'read',
    thirdPerson: 'reads',
    ingForm: 'reading',
    ipa: { v1: '/riːd/', v2: '/red/', v3: '/red/' },
    pronunciationSk: { v1: 'ríd', v2: 'red', v3: 'red' },
    translationSk: 'čítať, prečítať',
    otherMeaningsSk: 'študovať, pochopiť text',
    level: 'A1',
    pattern: 'SPECIAL',
    slovakExplanation: {
      summary:
        'Najzáludnejšie sloveso na čítanie! Píše sa vo všetkých troch tvaroch úplne rovnako (r-e-a-d), ALE v 1. tvare sa číta ako [ríd] a v 2. a 3. tvare ako farba červená — [red]!',
      formsGuide: {
        v1: 'read [ríd] = čítam / čítať.',
        v2: 'read [red] = čítal som / prečítal som (výslovnosť ako „red“!).',
        v3: 'read [red] = prečítaný / prečítal (po have/has, výslovnosť [red]).',
      },
      tipSk:
        'Ako vo vete spoznáš, či „read“ čítať [ríd] alebo [red]? Napr. „He reads“ (s -s) je prítomnosť [rídz], zatiaľ čo „He read“ (bez -s pri „he“!) je minulosť [red]!',
    },
    examples: {
      v1: {
        en: 'I read the news every morning.',
        sk: 'Každé ráno čítam správy.',
        note: 'Prítomný zvyk -> výslovnosť [ríd].',
      },
      v2: {
        en: 'She read the whole book in two days.',
        sk: 'Celú knihu prečítala za dva dni.',
        note: 'Bez -s po „she“ -> minulý čas, výslovnosť [red]!',
      },
      v3: {
        en: 'Have you read this article?',
        sk: 'Čítal si tento článok?',
        note: 'Po Have je 3. tvar „read“ s výslovnosťou [red].',
      },
      questionNeg: {
        en: "Haven't you read my text message?",
        sk: 'Neprečítal si si moju SMS správu?',
        note: 'Záporná predprítomná otázka -> vyslovujeme [red].',
      },
    },
    sentenceGap: {
      sentence: 'Last night I ____ two chapters before sleeping.',
      targetForm: 'v2',
      translationSk: 'Včera večer som pred spaním prečítal dve kapitoly.',
      whySk: 'Píše sa rovnako „read“, ale v minulosti sa číta [red].',
    },
  },
  {
    id: 'buy',
    v1: 'buy',
    v2: 'bought',
    v3: 'bought',
    thirdPerson: 'buys',
    ingForm: 'buying',
    ipa: { v1: '/baɪ/', v2: '/bɔːt/', v3: '/bɔːt/' },
    pronunciationSk: { v1: 'baj', v2: 'bót', v3: 'bót' },
    translationSk: 'kúpiť, nakupovať',
    otherMeaningsSk: 'zakúpiť si',
    level: 'A1',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „-ought“ (ako think -> thought). V1 „buy“ sa vyslovuje rovnako ako „bye“ [baj], v minulosti sa zmení na „bought“ [bót].',
      formsGuide: {
        v1: 'buy [baj] = kúpim / kupovať. Pozor: v 3. osobe „buys“ (y sa nemení na ie, lebo pred ním je samohláska u!).',
        v2: 'bought [bót] = kúpil som.',
        v3: 'bought [bót] = kúpený / kúpil (po have/has).',
      },
      tipSk:
        'Nepopliesť s „bring -> brought“! „Buy“ nemá „r“, preto ani „bought“ nemá „r“.',
    },
    examples: {
      v1: {
        en: 'Where do you buy fresh bread?',
        sk: 'Kde kupuješ čerstvý chlieb?',
        note: 'Prítomná otázka s do + 1. tvar „buy“.',
      },
      v2: {
        en: 'They bought a new flat last month.',
        sk: 'Minulý mesiac si kúpili nový byt.',
        note: '2. tvar „bought“ [bót].',
      },
      v3: {
        en: 'I have already bought the train tickets.',
        sk: 'Lístky na vlak som už kúpil.',
        note: 'Have + already + 3. tvar „bought“.',
      },
      questionNeg: {
        en: "Didn't you buy milk on your way home?",
        sk: 'Nekúpil si cestou domov mlieko?',
        note: 'Záporná otázka s didn’t + 1. tvar „buy“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ a lovely birthday present for her sister.',
      targetForm: 'v2',
      translationSk: 'Kúpila svojej sestre krásny darček k narodeninám.',
      whySk: 'Minulý dej v oznamovacej vete -> 2. tvar „bought“.',
    },
  },
  {
    id: 'eat',
    v1: 'eat',
    v2: 'ate',
    v3: 'eaten',
    thirdPerson: 'eats',
    ingForm: 'eating',
    ipa: { v1: '/iːt/', v2: '/eɪt/ · /et/', v3: '/ˈiːtn/' },
    pronunciationSk: { v1: 'ít', v2: 'et / ejt', v3: 'ítn' },
    translationSk: 'jesť, zjesť',
    otherMeaningsSk: 'stravovať sa',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Všetky tri tvary sú odlišné: eat – ate – eaten. Zaujímavosťou je výslovnosť V2 „ate“: v britskej angličtine sa často číta [et], v americkej [ejt] — obe sú správne!',
      formsGuide: {
        v1: 'eat [ít] = jem / jesť.',
        v2: 'ate [et / ejt] = zjedol som, jedol som.',
        v3: 'eaten [ítn] = zjedený / zjedol (po have/has).',
      },
      tipSk:
        'V angličtine pre raňajky, obed a večeru často namiesto „eat“ počujete skôr „have“ (have breakfast, have lunch, have dinner).',
    },
    examples: {
      v1: {
        en: 'We usually eat dinner at six.',
        sk: 'Zvyčajne večeriame o šiestej.',
        note: 'Prítomný zvyk -> 1. tvar „eat“.',
      },
      v2: {
        en: 'He ate two slices of pizza.',
        sk: 'Zjedol dva kúsky pizze.',
        note: 'Minulý čas = 2. tvar „ate“.',
      },
      v3: {
        en: 'Who has eaten all the cookies?',
        sk: 'Kto zjedol všetky sušienky?',
        note: 'Viditeľný dôsledok teraz (prázdna krabica) -> has + 3. tvar „eaten“.',
      },
      questionNeg: {
        en: "Haven't you eaten anything today?",
        sk: 'Ty si dnes ešte nič nejedol?',
        note: 'Záporná otázka v predprítomnom čase s 3. tvarom „eaten“.',
      },
    },
    sentenceGap: {
      sentence: 'I have never ____ sushi in my life.',
      targetForm: 'v3',
      translationSk: 'Nikdy v živote som nejedol suši.',
      whySk: 'Životná skúsenosť s „have never“ -> 3. tvar „eaten“.',
    },
  },
  {
    id: 'drink',
    v1: 'drink',
    v2: 'drank',
    v3: 'drunk',
    thirdPerson: 'drinks',
    ingForm: 'drinking',
    ipa: { v1: '/drɪŋk/', v2: '/dræŋk/', v3: '/drʌŋk/' },
    pronunciationSk: { v1: 'drink', v2: 'drenk', v3: 'drank' },
    translationSk: 'piť, vypiť',
    otherMeaningsSk: 'napiť sa',
    level: 'A1',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Vzor „i – a – u“: drink – drank – drunk. Pozor na slovíčko „drunk“: ako prídavné meno znamená „opitý“, ale po „have/has“ je to úplne normálny 3. tvar slovesa piť (napr. vypil som kávu)!',
      formsGuide: {
        v1: 'drink = pijem / piť.',
        v2: 'drank [drenk] = pil som, vypil som.',
        v3: 'drunk [drank] = vypil (I have drunk two liters of water today).',
      },
      tipSk:
        'Pamätaj: „I am drunk“ = Som opitý. „I have drunk three coffees“ = Vypil som tri kávy (žiadny alkohol!).',
    },
    examples: {
      v1: {
        en: 'Do you drink coffee or tea?',
        sk: 'Piješ kávu alebo čaj?',
        note: 'Prítomná otázka s Do + 1. tvar „drink“.',
      },
      v2: {
        en: 'She drank a glass of cold water.',
        sk: 'Vypila pohár studenej vody.',
        note: '2. tvar „drank“ v minulosti.',
      },
      v3: {
        en: 'I have already drunk two cups of tea.',
        sk: 'Už som vypil dve šálky čaju.',
        note: 'Have + already + 3. tvar „drunk“.',
      },
      questionNeg: {
        en: "Don't you drink alcohol at all?",
        sk: 'Vôbec nepiješ alkohol?',
        note: 'Záporná otázka v prítomnom čase.',
      },
    },
    sentenceGap: {
      sentence: 'Someone ____ my orange juice from the fridge!',
      targetForm: 'v2',
      translationSk: 'Niekto vypil môj pomarančový džús z chladničky!',
      whySk: 'Jednoduchý minulý čas po podmete „Someone“ -> 2. tvar „drank“.',
    },
  },
  {
    id: 'sleep',
    v1: 'sleep',
    v2: 'slept',
    v3: 'slept',
    thirdPerson: 'sleeps',
    ingForm: 'sleeping',
    ipa: { v1: '/sliːp/', v2: '/slept/', v3: '/slept/' },
    pronunciationSk: { v1: 'slíp', v2: 'slept', v3: 'slept' },
    translationSk: 'spať, vyspať sa',
    otherMeaningsSk: 'prespať',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Rovnako ako keep -> kept: dlhé „ee“ [slíp] sa v 2. a 3. tvare skracuje na krátke „e“ a pridáva -t („slept“).',
      formsGuide: {
        v1: 'sleep [slíp] = spím / spať.',
        v2: 'slept = spal som.',
        v3: 'slept = spal (po have/has, napr. How long have you slept?).',
      },
      tipSk:
        'Pozor na rozdiel „sleep“ (sloveso spať) a „asleep“ (prídavné meno spiaci: He is asleep = Spí).',
    },
    examples: {
      v1: {
        en: 'I usually sleep for seven hours.',
        sk: 'Zvyčajne spím sedem hodín.',
        note: 'Zvyk v prítomnosti -> 1. tvar „sleep“.',
      },
      v2: {
        en: 'We slept really well last night.',
        sk: 'Včera v noci sme spali naozaj dobre.',
        note: '2. tvar „slept“.',
      },
      v3: {
        en: 'The baby has slept for two hours.',
        sk: 'Bábätko spí (prespalo) už dve hodiny.',
        note: 'Has + 3. tvar „slept“.',
      },
      questionNeg: {
        en: "Didn't you sleep well last night?",
        sk: 'Nespal si včera v noci dobre?',
        note: 'Záporná otázka s didn’t + 1. tvar „sleep“.',
      },
    },
    sentenceGap: {
      sentence: 'Be quiet, the children are ____ upstairs.',
      targetForm: 'ingForm',
      translationSk: 'Buď ticho, deti hore spia.',
      whySk: 'Dej prebiehajúci práve teraz po „are“ -> „sleeping“.',
    },
  },
  {
    id: 'understand',
    v1: 'understand',
    v2: 'understood',
    v3: 'understood',
    thirdPerson: 'understands',
    ingForm: 'understanding',
    ipa: { v1: '/ˌʌndəˈstænd/', v2: '/ˌʌndəˈstʊd/', v3: '/ˌʌndəˈstʊd/' },
    pronunciationSk: { v1: 'andəstend', v2: 'andəstud', v3: 'andəstud' },
    translationSk: 'rozumieť, pochopiť',
    otherMeaningsSk: 'chápať',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Zložené zo slov „under“ + „stand“. Časuje sa úplne rovnako ako sloveso „stand -> stood“! V slovenčine má dve väzby (rozumiem ti / pochopil som to), v angličtine bez „to“: I understand you.',
      formsGuide: {
        v1: 'understand = rozumiem / chápať (bez -ing pri bežnom chápaní!).',
        v2: 'understood = rozumel som, pochopil som.',
        v3: 'understood = pochopený / rozumel (Have you understood?).',
      },
      tipSk:
        'Po „understand“ nejde žiadna predložka pred osobou: „I understand you“ (nie „I understand to you“!).',
    },
    examples: {
      v1: {
        en: 'Do you understand the rules?',
        sk: 'Rozumieš tým pravidlám?',
        note: 'Prítomná otázka s Do + 1. tvar „understand“.',
      },
      v2: {
        en: 'I understood everything she explained.',
        sk: 'Pochopil som všetko, čo vysvetlila.',
        note: 'Minulý čas = 2. tvar „understood“.',
      },
      v3: {
        en: 'Have I understood your point correctly?',
        sk: 'Pochopil som tvoj pohľad správne?',
        note: 'Predprítomná otázka s Have + 3. tvar „understood“.',
      },
      questionNeg: {
        en: "Didn't you understand what I said?",
        sk: 'Nerozumel si, čo som povedal?',
        note: 'Záporná otázka s didn’t + 1. tvar „understand“.',
      },
    },
    sentenceGap: {
      sentence: 'He finally ____ why the program was crashing.',
      targetForm: 'v2',
      translationSk: 'Konečne pochopil, prečo program padal.',
      whySk: 'Dej v minulosti („was crashing“) vyžaduje 2. tvar „understood“.',
    },
  },
  {
    id: 'send',
    v1: 'send',
    v2: 'sent',
    v3: 'sent',
    thirdPerson: 'sends',
    ingForm: 'sending',
    ipa: { v1: '/send/', v2: '/sent/', v3: '/sent/' },
    pronunciationSk: { v1: 'send', v2: 'sent', v3: 'sent' },
    translationSk: 'poslať, odoslať',
    otherMeaningsSk: 'zaslať (správu, balík)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „-d mení sa na -t“ (podobne ako lend -> lent, spend -> spent, build -> built). Veľmi praktické pri písaní e-mailov a správ.',
      formsGuide: {
        v1: 'send = pošlem / posielať.',
        v2: 'sent = poslal som.',
        v3: 'sent = poslaný / poslal (The email has been sent = E-mail bol odoslaný).',
      },
      tipSk:
        'Dva spôsoby poradia slov: „Send me an email“ (bez predložky) alebo „Send an email to me“ (s „to“ na konci).',
    },
    examples: {
      v1: {
        en: 'I will send you the link tonight.',
        sk: 'Pošlem ti ten odkaz dnes večer.',
        note: 'Budúci čas: will + 1. tvar „send“.',
      },
      v2: {
        en: 'She sent a postcard from Spain.',
        sk: 'Poslala pohľadnicu zo Španielska.',
        note: '2. tvar „sent“.',
      },
      v3: {
        en: 'Have you sent the invoice yet?',
        sk: 'Už si poslal tú faktúru?',
        note: 'Have + podmet + 3. tvar „sent“.',
      },
      questionNeg: {
        en: "Didn't they send you a confirmation?",
        sk: 'Neposlali ti potvrdenie?',
        note: 'Záporná otázka s didn’t + 1. tvar „send“.',
      },
    },
    sentenceGap: {
      sentence: 'Your package was ____ two days ago.',
      targetForm: 'v3',
      translationSk: 'Váš balík bol odoslaný pred dvoma dňami.',
      whySk: 'Trpný rod „was + V3“ si vyžaduje 3. tvar „sent“.',
    },
  },
  {
    id: 'spend',
    v1: 'spend',
    v2: 'spent',
    v3: 'spent',
    thirdPerson: 'spends',
    ingForm: 'spending',
    ipa: { v1: '/spend/', v2: '/spent/', v3: '/spent/' },
    pronunciationSk: { v1: 'spend', v2: 'spent', v3: 'spent' },
    translationSk: 'minúť (peniaze), stráviť (čas)',
    otherMeaningsSk: 'utratiť',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Jedno sloveso v angličtine pokrýva dva slovenské významy: 1) minúť peniaze (spend money ON something), 2) stráviť čas (spend time DOING something).',
      formsGuide: {
        v1: 'spend = míňam / trávim. Koncové -d sa mení na -t.',
        v2: 'spent = minul som (peniaze), strávil som (čas).',
        v3: 'spent = minutý / strávil (po have/has).',
      },
      tipSk:
        'Väzba s časom: po „spend + čas“ nasleduje sloveso s -ing! Napr. „I spent two hours studying“ (Strávil som dve hodiny učením).',
    },
    examples: {
      v1: {
        en: 'How much time do you spend online?',
        sk: 'Koľko času tráviš na internete?',
        note: 'Prítomná otázka s do + 1. tvar „spend“.',
      },
      v2: {
        en: 'We spent a lovely weekend in the Tatras.',
        sk: 'Strávili sme krásny víkend v Tatrách.',
        note: '2. tvar „spent“.',
      },
      v3: {
        en: 'He has spent all his savings on a new bike.',
        sk: 'Minul všetky svoje úspory na nový bicykel.',
        note: 'Has + 3. tvar „spent“ + predložka „on“.',
      },
      questionNeg: {
        en: "Didn't we spend too much money yesterday?",
        sk: 'Neminuli sme včera príliš veľa peňazí?',
        note: 'Záporná otázka s didn’t + 1. tvar „spend“.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ three hours preparing dinner for the guests.',
      targetForm: 'v2',
      translationSk: 'Strávila tri hodiny prípravou večere pre hostí.',
      whySk: 'Ukončený dej v minulosti -> 2. tvar „spent“.',
    },
  },
  {
    id: 'lose',
    v1: 'lose',
    v2: 'lost',
    v3: 'lost',
    thirdPerson: 'loses',
    ingForm: 'losing',
    ipa: { v1: '/luːz/', v2: '/lɒst/', v3: '/lɒst/' },
    pronunciationSk: { v1: 'lúz', v2: 'lost', v3: 'lost' },
    translationSk: 'stratiť, prehrať',
    otherMeaningsSk: 'zmeškať (spojenie), schudnúť (lose weight)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Pozor na jedno „o“ v slove „lose“ [lúz]! Slovo „loose“ s dvoma „oo“ [lús] je prídavné meno „voľný“. Minulosť aj príčastie je „lost“.',
      formsGuide: {
        v1: 'lose [lúz] = stratím / prehrám. V -ing tvare odpadá -e: losing.',
        v2: 'lost = stratil som, prehral som.',
        v3: 'lost = stratený / stratil (I am lost = Stratil som sa).',
      },
      tipSk:
        'Častá pravopisná pasca: „lose“ (stratiť) má iba jedno O! Dve O („loose“) znamená voľný (voľné nohavice).',
    },
    examples: {
      v1: {
        en: 'Try not to lose your passport.',
        sk: 'Snaž sa nestratiť svoj pas.',
        note: 'Záporný neurčitok „not to lose“.',
      },
      v2: {
        en: 'Our team lost the match 2–1.',
        sk: 'Náš tím prehral zápas 2:1.',
        note: '2. tvar „lost“ vo význame prehrať.',
      },
      v3: {
        en: 'I have lost my wallet!',
        sk: 'Stratil som peňaženku!',
        note: 'Aktuálny problém v prítomnosti po strate -> have + 3. tvar „lost“.',
      },
      questionNeg: {
        en: "Didn't you lose your keys last week too?",
        sk: 'Nestratil si kľúče aj minulý týždeň?',
        note: 'Záporná otázka s didn’t + 1. tvar „lose“.',
      },
    },
    sentenceGap: {
      sentence: 'Excuse me, I think I am ____. Can you show me the way?',
      targetForm: 'v3',
      translationSk: 'Prepáčte, myslím, že som sa stratil. Ukážete mi cestu?',
      whySk: 'Stav „som stratený“ sa povie „I am + 3. tvar lost“.',
    },
  },
  {
    id: 'win',
    v1: 'win',
    v2: 'won',
    v3: 'won',
    thirdPerson: 'wins',
    ingForm: 'winning',
    ipa: { v1: '/wɪn/', v2: '/wʌn/', v3: '/wʌn/' },
    pronunciationSk: { v1: 'win', v2: 'wan', v3: 'wan' },
    translationSk: 'vyhrať, zvíťaziť',
    otherMeaningsSk: 'získať (cenu, srdce)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. aj 3. tvar „won“ sa vyslovuje ÚPLNE ROVNAKO ako číslo jeden („one“) — [wan]! Nečítajte ho [von], ale [wan] s mäkkým anglickým w.',
      formsGuide: {
        v1: 'win = vyhrám / vyhrať. V -ing tvare sa zdvojuje n: winning.',
        v2: 'won [wan] = vyhral som.',
        v3: 'won [wan] = vyhratý / vyhral (po have/has).',
      },
      tipSk:
        'Rozdiel „win“ vs „beat“: vyhrávame ZÁPAS alebo CENU (win a match, win a medal), ale porážame SÚPERA (beat Slovakia, beat the opponent).',
    },
    examples: {
      v1: {
        en: 'I hope our team will win today.',
        sk: 'Dúfam, že náš tím dnes vyhrá.',
        note: 'Budúci čas: will + 1. tvar „win“.',
      },
      v2: {
        en: 'She won a gold medal in swimming.',
        sk: 'Vyhrala zlatú medailu v plávaní.',
        note: 'Minulý čas = 2. tvar „won“ [wan].',
      },
      v3: {
        en: 'Have you ever won anything in a lottery?',
        sk: 'Vyhral si niekedy niečo v lotérii?',
        note: 'Skúsenosť s Have + ever + 3. tvar „won“.',
      },
      questionNeg: {
        en: "Didn't they win the championship in 2022?",
        sk: 'Nevyhrali majstrovstvá v roku 2022?',
        note: 'Záporná otázka s didn’t + 1. tvar „win“.',
      },
    },
    sentenceGap: {
      sentence: 'He has ____ three tournaments this season.',
      targetForm: 'v3',
      translationSk: 'Túto sezónu vyhral už tri turnaje.',
      whySk: 'Po „has“ pre doterajší výsledok sezóny ide 3. tvar „won“.',
    },
  },
  {
    id: 'break',
    v1: 'break',
    v2: 'broke',
    v3: 'broken',
    thirdPerson: 'breaks',
    ingForm: 'breaking',
    ipa: { v1: '/breɪk/', v2: '/brəʊk/', v3: '/ˈbrəʊkən/' },
    pronunciationSk: { v1: 'brejk', v2: 'brouk', v3: 'broukn' },
    translationSk: 'zlomiť, rozbiť, pokaziť',
    otherMeaningsSk: 'porušiť (pravidlo, sľub), dať si pauzu',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor A-B-C: break [brejk] – broke [brouk] – broken [broukn]. Pozor: „broke“ znamená nielen „zlomil“, ale v hovorovej angličtine aj „som bez peňazí“ (I am broke).',
      formsGuide: {
        v1: 'break = zlomiť / rozbiť / pokaziť.',
        v2: 'broke = zlomil som, rozbil som, pokazil som.',
        v3: 'broken = zlomený / pokazený (My phone is broken = Môj mobil je pokazený).',
      },
      tipSk:
        'Nepleť si „break“ (rozbiť) a „brake“ (brzdiť / brzda) — vyslovujú sa rovnako [brejk]!',
    },
    examples: {
      v1: {
        en: 'Be careful, do not break that glass!',
        sk: 'Dávaj pozor, nerozbi ten pohár!',
        note: 'Záporný rozkaz: do not + 1. tvar „break“.',
      },
      v2: {
        en: 'He broke his leg while skiing.',
        sk: 'Zlomil si nohu pri lyžovaní.',
        note: '2. tvar „broke“ v minulom čase.',
      },
      v3: {
        en: 'Sorry, the coffee machine is broken.',
        sk: 'Prepáčte, kávovar je pokazený.',
        note: '3. tvar „broken“ použitý ako prídavné meno po „is“.',
      },
      questionNeg: {
        en: "Didn't you break a promise?",
        sk: 'Neporušil si sľub?',
        note: 'Záporná otázka s didn’t + 1. tvar „break“.',
      },
    },
    sentenceGap: {
      sentence: 'Oh no! Someone has ____ the window!',
      targetForm: 'v3',
      translationSk: 'Ale nie! Niekto rozbil okno!',
      whySk: 'Výsledok v prítomnosti po „has“ -> 3. tvar „broken“.',
    },
  },
  {
    id: 'build',
    v1: 'build',
    v2: 'built',
    v3: 'built',
    thirdPerson: 'builds',
    ingForm: 'building',
    ipa: { v1: '/bɪld/', v2: '/bɪlt/', v3: '/bɪlt/' },
    pronunciationSk: { v1: 'bild', v2: 'bilt', v3: 'bilt' },
    translationSk: 'postaviť, vybudovať',
    otherMeaningsSk: 'vytvoriť, budovať',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Písmeno „u“ v skupine „ui“ sa nevyslovuje — čítame len [bild] a [bilt]! V 2. a 3. tvare sa posledné -d mení na -t.',
      formsGuide: {
        v1: 'build [bild] = staviam / postaviť.',
        v2: 'built [bilt] = postavil som.',
        v3: 'built [bilt] = postavený / postavil (The bridge was built in 1972).',
      },
      tipSk:
        'Podstatné meno „building“ znamená budova, a keď ho rozdelíš na „build“ + „-ing“, je to zároveň priebehový tvar slovesa stavať.',
    },
    examples: {
      v1: {
        en: 'They are going to build a new school here.',
        sk: 'Idú tu postaviť novú školu.',
        note: 'Po going to ide 1. tvar „build“.',
      },
      v2: {
        en: 'My grandfather built this house in 1965.',
        sk: 'Môj starý otec postavil tento dom v roku 1965.',
        note: '2. tvar „built“ v minulosti.',
      },
      v3: {
        en: 'This bridge was built over a hundred years ago.',
        sk: 'Tento most bol postavený pred viac ako sto rokmi.',
        note: 'Trpný rod „was + 3. tvar built“.',
      },
      questionNeg: {
        en: "Didn't the Romans build roads across Europe?",
        sk: 'Nepostavili Rimania cesty naprieč Európou?',
        note: 'Záporná otázka s didn’t + 1. tvar „build“.',
      },
    },
    sentenceGap: {
      sentence: 'Workers have ____ three new stations on this line.',
      targetForm: 'v3',
      translationSk: 'Robotníci na tejto trati vybudovali tri nové stanice.',
      whySk: 'Po „have“ v predprítomnom čase ide 3. tvar „built“.',
    },
  },
  {
    id: 'catch',
    v1: 'catch',
    v2: 'caught',
    v3: 'caught',
    thirdPerson: 'catches',
    ingForm: 'catching',
    ipa: { v1: '/kætʃ/', v2: '/kɔːt/', v3: '/kɔːt/' },
    pronunciationSk: { v1: 'keč', v2: 'kót', v3: 'kót' },
    translationSk: 'chytiť, stihnúť',
    otherMeaningsSk: 'prechladnúť (catch a cold), prichytiť',
    level: 'A2',
    pattern: 'OUGHT',
    slovakExplanation: {
      summary:
        'Pozor na písanie! Podobne ako teach -> taught, aj „catch“ má v 2. a 3. tvare koncovku „-aught“ (s písmenom A, nie O!): „caught“ [kót].',
      formsGuide: {
        v1: 'catch [keč] = chytím / stihnem. V 3. osobe pridáva -es: catches.',
        v2: 'caught [kót] = chytil som, stihol som.',
        v3: 'caught [kót] = chytený / stihol (po have/has).',
      },
      tipSk:
        'Jednoduchá pomôcka na pravopis: ak je v 1. tvare písmeno „a“ (cAtch, teAch), v minulosti bude „-Aught“ (cAught, tAught). Bez „a“ (think, buy) bude „-Ought“.',
    },
    examples: {
      v1: {
        en: 'I always catch the 7:30 bus.',
        sk: 'Vždy stíham autobus o 7:30.',
        note: 'Prítomný zvyk -> 1. tvar „catch“.',
      },
      v2: {
        en: 'She caught a cold last week.',
        sk: 'Minulý týždeň prechladla (chytila nádchu).',
        note: 'Ustálené spojenie „catch a cold“ v 2. tvare „caught“.',
      },
      v3: {
        en: 'The police have caught the thief.',
        sk: 'Polícia chytila zlodeja.',
        note: 'Have + 3. tvar „caught“.',
      },
      questionNeg: {
        en: "Didn't you catch the morning train?",
        sk: 'Nestihol si ranný vlak?',
        note: 'Záporná otázka s didn’t + 1. tvar „catch“.',
      },
    },
    sentenceGap: {
      sentence: 'He threw the ball and I ____ it with one hand.',
      targetForm: 'v2',
      translationSk: 'Hodil loptu a ja som ju chytil jednou rukou.',
      whySk: 'Následný dej v minulosti („threw“) vyžaduje 2. tvar „caught“.',
    },
  },
  {
    id: 'choose',
    v1: 'choose',
    v2: 'chose',
    v3: 'chosen',
    thirdPerson: 'chooses',
    ingForm: 'choosing',
    ipa: { v1: '/tʃuːz/', v2: '/tʃəʊz/', v3: '/ˈtʃəʊzn/' },
    pronunciationSk: { v1: 'čúz', v2: 'čouz', v3: 'čouzn' },
    translationSk: 'vybrať (si), zvoliť',
    otherMeaningsSk: 'rozhodnúť sa pre',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Častá pravopisná chyba: 1. tvar „choose“ má DVE „oo“ [čúz], kým 2. tvar „chose“ má iba JEDNO „o“ [čouz]!',
      formsGuide: {
        v1: 'choose [čúz] = vyberiem si / vybrať (dve oo!).',
        v2: 'chose [čouz] = vybral som si (jedno o!).',
        v3: 'chosen [čouzn] = vybraný / vyvolený (po have/has alebo be).',
      },
      tipSk:
        'Podstatné meno „výber / možnosť“ je „choice“ [čojs] — pozor, nepomýliť si so slovesom „choose“!',
    },
    examples: {
      v1: {
        en: 'You can choose any color you like.',
        sk: 'Môžeš si vybrať akúkoľvek farbu, ktorá sa ti páči.',
        note: 'Po modálnom can ide 1. tvar „choose“.',
      },
      v2: {
        en: 'We chose the quietest table in the café.',
        sk: 'Vybrali sme si najtichší stôl v kaviarni.',
        note: '2. tvar „chose“ (s jedným o).',
      },
      v3: {
        en: 'She was chosen as team leader.',
        sk: 'Bola zvolená za vedúcu tímu.',
        note: 'Trpný rod „was + 3. tvar chosen“.',
      },
      questionNeg: {
        en: "Haven't you chosen your dessert yet?",
        sk: 'Ešte si si nevybral dezert?',
        note: 'Záporná predprítomná otázka s 3. tvarom „chosen“.',
      },
    },
    sentenceGap: {
      sentence: 'Why did they ____ such a complicated name?',
      targetForm: 'v1',
      translationSk: 'Prečo si vybrali taký zložitý názov?',
      whySk: 'Pozor! V otázke už je „did“, takže hlavné sloveso je v 1. tvare „choose“.',
    },
  },
  {
    id: 'cost',
    v1: 'cost',
    v2: 'cost',
    v3: 'cost',
    thirdPerson: 'costs',
    ingForm: 'costing',
    ipa: { v1: '/kɒst/', v2: '/kɒst/', v3: '/kɒst/' },
    pronunciationSk: { v1: 'kost', v2: 'kost', v3: 'kost' },
    translationSk: 'stáť (o cene)',
    otherMeaningsSk: 'vyjsť na (peniaze, čas, úsilie)',
    level: 'A1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Všetky tri tvary sú „cost“ (vzor A-A-A). Pozor: v 3. osobe prítomného času pridáva -s („It costs 5 euros“), zatiaľ čo v minulom čase je bez -s („It cost 5 euros“).',
      formsGuide: {
        v1: 'cost = stojí / stáť. V otázke na cenu: How much does it cost?',
        v2: 'cost = stálo to (v minulosti: How much did it cost?).',
        v3: 'cost = stálo (po have/has).',
      },
      tipSk:
        'Nikdy nepridávajte -ed („costed“ pri cene neexistuje)! Otázka o cene v minulosti: „How much did it cost?“',
    },
    examples: {
      v1: {
        en: 'How much does this jacket cost?',
        sk: 'Koľko stojí táto bunda?',
        note: 'Otázka v prítomnosti: does + 1. tvar „cost“.',
      },
      v2: {
        en: 'The repair cost more than I expected.',
        sk: 'Oprava stála viac, než som čakal.',
        note: 'Bez -s za „The repair“ = minulý čas „cost“.',
      },
      v3: {
        en: 'This mistake has cost us a lot of time.',
        sk: 'Táto chyba nás stála veľa času.',
        note: 'Has + 3. tvar „cost“.',
      },
      questionNeg: {
        en: "Didn't those shoes cost too much?",
        sk: 'Nestáli tie topánky príliš veľa?',
        note: 'Záporná otázka s didn’t + 1. tvar „cost“.',
      },
    },
    sentenceGap: {
      sentence: 'Our holiday last summer ____ around 900 euros.',
      targetForm: 'v2',
      translationSk: 'Naša dovolenka minulé leto stála okolo 900 eur.',
      whySk: '„Last summer“ je minulosť, 2. tvar od cost je stále „cost“.',
    },
  },
  {
    id: 'cut',
    v1: 'cut',
    v2: 'cut',
    v3: 'cut',
    thirdPerson: 'cuts',
    ingForm: 'cutting',
    ipa: { v1: '/kʌt/', v2: '/kʌt/', v3: '/kʌt/' },
    pronunciationSk: { v1: 'kat', v2: 'kat', v3: 'kat' },
    translationSk: 'rezať, strihať, porezať',
    otherMeaningsSk: 'krájať, znížiť (výdavky)',
    level: 'A1',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Krátke jednoslabičné sloveso zo skupiny A-A-A: cut – cut – cut [kat]. V angličtine zastrešuje krájanie nožom, strihanie nožnicami aj porezanie sa.',
      formsGuide: {
        v1: 'cut = režem / krájať / strihať. V -ing tvare sa zdvojuje t: cutting.',
        v2: 'cut = porezal som sa, pokrájal som.',
        v3: 'cut = pokrájaný / ostrihaný (I had my hair cut = Dal som sa ostrihať).',
      },
      tipSk:
        '„Porezal som sa“ = „I cut myself“ (v minulosti bez did a bez -s: napr. He cut his finger yesterday).',
    },
    examples: {
      v1: {
        en: 'Cut the tomatoes into small pieces.',
        sk: 'Nakrájaj paradajky na malé kúsky.',
        note: 'Rozkazovací spôsob v recepte -> 1. tvar „cut“.',
      },
      v2: {
        en: 'I accidentally cut my finger while cooking.',
        sk: 'Pri varení som si omylom porezal prst.',
        note: 'Minulý čas = 2. tvar „cut“.',
      },
      v3: {
        en: 'The grass has just been cut.',
        sk: 'Tráva bola práve pokosená.',
        note: 'Trpný rod „has been + 3. tvar cut“.',
      },
      questionNeg: {
        en: "Didn't he cut his hair yesterday?",
        sk: 'Neostrihal si včera vlasy?',
        note: 'Záporná otázka s didn’t + 1. tvar „cut“.',
      },
    },
    sentenceGap: {
      sentence: 'Careful, she is ____ onions with a very sharp knife.',
      targetForm: 'ingForm',
      translationSk: 'Opatrne, krája cibuľu veľmi ostrým nožom.',
      whySk: 'Dej práve teraz po „is“ zdvojuje koncové t: „cutting“.',
    },
  },
  {
    id: 'draw',
    v1: 'draw',
    v2: 'drew',
    v3: 'drawn',
    thirdPerson: 'draws',
    ingForm: 'drawing',
    ipa: { v1: '/drɔː/', v2: '/druː/', v3: '/drɔːn/' },
    pronunciationSk: { v1: 'dró', v2: 'drú', v3: 'drón' },
    translationSk: 'kresliť, ťahať',
    otherMeaningsSk: 'remizovať (v športe), vyvodiť (záver)',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „aw – ew – awn“ (rovnako ako fly/blow/grow/know majú -ew v 2. tvare!). Znamená kresliť ceruzkou/perom, ale aj ťahať závesy alebo remizovať.',
      formsGuide: {
        v1: 'draw [dró] = kreslím / kresliť.',
        v2: 'drew [drú] = nakreslil som.',
        v3: 'drawn [drón] = nakreslený / nakreslil (po have/has alebo be).',
      },
      tipSk:
        'Rozdiel „draw“ vs „paint“: draw = kresliť ceruzkou, fixkou alebo perom; paint = maľovať štetcom a farbami.',
    },
    examples: {
      v1: {
        en: 'My daughter loves to draw animals.',
        sk: 'Moja dcéra rada kreslí zvieratá.',
        note: 'Neurčitok po loves to -> 1. tvar „draw“.',
      },
      v2: {
        en: 'He drew a quick map on a napkin.',
        sk: 'Nakreslil rýchlu mapku na obrúsok.',
        note: '2. tvar „drew“ [drú].',
      },
      v3: {
        en: 'This comic was drawn by a young artist.',
        sk: 'Tento komiks nakreslil mladý umelec.',
        note: 'Trpný rod „was + 3. tvar drawn“.',
      },
      questionNeg: {
        en: "Didn't they draw 1–1 in the final?",
        sk: 'Neremizovali vo finále 1:1?',
        note: 'Záporná otázka s didn’t + 1. tvar „draw“ (športový význam remizovať).',
      },
    },
    sentenceGap: {
      sentence: 'She has ____ a beautiful portrait of her dog.',
      targetForm: 'v3',
      translationSk: 'Nakreslila krásny portrét svojho psa.',
      whySk: 'Po „has“ nasleduje 3. tvar „drawn“.',
    },
  },
  {
    id: 'drive',
    v1: 'drive',
    v2: 'drove',
    v3: 'driven',
    thirdPerson: 'drives',
    ingForm: 'driving',
    ipa: { v1: '/draɪv/', v2: '/drəʊv/', v3: '/ˈdrɪvn/' },
    pronunciationSk: { v1: 'drajv', v2: 'drouv', v3: 'drivn' },
    translationSk: 'šoférovať, viezť (autom)',
    otherMeaningsSk: 'dohnať niekoho k niečomu',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor ako write/ride: i -> o -> i+en. Všimnite si výslovnosť: V1 [drajv], V2 [drouv], ale V3 má krátke „i“ a jedno „v“: „driven“ [drivn]!',
      formsGuide: {
        v1: 'drive [drajv] = šoférujem / šoférovať. V -ing tvare odpadá -e: driving.',
        v2: 'drove [drouv] = šoféroval som, viezol som.',
        v3: 'driven [drivn] = šoféroval (I have never driven an automatic car).',
      },
      tipSk:
        'Auto sa šoféruje pomocou „drive a car“, ale na bicykli alebo motorke sa „jazdí“ pomocou „ride a bike / motorbike“!',
    },
    examples: {
      v1: {
        en: 'Can you drive a manual car?',
        sk: 'Vieš šoférovať auto s manuálnou prevodovkou?',
        note: 'Po modálnom can ide 1. tvar „drive“.',
      },
      v2: {
        en: 'We drove all the way to Vienna.',
        sk: 'Celú cestu do Viedne sme išli autom.',
        note: '2. tvar „drove“.',
      },
      v3: {
        en: 'Have you ever driven in snow?',
        sk: 'Šoféroval si niekedy na snehu?',
        note: 'Skúsenosť s Have + ever + 3. tvar „driven“.',
      },
      questionNeg: {
        en: "Didn't your brother drive you to the airport?",
        sk: 'Neodviezol ťa na letisko tvoj brat?',
        note: 'Záporná otázka s didn’t + 1. tvar „drive“.',
      },
    },
    sentenceGap: {
      sentence: 'Slow down! You are ____ too fast on this road.',
      targetForm: 'ingForm',
      translationSk: 'Spomaľ! Na tejto ceste šoféruješ príliš rýchlo.',
      whySk: 'Priebehový prítomný čas po „are“: odpadá -e -> „driving“.',
    },
  },
  {
    id: 'fall',
    v1: 'fall',
    v2: 'fell',
    v3: 'fallen',
    thirdPerson: 'falls',
    ingForm: 'falling',
    ipa: { v1: '/fɔːl/', v2: '/fel/', v3: '/ˈfɔːlən/' },
    pronunciationSk: { v1: 'fól', v2: 'fel', v3: 'fóln' },
    translationSk: 'spadnúť, padnúť',
    otherMeaningsSk: 'klesnúť (ceny), zaspať (fall asleep), zamilovať sa (fall in love)',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Pozor na zámenu s „feel“! „Feel – felt – felt“ je cítiť (s -t na konci), zatiaľ čo „Fall – fell – fallen“ je spadnúť (bez -t!).',
      formsGuide: {
        v1: 'fall [fól] = padám / spadnúť.',
        v2: 'fell [fel] = spadol som, klesol.',
        v3: 'fallen [fóln] = spadnutý / spadol (fallen leaves = opadané lístie).',
      },
      tipSk:
        'Skvelé každodenné frázy: „fall asleep“ (zaspať) -> v minulosti „I fell asleep at 10 p.m.“; „fall in love“ (zamilovať sa).',
    },
    examples: {
      v1: {
        en: 'Leaves fall from the trees in autumn.',
        sk: 'Na jeseň padá lístie zo stromov.',
        note: 'Všeobecný fakt -> 1. tvar „fall“.',
      },
      v2: {
        en: 'He slipped on the ice and fell.',
        sk: 'Pošmykol sa na ľade a spadol.',
        note: '2. tvar „fell“ (nie felt!).',
      },
      v3: {
        en: 'Prices have fallen slightly this month.',
        sk: 'Ceny tento mesiac mierne klesli.',
        note: 'Have + 3. tvar „fallen“.',
      },
      questionNeg: {
        en: "Didn't she fall asleep during the lecture?",
        sk: 'Nezaspala počas prednášky?',
        note: 'Záporná otázka s didn’t + 1. tvar „fall“.',
      },
    },
    sentenceGap: {
      sentence: 'A lot of snow has ____ overnight.',
      targetForm: 'v3',
      translationSk: 'Cez noc napadlo veľa snehu.',
      whySk: 'Po „has“ v predprítomnom čase ide 3. tvar „fallen“.',
    },
  },
  {
    id: 'fly',
    v1: 'fly',
    v2: 'flew',
    v3: 'flown',
    thirdPerson: 'flies',
    ingForm: 'flying',
    ipa: { v1: '/flaɪ/', v2: '/fluː/', v3: '/fləʊn/' },
    pronunciationSk: { v1: 'flaj', v2: 'flú', v3: 'floun' },
    translationSk: 'letieť, lietať',
    otherMeaningsSk: 'rýchlo ubehnúť (Time flies)',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'V 3. osobe jednotného čísla sa mení spoluhláska+y na „-ies“: „flies“ (Time flies = Čas letí). Minulosť je „flew“ [flú], príčastie „flown“ [floun].',
      formsGuide: {
        v1: 'fly [flaj] = letím / lietať. V 3. osobe „flies“, v -ing tvare sa y nemení: „flying“.',
        v2: 'flew [flú] = letel som.',
        v3: 'flown [floun] = letel (Have you ever flown in a helicopter?).',
      },
      tipSk:
        'Nezamieňať s „flow“ (tiecť — pravidelné: flow-flowed-flowed)! Lietadlo letí -> fly – flew – flown.',
    },
    examples: {
      v1: {
        en: 'Time flies when you are having fun.',
        sk: 'Čas letí, keď sa dobre zabávaš.',
        note: '3. osoba prítomného času: y -> ies = „flies“.',
      },
      v2: {
        en: 'We flew to London for the weekend.',
        sk: 'Na víkend sme leteli do Londýna.',
        note: '2. tvar „flew“ [flú].',
      },
      v3: {
        en: 'She has never flown by plane before.',
        sk: 'Ešte nikdy predtým neletela lietadlom.',
        note: 'Skúsenosť s has never + 3. tvar „flown“.',
      },
      questionNeg: {
        en: "Aren't you flying to Paris tomorrow?",
        sk: 'Neletíš zajtra do Paríža?',
        note: 'Záporná otázka pre pevný zajtrajší plán.',
      },
    },
    sentenceGap: {
      sentence: 'Look at that eagle ____ high above the valley.',
      targetForm: 'ingForm',
      translationSk: 'Pozri na toho orla letiaceho vysoko nad údolím.',
      whySk: 'Prebiehajúci pohyb po slovese zmyslového vnímania -> „flying“ (y ostáva!).',
    },
  },
  {
    id: 'forget',
    v1: 'forget',
    v2: 'forgot',
    v3: 'forgotten',
    thirdPerson: 'forgets',
    ingForm: 'forgetting',
    ipa: { v1: '/fəˈɡet/', v2: '/fəˈɡɒt/', v3: '/fəˈɡɒtn/' },
    pronunciationSk: { v1: 'fəget', v2: 'fəgot', v3: 'fəgotn' },
    translationSk: 'zabudnúť',
    otherMeaningsSk: 'opomenúť niečo urobiť',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Sloveso „get“ s predponou „for-“. Zaujímavosť: kým samotné „get“ má v britskej angličtine 3. tvar „got“, „forget“ má VŽDY 3. tvar „forgotten“ (s dvoma tt)!',
      formsGuide: {
        v1: 'forget = zabudnem / zabúdať. V -ing tvare sa zdvojuje t: forgetting.',
        v2: 'forgot = zabudol som (Oh no, I forgot!).',
        v3: 'forgotten = zabudnutý / zabudol (Have you forgotten?).',
      },
      tipSk:
        'Rozdiel „forget to do“ vs „forget doing“: „I forgot to lock the door“ = Zabudol som zamknúť (nezamkol som). „I will never forget meeting you“ = Nikdy nezabudnem na to, ako sme sa stretli.',
    },
    examples: {
      v1: {
        en: "Don't forget to take your keys!",
        sk: 'Nezabudni si vziať kľúče!',
        note: 'Záporný rozkaz: Don’t + 1. tvar „forget“.',
      },
      v2: {
        en: 'Sorry, I completely forgot about our call.',
        sk: 'Prepáč, úplne som zabudol na náš telefonát.',
        note: '2. tvar „forgot“.',
      },
      v3: {
        en: 'I have forgotten my password again.',
        sk: 'Zase som zabudol svoje heslo.',
        note: 'Aktuálny problém teraz -> have + 3. tvar „forgotten“.',
      },
      questionNeg: {
        en: "Didn't you forget something on the table?",
        sk: 'Nezabudol si niečo na stole?',
        note: 'Záporná otázka s didn’t + 1. tvar „forget“.',
      },
    },
    sentenceGap: {
      sentence: 'She has never ____ her first trip abroad.',
      targetForm: 'v3',
      translationSk: 'Nikdy nezabudla na svoju prvú cestu do zahraničia.',
      whySk: 'Po „has never“ patrí 3. tvar s dvoma t: „forgotten“.',
    },
  },
  {
    id: 'forgive',
    v1: 'forgive',
    v2: 'forgave',
    v3: 'forgiven',
    thirdPerson: 'forgives',
    ingForm: 'forgiving',
    ipa: { v1: '/fəˈɡɪv/', v2: '/fəˈɡeɪv/', v3: '/fəˈɡɪvn/' },
    pronunciationSk: { v1: 'fəgiv', v2: 'fəgejv', v3: 'fəgivn' },
    translationSk: 'odpustiť',
    otherMeaningsSk: 'prepáčiť',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Sloveso „give“ s predponou „for-“. Časuje sa úplne rovnako ako „give – gave – given“! Ak niekoho prosíte o odpustenie, hovoríte „Forgive me“ (bez „to“).',
      formsGuide: {
        v1: 'forgive = odpustím / odpúšťať. V -ing tvare odpadá -e: forgiving.',
        v2: 'forgave = odpustil som.',
        v3: 'forgiven = odpustený / odpustil.',
      },
      tipSk:
        'Dvojica na ľahké zapamätanie: give – gave – given → forgive – forgave – forgiven.',
    },
    examples: {
      v1: {
        en: 'Please forgive me for being late.',
        sk: 'Prosím, odpusť mi, že meškám.',
        note: 'Väzba forgive + osoba + for + -ing.',
      },
      v2: {
        en: 'She forgave him after an honest talk.',
        sk: 'Po úprimnom rozhovore mu odpustila.',
        note: '2. tvar „forgave“.',
      },
      v3: {
        en: 'Everything has been forgiven.',
        sk: 'Všetko bolo odpustené.',
        note: 'Trpný rod s 3. tvarom „forgiven“.',
      },
      questionNeg: {
        en: "Won't you forgive me this time?",
        sk: 'Neodpustíš mi tentokrát?',
        note: 'Záporná otázka v budúcnosti: Won’t + podmet + 1. tvar „forgive“.',
      },
    },
    sentenceGap: {
      sentence: 'It took months, but eventually they ____ each other.',
      targetForm: 'v2',
      translationSk: 'Trvalo to mesiace, ale nakoniec si navzájom odpustili.',
      whySk: 'Dej v minulosti („took“) -> 2. tvar „forgave“.',
    },
  },
  {
    id: 'freeze',
    v1: 'freeze',
    v2: 'froze',
    v3: 'frozen',
    thirdPerson: 'freezes',
    ingForm: 'freezing',
    ipa: { v1: '/friːz/', v2: '/frəʊz/', v3: '/ˈfrəʊzn/' },
    pronunciationSk: { v1: 'fríz', v2: 'frouz', v3: 'frouzn' },
    translationSk: 'zamrznúť, zmraziť',
    otherMeaningsSk: 'mrznúť, zaseknúť sa (obrazovka)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor podobný ako speak/break/choose: dlhé „ee“ v 1. tvare sa zmení na „o“ v V2 a „-en“ v V3. Tretí tvar „frozen“ pozná skoro každý aj z názvu rozprávky alebo z mrazených potravín (frozen food).',
      formsGuide: {
        v1: 'freeze [fríz] = mrzne / zamraziť. V -ing tvare: freezing (= mrazivo).',
        v2: 'froze [frouz] = zamrzlo, zamrzol.',
        v3: 'frozen [frouzn] = zamrznutý / zmrazený.',
      },
      tipSk:
        'Používa sa aj pri technike: „My laptop froze!“ = Zasekol (zamrzol) sa mi notebook!',
    },
    examples: {
      v1: {
        en: 'Water freezes at zero degrees Celsius.',
        sk: 'Voda zamŕza pri nule stupňov Celzia.',
        note: 'Prírodný zákon -> prítomný jednoduchý čas „freezes“.',
      },
      v2: {
        en: 'The lake froze completely in January.',
        sk: 'Jazero v januári úplne zamrzlo.',
        note: 'Minulý čas = 2. tvar „froze“.',
      },
      v3: {
        en: 'My hands are completely frozen!',
        sk: 'Mám úplne zmrznuté ruky!',
        note: '3. tvar „frozen“ ako prídavné meno po „are“.',
      },
      questionNeg: {
        en: "Didn't your screen freeze during the update?",
        sk: 'Nezamrzla ti obrazovka počas aktualizácie?',
        note: 'Záporná otázka s didn’t + 1. tvar „freeze“.',
      },
    },
    sentenceGap: {
      sentence: 'We usually buy ____ vegetables in winter.',
      targetForm: 'v3',
      translationSk: 'V zime zvyčajne kupujeme mrazenú zeleninu.',
      whySk: 'Ako prívlastok „mrazený“ používame 3. tvar „frozen“.',
    },
  },
  {
    id: 'grow',
    v1: 'grow',
    v2: 'grew',
    v3: 'grown',
    thirdPerson: 'grows',
    ingForm: 'growing',
    ipa: { v1: '/ɡrəʊ/', v2: '/ɡruː/', v3: '/ɡrəʊn/' },
    pronunciationSk: { v1: 'grou', v2: 'grú', v3: 'groun' },
    translationSk: 'rásť, pestovať',
    otherMeaningsSk: 'vyrásť (grow up), postupne sa stať',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Patrí do skupiny „ow – ew – own“ ako know – knew – known alebo blow – blew – blown! Okrem „rásť“ znamená s predmetom aj „pestovať“ (grow tomatoes).',
      formsGuide: {
        v1: 'grow [grou] = rastiem / pestovať.',
        v2: 'grew [grú] = rástol, vypestoval, vyrástol.',
        v3: 'grown [groun] = dospelý (grown-up) / vyrástol (po have/has).',
      },
      tipSk:
        'Rozdiel „grow“ vs „grow up“: kvety a vlasy rastú („grow“), ale deti vyrastajú na dospelých v nejakom meste („I grew up in Nitra“).',
    },
    examples: {
      v1: {
        en: 'We grow fresh herbs on our balcony.',
        sk: 'Na balkóne pestujeme čerstvé bylinky.',
        note: 'Prítomný jednoduchý čas -> 1. tvar „grow“.',
      },
      v2: {
        en: 'I grew up in a small village.',
        sk: 'Vyrastal som v malej dedine.',
        note: 'Frázové sloveso grow up v 2. tvare „grew“.',
      },
      v3: {
        en: 'Wow, you have grown so tall!',
        sk: 'Páni, ty si ale vyrástol!',
        note: 'Viditeľná zmena po have -> 3. tvar „grown“.',
      },
      questionNeg: {
        en: "Didn't she grow up near Košice?",
        sk: 'Nevyrastala náhodou pri Košiciach?',
        note: 'Záporná otázka s didn’t + 1. tvar „grow“.',
      },
    },
    sentenceGap: {
      sentence: 'The city’s population has ____ rapidly over the last decade.',
      targetForm: 'v3',
      translationSk: 'Počet obyvateľov mesta za posledné desaťročie rýchlo narástol.',
      whySk: 'Po „has“ nasleduje 3. tvar „grown“.',
    },
  },
  {
    id: 'hide',
    v1: 'hide',
    v2: 'hid',
    v3: 'hidden',
    thirdPerson: 'hides',
    ingForm: 'hiding',
    ipa: { v1: '/haɪd/', v2: '/hɪd/', v3: '/ˈhɪdn/' },
    pronunciationSk: { v1: 'hajd', v2: 'hid', v3: 'hidn' },
    translationSk: 'skryť (sa), schovať (sa)',
    otherMeaningsSk: 'tajiť niečo',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor i-dlhé [aj] -> i-krátke [i] -> dvojité dd+en: hide – hid – hidden. Podobne sa správa aj bite – bit – bitten!',
      formsGuide: {
        v1: 'hide [hajd] = skryjem (sa) / schovať. V -ing tvare odpadá -e: hiding.',
        v2: 'hid [hid] = skryl som (sa).',
        v3: 'hidden [hidn] = skrytý / schovaný (dve dd!).',
      },
      tipSk:
        'V angličtine pri „schovať sa“ nepotrebujete „myself“: stačí „The cat hid under the bed“ (Mačka sa schovala pod posteľ).',
    },
    examples: {
      v1: {
        en: 'You cannot hide the truth forever.',
        sk: 'Pravdu nemôžeš skrývať navždy.',
        note: 'Po modálnom cannot ide 1. tvar „hide“.',
      },
      v2: {
        en: 'The dog hid its bone in the garden.',
        sk: 'Pes schoval svoju kosť v záhrade.',
        note: '2. tvar „hid“.',
      },
      v3: {
        en: 'The treasure was hidden in a cave.',
        sk: 'Poklad bol ukrytý v jaskyni.',
        note: 'Trpný rod s 3. tvarom „hidden“ (dve d!).',
      },
      questionNeg: {
        en: "Why didn't you hide behind the tree?",
        sk: 'Prečo si sa neschoval za strom?',
        note: 'Záporná otázka s didn’t + 1. tvar „hide“.',
      },
    },
    sentenceGap: {
      sentence: 'There is a ____ message inside this file.',
      targetForm: 'v3',
      translationSk: 'V tomto súbore je skrytá správa.',
      whySk: 'Ako prívlastok „skrytý“ používame 3. tvar „hidden“.',
    },
  },
  {
    id: 'hit',
    v1: 'hit',
    v2: 'hit',
    v3: 'hit',
    thirdPerson: 'hits',
    ingForm: 'hitting',
    ipa: { v1: '/hɪt/', v2: '/hɪt/', v3: '/hɪt/' },
    pronunciationSk: { v1: 'hit', v2: 'hit', v3: 'hit' },
    translationSk: 'udrieť, trafiť, naraziť',
    otherMeaningsSk: 'zasiahnuť (búrka), stlačiť (kláves)',
    level: 'A2',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sú „hit“. Používa sa pre úder, zasiahnutie loptičky, náraz auta aj kliknutie/stlačenie tlačidla (Hit Enter!).',
      formsGuide: {
        v1: 'hit = udriem / trafiť. V -ing tvare sa zdvojuje t: hitting.',
        v2: 'hit = udrel som, narazil som.',
        v3: 'hit = zasiahnutý / trafil (po have/has alebo be).',
      },
      tipSk:
        'Nikdy nehovorte „hitted“! V minulom čase stačí „He hit his head on the door“ (Udrel si hlavu o dvere).',
    },
    examples: {
      v1: {
        en: 'Hit the spacebar to pause the video.',
        sk: 'Stlač medzerník na pozastavenie videa.',
        note: 'Rozkazovací spôsob -> 1. tvar „hit“.',
      },
      v2: {
        en: 'The tennis player hit the ball hard.',
        sk: 'Tenista prudko udrel do loptičky.',
        note: 'Bez -s pri „player“ = minulý čas „hit“.',
      },
      v3: {
        en: 'The coastal town was hit by a storm.',
        sk: 'Pobrežné mesto zasiahla búrka.',
        note: 'Trpný rod „was + 3. tvar hit“.',
      },
      questionNeg: {
        en: "Didn't the ball hit the post?",
        sk: 'Netrafila lopta žrď?',
        note: 'Záporná otázka s didn’t + 1. tvar „hit“.',
      },
    },
    sentenceGap: {
      sentence: 'Stop ____ the table, please!',
      targetForm: 'ingForm',
      translationSk: 'Prestaň prosím búchať do stola!',
      whySk: 'Po „stop“ (prestať s činnosťou) ide -ing tvar so zdvojeným t: „hitting“.',
    },
  },
  {
    id: 'hold',
    v1: 'hold',
    v2: 'held',
    v3: 'held',
    thirdPerson: 'holds',
    ingForm: 'holding',
    ipa: { v1: '/həʊld/', v2: '/held/', v3: '/held/' },
    pronunciationSk: { v1: 'hould', v2: 'held', v3: 'held' },
    translationSk: 'držať, podržať, konať sa',
    otherMeaningsSk: 'počkať na linke (hold on), pojať (kapacita)',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        '2. a 3. tvar sú zhodné: „held“. Znamená fyzicky niečo držať v ruke (hold a baby), ale aj „usporiadať / konať sa“ pri podujatiach (hold a meeting/concert).',
      formsGuide: {
        v1: 'hold [hould] = držím / podržať.',
        v2: 'held [held] = držal som, konal sa.',
        v3: 'held [held] = konaný / držal (The event will be held in May).',
      },
      tipSk:
        'V telefonáte často počujete „Hold on, please!“ = Vydržte na linke, prosím! A vo význame kapacity: „The hall holds 500 people“.',
    },
    examples: {
      v1: {
        en: 'Hold the door open for a second, please.',
        sk: 'Podrž prosím na sekundu otvorené dvere.',
        note: '1. tvar „hold“.',
      },
      v2: {
        en: 'They held a meeting yesterday afternoon.',
        sk: 'Včera popoludní usporiadali stretnutie.',
        note: '2. tvar „held“.',
      },
      v3: {
        en: 'The Olympic Games were held in Paris.',
        sk: 'Olympijské hry sa konali v Paríži.',
        note: 'Trpný rod „were + 3. tvar held“.',
      },
      questionNeg: {
        en: "Weren't the elections held last autumn?",
        sk: 'Nekonali sa voľby minulú jeseň?',
        note: 'Záporná trpná otázka v minulosti: Weren’t + podmet + 3. tvar „held“.',
      },
    },
    sentenceGap: {
      sentence: 'He ____ the baby carefully in his arms.',
      targetForm: 'v2',
      translationSk: 'Opatrne držal bábätko v náručí.',
      whySk: 'Minulý čas v oznamovacej vete -> 2. tvar „held“.',
    },
  },
  {
    id: 'hurt',
    v1: 'hurt',
    v2: 'hurt',
    v3: 'hurt',
    thirdPerson: 'hurts',
    ingForm: 'hurting',
    ipa: { v1: '/hɜːt/', v2: '/hɜːt/', v3: '/hɜːt/' },
    pronunciationSk: { v1: 'hért', v2: 'hért', v3: 'hért' },
    translationSk: 'bolieť, zraniť',
    otherMeaningsSk: 'ublížiť (niekomu citovo aj fyzicky)',
    level: 'A2',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: hurt – hurt – hurt [hért]. Funguje obojstranne: časť tela bolí („My back hurts“), alebo niekto ublíži niekomu („He hurt my feelings“).',
      formsGuide: {
        v1: 'hurt = bolí / bolieť / zraniť (v 3. osobe s -s: My tooth hurts).',
        v2: 'hurt = bolelo, zranil som si (bez -s: My tooth hurt yesterday).',
        v3: 'hurt = zranený / ublížil (Nobody was hurt = Nikto sa nezranil).',
      },
      tipSk:
        'Ako povedať „Zranil som si koleno“? Nepotrebuješ zvratné zámeno: „I hurt my knee“ (doslova: zranil som moje koleno).',
    },
    examples: {
      v1: {
        en: 'My feet hurt after walking all day.',
        sk: 'Po celodennom chodení ma bolia nohy.',
        note: 'Množné číslo „feet“ -> prítomný tvar „hurt“.',
      },
      v2: {
        en: 'She fell and hurt her wrist.',
        sk: 'Spadla a poranila si zápästie.',
        note: 'Minulý čas = 2. tvar „hurt“.',
      },
      v3: {
        en: 'Thankfully, nobody was hurt in the accident.',
        sk: 'Našťastie sa pri nehode nikto nezranil.',
        note: 'Trpný rod „was + 3. tvar hurt“.',
      },
      questionNeg: {
        en: "Doesn't your ankle hurt anymore?",
        sk: 'Už ťa nebolí ten členok?',
        note: 'Záporná otázka s doesn’t + 1. tvar „hurt“.',
      },
    },
    sentenceGap: {
      sentence: 'Ouch! That really ____ when you pressed it.',
      targetForm: 'v2',
      translationSk: 'Au! To naozaj bolelo, keď si na to zatlačil.',
      whySk: '„When you pressed it“ je minulosť, takže aj „hurt“ bez -s je v 2. tvare.',
    },
  },
  {
    id: 'learn',
    v1: 'learn',
    v2: 'learnt / learned',
    v3: 'learnt / learned',
    v2Accepted: ['learnt', 'learned', 'learnt/learned', 'learnt / learned'],
    v3Accepted: ['learnt', 'learned', 'learnt/learned', 'learnt / learned'],
    thirdPerson: 'learns',
    ingForm: 'learning',
    ipa: { v1: '/lɜːn/', v2: '/lɜːnt/ · /lɜːnd/', v3: '/lɜːnt/ · /lɜːnd/' },
    pronunciationSk: { v1: 'lérn', v2: 'lérnt / lérnd', v3: 'lérnt / lérnd' },
    translationSk: 'učiť sa, naučiť sa',
    otherMeaningsSk: 'dozvedieť sa (learn the truth)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Má dve správne podoby: v britskej angličtine je obľúbené nepravidelné „learnt“, v americkej angličtine pravidelné „learned“. Obe sú 100 % správne!',
      formsGuide: {
        v1: 'learn [lérn] = učím sa / naučiť sa (sám!). Ak učíte niekoho iného, je to „teach“!',
        v2: 'learnt / learned = naučil som sa, učil som sa, dozvedel som sa.',
        v3: 'learnt / learned = naučený / naučil sa (po have/has).',
      },
      tipSk:
        'Nikdy nezamieňať „learn“ a „teach“: Učiteľ ťa UČÍ (teaches you), žiak sa UČÍ (learns)!',
    },
    examples: {
      v1: {
        en: 'We learn five new words every day.',
        sk: 'Každý deň sa učíme päť nových slovíčok.',
        note: 'Prítomný zvyk -> 1. tvar „learn“.',
      },
      v2: {
        en: 'I learnt to ride a bike when I was six.',
        sk: 'Naučil som sa bicyklovať, keď som mal šesť rokov.',
        note: '2. tvar „learnt“ (alebo „learned“).',
      },
      v3: {
        en: 'What have you learnt from this experience?',
        sk: 'Čo si sa z tejto skúsenosti naučil?',
        note: 'Have + podmet + 3. tvar „learnt / learned“.',
      },
      questionNeg: {
        en: "Haven't you learnt this grammar yet?",
        sk: 'Ešte si sa túto gramatiku nenaučil?',
        note: 'Záporná predprítomná otázka s 3. tvarom.',
      },
    },
    sentenceGap: {
      sentence: 'She ____ how to swim last summer.',
      targetForm: 'v2',
      translationSk: 'Minulé leto sa naučila plávať.',
      whySk: '„Last summer“ je minulosť — správne je „learnt“ aj „learned“.',
    },
  },
  {
    id: 'lend',
    v1: 'lend',
    v2: 'lent',
    v3: 'lent',
    thirdPerson: 'lends',
    ingForm: 'lending',
    ipa: { v1: '/lend/', v2: '/lent/', v3: '/lent/' },
    pronunciationSk: { v1: 'lend', v2: 'lent', v3: 'lent' },
    translationSk: 'požičať (niekomu)',
    otherMeaningsSk: 'dať na chvíľu k dispozícii',
    level: 'A2',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Rovnako ako send -> sent, aj „lend“ mení -d na -t: „lent“. Kľúčový rozdiel pre Slovákov: „lend“ znamená POŽIČAŤ NIEKOMU (dať preč), kým „borrow“ (pravidelné!) znamená POŽIČAŤ SI (vziať od niekoho)!',
      formsGuide: {
        v1: 'lend = požičiam niekomu (Can you lend me 10 euros?).',
        v2: 'lent = požičal som niekomu.',
        v3: 'lent = požičaný / požičal niekomu.',
      },
      tipSk:
        'Skvelý trik: „Lend“ = dať niekomu (Lend me your pen = Požičaj mi pero). „Borrow“ = vziať si (Can I borrow your pen? = Môžem si požičať tvoje pero?).',
    },
    examples: {
      v1: {
        en: 'Could you lend me your charger?',
        sk: 'Mohol by si mi požičať svoju nabíjačku?',
        note: 'Po modálnom could ide 1. tvar „lend“ + osoba „me“.',
      },
      v2: {
        en: 'I lent him my bike for the weekend.',
        sk: 'Požičal som mu na víkend svoj bicykel.',
        note: '2. tvar „lent“.',
      },
      v3: {
        en: 'The bank has lent us the money.',
        sk: 'Banka nám tie peniaze požičala.',
        note: 'Has + 3. tvar „lent“.',
      },
      questionNeg: {
        en: "Why didn't you lend her your umbrella?",
        sk: 'Prečo si jej nepožičal svoj dáždnik?',
        note: 'Záporná otázka s didn’t + 1. tvar „lend“.',
      },
    },
    sentenceGap: {
      sentence: 'Tom ____ me fifty euros until Friday.',
      targetForm: 'v2',
      translationSk: 'Tom mi požičal päťdesiat eur do piatka.',
      whySk: 'Minulý dej od slovesa požičať niekomu -> 2. tvar „lent“.',
    },
  },
  {
    id: 'lie',
    v1: 'lie',
    v2: 'lay',
    v3: 'lain',
    thirdPerson: 'lies',
    ingForm: 'lying',
    ipa: { v1: '/laɪ/', v2: '/leɪ/', v3: '/leɪn/' },
    pronunciationSk: { v1: 'laj', v2: 'lej', v3: 'lejn' },
    translationSk: 'ležať, ležať si',
    otherMeaningsSk: 'nachádzať sa (mesto leží pri rieke)',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Slávna dvojica (alebo trojica!) anglickej gramatiky: 1) „lie – lay – lain“ = LEŽAŤ (nepravidelné). 2) „lie – lied – lied“ = KLAMAŤ (pravidelné!). V -ing tvare sa „ie“ mení na „y“: „lying“!',
      formsGuide: {
        v1: 'lie [laj] = ležím / ležať. V -ing tvare: lying (nie lieing!).',
        v2: 'lay [lej] = ležal som (pozor, nie laid!).',
        v3: 'lain [lejn] = ležal (po have/has).',
      },
      tipSk:
        'Rozlíš si: „lie down“ = ľahnúť si / ležať (lie – lay – lain); „lie to someone“ = klamať niekomu (lie – lied – lied); „lay the table“ = prestrieť stôl / položiť niečo (lay – laid – laid).',
    },
    examples: {
      v1: {
        en: 'I like to lie on the beach and read.',
        sk: 'Rád ležím na pláži a čítam si.',
        note: '1. tvar „lie“.',
      },
      v2: {
        en: 'The dog lay peacefully in front of the fire.',
        sk: 'Pes pokojne ležal pred kozubom.',
        note: '2. tvar „lay“ (význam ležať v minulosti!).',
      },
      v3: {
        en: 'That letter has lain on the desk for days.',
        sk: 'Ten list leží na stole už celé dni.',
        note: 'Has + 3. tvar „lain“.',
      },
      questionNeg: {
        en: "Aren't you lying in bed too late today?",
        sk: 'Neležíš dnes v posteli akosi pridlho?',
        note: 'Záporná otázka s -ing tvarom „lying“.',
      },
    },
    sentenceGap: {
      sentence: 'He was ____ on the grass looking at the clouds.',
      targetForm: 'ingForm',
      translationSk: 'Ležal na tráve a pozeral sa na oblaky.',
      whySk: 'Priebehový tvar od „lie“ mení koncovku -ie na y: „lying“.',
    },
  },
  {
    id: 'light',
    v1: 'light',
    v2: 'lit / lighted',
    v3: 'lit / lighted',
    v2Accepted: ['lit', 'lighted', 'lit/lighted', 'lit / lighted'],
    v3Accepted: ['lit', 'lighted', 'lit/lighted', 'lit / lighted'],
    thirdPerson: 'lights',
    ingForm: 'lighting',
    ipa: { v1: '/laɪt/', v2: '/lɪt/', v3: '/lɪt/' },
    pronunciationSk: { v1: 'lajt', v2: 'lit', v3: 'lit' },
    translationSk: 'zapáliť, rozsvietiť',
    otherMeaningsSk: 'osvetliť (light up)',
    level: 'B1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Sloveso „light“ má najčastejšie krátky nepravidelný tvar „lit“ (a ako prídavné meno pred podstatným menom aj „lighted“, napr. a lighted candle).',
      formsGuide: {
        v1: 'light [lajt] = zapálim / rozsvietiť.',
        v2: 'lit (aj lighted) = zapálil som, rozsvietil som.',
        v3: 'lit (aj lighted) = rozsvietený / zapálený.',
      },
      tipSk:
        'Pri elektrickom svetle častejšie používame „turn on the light“, ale pri sviečke alebo ohni v krbe je ideálne „light a candle / light a fire“.',
    },
    examples: {
      v1: {
        en: 'Let’s light the candles on the cake.',
        sk: 'Zapáľme sviečky na torte.',
        note: '1. tvar „light“.',
      },
      v2: {
        en: 'She lit a fire in the fireplace.',
        sk: 'Zapálila oheň v krbe.',
        note: '2. tvar „lit“.',
      },
      v3: {
        en: 'The old street is brightly lit at night.',
        sk: 'Stará ulica je v noci jasne osvetlená.',
        note: 'Trpný rod „is + 3. tvar lit“.',
      },
      questionNeg: {
        en: "Didn't you light the fireplace yet?",
        sk: 'Ešte si nerozložil oheň v krbe?',
        note: 'Záporná otázka s didn’t + 1. tvar „light“.',
      },
    },
    sentenceGap: {
      sentence: 'The whole stadium was ____ up with fireworks.',
      targetForm: 'v3',
      translationSk: 'Celý štadión bol osvetlený ohňostrojom.',
      whySk: 'Trpný rod po „was“ vyžaduje 3. tvar „lit“ (alebo „lighted“).',
    },
  },
  {
    id: 'ride',
    v1: 'ride',
    v2: 'rode',
    v3: 'ridden',
    thirdPerson: 'rides',
    ingForm: 'riding',
    ipa: { v1: '/raɪd/', v2: '/rəʊd/', v3: '/ˈrɪdn/' },
    pronunciationSk: { v1: 'rajd', v2: 'roud', v3: 'ridn' },
    translationSk: 'jazdiť (na bicykli, koni, motorke)',
    otherMeaningsSk: 'viezť sa',
    level: 'A2',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Časuje sa presne ako write – wrote – written (vrátane dvojitého dd v „ridden“!). Používa sa pre vozidlá, na ktorých sa sedí obkročmo (bicykel, motorka, kôň).',
      formsGuide: {
        v1: 'ride [rajd] = jazdím / jazdiť. V -ing tvare odpadá -e: riding.',
        v2: 'rode [roud] = jazdil som.',
        v3: 'ridden [ridn] = jazdil (dve dd!).',
      },
      tipSk:
        'Auto = drive a car. Bicykel / motorka / kôň = ride a bike / motorbike / horse.',
    },
    examples: {
      v1: {
        en: 'He rides his bike to work every day.',
        sk: 'Každý deň chodí do práce na bicykli.',
        note: '3. osoba v prítomnosti -> rides.',
      },
      v2: {
        en: 'Last summer we rode horses in the mountains.',
        sk: 'Minulé leto sme v horách jazdili na koňoch.',
        note: '2. tvar „rode“.',
      },
      v3: {
        en: 'Have you ever ridden an electric scooter?',
        sk: 'Jazdil si niekedy na elektrokolobežke?',
        note: 'Skúsenosť s Have + ever + 3. tvar „ridden“.',
      },
      questionNeg: {
        en: "Didn't she ride her bicycle to school?",
        sk: 'Nešla do školy na bicykli?',
        note: 'Záporná otázka s didn’t + 1. tvar „ride“.',
      },
    },
    sentenceGap: {
      sentence: 'I have never ____ a motorcycle before.',
      targetForm: 'v3',
      translationSk: 'Ešte nikdy predtým som nejazdil na motorke.',
      whySk: 'Po „have never“ ide 3. tvar s dvoma d: „ridden“.',
    },
  },
  {
    id: 'ring',
    v1: 'ring',
    v2: 'rang',
    v3: 'rung',
    thirdPerson: 'rings',
    ingForm: 'ringing',
    ipa: { v1: '/rɪŋ/', v2: '/ræŋ/', v3: '/rʌŋ/' },
    pronunciationSk: { v1: 'ring', v2: 'reng', v3: 'rang' },
    translationSk: 'zvoniť, zatelefonovať',
    otherMeaningsSk: 'zazvoniť (budík, zvonček)',
    level: 'A2',
    pattern: 'IAU',
    slovakExplanation: {
      summary:
        'Vzor „i – a – u“ ako sing – sang – sung! V britskej angličtine znamená aj „zavolať niekomu“ (ring someone up), všade potom znamená zvoniť (telefón, zvonček, budík).',
      formsGuide: {
        v1: 'ring = zvoním / zvoniť.',
        v2: 'rang [reng] = zazvonil, zavolal.',
        v3: 'rung [rang] = zazvonil (po have/has).',
      },
      tipSk:
        'Nepovedz „rang“ pri prítomnom čase! Zvuk „ring-rang-rung“ ide presne podľa samohlások i-a-u.',
    },
    examples: {
      v1: {
        en: 'My alarm clock rings at 6:30.',
        sk: 'Môj budík zvoní o 6:30.',
        note: 'Prítomný zvyk v 3. osobe -> rings.',
      },
      v2: {
        en: 'The phone rang while I was showering.',
        sk: 'Telefón zazvonil, keď som sa sprchoval.',
        note: 'Krátky dej prerušujúci dlhší dej -> 2. tvar „rang“.',
      },
      v3: {
        en: 'The school bell has already rung.',
        sk: 'Školský zvonček už zazvonil.',
        note: 'Has + already + 3. tvar „rung“.',
      },
      questionNeg: {
        en: "Didn't your alarm ring this morning?",
        sk: 'Nezvonil ti dnes ráno budík?',
        note: 'Záporná otázka s didn’t + 1. tvar „ring“.',
      },
    },
    sentenceGap: {
      sentence: 'Pick it up, the phone is ____!',
      targetForm: 'ingForm',
      translationSk: 'Zdvihni to, zvoní telefón!',
      whySk: 'Dej prebiehajúci práve teraz po „is“ -> „ringing“.',
    },
  },
  {
    id: 'rise',
    v1: 'rise',
    v2: 'rose',
    v3: 'risen',
    thirdPerson: 'rises',
    ingForm: 'rising',
    ipa: { v1: '/raɪz/', v2: '/rəʊz/', v3: '/ˈrɪzn/' },
    pronunciationSk: { v1: 'rajz', v2: 'rouz', v3: 'rizn' },
    translationSk: 'stúpať, vychádzať (slnko)',
    otherMeaningsSk: 'rásť (ceny, teplota), povstať',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Vzor podobný drive/ride: rise [rajz] – rose [rouz] – risen [rizn]. Dôležitý rozdiel pre pokročilejších: „rise“ niečo robí SAMO (slnko vychádza, ceny stúpajú), zatiaľ čo „raise“ (pravidelné!) znamená NIEČO zdvihnúť (raise your hand).',
      formsGuide: {
        v1: 'rise = stúpa / vychádza (samo od seba, bez predmetu!). V -ing tvare odpadá -e: rising.',
        v2: 'rose = stúplo, vyšlo.',
        v3: 'risen = stúplo (Prices have risen by 10%).',
      },
      tipSk:
        'Pravidlo bez chyby: „The sun rises“ (slnko vychádza samo), ale „Raise your hand“ (zdvihni ruku — je tam predmet!).',
    },
    examples: {
      v1: {
        en: 'The sun rises in the east.',
        sk: 'Slnko vychádza na východe.',
        note: 'Všeobecná pravda -> 3. osoba „rises“.',
      },
      v2: {
        en: 'Smoke rose from the chimney.',
        sk: 'Z komína stúpal dym.',
        note: '2. tvar „rose“.',
      },
      v3: {
        en: 'Sea levels have risen over the years.',
        sk: 'Hladiny morí za tie roky stúpli.',
        note: 'Have + 3. tvar „risen“.',
      },
      questionNeg: {
        en: "Haven't fuel prices risen again?",
        sk: 'Nestúpli zase ceny palív?',
        note: 'Záporná predprítomná otázka s 3. tvarom „risen“.',
      },
    },
    sentenceGap: {
      sentence: 'Temperatures ____ sharply last week.',
      targetForm: 'v2',
      translationSk: 'Minulý týždeň teploty prudko stúpli.',
      whySk: '„Last week“ vyžaduje 2. tvar minulého času: „rose“.',
    },
  },
  {
    id: 'sell',
    v1: 'sell',
    v2: 'sold',
    v3: 'sold',
    thirdPerson: 'sells',
    ingForm: 'selling',
    ipa: { v1: '/sel/', v2: '/səʊld/', v3: '/səʊld/' },
    pronunciationSk: { v1: 'sel', v2: 'sould', v3: 'sould' },
    translationSk: 'predať, predávať',
    otherMeaningsSk: 'vypredať (sell out)',
    level: 'A1',
    pattern: 'ABB',
    slovakExplanation: {
      summary:
        'Správa sa identicky ako tell – told – told! Samohláska „e“ sa zmení na „o“ [sould]. Poznávate ho aj z nápisu „SOLD OUT“ (vypredané).',
      formsGuide: {
        v1: 'sell [sel] = predám / predávať.',
        v2: 'sold [sould] = predal som.',
        v3: 'sold [sould] = predaný / predal (This house is sold).',
      },
      tipSk:
        'Dvojica do páru: tell – told – told a sell – sold – sold!',
    },
    examples: {
      v1: {
        en: 'This shop sells fresh fruit and vegetables.',
        sk: 'Tento obchod predáva čerstvé ovocie a zeleninu.',
        note: '3. osoba v prítomnosti -> sells.',
      },
      v2: {
        en: 'He sold his old car last month.',
        sk: 'Minulý mesiac predal svoje staré auto.',
        note: '2. tvar „sold“.',
      },
      v3: {
        en: 'All the concert tickets are sold out.',
        sk: 'Všetky lístky na koncert sú vypredané.',
        note: 'Stav s 3. tvarom „sold“.',
      },
      questionNeg: {
        en: "Didn't they sell their apartment yet?",
        sk: 'Ešte nepredali svoj byt?',
        note: 'Záporná otázka s didn’t + 1. tvar „sell“.',
      },
    },
    sentenceGap: {
      sentence: 'We have finally ____ our old laptop online.',
      targetForm: 'v3',
      translationSk: 'Konečne sme cez internet predali náš starý notebook.',
      whySk: 'Po „have“ v predprítomnom čase ide 3. tvar „sold“.',
    },
  },
  {
    id: 'set',
    v1: 'set',
    v2: 'set',
    v3: 'set',
    thirdPerson: 'sets',
    ingForm: 'setting',
    ipa: { v1: '/set/', v2: '/set/', v3: '/set/' },
    pronunciationSk: { v1: 'set', v2: 'set', v3: 'set' },
    translationSk: 'nastaviť, položiť, zapadať (slnko)',
    otherMeaningsSk: 'stanoviť (cieľ, pravidlá), vyraziť na cestu (set off)',
    level: 'A2',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sú „set“. Veľmi časté v technike (set a password, set an alarm), v prírode (the sun sets) a pri stanovovaní cieľov.',
      formsGuide: {
        v1: 'set = nastavím / nastaviť. V -ing tvare sa zdvojuje t: setting.',
        v2: 'set = nastavil som, stanovil som.',
        v3: 'set = nastavený / stanovený (The table is set = Stôl je prestretý).',
      },
      tipSk:
        '„Sun rises“ (slnko vychádza) a „Sun sets“ (slnko zapadá) — odtiaľ pochádza aj slovo „sunset“ (západ slnka)!',
    },
    examples: {
      v1: {
        en: 'I always set my alarm for 6:45.',
        sk: 'Budík si vždy nastavujem na 6:45.',
        note: 'Prítomný zvyk -> 1. tvar „set“.',
      },
      v2: {
        en: 'We set off at dawn to avoid traffic.',
        sk: 'Vyrazili sme na úsvite, aby sme sa vyhli kolónam.',
        note: 'Frázové sloveso set off (vyraziť na cestu) v 2. tvare „set“.',
      },
      v3: {
        en: 'Have you set a date for the wedding?',
        sk: 'Už ste stanovili dátum svadby?',
        note: 'Have + podmet + 3. tvar „set“.',
      },
      questionNeg: {
        en: "Didn't you set the timer for 20 minutes?",
        sk: 'Nenastavil si časovač na 20 minút?',
        note: 'Záporná otázka s didn’t + 1. tvar „set“.',
      },
    },
    sentenceGap: {
      sentence: 'Look at the sky, the sun is ____ over the sea.',
      targetForm: 'ingForm',
      translationSk: 'Pozri na oblohu, slnko zapadá nad morom.',
      whySk: 'Dej práve teraz po „is“ zdvojuje t: „setting“.',
    },
  },
  {
    id: 'shake',
    v1: 'shake',
    v2: 'shook',
    v3: 'shaken',
    thirdPerson: 'shakes',
    ingForm: 'shaking',
    ipa: { v1: '/ʃeɪk/', v2: '/ʃʊk/', v3: '/ˈʃeɪkən/' },
    pronunciationSk: { v1: 'šejk', v2: 'šuk', v3: 'šejkn' },
    translationSk: 'triasť (sa), potriasť',
    otherMeaningsSk: 'podať si ruku (shake hands), zatriasť fľašou',
    level: 'B1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Časuje sa presne ako take – took – taken! Ak je vám zima alebo máte trému, môžete povedať „I am shaking“ (trasiem sa).',
      formsGuide: {
        v1: 'shake [šejk] = trasiem / zatriasť. V -ing tvare odpadá -e: shaking.',
        v2: 'shook [šuk] = potriasol som, zatriaslo sa.',
        v3: 'shaken [šejkn] = otrasený / potriasaný (napr. shaken by the news).',
      },
      tipSk:
        'Dvojica na zapamätanie: take – took – taken a shake – shook – shaken.',
    },
    examples: {
      v1: {
        en: 'Shake the bottle well before opening.',
        sk: 'Pred otvorením fľašu dobre pretrepte.',
        note: 'Rozkazovací spôsob -> 1. tvar „shake“.',
      },
      v2: {
        en: 'They shook hands and agreed on the price.',
        sk: 'Potriasli si rukami a dohodli sa na cene.',
        note: '2. tvar „shook“ [šuk].',
      },
      v3: {
        en: 'We were deeply shaken by the news.',
        sk: 'Tou správou sme boli hlboko otrasení.',
        note: 'Trpný stav „were + 3. tvar shaken“.',
      },
      questionNeg: {
        en: "Didn't you shake his hand when he arrived?",
        sk: 'Nepotriasol si mu rukou, keď prišiel?',
        note: 'Záporná otázka s didn’t + 1. tvar „shake“.',
      },
    },
    sentenceGap: {
      sentence: 'Why are your hands ____? Are you cold?',
      targetForm: 'ingForm',
      translationSk: 'Prečo sa ti trasú ruky? Je ti zima?',
      whySk: 'Prebiehajúci dej po „are“: odpadá -e -> „shaking“.',
    },
  },
  {
    id: 'show',
    v1: 'show',
    v2: 'showed',
    v3: 'shown / showed',
    v3Accepted: ['shown', 'showed', 'shown/showed', 'shown / showed'],
    thirdPerson: 'shows',
    ingForm: 'showing',
    ipa: { v1: '/ʃəʊ/', v2: '/ʃəʊd/', v3: '/ʃəʊn/' },
    pronunciationSk: { v1: 'šou', v2: 'šoud', v3: 'šoun' },
    translationSk: 'ukázať, prejaviť',
    otherMeaningsSk: 'dokázať (štúdie ukazujú)',
    level: 'A1',
    pattern: 'ABC',
    slovakExplanation: {
      summary:
        'Polonepravidelné sloveso! 2. tvar je pravidelný („showed“), ale v 3. tvare sa oveľa častejšie používa nepravidelné „shown“ [šoun].',
      formsGuide: {
        v1: 'show [šou] = ukážem / ukazovať.',
        v2: 'showed [šoud] = ukázal som.',
        v3: 'shown [šoun] = ukázaný / ukázal (zriedkavejšie aj showed).',
      },
      tipSk:
        'Pozor na slovosled: „Show me the photo“ alebo „Show the photo to me“ — rovnako ako pri give a send!',
    },
    examples: {
      v1: {
        en: 'Can you show me on the map?',
        sk: 'Môžeš mi to ukázať na mape?',
        note: 'Po modálnom can ide 1. tvar „show“.',
      },
      v2: {
        en: 'He showed us around the whole factory.',
        sk: 'Prevedol nás (ukázal nám) celú továreň.',
        note: '2. tvar „showed“.',
      },
      v3: {
        en: 'Research has shown that sleep improves memory.',
        sk: 'Výskum ukázal, že spánok zlepšuje pamäť.',
        note: 'Has + 3. tvar „shown“.',
      },
      questionNeg: {
        en: "Didn't she show you the new apartment?",
        sk: 'Neukázala ti nový byt?',
        note: 'Záporná otázka s didn’t + 1. tvar „show“.',
      },
    },
    sentenceGap: {
      sentence: 'This film has never been ____ on TV before.',
      targetForm: 'v3',
      translationSk: 'Tento film ešte nikdy predtým nebol vysielaný (ukázaný) v televízii.',
      whySk: 'Trpný rod „has been + V3“ -> najbežnejšie „shown“.',
    },
  },
  {
    id: 'shut',
    v1: 'shut',
    v2: 'shut',
    v3: 'shut',
    thirdPerson: 'shuts',
    ingForm: 'shutting',
    ipa: { v1: '/ʃʌt/', v2: '/ʃʌt/', v3: '/ʃʌt/' },
    pronunciationSk: { v1: 'šat', v2: 'šat', v3: 'šat' },
    translationSk: 'zavrieť, zatvoriť',
    otherMeaningsSk: 'zabuchnúť, zavrieť obchod',
    level: 'A2',
    pattern: 'AAA',
    slovakExplanation: {
      summary:
        'Skupina A-A-A: všetky tri tvary sú „shut“ [šat]. Významovo je veľmi blízke „close“ (pravidelné), len býva o niečo ráznejšie alebo rýchlejšie (shut the door, shut down the computer).',
      formsGuide: {
        v1: 'shut [šat] = zavriem / zatvoriť. V -ing tvare sa zdvojuje t: shutting.',
        v2: 'shut [šat] = zavrel som.',
        v3: 'shut [šat] = zatvorený / zavrel (The shop is shut = Obchod je zatvorený).',
      },
      tipSk:
        'V počítačovej terminológii: „Shut down the PC“ = Vypnúť počítač. Pri zdvorilej prosbe s oknom radšej použite „Could you close the window?“.',
    },
    examples: {
      v1: {
        en: 'Please shut the door gently.',
        sk: 'Prosím, zavri tie dvere jemne.',
        note: '1. tvar „shut“.',
      },
      v2: {
        en: 'He shut his laptop and went home.',
        sk: 'Zavrel notebook a išiel domov.',
        note: 'Bez -s po „he“ = minulý čas „shut“.',
      },
      v3: {
        en: 'All the windows were tightly shut.',
        sk: 'Všetky okná boli pevne zatvorené.',
        note: 'Stav v minulosti: were + 3. tvar „shut“.',
      },
      questionNeg: {
        en: "Didn't you shut the gate behind you?",
        sk: 'Nezavrel si za sebou bránu?',
        note: 'Záporná otázka s didn’t + 1. tvar „shut“.',
      },
    },
    sentenceGap: {
      sentence: 'I am ____ down my computer now.',
      targetForm: 'ingForm',
      translationSk: 'Práve teraz vypínam počítač.',
      whySk: 'Krátke jednoslabičné sloveso po „am“ zdvojuje t: „shutting“.',
    },
  },
];
