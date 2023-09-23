import authMiddleware from '@/lib/authMiddleware';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import { getDateSlug } from '@/lib/getDateSlug';
import Day from '@/models/Day';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const GET = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    await dbConnect();

    const days = await Day.find({ user: req.email })
      .select('totalTime date')
      .sort({ date: 1 });
    const today = days.find((d) => d.date === getDateSlug(new Date()));
    const totalTime = (
      await User.findOne({ email: req.email }).select({ totalTime: 1 })
    ).totalTime;

    return NextResponse.json({
      days,
      todayTime: today ? today.totalTime : 0,
      totalTime,
    });
  })
);
