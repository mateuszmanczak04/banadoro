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

    // Create an artificial delay with a Promise for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const user = await User.findOne({ email: req.email }).select({
      passwordHint: 1,
    });

    if (!user) throw new CustomError('User not found.', 404);

    return NextResponse.json({
      passwordHint: user?.passwordHint || '',
    });
  })
);
