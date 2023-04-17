import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials;

        await dbConnect();

        const user = await User.findOne({ email }).select('email password');

        // check if user exists
        if (!user) {
          throw new Error('Invalid Credentials.');
        }

        // check if passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error('Invalid credentials.');
        }

        return {
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          totalTime: 0,
        });
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
