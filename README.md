# POP-E — Site Web Vitrine

Site web vitrine conçu et développé dans le cadre d'un stage de 2 mois (avril – juin 2026) au sein de l'entreprise **POP-E**, spécialisée dans la **location de batteries externes lors d'événements et de festivals**.

---

## Présentation du projet

POP-E propose des bornes de distribution de batteries externes rechargeables installées directement sur les lieux des festivals. Ce site vitrine a pour objectif de :

- Présenter les services de l'entreprise à ses différents publics (organisateurs, marques, utilisateurs)
- Renforcer la visibilité numérique de POP-E
- Offrir une expérience utilisateur fluide, moderne et accessible

---

## Fonctionnalités

### Page d'accueil
- Animation d'introduction immersive
- Navigation par profils : **Organisateurs**, **Marques**, **Utilisateurs**
- Section partenaires et avantages du service
- Système de traduction **français / anglais**

### Page Utilisateur
- Présentation du fonctionnement du service étape par étape (localisation, scan QR code, utilisation, restitution)
- Composants visuels : cards, icônes, animations légères
- Bouton d'accès vers l'application principale

### Carte interactive des festivals
- Carte personnalisée aux couleurs de POP-E
- Points géolocalisés et cliquables pour chaque festival partenaire
- Fenêtres d'information : nom, dates, adresse, programmation, nombre de bornes/batteries
- Liste détaillée complémentaire

### Collecte de données utilisateurs
- Formulaire de proposition de villes/lieux pour déployer le service
- Stockage des données via **Supabase**
- Calcul dynamique et affichage du nombre de propositions par ville (sans exposer les lieux précis)

### E-shop
- Page temporaire annonçant l'arrivée de la boutique (future intégration **Shopify**)
- Cartes de contact pour candidatures : stage, ambassadeur, collaboration

### Chatbot FAQ
- Assistant d'information basé sur des questions/réponses prédéfinies
- Affichage dynamique via JavaScript
- Fenêtre de contact intégrée avec envoi par e-mail

### Traduction multilingue
- Système français / anglais basé sur des attributs HTML et clés de traduction
- Changement de langue dynamique via JavaScript

### Pages légales
- Mentions légales
- Conditions Générales d'Utilisation (CGU)
- Politique de confidentialité / RGPD

### Footer
- Liens vers les réseaux sociaux (Instagram, TikTok)
- Navigation secondaire
- Formulaire d'exercice des droits

---

## Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure des pages |
| CSS3 | Mise en forme et animations |
| JavaScript | Interactions dynamiques, traduction, chatbot |
| Supabase | Base de données (votes / propositions utilisateurs) |
| Shopify *(à venir)* | Boutique en ligne |


## Lancer le projet en local

1. Cloner le dépôt :
```bash
git clone https://github.com/<votre-utilisateur>/pope-website.git
cd pope-website
```

2. Ouvrir `index.html` dans un navigateur, ou utiliser une extension comme **Live Server** (VS Code) pour un rechargement automatique.

3. *(Optionnel)* Configurer les variables Supabase dans le fichier de configuration JavaScript pour activer la collecte de données.

---

## Contexte

Ce projet a été développé dans le cadre d'un **stage de 2ème année de BUT Informatique** (parcours Développement d'Applications et de Logiciels) à l'IUT d'Aix-Marseille Université.

- **Période :** 13 avril 2026 → 18 juin 2026
- **Entreprise :** POP-E — Saint-Cannat (13)
- **Tutrice entreprise :** Andréa Tatikian
- **Tuteur universitaire :** Alain Casali
- **Développement :** en binôme avec un autre stagiaire

---

## Contact

Pour toute question relative au projet :
- Instagram : [@pope.charge](https://www.instagram.com/pope.charge)
-  Site web : [pop-e.fr](https://pop-e.fr) *(à confirmer)*
