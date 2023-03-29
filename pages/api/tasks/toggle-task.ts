import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Task from '../../../models/Task';
import { getToken } from 'next-auth/jwt';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'Invalid _id.' });
    }

    dbConnect();
    const task = await Task.findOne({ _id }).select('checked authorEmail');

    if (!task) {
      return res.status(400).json({ message: 'This task does not exist.' });
    }

    if (task.authorEmail !== token.email) {
      return res
        .status(400)
        .json({ message: 'You can not toggle tasks of someone else.' });
    }

    await Task.findOneAndUpdate({ _id }, { checked: !task.checked });

    return res.status(200).json({ message: 'Successfully toggled task' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
