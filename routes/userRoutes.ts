import express from "express"
import { updateUserData, fetchUserData } from "../controllers/userController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.put("/update-user-data", authMiddleware, updateUserData)
router.get("/fetch-user-data", authMiddleware, fetchUserData)

export default router
