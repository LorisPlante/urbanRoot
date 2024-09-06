"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Connexion() {
  return (
    <>
      <Header></Header>
      <main className="flex flex-col justify-start items-start pt-24">
        <section id="cgu" className="p-mobile sm:p-desktop w-full">
          <div className="w-full sm:w-3/4 flex flex-col justify-start items-start gap-5">
            <h2 className="text-darkGreen font-bold text-4xl">{`Conditions Générales d'Utilisation (CGU)`}</h2>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`1. Introduction`}</h2>
            <p>{`Bienvenue sur UrbanRoots (le "Site"). Le Site propose une carte interactive répertoriant les jardins urbains collaboratifs de France et outre-mer, des guides de jardinnage et un forum collaboratif.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`2. Utilisation du Site`}</h2>
            <p>{`Vous vous engagez à utiliser ce site uniquement à des fins légales et d'une manière qui n'enfreint pas les droits de tiers ni ne restreint ou n'empêche leur utilisation et
        leur jouissance du site.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`3. Propriété Intellectuelle`}</h2>
            <p>{`Tout le contenu présent sur ce site, y compris les textes, images, logos et autres éléments, est protégé par des droits d'auteur et d'autres droits de propriété
        intellectuelle. Vous ne pouvez pas utiliser, reproduire, distribuer ou exploiter ce contenu sans notre autorisation écrite préalable.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`4. Données Personnelles et Confidentialité`}</h2>
            <p>
              {`Nous prenons la confidentialité de vos données personnelles très au sérieux et nous nous engageons à protéger vos informations conformément au `}
              <a href="#rgpd" className="inline underline text-darkGreen">
                Règlement Général sur la Protection des Données (RGPD)
              </a>
            </p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`5. Liens vers des Sites Tiers`}</h2>
            <p>{`Notre site peut contenir des liens vers d'autres sites web qui ne sont pas sous notre contrôle. Nous ne sommes pas responsables des pratiques de confidentialité ou du
        contenu de ces sites tiers.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`6. Limitation de Responsabilité`}</h2>
            <p>{`Nous nous efforçons de garantir l'exactitude des informations sur notre site, mais nous ne pouvons garantir qu'elles soient complètes, exactes ou à jour. Nous ne sommes pas
        responsables des erreurs ou omissions dans le contenu du site.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`7. Loi Applicable`}</h2>
            <p>{`Ces CGU sont régies par la loi française. Tout litige découlant de l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux français.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`8. Contact`}</h2>
            <p>
              {`Pour toute question relative à ces CGU ou à notre politique de confidentialité, veuillez nous contacter à l'adresse suivante :`}{" "}
              <a href="mailto:contact@urbanroots.fr" className="underline text-darkGreen fon-bold">
                contact@urbanroots.fr
              </a>
            </p>
          </div>
        </section>
        <section id="mentionsLegales" className="p-mobile sm:p-desktop w-full text-text-reverse">
          <div className="w-full sm:w-3/4 flex flex-col justify-start items-start gap-5">
            <h2 className="text-darkGreen font-bold text-4xl">{`Mentions légales`}</h2>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`1. Identification du site`}</h2>
            <ul className="flex flex-col gap-2">
              <li>Nom du site : UrbanRoots</li>
              <li>URL du site : https://www.urbanroots.vercel.app</li>
              <li>Responsable de la publication : Loris Planté</li>
              <li>Adresse : 8 bis Rue de la Fontaine au Roi, 75011 Paris</li>
              <li>Email : contact@urbanroots.fr</li>
              <li></li>
            </ul>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`2. Hébergeur`}</h2>
            <ul className="flex flex-col gap-2">
              <li>Nom : Vercel Inc.</li>
              <li>Adresse : Avenue Huart Hamoir 71 1030 Brussels Belgium</li>
            </ul>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`3. Directeur de publication`}</h2>
            <p>{`Loris Planté`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`4. Conception et réalisation`}</h2>
            <ul className="flex flex-col gap-2">
              <li>Développeur : Loris Planté</li>
            </ul>
          </div>
        </section>
        <section id="rgpd" className="p-mobile sm:p-desktop w-full text-text-reverse">
          <div className="w-full sm:w-3/4 flex flex-col justify-start items-start gap-5">
            <h2 className="text-darkGreen font-bold text-4xl">{`Politique de protection des données (RGPD)`}</h2>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`1. Préambule`}</h2>
            <p>{`Nous nous engageons à protéger vos données personnelles.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`2. Collecte des données`}</h2>
            <p>{`Nous collectons les données suivantes : pseudo, adresse email et mot de passe crypté en base de donnée.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`3.Utilisation des données`}</h2>
            <p>{`Créaation de compte pour pouvoir commenter des posts sur le forum.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`4. Partage des données`}</h2>
            <p>{`Nous ne partageons pas vos données.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`5. Droits des utilisateurs`}</h2>
            <p>
              {`Vous avez le droit d'accéder, de rectifier, de supprimer vos données, et de vous opposer à leur traitement. Contactez-nous à `}
              <a href="mailto:contact@urbanroots.fr" className="inline underline text-darkGreen fon-bold">
                contact@urbanroots.fr
              </a>
              {` pour toute demande.`}
            </p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`6. Durée de conservation des données`}</h2>
            <p>{`Vos données sont conservées pendant 3 ans après la dernière interaction, à l'exeption des informations de compte, elles sont concervées jusqu'à suppression du compte.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`7. Sécurité des données`}</h2>
            <p>{`Nous mettons en œuvre des mesures de sécurité techniques (cryptage des mots de passe en base de donnée) et organisationnelles pour protéger vos données.`}</p>

            <h2 className="font-custom-titre text-text-secondary font-bold text-3xl">{`8. Contact`}</h2>
            <p>
              {`Pour toute question concernant vos données personnelles, contactez-nous à l'adresse suivante : `}
              <a href="mailto:contact@urbanroots.fr" className="underline text-darkGreen fon-bold">
                contact@urbanroots.fr
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
