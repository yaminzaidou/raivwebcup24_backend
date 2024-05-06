
import * as functions from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as cors from "cors";

const corsHandler = cors({
  origin: ["http://127.0.0.1:5500", "https://raivvahibe.mayotte.webcup.hodi.host/"]
});

export const apiTestFunctionPost =
  functions.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      try {
        const nom: string = req.body.nom;
        const numeroTel: string = req.body.numeroTel;
        const email: string = req.body.email;
        logger.log("nom : " + nom);
        logger.log("numeroTel : " + numeroTel);
        logger.log("email : " + email);
        if (!nom || !numeroTel || !email) {
          logger.log("error 1");
          res.status(400).end();
        }
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(email)) {
          logger.log("error 2");
          res.status(400).end();
          return;
        }

        logger.log("-------------------------------");
        logger.log("-     apiTestFunctionPost     -");
        logger.log("-------------------------------");
        logger.log("nom : " + nom);
        logger.log("numeroTel : " + numeroTel);
        logger.log("email : " + email);

        logger.log("return ok : " + email);
        res.status(200).send("MF000");
      } catch (err) {
        logger.error("[apiTestFunctionPost] error", err);
        res.status(200).json({
          status: "OK",
        });
      }
    });
  });
