# Exercices — Collaboration GitHub (Forks & Pull Requests)

Objectif: vous entraîner au workflow contribution open source via forks, issues et pull requests.

---

## Préparation
1. Identifiez un dépôt test (ex: `https://github.com/<vous>/coursVibeGit` ou un repo de classe).
2. Vérifiez que le dépôt **amont** (upstream) autorise les PR (ou utilisez un dépôt sandbox que vous possédez + un compte ami comme mainteneur).

---

## Exercice 1 — Fork, clone, remote upstream
1. Forkez le dépôt amont via GitHub (`Fork`).
2. Clonez **votre fork**:
   ```bash
   git clone https://github.com/<vous>/<projet>.git
   cd <projet>
   ```
3. Ajoutez le remote `upstream`:
   ```bash
   git remote add upstream https://github.com/<amont>/<projet>.git
   git remote -v
   ```

---

## Exercice 2 — Contribution simple
1. Créez une branche dédiée:
   ```bash
   git switch -c docs/ajoute-conseils
   ```
2. Modifiez un fichier (ex: ajoutez une astuce dans `README.md`).
3. `git add`, `git commit -m "docs: ajoute astuce d’installation"`.
4. Poussez la branche sur votre fork:
   ```bash
   git push -u origin docs/ajoute-conseils
   ```
5. Ouvrez une Pull Request sur GitHub. Décrivez:
   - Contexte / Issue liée.
   - Changements.
   - Tests (si applicable).

---

## Exercice 3 — Synchroniser son fork
1. Pendant que votre PR est en review, simulez une mise à jour upstream (demandez à un·e camarade d’ajouter un commit sur `main`).
2. Récupérez et fusionnez:
   ```bash
   git fetch upstream
   git switch main
   git merge upstream/main
   git push origin main
   ```
3. Remettez votre branche à jour (rebase conseillé):
   ```bash
   git switch docs/ajoute-conseils
   git rebase upstream/main
   git push --force-with-lease origin docs/ajoute-conseils
   ```

---

## Exercice 4 — Review croisée
En binôme:
1. Chaque personne fork/cloner l’autre dépôt.
2. Lisez la PR de votre binôme et laissez au moins 2 commentaires (feedback constructif, suggestion de code).
3. Appliquez un commit de correction suite aux retours reçus.
4. Donnez votre approbation (`Review changes > Approve`).

---

## Exercice 5 — Résolution de conflits dans une PR
1. Sur votre branche PR, introduisez un changement qui entre en conflit avec `main`.
2. Dans l’interface GitHub, utilisez **Resolve conflicts** pour éditer la version finale.
3. Validez le merge via GitHub une fois la PR approuvée et les conflits résolus.

---

## Bonus — Automatisation
- Ajoutez un workflow GitHub Actions qui exécute `npm test` ou `markdownlint`.
- Configurez une **branch protection rule** sur `main` (PR obligatoire + checks ✅).
- Utilisez `gh pr status` (GitHub CLI) pour suivre vos PR depuis le terminal.

Documentez vos apprentissages dans un fichier `journal-collab.md` (optionnel) à la racine du dépôt.
