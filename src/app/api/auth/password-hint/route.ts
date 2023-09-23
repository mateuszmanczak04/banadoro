import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
    }

    const email = session?.user?.email;

    const { hint } = await req.json();

    if (!hint) {
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });
    }

    await dbConnect();

    await User.findOneAndUpdate({ email }, { passwordHint: hint });

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
}

export async function GET(req: NextRequest) {
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
}
