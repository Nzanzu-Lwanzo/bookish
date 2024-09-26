## DATABASE SYNCHRONIZATION

Quand l'utilisateur clique sur le boutton synchroniser, ils envoie ses données non synchronisés au serveur et télécharge les dernières données qui sont sur le serveur. On récupère l'id de la dernière collection qu'il a en BDD locale et on envoie une requête qui récupère tous les livres dont l'id est supérieure à cet id.

Ce qui fait que du coup, chaque fois l'utilisateur update quelque chose, on mettra son synced à false pour que cette donnée soit renvoyée au serveur chaque fois. 

Sur le serveur, comment faire pour modifier une donnée qui y est déjà mais qui a été modifiée en local ? Genre, l'utilisateur a déjà synchronisé, le livre est dans le firestore mais il effectue des modifications en local et il faut que du coup le livre qui est sur le serveur soit remplacé par la nouvelle version à jour qu'on a dans la BDD locale ? 

Existe-t-il une méthode qui fonctionne comme put() sur firestore ?