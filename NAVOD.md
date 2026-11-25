# Angličtina do vrecka

Responzívna webová aplikácia na učenie a precvičovanie anglických nepravidelných slovies, 9 najdôležitejších anglických časov (A1–B2), hlbokej teórie „polopate“ pre Slovákov a 2 250 cvičných príkladov so zvukovými ukážkami.

## Ako aplikáciu spustiť

1. **Jednoducho na jedno kliknutie (Windows):**
   Dvakrát klikni na súbor `Spustit-Anglictinu.bat`. Automaticky spustí lokálny server a otvorí aplikáciu v prehliadači.

2. **Alebo cez terminál:**
   ```bash
   npm run dev
   ```
   A otvor v prehliadači adresu vypísanú v termináli (zvyčajne `http://localhost:5173`).

## Čo aplikácia obsahuje

- **Prehľad slovies (100 nepravidelných slovies):** vyhľadávanie po slovensky aj po anglicky, všetky tvary (`V1`, `V2`, `V3`, `3. osoba -s`, `-ing`), fonetický prepis IPA aj slovenský prepis výslovnosti, podrobné slovenské vysvetlenie, vzorové vety a **zvukové ukážky** (britský UK alebo americký US prízvuk + normálna/pomalá rýchlosť).
- **Precvičovanie slovies vo všetkých tvaroch:** 7 režimov (V1+V2+V3, V2+V3, všetkých 5 tvarov, náhodná medzera, kontext vo vete, výber z možností, kartičky so zvukom).
- **Kurz časov (9 krokov od A1 po B2) + Akadémia teórie polopate:**
  1. Present Simple (Prítomný jednoduchý)
  2. Present Continuous (Prítomný priebehový)
  3. Past Simple (Minulý jednoduchý)
  4. Past Continuous (Minulý priebehový)
  5. Future `will` (Budúci čas s „will“)
  6. Future `be going to` (Budúci čas s „going to“)
  7. Present Perfect (Predprítomný čas – most k V3)
  8. Present Perfect Continuous (Predprítomný priebehový čas)
  9. Past Perfect (Predminulý čas)
  - Každý krok obsahuje vizuálnu časovú os, **akademickú teóriu polopate** (mentálny model, nuansy a prekladový most pre Slovákov), všetky 4 formy (`+`, `−`, `?+`, `?−`) so zvukom, porovnanie s príbuzným časom a 3-úlohovú rozcvičku.
  - Samostatná sekcia **Teória polopate**: interaktívny **Rozhodovací kompas** („Ktorý čas použiť?“), matica 3 × 4 (slovenský vid vs. anglické aspekty), tajomstvo pomocných slovies `do/does/did`, 7 najväčších pascí pre Slovákov, stavové vs. dejové slovesá, slovosled **SVOMPT**, pravopis a výslovnosť koncovky `-ed` (`[t] / [d] / [ɪd]`) so zvukom.
  - Nechýba **Interaktívne laboratórium viet** (všetkých 9 časov), **Rýchla mapa 9 časov** a návod na **pozitívne a negatívne otázky**.
- **Testy z časov (2 250 unikátnych príkladov – 250 na každý čas):**
  - **Jeden čas:** 250 príkladov ku každému z 9 časov.
  - **8 odporúčaných kombinácií:** postupné porovnávacie testy (500 až 1 500 príkladov v balíku).
  - **Vlastný výber:** ľubovoľná kombinácia 2–9 časov.
  - **Finálny mix:** rovnomerne premiešané otázky zo všetkých 9 časov naraz (bez prezrádzania názvu času pred odpoveďou).
  - **Štýly testovania:** Výber zo 4 možností (pohodlný na mobil), Dopisovanie do vety (uznáva skrátené aj plné tvary, s postupnou nápovedou), alebo Striedavo (Mix); dĺžka kola `10 / 20 / 50 / 100 / 250`, filter formy viet (`+ / − / ?`) a **opakovanie chýb**.

## Overenie a testy

```bash
npm test
npm run build
```
