# Wealth Dashboard — initial specification

## Goal

Comprehensive personal wealth tracking dashboard, inspired by a "Kwid"-style tool (portfolio view
with allocation donut, target, P&L, detailed table by category).

## Stack

Full web application in **Vite + React / TypeScript** (not a static file). No backend planned at
this stage: data is entered and stored client-side.

## Asset categories tracked

- Real estate
- Life insurance (assurance vie)
- PEA (French equity savings plan)
- CTO (taxable brokerage account)
- Savings accounts (livrets)
- Crypto

## Data model

Line-by-line detail within each category (e.g. each property, each life insurance fund, each PEA
line, each CTO line, each crypto asset), with subtotals per category — matching the reference
"Portfolio" table.

Each line carries: name, current value, amount invested, daily P&L, unrealized P&L, allocation (%).

Starts with a template using example values; real amounts are entered manually afterwards (no
bank/broker API integration at this stage).

## Main screen

**Top row** — 4 performance boxes (daily, YTD), red/green/yellow color coding
(negative/positive/neutral):

1. Asia indices: Nikkei, Hang Seng, Shanghai, Kospi
2. Europe indices: STOXX 600, DAX, CAC 40, FTSE
3. US indices: S&P 500, Nasdaq, Dow Jones, Russell 2000
4. Portfolio performance (daily, YTD)

**Allocation donut chart** by category, with in the center: total net worth, daily change, ATH.
Below it, key stats: unrealized gain, IRR (money-weighted annualized return), passive income.

**Detailed table** by category and line: name, value/invested, daily P&L, unrealized P&L,
allocation.

## Decisions made

- Vite + React/TS instead of a static site: needs interactivity (data entry, derived
  calculations, charts) beyond what plain HTML/JS can cleanly provide.
- Line-by-line detail instead of a simple per-category total: needed to compute IRR and P&L per
  line, and to match the reference table's logic.
- Manual data entry at first instead of a bank integration: reduces initial complexity, leaves
  room for automation later.

## Component status

| Component                               | Status      |
| --------------------------------------- | ----------- |
| Vite + React + TS scaffolding           | Not started |
| Data model (categories, lines, history) | Not started |
| Asset line entry / editing              | Not started |
| P&L calculation (daily, unrealized)     | Not started |
| IRR calculation (money-weighted return) | Not started |
| Index price fetching (Asia/Europe/US)   | Not started |
| Index + portfolio performance boxes     | Not started |
| Allocation donut chart                  | Not started |
| Detailed table by category/line         | Not started |
