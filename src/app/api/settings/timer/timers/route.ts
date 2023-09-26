import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const PUT = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    const { sessionTime, breakTime } = await req.json();

    if (!sessionTime || !breakTime)
      throw new CustomError('Missing fields.', 400);

    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email: req.email },
      { sessionTime, breakTime },
      { new: true }
    );

    if (!user) throw new CustomError('User not found.', 404);

    return NextResponse.json({});
  })
);
