/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.saveAll = onRequest(async (request, response) => {
  try {
    admin.initializeApp();
    await admin.firestore().collection('orders').add(request.body);
    return response.send("All good");
  } catch (error) {
    await admin.firestore().collection('errors').add(error);
    return response.send(JSON.stringify(error));
  }
});