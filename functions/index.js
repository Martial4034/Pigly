const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = onRequest(async (request, response) => {
  try {
    if (!request.headers.authorization) {
      throw new Error("Aucun token d'authentification fourni");
    }

    const token = request.headers.authorization.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    response.send(`Hello ${decodedToken.name}`);
  } catch (error) {
    response.status(401).send("Unauthorized");
  }
});
