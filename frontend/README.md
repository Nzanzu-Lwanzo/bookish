About
=====

Veuillez, s'il vous plaît, lire ceci avant d'utiliser **Bookish**. Sinon, scroller jusqu'au bas de la page et cliquez sur le bouton. Vous pourrez toujours revenir en cliquant sur le bouton  dans l'en-tête.

Qu'est-ce que Bookish ?
-----------------------

**Bookish** est une application web développée par [ NZANZU MUHAYRWA L.V](https://github.com/Nzanzu-Lwanzo) , programmeur et écrivain, et qui vous permet de sauvegarder le fruit de vos lectures dans une base de données. **Bookish** est une application très légère en ce sens qu' **elle ne nécessite pas l'accès à une connexion internet pour fonctionner** . La connexion n'est requise que pour se rendre sur le site et charger la page. Une fois que vous vous êtes rendu sur le site, vous pourrez effectuer différentes opérations (créer une collection, ajouter des livres, en supprimer, ...) **sans que vos données mobiles soient consommées**. En fait, vous pourrez même éteindre votre connexion.

Comment Bookish fonctionne-t-il ?
---------------------------------

**Bookish** fonctionne de manière très simple. Une fois que vous vous connectez au site pour la première fois, une **Base de Données** sera créée sur votre téléphone ou votre ordinateur. Aussi, nous vous demandons d'autoriser la création de cette BDD quand le navigateur vous le demandera.  
C'est dans cette BDD que vous stockerez vos collections et vos livres, vous permettant donc de fonctionner sans avoir besoin de contacter un serveur ou une BDD éloignée (ce qui, évidemment, vous permet de sauver vos mégas).

Les désavantages de Bookish
---------------------------

**Bookish** présente les désavantages suivants :

*   Puisque la BDD est installée sur un appareil, vous n'aurez pas la possibilité d'y accéder à partir d'un autre. En des termes simples, la Base de Données que vous avez sur votre téléphone n'est pas la même que celle que vous avez sur votre ordinateur. Ainsi, les livres et les collections que vous créez sur votre téléphone ne seront pas accessibles depuis votre ordinateur, votre tablette ou depuis un autre téléphone.
    
*   Puisque la BDD est installée sur un appareil, vous n'aurez pas la possibilité de partager ces lectures et personne d'autre ne pourra y avoir accès à part vous.
    
*   Inutile de partager le lien d'une page de livre. Puisque les données ne sont pas stockées sur un serveur, les personnes à qui vous partagez le lien n'obtiendront toujours qu'une erreur 404 (Not Found = Ressource non retrouvée).
    
*   Il peut arriver, pour différentes raisons, que la BDD se supprime d'elle-même et que vous perdiez vos données. Nous sommes en train d'implémenter des techniques de sauvegarde (backup sur BDD cloud, téléchargement en PDF, ... ). En attendant que la solution soit trouvée, utilisez l'application mais soyez prudents.
    

Les perspectives de Bookish
---------------------------

Nous tenons à signaler que celle-ci est a version bêta de **Bookish**. Nous y travaillons toujours. Dans l'avenir, vous pourrez **synchroniser vos BDD à travers vos différents appareils (en utilisant **Bluetooth**, par exemple)** , **avoir la possibilité de sauvegarder vos données sur un serveur ou dans votre Google Drive** , ... et bien d'autres fonctionnalités.

Les besoins de Bookish
----------------------

Comme vous avez pu le remarquer, **Bookish** ne possède pas d'adresse propre. Nous utilisons un sous-domaine **Render**. Nous aurons besoin d'acheter notre propre domaine (par exemple, **www.bookish.edu**).  
En plus de cela, pour permettre le partage de collections et des livres entre utilisateurs, nous aurions probablement besoin de payer un hébergement sur un serveur. Ce qui coûte, évidemment, de l'argent.  
  
Si vous voulez faire un don pour permettre à **Bookish** de continuer à fonctionner et au développeur de l'améliorer, merci de le contacter à [cette adresse e-mail.](mailto:nzanzu.lwanzo.work@gmail.com)  
  
Si vous êtes **développeur** et voulez collaborer à l'amélioration de **Bookish**, écrivez à la même adresse e-mail ou accédez au profil Github du développeur [en cliquant sur ce lien](https://github.com/Nzanzu-Lwanzo) .

Lisez ceci si vous êtes programmeur.
------------------------------------

Voici l'architecture de **Bookish**

*    **Interface** : l'interface de Bookish est faite avec **React**.
    
*    **Base de Données** : l'application utilise **indexedDB**, une solution de stockage embarquée qui fonctionne à base de **promesses** et d' **évènements**. Pour permettre une gestion de requête plus efficace, le développeur a codé une API qui _wrappe_ indexedDB et qui convient aux besoins de **Bookish** . Cette API est accessible et _open source_. Si vous en avez besoin, écrivez au développeur et vous obtiendrez le code source (le dépôt Github est privé, impossible de partager le lien du fichier.)
    

Nous signalons également que nous avons besoin d'un volontaire qui voudrait travailler sur les algorithmes de synchronisation de BDD (avec un modèle de Base de Données NoSql). Si cela vous intéresse, merci d'écrire au développeur au numéro [0977210519 (Whatsapp et Telegram)](tel:0977210519) en envoyant **votre a adresse e-mail** et/ou **le lien vers votre Github.**

Dépendances
-----------

*   **react-router-dom** : pour la navigation
    
*   **html-entities**, **react-safely-set-inner-html**, **dompurify** : pour le parsing des chaînes de caractère HTML stockées dans la BDD
    
*   **notistack** : pour les toast messages
    
*   **react-froala-wysiwyg** : pour l'édition des resumés des livres.
    
*   **lucide-react** : pour les icônes, bien que certaines aient été prises dans le pack **phosphor-icons** et leurs svgs copiés comme des compoosants.