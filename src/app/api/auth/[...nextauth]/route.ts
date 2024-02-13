import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { getServerSession } from 'next-auth/next';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			type: 'credentials',
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				if (!email || !password) throw new Error('Missing field.');

				await dbConnect();

				const user = await User.findOne({ email }).select({
					password: 1,
					username: 1,
				});

				// check if user exists
				if (!user) throw new Error('Invalid Credentials.');

				// check if passwords match
				const passwordsMatch = await bcrypt.compare(password, user.password);
				if (!passwordsMatch) throw new Error('Invalid credentials.');

				const result = {
					name: user.username,
					email,
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
	// secret: process.env.NEXTAUTH_SECRET, // no need for this
	session: {
		strategy: 'jwt',
		maxAge: 7 * 24 * 60 * 60, // 1 week
		updateAge: 24 * 60 * 60, // 1 day
	},
	callbacks: {
		// "user" is the response from "authorize" function in CredentialsProvider
		// or Google user
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
		async session({ session }) {
			if (session?.user) delete session.user.image;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const getAuthSession = () => getServerSession(authOptions);
