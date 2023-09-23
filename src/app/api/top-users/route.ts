import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = errorMiddleware(async () => {
  await dbConnect();

  const topUsers: RankingTopUser[] = await User.find()
    .select({ totalTime: true, username: true })
    .sort({ totalTime: -1 })
    .limit(10);

  return NextResponse.json(topUsers);
});
