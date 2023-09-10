import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) throw new Error('Missing field.');

        await dbConnect();

        const user = await User.findOne({ email }).select('password');

        // check if user exists
        if (!user) throw new Error('Invalid Credentials.');

        // check if passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) throw new Error('Invalid credentials.');

        const result = {
          email,
          _id: user._id as string,
        };

        return result;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();

        const exists = await User.exists({ email: user.email });

        if (exists) {
          return true;
        }

        await User.create({
          email: user.email,
          username: user.name,
          imgUrl: user.image,
          totalTime: 0,
        });
      }
      return true;
    },
    async jwt({ token }) {
      await dbConnect();
      const user = await User.findOne({ email: token.email }).select('_id');

      delete token.name;
      delete token.picture;

      if (!user) {
        return token;
      }

      token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (!token) return session;
      session.user._id = token._id;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
