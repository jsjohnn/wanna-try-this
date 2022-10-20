declare global {
  namespace Express {
    export interface Request {
      email?: string;
      provider?: string;
    }
  }
}
