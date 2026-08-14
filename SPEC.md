# Dashboard Patrimoine — spécifications de départ

## Objectif

Dashboard complet de suivi du patrimoine personnel, inspiré d'un outil type "Kwid" (vue portefeuille
avec donut d'allocation, objectif, P&L, tableau détaillé par catégorie).

## Stack

Application web complète en **Vite + React / TypeScript** (pas un fichier statique). Aucun backend
prévu à ce stade : les données sont saisies et stockées côté client.

## Catégories d'actifs suivies

- Immobilier
- Assurance vie
- PEA
- CTO
- Livrets
- Crypto

## Modèle de données

Détail ligne par ligne dans chaque catégorie (ex : chaque bien immobilier, chaque fonds
d'assurance vie, chaque ligne PEA, chaque ligne CTO, chaque actif crypto), avec sous-totaux par
catégorie — à l'image du tableau "Portefeuille" de référence.

Chaque ligne porte : nom, valeur actuelle, montant investi, P&L jour, P&L non réalisé, allocation (%).

Départ avec un gabarit à valeurs d'exemple ; saisie manuelle des montants réels ensuite (pas
d'intégration API bancaire/courtier à ce stade).

## Écran principal

**Rangée du haut** — 4 boîtes de performance (daily, YTD), code couleur rouge/vert/jaune
(négatif/positif/neutre) :

1. Indices Asie : Nikkei, Hang Seng, Shanghai, Kospi
2. Indices Europe : STOXX 600, DAX, CAC 40, FTSE
3. Indices US : S&P 500, Nasdaq, Dow Jones, Russell 2000
4. Performance du portefeuille (daily, YTD)

**Donut chart d'allocation** par catégorie, avec au centre : patrimoine total, variation du jour, ATH.
En dessous, stats clés : plus-value, TRI (rendement annualisé money-weighted), revenus passifs.

**Tableau détaillé** par catégorie et par ligne : nom, valeur/investi, P&L jour, P&L non réalisé,
allocation.

## Décisions prises

- Vite + React/TS plutôt qu'un site statique : besoin d'interactivité (saisie, calculs dérivés,
  graphiques) qui dépasse ce qu'un simple HTML/JS permet proprement.
- Détail ligne par ligne plutôt qu'un simple total par catégorie : nécessaire pour calculer le TRI
  et le P&L par ligne, et pour retrouver la logique du tableau de référence.
- Saisie manuelle au départ plutôt qu'une intégration bancaire : réduit la complexité initiale,
  laisse la porte ouverte à une automatisation plus tard.

## État des composants

| Composant                                          | Statut  |
| -------------------------------------------------- | ------- |
| Scaffolding Vite + React + TS                      | À faire |
| Modèle de données (catégories, lignes, historique) | À faire |
| Saisie / édition des lignes d'actifs               | À faire |
| Calcul P&L (jour, non réalisé)                     | À faire |
| Calcul TRI (money-weighted return)                 | À faire |
| Récupération des cours d'indices (Asie/Europe/US)  | À faire |
| Boîtes de performance indices + portefeuille       | À faire |
| Donut chart d'allocation                           | À faire |
| Tableau détaillé par catégorie/ligne               | À faire |
