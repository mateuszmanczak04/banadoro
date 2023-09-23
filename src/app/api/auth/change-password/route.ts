import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import authMiddleware from '@/lib/authMiddleware';
import CustomNextRequest from '@/types/CustomNextRequest';

export const PUT = authMiddleware(async (req: CustomNextRequest) => {
  try {
    const { password } = await req.json();
    if (!password)
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email: req.email },
      { password: hashedPassword }
    );

    return NextResponse.json({ message: 'Password updated.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
});
