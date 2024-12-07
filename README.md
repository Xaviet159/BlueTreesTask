# BlueTreesTask
## Installation et Configuration

### Prérequis
- **Node.js** (v18 ou plus récent)
- **PostgreSQL** (v16)

1. **Cloner le repository** :

   git clone https://github.com/Xaviet159/BlueTreesTask.git

### Étapes d'installation BACKEND

2.	**Installer les dépendances** :
   npm install

3 **Configuration variables d'environnement** :

*exemple: 

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=votre-mot-de-passe
DB_NAME=BlueTreesTasks
DB_PORT=5432
PORT=3000

4 **Tester la connection**

npm run test

demarrer serveur => node app.js

### Étapes d'installation FRONTEND

npx create-react-app frontend
cd frontend
npm install axios
npm install react-icons

insert into package.json votre environement avec le Backend
ex:
--> "proxy": "http://localhost:3000"

Warning... => Attention config l'autorisation des route du backend au frontend avec les "cors"