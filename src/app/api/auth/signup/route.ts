import dbConnect from '@/lib/dbConnect';
import validateEmail from '@/lib/validateEmail';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        {
          message: 'Missing email, username or password.',
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: 'Password must contain at least 6 characters.',
        },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: 'Invalid email.' }, { status: 400 });
    }

    await dbConnect();

    // check if user already exists in the database
    const userExists = await User.exists({ email });

    if (userExists) {
      return NextResponse.json(
        { message: 'This e-mail is already in use.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      username,
    });

    return NextResponse.json({ message: 'Successfully registered.' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
