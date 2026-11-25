# Angličtina do vrecka

Responzívna webová aplikácia na učenie a precvičovanie anglických nepravidelných slovies, 9 najdôležitejších anglických časov (A1–B2) a kladného aj záporného opytovania s vysvetlením v slovenčine a zvukovými ukážkami.

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
- **Kurz časov (9 krokov od A1 po B2):**
  1. Present Simple (Prítomný jednoduchý)
  2. Present Continuous (Prítomný priebehový)
  3. Past Simple (Minulý jednoduchý)
  4. Past Continuous (Minulý priebehový)
  5. Future `will` (Budúci čas s „will“)
  6. Future `be going to` (Budúci čas s „going to“)
  7. Present Perfect (Predprítomný čas – most k V3)
  8. Present Perfect Continuous (Predprítomný priebehový čas)
  9. Past Perfect (Predminulý čas)
  - Každý krok obsahuje vizuálnu časovú os, porovnanie so slovenčinou, tvorbu všetkých 4 foriem (`+`, `−`, `?+`, `?−`) so zvukom, porovnanie s príbuzným časom a 3-úlohovú rozcvičku.
  - Súčasťou je aj **Interaktívne laboratórium viet** pre všetkých 9 časov, **Rýchla mapa 9 časov** a osobitný návod na **pozitívne a negatívne otázky**.
- **Testy z časov (900 unikátnych príkladov – 100 na každý čas):**
  - **Jeden čas:** 100 príkladov ku každému z 9 časov (sledovanie zvládnutia pre každý čas zvlášť).
  - **8 odporúčaných kombinácií:** postupné porovnávacie testy (napr. Prítomné spolu, Past Simple vs. Present Perfect, Príbeh v minulosti).
  - **Vlastný výber:** ľubovoľná kombinácia 2–9 časov.
  - **Finálny mix:** rovnomerne premiešané otázky zo všetkých 9 časov naraz (bez prezrádzania názvu času pred odpoveďou).
  - **Štýly testovania:** Výber zo 4 možností (pohodlný na mobil), Dopisovanie do vety (uznáva skrátené aj plné tvary, s postupnou nápovedou), alebo Striedavo (Mix); voľba dĺžky kola (`10 / 20 / 50 / 100`), filter formy viet (`+ / − / ?`) a **opakovanie chýb**.

## Overenie a testy

```bash
npm test
npm run build
```
