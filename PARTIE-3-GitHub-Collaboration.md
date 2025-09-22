# Partie 3 — Collaboration GitHub (Forks, Issues, Pull Requests)

## Objectifs de la partie
- Comprendre comment contribuer à un dépôt que vous ne possédez pas.
- Maîtriser le workflow fork → clone → branche → pull request.
- Savoir interagir via Issues, discussions et revues de code.
- Automatiser la synchronisation de son fork avec le dépôt amont.

## Panorama des acteurs
- **Upstream**: dépôt original (souvent appartenant à un·e mainteneur·e ou une organisation).
- **Fork**: copie personnelle du dépôt upstream sur votre compte GitHub.
- **Clone**: copie locale (sur votre machine) de votre fork.
- **Branch**: espace de travail isolé pour préparer votre contribution.
- **Pull Request (PR)**: proposition de fusion de vos commits vers upstream.

## Workflow standard (Fork → PR)
1. **Forker** le dépôt upstream (`Fork` en haut à droite sur GitHub).
2. **Cloner** votre fork:
   ```bash
   git clone https://github.com/<votre-compte>/<projet>.git
   cd <projet>
   ```
3. **Ajouter upstream** pour suivre le dépôt original:
   ```bash
   git remote add upstream https://github.com/<propriétaire-officiel>/<projet>.git
   git remote -v
   ```
4. **Créer une branche** dédiée à votre contribution:
   ```bash
   git switch -c feature/amélioration-x
   ```
5. **Coder, tester, committer** (commits courts, messages clairs).
6. **Pousser** la branche sur *votre* fork:
   ```bash
   git push -u origin feature/amélioration-x
   ```
7. **Ouvrir une PR** sur GitHub (fork → upstream) avec un résumé, captures/tests.
8. **Itérer** sur les retours reviewers (commits supplémentaires si besoin).
9. **Fusion** par un mainteneur (merge/squash/rebase selon règles du projet).

## Synchroniser son fork
- Récupérer les nouveautés upstream:
  ```bash
  git fetch upstream
  git switch main
  git merge upstream/main    # ou git rebase upstream/main
  git push origin main
  ```
- Sur une branche de travail déjà existante, rebase proprement:
  ```bash
  git switch feature/amélioration-x
  git fetch upstream
  git rebase upstream/main
  # résoudre les conflits, puis git push --force-with-lease origin feature/amélioration-x
  ```

## Pull Request réussie — bonnes pratiques
- **Description claire**: contexte, solution, tests effectués.
- **Check-list**: cocher ce que vous avez vérifié (lint/tests/doc).
- **Labels/assignation**: faciliter le tri pour les mainteneurs.
- **Commits propres**: squash ou rebase avant merge si demandé.
- **Gentillesse**: ton respectueux, constructif.

## Issues & discussions
- Ouvrez une **Issue** avant de coder si la roadmap n’est pas défini.
- Format « bonne issue »:
  - Résumé concis
  - Étapes pour reproduire (si bug)
  - Comportement attendu/observé
  - Proposition de solution (si vous en avez)
- Liez votre PR à l’issue (`Fixes #123`).

## Automatiser les vérifications (aperçu CI)
- GitHub Actions pour lancer tests/lint sur chaque PR (`.github/workflows/`).
- Statut « ✅ Checks » requis avant merge (utile pour vos propres projets).
- Protection de branche: empêcher push direct sur `main`, exiger PR.

## Modèle de message de PR (exemple)
```
## Objet
Ajoute un guide de contribution.

## Contexte
- L’issue #12 demande une documentation pour les nouveaux contributeurs.

## Changements
- Ajout d’un fichier CONTRIBUTING.md.
- Mise à jour du README (section Contribuer).

## Tests
- [x] lint markdown
- [x] rendu HTML (index.html)
- [ ] tests unitaires

Fixes #12.
```

## Astuces avancées
- `git cherry-pick <commit>`: récupérer un commit précis d’une autre branche.
- `git rebase -i`: réécrire l’historique local avant PR.
- `git commit --amend`: corriger le dernier commit (avant push).
- `git push --force-with-lease`: forcer la mise à jour d’une PR en toute sécurité.
- `gh pr create` (GitHub CLI): créer rapidement une PR depuis le terminal.

Passez aux exercices dédiés: `exercices/github-collaboration.md`.
