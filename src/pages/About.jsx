import { Link, useNavigate } from "react-router-dom";
import { lsWrite } from "../utils/localStorage-io";
import { useState } from "react";
import Loader from "../components/CrossApp/Loader";

const About = () => {
  const navigateTo = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <main className="about-page">
        <div className="about-text">
          <h1>About</h1>
          <p>
            Veuillez, s'il vous plaît, lire ceci avant d'utiliser{" "}
            <strong>Bookish</strong>.
          </p>
          <div>
            <h2>Qu'est-ce que Bookish ?</h2>
            <p>
              <strong>Bookish</strong> est une application web développée par
              <a href="https://github.com/Nzanzu-Lwanzo">
                {" "}
                NZANZU MUHAYRWA Lwanzo
              </a>
              , programmeur et écrivain congolais, et qui vous permet de pouvoir
              sauvegarder le fruit de vos lectures. <strong>Bookish</strong> est
              une application très légère en ce sens qu'
              <strong>
                elle ne nécessite pas l'accès à une connexion internet pour
                fonctionner
              </strong>
              . La connexion n'est requise que pour se rendre sur le site et
              charger la page. Une fois que vous vous êtes rendu sur le site,
              vous pourrez effectuer différentes opérations (créer une
              collection, ajouter des livres, en supprimer, ...){" "}
              <strong>sans que vos données mobiles soient consommées</strong>.
              En fait, vous pourrez même éteindre votre connexion.
            </p>
          </div>

          <div>
            <h2>Comment Bookish fonctionne-t-il ?</h2>
            <p>
              <strong>Bookish</strong> fonctionne de manère très simple. Une
              fois que vous vous connectez au site pour la première fois, une{" "}
              <strong>Base de Données</strong> sera créée sur votre téléphone ou
              votre ordinateur. Ausi, nous vous demandons d'autoriser la
              création de cette BDD quand le navigateur vous le demandera.{" "}
              <br />
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
                  ordinateur. Ainsi, les livres et les collections que vous
                  créez sur votre téléphone ne seront pas accessibles depuis
                  votre ordinateur, votre tablette ou depuis un autre téléphone.
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
                synchroniser vos BDD à travers vos différents appareils (en
                utilisant <strong>Bluetooth</strong>, par exemple)
              </strong>
              ,{" "}
              <strong>
                avoir la possibilité de sauvegarder vos données sur un serveur
                ou dans votre Google Drive
              </strong>
              , ... et bien d'autres fonctionnalités.
            </p>
          </div>
          <div>
            <h2>Les besoins de Bookish</h2>
            <p>
              Comme vous avez pu le remarquer, <strong>Bookish</strong> ne
              possède pas d'adresse propre. Nous utilisons un sous-domaine
              <strong>Render</strong>. Nous aurons besoin d'acheter notre propre
              domaine (par exemple, <strong>www.bookish.edu</strong>). <br />
              En plus de cela, pour permettre le partage de collections et des
              livres entre utilisateurs, nous aurions probablement besoin de
              payer un hébergement sur un serveur. Ce qui coûte, évidemment, de
              l'argent. <br />
              <br />
              Si vous voulez faire un don pour permettre à{" "}
              <strong>Bookish</strong> de continuer à fonctionner et de
              s'améliorer, merci de contacter le développeur à{" "}
              <a href="mailto:nzanzu.lwanzo.work@gmail.com">
                cette adresse email.
              </a>
              <br />
              <br />
              Si vous êtes <strong>développeur</strong> et voulez collaborer à
              l'amélioration de <strong>Bookish</strong>, écrivez-moi à la même
              adresse e-mail ou accédez à mon profil Github{" "}
              <a href="https://github.com/Nzanzu-Lwanzo">
                en cliquant sur ce lien
              </a>
              .
            </p>
          </div>

          <div>
            <h2>Lisez ceci si vous êtes programmeur.</h2>
            <p>
              <strong>Bookish</strong> est construit avec{" "}
              <strong>ReactJs</strong> et <strong>indexedDB</strong>.
              L'application n'est constiutué que de 3 composants pages et n'a
              pour seule dépendance que <strong>react-router-dom</strong>.
            </p>
          </div>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              setIsRedirecting(true);

              lsWrite(["bookish-has-read-about-page", Date.now()]);
              
              setTimeout(() => {
                setIsRedirecting(false);
                return navigateTo("/");
              }, 1000);
            }}
            className="no-state-button"
          >
            {isRedirecting ? (
              <Loader />
            ) : (
              "J'ai lu et veux utiliser l'application."
            )}
          </Link>
        </div>
      </main>
    </>
  );
};

export default About;
