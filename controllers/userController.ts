import { Request, Response } from "express"
import { db } from "../config/firebaseServices"
import { User } from "../interfaces/user"

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { id, ...data }: User = req.body
    await db.collection("USERS").doc(id).set(data, { merge: true })
    res.status(200).json({ message: "User data updated successfully" })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ error: errorMessage })
  }
}

// export const fetchUserData = async (req: Request, res: Response) => {
//   try {
//     const userId = req.query.id as string
//     const doc = await db.collection("USERS").doc(userId).get()

//     if (!doc.exists) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     res.status(200).json(doc.data())
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error occurred"
//     res.status(500).json({ error: errorMessage })
//   }
// }

export const fetchUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.query.id as string

    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    const doc = await db.collection("USERS").doc(userId).get()

    if (!doc.exists) {
      res.status(404).json({ error: "User not found" })
      return
    }

    res.status(200).json(doc.data())
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"
    res.status(500).json({ error: errorMessage })
  }
}
