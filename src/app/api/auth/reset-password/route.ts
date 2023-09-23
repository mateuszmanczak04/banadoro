import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = errorMiddleware(async (req: NextRequest) => {
  /* "token" is the chain of characters that was sent to the user's email.
    while decoded is a jwt object that contains the user's email and the token. */

  const token = (req.headers.get('Authorization') as string).split(' ')[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  // check if the token is valid
  if (!decoded) throw new CustomError('Unauthorized.', 401);

  const { password } = await req.json();

  if (!password) throw new CustomError('Missing fields.', 400);

  await dbConnect();

  const user = await User.findOne({ email: decoded.email }).select({
    resetPasswordToken: 1,
  });

  // check if there is a user with the email
  if (!user) throw new CustomError('Email not found.', 404);

  // check if the token in the database is the same as the token sent to the user's email
  if (user.resetPasswordToken !== decoded.token)
    throw new CustomError('Invalid token.', 401);

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { email: decoded.email },
    { password: hashedPassword }
  );

  return NextResponse.json({ message: 'Password updated.' });
});
