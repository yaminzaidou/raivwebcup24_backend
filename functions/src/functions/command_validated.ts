
import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as cors from "cors";

const corsHandler = cors({
  origin: ["http://127.0.0.1:5500", "https://raivvahibe.mayotte.webcup.hodi.host"]
});
const guardianAngels = [
  {
    "id": "ange-de-la-sante",
    "img": "../../images/Ange-de-la-Sante.png",
    "name": "Ange de la Santé",
    "domain": "santé",
    "texte": "Nous vous conseillons l'Ange de la Santé qui vous protégera et améliorera votre bien-être physique et mental."
  },
  {
    "id": "ange-de-la-finance",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-de-l-education",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-des-relations",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-du-travail",
    "name": "Ange du Travail",
    "img": "../../images/Ange-du-travail.png",
    "domain": "travail",
    "texte": "Nous vous conseillons l'Ange du Travail qui contribuera à votre succès et à votre satisfaction professionnelle."
  },
  {
    "id": "ange-de-la-creativite",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-de-la-technologie",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-de-la-spiritualite",
    "img": "../../images/Ange-de-la-Spiritualite.png",
    "name": "Ange de la Spiritualité",
    "domain": "spiritualité",
    "texte": "Nous vous conseillons l'Ange de la Spiritualité qui assistera votre développement spirituel et votre méditation."
  },
  {
    "id": "ange-de-la-vie-quotidienne",
    "img": "../../images/Ange-de-la-Vie-Quotidienne.jpg",
    "name": "Ange de la Vie Quotidienne",
    "domain": "quotidien",
    "texte": "Nous vous conseillons l'Ange de la Vie Quotidienne qui vous aidera à surmonter les défis du quotidien."
  },
  {
    "id": "ange-du-voyage",
    "img": "../../images/voyage-removebg-preview.png",
    "name": "Ange du Voyage",
    "domain": "voyage",
    "texte": "Nous vous conseillons l'Ange du Voyage qui vous protégera et enrichira vos expériences de voyage."
  }
];

export const commandValidated =
  functions.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      try {
        const nom: string = req.body.nom;
        const prenom: string = req.body.prenom;
        const email: string = req.body.email;
        const angeId: string = req.body.angeId;
        logger.log("nom : " + nom);
        logger.log("email : " + email);
        if (!nom || !email || !prenom || !angeId) {
          logger.log("error 1");
          res.status(400).end();
        }
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(email)) {
          logger.log("error 2");
          res.status(400).end();
          return;
        }

        logger.log("----------------------------");
        logger.log("-     commandValidated     -");
        logger.log("----------------------------");
        logger.log("nom : " + nom);
        logger.log("email : " + email);
        logger.log("angeId : " + angeId);

        const db = admin.firestore();

        const collectionRef = db.collection("mail");

        const angel = guardianAngels.find(guardianAngels => guardianAngels.id === angeId);
        logger.log("angel : " + angel?.name);
        await collectionRef.add({
          createdDate: new Date(),
          from: "24WEBCUP RAIV <noreply@raivvahibe.ovh>",
          to: email,
          template: {
            name: "commande",
            data: {
              angeGardienChoose: angel?.name,
            },
          },
        });

        logger.log("return ok : " + email);
        res.status(200).send("MF000");
      } catch (err) {
        logger.error("[askSupport] error", err);
        res.status(200).json({
          status: "OK",
        });
      }
    });
  });
