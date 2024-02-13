import authMiddleware from '@/lib/authMiddleware';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import Day from '@/models/Day';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const GET = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		await dbConnect();

		const days = await Day.find({ userId: req.token.sub })
			.select('totalTime date')
			.sort({ date: 1 });

		const totalTime = days.reduce((acc, day) => acc + day.totalTime, 0);

		return NextResponse.json({
			days,
			totalTime,
		});
	}),
);
