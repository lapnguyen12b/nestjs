import { NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Logger global - Middleware: ${req.method} - ${req.url}`)
  next()
}