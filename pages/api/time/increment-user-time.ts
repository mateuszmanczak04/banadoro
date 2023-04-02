import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import Day from '../../../models/Day';
import { getDateSlug } from '../../../lib/getDateSlug';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    await dbConnect();

    const user = await User.findOne({ email: token.email }).select('totalTime');

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

    return res.status(200).json({
      message: 'Successfully incremented user time by a minute.',
      totalTime: user.totalTime + 1,
      todayTime,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
