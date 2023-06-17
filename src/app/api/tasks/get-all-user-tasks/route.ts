import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();

    const tasks = await Task.find({ authorEmail: token.email });

    return NextResponse.json({ tasks });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
