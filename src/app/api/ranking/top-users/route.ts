import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const topUsers: RankingTopUser[] = await User.find()
      .select({ totalTime: true, username: true })
      .sort({ totalTime: -1 })
      .limit(10);

    return NextResponse.json(topUsers);
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
