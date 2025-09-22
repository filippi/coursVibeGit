# Partie 1 — Bases de Git (Breakdown)

## Pourquoi Git (et pas GitHub d’abord)
- Versionner vos sources: revenir en arrière, comparer, expérimenter sans peur.
- Collaborer: branches, revues, intégration sans écraser le travail des autres.
- Se créer un profil professionnel: votre historique de projets compte (via GitHub/GitLab ensuite).
- Interagir avec des IA: générer des patchs propres, demandes de revue, explications de diff — Git structure vos changements.

## Installer Git (Windows, macOS, Linux)
- Windows: installez « Git for Windows » (inclut Git Bash). Conseillé: installer GitHub Desktop pour une GUI simple (optionnel). Pendant l’installation, conservez les options par défaut, y compris « Use Git from Git Bash only » et l’éditeur par défaut (VS Code ou Notepad++).
- macOS: `xcode-select --install` puis (optionnel) installez Git via Homebrew: `brew install git`.
- Linux: gestionnaire de paquets (`apt install git`, `dnf install git`, `pacman -S git`).

Vérifiez:
```bash
git --version
git config --list --show-origin | sed -n '1,20p'
```

## Configuration initiale indispensable
```bash
git config --global user.name "Prénom Nom"
git config --global user.email "vous@example.com"
git config --global init.defaultBranch main
```
Optionnel utile:
```bash
git config --global core.editor "code --wait"        # VS Code comme éditeur
git config --global pull.rebase false                  # merge par défaut sur pull
git config --global color.ui auto
```

## Vocabulaire et modèle mental
- Répertoire de travail (working directory): vos fichiers sur disque.
- Index (staging area): pré-sélection des changements qui iront dans le prochain commit.
- Dépôt (repository): la base d’objets Git (commits, arbres, blobs) dans `.git/`.
- Commit: un « instantané » des fichiers suivis + un message explicatif.
- HEAD: pointeur vers le dernier commit de la branche checkoutée.
- Branche: un pointeur qui avance commit après commit (`main`, `dev`, ...).
- Remote: un dépôt distant (ex: `origin` sur GitHub), synchronisé via `fetch/push`.

Cycle de vie d’un changement:
```
Fichiers -> git add -> Index -> git commit -> Historique (HEAD sur branche)
```

## Démarrer un dépôt
```bash
mkdir mon-projet && cd mon-projet
git init
echo "# Mon projet" > README.md
git status
git add README.md
git commit -m "feat: init dépôt avec README"
git log --oneline
```

## Commandes fondamentales
- `git status`: état des fichiers (modifiés, suivis, non suivis, en staging).
- `git add <fichiers>`: ajoute des changements à l’index.
- `git commit -m "message"`: crée un instantané durable.
- `git log --oneline --graph --decorate`: historique lisible.
- `git show <commit>`: détail d’un commit.
- `git diff`: diff dans le répertoire de travail (vs index). Avec `--staged`, diff de l’index (vs dernier commit).
- `git restore <fichier>`: annule modifications non indexées (retourne à HEAD). Avec `--staged`, retire du staging.
- `git rm`, `git mv`: supprimer/déplacer des fichiers suivis.

## Branches et fusion (merge)
Créer/switcher:
```bash
git switch -c feature/ajout-ingredients   # crée et bascule
# travail...
git commit -m "feat: + ingrédients"
git switch main
git merge feature/ajout-ingredients
```

Visualiser un joli arbre:
```bash
git log --graph --oneline --decorate --all
```
Exemple (schéma):
```
*   a1b2c3d (main) Merge branch 'feature/ajout-ingredients'
|\  
| * 9f8e7d6 (feature/ajout-ingredients) feat: + ingrédients
* |  123abcd feat: init recette
|/  
*  0fedcba chore: init dépôt
```

## Conflits de fusion (principes)
- Survient quand deux branches modifient la même zone d’un fichier différemment.
- Git marque les sections en conflit dans le fichier avec `<<<<<<<`, `=======`, `>>>>>>>`.
- Résolution: éditez, gardez la bonne version, supprimez les marqueurs, `git add`, puis `git commit` (ou `git merge --continue`).

## Diff, patch, format-patch — quoi et quand ?
- `git diff`: compare deux états (Working vs Index vs HEAD vs commits). Sert à relire ce que l’on va committer.
- `git add -p`: mode « patch » interactif pour sélectionner des hunks à mettre en staging (très utile pour des commits petits et propres).
- `git format-patch`: produit des fichiers patch mbox (un par commit) qu’on peut envoyer par mail ou appliquer avec `git am`.
- `git apply`: applique un patch (unifié) sur l’arborescence de travail (sans créer de commit).
- `patch -p1 < fichier.patch`: outil Unix générique pour appliquer un diff unifié (non spécifique à Git).

Exemples rapides:
```bash
# Diff des modifications en cours
git diff

# Staging sélectif (interactive patch)
git add -p recettes/tartopoie.md

# Générer un patch depuis des commits
git format-patch -1 HEAD            # dernier commit
git format-patch origin/main..HEAD  # commits en avance sur origin/main

# Appliquer un patch unifié
git apply ../annexes/exemple.patch
```

## Bonnes pratiques pour débuter
- Commits petits et fréquents, messages clairs (concis + verbe d’action).
- Une branche par fonctionnalité (feature), fusion via PR quand vous serez sur GitHub.
- `.gitignore` pertinent pour éviter les fichiers de build, secrets, etc.
- Utilisez `git status` en permanence, et `git log --graph` pour comprendre l’historique.

Passez maintenant aux exercices: `exercices/README.md`.
