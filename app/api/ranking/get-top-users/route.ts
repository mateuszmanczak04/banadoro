import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const topUsers = await User.find()
      .select({ email: true, totalTime: true, username: true })
      .sort({ totalTime: -1 })
      .limit(10);

    return NextResponse.json({ users: topUsers });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
