# Angličtina do vrecka

Responzívna webová aplikácia na učenie a precvičovanie anglických nepravidelných slovies, časov a opytovania s vysvetlením v slovenčine a zvukovými ukážkami.

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
- **Precvičovanie slovies vo všetkých tvaroch:**
  - `V1 + V2 + V3` podľa slovenského prekladu
  - `V2 + V3` podľa zadaného `V1`
  - **Úplne všetky tvary naraz (5 tvarov):** `V1`, `V2`, `V3`, `3. osoba (-s)` a `-ing`
  - Náhodne odkrytý tvar
  - Doplňovanie správneho tvaru priamo do viet (kontext)
  - Výber z možností (ideálne na mobil)
  - Kartičky so zvukom (Flashcards)
- **Časy a otázky (+ / −):**
  - Interaktívne laboratórium viet a opytovania (naživo si vyberieš čas, osobu, sloveso, opytovacie slovo a formu vety)
  - Tvorba a vysvetlenie prítomného (Simple + Continuous), minulého (Simple + Continuous + Present Perfect ako most k 3. tvaru `V3`) a budúceho času (`will` + `going to`)
  - Osobitný návod na **pozitívne a negatívne otázky** vrátane toho, ako na záporné otázky správne odpovedať (`Yes, I did` vs `No, I didn't`)
- **Kvíz z časov a otázok:** okamžitá kontrola so slovenským vysvetlením a zvukovou ukážkou celej vety.

## Overenie a testy

```bash
npm test
npm run build
```
