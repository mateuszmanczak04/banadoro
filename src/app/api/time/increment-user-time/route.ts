import authMiddleware from '@/lib/authMiddleware';
import dbConnect from '@/lib/dbConnect';
import { getDateSlug } from '@/lib/getDateSlug';
import Day from '@/models/Day';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

export const POST = authMiddleware(async (req: CustomNextRequest) => {
  try {
    await dbConnect();

    const { email } = req;

    const user = await User.findOne({ email }).select('totalTime');

    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist.' },
        { status: 404 }
      );
    }

    // update user total time
    if (user.totalTime) {
      await User.findOneAndUpdate(
        { email },
        { $set: { totalTime: user.totalTime + 1 } }
      );
    } else {
      await User.findOneAndUpdate(
        {
          email,
        },
        { totalTime: 1 }
      );
    }

    // update specific day time
    const dateSlug = getDateSlug(new Date());

    const day = await Day.findOne({ user: email, date: dateSlug }).select(
      'totalTime'
    );

    if (day) {
      await Day.updateOne(
        { user: email, date: dateSlug },
        { $set: { totalTime: day.totalTime + 1 } }
      );
    } else {
      await Day.create({ user: email, totalTime: 1, date: dateSlug });
    }

    const todayTime = (await Day.findOne({ user: email, date: dateSlug }))
      .totalTime;

    return NextResponse.json({
      totalTime: user.totalTime + 1,
      todayTime,
    });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
});
