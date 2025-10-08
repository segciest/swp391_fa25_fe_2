import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  userId: string;
  userName: string;
  email: string;
  role?: string;
  exp?: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
