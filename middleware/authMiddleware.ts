import { Request, Response, NextFunction } from "express"

// Custom interface for extended request object (if needed)
interface AuthenticatedRequest extends Request {
  user?: { id: string } // Example custom property
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ error: "Unauthorized" })
    return // Ensure we don't call `next()` after sending a response
  }

  if (token === "valid-token") {
    req.user = { id: "123" } // Add custom data to request object
    next() // Pass control to the next middleware or route
  } else {
    res.status(401).json({ error: "Invalid token" })
  }
}
