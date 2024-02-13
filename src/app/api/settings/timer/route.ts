import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const GET = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		await dbConnect();

		const user = await User.findOne({ _id: req.token.sub }).select({
			sessionTime: 1,
			breakTime: 1,
			autoStart: 1,
		});

		if (!user) throw new CustomError('User not found.', 404);

		return NextResponse.json({
			sessionTime: user?.sessionTime || 25 * 60,
			breakTime: user?.breakTime || 5 * 60,
			autoStart: user?.autoStart || false,
		});
	}),
);
