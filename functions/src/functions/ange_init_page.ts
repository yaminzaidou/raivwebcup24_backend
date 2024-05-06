import * as functions from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import * as cors from "cors";

const corsHandler = cors({
    origin: ["http://127.0.0.1:5500", "https://raivvahibe.mayotte.webcup.hodi.host"]
});

export const apiTestFunction =
    functions.onRequest(async (req, res) => {
        corsHandler(req, res, async () => {
            try {
                res.status(200).send({
                    version: "TEST OK",
                });
            } catch (error) {
                logger.error("[apiTestFunction] : " + error);
                res.status(400).end();
            }
        });
    });
