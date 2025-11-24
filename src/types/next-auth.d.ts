import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { AuthUser } from '@/data/models/user';

declare module 'next-auth' {
  interface User extends AuthUser {
    accessToken?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends AuthUser {
    accessToken?: string;
  }
}
