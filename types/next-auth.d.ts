import NextAuth from 'next-auth/next';
import { User as NextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      email: string | undefined;
    };
  }

  interface User extends NextAuthUser {
    id?: string;
    _id: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
  }
}
