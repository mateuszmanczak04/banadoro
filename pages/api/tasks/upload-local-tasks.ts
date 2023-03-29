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

  const { tasks } = req.body;

  if (!tasks) {
    return res.status(400).json({ message: 'Invalid data.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    await dbConnect();
    let tasksWithEmails = tasks.map((task: {}) => ({
      ...task,
      authorEmail: token.email,
    }));

    await Task.insertMany(tasksWithEmails);

    return res
      .status(200)
      .json({ message: 'Successfully uploaded local tasks.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
