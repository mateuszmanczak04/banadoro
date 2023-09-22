import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
    }

    const email = session?.user?.email;

    const { password } = await req.json();
    if (!password)
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    return NextResponse.json({ message: 'Password updated.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
