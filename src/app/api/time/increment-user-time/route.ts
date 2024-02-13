import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import { getDateSlug } from '@/lib/getDateSlug';
import Day from '@/models/Day';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const POST = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		await dbConnect();

		const user = await User.findOne({ _id: req.token.sub }).select({
			totalTime: 1,
		});

		if (!user) throw new CustomError('User not found.', 404);

		// update user's total time
		if (user.totalTime) {
			await User.findOneAndUpdate(
				{ _id: req.token.sub },
				{ $set: { totalTime: user.totalTime + 1 } },
			);
		} else {
			await User.findOneAndUpdate(
				{
					_id: req.token.sub,
				},
				{ totalTime: 1 },
			);
		}

		// update specific day time
		const dateSlug = getDateSlug(new Date());

		const today = await Day.findOne({ userId: req.token.sub, date: dateSlug });

		if (today) {
			await Day.updateOne(
				{ userId: req.token.sub, date: dateSlug },
				{ $set: { totalTime: today.totalTime + 1 } },
			);
		} else {
			await Day.create({ userId: req.token.sub, totalTime: 1, date: dateSlug });
		}

		return NextResponse.json({
			totalTime: user.totalTime + 1,
			todayDateSlug: dateSlug,
			today: {
				_id: today?._id,
				totalTime: today?.totalTime + 1,
				date: today?.date,
			},
		});
	}),
);
