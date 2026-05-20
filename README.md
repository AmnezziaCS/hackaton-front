# Hackaton Front

Application frontend React pour une plateforme de type JobBoard, avec une partie publique et une interface admin.

## Stack technique

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- ESLint

## Prerequis

- Node.js (version recente recommande)
- npm

## Installation

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

Le serveur de developpement est accessible par defaut sur [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `npm run dev` : demarre le serveur Vite en mode developpement
- `npm run build` : compile TypeScript et genere le build de production
- `npm run preview` : previsualise le build de production localement
- `npm run lint` : execute ESLint sur le projet

## Routes principales

### Espace public

- `/` : page d'accueil
- `/jobs` : liste des offres
- `/login` : page de connexion

### Espace admin

- `/admin` : dashboard admin (route index)
- `/admin/dashboard` : dashboard admin
- `/admin/users` : gestion des utilisateurs
- `/admin/jobs` : gestion des offres
- `/admin/companies` : gestion des entreprises
- `/admin/applications` : gestion des candidatures
- `/admin/moderation` : moderation
- `/admin/settings` : configuration plateforme

## Partie Admin (MVP)

### Objectif

L'interface admin sert a gerer et superviser toute la plateforme.

### Structure admin

```text
/admin
├── dashboard
├── users
├── jobs
├── companies
├── applications
├── moderation
└── settings
```

### Layout admin

- Sidebar: Dashboard, Users, Jobs, Companies, Applications, Moderation, Settings
- Header: admin connecte, notifications, logout

### Composants reutilisables admin

- Table
- Card
- Modal
- Button
- Input
- Select
- Badge
- Pagination
- Sidebar
- Navbar

## Structure du projet

```text
src/
  components/admin/ # Composants reutilisables admin
  layouts/      # Layouts public et admin
  pages/        # Pages de l'application (common et admin)
  routes/       # Configuration du routeur
  services/     # Services (ex: client API Axios)
```

## API

Le client Axios est configure dans `src/services/api.ts` avec la base URL suivante :

- `http://localhost:3000/api`

Si votre backend tourne sur une autre URL, mettez a jour cette valeur.
