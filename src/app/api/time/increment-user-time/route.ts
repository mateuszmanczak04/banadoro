import dbConnect from '@/lib/dbConnect';
import { getDateSlug } from '@/lib/getDateSlug';
import Day from '@/models/Day';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: token.email }).select('totalTime');

    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist.' },
        { status: 404 }
      );
    }

    // update user total time
    if (user.totalTime) {
      await User.findOneAndUpdate(
        { email: token.email },
        { $set: { totalTime: user.totalTime + 1 } }
      );
    } else {
      await User.findOneAndUpdate(
        {
          email: token.email,
        },
        { totalTime: 1 }
      );
    }

    // update specific day time
    const dateSlug = getDateSlug(new Date());

    const day = await Day.findOne({ user: token.email, date: dateSlug }).select(
      'totalTime'
    );

    if (day) {
      await Day.updateOne(
        { user: token.email, date: dateSlug },
        { $set: { totalTime: day.totalTime + 1 } }
      );
    } else {
      await Day.create({ user: token.email, totalTime: 1, date: dateSlug });
    }

    const todayTime = (await Day.findOne({ user: token.email, date: dateSlug }))
      .totalTime;

    return NextResponse.json({
      totalTime: user.totalTime + 1,
      todayTime,
    });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
