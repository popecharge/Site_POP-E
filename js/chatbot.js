/* ═══════════════════════════════
   CHATBOT POP-E — chatbot.js
═══════════════════════════════ */

(function () {

const DATA = {
  fr: {
    MENU: [
      { id: 1, label: 'Louer une batterie / utiliser une borne',          badge: 'n1' },
      { id: 2, label: 'Installer POP-E sur un événement ou dans un lieu', badge: 'n2' },
      { id: 3, label: 'Faire de la publicité sur nos écrans',              badge: 'n3' },
      { id: 4, label: 'Poser une autre question',                          badge: 'n4' },
    ],
    welcome_msg: "Bonjour, je suis l'assistant POP-E.\nJe peux vous aider selon votre besoin :",
    other_msg: "Merci pour votre intérêt ! Notre équipe revient vers vous très prochainement.",
    other_msg2: "Puis-je vous aider pour autre chose ?",
    help_msg: "Sur quel sujet puis-je vous aider ?",
    choose_msg: "Choisissez votre question :",
    more_msg: "Avez-vous d'autres questions ?",
    back_questions: cat => `Autres questions sur « ${cat.label} »`,
    back_categories: "Retour aux catégories",
    back_menu: "Retour au menu principal",
    BATTERY_CATEGORIES: [
      { id: 'usage',   label: 'Utilisation de la borne' },
      { id: 'price',   label: 'Prix et paiement' },
      { id: 'battery', label: 'Batterie et compatibilité' },
      { id: 'flex',    label: 'Utilisation et flexibilité' },
      { id: 'help',    label: 'Problèmes et assistance' },
      { id: 'access',  label: 'Accès et disponibilité' },
    ],
    BATTERY_QA: {
      usage: [
        { q: 'Comment fonctionne une borne POP-E ?', a: 'Les bornes POP-E permettent de louer une batterie en quelques secondes.\n\n Via QR code / app : scannez le QR code pour bloquer la caution et lancer la location.\n Via TPE sans contact : carte bancaire, Apple Pay ou Google Pay.\n\nUne fois la caution validée, la batterie se libère automatiquement.' },
        { q: 'Est-ce que je dois télécharger une application ?', a: "Non, ce n'est pas obligatoire. Vous pouvez utiliser la borne directement en sans contact.\n\nL'application est utile pour un code promo ou pour accéder à la carte des bornes." },
        { q: "Est-ce que c'est rapide ?", a: "Oui ! La location prend environ 15 secondes, via l'app ou en sans contact." },
      ],
      price: [
        { q: "Combien coûte la location d'une batterie ?", a: "Le tarif dépend du lieu ou de l'événement. La facturation se fait à la demi-heure ou à l'heure." },
        { q: 'Comment je paie ?', a: 'Le paiement se fait automatiquement à la fin de la location.\n\n Une caution est bloquée à la prise, puis déduite lors du retour.\n\nModes acceptés : carte bancaire, Apple Pay, Google Pay.' },
        { q: "Est-ce qu'il y a une caution ?", a: "Oui, une caution est demandée au départ. À la restitution, elle est annulée ou le montant de la location est simplement déduit." },
      ],
      battery: [
        { q: 'Combien de temps dure une batterie ?', a: "Une batterie permet généralement jusqu'à 2 recharges complètes de téléphone." },
        { q: 'Est-ce que la batterie est déjà chargée ?', a: 'Oui ! Les batteries ne peuvent pas être louées si elles ne sont pas chargées à plus de 70%.' },
        { q: 'Quels téléphones sont compatibles ?', a: 'Tous les smartphones grâce aux câbles intégrés :\n Lightning (iPhone)\n USB-C\n Micro-USB' },
      ],
      flex: [
        { q: 'Où rendre la batterie ?', a: "Dans n'importe quelle borne POP-E du réseau. Toutes les bornes sont visibles sur la carte via l'application." },
        { q: 'Combien de temps puis-je garder la batterie ?', a: "Jusqu'à 24 heures maximum. Au-delà, la caution est conservée et la batterie est considérée comme achetée." },
        { q: 'Est-ce que je peux échanger ma batterie ?', a: 'Oui ! Restituez la batterie dans une borne et relancez une nouvelle location.' },
        { q: 'Est-ce que je peux utiliser plusieurs batteries ?', a: "Oui. En sans contact, vous pouvez en louer plusieurs. Via l'app, cela dépend du système de gestion en cours." },
        { q: 'Est-ce que je peux prêter la batterie ?', a: "Oui, mais vous restez responsable jusqu'à sa restitution." },
      ],
      help: [
        { q: 'Que faire si une batterie ne fonctionne pas ?', a: ' En festival : rendez-vous au point info POP-E.\n En ville : restituez la batterie, le problème sera automatiquement signalé.' },
        { q: 'Que faire si la borne est pleine ?', a: 'Consultez la carte pour trouver une autre borne à proximité. En festival, rendez-vous au point info POP-E.' },
        { q: 'Que se passe-t-il si je ne rends pas la batterie ?', a: "Après un certain délai, la batterie est considérée comme achetée. La caution est conservée et la location est facturée." },
        { q: "J'ai été débité alors que j'ai rendu la batterie", a: "Vérifiez que la restitution a bien été validée dans l'app. En cas de doute, contactez le support avec les détails de votre location." },
      ],
      access: [
        { q: 'Où trouver une borne POP-E ?', a: "Les bornes sont dans des lieux stratégiques : festivals, événements, gares, bars, lieux publics.\n\n👉 Consultez la carte via l'application." },
        { q: 'Les bornes sont-elles disponibles 24h/24 ?', a: "Oui dans les lieux ouverts en continu, sinon selon les horaires du lieu. Les horaires sont visibles via l'app." },
        { q: 'Est-ce que je peux réserver une batterie ?', a: 'Non, les batteries sont disponibles en libre-service directement sur place.' },
      ],
    },
    LIEU_CATEGORIES: [
      { id: 'comprendre', label: 'Comprendre POP-E' },
      { id: 'install',    label: 'Installation et Logistique' },
      { id: 'rentab',     label: 'Rentabilité et Modèle économique' },
      { id: 'pub',        label: 'Publicité, Sponsors et Animations' },
      { id: 'festival',   label: 'Festivals et Événements' },
      { id: 'securite',   label: 'Utilisation, Sécurité et Maintenance' },
      { id: 'rse',        label: 'RSE et Image de marque' },
      { id: 'partner',    label: 'Partenariat et Démarrage' },
    ],
    LIEU_QA: {
      comprendre: [
        { q: "Qu'est-ce que POP-E et à quoi sert une borne ?", a: "POP-E transforme un problème quotidien — les téléphones déchargés — en service utile, rentable et visible pour votre établissement ou événement.\n\nNos bornes permettent à vos visiteurs de louer une batterie en quelques secondes, tout en créant un support de communication et de monétisation dans votre lieu.\n\nPour vous, c'est à la fois un service client, un support publicitaire, un outil de visibilité, et potentiellement une nouvelle source de revenus." },
        { q: 'Comment fonctionne une borne POP-E ?', a: "L'utilisation est ultra simple :\n\n L'utilisateur scanne un QR code ou paie sans contact.\n La batterie se libère en quelques secondes.\n Il l'utilise normalement, puis la rend dans n'importe quelle borne.\n\nLe tout prend environ 10 à 15 secondes. Moins il y a de friction, plus le service est utilisé." },
        { q: "Faut-il télécharger une application ?", a: "Non. L'utilisateur peut louer directement via QR code, paiement CB ou sans contact smartphone.\n\nL'application reste optionnelle pour les codes promo, offres partenaires ou l'historique de location." },
        { q: "Est-ce vraiment utilisé par les clients et festivaliers ?", a: "Oui, car le besoin est universel et immédiat. Un téléphone déchargé signifie plus de GPS, de photos, de paiement, de réseaux sociaux.\n\nQuand quelqu'un passe sous les 10%, la décision de louer devient presque instantanée.\n\nC'est particulièrement performant dans les festivals, concerts, bars, restaurants, clubs, salons et tous les lieux à fort passage." },
      ],
      install: [
        { q: "Comment se passe l'installation ?", a: "POP-E s'occupe de tout : installation, mise en service, configuration, support et maintenance.\n\nVous profitez du service sans aucune complexité technique." },
        { q: "De quoi ai-je besoin pour installer une borne ?", a: "Très peu de choses :\n Une prise électrique classique\n Un emplacement visible\n Idéalement une zone avec du passage\n\nNos bornes s'intègrent facilement sans perturber l'organisation existante." },
        { q: "Combien de place prend une borne ?", a: "Les bornes sont compactes. Nous adaptons le format selon le lieu :\n Petites bornes\n Bornes moyennes\n Grandes bornes événementielles jusqu'à 48 batteries\n\nL'objectif : meilleur impact visuel avec l'encombrement le plus faible possible." },
        { q: "Les bornes fonctionnent-elles en extérieur ?", a: "Oui. Les bornes événementielles résistent aux conditions réelles : utilisation intensive, météo, transport, festivals.\n\nC'est justement dans les événements extérieurs que la demande est souvent la plus forte." },
        { q: "Combien de temps prend l'installation ?", a: "Quelques heures suffisent généralement. Dans la majorité des cas, une borne est installée et opérationnelle dans la journée." },
      ],
      rentab: [
        { q: "Combien coûte l'installation ?", a: "Dans la majorité des cas : aucun investissement initial.\n\nPOP-E finance l'installation et se rémunère via la location des batteries, les espaces publicitaires et les partenariats sponsors.\n\nLe modèle est conçu pour limiter au maximum votre risque." },
        { q: "Comment POP-E gagne de l'argent ?", a: "Notre modèle repose sur plusieurs leviers complémentaires :\n La location des batteries\n La publicité sur les écrans\n Les sponsors\n Les activations partenaires\n\nCela finance le service tout en gardant une expérience utilisateur fluide." },
        { q: "Est-ce que mon établissement peut générer des revenus ?", a: "Oui. Une borne POP-E peut devenir une source de revenu complémentaire via la publicité, les activations partenaires, les sponsors exclusifs ou un partage de revenus défini ensemble." },
        { q: "Est-ce que ça consomme beaucoup d'électricité ?", a: "Non. La consommation reste faible par rapport à la valeur générée. Une borne consomme souvent moins qu'un équipement classique de restauration ou de froid." },
      ],
      pub: [
        { q: "Comment fonctionne la publicité sur les bornes ?", a: "Les écrans diffusent des contenus courts, dynamiques et répétés tout au long de la journée.\n\nLes utilisateurs viennent naturellement vers les bornes pour recharger leur téléphone : la publicité est intégrée dans une expérience réellement utilisée." },
        { q: "Peut-on afficher nos propres contenus ?", a: "Oui. Vous pouvez diffuser votre programmation, annonces, offres, plans, partenaires, messages de sécurité ou informations visiteurs.\n\nLes bornes deviennent de véritables points d'information stratégiques." },
        { q: "Peut-on vendre les espaces publicitaires ?", a: "Oui. Dans un lieu fréquenté, la borne devient un véritable média local capable d'attirer des marques, partenaires, sponsors ou commerçants locaux." },
        { q: "Peut-on avoir un sponsor exclusif ?", a: "Oui. Un sponsor peut offrir la recharge, associer son image au service, apparaître sur les écrans, ou sponsoriser totalement une zone ou un événement.\n\nC'est une activation particulièrement efficace car la marque est associée à un service réellement utile." },
        { q: "Peut-on faire des animations commerciales ?", a: "Oui. Nous pouvons mettre en place des activations de marque, jeux concours, QR codes, offres promotionnelles, distributions, expériences interactives ou campagnes physiques + digitales." },
      ],
      festival: [
        { q: "POP-E est-il adapté aux festivals ?", a: "Oui, c'est même l'un des environnements où le service performe le mieux.\n\nDans un festival, les visiteurs utilisent énormément leur téléphone, restent longtemps sur site, et ont rarement accès à des prises. La demande devient donc extrêmement naturelle." },
        { q: "Combien de bornes faut-il pour un événement ?", a: "Chaque événement est différent. Nous étudions le nombre de visiteurs, la durée, les zones de passage, le camping et la configuration du site.\n\nL'objectif : maximiser l'utilisation sans suréquiper." },
        { q: "Peut-on offrir la recharge aux festivaliers ?", a: "Oui, via un sponsor ou directement par l'organisateur.\n\nC'est une activation très appréciée : les visiteurs adorent, le sponsor gagne en visibilité, et l'expérience globale du festival est améliorée." },
        { q: "Les bornes peuvent-elles servir de point d'information ?", a: "Oui. Les écrans POP-E peuvent afficher plans, programmation, horaires, messages de sécurité, informations partenaires ou contenus en temps réel.\n\nLes bornes deviennent de véritables points d'information modernes au cœur du public." },
      ],
      securite: [
        { q: "Les batteries sont-elles sécurisées ?", a: "Oui. Le système utilise une caution, un suivi des locations et une gestion automatisée des retours.\n\nCela limite fortement les risques de perte ou de non-retour." },
        { q: "Que se passe-t-il si une batterie n'est pas rendue ?", a: "La caution prévue couvre automatiquement ce cas. Vous n'avez aucune gestion à effectuer." },
        { q: "Les batteries sont-elles compatibles avec tous les téléphones ?", a: "Oui, avec la grande majorité des smartphones actuels. Les batteries disposent de plusieurs connectiques compatibles iPhone et Android." },
        { q: "Qui s'occupe de la maintenance ?", a: "POP-E gère la maintenance, le suivi, le support et les interventions techniques.\n\nVotre équipe n'a pas besoin de gérer le fonctionnement quotidien." },
        { q: "Que se passe-t-il en cas de panne ?", a: "Nous intervenons rapidement pour assurer la continuité du service. Notre intérêt est le même que le vôtre : avoir des bornes fonctionnelles et utilisées en permanence." },
      ],
      rse: [
        { q: "Est-ce une solution écologique ?", a: "Oui. La mutualisation réduit l'achat de batteries individuelles, les déchets électroniques et certains supports physiques de communication." },
        { q: "Peut-on intégrer POP-E dans une démarche RSE ?", a: "Oui. POP-E peut contribuer à moderniser l'expérience visiteur, réduire certains supports imprimés, valoriser des partenaires engagés et renforcer l'image innovante du lieu." },
        { q: "Est-ce que POP-E améliore l'image du lieu ?", a: "Oui. Installer POP-E renvoie une image moderne, pratique, innovante et tournée vers l'expérience utilisateur.\n\nLes visiteurs perçoivent le service comme une vraie valeur ajoutée." },
      ],
      partner: [
        { q: "Comment devenir partenaire POP-E ?", a: "Il suffit de nous contacter. Nous étudions rapidement votre lieu, votre fréquentation, vos besoins et vos objectifs, puis proposons une solution adaptée." },
        { q: "Peut-on tester la solution avant un déploiement plus important ?", a: "Oui. Nous pouvons mettre en place des tests, des installations événementielles ou des périodes pilotes pour mesurer concrètement le potentiel avant d'aller plus loin." },
        { q: "Pourquoi choisir POP-E plutôt qu'une simple borne de recharge ?", a: "Parce que POP-E n'est pas seulement une borne. C'est un service utile, une expérience moderne, un support de communication, un levier de monétisation et un outil d'image.\n\nVous n'ajoutez pas juste une prise — vous ajoutez un service que les visiteurs utilisent réellement." },
      ],
    },
    PUB_CATEGORIES: [
      { id: 'comprendre', label: 'Comprendre POP-E' },
      { id: 'visibilite', label: 'Visibilité et Impact' },
      { id: 'animation',  label: 'Publicité et Animation Commerciale' },
      { id: 'audience',   label: 'Audience et Image de Marque' },
      { id: 'formats',    label: 'Formats Publicitaires et Création' },
      { id: 'deploy',     label: 'Organisation et Déploiement' },
      { id: 'tarifs',     label: 'Tarifs, Reporting et Suivi' },
    ],
    PUB_QA: {
      comprendre: [
        { q: "Qu'est-ce que POP-E pour une marque ?", a: "POP-E permet à votre marque d'être visible dans un contexte beaucoup plus engageant qu'une publicité classique.\n\nNos bornes sont installées dans des lieux à fort trafic : festivals, bars, restaurants, hôtels, événements, lieux touristiques, espaces publics.\n\nVotre publicité n'est pas subie — elle est intégrée à une expérience utile et réellement utilisée. C'est ce qui crée plus d'attention, de mémorisation, et d'impact positif pour la marque." },
        { q: "Pourquoi POP-E est différent d'un affichage classique ?", a: "Parce que POP-E ne se limite pas à afficher une publicité.\n\nVous êtes associé à un service utile, une interaction réelle, et un moment important pour l'utilisateur.\n\nContrairement à un panneau classique vu en arrière-plan, nos écrans sont consultés volontairement. Résultat : l'attention est plus forte, la mémorisation meilleure, et la publicité bien mieux perçue." },
        { q: "Où sont installées les bornes POP-E ?", a: "Les bornes POP-E sont installées dans des lieux où les utilisateurs passent du temps et utilisent fortement leur téléphone : festivals, concerts, bars, restaurants, hôtels, événements sportifs, salons, lieux touristiques, espaces événementiels.\n\nL'objectif : placer votre marque directement au cœur du flux." },
      ],
      visibilite: [
        { q: "Combien de personnes peuvent voir ma publicité ?", a: "Cela dépend du lieu, du trafic et du nombre de bornes installées.\n\nSur certains événements, une campagne peut générer plusieurs milliers, voire plusieurs dizaines de milliers de vues.\n\nLes utilisateurs voient souvent plusieurs fois le même contenu au cours de leur expérience, ce qui augmente fortement la mémorisation." },
        { q: "Pourquoi les utilisateurs regardent vraiment les écrans ?", a: "Parce qu'ils viennent naturellement vers les bornes pour un besoin réel : recharger leur téléphone, consulter des informations, utiliser le service, ou simplement patienter.\n\nLa publicité apparaît donc dans un contexte d'attention beaucoup plus qualitatif qu'un affichage classique ou qu'un réseau social saturé." },
        { q: "Est-ce comparable à du DOOH ?", a: "Oui, mais avec une différence majeure : POP-E combine affichage digital ET service utile.\n\nVotre publicité n'est pas simplement visible dans un décor — elle est associée à une interaction réelle avec l'utilisateur. C'est ce qui rend le dispositif beaucoup plus engageant." },
        { q: "Est-ce que ma publicité est noyée parmi d'autres marques ?", a: "Non. Le nombre de marques présentes est volontairement limité afin de garantir une visibilité claire, une meilleure présence mentale, et une expérience utilisateur propre.\n\nL'objectif est de privilégier la qualité d'exposition plutôt que la saturation publicitaire." },
      ],
      animation: [
        { q: "Peut-on faire autre chose qu'une simple publicité ?", a: "Oui, et c'est justement l'un des plus gros avantages de POP-E.\n\nNous pouvons mettre en place : des animations commerciales, des activations terrain, des expériences interactives, des jeux concours, des QR codes, des offres promotionnelles, des distributions, ou des campagnes hybrides physiques + digitales.\n\nL'objectif est de transformer la visibilité en interaction réelle." },
        { q: "Qu'est-ce qu'une activation ou animation commerciale POP-E ?", a: "Une activation consiste à faire vivre une expérience autour de votre marque.\n\nPar exemple : offrir la recharge, distribuer des avantages, lancer un jeu concours, créer un espace de visibilité, faire interagir les utilisateurs avec un QR code, ou associer votre marque à un service premium.\n\nCe type d'opération génère généralement beaucoup plus d'engagement qu'une publicité classique." },
        { q: "Peut-on sponsoriser la recharge ?", a: "Oui. Votre marque peut offrir une recharge gratuite, une durée sponsorisée, ou une expérience premium aux utilisateurs.\n\nC'est l'un des formats les plus efficaces car l'utilisateur associe directement votre marque à une solution utile." },
        { q: "Peut-on être sponsor exclusif ?", a: "Oui. Vous pouvez devenir sponsor exclusif d'une borne, d'une zone, d'un événement, ou d'une activation spécifique.\n\nCela permet à votre marque de capter toute l'attention liée au dispositif." },
      ],
      audience: [
        { q: "Quel type d'audience peut-on toucher avec POP-E ?", a: "Cela dépend des lieux et événements sélectionnés, mais POP-E touche principalement une audience active, connectée, mobile, et fortement engagée dans son expérience.\n\nLes dispositifs fonctionnent particulièrement bien dans les environnements où les utilisateurs utilisent beaucoup leur téléphone." },
        { q: "Pourquoi POP-E améliore l'image de marque ?", a: "Parce que votre marque est associée à quelque chose d'utile.\n\nAujourd'hui, les utilisateurs rejettent de plus en plus la publicité intrusive. Avec POP-E, la marque apporte un service réel.\n\nCette logique crée plus de sympathie, une meilleure perception, et un impact émotionnel plus fort." },
        { q: "Est-ce adapté à une grande marque ?", a: "Oui, particulièrement. POP-E permet de combiner visibilité terrain, affichage digital, expérience utilisateur, animation commerciale, et activation marketing.\n\nC'est un excellent complément aux campagnes digitales, social media ou affichage classique." },
      ],
      formats: [
        { q: "Quels formats publicitaires sont possibles ?", a: "Nous diffusons principalement : images, animations, vidéos courtes, contenus interactifs, QR codes, ou campagnes sponsorisées.\n\nLe format est pensé pour capter rapidement l'attention dans un environnement dynamique." },
        { q: "Faut-il créer une publicité spécifique ?", a: "Pas forcément. Une campagne existante peut souvent être adaptée rapidement aux formats POP-E.\n\nNous pouvons également accompagner la création de contenus optimisés pour maximiser l'attention, la lisibilité, et l'impact visuel." },
        { q: "Quels contenus fonctionnent le mieux ?", a: "Les campagnes les plus performantes sont généralement simples, visuelles, dynamiques, et orientées expérience.\n\nLes formats associés à une utilité, une offre, une interaction, ou une activation terrain fonctionnent souvent particulièrement bien." },
      ],
      deploy: [
        { q: "Peut-on déployer une campagne sur plusieurs lieux ou événements ?", a: "Oui. POP-E peut créer une présence cohérente sur plusieurs festivals, plusieurs établissements, plusieurs villes, ou plusieurs événements.\n\nCela permet de construire une campagne terrain beaucoup plus visible et mémorable." },
        { q: "Combien de temps à l'avance faut-il réserver ?", a: "Idéalement plusieurs semaines à l'avance, surtout pour les événements très demandés.\n\nCertains emplacements ou périodes stratégiques partent rapidement." },
        { q: "Peut-on faire une campagne courte ?", a: "Oui. POP-E est parfaitement adapté aux opérations week-end, aux lancements, aux campagnes événementielles, ou aux tests rapides." },
      ],
      tarifs: [
        { q: "Combien coûte une campagne POP-E ?", a: "Le tarif dépend principalement du nombre de bornes, des lieux, de la durée, du trafic, et du niveau d'activation souhaité.\n\nLe positionnement reste généralement très compétitif au regard de l'attention obtenue, de la répétition, et de l'expérience utilisateur générée." },
        { q: "Peut-on tester le dispositif avant une campagne plus importante ?", a: "Oui, et c'est même souvent recommandé. Une première campagne permet rapidement d'évaluer la visibilité, l'engagement, et le potentiel du dispositif pour votre marque." },
        { q: "Fournissez-vous des statistiques ou un reporting ?", a: "Oui. Nous pouvons fournir des données liées à la diffusion, à la visibilité, au trafic, et selon les campagnes, aux interactions générées.\n\nCela permet de mesurer concrètement les performances de l'opération." },
        { q: "Que se passe-t-il en cas de problème technique ?", a: "Un suivi technique est assuré afin de garantir la continuité du dispositif et de la campagne.\n\nNotre objectif : garantir une expérience fluide aussi bien pour les utilisateurs que pour les marques." },
      ],
    },
  },
  en: {
    MENU: [
      { id: 1, label: 'Rent a battery / use a station',                   badge: 'n1' },
      { id: 2, label: 'Install POP-E at an event or venue',               badge: 'n2' },
      { id: 3, label: 'Advertise on our screens',                         badge: 'n3' },
      { id: 4, label: 'Ask another question',                             badge: 'n4' },
    ],
    welcome_msg: "Hello, I'm the POP-E assistant.\nHow can I help you today?",
    other_msg: "Thanks for your interest! Our team will get back to you shortly.",
    other_msg2: "Can I help you with anything else?",
    help_msg: "What topic can I help you with?",
    choose_msg: "Choose your question:",
    more_msg: "Do you have any other questions?",
    back_questions: cat => `More questions about "${cat.label}"`,
    back_categories: "Back to categories",
    back_menu: "Back to main menu",
    BATTERY_CATEGORIES: [
      { id: 'usage',   label: 'Using the station' },
      { id: 'price',   label: 'Pricing and payment' },
      { id: 'battery', label: 'Battery and compatibility' },
      { id: 'flex',    label: 'Usage and flexibility' },
      { id: 'help',    label: 'Issues and support' },
      { id: 'access',  label: 'Access and availability' },
    ],
    BATTERY_QA: {
      usage: [
        { q: 'How does a POP-E station work?', a: 'POP-E stations let you rent a battery in seconds.\n\nVia QR code / app: scan the QR code to block the deposit and start the rental.\nVia contactless terminal: bank card, Apple Pay or Google Pay.\n\nOnce the deposit is confirmed, the battery is released automatically.' },
        { q: 'Do I need to download an app?', a: "No, it's not required. You can use the station directly via contactless payment.\n\nThe app is useful for promo codes or to access the station map." },
        { q: 'Is it quick?', a: 'Yes! Renting takes about 15 seconds, via the app or contactless.' },
      ],
      price: [
        { q: 'How much does it cost to rent a battery?', a: 'The price depends on the venue or event. Billing is done per half-hour or per hour.' },
        { q: 'How do I pay?', a: 'Payment is processed automatically at the end of the rental.\n\nA deposit is held at pickup, then deducted upon return.\n\nAccepted: bank card, Apple Pay, Google Pay.' },
        { q: 'Is there a deposit?', a: 'Yes, a deposit is required at the start. Upon return, it is cancelled or the rental amount is simply deducted.' },
      ],
      battery: [
        { q: 'How long does a battery last?', a: 'A battery generally provides up to 2 full phone charges.' },
        { q: 'Is the battery already charged?', a: 'Yes! Batteries cannot be rented if they are not charged above 70%.' },
        { q: 'Which phones are compatible?', a: 'All smartphones thanks to built-in cables:\n Lightning (iPhone)\n USB-C\n Micro-USB' },
      ],
      flex: [
        { q: 'Where do I return the battery?', a: 'At any POP-E station in the network. All stations are visible on the map via the app.' },
        { q: 'How long can I keep the battery?', a: 'Up to 24 hours maximum. Beyond that, the deposit is kept and the battery is considered purchased.' },
        { q: 'Can I swap my battery?', a: 'Yes! Return the battery at a station and start a new rental.' },
        { q: 'Can I use multiple batteries?', a: 'Yes. Via contactless, you can rent several. Via the app, this depends on the current management system.' },
        { q: 'Can I lend the battery to someone?', a: 'Yes, but you remain responsible until it is returned.' },
      ],
      help: [
        { q: 'What if a battery does not work?', a: 'At a festival: go to the POP-E info point.\nIn the city: return the battery — the issue will be reported automatically.' },
        { q: 'What if the station is full?', a: 'Check the map to find another nearby station. At a festival, go to the POP-E info point.' },
        { q: 'What happens if I do not return the battery?', a: 'After a certain period, the battery is considered purchased. The deposit is kept and the rental is charged.' },
        { q: 'I was charged even though I returned the battery', a: 'Check that the return was confirmed in the app. If in doubt, contact support with your rental details.' },
      ],
      access: [
        { q: 'Where can I find a POP-E station?', a: 'Stations are in strategic locations: festivals, events, train stations, bars, public spaces.\n\n👉 Check the map via the app.' },
        { q: 'Are stations available 24/7?', a: 'Yes in venues open around the clock, otherwise according to venue hours. Hours are visible via the app.' },
        { q: 'Can I reserve a battery?', a: 'No, batteries are available on a first-come, first-served basis directly on-site.' },
      ],
    },
    LIEU_CATEGORIES: [
      { id: 'comprendre', label: 'Understanding POP-E' },
      { id: 'install',    label: 'Installation and Logistics' },
      { id: 'rentab',     label: 'Profitability and Business Model' },
      { id: 'pub',        label: 'Advertising, Sponsors and Activations' },
      { id: 'festival',   label: 'Festivals and Events' },
      { id: 'securite',   label: 'Usage, Safety and Maintenance' },
      { id: 'rse',        label: 'CSR and Brand Image' },
      { id: 'partner',    label: 'Partnership and Getting Started' },
    ],
    LIEU_QA: {
      comprendre: [
        { q: 'What is POP-E and what does a station do?', a: "POP-E turns a daily problem — dead phones — into a useful, profitable, and visible service for your venue or event.\n\nOur stations let visitors rent a battery in seconds, while creating a communication and monetisation tool in your space.\n\nFor you, it's a customer service, an advertising platform, a visibility tool, and potentially a new revenue stream." },
        { q: 'How does a POP-E station work?', a: "It's extremely simple:\n\n The user scans a QR code or pays contactlessly.\n The battery is released in seconds.\n They use it normally, then return it at any station.\n\nThe whole process takes 10 to 15 seconds. Less friction means more usage." },
        { q: 'Do users need to download an app?', a: "No. Users can rent directly via QR code, bank card, or contactless smartphone payment.\n\nThe app remains optional for promo codes, partner offers, or rental history." },
        { q: 'Is it really used by customers and festival-goers?', a: "Yes, because the need is universal and immediate. A dead phone means no GPS, no photos, no payments, no social media.\n\nWhen someone drops below 10%, the decision to rent becomes almost instant.\n\nIt performs particularly well at festivals, concerts, bars, restaurants, clubs, trade shows, and any high-traffic venue." },
      ],
      install: [
        { q: 'How does the installation work?', a: "POP-E handles everything: installation, setup, configuration, support, and maintenance.\n\nYou benefit from the service with zero technical complexity." },
        { q: 'What do I need to install a station?', a: "Very little:\n A standard power outlet\n A visible location\n Ideally a high-traffic area\n\nOur stations integrate easily without disrupting your existing setup." },
        { q: 'How much space does a station take up?', a: "Stations are compact. We adapt the format to the venue:\n Small stations\n Medium stations\n Large event stations with up to 48 batteries\n\nThe goal: maximum visual impact with minimal footprint." },
        { q: 'Do stations work outdoors?', a: "Yes. Event stations are built to handle real conditions: heavy use, weather, transport, festivals.\n\nOutdoor events are actually where demand tends to be highest." },
        { q: 'How long does installation take?', a: "A few hours is usually enough. In most cases, a station is installed and operational within the same day." },
      ],
      rentab: [
        { q: 'How much does installation cost?', a: "In most cases: no upfront investment.\n\nPOP-E finances the installation and earns revenue through battery rentals, advertising space, and sponsorships.\n\nThe model is designed to minimise your risk." },
        { q: 'How does POP-E make money?', a: "Our model relies on several complementary levers:\n Battery rentals\n Screen advertising\n Sponsorships\n Partner activations\n\nThis funds the service while keeping the user experience smooth." },
        { q: 'Can my venue generate revenue?', a: "Yes. A POP-E station can become a supplementary income stream through advertising, partner activations, exclusive sponsors, or a defined revenue share." },
        { q: 'Does it consume a lot of electricity?', a: "No. Power consumption is low relative to the value generated. A station typically uses less energy than standard catering or refrigeration equipment." },
      ],
      pub: [
        { q: 'How does advertising on the stations work?', a: "Screens display short, dynamic, repeated content throughout the day.\n\nUsers naturally approach the stations to charge their phones — the advertising is embedded in a genuinely used experience. That's what creates more attention, better recall, and a positive brand impact." },
        { q: 'Can we display our own content?', a: "Yes. You can broadcast your schedule, announcements, offers, maps, partners, safety messages, or visitor information.\n\nThe stations become genuine strategic information points." },
        { q: 'Can we sell advertising space?', a: "Yes. In a busy venue, the station becomes a local media channel capable of attracting brands, partners, sponsors, or local businesses." },
        { q: 'Can we have an exclusive sponsor?', a: "Yes. A sponsor can offer free charging, associate their image with the service, appear on screens, or fully sponsor a zone or event.\n\nThis is a particularly effective activation because the brand is linked to a genuinely useful service." },
        { q: 'Can we run commercial activations?', a: "Yes. We can set up brand activations, contests, QR codes, promotional offers, giveaways, interactive experiences, or combined physical + digital campaigns." },
      ],
      festival: [
        { q: 'Is POP-E suited to festivals?', a: "Yes — it's actually one of the environments where the service performs best.\n\nAt a festival, visitors use their phones heavily, stay on-site for long periods, and rarely have access to charging points. Demand becomes extremely natural." },
        { q: 'How many stations are needed for an event?', a: "Every event is different. We assess the number of visitors, duration, traffic zones, camping areas, and site layout.\n\nThe goal: maximise usage without over-equipping." },
        { q: 'Can charging be offered for free to festival-goers?', a: "Yes, via a sponsor or directly by the organiser.\n\nThis is a highly appreciated activation: visitors love it, the sponsor gains visibility, and the overall festival experience is enhanced." },
        { q: 'Can the stations serve as information points?', a: "Yes. POP-E screens can display maps, schedules, timetables, safety messages, partner information, or real-time content.\n\nThe stations become genuine modern information hubs in the heart of the crowd." },
      ],
      securite: [
        { q: 'Are the batteries secure?', a: "Yes. The system uses a deposit, rental tracking, and automated return management.\n\nThis greatly reduces the risk of loss or non-return." },
        { q: 'What happens if a battery is not returned?', a: "The deposit automatically covers this situation. You have nothing to manage." },
        { q: 'Are the batteries compatible with all phones?', a: "Yes, with the vast majority of current smartphones. Batteries include multiple connectors compatible with iPhone and Android." },
        { q: 'Who handles maintenance?', a: "POP-E manages maintenance, monitoring, support, and technical interventions.\n\nYour team does not need to handle day-to-day operation." },
        { q: 'What happens in case of a technical issue?', a: "We respond quickly to ensure service continuity. Our interest is the same as yours: stations that work and are used at all times." },
      ],
      rse: [
        { q: 'Is it an eco-friendly solution?', a: "Yes. Sharing reduces the purchase of individual batteries, electronic waste, and certain physical communication materials." },
        { q: 'Can POP-E be integrated into a CSR approach?', a: "Yes. POP-E can help modernise the visitor experience, reduce printed materials, highlight committed partners, and strengthen the venue's innovative image." },
        { q: "Does POP-E improve the venue's image?", a: "Yes. Installing POP-E projects a modern, practical, innovative image focused on the user experience.\n\nVisitors perceive the service as a genuine added value." },
      ],
      partner: [
        { q: 'How do I become a POP-E partner?', a: "Simply contact us. We quickly assess your venue, footfall, needs, and objectives, then propose a tailored solution." },
        { q: 'Can we test the solution before a larger rollout?', a: "Yes. We can set up tests, event installations, or pilot periods to concretely measure the potential before going further." },
        { q: 'Why choose POP-E over a standard charging station?', a: "Because POP-E is not just a station. It's a useful service, a modern experience, a communication platform, a monetisation lever, and an image tool.\n\nYou're not just adding a plug — you're adding a service visitors actually use." },
      ],
    },
    PUB_CATEGORIES: [
      { id: 'comprendre', label: 'Understanding POP-E' },
      { id: 'visibilite', label: 'Visibility and Impact' },
      { id: 'animation',  label: 'Advertising and Commercial Activations' },
      { id: 'audience',   label: 'Audience and Brand Image' },
      { id: 'formats',    label: 'Ad Formats and Creative' },
      { id: 'deploy',     label: 'Organisation and Deployment' },
      { id: 'tarifs',     label: 'Pricing, Reporting and Tracking' },
    ],
    PUB_QA: {
      comprendre: [
        { q: 'What is POP-E for a brand?', a: "POP-E gives your brand visibility in a far more engaging context than traditional advertising.\n\nOur stations are installed in high-traffic venues: festivals, bars, restaurants, hotels, events, tourist spots, public spaces.\n\nYour ad isn't endured — it's part of a genuinely used, useful experience. That's what creates more attention, better recall, and a more positive brand impact." },
        { q: 'Why is POP-E different from classic outdoor advertising?', a: "Because POP-E goes beyond displaying an ad.\n\nYou're associated with a useful service, a real interaction, and a moment that matters to the user.\n\nUnlike a background billboard, our screens are consulted voluntarily. The result: stronger attention, better recall, and much better ad perception." },
        { q: 'Where are POP-E stations installed?', a: "POP-E stations are placed in venues where users spend time and use their phones heavily: festivals, concerts, bars, restaurants, hotels, sports events, trade shows, tourist spots, event spaces.\n\nThe goal: place your brand directly in the flow." },
      ],
      visibilite: [
        { q: 'How many people can see my ad?', a: "It depends on the venue, traffic, and number of stations installed.\n\nAt some events, a campaign can generate thousands or even tens of thousands of views.\n\nUsers often see the same content multiple times during their experience, which significantly increases recall." },
        { q: 'Why do users actually look at the screens?', a: "Because they naturally approach the stations for a real need: charging their phone, checking information, using the service, or simply waiting.\n\nThe ad therefore appears in a much higher-quality attention context than classic outdoor or a saturated social feed." },
        { q: 'Is it comparable to DOOH?', a: "Yes, but with one major difference: POP-E combines digital display AND a useful service.\n\nYour ad isn't just visible in the background — it's associated with a real user interaction. That's what makes the format far more engaging." },
        { q: 'Will my ad be lost among other brands?', a: "No. The number of brands present is intentionally limited to ensure clear visibility, stronger brand presence, and a clean user experience.\n\nThe priority is quality of exposure over ad saturation." },
      ],
      animation: [
        { q: 'Can we do more than just display an ad?', a: "Yes — and that's actually one of POP-E's biggest advantages.\n\nWe can set up commercial activations, field experiences, interactive campaigns, contests, QR codes, promotional offers, giveaways, or hybrid physical + digital campaigns.\n\nThe goal is to turn visibility into real interaction." },
        { q: 'What is a POP-E commercial activation?', a: "An activation means creating a live brand experience.\n\nFor example: offering free charging, distributing benefits, running a contest, creating a visibility space, getting users to interact via QR code, or associating your brand with a premium service.\n\nThis type of operation typically generates far more engagement than a standard ad." },
        { q: 'Can we sponsor charging?', a: "Yes. Your brand can offer free charging, a sponsored duration, or a premium experience to users.\n\nThis is one of the most effective formats because the user directly associates your brand with a useful solution." },
        { q: 'Can we be an exclusive sponsor?', a: "Yes. You can become the exclusive sponsor of a station, a zone, an event, or a specific activation.\n\nThis allows your brand to capture all the attention generated by the device." },
      ],
      audience: [
        { q: 'What type of audience can POP-E reach?', a: "It depends on the venues and events selected, but POP-E primarily reaches an active, connected, mobile audience that is highly engaged in their experience.\n\nThe device works particularly well in environments where users rely heavily on their phones." },
        { q: 'Why does POP-E improve brand image?', a: "Because your brand is associated with something useful.\n\nToday, users increasingly reject intrusive advertising. With POP-E, the brand delivers a real service.\n\nThis creates more goodwill, better perception, and a stronger emotional impact." },
        { q: 'Is it suited to large brands?', a: "Yes, particularly so. POP-E combines field visibility, digital display, user experience, commercial activation, and marketing campaigns.\n\nIt's an excellent complement to digital, social media, or classic outdoor campaigns." },
      ],
      formats: [
        { q: 'What ad formats are available?', a: "We primarily broadcast: images, animations, short videos, interactive content, QR codes, or sponsored campaigns.\n\nThe format is designed to capture attention quickly in a dynamic environment." },
        { q: 'Do we need to create specific advertising?', a: "Not necessarily. An existing campaign can often be quickly adapted to POP-E formats.\n\nWe can also support the creation of optimised content to maximise attention, readability, and visual impact." },
        { q: 'Which content works best?', a: "The best-performing campaigns are generally simple, visual, dynamic, and experience-oriented.\n\nFormats associated with a benefit, an offer, an interaction, or a field activation tend to perform particularly well." },
      ],
      deploy: [
        { q: 'Can we run a campaign across multiple venues or events?', a: "Yes. POP-E can create consistent presence across multiple festivals, venues, cities, or events.\n\nThis allows you to build a far more visible and memorable field campaign." },
        { q: 'How far in advance do we need to book?', a: "Ideally several weeks in advance, especially for high-demand events.\n\nCertain strategic slots and periods fill up quickly." },
        { q: 'Can we run a short campaign?', a: "Yes. POP-E is perfectly suited to weekend activations, launches, event campaigns, or quick tests." },
      ],
      tarifs: [
        { q: 'How much does a POP-E campaign cost?', a: "The price mainly depends on the number of stations, venues, duration, traffic, and the level of activation required.\n\nPricing is generally very competitive given the attention achieved, repetition, and user experience generated." },
        { q: 'Can we test the device before a larger campaign?', a: "Yes — and it's often recommended. A first campaign quickly demonstrates visibility, engagement, and the potential of the device for your brand." },
        { q: 'Do you provide statistics or reporting?', a: "Yes. We can provide data on broadcast reach, visibility, traffic, and depending on the campaign, interactions generated.\n\nThis allows you to concretely measure the performance of the operation." },
        { q: 'What happens in case of a technical issue?', a: "Technical monitoring is in place to ensure continuity of the device and the campaign.\n\nOur goal: a seamless experience for both users and brands." },
      ],
    },
  }
};

  /* ─── INJECTION HTML ────────────────────────────────────────────── */

  const html = `
    <div id="chatbot-btn" title="Assistant POP-E" aria-label="Ouvrir le chatbot">
        <img src="/img/chatbot.png" alt="Assistant POP-E">
    </div>
    <div id="chatbot-window" role="dialog" aria-label="Assistant POP-E">
      <div id="chatbot-header">
        <img src="/img/logo2.png" alt="Logo POP-E">
        <div id="chatbot-close" title="Fermer" aria-label="Fermer le chatbot">✕</div>
      </div>
      <div id="chatbot-body"></div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  /* ─── REFS ──────────────────────────────────────────────────────── */

  const btn   = document.getElementById('chatbot-btn');
  const win   = document.getElementById('chatbot-window');
  const body  = document.getElementById('chatbot-body');
  const close = document.getElementById('chatbot-close');

  let isOpen = false;
  let currentMenu = 1;
  btn.classList.add('pulse-1');
  btn.style.background = '#000000';

  function scrollBottom() {}

  /* ─── TRANSLATE ─────────────────────────────────────────────────── */
  function t() { return DATA[window.currentLang || 'fr']; }

  /* ─── HELPER : CHANGER COULEUR PULSE ───────────────────────────── */
  function setPulse(id) {
    btn.style.animation = 'none';
    btn.classList.remove('pulse-1', 'pulse-2', 'pulse-3', 'pulse-4');
    void btn.offsetWidth;
    btn.style.animation = '';
    btn.classList.add('pulse-' + id);
  }

  /* ─── HELPERS ───────────────────────────────────────────────────── */

  function addBubble(text, who = 'bot', delay = 0, extraClass = '') {
    return new Promise(resolve => {
      setTimeout(() => {
        if (who === 'bot') {
          const row = document.createElement('div');
          row.className = 'cb-bot-row';
          row.innerHTML = `<div class="cb-bubble bot ${extraClass}" style="white-space:pre-line">${text.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</div>`;
          body.appendChild(row);
        } else {
          const el = document.createElement('div');
          el.className = `cb-bubble ${who}`;
          el.style.whiteSpace = 'pre-line';
          el.textContent = text;
          const colors = { 1: '#ADFF00', 2: '#55EBFF', 3: '#9109F0', 4: '#E300FF' };
          el.style.borderColor = colors[currentMenu] || '#ADFF00';
          body.appendChild(el);
        }
        scrollBottom();
        resolve();
      }, delay);
    });
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'cb-typing';
    el.id = 'cb-typing-indicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(el);
    scrollBottom();
  }

  function removeTyping() {
    const el = document.getElementById('cb-typing-indicator');
    if (el) el.remove();
  }

  function clearChoices() {
    body.querySelectorAll('.cb-choices').forEach(el => el.remove());
  }

  function showChoices(items, onClick) {
    const wrap = document.createElement('div');
    wrap.className = `cb-choices menu-ctx-${currentMenu}`;
    items.forEach(item => {
      const b = document.createElement('div');
      b.className = 'cb-choice';
      b.innerHTML = item.emoji
        ? `<span class="cb-choice-emoji">${item.emoji}</span><span>${item.label}</span>`
        : `<span>${item.label}</span>`;
      b.addEventListener('click', e => { e.stopPropagation(); onClick(item); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    scrollBottom();
  }

  function addBackButton(label, onClick) {
    const wrap = document.createElement('div');
    wrap.className = `cb-choices menu-ctx-${currentMenu}`;
    const b = document.createElement('div');
    b.className = 'cb-choice cb-back';
    b.innerHTML = `<div class="cb-back-arrow">←</div><span>${label}</span>`;
    b.addEventListener('click', e => { e.stopPropagation(); onClick(); });
    wrap.appendChild(b);
    body.appendChild(wrap);
    scrollBottom();
  }

  /* ─── MENU PRINCIPAL ────────────────────────────────────────────── */

  function setBtnColor(id) {
    const colors = { 1: '#ADFF00', 2: '#55EBFF', 3: '#9109F0', 4: '#E300FF' };
    const color = colors[id] || '#ADFF00';
    btn.style.background = color;
    body.style.setProperty('--scroll-color', color);
    win.style.setProperty('--window-color', `${color}33`);
  }

  window.chatbotWelcome = async function welcome() {
    body.innerHTML = '';
    body.style.setProperty('--scroll-color', '#ADFF00');
    setPulse(1);
    btn.style.background = '#000000';
    await addBubble(t().welcome_msg, 'bot', 0);
    win.style.setProperty('--window-color', 'rgba(173, 255, 0, 0.2)');
    const wrap = document.createElement('div');
    wrap.className = 'cb-choices';
    t().MENU.forEach(item => {
      const b = document.createElement('div');
      b.className = `cb-choice menu-${item.id}`;
      b.innerHTML = `<div class="cb-badge ${item.badge}">${item.id}</div><span>${item.label}</span>`;
      b.addEventListener('click', e => { e.stopPropagation(); onMainChoice(item); });
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    scrollBottom();
  }
  const welcome = window.chatbotWelcome;

  async function onMainChoice(item) {
    currentMenu = item.id;
    clearChoices();
    addBubble(item.label, 'user');
    setPulse(item.id);
    setBtnColor(item.id);

    if (item.id === 1) {
      addTyping();
      await new Promise(r => setTimeout(r, 700));
      removeTyping();
      showBatteryCategories();
      return;
    }
    if (item.id === 2) {
      addTyping();
      await new Promise(r => setTimeout(r, 700));
      removeTyping();
      showLieuCategories();
      return;
    }
    if (item.id === 3) {
      addTyping();
      await new Promise(r => setTimeout(r, 700));
      removeTyping();
      showPubCategories();
      return;
    }

    addTyping();
    await new Promise(r => setTimeout(r, 800));
    removeTyping();
    await addBubble(t().other_msg, 'bot');
    await new Promise(r => setTimeout(r, 400));
    await addBubble(t().other_msg2, 'bot');
    setTimeout(() => welcome(), 300);
  }

  /* ─── NIVEAU 2 : CATÉGORIES ─────────────────────────────────────── */

  async function showBatteryCategories() {
    clearChoices();
    await addBubble(t().help_msg, 'bot');
    showChoices(t().BATTERY_CATEGORIES, cat => onBatteryCategory(cat));
    addBackButton(t().back_menu, welcome);
  }

  function onBatteryCategory(cat) {
    clearChoices();
    addBubble(cat.label, 'user');
    setTimeout(() => showBatteryQuestions(cat), 400);
  }

  function onLieuCategory(cat) {
    clearChoices();
    addBubble(cat.label, 'user');
    setTimeout(() => showLieuQuestions(cat), 400);
  }

  /* ─── NIVEAU 3 : QUESTIONS ──────────────────────────────────────── */

  async function showBatteryQuestions(cat) {
    clearChoices();
    await addBubble(t().choose_msg, 'bot');
    showChoices(t().BATTERY_QA[cat.id].map(qa => ({ label: qa.q, _qa: qa })), item => onBatteryQuestion(item._qa, cat));
    addBackButton(t().back_categories, showBatteryCategories);
  }

  /* ─── NIVEAU 4 : RÉPONSE ────────────────────────────────────────── */

  async function onBatteryQuestion(qa, cat) {
    clearChoices();
    addBubble(qa.q, 'user');
    addTyping();
    await new Promise(r => setTimeout(r, 700));
    removeTyping();
    await addBubble(qa.a, 'bot', 0, `ctx-${currentMenu}`);
    await new Promise(r => setTimeout(r, 400));
    await addBubble(t().more_msg, 'bot');
    setTimeout(() => {
      addBackButton(t().back_questions(cat), () => {
        clearChoices();
        addBubble(t().back_questions(cat), 'user');
        setTimeout(() => showBatteryQuestions(cat), 400);
      });
      addBackButton(t().back_categories, () => {
        clearChoices();
        addBubble(t().back_categories, 'user');
        setTimeout(() => showBatteryCategories(), 400);
      });
      addBackButton(t().back_menu, () => {
        clearChoices();
        addBubble(t().back_menu, 'user');
        setTimeout(() => welcome(), 400);
      });
    }, 300);
  }

  /* ─── NIVEAU 2-3-4 : INSTALLER POP-E ───────────────────────────── */

  async function showLieuCategories() {
    clearChoices();
    await addBubble(t().help_msg, 'bot');
    showChoices(t().LIEU_CATEGORIES, cat => onLieuCategory(cat));
    addBackButton(t().back_menu, welcome);
  }

  async function showLieuQuestions(cat) {
    clearChoices();
    await addBubble(t().choose_msg, 'bot');
    showChoices(t().LIEU_QA[cat.id].map(qa => ({ label: qa.q, _qa: qa })), item => onLieuQuestion(item._qa, cat));
    addBackButton(t().back_categories, showLieuCategories);
  }

  async function onLieuQuestion(qa, cat) {
    clearChoices();
    addBubble(qa.q, 'user');
    addTyping();
    await new Promise(r => setTimeout(r, 700));
    removeTyping();
    await addBubble(qa.a, 'bot', 0, `ctx-${currentMenu}`);
    await new Promise(r => setTimeout(r, 400));
    await addBubble(t().more_msg, 'bot');
    setTimeout(() => {
      addBackButton(t().back_questions(cat), () => {
        clearChoices();
        addBubble(t().back_questions(cat), 'user');
        setTimeout(() => showLieuQuestions(cat), 400);
      });
      addBackButton(t().back_categories, () => {
        clearChoices();
        addBubble(t().back_categories, 'user');
        setTimeout(() => showLieuCategories(), 400);
      });
      addBackButton(t().back_menu, () => {
        clearChoices();
        addBubble(t().back_menu, 'user');
        setTimeout(() => welcome(), 400);
      });
    }, 300);
  }

  /* ─── NIVEAU 2-3-4 : PUBLICITÉ ──────────────────────────────────── */

  async function showPubCategories() {
    clearChoices();
    await addBubble(t().help_msg, 'bot');
    showChoices(t().PUB_CATEGORIES, cat => onPubCategory(cat));
    addBackButton(t().back_menu, welcome);
  }

  function onPubCategory(cat) {
    clearChoices();
    addBubble(cat.label, 'user');
    setTimeout(() => showPubQuestions(cat), 400);
  }

  async function showPubQuestions(cat) {
    clearChoices();
    await addBubble(t().choose_msg, 'bot');
    showChoices(t().PUB_QA[cat.id].map(qa => ({ label: qa.q, _qa: qa })), item => onPubQuestion(item._qa, cat));
    addBackButton(t().back_categories, showPubCategories);
  }

  async function onPubQuestion(qa, cat) {
    clearChoices();
    addBubble(qa.q, 'user');
    addTyping();
    await new Promise(r => setTimeout(r, 700));
    removeTyping();
    await addBubble(qa.a, 'bot', 0, `ctx-${currentMenu}`);
    await new Promise(r => setTimeout(r, 400));
    await addBubble(t().more_msg, 'bot');
    setTimeout(() => {
      addBackButton(t().back_questions(cat), () => {
        clearChoices();
        addBubble(t().back_questions(cat), 'user');
        setTimeout(() => showPubQuestions(cat), 400);
      });
      addBackButton(t().back_categories, () => {
        clearChoices();
        addBubble(t().back_categories, 'user');
        setTimeout(() => showPubCategories(), 400);
      });
      addBackButton(t().back_menu, () => {
        clearChoices();
        addBubble(t().back_menu, 'user');
        setTimeout(() => welcome(), 400);
      });
    }, 300);
  }

  /* ─── OPEN / CLOSE ──────────────────────────────────────────────── */

  function openChat() {
    isOpen = true;
    if (!body.hasChildNodes()) welcome();
    win.classList.add('open');
    setTimeout(() => {
      win.style.height = win.offsetHeight + 'px';
    }, 350);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
    win.style.height = '';
    win.style.minHeight = '';
  }

  /* ─── EVENTS ────────────────────────────────────────────────────── */

  btn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  close.addEventListener('click', closeChat);
  document.addEventListener('click', e => {
    if (!isOpen) return;
    if (win.contains(e.target) || btn.contains(e.target)) return;
    closeChat();
  });

})();