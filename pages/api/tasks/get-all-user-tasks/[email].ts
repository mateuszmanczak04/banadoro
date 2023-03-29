import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import Task from '../../../../models/Task';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    await dbConnect();

    const tasks = await Task.find({ authorEmail: token.email });

    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
