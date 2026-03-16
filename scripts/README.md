# Scripts

## Import seniors from CSV

After exporting **Senior Profile** form responses from Google Sheets as CSV:

```bash
# From project root — use your CSV path
npm run import-seniors "C:\downloads\Senior Profile (Responses) - Form Responses 1.csv"
```

Or put the CSV in the project root as `Senior Profile (Responses) - Form Responses 1.csv` and run:

```bash
npm run import-seniors
```

This updates `src/data/seniorsData.json`; the app reads seniors from that file. No need to edit `constants.js` by hand.
