import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import Task from '../../../../models/Task';
import dbConnect from '../../../../lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(200).json({ message: 'Invalid token.' });
    }

    const { _id } = req.query;

    await dbConnect();

    const taskToDelete = await Task.findOne({ _id }).select('authorEmail');

    if (taskToDelete.authorEmail !== token.email) {
      return res
        .status(400)
        .json({ message: 'You can not delete task of someone else.' });
    }

    await Task.deleteOne({ _id });

    return res.status(200).json({ message: 'Successfully deleted a task.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
