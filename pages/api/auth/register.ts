import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import validateEmail from '../../../lib/validateEmail';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Invalid method.' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must contain at least 6 characters.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email.' });
    }

    await dbConnect();

    // check if user already exists in the database
    const userExists = await User.exists({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'This e-mail is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email: email.toLowerCase(), password: hashedPassword });

    return res.status(200).json({ message: 'Successfully registered.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
}
