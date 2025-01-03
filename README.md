# API d'Authentification avec JWT

> **FR** | [🇬🇧 English version](#authentication-api-with-jwt)

Cette API offre des fonctionnalités d'inscription, de connexion, et de protection des routes à l'aide de tokens JWT. Elle est simple à configurer et peut être utilisée dans vos projets pour gérer l'authentification utilisateur.

---

## 🚀 Fonctionnalités

### 1️⃣ Inscription (Signup)

Lorsqu'un utilisateur s'inscrit :
- Le mot de passe est haché avec **bcrypt** pour assurer sa sécurité.
- Les informations de l'utilisateur (nom, email, mot de passe) sont enregistrées dans une base de données ou un tableau en mémoire.
- Une fois l'inscription réussie, une confirmation est envoyée.

---

### 2️⃣ Connexion (Login)

Lorsqu'un utilisateur se connecte :
- L'API vérifie si l'email et le mot de passe correspondent à un utilisateur existant.
- Si les informations sont valides, un **token JWT** est généré et renvoyé. Ce token peut être utilisé pour accéder à des routes protégées.

---

### 3️⃣ Routes Protégées

- Les routes sensibles nécessitent un **token JWT valide** dans l'en-tête de la requête (`Authorization`).
- L'API vérifie la validité du token avant de permettre l'accès à la route.

---

## 🛠️ Technologies utilisées

- **Express.js** : Framework web pour Node.js.
- **bcrypt** : Pour le hachage des mots de passe.
- **jsonwebtoken** : Pour la génération et la validation des tokens JWT.

---

## 📋 Pré-requis

Avant d'utiliser cette API, assurez-vous d'avoir :
- **Node.js** installé sur votre machine.
- Un outil pour tester les requêtes API comme **Postman** ou **cURL**.

---

## 🔐 Exemple d'utilisation des tokens JWT

1. Lors de la connexion, l'API retourne un token JWT.
2. Ce token doit être inclus dans l'en-tête de chaque requête à une route protégée :
   ```http
   Authorization: Bearer <votre_token_jwt>


## 🛠️ Installation et Configuration

1. **Clonez le dépôt :**
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_DEPOT>
2. **Installer les dépendances:**
 Assurez-vous d'avoir Node.js installé, puis exécutez :
    npm install
4. **Démarrer le serveur:**
    npm start
   Le serveur sera lancé sur http://localhost:5000.

----

## 🔐 Utilisation

Endpoints disponibles
Méthode	  Endpoint	            Description
POST	    /api/auth/signup	      Inscrire un nouvel utilisateur
POST	    /api/auth/login	        Connecter un utilisateur

---
## 🧪 Tests avec Postman
Importer la collection Postman :

Créez une nouvelle collection et ajoutez les endpoints /api/auth/signup, /api/auth/login .
Configurer le token JWT :

Après connexion, récupérez le token JWT et configurez-le dans l'en-tête Authorization de la requête.

---

## 🛡️ Sécurité
Hachage des mots de passe : Utilisation de bcrypt pour protéger les mots de passe.
Expiration des tokens JWT : Ajout d'une durée de vie limitée pour chaque token (par exemple, 1 heure).
Validation des tokens JWT : Vérification systématique de la validité des tokens avant d'autoriser l'accès aux routes protégées.

----
## 🛠️ Technologies utilisées
Node.js : Environnement d'exécution pour JavaScript côté serveur.
Express.js : Framework web minimaliste et rapide.
bcrypt : Hachage sécurisé des mots de passe.
jsonwebtoken : Génération et validation de tokens JWT

----

