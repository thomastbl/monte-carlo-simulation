# Estimation d'aire par méthode de Monte-Carlo

Outil interactif qui estime l'aire de polygones quelconques en projetant des milliers de points aléatoires et en comptant ceux qui tombent à l'intérieur des figures.

Le projet combine trois choses : un outil de dessin sur `<canvas>`, un algorithme de détection des points dans le/les polygone(s) via la méthode des winding number, et une estimation statistique d'aire qui s'appuie sur la loi des grands nombres.

Le projet a été réalisé en JavaScript vanilla, sans dépendance ni framework.

---

### Le principe Monte-Carlo

L'idée est simple : si on jette des points uniformément au hasard sur une surface totale connue, alors la proportion de points qui atterrissent dans une zone donnée est proche du rapport des aires.

Plus on projette de points, plus l'estimation se précise. C'est la loi des grands nombres qui garantit la convergence.

### Savoir si un point est à l'intérieur : le winding number

Le cœur du projet. Pour chaque point projeté, on doit décider s'il est dans le polygone ou non. On utilise la méthode du winding number.

On imagine un rayon horizontal partant du point vers la droite, et on regarde comment il traverse chaque arête du polygone :

- une arête traversée « vers le haut » compte +1 ;
- une arête traversée « vers le bas » compte −1.
  Si la somme (le winding number) est différente de 0, le point est à l'intérieur.

Pour chaque arête reliant deux sommets `A` et `B`, on calcule l'abscisse exacte du croisement avec la ligne horizontale du rayon :

```
ratio  = (P.y − A.y) / (B.y − A.y)
xInter = A.x + ratio × (B.x − A.x)
```

`ratio` : à quelle proportion de sa hauteur l'arête est-elle coupée par le rayon.
`xInter` : comme l'arête est un segment droit, on applique cette même proportion à sa largeur pour trouver le point de croisement.
On ne compte le croisement que s'il tombe à droite du point (`P.x < xInter`), puisque le rayon part vers la droite.

### De la proportion à l'aire

Une fois la proportion de points intérieurs connue, on la multiplie par l'aire totale du plan pour obtenir l'aire estimée du polygone.

---

## Utilisation

1. Cliquer sur le canvas pour poser les sommets d'un polygone.
2. Cliquer sur le bouton Terminer la figure pour le fermer.
3. Répéter pour dessiner plusieurs figures si besoin.
4. Régler la vitesse (points/seconde) et le nombre de points par étape avec les curseurs.
5. Cliquer sur Démarrer la projection et observer l'estimation se préciser.

---

## Stack technique

- HTML5 Canvas pour le dessin et le rendu des points.
- JavaScript vanilla.
- CSS pour la mise en page.

---

_Projet d'apprentissage en autonomie réalisé dans le cadre de ma formation en développement web et ma recherche d'alternance._
