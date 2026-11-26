# Angličtina do vrecka

Responzívna webová aplikácia na praktické učenie sa angličtiny pre Slovákov: **praktický kurz A1 → B1 (cestovanie, bežné situácie a konverzácia)**, **9 anglických časov s prehľadnou teóriou polopate**, **2 250 cvičných príkladov na časy** a **100 nepravidelných slovies** — s kompletným automatickým ukladaním pokroku v prehliadači (`localStorage`).

## Ako aplikáciu spustiť

1. **Jednoducho na jedno kliknutie (Windows):**
   Dvakrát klikni na súbor `Spustit-Anglictinu.bat`. Automaticky spustí lokálny server a otvorí aplikáciu v prehliadači.

2. **Alebo cez terminál:**
   ```bash
   npm run dev
   ```
   A otvor v prehliadači adresu vypísanú v termináli (zvyčajne `http://localhost:5173`).

## Čo aplikácia obsahuje

- **Praktický kurz A1 → A2 → B1 (Cestovanie, bežné situácie & konverzácia):**
  - **16 tematických lekcií** (7× A1, 5× A2, 4× B1) vrátane rýchleho rozcestníka situácií na 1 klik: **kupovanie lístkov** (MHD, vlak, múzeá), **opýtanie sa, keď niečo hľadáš** (na ulici, stanici aj v budove), **nákup v potravinách a pekárni**, **jedlo zo stánku (street food) a v reštaurácii**, letisko, hotel, oblečenie a reklamácie, lekáreň, požičovňa áut, vyjadrovanie názoru a plynulé príbehy.
  - **320 praktických slovíčok a fráz** so zvukom, výslovnosťou, vzorovou vetou, prehľadným zoznamom aj **otočnými kartičkami**.
  - **160 kľúčových viet do praxe + 20 reálnych viacdielnych dialógov** s prehratím celého rozhovoru jedným klikom.
  - **192 interaktívnych úloh** (slovíčka, vety, reakcie v dialógu, gramatika a časy) + veľké testy pre A1, A2, B1, cestovateľský mix a opakovanie chýb.
- **Živá horná lišta a ukladanie pokroku v prehliadači:**
  - Počítadlo v hornej lište okamžite reaguje na každú vyriešenú úlohu (prispôsobuje sa aktívnej sekcii + zobrazuje denný počet úloh).
  - Kliknutím na počítadlo otvoríš **Môj pokrok a štatistiky učenia** (vrátane stiahnutia a obnovenia JSON zálohy pre prenos medzi počítačom a mobilom).
- **Kurz časov a teória (9 časov od A1 po B2):**
  - Vizuálne rozdelenie časov na **Prítomnosť · Minulosť · Budúcnosť** (alebo postupnosť 1 → 9) a 4 prehľadné karty v každej lekcii.
  - **Teória polopate (8 samostatných kapitol):** Rozhodovací kompas, Mapa 3 × 4, Pomocné slovesá `do/does/did`, Kladné a záporné otázky, 7 pascí pre Slovákov, Stavové slovesá, Slovosled **SVOMPT**, Pravopis a výslovnosť `-ed` + **Laboratórium viet**.
- **Testy z časov (2 250 unikátnych príkladov – 250 na každý čas):** jeden čas, 8 kombinácií, vlastný výber aj finálny mix všetkých 9 časov (`10 / 20 / 50 / 100 / 250` úloh).
- **Prehľad a precvičovanie 100 nepravidelných slovies:** vyhľadávanie po slovensky aj po anglicky, všetkých 5 tvarov (`V1`, `V2`, `V3`, `3. osoba -s`, `-ing`), výslovnosť UK/US a 7 tréningových režimov.

## Overenie a testy

```bash
npm test
npm run build
```
