const express = require('express');
const bcrypt = require('bcrypt'); // Pour hacher les mots de passe
const jwt = require('jsonwebtoken'); // Pour les tokens JWT

const app = express();
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = 'votreCleSecreteSuperSecurisee123';
const users = []; // Stockage temporaire des utilisateurs

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API!');
});

// Inscription avec hachage des mots de passe
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
        users.push({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

// Connexion avec vérification des mots de passe hachés
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: "Email ou mot de passe incorrect." });
    }

    try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Connexion réussie!', token });
    } catch (error) {
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

// Middleware d'authentification avec JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide ou expiré." });
        }
        req.user = user;
        next();
    });
}

// Route protégée
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Accès accordé à la route protégée!", user: req.user });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée." });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
