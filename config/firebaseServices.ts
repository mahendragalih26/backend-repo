import admin from "firebase-admin"
import * as dotenv from "dotenv"

dotenv.config()

const serviceAccount = require("./firebaseserviceAccount.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const db = admin.firestore()
