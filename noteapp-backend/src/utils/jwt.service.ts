// src/common/jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: jwt.Secret =
    process.env.JWT_SECRET || 'supersecretkey';
  private readonly expiresIn: string = process.env.JWT_EXPIRES_IN || '1h';

  sign(payload: object, expiresIn: string = this.expiresIn): string {
    return jwt.sign(payload, this.secret, { expiresIn } as jwt.SignOptions);
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }

  decode<T = any>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}
