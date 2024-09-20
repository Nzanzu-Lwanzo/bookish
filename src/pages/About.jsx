import React from 'react'

const About = () => {
  return (
    <>
      <main className="about-page">
        <div className="about-text">
          <h1>About</h1>
          <div>
            <h2>Qu'est-ce que Bookish ?</h2>
            <p>
              <strong>Bookish</strong> est une application web développée par
              <a href="https://github.com/Nzanzu-Lwanzo">
                {" "}
                NZANZU MUHAYRWA Lwanzo
              </a>
              , programmeur et écrivain congolais, et qui permet aux
              utilisateurs de pouvoir sauvegarder le fruit de leurs lectures.{" "}
              <strong>Bookish</strong> est une application très légère en ce
              sens qu'
              <strong>
                elle ne nécessite pas l'accès à la connexion internet pour
                fonctionner
              </strong>
              . Une fois que l'utilisateur s'est rendu sur le site, il pourra
              effectuer différentes opérations (créer une collection, ajouter
              des livres, en supprimer, ...) sans que ses données mobiles soient
              consommées.
            </p>
          </div>

          <div>
            <h2>Comment bookish fonctionne-t-il ?</h2>
            <p>
              <strong>Bookish</strong> fonctionne de manère très simple. Une
              fois que vous vous connectez au site pour la première fois, une
              Base de Données sera créée sur votre téléphone ou votre
              ordinateur. Ausi, nous vous demandons d'autoriser la création de
              cette BDD quand le navigateur vous le demandera. <br />
              C'est dans cette BDD que vous stockerez vos données, vous
              permettant donc de fonctionner sans avoir besoin de contacter un
              serveur ou une BDD éloignée (ce qui, évidemment, vous permet de
              sauver vos mégas).
            </p>
          </div>
          <div>
            <h2>Les désavantages de Bookish</h2>
            <p>
              <strong>Bookish</strong> présente les désavantages suivants :
            </p>
            <ul>
              <li>
                <p>
                  Puisque la BDD est installée sur un appareil, vous n'aurez pas
                  la possibilité d'y accéder à partir d'un autre. En des termes
                  simples, la Base de Données que vous avez sur votre téléphone
                  n'est pas la même que celle que vous avez sur votre
                  ordinateur.
                </p>
              </li>
              <li>
                <p>
                  Puisque la BDD est installée sur un appareil, vous n'aurez pas
                  la possibilité de partager ces lectures et personne d'autre ne
                  pourra y avoir accès à part vous.
                </p>
              </li>
              <li>
                <p>
                  Il peut arriver, pour différentes raisons, que la BDD se
                  supprimme d'elle-même et que vous perdiez vos données.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2>Les perspectives de Bookish</h2>
            <p>
              Nous tenons à signaler que celle-ci est a version bêta de{" "}
              <strong>Bookish</strong>. J'y travaille toujours. Dans l'avenir,
              vous pourrez{" "}
              <strong>
                synchroniser vos BDD à travers vos différents appareils
              </strong>
              ,{" "}
              <strong>
                avoir la possibilité de sauvegarder vos données sur un serveur
                ou dans votre Google Drive
              </strong>
              ,vous permettant aussi de le partager.
            </p>
          </div>
          <div>
            <h2>Les besoins de Bookish</h2>
            <p>
              Comme vous avez pu le remarquer, <strong>Bookish</strong> ne
              possède pas d'adresse propre. Nous utilisons un sous-domaine
              render. Nous aurons besoin d'acheter notre propre domaine (par
              exemple, <strong>www.bookish.edu</strong>). <br />
              En plus de cela, pour permettre la synchronisation, nous aurons
              besoin de payer un hébergement sur un serveur. Ce qui coûte,
              évidemment, de l'argent. <br />
              <br />
              Si vous voulez faire un don pour permettre à{" "}
              <strong>Bookish</strong> de continuer de fonctionner et de
              s'améliorer, merci de contacter le développeur à{" "}
              <a href="mailto:nzanzu.lwanzo.work@gmail.com">
                cette adresse email.
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default About