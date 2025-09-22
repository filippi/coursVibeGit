# Cheatsheet Git — L3 (essentiel)

## Config
```bash
git config --global user.name "Prénom Nom"
git config --global user.email "vous@example.com"
git config --global init.defaultBranch main
```

## Démarrage
```bash
git init
git clone <url>
```

## État et diff
```bash
git status
git diff                # travail vs index
git diff --staged       # index vs HEAD
```

## Staging et commit
```bash
git add <fichiers>
git add -p              # staging sélectif par hunk
git commit -m "type: message"
```

## Historique
```bash
git log --oneline --graph --decorate --all
git show <commit>
```

## Branches et merge
```bash
git branch
git switch -c <branche>
git switch <branche>
git merge <branche>
```

## Annuler/Nettoyer
```bash
git restore <fichier>           # abandonner changements non indexés
git restore --staged <fichier>  # retirer du staging
git reset --soft/mixed/hard <ref>  # attention !
```

## Remotes
```bash
git remote -v
git remote add origin <url>
git fetch
git pull
git push -u origin <branche>
```

## Patchs
```bash
git format-patch -1 HEAD
git apply <fichier.patch>
patch -p1 < <fichier.patch>
```

Astuce: `git help <commande>` ou `git <commande> -h` pour l’aide rapide.
