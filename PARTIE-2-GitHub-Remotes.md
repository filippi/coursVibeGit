# Partie 2 — GitHub et dépôts distants (Breakdown)

## Git ≠ GitHub
- Git: l’outil de versionnement local et distribué.
- GitHub: une plateforme d’hébergement de dépôts Git + collaboration (issues, PR, CI).
- Stratégie: maîtriser Git localement, puis connecter à GitHub pour collaborer et valoriser vos projets.

## Créer un compte GitHub et un dépôt
- Créez/complétez votre compte (photo, bio, lien LinkedIn).
- Public vs Privé: public pour portfolio, privé pour travaux non diffusables.
- Créez un dépôt vide sur GitHub (sans README/.gitignore pour éviter les divergences initiales), par exemple `recettes`. Notez l’URL HTTPS ou SSH.

## Lier un dépôt local à GitHub (remote)
Cas 1 — vous avez déjà un dépôt local:
```bash
# depuis votre projet local déjà initialisé
git remote add origin https://github.com/<votre-compte>/<repo>.git
git branch -M main
git push -u origin main
```

Cas 2 — vous partez de GitHub:
```bash
git clone https://github.com/<votre-compte>/<repo>.git
cd <repo>
# travail...
git add . && git commit -m "feat: init"
git push -u origin main
```

## HTTPS vs SSH
- HTTPS: simple, demande un token/credential manager. Recommandé pour débuter.
- SSH: plus fluide une fois la clé configurée.

Configurer SSH (optionnel recommandé):
```bash
ssh-keygen -t ed25519 -C "vous@example.com"
# appuyez Entrée aux invites, puis
cat ~/.ssh/id_ed25519.pub   # copiez la clé publique
```
Collez la clé publique dans GitHub > Settings > SSH and GPG keys > New SSH key. Test:
```bash
ssh -T git@github.com
```

## Commandes distantes usuelles
- `git remote -v`: liste les remotes.
- `git fetch`: récupère les références distantes (sans fusion).
- `git pull`: `fetch` + merge (ou rebase selon config).
- `git push`: envoie vos commits vers le remote.
- `git push -u origin <branche>`: définit le suivi de branche (upstream).

## Flux de travail conseillé (débutant)
```bash
git switch -c feature/ma-tache
# travail...
git add -p && git commit -m "feat: partie 1"
git push -u origin feature/ma-tache
# Ouvrez une Pull Request sur GitHub vers main
```

## Collaboration sur GitHub
- Issues: tracer tâches/bugs.
- Pull Requests: discussion, revue, CI, merge.
- Protection de branche: exige PR et checks avant merge.
- README + LICENSE: indispensables pour présenter et encadrer votre projet.

## Rebase vs Merge (aperçu)
- Merge: conserve l’historique tel quel (plus simple au début).
- Rebase: réécrit l’historique pour linéariser (puissant, à manier avec précaution).

## Exemple de cycle complet
```bash
# 1) Créer repo local + initial commit
git init recettes && cd recettes
echo "# Recettes" > README.md
git add README.md && git commit -m "feat: init"

# 2) Créer repo sur GitHub, puis lier
git remote add origin https://github.com/<user>/recettes.git
git branch -M main
git push -u origin main

# 3) Nouvelle fonctionnalité sur une branche
git switch -c feature/tartopoie
mkdir -p recettes && echo "Tartopoie" > recettes/tartopoie.md
git add . && git commit -m "feat: ajoute recette tartopoie"
git push -u origin feature/tartopoie
# Ouvrez une PR, faites relire, mergez via GitHub
```

Vous êtes prêts pour collaborer et alimenter votre profil public.
