import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import dbConnect from '../../../lib/dbConnect';
import Day from '../../../models/Day';
import { getDateSlug } from '../../../lib/getDateSlug';
import User from '../../../models/User';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    await dbConnect();

    const days = await Day.find({ user: token.email })
      .select('totalTime date')
      .sort({ date: 1 });
    const today = days.find((d) => d.date === getDateSlug(new Date()));
    const totalTime = (
      await User.findOne({ email: token.email }).select('totalTime')
    ).totalTime;

    return res.status(200).json({
      days,
      todayTime: today ? today.totalTime : 0,
      totalTime,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
