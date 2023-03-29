import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  const { title, _id } = req.body;

  if (!title || title.trim().length === 0 || !_id) {
    return res.status(400).json({ message: 'Invalid data.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    await dbConnect();

    const task = await Task.create({ title, _id, authorEmail: token.email });

    return res.status(200).json({ task });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
