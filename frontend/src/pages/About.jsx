import { Link, useNavigate } from "react-router-dom";
import { lsWrite } from "../utils/localStorage-io";
import { useState } from "react";
import Loader from "../components/CrossApp/Loader";
import { Info } from "lucide-react";

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
            <strong>Bookish</strong>. Sinon, scrollez jusqu'au bas de la page et
            cliquez sur le bouton. Vous pourrez toujours revenir en cliquant sur
            le bouton{" "}
            <span>
              <Info size={18}></Info>
            </span>{" "}
            dans l'en-tête.
          </p>
          <div>
            <h2>Qu'est-ce que Bookish ?</h2>
            <p>
              <strong>Bookish</strong> est une application web développée par
              <a href="https://github.com/Nzanzu-Lwanzo">
                {" "}
                NZANZU MUHAYRWA L.V
              </a>
              , programmeur et écrivain, et qui vous permet de sauvegarder le
              fruit de vos lectures dans une base de données.{" "}
              <strong>Bookish</strong> est une application très légère en ce
              sens qu'
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
              <strong>Bookish</strong> fonctionne de manière très simple. Une
              fois que vous vous connectez au site pour la première fois, une{" "}
              <strong>Base de Données</strong> sera créée sur votre téléphone ou
              votre ordinateur. Aussi, nous vous demandons d'autoriser la
              création de cette BDD quand le navigateur vous le demandera.{" "}
              <br />
              C'est dans cette BDD que vous stockerez vos collections et vos
              livres, vous permettant donc de fonctionner sans avoir besoin de
              contacter un serveur ou une BDD éloignée (ce qui, évidemment, vous
              permet de sauver vos mégas).
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
                  Inutile de partager le lien d'une page de livre. Puisque les
                  données ne sont pas stockées sur un serveur, les personnes à
                  qui vous partagez le lien n'obtiendront toujours qu'une erreur
                  404 (Not Found = Ressource non retrouvée).
                </p>
              </li>
              <li>
                <p>
                  Il peut arriver, pour différentes raisons, que la BDD se
                  supprime d'elle-même et que vous perdiez vos données. Nous
                  sommes en train d'implémenter des techniques de sauvegarde
                  (backup sur BDD cloud, téléchargement en PDF, ... ). En
                  attendant que la solution soit trouvée, utilisez l'application
                  mais soyez prudents.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2>Les perspectives de Bookish</h2>
            <p>
              Nous tenons à signaler que celle-ci est a version bêta de{" "}
              <strong>Bookish</strong>. Nous y travaillons toujours. Dans
              l'avenir, vous pourrez{" "}
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
              possède pas d'adresse propre. Nous utilisons un sous-domaine{" "}
              <strong>Render</strong>. Nous aurons besoin d'acheter notre propre
              domaine (par exemple, <strong>www.bookish.edu</strong>). <br />
              En plus de cela, pour permettre le partage de collections et des
              livres entre utilisateurs, nous aurions probablement besoin de
              payer un hébergement sur un serveur. Ce qui coûte, évidemment, de
              l'argent. <br />
              <br />
              Si vous voulez faire un don pour permettre à{" "}
              <strong>Bookish</strong> de continuer à fonctionner et au
              développeur de l'améliorer, merci de le contacter à{" "}
              <a href="mailto:nzanzu.lwanzo.work@gmail.com">
                cette adresse e-mail.
              </a>
              <br />
              <br />
              Si vous êtes <strong>développeur</strong> et voulez collaborer à
              l'amélioration de <strong>Bookish</strong>, écrivez à la même
              adresse e-mail ou accédez au profil Github du développeur{" "}
              <a href="https://github.com/Nzanzu-Lwanzo">
                en cliquant sur ce lien
              </a>
              .
            </p>
          </div>

          <div>
            <h2>Lisez ceci si vous êtes programmeur.</h2>
            <p>
              Voici l'architecture de <strong>Bookish</strong>
            </p>
            <ul>
              <li>
                <p>
                  {" "}
                  <strong>Interface</strong> : l'interface de Bookish est faite
                  avec <strong>React</strong>.
                </p>
              </li>
              <li>
                <p>
                  {" "}
                  <strong>Base de Données</strong> : l'application utilise{" "}
                  <strong>indexedDB</strong>, une solution de stockage embarquée
                  qui fonctionne à base de <strong>promesses</strong> et d'
                  <strong>évènements</strong>. Pour permettre une gestion de
                  requête plus efficace, le développeur a codé une API qui{" "}
                  <i>wrappe</i> indexedDB et qui convient aux besoins de{" "}
                  <strong>Bookish</strong> . Cette API est accessible et{" "}
                  <i>open source</i>. Si vous en avez besoin, écrivez au
                  développeur et vous obtiendrez le code source (le dépôt Github
                  est privé, impossible de partager le lien du fichier.)
                </p>
              </li>
            </ul>

            <p>
              Nous signalons également que nous avons besoin d'un volontaire qui
              voudrait travailler sur les algorithmes de synchronisation de BDD
              (avec un modèle de Base de Données NoSql). Si cela vous intéresse,
              merci d'écrire au développeur au numéro{" "}
              <a href="tel:0977210519">0977210519 (Whatsapp et Telegram)</a> en
              envoyant <strong>votre a adresse e-mail</strong> et/ou{" "}
              <strong>le lien vers votre Github.</strong>
            </p>
          </div>

          <div>
            <h2>Dépendances</h2>
            <ul>
              <li>
                <p>
                  <strong>react-router-dom</strong> : pour la navigation
                </p>
              </li>
              <li>
                <p>
                  <strong>html-entities</strong>,{" "}
                  <strong>react-safely-set-inner-html</strong>,{" "}
                  <strong>dompurify</strong> : pour le parsing des chaînes de
                  caractère HTML stockées dans la BDD
                </p>
              </li>
              <li>
                <p>
                  <strong>notistack</strong> : pour les toast messages
                </p>
              </li>
              <li>
                <p>
                  <strong>react-froala-wysiwyg</strong> : pour l'édition des
                  resumés des livres.
                </p>
              </li>
              <li>
                <p>
                  <strong>lucide-react</strong> : pour les icônes, bien que
                  certaines aient été prises dans le pack{" "}
                  <strong>phosphor-icons</strong> et leurs svgs copiés comme des
                  compoosants.
                </p>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              setIsRedirecting(true);

              lsWrite(["bookish-main-page-scroll-coordinates"], { x: 0, y: 0 });

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
