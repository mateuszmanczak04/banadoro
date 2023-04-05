import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    await dbConnect();

    const topUsers = await User.find()
      .select({ email: true, totalTime: true, username: true })
      .sort({ totalTime: -1 })
      .limit(10);

    return res.status(200).json({ users: topUsers });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
