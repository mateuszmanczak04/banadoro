import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import validateEmail from '@/lib/validateEmail';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = errorMiddleware(async (req: NextRequest) => {
  const { email, username, password } = await req.json();

  if (!email || !username || !password)
    throw new CustomError('Missing email, username or password.', 400);

  if (password.length < 6)
    throw new CustomError('Password must contain at least 6 characters.', 400);

  if (!validateEmail(email)) throw new CustomError('Invalid email.', 400);

  await dbConnect();

  // check if user already exists in the database
  const userExists = await User.exists({ email });

  if (userExists) throw new CustomError('This e-mail is already in use.', 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    username,
  });

  return NextResponse.json({ message: 'Successfully signed up.' });
});
