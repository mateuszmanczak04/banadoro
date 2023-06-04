import { getToken } from 'next-auth/jwt';
import dbConnect from '@/lib/dbConnect';
import Day from '@/models/Day';
import { getDateSlug } from '@/lib/getDateSlug';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();

    const days = await Day.find({ user: token.email })
      .select('totalTime date')
      .sort({ date: 1 });
    const today = days.find((d) => d.date === getDateSlug(new Date()));
    const totalTime = (
      await User.findOne({ email: token.email }).select('totalTime')
    ).totalTime;

    return NextResponse.json({
      days,
      todayTime: today ? today.totalTime : 0,
      totalTime,
    });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
