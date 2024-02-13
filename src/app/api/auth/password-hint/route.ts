import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		const { hint = '' } = await req.json();

		await dbConnect();

		await User.findOneAndUpdate({ _id: req.token.sub }, { passwordHint: hint });

		return NextResponse.json({ message: 'Password hint updated.' });
	}),
);

export const GET = errorMiddleware(async (req: NextRequest) => {
	const url = new URL(req.nextUrl.toString());
	const email = url.searchParams.get('email');

	await dbConnect();

	const user = await User.findOne({ email }).select({ passwordHint: 1 });

	return NextResponse.json({ hint: user?.passwordHint || '' });
});
