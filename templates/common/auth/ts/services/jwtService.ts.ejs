import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '@/config/env';

export interface JwtPayload {
  id: string | number;
  email: string;
  jti?: string;
  sid?: string;
  exp?: number;
}

export class JwtService {
  private static readonly SECRET = env.JWT_SECRET || 'your-secret-key';
  private static readonly REFRESH_SECRET = env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
  private static readonly EXPIRES_IN = env.JWT_EXPIRES_IN || '15m'; // Access tokens should be short-lived
  private static readonly REFRESH_EXPIRES_IN = env.JWT_REFRESH_EXPIRES_IN || '7d';

  static generateToken(payload: Partial<JwtPayload>, expiresIn?: string): string {
    const jti = crypto.randomUUID();
    return jwt.sign({ ...payload, jti }, this.SECRET, { 
      expiresIn: expiresIn || this.EXPIRES_IN 
    } as jwt.SignOptions);
  }

  static generateRefreshToken(payload: Partial<JwtPayload>, expiresIn?: string): string {
    const jti = crypto.randomUUID();
    return jwt.sign({ ...payload, jti }, this.REFRESH_SECRET, { 
      expiresIn: expiresIn || this.REFRESH_EXPIRES_IN 
    } as jwt.SignOptions);
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.REFRESH_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  // Fallback in-memory storage if caching = 'None'
  static activeRefreshTokens = new Map<string, string[]>();
  static blacklistedTokens = new Map<string, number>();
}
