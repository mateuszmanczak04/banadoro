import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const PUT = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		const { password } = await req.json();

		if (!password) throw new CustomError('Missing Fields.', 400);

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.findOneAndUpdate(
			{ _id: req.token.sub },
			{ password: hashedPassword },
		);

		return NextResponse.json({ message: 'Password updated.' });
	}),
);
