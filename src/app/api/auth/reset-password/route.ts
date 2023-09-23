import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const PUT = async (req: NextRequest) => {
  try {
    /* "token" is the chain of characters that was sent to the user's email.
    while decoded is a jwt object that contains the user's email and the token. */

    const token = (req.headers.get('Authorization') as string).split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // check if the token is valid
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    const { password } = await req.json();

    if (!password)
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });

    await dbConnect();

    const user = await User.findOne({ email: decoded.email }).select({
      resetPasswordToken: 1,
    });

    // check if there is a user with the email
    if (!user) {
      return NextResponse.json(
        { message: 'Email not found.' },
        { status: 404 }
      );
    }

    // check if the token in the database is the same as the token sent to the user's email
    if (user.resetPasswordToken !== decoded.token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword }
    );

    return NextResponse.json({ message: 'Password updated.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
};
