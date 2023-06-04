import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { tasks } = await req.json();

    if (!tasks) {
      return NextResponse.json({ message: 'Invalid data.' }, { status: 400 });
    }

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();
    let tasksWithEmails = tasks.map((task: {}) => ({
      ...task,
      authorEmail: token.email,
    }));

    await Task.insertMany(tasksWithEmails);

    return NextResponse.json({ message: 'Successfully uploaded local tasks.' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
