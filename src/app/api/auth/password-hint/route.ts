import authMiddleware from '@/lib/authMiddleware';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = authMiddleware(async (req: CustomNextRequest) => {
  try {
    const { hint } = await req.json();

    if (!hint) {
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });
    }

    await dbConnect();

    await User.findOneAndUpdate({ email: req.email }, { passwordHint: hint });

    return NextResponse.json(
      { message: 'Password hint updated.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
});

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.nextUrl.toString());
    const email = url.searchParams.get('email');

    await dbConnect();

    const user = await User.findOne({ email }).select({ passwordHint: 1 });

    return NextResponse.json(
      { hint: user?.passwordHint || '' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
};
