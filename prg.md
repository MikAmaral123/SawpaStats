# 📊 SawpaStats - Suivi du Projet

## 📝 État actuel
**Statut :** 🚀 Fonctionnel & Sécurisé
**Dernière mise à jour :** 12 Février 2026

## ✅ Fonctionnalités Terminées

### 🔐 Authentification & Sécurité
- [x] **Connexion via Discord & Twitch** (OAuth2).
- [x] **Middleware de protection** :
  - Redirection automatique des utilisateurs non connectés vers `/login`.
  - Redirection des utilisateurs connectés hors de `/login`.
- [x] **Gestion de session** via Supabase Auth.

### 💾 Base de Données (Supabase)
- [x] **Table `profiles`** : Stockage automatique des pseudos et avatars.
  - Trigger PostgreSQL pour synchronisation automatique à la connexion.
- [x] **Table `games`** : Sauvegarde des parties par utilisateur (`user_id`).
- [x] **Sécurité (RLS)** : Chaque utilisateur ne voit et ne modifie que ses propres données.

### 🎨 Interface (UI/UX)
- [x] **Design Dark/Horror** : Thème Saw/DbD avec animations et ambiance sonore visuelle.
- [x] **Effet Gold** : Pseudo et avatar dorés pour les utilisateurs "Sawpalin" et "MikAmaral".
- [x] **Composants Réactifs** :
  - Formulaire d'ajout rapide (Maps/Killers avec autocomplétion).
  - Liste des parties récentes.
  - Statistiques globales (Taux de survie, Kills, etc.).
  - Historique complet sur une page dédiée.

### 🛠️ Technique
- [x] **Next.js 16 (App Router)**.
- [x] **TailwindCSS v4**.
- [x] **Supabase Client & SSR**.
- [x] **Déploiement** : Code poussé sur GitHub (`main`).

## 🔜 Prochaines Étapes / Idées
- [ ] Hébergement sur Vercel (Configuration des variables d'environnement).
- [ ] Ajout de graphiques (Charts) pour l'évolution du rang/survie.
- [ ] Filtres avancés dans l'historique (par Tueur, par Map).
- [ ] Export des données (CSV/JSON).

---

*Ce fichier sert de point de repère pour l'avancement du projet.*
