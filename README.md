# Cours Git L3 — Bases de Git et GitHub

Bienvenue ! Ce dépôt contient un cours introductif à Git (partie 1), à GitHub (partie 2) et à la collaboration avancée (partie 3) pour des étudiants de Licence 3 Informatique (Corte).
Ce cours a été intégralement réalisé avec une IA (`xeCodex`).

- Objectif: comprendre et pratiquer Git d’abord (concepts, commandes), puis connecter un dépôt local à GitHub pour collaborer et valoriser son profil.
- Format: breakdown clair, pas-à-pas, avec exercices « recettes » et annexes.

## Table des matières
- Partie 1 — Bases de Git: `PARTIE-1-Git-Bases.md`
- Partie 2 — GitHub et dépôts distants: `PARTIE-2-GitHub-Remotes.md`
- Partie 3 — Collaboration, Forks & Pull Requests: `PARTIE-3-GitHub-Collaboration.md`
- Exercices pratiques (projet recettes): `exercices/README.md`
- Exercices GitHub (forks & PR): `exercices/github-collaboration.md`
- Annexes (cheatsheet, patch): `annexes/Cheatsheet.md`, `annexes/exemple.patch`

## Prérequis rapides
- Installer Git (Windows: Git for Windows + Git Bash; macOS: `xcode-select --install` ou installer Git; Linux: via le gestionnaire de paquets).
- Savoir ouvrir un terminal (ou Git Bash sous Windows).

## Démarrage express
```bash
# Créer un dossier de travail
mkdir cours-git && cd cours-git

# Initialiser Git
git init

# Config minimale (identité + branche par défaut)
git config user.name "Votre Nom"
git config user.email "votre@email"
git config init.defaultBranch main

# Lire le cours
cat ../PARTIE-1-Git-Bases.md
```

Bon cours et bonne pratique !
